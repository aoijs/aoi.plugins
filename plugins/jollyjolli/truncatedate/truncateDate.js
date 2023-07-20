module.exports = {
  name: "$truncateDate",
  type: "djs",
  author: "jollijolli",
  version: ["6.4.0"],
  description: "Truncates the date",
  example: "$truncateDate",
  code: async (d) => {
    const data = d.util.aoiFunc(d);
    
    const currentDate = Date.now();
    const truncatedDate = Math.trunc(currentDate / 1000);
    
    data.result = truncatedDate;
    
    return {
      code: d.util.setCode(data)
    };
  }
}
