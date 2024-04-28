import type {Page} from "puppeteer";
import {AdObj} from "../../types/AdObj";


export async function getPageData(page: Page) {
    await page.waitForSelector('[data-marker="catalog-serp"]');
    return await page.$$eval(
        '[data-marker="catalog-serp"] [data-marker="item"]',
        (elements) => {
            return elements.map((el) => {
                const res: Partial<AdObj> = {};
                res.title = el.querySelector("h3")?.innerText ?? '';
                res.price = el
                    .querySelector('meta[itemprop="price"]')
                    ?.getAttribute("content") ?? '';
                res.description = el
                    .querySelector('meta[itemprop="description"]')
                    ?.getAttribute("content") ?? '';
                res.link = el
                    .querySelector('a[itemprop="url"]')
                    ?.getAttribute("href") ?? '';
                return res as AdObj ;
            });
        },
    );
}