// Prints summary.html to assets/KPI_Summary_<lang>.pdf for every language, with headless Chrome.
// Needs the dev server running (node serve.js, port 5180). Run again after changing any content.
//   node tools/make_summary_pdf.js            -> en, th, ja
//   node tools/make_summary_pdf.js th         -> one language
const { execFileSync } = require("child_process");
const fs = require("fs"), path = require("path");

const CHROME = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
].find(p => fs.existsSync(p));
if (!CHROME) throw new Error("Chrome or Edge not found");

const langs = process.argv.slice(2).length ? process.argv.slice(2) : ["en", "th", "ja"];
for (const lang of langs) {
  const out = path.resolve(__dirname, "..", "assets", `KPI_Summary_${lang}.pdf`);
  execFileSync(CHROME, [
    "--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=15000",
    `--print-to-pdf=${out}`, `http://localhost:5180/summary.html?lang=${lang}`
  ], { stdio: "ignore" });
  console.log(lang, fs.statSync(out).size, "bytes ->", path.relative(process.cwd(), out));
}
