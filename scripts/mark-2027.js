// The mark (Robert, Nov 8, 2026: "the new logo is that lettering"). The lowercase rounded stencil "cycle for" and
// the plate after it are traced from the ASSOS CORE proof (CYCL CHG_ASSOS CORE_Collection, Nov 4, 2026, page 5): not
// drawn here and never a font. A plain plate, no rivets (Robert, Nov 8: "I don't like the rivet look").
// The plate is the pink, #C2557F. It was the proof's Pantone 7419 C (#B04A5B) for three days; that read red on his
// phone (Nov 9: "Can we move to the more pink than red"; Nov 10: "Use the pink not the red going forward").
// Nov 11, 2026: every page wears it. scripts/chrome.js draws the header and the footer from here; the Lane Paint
// stencil (the caps CYCLE FOR, #lpC …) is retired.
//
// Units: "cycle" is x 2.3–233.7, the l's top at y 0, x-height from 28.4, baseline 75.6, the y's tail to 95.8;
// "for" is x 261.8–402.9, y 0–75.6; the plate is x 418.6–511.5, y 8.5–81.9, set about five degrees off square.
// The letters take the page's ink (currentColor). The plate is one pink on a light ground or a dark one
// (.mark-plate in /chrome.css; the fill here is for a page that hasn't loaded it).
// The paths live once a page, in the header's copy (LINE(cls, true)); every other copy is <use>.
"use strict";

const PINK = "#C2557F";
const CYCLE_PATHS = `<path d="M 202.2 48L 225 47.9C 222.5 38.5 212 33.9 203.4 38C 194.5 42.2 191.8 53.4 197.6 61.2C 203.4 69.1 215 69.7 221.7 62.3C 223.3 60.5 226.1 60.7 227.6 62.4C 229.2 64.1 228.9 66.4 227.3 68.2C 219.5 76.5 206.9 78 197.4 71.9C 187.8 65.8 183.8 53.7 188.3 43C 192.6 32.6 203.7 26.5 215 28.9C 225.7 31.2 233.8 40.7 233.7 52.1C 233.6 54.3 231.8 56 229.5 56L 202.2 56C 200 56 198.4 54 198.3 52.1C 198.3 50.1 199.8 48 202.2 48"/><path d="M 140.1 40.6C 133.8 35 124.4 35.1 118.5 40.9C 112.5 46.8 112.4 56.5 118.1 62.6C 124 68.9 133.6 69.2 140 63.4C 141.7 61.9 144.3 62.4 145.6 64C 147.2 65.8 146.7 68.2 144.9 69.8C 135.3 78.2 121 77.3 112.3 68.2C 103.6 59.1 103.7 44.7 112.4 35.6C 121.2 26.5 135.7 25.9 145.2 34.5C 146.9 36 146.9 38.3 145.6 40C 144.5 41.4 141.9 42.2 140.1 40.6"/><path d="M 36.6 40.6C 30.2 35 20.8 35.1 14.8 41.1C 9 47 8.9 56.6 14.6 62.7C 20.4 68.7 29.9 69.2 36.4 63.5C 38.1 62 40.6 62.3 42 64C 43.5 65.7 43.3 68.1 41.5 69.7C 31.9 78.2 17.5 77.4 8.8 68.3C 0.1 59.1 0.1 44.7 8.9 35.5C 17.7 26.5 32.3 25.9 41.7 34.5C 43.4 36 43.4 38.3 42.1 40C 41 41.4 38.4 42.2 36.6 40.6"/><path d="M 174.8 67.5C 177.2 67.5 179 69.4 179 71.5C 179 73.7 177.3 75.6 175 75.6L 169.7 75.6C 163.5 75.6 157.8 70.5 157.8 63.9L 157.8 4C 157.8 1.6 159.9 -0 161.8 0C 164.1 0.1 165.8 1.8 165.8 4.2L 165.8 63.4C 165.8 65.8 167.8 67.5 170 67.5L 174.8 67.5"/><path d="M 69.8 93.7C 68.8 95.8 66.2 96.2 64.6 95.5C 62.6 94.6 61.5 92.3 62.5 90.2L 90.5 31C 91.6 28.8 93.9 27.8 96 28.8C 98.2 29.9 98.9 32.2 97.8 34.5L 69.8 93.7"/><path d="M 73.9 56.6C 75 59 74.2 61.3 72.1 62.4C 70 63.4 67.6 62.3 66.6 60.1L 54.7 34.3C 53.7 32.2 54.5 29.8 56.5 28.8C 58.5 27.9 61 28.6 62 30.8L 73.9 56.6"/>`;
const FOR_PATHS = `<path d="M 326.1 37.2C 319.6 39.4 315.3 45.2 315.3 51.8C 315.2 58.6 319.4 64.5 325.9 66.8C 328.2 67.6 329.1 70.1 328.2 72.1C 327.2 74.2 325 75 322.8 74.2C 313.4 70.8 307.2 61.9 307.2 52C 307.2 42.1 313.4 33.1 322.8 29.7C 324.5 29.2 325.9 29.5 327.3 30.4C 328.1 29.3 329.2 28.4 330.8 28.4C 342.4 28.3 352.3 36.8 354.1 48.2C 356 59.4 349.4 70.7 338.4 74.3C 336.4 75 334.2 74 333.4 72.1C 332.7 70.3 333.3 67.6 335.5 66.9C 342.8 64.3 347.3 57.4 346.2 49.7C 345.1 42.4 338.9 36.7 331.2 36.5C 330.1 36.5 329 36 328 35.4C 327.6 36 326.9 36.9 326.1 37.2"/><path d="M 370 71.7C 370 74.2 367.7 75.6 365.9 75.6C 363.7 75.5 361.9 73.8 361.9 71.4L 361.9 32.2C 361.9 29.9 364 28.4 366.1 28.4C 367.8 28.4 370 29.9 370 32.3L 370 71.7"/><path d="M 279.3 14.8L 279.2 19.7C 279.2 21.9 277.4 23.5 275.4 23.6C 273.2 23.6 271.2 22 271.2 19.7L 271.2 14.4C 271.2 6.7 277.5 0.3 285.3 0.1L 295.7 0C 297.9 0 299.6 1.8 299.7 3.8C 299.8 6 298.1 8 295.8 8L 286.4 8.1C 282.6 8.1 279.4 10.7 279.3 14.8"/><path d="M 279.2 71.6C 279.2 73.9 277.3 75.5 275.4 75.6C 273.3 75.6 271.2 74 271.2 71.7L 271.2 45.2C 271.2 42.8 273.2 41.2 275.4 41.2C 277.6 41.3 279.3 43.1 279.3 45.4L 279.2 71.6"/><path d="M 395.9 40.6C 391.6 36.4 385.6 35.4 380.1 37.5C 378 38.4 375.7 37.1 375 35.1C 374.3 33.1 375.2 30.9 377.3 30C 385.7 26.6 395.1 28.6 401.6 34.9C 403.3 36.5 403.3 39 401.7 40.7C 400.2 42.2 397.7 42.3 395.9 40.6"/><path d="M 287.4 36.4L 265.8 36.4C 263.5 36.4 261.8 34.4 261.8 32.3C 261.9 30.1 263.7 28.4 266 28.4L 287.5 28.4C 289.7 28.4 291.4 30.4 291.4 32.3C 291.4 34.4 289.8 36.4 287.4 36.4"/>`;
const PLATE_D = "M 420.2 42.3L 419.6 35.8L 419.1 30.4L 418.6 24.1C 418.2 19.6 420.9 15.3 425.5 14.9L 432.1 14.3L 437.9 13.8L 443.7 13.3L 448.9 12.8L 455.1 12.3L 460.6 11.8L 466.6 11.3L 471.9 10.8L 477.9 10.3L 483.9 9.8L 489.4 9.3L 494.9 8.8L 497.6 8.5C 501.8 8.1 506.5 10.6 506.9 15.3L 510.4 53.4L 510.9 60.1L 511.4 65.8C 512.2 71 508.9 75.2 503.6 75.6L 498.5 76L 491.9 76.6L 481.2 77.5L 474.6 78.1L 469.1 78.6L 435.8 81.5L 433 81.8C 430.4 82 427.8 81.8 425.9 80C 424.4 78.6 423.2 77 423.1 74.9L 422.2 64.9L 421.6 58.3L 420.2 42.3";
const DEFS = `<defs><g id="cfCycle">${CYCLE_PATHS}</g><g id="cfFor">${FOR_PATHS}</g><g id="cfPlate"><path class="mark-plate" fill="${PINK}" d="${PLATE_D}"/></g></defs>`;

const svg = (cls, box, body, defs) => `<svg class="${cls}" viewBox="${box}" aria-hidden="true" focusable="false">${defs ? DEFS : ""}${body}</svg>`;
const word = (uses) => `<g class="mark-word" fill="currentColor">${uses}</g>`;
const DOWN = "translate(-261.7 112)";   // "for" and the plate, moved under "cycle"

// one line: cycle for + the plate (the blank). The logo.
const LINE = (cls, defs) => svg(cls, "0 0 514 97", word(`<use href="#cfCycle"/><use href="#cfFor"/>`) + `<use href="#cfPlate"/>`, defs);
// stacked: cycle / for + the plate. The logo where the space is square.
const STACK = (cls, defs) => svg(cls, "0 0 252 196", word(`<use href="#cfCycle"/><use href="#cfFor" transform="${DOWN}"/>`) + `<use href="#cfPlate" transform="${DOWN}"/>`, defs);
// the words alone, one line: for a sign whose plate is type (the plate after it is HTML and carries a word)
const WORD = (cls, defs) => svg(cls, "0 0 404 97", word(`<use href="#cfCycle"/><use href="#cfFor"/>`), defs);
// the two rows on their own, for a stacked sign whose plate is type (the footer, /ride/): "for" ends on its baseline
const CYCLE = (cls, defs) => svg(cls, "0 0 236 97", word(`<use href="#cfCycle"/>`), defs);
const FOR = (cls, defs) => svg(cls, "0 0 143 76", word(`<use href="#cfFor" transform="translate(-261.7 0)"/>`), defs);

// A file of its own (the favicon, a share card, the kit): the drawing inlined, the colors written in.
// `ground` paints a field behind it; `box` is the viewBox (x y w h) the mark sits in, in the mark's own units.
function FILE({ stack = false, ink = "#1C1A22", plate = PINK, ground = "", box = "" } = {}) {
  const vb = box || (stack ? "0 0 252 196" : "0 0 514 97");
  const [x, y, w, h] = vb.split(" ").map(Number);
  const t = stack ? ` transform="${DOWN}"` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}">${ground ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${ground}"/>` : ""}<g fill="${ink}">${CYCLE_PATHS}<g${t}>${FOR_PATHS}</g></g><path${t} fill="${plate}" d="${PLATE_D}"/></svg>`;
}

module.exports = { PINK, DEFS, LINE, STACK, WORD, CYCLE, FOR, FILE, CYCLE_PATHS, FOR_PATHS, PLATE_D };

if (require.main === module) {
  // `node scripts/mark-2027.js` -> the pieces as JSON, for the Python tools
  process.stdout.write(JSON.stringify({ PINK, DEFS, CYCLE_PATHS, FOR_PATHS, PLATE_D, line: LINE("mark", true), stack: STACK("mark", true) }));
}
