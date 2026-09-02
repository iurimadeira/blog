import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const projectRoot = new URL("..", import.meta.url).pathname;
const hugoBin = process.env.HUGO_BIN ?? "hugo";

function buildSite(env = {}, baseURL = "https://example.invalid/") {
  const destination = mkdtempSync(join(tmpdir(), "blog-v1-site-"));

  const args = [
    "--source",
    projectRoot,
    "--destination",
    destination,
    "--cleanDestinationDir",
    "--panicOnWarning",
  ];

  if (baseURL) {
    args.push("--baseURL", baseURL);
  }

  execFileSync(
    hugoBin,
    args,
    { env: { ...process.env, ...env }, stdio: "pipe" },
  );

  return destination;
}

test("the public site builds every approved route", () => {
  const destination = buildSite();

  try {
    const routes = [
      "index.html",
      "posts/index.html",
      "about/index.html",
      "contact/index.html",
      "privacy/index.html",
      "thank-you/index.html",
      "404.html",
      "index.xml",
      "posts/ai-agents-can-blaze-trails/index.html",
    ];

    for (const route of routes) {
      assert.equal(existsSync(join(destination, route)), true, `missing ${route}`);
    }

    const home = readFileSync(join(destination, "index.html"), "utf8");
    assert.match(home, /<html[^>]+lang="en-us"/);
    assert.match(home, /Iuri Madeira/);
    assert.match(home, /class="logo" aria-label="Iuri Madeira home"/);
    assert.doesNotMatch(home, /class="site-title"/);
    assert.match(
      home,
      /Software engineer\. Writing questionable takes on Elixir, distributed systems, AI, and whatever else comes to mind\./,
    );
    assert.doesNotMatch(home, /AI-assisted software development/);
  } finally {
    rmSync(destination, { recursive: true, force: true });
  }
});

test("the first post preserves the approved article", () => {
  const source = readFileSync(
    join(projectRoot, "content/posts/ai-agents-can-blaze-trails.md"),
    "utf8",
  );
  const frontMatterEnd = source.indexOf("\n---\n", 4);
  const body = source.slice(frontMatterEnd + 5);
  const bodyHash = createHash("sha256").update(body).digest("hex");

  assert.equal(
    bodyHash,
    "3f557f546e0cb554fb10e0e48b8af3e4d450ba3b861339da173b05611981b65a",
  );

  const destination = buildSite();

  try {
    const article = readFileSync(
      join(destination, "posts/ai-agents-can-blaze-trails/index.html"),
      "utf8",
    );
    assert.equal((article.match(/<h1[ >]/g) ?? []).length, 1);
    assert.match(
      article,
      /<span class="reading-time">\d+ min read<\/span>[\s\S]*<h1 class="header-title">Agents Blaze Trails\. Scale Needs Roads\.<\/h1>/,
    );
    assert.match(article, /Agents Blaze Trails\. Scale Needs Roads\./);
    assert.match(
      article,
      /class="paradigm-shift"[\s\S]*<strong>AI → Software → Result<\/strong>[\s\S]*<span>vs\.<\/span>[\s\S]*<strong>Agent → Result<\/strong>/,
    );
    assert.match(article, /shift from SaaS to Agent-as-a-Service/);
    assert.doesNotMatch(article, /The explorer and the road are not competing technologies/);
    assert.doesNotMatch(article, /A market intelligence product might use persistent code/);
    assert.doesNotMatch(article, /AI Agents Can Blaze Trails\. But Scale Still Needs Roads\./);
    assert.doesNotMatch(body, /—/);
    assert.match(article, /Scouts and Roads/);
    assert.match(article, /A Matter of Variation and Scale/);
    assert.match(article, /https:\/\/arxiv\.org\/abs\/2606\.05608v2/);
  } finally {
    rmSync(destination, { recursive: true, force: true });
  }
});

test("about publishes the approved professional history only", () => {
  const destination = buildSite();

  try {
    const about = readFileSync(join(destination, "about/index.html"), "utf8");
    assert.match(about, /more than 13 years ago/);
    assert.match(about, /19 of 23 product domains/);
    assert.match(about, /tens of thousands of users/);
    assert.doesNotMatch(about, /I(?:&#39;|')m looking for roles/);
  } finally {
    rmSync(destination, { recursive: true, force: true });
  }
});

test("contact has a safe preview state and a production delivery state", () => {
  const previewDestination = buildSite();

  try {
    const contact = readFileSync(
      join(previewDestination, "contact/index.html"),
      "utf8",
    );
    assert.match(contact, /action="https:\/\/api\.web3forms\.com\/submit"/);
    assert.match(contact, /name="name"/);
    assert.match(contact, /name="email"/);
    assert.match(contact, /name="message"/);
    assert.match(contact, /<button type="submit" disabled/);
    assert.match(contact, /mailto:iurimadeira@gmail\.com/);
    assert.match(contact, /href="\/privacy\/"/);
    assert.doesNotMatch(contact, /web3forms\.com\/client\/script\.js/);
  } finally {
    rmSync(previewDestination, { recursive: true, force: true });
  }

  const liveDestination = buildSite({
    HUGO_WEB3FORMS_ACCESS_KEY: "00000000-0000-0000-0000-000000000000",
  });

  try {
    const contact = readFileSync(join(liveDestination, "contact/index.html"), "utf8");
    assert.match(contact, /value="00000000-0000-0000-0000-000000000000"/);
    assert.match(contact, /class="h-captcha" data-captcha="true"/);
    assert.match(contact, /web3forms\.com\/client\/script\.js/);
    assert.doesNotMatch(contact, /<button type="submit" disabled/);
  } finally {
    rmSync(liveDestination, { recursive: true, force: true });
  }

  const customStyles = readFileSync(
    join(projectRoot, "assets/sass/_custom.scss"),
    "utf8",
  );
  assert.match(
    customStyles,
    /\.form-field input,\s*\.form-field textarea \{[^}]*box-sizing: border-box;/s,
  );
  assert.match(
    customStyles,
    /\.paradigm-shift \{[^}]*display: grid;[^}]*text-align: center;/s,
  );
});

test("production SEO uses HTTPS and keeps the confirmation page out of search", () => {
  const destination = buildSite({}, null);

  try {
    const home = readFileSync(join(destination, "index.html"), "utf8");
    const article = readFileSync(
      join(destination, "posts/ai-agents-can-blaze-trails/index.html"),
      "utf8",
    );
    const thankYou = readFileSync(join(destination, "thank-you/index.html"), "utf8");
    const sitemap = readFileSync(join(destination, "sitemap.xml"), "utf8");
    const feed = readFileSync(join(destination, "index.xml"), "utf8");

    assert.match(home, /<link rel="canonical" href="https:\/\/iurimadeira\.com\/"/);
    assert.match(
      article,
      /"mainEntityOfPage":\s*"https:\/\/iurimadeira\.com\/posts\/ai-agents-can-blaze-trails\/"/,
    );
    assert.match(thankYou, /<meta name="robots" content="noindex">/);
    assert.doesNotMatch(sitemap, /\/thank-you\//);
    assert.doesNotMatch(sitemap, /http:\/\/iurimadeira\.com/);
    assert.doesNotMatch(feed, /http:\/\/iurimadeira\.com/);
  } finally {
    rmSync(destination, { recursive: true, force: true });
  }
});

test("global navigation exposes an accessible color-mode control", () => {
  const destination = buildSite();

  try {
    const home = readFileSync(join(destination, "index.html"), "utf8");
    assert.match(home, /id="mode"[^>]+aria-label="Toggle color theme"/);
    assert.match(home, /id="menu-button"[^>]+aria-label="Open main menu"[^>]+aria-expanded="false"/);
  } finally {
    rmSync(destination, { recursive: true, force: true });
  }
});

test("Pages deployment is pinned and remains manually gated", () => {
  const workflow = readFileSync(
    join(projectRoot, ".github/workflows/pages.yml"),
    "utf8",
  );

  assert.match(workflow, /workflow_dispatch:/);
  assert.doesNotMatch(workflow, /^\s*push:/m);
  assert.match(workflow, /HUGO_VERSION: 0\.165\.0/);
  assert.match(workflow, /archive="hugo_extended_\$\{HUGO_VERSION\}_linux-amd64\.tar\.gz"/);
  assert.match(workflow, /f43494894cdf4a8630a201d5c828051c77f523cc66bb3938b30806835470ac20/);
  assert.match(workflow, /actions\/checkout@v7/);
  assert.match(workflow, /actions\/configure-pages@v6/);
  assert.match(workflow, /actions\/upload-pages-artifact@v5/);
  assert.match(workflow, /actions\/deploy-pages@v5/);
  assert.match(workflow, /pages: write/);
  assert.match(workflow, /id-token: write/);
  assert.doesNotMatch(workflow, /--baseURL/);
});
