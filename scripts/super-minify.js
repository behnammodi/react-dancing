const fs = require("fs");
const path = require("path");

const words = [
  {
    from: "setStyle",
    to: "_1",
  },
  {
    from: "setDuration",
    to: "_2",
  },
  {
    from: "setTimingFunction",
    to: "_3",
  },
  {
    from: "setDelay",
    to: "_4",
  },
  {
    from: "_react",
    to: "_5",
  },
];

let content = fs.readFileSync(
  path.join(__dirname, "..", "./index.js"),
  "utf-8"
);

words.forEach((word) => {
  content = content.split(word.from).join(word.to);
});

fs.writeFileSync(path.join(__dirname, "..", "./index.js"), content, "utf-8");
console.log("Super minify is done");
