import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const projectRoot = new URL("..", import.meta.url).pathname;
const hugoBin = process.env.HUGO_BIN ?? "hugo";

function buildSite(env = {}) {
  const destination = mkdtempSync(join(tmpdir(), "blog-v1-site-"));

  execFileSync(
    hugoBin,
    [
      "--source",
      projectRoot,
      "--destination",
      destination,
      "--cleanDestinationDir",
      "--panicOnWarning",
      "--baseURL",
      "https://example.invalid/",
    ],
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
  } finally {
    rmSync(destination, { recursive: true, force: true });
  }
});

test("the first post preserves the supplied article exactly", () => {
  const source = readFileSync(
    join(projectRoot, "content/posts/ai-agents-can-blaze-trails.md"),
    "utf8",
  );
  const frontMatterEnd = source.indexOf("\n---\n", 4);
  const body = source.slice(frontMatterEnd + 5);
  const bodyHash = createHash("sha256").update(body).digest("hex");

  assert.equal(
    bodyHash,
    "155cd5668d1d93361a4947816e8ab327aa3c93524511d85bcd9a5080d0fcf69e",
  );

  const destination = buildSite();

  try {
    const article = readFileSync(
      join(destination, "posts/ai-agents-can-blaze-trails/index.html"),
      "utf8",
    );
    assert.equal((article.match(/<h1[ >]/g) ?? []).length, 1);
    assert.match(article, /What Disposable Code Actually Means/);
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
});
