"use strict";
const fs = require("fs");
const { performance } = require("perf_hooks");
const Jimp = require("jimp");

let t0 = performance.now();

const thumbSize = 200;

console.log("starting generator...");

console.log("reading page template...");
let pageTemplate = fs.readFileSync("input/template.html", "utf8");

console.log("loading image list...");
let images = JSON.parse(fs.readFileSync("input/images.json", "utf8"));

console.log("writing gallery page...");
let rows = [];
images.forEach(function(img) {
  Jimp.read(`./input/img/${img.img}`, (err, image) => {
    if (err) throw err;
    image
      .resize(thumbSize, Jimp.AUTO)
      .write(`./output/img/thumbs/t-${img.img}`);
  });
  // rows.push(`<tr>
  //   <td>
  //     <a href='img/${img.img}'>
  //       <img src='img/thumbs/t-${img.img}'>
  //     </a>
  //   </td>
  //   <td>
  //     <a href='img/${img.img}'>${img.img}</a><br/><br/>
  //     ${img.desc || ""}
  //   </td>
  // </tr>`);
  rows.push(`<div class="img-container">
    <div class="thumb-container">
      <a href='img/${img.img}'>
        <img src='img/thumbs/t-${img.img}'>
      </a>
    </div>
    <div class="description">
      <p>
        <a href='img/${img.img}'>${img.img}</a>
      </p>
        ${img.desc || ""}
      <p>
      </p>
    </div>
  </div>`);
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
