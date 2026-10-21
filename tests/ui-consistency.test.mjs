import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { test, before, after } from "node:test";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

let server;
let markup;

before(async () => {
  // A real React render without opening a browser or a listening server.
  globalThis.window = {
    matchMedia: () => ({ matches: false }),
    IntersectionObserver: class {},
  };
  server = await createServer({
    server: { middlewareMode: true, hmr: false, ws: false, watch: null },
  });
  const { default: App } = await server.ssrLoadModule("/src/App.jsx");
  const { default: Footer } = await server.ssrLoadModule("/src/components/Footer.jsx");
  const { default: Gallery } = await server.ssrLoadModule("/src/components/Panoramic3DSection.jsx");
  markup = renderToStaticMarkup(createElement(App)) +
    renderToStaticMarkup(createElement(Gallery)) +
    renderToStaticMarkup(createElement(Footer));
});

after(async () => {
  await server?.close();
  delete globalThis.window;
});

test("every internal anchor resolves and section IDs are unique", () => {
  const ids = [...markup.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, "Duplicate IDs in the spotlight mirror");
  for (const [, href] of markup.matchAll(/href="(#[^"]*)"/g)) {
    assert.notEqual(href, "#", "Unfinished anchor destination");
    assert.ok(ids.includes(href.slice(1)), `Missing destination: ${href}`);
  }
});

test("personal details and contact actions are absent from the rendered website", () => {
  assert.ok(!/bader|badr|0622389826|622389826|mailto:|tel:|wa\.me|CONTACT US|CALL US|WHATSAPP|Copy email|#contact/i.test(markup));
  assert.ok(!/instagram\.com|facebook\.com/i.test(markup));
});

test("hero retains exact message and has no image or decorative widgets", () => {
  const hero = markup.match(/<section id="hero"[\s\S]*?<\/section>/)[0];
  assert.ok(hero.includes("BUILD"));
  assert.ok(hero.includes("WHAT&#x27;S"));
  assert.ok(hero.includes('aria-label="NEXT."'));
  assert.ok(hero.includes("We create digital experiences, websites and smart solutions designed to help your business grow."));
  assert.ok(hero.includes("DISCOVER KAZ NEXT"));
  assert.ok(!/<img|<picture|<canvas/.test(hero));
});

test("rendered assets exist in Vite's public directory", () => {
  for (const [, src] of markup.matchAll(/src="(\/assets\/[^"]+)"/g)) {
    assert.ok(existsSync(`public-runtime${src}`), `Missing asset: ${src}`);
  }
  for (const name of ["atlas-estates", "lumina-dental", "harris-and-co", "sora-table", "pulse-studio"]) {
    assert.ok(existsSync(`public-runtime/assets/optimized/projects/${name}-960.webp`));
  }
});

test("standard buttons and mobile rules share the design system", () => {
  const css = readFileSync("src/design-system.css", "utf8");
  assert.ok(css.includes("--kaz-radius: 15px"));
  assert.ok(css.includes(".page-shell .kaz-button"));
  assert.ok(css.includes("prefers-reduced-motion"));
  assert.ok(css.includes("max-width: 768px"));
  assert.ok(css.includes("max-width: 700px"));
  for (const [hex] of css.matchAll(/#[\da-f]{6}\b/gi)) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    assert.ok(r === g && g === b, `Non-monochrome system color: ${hex}`);
  }
});

test("locked sections retain their original code and controls", () => {
  const original = (path) => execFileSync("git", ["show", `bab4a04:${path}`], { encoding: "utf8" });
  for (const path of ["src/Gameboy.css", "src/FlankRail.css", "src/components/Panoramic3DSection.jsx", "src/Panoramic3D.css", "src/PanoramaRefine.css"]) {
    assert.equal(readFileSync(path, "utf8"), original(path), `${path} is locked`);
  }
  const app = readFileSync("src/App.jsx", "utf8");
  const baseline = original("src/App.jsx");
  const slice = (source, start, end) => source.slice(source.indexOf(start), source.indexOf(end, source.indexOf(start)));
  assert.equal(slice(app, "const projects = [", "function DeferredContent"), slice(baseline, "const projects = [", "function DeferredContent"));
  assert.equal(slice(app, "  const open =", "  const playControlSound"), slice(baseline, "  const open =", "  const playControlSound"));
  assert.equal(slice(app, "  useEffect(() => {\n    const down =", "  useEffect(() => {\n    if (!ingesting)"), slice(baseline, "  useEffect(() => {\n    const down =", "  useEffect(() => {\n    if (!ingesting)"));
  const showcase = (source) => source.match(/        <section\n          ref=\{showcaseRef\}[\s\S]*?        <\/section>/)[0];
  assert.equal(showcase(app), showcase(baseline));
  const css = readFileSync("src/design-system.css", "utf8");
  assert.ok(!/\.gameboy|\.showcase|\.client-trust|#client-trust-title|\.panorama|\.gallery|\.hint/.test(css));
  assert.ok(!/section\[id\]|\.page-shell :where\(a, button\)/.test(css));
});

test("Trust refinement preserves testimonial content and card hover contrast", () => {
  const current = readFileSync("src/components/ClientTrust.jsx", "utf8");
  const original = execFileSync("git", ["show", "bab4a04:src/components/ClientTrust.jsx"], { encoding: "utf8" });
  // Layout wrappers and classes may change; existing copy, links, and content stay.
  const content = (source) => source
    .replace(/className="[^"]*"/g, 'className=""')
    .replace(/<div\b[^>]*>|<\/div>/g, "")
    .replace(/\s+/g, " ");
  assert.equal(content(current), content(original));
  assert.ok(current.includes("hover:bg-black hover:text-white"));
  assert.ok(current.includes("group-hover:!text-white"));
  assert.equal((current.match(/group-hover:text-white/g) || []).length, 3);
});

test("no decorative emoji UI is rendered", () => {
  assert.ok(!/[\u{1F300}-\u{1FAFF}]/u.test(markup));
});
