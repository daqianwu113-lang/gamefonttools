import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";

const API_BASE = "https://api.cloudflare.com/client/v4";

const token = process.env.CLOUDFLARE_API_TOKEN;
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const projectName = process.env.CLOUDFLARE_PAGES_PROJECT || "gamefonttools";
const branch = process.env.CLOUDFLARE_PAGES_BRANCH || "main";

if (!token || !accountId) {
  throw new Error("Missing CLOUDFLARE_API_TOKEN or CLOUDFLARE_ACCOUNT_ID.");
}

const publicFiles = [
  "index.html",
  "styles.css",
  "script.js",
  "seo-pages.js",
  "robots.txt",
  "sitemap.xml",
  "public/favicon.svg",
  "public/site.webmanifest",
  "roblox-fonts/index.html",
  "roblox-fonts-generator/index.html",
  "roblox-font-copy-paste/index.html",
  "roblox-studio-fonts/index.html",
  "roblox-rich-text-generator/index.html",
  "what-font-does-roblox-use/index.html",
  "about/index.html",
  "privacy-policy/index.html",
  "terms-of-service/index.html",
];

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json; charset=utf-8",
};

function hashAsset(filePath) {
  const bytes = readFileSync(filePath);
  const extension = extname(filePath).slice(1);
  return createHash("sha256")
    .update(bytes.toString("base64") + extension)
    .digest("hex")
    .slice(0, 32);
}

async function cfFetch(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.success === false) {
    const message = payload.errors?.map((error) => error.message).join("; ");
    throw new Error(`${options.method || "GET"} ${path} failed: ${response.status} ${message || JSON.stringify(payload)}`);
  }
  return payload.result;
}

async function upload() {
  const files = publicFiles.map((name) => {
    const path = join(process.cwd(), name);
    return {
      name,
      path,
      hash: hashAsset(path),
      bytes: readFileSync(path),
      size: statSync(path).size,
      contentType: contentTypes[extname(name)] || "application/octet-stream",
    };
  });

  const { jwt } = await cfFetch(
    `/accounts/${accountId}/pages/projects/${projectName}/upload-token`
  );

  const assetFetch = async (path, options = {}) => {
    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${jwt}`,
        ...(options.headers || {}),
      },
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || payload.success === false) {
      const message = payload.errors?.map((error) => error.message).join("; ");
      throw new Error(`${options.method || "GET"} ${path} failed: ${response.status} ${message || JSON.stringify(payload)}`);
    }
    return payload.result;
  };

  const missingHashes = await assetFetch("/pages/assets/check-missing", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ hashes: files.map((file) => file.hash) }),
  });

  const missingFiles = files.filter((file) => missingHashes.includes(file.hash));
  if (missingFiles.length > 0) {
    await assetFetch("/pages/assets/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        missingFiles.map((file) => ({
          key: file.hash,
          value: file.bytes.toString("base64"),
          metadata: { contentType: file.contentType },
          base64: true,
        }))
      ),
    });
  }

  await assetFetch("/pages/assets/upsert-hashes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ hashes: files.map((file) => file.hash) }),
  }).catch(() => undefined);

  const manifest = Object.fromEntries(
    files.map((file) => [`/${file.name}`, file.hash])
  );

  const formData = new FormData();
  formData.append("manifest", JSON.stringify(manifest));
  formData.append("branch", branch);
  formData.append("commit_message", "Initial static MVP deploy");
  formData.append("commit_dirty", "true");

  const headersPath = join(process.cwd(), "_headers");
  const headersText = readFileSync(headersPath, "utf8");
  formData.append("_headers", new File([headersText], "_headers"));

  const deployment = await cfFetch(
    `/accounts/${accountId}/pages/projects/${projectName}/deployments`,
    {
      method: "POST",
      body: formData,
    }
  );

  console.log(JSON.stringify({
    projectName,
    branch,
    uploaded: missingFiles.length,
    files: files.length,
    deploymentId: deployment.id,
    url: deployment.url,
  }, null, 2));
}

await upload();
