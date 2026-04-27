#!/usr/bin/env node
/**
 * Génère sitemap.xml + robots.txt à partir des pages présentes dans out/.
 *
 * - Scanne out/*.html (récursif), exclut 404.html, .md, _next/, etc.
 * - Attribue priority + changefreq selon la nature de la page
 * - Format : sitemap.org standard
 * - robots.txt : autorise tous crawlers + GPTBot, ClaudeBot, PerplexityBot,
 *   Google-Extended, et pointe vers le sitemap
 *
 * Tourne après next build, intégré dans npm run build.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { siteConfig } from "../site.config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "..", "out");
const SITE_URL = siteConfig.url;
const EXCLUDE = new Set(["404.html"]);
// Fichiers à exclure du sitemap (mais qui restent servis publiquement)
const EXCLUDE_PATTERNS = [
  /^google[a-f0-9]+\.html$/, // fichiers de vérification Google Search Console
];
const TODAY = new Date().toISOString().slice(0, 10);

/**
 * Règles de priorité — ajuster ici si besoin
 */
function priorityFor(urlPath) {
  if (urlPath === "/") return { priority: "1.0", changefreq: "weekly" };
  if (/\/(mentions-legales|confidentialite|cgu|cgv)$/.test(urlPath)) {
    return { priority: "0.3", changefreq: "yearly" };
  }
  if (urlPath === "/tarifs.html" || urlPath === "/tarifs") {
    return { priority: "0.9", changefreq: "monthly" };
  }
  if (urlPath.startsWith("/projets/")) {
    return { priority: "0.8", changefreq: "monthly" };
  }
  // Default
  return { priority: "0.7", changefreq: "monthly" };
}

function findHtmlFiles(dir, base = dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "_next") continue;
      files.push(...findHtmlFiles(full, base));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      const rel = path.relative(base, full).replace(/\\/g, "/");
      if (EXCLUDE.has(rel)) continue;
      if (EXCLUDE_PATTERNS.some((p) => p.test(rel))) continue;
      files.push(rel);
    }
  }
  return files;
}

function htmlToUrlPath(rel) {
  // index.html → /
  // confidentialite.html → /confidentialite
  // projets/marceau.html → /projets/marceau
  // tarifs.html → /tarifs.html (page statique gardée avec son extension)
  if (rel === "index.html") return "/";
  if (rel === "tarifs.html") return "/tarifs.html";
  return "/" + rel.replace(/\.html$/, "");
}

function generateSitemap(urls) {
  const entries = urls
    .map(({ url, priority, changefreq }) => {
      return `  <url>
    <loc>${SITE_URL}${url}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

function generateRobots() {
  return `# robots.txt — Studio FTT
# Last updated: ${TODAY}

# Crawlers traditionnels (Google, Bing, DuckDuckGo, etc.)
User-agent: *
Allow: /

# Crawlers IA — autorisations explicites
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: Bytespider
Allow: /

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml
`;
}

function main() {
  if (!fs.existsSync(OUT_DIR)) {
    console.error(`❌ out/ folder not found at ${OUT_DIR}. Run \`next build\` first.`);
    process.exit(1);
  }

  const htmlFiles = findHtmlFiles(OUT_DIR);
  const urls = htmlFiles
    .map((rel) => {
      const urlPath = htmlToUrlPath(rel);
      const { priority, changefreq } = priorityFor(urlPath);
      return { url: urlPath, priority, changefreq };
    })
    // Sort: homepage first, then by priority desc, then alpha
    .sort((a, b) => {
      if (a.url === "/") return -1;
      if (b.url === "/") return 1;
      if (a.priority !== b.priority) return b.priority.localeCompare(a.priority);
      return a.url.localeCompare(b.url);
    });

  const sitemap = generateSitemap(urls);
  const robots = generateRobots();

  const sitemapPath = path.join(OUT_DIR, "sitemap.xml");
  const robotsPath = path.join(OUT_DIR, "robots.txt");

  fs.writeFileSync(sitemapPath, sitemap, "utf-8");
  fs.writeFileSync(robotsPath, robots, "utf-8");

  console.log(`\n📍 Generated sitemap.xml with ${urls.length} URLs:`);
  for (const u of urls) {
    console.log(`   ${u.priority}  ${u.changefreq.padEnd(8)}  ${u.url}`);
  }
  console.log(`\n🤖 Generated robots.txt (allow all + AI crawlers, sitemap pointer)`);
  console.log(`\n✅ Files written to:`);
  console.log(`   ${path.relative(process.cwd(), sitemapPath)}`);
  console.log(`   ${path.relative(process.cwd(), robotsPath)}`);
}

main();
