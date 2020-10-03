# gallery-generator

Generate image galleries in static HTML, either single-page (default, images display in a table alongside details) or multi-page (each image has its own page).

## Usage

Install dependencies: `npm install`

Place required image files in the input/img directory.

Populate input/images.json with the required files. Each object takes the following keys:

* "img" - image filename. Do not add the path, the generator knows where to find it. Mandatory.
* "alt" - alt text for your image. Be considerate and descriptive! Mandatory.
* "desc" - an optional description of the image.

Make any changes as desired to the template html files and css. Do not remove the comments as they tell the generator where to place content.

Run `node gen.js` with any required flags.

### Flags

* `-n (number)` - specify images per page. Defaults to 10 if not given.
* `-p` - specify multi-page mode - each image has its own page.
* `-t (number)` - specify thumbnail width. Defaults to 200px if not given.

## Sample outputs:

* [Single page](https://profuse-brief-vicuna.glitch.me/single-page)
* [Multi page](https://profuse-brief-vicuna.glitch.me/multi-page)

## Credits

The lovely kitties used in the sample images are current and former residents of [Mog on the Tyne Cat Cafe](https://www.mogonthetyne.com/), Newcastle Upon Tyne. Drop by if you're in the area for cat cuddles and awesome cake.
