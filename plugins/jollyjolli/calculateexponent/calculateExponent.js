module.exports = {
  name: "$calculateExponent",
  type: "djs",
  author: "jollijolli",
  version: ["6.4.0"],
  description: "Calculates the result of raising a given base to the power of a specified exponent.",
  example: "$calculateExponent[base;exponent]",
  code: async (d) => {
    const data = d.util.aoiFunc(d);
    const [base, exponent] = data.inside.splits.map(Number);

    if (isNaN(base) || isNaN(exponent)) {
      data.result = "Invalid input! Both base and exponent must be numbers.";
      return { code: d.aoiError.fnError(d, "custom", {}, data.result) };
    }

    const result = Math.pow(base, exponent);
    data.result = result.toString();

    return { code: d.util.setCode(data) };
  },
};
