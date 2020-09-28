"use strict";
const fs = require("fs");
const { performance } = require("perf_hooks");
const Jimp = require("jimp");
const parseArgs = require("minimist");

let t0 = performance.now();

let args = parseArgs(process.argv.slice(2));

const thumbSize = 200;
const imagesToPage = args.n || 10;

console.log("starting generator...");

console.log("reading page template...");
let pageTemplate = fs.readFileSync("input/template.html", "utf8");

console.log("loading image list...");
let images = JSON.parse(fs.readFileSync("input/images.json", "utf8"));

let chunkedImages = [];
while (images.length !== 0) {
  chunkedImages.push(images.slice(0, imagesToPage));
  images = images.slice(imagesToPage)
}
const numPages = chunkedImages.length;

chunkedImages.forEach((chunk, index) => {
  console.log(`writing gallery page ${index + 1} of ${numPages}...`);
  let rows = [];
  chunk.forEach((img) => {
    Jimp.read(`./input/img/${img.img}`, (err, image) => {
      if (err) throw err;
      image
        .resize(thumbSize, Jimp.AUTO)
        .write(`./output/img/thumbs/t-${img.img}`);
    });
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
  let page = pageTemplate;
  page = page.split("<!-- IMAGES -->");
  page = page[0] + rows + page[1];

  if (chunkedImages.length > 1) {
    let links = [];
    for (let i = 0; i < chunkedImages.length; i++) {
      links.push(i === index? `<li>${i + 1}</li>` : `<li><a href="${i + 1}.html">${i + 1}</a></li>`)
    }
    const nav = `<nav class="pagination">
      <ul>
        <li>
          ${index === 0 ? '&lt;' : `<a href="${index}.html" title="Previous">&lt;</a>`}
        </li>
        ${links.join("")}
        <li>
          ${index === chunkedImages.length - 1 ? '&gt;' : `<a href="${index + 2}.html" title="Next">&gt;</a>`}
        </li>
      </ul>
    </nav>`
    page = page.split("<!-- PAGINATION -->");
    page = page[0] + nav + page[1];
  }
  fs.writeFileSync(`output/${index + 1}.html`, page);
})

console.log("copying stylesheet...");
fs.copyFileSync("input/style.css", "output/style.css");

let t1 = performance.now();
console.log(`All files generated in ${t1 - t0} ms!`);
