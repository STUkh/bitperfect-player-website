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

  // 2. Fix !tokenRes.ok block if it had invalid _tokenData reference
  const badOkBlock = "if (!tokenRes.ok) {\n    return {\n      status: 401,\n      body: 'Authorization failed' + (_tokenData && _tokenData.error ? ': ' + _tokenData.error + (_tokenData.error_description ? ' (' + _tokenData.error_description + ')' : '') : '')\n    };\n  }";
  const originalOkBlock = "if (!tokenRes.ok) {\n    return {\n      status: 401,\n      body: 'Authorization failed'\n    };\n  }";
  const goodOkBlock = "if (!tokenRes.ok) {\n    const _errTxt = await tokenRes.text().catch(() => '');\n    return {\n      status: 401,\n      body: 'Authorization failed (HTTP ' + tokenRes.status + '): ' + _errTxt\n    };\n  }";

  if (content.includes(badOkBlock)) {
    content = content.replace(badOkBlock, goodOkBlock);
    console.log(`[patch-keystatic] Fixed !tokenRes.ok block in ${relPath}`);
  } else if (content.includes(originalOkBlock)) {
    content = content.replace(originalOkBlock, goodOkBlock);
    console.log(`[patch-keystatic] Injected HTTP error reporting into ${relPath}`);
  }

  // 3. Enhance error reporting in try/catch around tokenDataResultType.create
  const catchTarget = "  try {\n    tokenData = tokenDataResultType.create(_tokenData);\n  } catch {\n    return {\n      status: 401,\n      body: 'Authorization failed'\n    };\n  }";
  const catchPatched = "  try {\n    tokenData = tokenDataResultType.create(_tokenData);\n  } catch (_oauthErr) {\n    const _errDetail = typeof _tokenData === 'object' && _tokenData ? JSON.stringify(_tokenData) : String(_oauthErr);\n    return {\n      status: 401,\n      body: 'Authorization failed: ' + _errDetail\n    };\n  }";

  if (content.includes(catchTarget)) {
    content = content.replace(catchTarget, catchPatched);
    console.log(`[patch-keystatic] Injected catch error reporting into ${relPath}`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

console.log('[patch-keystatic] Done.');
