#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

const targetFiles = [
  'node_modules/@keystatic/core/dist/keystatic-core-api-generic.worker.js',
  'node_modules/@keystatic/core/dist/keystatic-core-api-generic.js',
  'node_modules/@keystatic/core/dist/keystatic-core-api-generic.react-server.js',
  'node_modules/@keystatic/core/dist/keystatic-core-api-generic.node.js',
  'node_modules/@keystatic/core/dist/keystatic-core-api-generic.node.react-server.js',
];

const root = path.join(__dirname, '..');

for (const relPath of targetFiles) {
  const filePath = path.join(root, relPath);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Inject redirect_uri into token exchange call if missing
  const targetCode = "url.searchParams.set('code', code);";
  const patchedCode =
    "url.searchParams.set('code', code);\n  const _reqUrl = new URL(req.url, 'http://localhost');\n  url.searchParams.set('redirect_uri', `${_reqUrl.origin}/api/keystatic/github/oauth/callback`);";

  if (content.includes(targetCode) && !content.includes("_reqUrl.origin")) {
    content = content.replace(targetCode, patchedCode);
    console.log(`[patch-keystatic] Injected redirect_uri into ${relPath}`);
  }

  // 2. Enhance error reporting if tokenDataResultType fails
  const errorTarget = "body: 'Authorization failed'";
  const errorPatched =
    "body: 'Authorization failed' + (_tokenData && _tokenData.error ? ': ' + _tokenData.error + (_tokenData.error_description ? ' (' + _tokenData.error_description + ')' : '') : '')";

  if (content.includes(errorTarget) && !content.includes("_tokenData.error_description")) {
    content = content.replace(errorTarget, errorPatched);
    console.log(`[patch-keystatic] Enhanced OAuth error reporting in ${relPath}`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

console.log('[patch-keystatic] Done.');
