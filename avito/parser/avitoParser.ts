import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import {setHeaders, sleep} from "../../utils/functions";
import * as fs from "node:fs/promises";
import {getPageData} from "./getPageData";
import {AdObj} from "../../types/AdObj";
function avitoParser({ mark, cookie }: { mark: string; cookie?: string }) {
  puppeteer
    .use(StealthPlugin())
    .launch()
    .then(async (browser) => {
      let data: AdObj[] = [];
      try {
        browser = await puppeteer.launch({
          headless: false,
          dumpio: true,
          protocolTimeout: 0,
        });
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        await page.setExtraHTTPHeaders(setHeaders(cookie));
        await page.goto(`https://www.avito.ru/all/avtomobili`);

        //Марка
        await page.waitForSelector(
          '[data-marker="params[110000]/multiselect-input"]',
        );
        await page.click('[data-marker="params[110000]/multiselect-input"]');
        await page.waitForSelector(
          '[data-marker="params[110000]/multiselect-group"]',
        );
        await page.$$eval(
          '[data-marker="params[110000]/multiselect-group"] p',
          (elements, mark) => {
            elements.forEach((el) => {
              if (el.innerText === mark) {
                el.click();
              }
            });
          },
          mark,
        );

        await page.waitForSelector(
          '[data-marker="search-filters/submit-button"]',
        );
        await page.click('[data-marker="search-filters/submit-button"]');

        await sleep(5000);
        const setUrl = await page.evaluate(() => window.location.href);
        console.log("CAR SET URL: ", setUrl);

        await page.goto(setUrl);

        await page.waitForSelector('nav[aria-label="Пагинация"]');
        const pageCountString = await page.$$eval(
          'nav[aria-label="Пагинация"] li',
          (elements) => {
            return elements[elements.length - 2]
              .querySelector("a")
              ?.getAttribute("data-value");
          },
        );
        console.log("pageCount: ", pageCountString);

        const pageCount = pageCountString ? parseInt(pageCountString) : 0;

        if (!pageCount) {
          throw new Error('No page Count');
        }

        const firstPageData = await getPageData(page);
        console.log("firstPageData: ", firstPageData);
        data = [...data, ...firstPageData];

        let pageNumber = 2;

        while (pageNumber <= pageCount) {
          try {
            await page.waitForSelector('nav[aria-label="Пагинация"]');
            await page.$$eval(
              'nav[aria-label="Пагинация"] li',
              (elements, pageNumber) => {
                elements.forEach((el) => {
                  const link = el.querySelector("a");
                  const linkValue = link?.getAttribute("data-value");
                  if (linkValue && parseInt(linkValue) === pageNumber) {
                    link?.click();
                  }
                });
              },
              pageNumber,
            );

            await page.waitForNavigation()

            await page.evaluate(() => {
              window.scrollTo(0, document.body.scrollHeight);
            });

            const timer = (Math.floor(Math.random() * 6) + 5) * 1000;
            console.log("SLEEP: ", timer);
            await sleep(timer);

            const pageData = await getPageData(page);

            console.log(`pageData ${pageNumber}: `, pageData);
            data = [...data, ...pageData];
            pageNumber += 1;
          } catch (e) {
            console.log(`Error ${e} on page ${pageNumber}`);
            // pageNumber += 1;
            break;
          }
        }
        console.log("LENGTH: ", data.length);
        await fs.writeFile(`${mark}.json`, JSON.stringify(data));

        await browser.close();
      } catch (e) {
        console.log(`Catch error ${e}`);
        console.log("LENGTH FROM ERROR: ", data.length);
        await fs.writeFile(`${mark}.json`, JSON.stringify(data));
        await browser?.close();
      }
    });
}

export { avitoParser };
