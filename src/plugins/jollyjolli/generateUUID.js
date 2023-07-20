module.exports = {
  name: "$generateUUID",
  type: "djs",
  author: "jollijolli",
  version: ["6.4.0"],
  description: "Generates a random UUID (Universally Unique Identifier).",
  example: "$generateUUID",
  code: async (d) => {
    const data = d.util.aoiFunc(d);

    // Generate a random UUID
    function uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0,
          v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    const uuid = uuidv4();
    data.result = uuid;

    return { code: d.util.setCode(data) };
  },
};
