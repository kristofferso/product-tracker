const shopData = [
  {
    name: "Elkjøp",
    url: "https://www.elkjop.no/product/gaming/spillkonsoll/playstation-konsoller/220276/playstation-5-ps5",
    value: "Ikke tilgjengelig",
    selector: ".product-price-button .button",
    browser: false,
  },
  {
    name: "Power",
    url: "https://www.power.no/gaming/playstation/playstation-konsoll/playstation-5/p-1077687/",
    value: "Ikke på lager",
    selector: ".buy-area__webshop button",
    browser: true,
  },
  {
    name: "Obs",
    url: "https://www.obs.no/elektronikk-og-underholdning/underholdning/konsoll/2085071?v=Obs-711719396208",
    value: "Overvåk",
    selector: "main section+section+div button",
    browser: false,
  },
  {
    name: "Komplett",
    url: "https://www.komplett.no/product/1111557/gaming/playstation/playstation-5",
    value: "Motta Varsel",
    selector: ".actionButton-completeGrid button",
    browser: false,
  },
  {
    name: "NetOnNet",
    url: "https://www.netonnet.no/art/gaming/spillogkonsoll/playstation/playstation-konsoll/sony-playstation-5/1012886.15693/",
    value: "Ikke på lager",
    selector: "button.InternetShopProduct",
    browser: true,
  },
  {
    name: "Max Gaming",
    url: "https://www.maxgaming.no/no/playstation-5/playstation-5",
    value: "Overvåk dette produktet",
    selector: "#SubmitFalt",
    browser: false,
  },
];

module.exports = shopData;
