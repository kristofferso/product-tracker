const { Chromeless } = require("chromeless");
const { JSDOM } = require("jsdom");
const axios = require("axios");
const shopData = require("./shopData");

async function runBrowser(shop) {
  const chromeless = new Chromeless();

  let value;
  try {
    value = await chromeless
      .setUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
      )
      .goto(shop.url, 20000)
      .evaluate(async (shop) => {
        if (document.querySelector(shop.selector)) {
          return document.querySelector(shop.selector).innerText;
        } else {
          throw new Error("Feil med selector");
        }
      }, shop)
      .end();
  } catch (error) {
    console.log(error);
  }

  return { name: shop.name, statusChanged: value !== shop.value, value };
}

async function runAxios(shop) {
  let value;
  try {
    const response = await axios.get(shop.url);
    const dom = new JSDOM(response.data);

    if (dom.window.document.querySelector(shop.selector)) {
      value = dom.window.document
        .querySelector(shop.selector)
        .textContent.replace(/[\n\r]+|[\s]{2,}/g, "");
    } else {
      throw new Error("Feil med selector hos ", shop.name);
    }
  } catch (error) {
    console.log(error);
  }
  return { name: shop.name, statusChanged: value !== shop.value, value };
}

let results = [];

const loop = async () => {
  for (let i = 0; i < shopData.length; i++) {
    const shop = shopData[i];
    console.log("Starter", shop.name);
    let res;
    if (shop.browser) {
      res = await runBrowser(shop);
    } else {
      res = await runAxios(shop);
    }
    results.push(res);
  }
};

const run = async () => {
  console.log("----------- STARTER SCRAPING -----------");
  await loop();
  console.log("RESULTATER: ", results);
  const changedShops = results.filter((shop) => shop.statusChanged);

  if (changedShops.length > 0) {
    const shopNames = changedShops.map((shop) => shop.name).join(", ");
    console.log("Changed Shops", shopNames);
    console.log("SENDER VARSEL");
    axios.post(
      "https://maker.ifttt.com/trigger/product_tracker/with/key/cn_kvYiYC7QgPlj7tlYM5r",
      { value1: shopNames }
    );
  }
  console.log("----------- SCRAPING OVER -----------");
};

run();
