#!/usr/bin/env node
/**
 * Génère un mirror Markdown propre pour chaque page HTML du build.
 *
 * Pour chaque .html dans out/ (sauf 404.html) :
 *  - parse avec cheerio
 *  - retire nav/footer/script/style/header/aria-hidden/CursorBlob
 *  - convertit le main/section restants en markdown via turndown
 *  - ajoute un front-matter (title, description, url, last_updated)
 *  - sauve à côté en .md
 *
 * Tourne après `next build`, à intégrer via npm run build.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";
import TurndownService from "turndown";
import { siteConfig } from "../site.config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "..", "out");
const SITE_URL = siteConfig.url;
const EXCLUDE = new Set(["404.html"]);

const turndown = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
  emDelimiter: "_",
});

// Garde les liens, mais en format markdown propre
turndown.addRule("cleanLinks", {
  filter: "a",
  replacement: (content, node) => {
    const href = node.getAttribute("href");
    if (!href) return content;
    return `[${content}](${href})`;
  },
});

function findHtmlFiles(dir, base = dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip Next.js internals
      if (entry.name === "_next") continue;
      files.push(...findHtmlFiles(full, base));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      const rel = path.relative(base, full).replace(/\\/g, "/");
      if (EXCLUDE.has(rel)) continue;
      files.push({ full, rel });
    }
  }
  return files;
}

function buildUrl(rel) {
  // index.html → /
  // projets/marceau.html → /projets/marceau
  // confidentialite.html → /confidentialite
  let url = "/" + rel.replace(/index\.html$/, "").replace(/\.html$/, "");
  if (url.endsWith("/") && url.length > 1) url = url.slice(0, -1);
  return SITE_URL + url;
}

function cleanHtml($) {
  // Strip header (navbar), nav, footer, scripts, styles, etc.
  $("header, nav, footer, script, style, noscript").remove();
  $("[aria-hidden='true'], [aria-hidden]").remove();
  // Cursor blob, halos décoratifs (divs absolutes)
  $(".blob").remove();
  // Inputs/textareas du form contact (pas pertinents pour les IA)
  $("form input, form textarea, form select, form button").remove();
  // SVG décoratifs (souligné rouge sous "QUI", flèches, halos, etc.)
  $("svg").remove();

  // AVANT de retirer les styles : convertir <span style="display: block"> en <p>
  // pour que turndown ajoute des sauts de ligne propres
  $("span").each((_, el) => {
    const $el = $(el);
    const style = $el.attr("style") || "";
    if (/display\s*:\s*block/i.test(style)) {
      const html = $el.html() || "";
      $el.replaceWith(`<p>${html}</p>`);
    }
  });

  // Retire les classes pour réduire le bruit
  $("*").removeAttr("class").removeAttr("style").removeAttr("data-cf-beacon");
  return $;
}

function extractMeta($, url) {
  const title = $("title").first().text().trim() || "Studio FTT";
  let description =
    $('meta[name="description"]').attr("content") ||
    $('meta[property="og:description"]').attr("content") ||
    "";
  description = description.trim();
  return { title, description, url };
}

function buildMarkdown({ title, description, url }, body) {
  const today = new Date().toISOString().slice(0, 10);
  const header = [
    `# ${title}`,
    "",
    description ? `> ${description}` : null,
    "",
    `**URL** : ${url}  `,
    `**Last updated** : ${today}`,
    "",
    "---",
    "",
  ]
    .filter((l) => l !== null)
    .join("\n");
  return header + body.trim() + "\n";
}

function main() {
  if (!fs.existsSync(OUT_DIR)) {
    console.error(`❌ out/ folder not found at ${OUT_DIR}`);
    console.error("   Run `next build` first.");
    process.exit(1);
  }

  const files = findHtmlFiles(OUT_DIR);
  console.log(`📄 Found ${files.length} HTML files to mirror.\n`);

  const generated = [];

  for (const { full, rel } of files) {
    const html = fs.readFileSync(full, "utf-8");
    const $ = cheerio.load(html);

    // Extract meta BEFORE cleaning (the title is in <head>)
    const url = buildUrl(rel);
    const meta = extractMeta($, url);

    // Clean
    cleanHtml($);

    // Convert <body> content (or <main> if exists)
    const main = $("main").length ? $("main").html() : $("body").html();
    const md = turndown.turndown(main || "");

    const finalMd = buildMarkdown(meta, md);

    // Save .md next to .html
    const mdPath = full.replace(/\.html$/, ".md");
    fs.writeFileSync(mdPath, finalMd, "utf-8");

    const mdUrl = url + ".md";
    generated.push({ url, mdUrl, mdPath: path.relative(OUT_DIR, mdPath) });
    console.log(`  ✓ ${rel.padEnd(40)} → ${path.relative(OUT_DIR, mdPath)}`);
  }

  // Save a manifest for easy reference (used by llms.txt update)
  const manifestPath = path.join(OUT_DIR, "md-manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(generated, null, 2), "utf-8");

  console.log(`\n✅ Generated ${generated.length} markdown mirrors.`);
  console.log(`📋 Manifest: ${path.relative(OUT_DIR, manifestPath)}`);
}

main();
