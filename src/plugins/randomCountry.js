const fetch = require("node-fetch");

async function getCountryData(country) {
  const response = await fetch("https://www.jsonkeeper.com/b/L23E");
  const data = await response.json();

  const countryData = data.countries.find(
    (c) => c.name_en.toLowerCase() === country.toLowerCase() || c.name_es.toLowerCase() === country.toLowerCase()
  );

  return countryData;
}

// RANDOM COUNTRY
module.exports = {
  name: "$countryRandom",
  type: "djs",
  code: async (d) => {
    const data = d.util.aoiFunc(d);
    const [format] = data.inside.splits;

    const countries = await getCountriesData();

    const randomCountry = countries[Math.floor(Math.random() * countries.length)];

    if (!randomCountry) {
      data.result = "No country found!";
      return { code: d.util.setCode(data) };
    }

    if (!format) {
      data.result = "No format specified!";
      return { code: d.util.setCode(data) };
    }

    const placeholders = {
      "{name_en}": randomCountry.name_en,
      "{name_es}": randomCountry.name_es,
      "{continent_en}": randomCountry.continent_en,
      "{continent_es}": randomCountry.continent_es,
      "{capital_en}": randomCountry.capital_en,
      "{capital_es}": randomCountry.capital_es,
      "{dial_code}": randomCountry.dial_code,
      "{code_2}": randomCountry.code_2,
      "{code_3}": randomCountry.code_3,
      "{tld}": randomCountry.tld,
      "{km2}": randomCountry.km2,
      "{flag}": `:flag_${randomCountry.code_2.toLowerCase()}:`,
      "{image}": `https://flagcdn.com/w2560/${randomCountry.code_2.toLowerCase()}.jpg`,
    };

    let result = format;
    for (const placeholder in placeholders) {
      result = result.replace(
        new RegExp(placeholder, "g"),
        placeholders[placeholder]
      );
    }

    data.result = result;

    return { code: d.util.setCode(data) };
  },
};
