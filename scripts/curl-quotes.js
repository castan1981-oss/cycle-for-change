/* Cycle for Change — curly quotes in the visible text of a generated page.
   Text between tags only: <title>, <script>, <style>, comments and every attribute (meta, alt, href,
   JSON-LD, data-*) are left exactly as they are. Run on HTML just before it is written. */
"use strict";
const SKIP = /(<title\b[\s\S]*?<\/title>|<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>|<!--[\s\S]*?-->|<[^>]*>)/i;
function curlText(t) {
  return t
    .replace(/&#0?39;|&#x27;|&apos;/g, "'").replace(/&quot;/g, '"')
    .replace(/(?<=[A-Za-z0-9])'(?=[A-Za-z])/g, "’")            // don't, host's, 2027's
    .replace(/(?<=[A-Za-z.!?])'(?=[\s,.;:!?)—]|$)/g, "’")   // riders' · closing quote
    .replace(/(?<=^|[\s(—])'(?=\d\d)/g, "’")               // '90s
    .replace(/(?<=^|[\s(—\[])'/g, "‘")                     // opening single
    .replace(/'/g, "’")
    .replace(/(?<=^|[\s(—\[])"/g, "“")                     // opening double
    .replace(/"/g, "”");
}
function curlQuotes(html) {
  return html.split(SKIP).map((part, i) => (i % 2 ? part : curlText(part))).join("");
}
module.exports = { curlQuotes, curlText };
