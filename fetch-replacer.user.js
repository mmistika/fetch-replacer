// ==UserScript==
// @name         Fetch Replacer
// @version      1.0
// @description  Intercepts fetch() and serves your resource version
// @author       mmistika (https://github.com/mmistika)
// @namespace    https://github.com/mmistika
// @supportURL   https://github.com/mmistika/fetch-replacer/issues
// @downloadURL  https://github.com/mmistika/fetch-replacer/raw/refs/heads/main/fetch-replacer.user.js
// @updateURL    https://github.com/mmistika/fetch-replacer/raw/refs/heads/main/fetch-replacer.user.js
// @match        *://*/*
// @license      MIT
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';
    if (window.top !== window.self) return;

    // substring to detect the resource to replace
    const substr = '';

    // url of the replacement resource
    const replacement = '';

    const originalFetch = window.fetch;

    window.fetch = async function (resource, init = {}) {
        let url = '';

        if (typeof resource === 'string') {
            url = resource;
        } else if (resource instanceof Request) {
            url = resource.url;
        } else if (resource && resource.url) {
            url = resource.url;
        }

        if (url.includes(substr)) {
            console.log(`%c[FR] Intercepted ${url}`, 'color:#0f0;font-weight:bold');

            return originalFetch(replacement, {
                ...init,
                credentials: 'omit'
            });
        }

        return originalFetch(resource, init);
    };

    console.log('%c[FR] Loaded', 'color:#0f0');
})();
