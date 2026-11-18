// Shared builders for the project cards, the KPI page and the printable KPI summary.
// Used by the 3D site (main.js) and by summary.html, which is printed to assets/KPI_Summary_<lang>.pdf
// by tools/make_summary_pdf.js. Content comes from the classic-script globals in content_*.js.

export const IDX = { siamese: 0, dashboard: 1, travel: 2, sumitronic: 3, troubleshooting: 4, slc: 5, bdms: 6 };
// KPI sheet "KPI Summary for R&D" (end of Oct 2026): indices into P, in shelf order b1..b7
export const KPI_GROUPS = [
  { key: "error", weight: 40, items: [IDX.troubleshooting] },
  { key: "new", weight: 40, items: [IDX.siamese, IDX.sumitronic, IDX.slc, IDX.bdms] },
  { key: "goal", weight: 20, items: [IDX.dashboard, IDX.travel] }
];
export const CONTENT = {
  en: () => ({ P: P_EN, ABOUT: ABOUT_EN, CONTACT: CONTACT_EN, KPI: KPI_EN }),
  th: () => ({ P: P_TH, ABOUT: ABOUT_TH, CONTACT: CONTACT_TH, KPI: KPI_TH }),
  ja: () => ({ P: P_JA, ABOUT: ABOUT_JA, CONTACT: CONTACT_JA, KPI: KPI_JA })
};
export const pad = i => String(i + 1).padStart(2, "0");

export function heroHTML(h){
  if (!h) return "";
  const fig = x => `<figure><img src="${x.src}" alt="${x.cap || ""}" style="object-position:${x.pos || "50% 50%"}">${x.cap ? `<figcaption>${x.cap}</figcaption>` : ""}</figure>`;
  return Array.isArray(h) ? `<div class="hero duo">${h.map(fig).join("")}</div>` : `<div class="hero">${fig(h)}</div>`;
}
// u = the UI strings of the current language (nextYear, inProgress)
export function projectHTML(c, i, u){
  const p = c.P[i];
  return `<div class="kicker">${pad(i)} · ${p.kicker}</div>
    <h2>${p.title}${p.soon ? `<span class="status">${p.id === "bdms" ? "● " + u.nextYear : u.inProgress}</span>` : ""}</h2>
    <p class="teaser">${p.short}</p>
    <div class="tags">${p.tags.map(x => `<span>${x}</span>`).join("")}</div>
    ${heroHTML(p.hero)}${p.body}`;
}
export function kpiHTML(c, { button = "" } = {}){
  const K = c.KPI, P = c.P;
  const item = i => `<button class="kpi-item" data-i="${i}"><b>${P[i].title}</b><span>${K.notes[P[i].id] || P[i].short}</span></button>`;
  return `<div class="kicker">${K.kicker}</div><h2>${K.title}</h2><p class="teaser">${K.intro}</p>
    <div class="kpi">${KPI_GROUPS.map(g => `<section class="kpi-g"><header><b>${K.groups[g.key].title}</b><i>${g.weight}%</i></header>
      <p>${K.groups[g.key].text}</p>${g.items.map(item).join("")}</section>`).join("")}</div>${button}`;
}
// the whole printable document: KPI page, then every project in KPI order, then About
export function summaryHTML(c, u){
  const order = KPI_GROUPS.flatMap(g => g.items);
  return `<article class="dbody pr-kpi">${kpiHTML(c)}</article>
    ${order.map(i => `<article class="dbody pr-card">${projectHTML(c, i, u)}</article>`).join("")}
    <article class="dbody pr-card">${c.ABOUT}</article>`;
}
