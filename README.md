# gallery-generator

Generate image galleries in static HTML, either single-page (default, images display in a table alongside details) or multi-page (each image has its own page).

## Usage

Install dependencies: `npm install`

Populate images.json with the required files. "img" is mandatory, all others are optional. Make any changes as desired to the template html files and css. Do not remove the comments as they tell the generator where to place content.

Run `node gen.js` with any required flags.

### Flags

* `-n (number)` - specify images per page. Defaults to 10 if not given.
* `-p` - specify multi-page mode - each image has its own page.
* `-t (number)` - specify thumbnail width. Defaults to 200px if not given.