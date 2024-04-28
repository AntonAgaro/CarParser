import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { sleep } from "../../utils/functions";
import * as fs from "node:fs/promises";
function avitoParser(params: { city: string }) {
  puppeteer
    .use(StealthPlugin())
    .launch()
    .then(async (browser) => {
      const { city } = params;
      let data = [];
      try {
        browser = await puppeteer.launch({
          headless: false,
          dumpio: true,
          protocolTimeout: 0,
        });
        const page = await browser.newPage();

        await page.setViewport({ width: 1920, height: 1080 });

        // Сразу идем на урл с городом
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
          (elements) => {
            console.log(elements);
            elements.forEach((el) => {
              if (el.innerText === "BMW") {
                el.click();
              }
            });
          },
        );

        await page.waitForSelector(
          '[data-marker="search-filters/submit-button"]',
        );
        await page.click('[data-marker="search-filters/submit-button"]');

        await sleep(5000);
        const setUrl = await page.evaluate(() => window.location.href);
        console.log(setUrl);

        await page.goto(setUrl);

        // &p=2

        await page.waitForSelector('nav[aria-label="Пагинация"]');
        const pageCount = await page.$$eval(
          'nav[aria-label="Пагинация"] li',
          (elements) => {
            console.log(elements);
            return elements[elements.length - 2]
              .querySelector("a")
              ?.getAttribute("data-value");
          },
        );

        console.log("pageCount: ", pageCount);

        // await fs.writeFile("preview.json", "[\n");

        // await page.waitForSelector('[data-marker="catalog-serp"]');
        //
        // const firstPageData = await page.$$eval(
        //   '[data-marker="catalog-serp"] [data-marker="item"]',
        //   (elements) => {
        //     return elements.map((el) => {
        //       const res = {};
        //       res.title = el.querySelector("h3")?.innerText;
        //       res.price = el
        //         .querySelector('meta[itemprop="price"]')
        //         ?.getAttribute("content");
        //       res.description = el
        //         .querySelector('meta[itemprop="description"]')
        //         ?.getAttribute("content");
        //       res.link = el
        //         .querySelector('a[itemprop="url"]')
        //         ?.getAttribute("href");
        //
        //       console.log(res);
        //       return res;
        //     });
        //   },
        // );
        // console.log(firstPageData);
        // data = [...data, ...firstPageData];
        // await fs.appendFile(
        //   "preview.json",
        //   JSON.stringify(firstPageData) + ",\n",
        // );

        // console.log(Math.floor(Math.random() * 10));
        const arr = Array.from({ length: pageCount }, (_, idx) => idx + 1);
        console.log(arr);

        while (arr.length) {
          const randomPage = Math.floor(Math.random() * (pageCount + 1));
          const idx = arr.indexOf(randomPage);

          if (idx === -1) {
            continue;
          }

          arr.splice(idx, 1);

          const newPage = await browser.newPage();
          newPage.setDefaultNavigationTimeout(0);

          await newPage.goto(`${setUrl}&p=${randomPage}`);
          await newPage.waitForSelector('[data-marker="catalog-serp"]');

          const pageData = await newPage.$$eval(
            '[data-marker="catalog-serp"] [data-marker="item"]',
            (elements) => {
              return elements.map((el) => {
                const res = {};
                res.title = el.querySelector("h3")?.innerText;
                res.price = el
                  .querySelector('meta[itemprop="price"]')
                  ?.getAttribute("content");
                res.description = el
                  .querySelector('meta[itemprop="description"]')
                  ?.getAttribute("content");
                res.link = el
                  .querySelector('a[itemprop="url"]')
                  ?.getAttribute("href");
                return res;
              });
            },
          );

          console.log(pageData);
          data = [...data, ...pageData];
          // await fs.appendFile("preview.json", JSON.stringify(pageData) + ",\n");
          await newPage.close();
          await sleep(Math.floor(Math.random() * 10));
          console.log(randomPage);
          console.log(arr);
        }

        // await fs.appendFile("preview.json", "]\n");
        await fs.appendFile("preview.json", JSON.stringify(data));

        await browser.close();
      } catch (e) {
        console.log(`Catch error ${e}`);
        await fs.appendFile("preview.json", JSON.stringify(data));
        await browser?.close();
      }
    });
}

export { avitoParser };
