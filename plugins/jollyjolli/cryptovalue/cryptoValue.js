async function getCryptoValue(cryptoName) {
  const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoName}&vs_currencies=usd`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data && data[cryptoName] && data[cryptoName].usd) {
      return data[cryptoName].usd;
    } else {
      return null;
    }
  } catch (error) {
    console.error("An error occurred while fetching crypto value:", error);
    return null;
  }
}

module.exports = {
  name: "$cryptoValue",
  type: "djs",
  author: "jollijolli",
  version: ["6.4.0"],
  description: "Get the value of a crypto in US Dolars",
  example: "$cryptoValue[bitcoin]",
  code: async (d) => {
    const data = d.util.aoiFunc(d);
    const [cryptoName] = data.inside.splits;

    const value = await getCryptoValue(cryptoName);

    if (value !== null) {
      data.result = value.toString();
    } else {
      data.result = "N/A";
    }

    return { code: d.util.setCode(data) };
  },
}
