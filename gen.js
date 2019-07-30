"use strict";
const fs = require("fs");
const { performance } = require("perf_hooks");

let t0 = performance.now();

console.log("starting generator...");

console.log("reading page template...");
let pageTemplate = fs.readFileSync("input/template.html", "utf8");

console.log("loading image list...");
let images = JSON.parse(fs.readFileSync("input/images.json", "utf8"));

console.log("writing gallery page...");
let rows = [];
images.forEach(function(img) {
  rows.push(`<tr>
    <td>
      <a href='img/${img.img}'>
        <img src='img/${img.img}' width='200'>
      </a>
    </td>
    <td>
      ${img.desc || ""}
    </td>
  </tr>`);
  fs.copyFileSync(`input/img/${img.img}`, `output/img/${img.img}`);
});
rows = rows.join("");

pageTemplate = pageTemplate.split("<!-- IMAGES -->");
pageTemplate = pageTemplate[0] + rows + pageTemplate[1];

fs.writeFileSync(`output/index.html`, pageTemplate);

console.log("copying stylesheet...");
fs.copyFileSync("input/style.css", "output/style.css");

let t1 = performance.now();
console.log(`All files generated in ${t1 - t0} ms!`);
