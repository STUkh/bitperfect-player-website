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

  // 3. Normalize OAuth token response to support both GitHub Apps and standard OAuth Apps
  const parseJsonTarget = "const _tokenData = await tokenRes.json();";
  const parseJsonPatched =
    "const _tokenData = await tokenRes.json();\n  if (_tokenData && _tokenData.access_token) {\n    if (typeof _tokenData.expires_in !== 'number') _tokenData.expires_in = 28800;\n    if (typeof _tokenData.refresh_token !== 'string') _tokenData.refresh_token = '';\n    if (typeof _tokenData.refresh_token_expires_in !== 'number') _tokenData.refresh_token_expires_in = 15552000;\n    if (typeof _tokenData.scope !== 'string') _tokenData.scope = '';\n  }";

  if (content.includes(parseJsonTarget) && !content.includes("_tokenData.expires_in = 28800")) {
    content = content.replace(parseJsonTarget, parseJsonPatched);
    console.log(`[patch-keystatic] Injected OAuth token normalization into ${relPath}`);
  }

  // 4. Enhance error reporting in try/catch around tokenDataResultType.create
  const catchTarget = "  try {\n    tokenData = tokenDataResultType.create(_tokenData);\n  } catch {\n    return {\n      status: 401,\n      body: 'Authorization failed'\n    };\n  }";
  const catchPatched = "  try {\n    tokenData = tokenDataResultType.create(_tokenData);\n  } catch (_oauthErr) {\n    const _errDetail = typeof _tokenData === 'object' && _tokenData ? JSON.stringify(_tokenData) : String(_oauthErr);\n    return {\n      status: 401,\n      body: 'Authorization failed: ' + _errDetail\n    };\n  }";

  if (content.includes(catchTarget)) {
    content = content.replace(catchTarget, catchPatched);
    console.log(`[patch-keystatic] Injected catch error reporting into ${relPath}`);
  }

  // 5. Make getTokenCookies resilient to empty refresh_token
  const cookiesTarget = "  const headers = [['Set-Cookie', cookie.serialize('keystatic-gh-access-token', tokenData.access_token, {\n    sameSite: 'lax',\n    secure: process.env.NODE_ENV === 'production',\n    maxAge: tokenData.expires_in,\n    expires: new Date(Date.now() + tokenData.expires_in * 1000),\n    path: '/'\n  })], ['Set-Cookie', cookie.serialize('keystatic-gh-refresh-token', await encryptValue(tokenData.refresh_token, config.secret), {\n    sameSite: 'lax',\n    secure: process.env.NODE_ENV === 'production',\n    httpOnly: true,\n    maxAge: tokenData.refresh_token_expires_in,\n    expires: new Date(Date.now() + tokenData.refresh_token_expires_in * 100),\n    path: '/'\n  })]];";
  const cookiesPatched = "  const headers = [['Set-Cookie', cookie.serialize('keystatic-gh-access-token', tokenData.access_token, {\n    sameSite: 'lax',\n    secure: process.env.NODE_ENV === 'production',\n    maxAge: tokenData.expires_in,\n    expires: new Date(Date.now() + tokenData.expires_in * 1000),\n    path: '/'\n  })]];\n  if (tokenData.refresh_token && config && config.secret) {\n    try {\n      headers.push(['Set-Cookie', cookie.serialize('keystatic-gh-refresh-token', await encryptValue(tokenData.refresh_token, config.secret), {\n        sameSite: 'lax',\n        secure: process.env.NODE_ENV === 'production',\n        httpOnly: true,\n        maxAge: tokenData.refresh_token_expires_in,\n        expires: new Date(Date.now() + tokenData.refresh_token_expires_in * 100),\n        path: '/'\n      })]);\n    } catch (_encErr) {}\n  }";

  if (content.includes(cookiesTarget)) {
    content = content.replace(cookiesTarget, cookiesPatched);
    console.log(`[patch-keystatic] Injected resilient getTokenCookies into ${relPath}`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

console.log('[patch-keystatic] Done.');
