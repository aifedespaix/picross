import { J as getRequestHeader, K as toRouteMatcher, L as createRouter, M as parseURL, O as withoutBase, P as withLeadingSlash, Q as resolveLocaleFromRoute, R as computeLocaleAlternates, x as joinURL, S as withHttps, T as createDefu, U as hash, V as defineCachedFunction, W as getSiteConfig, k as useNitroApp, X as useRuntimeConfig, Y as withQuery, Z as hasProtocol, _ as parsePath, $ as stringifyQuery, a0 as parseQuery, a1 as encodePath, a2 as stringifyParsedURL, a3 as withoutTrailingSlash, a4 as defu, a5 as createFetch, a6 as serverFetch, a7 as $fetch, a8 as resolveI18nDomain, a9 as resolveSitePath, aa as getQuery, ab as createSitePathResolver, ac as fixSlashes, ad as getPathRobotConfig, ae as createError, af as withoutLeadingSlash, ag as sendRedirect, ah as withBase } from '../nitro/nitro.mjs';
import { createConsola } from 'consola';
import { collectSitemap } from 'sitemapd/parse';

function firstHeaderValue(value) {
  return value?.split(",")[0]?.trim() || void 0;
}
function requestUrl(e) {
  const { url } = e;
  if (url)
    return url;
  const href = e.req?.url;
  return typeof href === "string" && URL.canParse(href) ? new URL(href) : void 0;
}
function getForwardedHost(e) {
  return firstHeaderValue(getRequestHeader(e, "x-forwarded-host")) || getRequestHeader(e, "host") || "";
}
function getForwardedProtocol(e) {
  const forwarded = firstHeaderValue(getRequestHeader(e, "x-forwarded-proto"));
  if (forwarded === "http" || forwarded === "https")
    return forwarded;
  return requestUrl(e)?.protocol.slice(0, -1);
}
function getRequestPathname(e) {
  const url = requestUrl(e);
  if (!url)
    throw new TypeError("[@nuxtjs/sitemap] The request event has no absolute URL.");
  return url.pathname;
}
function getDecodedRouterParam(e, name) {
  const value = e.context.params?.[name];
  if (value === void 0)
    return void 0;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

const staticConfig = {"isI18nMapped":true,"sitemapName":"sitemap.xml","isMultiSitemap":true,"excludeAppSources":["nuxt:pages"],"cacheMaxAgeSeconds":600,"experimentalStreaming":false,"routeRuleHeaders":{"/**":{"headers":{"X-Content-Type-Options":"nosniff","X-Frame-Options":"DENY","Referrer-Policy":"strict-origin-when-cross-origin","Permissions-Policy":"camera=(), microphone=(), geolocation=(), payment=()","Strict-Transport-Security":"max-age=31536000; includeSubDomains","Cross-Origin-Opener-Policy":"same-origin"}},"/_nuxt/**":{"headers":{"Cache-Control":"public, max-age=31536000, immutable"}}},"autoLastmod":false,"defaultSitemapsChunkSize":1000,"minify":false,"sortEntries":true,"discoverImages":true,"discoverVideos":true,"sitemapsPathPrefix":"/__sitemap__/","xsl":false,"xslTips":true,"xslColumns":[{"label":"URL","width":"50%"},{"label":"Images","width":"25%","select":"count(image:image)"},{"label":"Last Updated","width":"25%","select":"concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"}],"credits":true,"version":"9.2.0","sitemaps":{"index":{"sitemapName":"index","_route":"sitemap_index.xml","sitemaps":[],"include":[],"exclude":[]},"fr-FR":{"include":[],"exclude":["/connexion","/en/login","/inscription","/en/register","/compte","/en/account","/creer","/en/create","/admin","/en/admin","/en/login","/connexion","/en/register","/inscription","/en/account","/compte","/en/create","/creer","/en/admin","/jouer","/en/play","/en/play","/jouer","/_**","/_nuxt/**"],"includeAppSources":true,"sitemapName":"fr-FR","_route":"/__sitemap__/fr-FR.xml"},"en-US":{"include":[],"exclude":["/connexion","/en/login","/inscription","/en/register","/compte","/en/account","/creer","/en/create","/admin","/en/admin","/en/login","/connexion","/en/register","/inscription","/en/account","/compte","/en/create","/creer","/en/admin","/jouer","/en/play","/en/play","/jouer","/_**","/_nuxt/**"],"includeAppSources":true,"sitemapName":"en-US","_route":"/__sitemap__/en-US.xml"}},"autoI18n":{"differentDomains":false,"multiDomainLocales":false,"defaultLocale":"fr","locales":[{"code":"fr","language":"fr-FR","name":"Français","file":"fr.json","_hreflang":"fr-FR","_sitemap":"fr-FR"},{"code":"en","language":"en-US","name":"English","file":"en.json","_hreflang":"en-US","_sitemap":"en-US"}],"strategy":"prefix_except_default","pages":{"play/[[id]]":{"fr":"/jouer/[[id]]","en":"/play/[[id]]"},"gallery":{"fr":"/galerie","en":"/gallery"},"create":{"fr":"/creer","en":"/create"},"profile":{"fr":"/compte","en":"/account"},"login":{"fr":"/connexion","en":"/login"},"register":{"fr":"/inscription","en":"/register"}}}};

function parseSerializedRegExp(value) {
  const lastSlash = value.lastIndexOf("/");
  return new RegExp(value.slice(1, lastSlash), value.slice(lastSlash + 1));
}
function deserializeFilters(filters) {
  return filters.map((filter) => {
    if (filter instanceof RegExp || typeof filter === "string")
      return filter;
    if (typeof filter.regex === "string")
      return parseSerializedRegExp(filter.regex);
    if (typeof filter.source === "string")
      return new RegExp(filter.source, filter.flags || "");
    return filter;
  });
}
function createFilter(options = {}) {
  const include = deserializeFilters(options.include || []);
  const exclude = deserializeFilters(options.exclude || []);
  if (include.length === 0 && exclude.length === 0)
    return () => true;
  const excludeRegex = exclude.filter((r) => r instanceof RegExp);
  const includeRegex = include.filter((r) => r instanceof RegExp);
  const excludeStrings = exclude.filter((r) => typeof r === "string");
  const includeStrings = include.filter((r) => typeof r === "string");
  const excludeMatcher = excludeStrings.length > 0 ? toRouteMatcher(createRouter({
    routes: Object.fromEntries(excludeStrings.map((r) => [r, true])),
    strictTrailingSlash: false
  })) : null;
  const includeMatcher = includeStrings.length > 0 ? toRouteMatcher(createRouter({
    routes: Object.fromEntries(includeStrings.map((r) => [r, true])),
    strictTrailingSlash: false
  })) : null;
  const excludeExact = new Set(excludeStrings);
  const includeExact = new Set(includeStrings);
  return function(path) {
    if (excludeRegex.some((r) => r.test(path)))
      return false;
    if (excludeExact.has(path))
      return false;
    if (excludeMatcher && excludeMatcher.matchAll(path).length > 0)
      return false;
    if (includeRegex.some((r) => r.test(path)))
      return true;
    if (includeExact.has(path))
      return true;
    if (includeMatcher && includeMatcher.matchAll(path).length > 0)
      return true;
    return include.length === 0;
  };
}
function createModuleLogger(tag, debug) {
  return createConsola({ level: 3, defaults: { tag } });
}

const logger = createModuleLogger("@nuxt/sitemap");
const XML_ENTITIES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;"
};
const XML_SPECIAL_CHARS_RE = /[&<>"']/g;
const HAS_XML_SPECIAL_CHARS_RE = /[&<>"']/;
function xmlEscape(value) {
  const input = String(value);
  return HAS_XML_SPECIAL_CHARS_RE.test(input) ? input.replace(XML_SPECIAL_CHARS_RE, (char) => XML_ENTITIES[char]) : input;
}
const merger = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value))
    obj[key] = Array.from(/* @__PURE__ */ new Set([...obj[key], ...value]));
  return obj[key];
});
function mergeOnKey(arr, key, onMerge) {
  if (arr.length < 2)
    return arr;
  const seen = /* @__PURE__ */ new Map();
  let resultLength = 0;
  for (const item of arr) {
    const k = item[key];
    if (seen.has(k)) {
      const existingIndex = seen.get(k);
      onMerge?.(item[key]);
      arr[existingIndex] = merger(item, arr[existingIndex]);
    } else {
      seen.set(k, resultLength);
      arr[resultLength++] = item;
    }
  }
  arr.length = resultLength;
  return arr;
}
function splitForLocales(path, locales) {
  const start = path.charCodeAt(0) === 47 ? 1 : 0;
  const end = path.indexOf("/", start);
  const prefix = path.slice(start, end === -1 ? path.length : end);
  const hasLocale = locales instanceof Set ? locales.has(prefix) : locales.includes(prefix);
  if (prefix && hasLocale) {
    const prefixEnd = start + prefix.length;
    return [prefix, start === 1 ? path.slice(prefixEnd) : path];
  }
  return [null, path];
}
function toRuntimeI18nConfig(i18n) {
  return {
    ...i18n,
    // Sitemap transforms keep the unprefixed default URL alongside Nuxt's prefixed route.
    strategy: i18n.strategy === "prefix_and_default" ? "prefix_except_default" : i18n.strategy,
    pages: i18n.pages && Object.fromEntries(
      Object.entries(i18n.pages).map(([pageName, pageLocales]) => [
        pageName,
        Object.fromEntries(i18n.locales.map((locale) => {
          const configuredPath = pageLocales[locale.code];
          return [locale.code, configuredPath === void 0 ? withLeadingSlash(pageName) : configuredPath];
        }))
      ])
    ),
    locales: i18n.locales.map((locale) => ({
      ...locale,
      hreflang: locale._hreflang
    }))
  };
}
function localeAlternateHref(alternate) {
  return alternate.domain ? joinURL(withHttps(alternate.domain), alternate.path) : alternate.path;
}
function resolveI18nRouteEntries(route, i18n, includeHref = () => true, context = {}) {
  const runtimeConfig = toRuntimeI18nConfig(i18n);
  const currentLocale = resolveLocaleFromRoute(route, runtimeConfig, context).locale;
  const alternates = computeLocaleAlternates(route, runtimeConfig, { ...context, locale: currentLocale });
  const localizedAlternates = alternates.map((alternate) => ({
    alternate,
    href: localeAlternateHref(alternate)
  }));
  const defaultHref = localizedAlternates.find(({ alternate }) => alternate.code === i18n.defaultLocale)?.href;
  const sitemapAlternatives = [
    ...defaultHref && includeHref(defaultHref) ? [{ hreflang: "x-default", href: defaultHref }] : [],
    ...localizedAlternates.filter(({ href }) => includeHref(href)).map(({ alternate, href }) => ({ hreflang: alternate.hreflang, href }))
  ];
  return localizedAlternates.flatMap(({ alternate, href }) => {
    const locale = i18n.locales.find((locale2) => locale2.code === alternate.code);
    return locale ? [{ locale, loc: href, alternatives: sitemapAlternatives }] : [];
  });
}
function resolveI18nSitemapLocaleKey(sitemapName, localeSitemapKeys) {
  let best = null;
  for (const key of localeSitemapKeys) {
    if (sitemapName === key || sitemapName.startsWith(`${key}-`)) {
      if (best === null || key.length > best.length)
        best = key;
    }
  }
  return best;
}
const StringifiedRegExpPattern = /\/(.*?)\/([gimsuy]*)$/;
function normalizeRuntimeFilters(input) {
  return (input || []).map((rule) => {
    if (rule instanceof RegExp || typeof rule === "string")
      return rule;
    const match = rule.regex.match(StringifiedRegExpPattern);
    if (match)
      return new RegExp(match[1], match[2]);
    return false;
  }).filter(Boolean);
}
function createPathFilter(options = {}, baseURL) {
  const urlFilter = createFilter({
    include: normalizeRuntimeFilters(options.include),
    exclude: normalizeRuntimeFilters(options.exclude)
  });
  const hasBase = baseURL !== "/";
  return (loc, pathname) => {
    let path = pathname;
    if (typeof path !== "string") {
      try {
        path = parseURL(loc).pathname;
      } catch {
        return false;
      }
    }
    if (hasBase)
      path = withoutBase(path, baseURL);
    return urlFilter(withLeadingSlash(path));
  };
}
const ROBOTS_BLOCKING_DIRECTIVES = /* @__PURE__ */ new Set(["noindex", "none"]);
function robotsBlocksIndexing(robots) {
  if (robots === false)
    return true;
  if (typeof robots !== "string")
    return false;
  return robots.split(",").some((directive) => ROBOTS_BLOCKING_DIRECTIVES.has(directive.trim().toLowerCase()));
}

const LABEL_RE = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;
const PORT_RE = /^[1-9]\d{0,4}$/;
const UPPER_ASCII_RE = /[A-Z]/g;
const INVALID_HOST = { _tag: "InvalidHost" };
function parseHost(raw) {
  const value = (raw || "").replace(UPPER_ASCII_RE, (c) => c.toLowerCase());
  const [hostname = "", port, ...rest] = value.split(":");
  if (rest.length > 0 || hostname.length > 253)
    return INVALID_HOST;
  if (!hostname.split(".").every((label) => LABEL_RE.test(label)))
    return INVALID_HOST;
  if (port === void 0)
    return { _tag: "Host", host: hostname };
  if (!PORT_RE.test(port) || Number(port) > 65535)
    return INVALID_HOST;
  return { _tag: "Host", host: `${hostname}:${port}` };
}
function parseProtocol(raw) {
  return raw === "http" || raw === "https" ? raw : void 0;
}
function resolveCacheOrigin(input) {
  const protocol = parseProtocol(input.protocol) ?? "https";
  const request = parseHost(input.host);
  if (request._tag === "Host")
    return { _tag: "Request", protocol, host: request.host };
  const siteUrl = input.siteUrl();
  if (siteUrl) {
    const url = parseURL(siteUrl);
    const site = parseHost(url.host);
    if (site._tag === "Host")
      return { _tag: "SiteConfig", protocol: parseProtocol(url.protocol?.slice(0, -1)) ?? "https", host: site.host };
  }
  return { _tag: "Unrecognised", protocol, rawHost: input.host || "" };
}
function createCacheKey(origin, parts) {
  const scope = origin._tag === "Unrecognised" ? { protocol: origin.protocol, rawHost: origin.rawHost } : { protocol: origin.protocol, host: origin.host };
  return `sitemap-${hash([scope, parts])}`;
}

const SERVER_CACHE_MAX_AGE = staticConfig.cacheMaxAgeSeconds;
const REQUEST_SITE_URL_CONTEXT = "nitro:init";
function getCacheOrigin(e) {
  return resolveCacheOrigin({
    host: getForwardedHost(e),
    protocol: getForwardedProtocol(e),
    siteUrl: () => {
      const siteConfig = getSiteConfig(e, { debug: true });
      return siteConfig._context?.url === REQUEST_SITE_URL_CONTEXT ? void 0 : siteConfig.url;
    }
  });
}
function defineSitemapCachedFunction(fn, opts) {
  return defineCachedFunction(fn, {
    name: opts.name,
    group: "sitemap",
    base: "sitemap",
    maxAge: SERVER_CACHE_MAX_AGE,
    swr: true,
    getKey: (...args) => createCacheKey(getCacheOrigin(args[0]), opts.keyParts?.(...args) ?? []),
    ...opts.validate ? { validate: opts.validate } : {}
  });
}

function dynamicRuntimeConfig(_e) {
  return useRuntimeConfig().sitemap;
}
function copyStaticSitemaps() {
  return Object.fromEntries(
    Object.entries(staticConfig.sitemaps).map(([name, sitemap]) => [name, {
      ...sitemap,
      include: normalizeRuntimeFilters("include" in sitemap ? sitemap.include : void 0),
      exclude: normalizeRuntimeFilters("exclude" in sitemap ? sitemap.exclude : void 0)
    }])
  );
}
function serializeFilters(filters) {
  if (!filters?.length)
    return void 0;
  return filters.map((f) => {
    if (f instanceof RegExp)
      return { regex: `/${f.source}/${f.flags}` };
    return f;
  });
}
async function resolveSitemapSitemaps(e, nitro) {
  const ctx = { sitemaps: copyStaticSitemaps(), event: e };
  await nitro.hooks.callHook("sitemap:sitemaps-resolved", ctx);
  const sitemaps = { ...ctx.sitemaps };
  for (const name of Object.keys(sitemaps)) {
    const sitemap = { ...sitemaps[name] };
    if (typeof sitemap.urls === "function")
      sitemap.urls = await sitemap.urls();
    sitemap.include = serializeFilters(sitemap.include);
    sitemap.exclude = serializeFilters(sitemap.exclude);
    sitemaps[name] = sitemap;
  }
  return sitemaps;
}
const resolveSitemapSitemapsCached = defineSitemapCachedFunction(resolveSitemapSitemaps, { name: "sitemap:runtime-sitemaps" });
async function useResolvedSitemapRuntimeConfig(e) {
  const maxAge = dynamicRuntimeConfig()?.cacheMaxAgeSeconds ?? staticConfig.cacheMaxAgeSeconds;
  const shouldCache = typeof maxAge === "number" && maxAge > 0;
  const sitemaps = shouldCache ? await resolveSitemapSitemapsCached(e, useNitroApp()) : await resolveSitemapSitemaps(e, useNitroApp());
  return Object.freeze({
    ...staticConfig,
    sitemaps,
    ...dynamicRuntimeConfig()
  });
}

function escapeValueForXml(value) {
  if (value === true || value === false)
    return value ? "yes" : "no";
  return xmlEscape(String(value));
}
function yesNo(v) {
  return v === "yes" || v === true ? "yes" : "no";
}
const URLSET_OPENING_TAG = '<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
function buildUrlXml(url, NL, I1, I2, I3, I4) {
  let xml = `${I1}<url>${NL}`;
  if (url.loc)
    xml += `${I2}<loc>${xmlEscape(url.loc)}</loc>${NL}`;
  if (url.lastmod)
    xml += `${I2}<lastmod>${xmlEscape(url.lastmod)}</lastmod>${NL}`;
  if (url.changefreq)
    xml += `${I2}<changefreq>${xmlEscape(url.changefreq)}</changefreq>${NL}`;
  if (url.priority !== void 0) {
    const p = typeof url.priority === "number" ? url.priority : Number.parseFloat(url.priority);
    xml += `${I2}<priority>${p.toFixed(1)}</priority>${NL}`;
  }
  if (url.alternatives) {
    for (const alt of url.alternatives) {
      let attrs = "";
      for (const k in alt) {
        if ((k === "href" || k === "hreflang") && Object.hasOwn(alt, k))
          attrs += ` ${k}="${xmlEscape(String(alt[k]))}"`;
      }
      xml += `${I2}<xhtml:link rel="alternate"${attrs} />${NL}`;
    }
  }
  if (url.images) {
    for (const img of url.images) {
      xml += `${I2}<image:image>${NL}${I3}<image:loc>${xmlEscape(img.loc)}</image:loc>${NL}`;
      if (img.title)
        xml += `${I3}<image:title>${xmlEscape(img.title)}</image:title>${NL}`;
      if (img.caption)
        xml += `${I3}<image:caption>${xmlEscape(img.caption)}</image:caption>${NL}`;
      if (img.geo_location)
        xml += `${I3}<image:geo_location>${xmlEscape(img.geo_location)}</image:geo_location>${NL}`;
      if (img.license)
        xml += `${I3}<image:license>${xmlEscape(img.license)}</image:license>${NL}`;
      xml += `${I2}</image:image>${NL}`;
    }
  }
  if (url.videos) {
    for (const video of url.videos) {
      xml += `${I2}<video:video>${NL}${I3}<video:title>${xmlEscape(video.title)}</video:title>${NL}`;
      if (video.thumbnail_loc)
        xml += `${I3}<video:thumbnail_loc>${xmlEscape(video.thumbnail_loc)}</video:thumbnail_loc>${NL}`;
      xml += `${I3}<video:description>${xmlEscape(video.description)}</video:description>${NL}`;
      if (video.content_loc)
        xml += `${I3}<video:content_loc>${xmlEscape(video.content_loc)}</video:content_loc>${NL}`;
      if (video.player_loc)
        xml += `${I3}<video:player_loc>${xmlEscape(video.player_loc)}</video:player_loc>${NL}`;
      if (video.duration !== void 0)
        xml += `${I3}<video:duration>${escapeValueForXml(video.duration)}</video:duration>${NL}`;
      if (video.expiration_date)
        xml += `${I3}<video:expiration_date>${xmlEscape(video.expiration_date)}</video:expiration_date>${NL}`;
      if (video.rating !== void 0)
        xml += `${I3}<video:rating>${escapeValueForXml(video.rating)}</video:rating>${NL}`;
      if (video.view_count !== void 0)
        xml += `${I3}<video:view_count>${escapeValueForXml(video.view_count)}</video:view_count>${NL}`;
      if (video.publication_date)
        xml += `${I3}<video:publication_date>${xmlEscape(video.publication_date)}</video:publication_date>${NL}`;
      if (video.family_friendly !== void 0)
        xml += `${I3}<video:family_friendly>${yesNo(video.family_friendly)}</video:family_friendly>${NL}`;
      if (video.restriction)
        xml += `${I3}<video:restriction relationship="${xmlEscape(video.restriction.relationship || "allow")}">${xmlEscape(video.restriction.restriction)}</video:restriction>${NL}`;
      if (video.platform)
        xml += `${I3}<video:platform relationship="${xmlEscape(video.platform.relationship || "allow")}">${xmlEscape(video.platform.platform)}</video:platform>${NL}`;
      if (video.requires_subscription !== void 0)
        xml += `${I3}<video:requires_subscription>${yesNo(video.requires_subscription)}</video:requires_subscription>${NL}`;
      if (video.price) {
        for (const price of video.price) {
          const c = price.currency ? ` currency="${xmlEscape(price.currency)}"` : "";
          const t = price.type ? ` type="${xmlEscape(price.type)}"` : "";
          xml += `${I3}<video:price${c}${t}>${xmlEscape(String(price.price ?? ""))}</video:price>${NL}`;
        }
      }
      if (video.uploader) {
        const info = video.uploader.info ? ` info="${xmlEscape(video.uploader.info)}"` : "";
        xml += `${I3}<video:uploader${info}>${xmlEscape(video.uploader.uploader)}</video:uploader>${NL}`;
      }
      if (video.live !== void 0)
        xml += `${I3}<video:live>${yesNo(video.live)}</video:live>${NL}`;
      if (video.tag) {
        const tags = Array.isArray(video.tag) ? video.tag : [video.tag];
        for (const t of tags) xml += `${I3}<video:tag>${xmlEscape(t)}</video:tag>${NL}`;
      }
      if (video.category)
        xml += `${I3}<video:category>${xmlEscape(video.category)}</video:category>${NL}`;
      if (video.gallery_loc)
        xml += `${I3}<video:gallery_loc>${xmlEscape(video.gallery_loc)}</video:gallery_loc>${NL}`;
      xml += `${I2}</video:video>${NL}`;
    }
  }
  if (url.news) {
    xml += `${I2}<news:news>${NL}${I3}<news:publication>${NL}`;
    xml += `${I4}<news:name>${xmlEscape(url.news.publication.name)}</news:name>${NL}`;
    xml += `${I4}<news:language>${xmlEscape(url.news.publication.language)}</news:language>${NL}`;
    xml += `${I3}</news:publication>${NL}`;
    if (url.news.title)
      xml += `${I3}<news:title>${xmlEscape(url.news.title)}</news:title>${NL}`;
    if (url.news.publication_date)
      xml += `${I3}<news:publication_date>${xmlEscape(url.news.publication_date)}</news:publication_date>${NL}`;
    xml += `${I2}</news:news>${NL}`;
  }
  xml += `${I1}</url>`;
  return xml;
}
function resolveXmlRenderContext(resolvers, { xsl, minify }, errorInfo) {
  let xslHref = xsl ? resolvers.relativeBaseUrlResolver(xsl) : false;
  if (xslHref && errorInfo?.messages.length) {
    xslHref = withQuery(xslHref, {
      errors: "true",
      error_messages: errorInfo.messages,
      error_urls: errorInfo.urls
    });
  }
  const NL = minify ? "" : "\n";
  return {
    xslHref,
    NL,
    I1: minify ? "" : "    ",
    I2: minify ? "" : "        ",
    I3: minify ? "" : "            ",
    I4: minify ? "" : "                "
  };
}
function urlsToXml(urls, resolvers, config, errorInfo) {
  const { version, credits } = config;
  const { xslHref, NL, I1, I2, I3, I4 } = resolveXmlRenderContext(resolvers, config, errorInfo);
  let xml = xslHref ? `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="${escapeValueForXml(xslHref)}"?>${NL}` : `<?xml version="1.0" encoding="UTF-8"?>${NL}`;
  xml += URLSET_OPENING_TAG + NL;
  for (const url of urls)
    xml += buildUrlXml(url, NL, I1, I2, I3, I4) + NL;
  xml += "</urlset>";
  if (credits)
    xml += `${NL}<!-- XML Sitemap generated by @nuxtjs/sitemap v${version} at ${(/* @__PURE__ */ new Date()).toISOString()} -->`;
  return xml;
}

function resolveIndexXslHref(resolvers, xsl, errorInfo) {
  let relativeBaseUrl = resolvers.relativeBaseUrlResolver?.(xsl) ?? xsl;
  if (errorInfo && errorInfo.messages.length > 0) {
    relativeBaseUrl = withQuery(relativeBaseUrl, {
      errors: "true",
      error_messages: errorInfo.messages,
      error_urls: errorInfo.urls
    });
  }
  return relativeBaseUrl;
}
function urlsToIndexXml(sitemaps, resolvers, { version, xsl, credits, minify }, errorInfo) {
  const NL = minify ? "" : "\n";
  const I1 = minify ? "" : "    ";
  const I2 = minify ? "" : "        ";
  let sitemapXml = "";
  for (const entry of sitemaps) {
    if (sitemapXml)
      sitemapXml += NL;
    sitemapXml += `${I1}<sitemap>${NL}${I2}<loc>${escapeValueForXml(entry.sitemap)}</loc>${NL}`;
    if (entry.lastmod)
      sitemapXml += `${I2}<lastmod>${escapeValueForXml(entry.lastmod)}</lastmod>${NL}`;
    sitemapXml += `${I1}</sitemap>`;
  }
  const xmlParts = ['<?xml version="1.0" encoding="UTF-8"?>'];
  if (xsl) {
    const relativeBaseUrl = resolveIndexXslHref(resolvers, xsl, errorInfo);
    xmlParts.push(`<?xml-stylesheet type="text/xsl" href="${escapeValueForXml(relativeBaseUrl)}"?>`);
  }
  xmlParts.push(
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    sitemapXml,
    "</sitemapindex>"
  );
  if (credits)
    xmlParts.push(`<!-- XML Sitemap Index generated by @nuxtjs/sitemap v${version} at ${(/* @__PURE__ */ new Date()).toISOString()} -->`);
  return xmlParts.join(NL);
}

function resolve(s, resolvers) {
  if (typeof s === "undefined")
    return void 0;
  const str = typeof s === "string" ? s : s.toString();
  if (!resolvers)
    return str;
  if (hasProtocol(str, { acceptRelative: true, strict: false }))
    return resolvers.fixSlashes(str);
  return resolvers.canonicalUrlResolver(str);
}
function removeTrailingSlash(s) {
  let pathEnd = s.length;
  const queryIndex = s.indexOf("?");
  if (queryIndex !== -1)
    pathEnd = queryIndex;
  const hashIndex = s.indexOf("#");
  if (hashIndex !== -1 && hashIndex < pathEnd)
    pathEnd = hashIndex;
  return pathEnd > 0 && s.charCodeAt(pathEnd - 1) === 47 ? s.slice(0, pathEnd - 1) + s.slice(pathEnd) : s;
}
function preNormalizeEntry(_e, resolvers) {
  const input = typeof _e === "string" ? { loc: _e } : { ..._e };
  if (input.url && !input.loc) {
    input.loc = input.url;
  }
  delete input.url;
  if (typeof input.loc !== "string") {
    input.loc = "";
  }
  const skipEncoding = input._encoded === true;
  const e = input;
  e.loc = removeTrailingSlash(e.loc);
  e._abs = hasProtocol(e.loc, { acceptRelative: false, strict: false });
  try {
    e._path = e._abs ? parseURL(e.loc) : parsePath(e.loc);
  } catch {
    e._path = null;
  }
  if (e._path) {
    const search = e._path.search;
    const qs = search && search.length > 1 ? stringifyQuery(parseQuery(search)) : "";
    const pathname = skipEncoding ? e._path.pathname : encodePath(e._path.pathname);
    e._relativeLoc = `${pathname}${qs.length ? `?${qs}` : ""}`;
    if (e._path.host) {
      e.loc = stringifyParsedURL(e._path);
    } else {
      e.loc = e._relativeLoc;
    }
  } else if (!skipEncoding && !isEncoded(e.loc)) {
    e.loc = encodeURI(e.loc);
  }
  if (e.loc === "")
    e.loc = `/`;
  e.loc = resolve(e.loc, resolvers);
  e._key = `${e._sitemap || ""}${withoutTrailingSlash(e.loc)}`;
  return e;
}
function isEncoded(url) {
  try {
    return url !== decodeURIComponent(url);
  } catch {
    return false;
  }
}
function normaliseEntry(_e, defaults, resolvers, cache) {
  const e = defaults ? defu(_e, defaults) : { ..._e };
  if (e.lastmod) {
    const date = cache?.lastmodInput === e.lastmod ? cache.lastmodOutput : normaliseDate(e.lastmod);
    if (cache && cache.lastmodInput !== e.lastmod) {
      cache.lastmodInput = e.lastmod;
      cache.lastmodOutput = date;
    }
    if (date)
      e.lastmod = date;
    else
      delete e.lastmod;
  }
  if (!e.lastmod)
    delete e.lastmod;
  e.loc = resolve(e.loc, resolvers);
  if (e.alternatives) {
    const alternatives = e.alternatives.map(({ _i18nGenerated: _, ...alternative }) => alternative);
    for (const alt of alternatives) {
      if (typeof alt.href === "string") {
        alt.href = resolve(alt.href, resolvers);
      } else if (typeof alt.href === "object" && alt.href) {
        alt.href = resolve(alt.href.href, resolvers);
      }
    }
    e.alternatives = mergeOnKey(alternatives, "hreflang");
  }
  if (e.images) {
    const images = e.images.map((i) => ({ ...i }));
    for (const img of images) {
      img.loc = resolve(img.loc, resolvers);
    }
    e.images = mergeOnKey(images, "loc");
  }
  if (e.videos) {
    const videos = e.videos.map((v) => ({ ...v }));
    for (const video of videos) {
      if (video.content_loc) {
        video.content_loc = resolve(video.content_loc, resolvers);
      }
    }
    e.videos = mergeOnKey(videos, "content_loc");
  }
  return e;
}
const IS_VALID_W3C_DATE = [
  /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)$/,
  /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)$/,
  /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)$/,
  /^\d{4}-[01]\d-[0-3]\d$/,
  /^\d{4}-[01]\d$/,
  /^\d{4}$/
];
function isValidW3CDate(d) {
  if (!IS_VALID_W3C_DATE.some((r) => r.test(d)))
    return false;
  const [year, month, day] = d.slice(0, 10).split("-").map(Number);
  if (month !== void 0 && (month < 1 || month > 12))
    return false;
  if (day !== void 0 && (day < 1 || day > new Date(year, month, 0).getDate()))
    return false;
  return true;
}
function normaliseDate(d) {
  if (typeof d === "string") {
    const tIdx = d.indexOf("T");
    if (tIdx !== -1) {
      const t = d.slice(tIdx + 1);
      if (!t.includes("+") && !t.includes("-") && !t.includes("Z")) {
        d += "Z";
      }
    }
    if (!isValidW3CDate(d))
      return false;
    d = new Date(d);
    d.setMilliseconds(0);
    if (Number.isNaN(d.getTime()))
      return false;
  }
  const z = (n) => `0${n}`.slice(-2);
  const date = `${d.getUTCFullYear()}-${z(d.getUTCMonth() + 1)}-${z(d.getUTCDate())}`;
  if (d.getUTCHours() > 0 || d.getUTCMinutes() > 0 || d.getUTCSeconds() > 0) {
    return `${date}T${z(d.getUTCHours())}:${z(d.getUTCMinutes())}:${z(d.getUTCSeconds())}Z`;
  }
  return date;
}

function parseChunkInfo(sitemapName, sitemaps, defaultChunkSize) {
  defaultChunkSize = defaultChunkSize || 1e3;
  if (typeof sitemaps.chunks !== "undefined" && !Number.isNaN(Number(sitemapName))) {
    return {
      isChunked: true,
      baseSitemapName: "sitemap",
      chunkIndex: Number(sitemapName),
      chunkSize: defaultChunkSize
    };
  }
  if (sitemapName.includes("-")) {
    const parts = sitemapName.split("-");
    const lastPart = parts.pop();
    if (!Number.isNaN(Number(lastPart))) {
      const baseSitemapName = parts.join("-");
      const baseSitemap = sitemaps[baseSitemapName];
      if (baseSitemap && (baseSitemap.chunks || baseSitemap._isChunking)) {
        const chunkSize = typeof baseSitemap.chunks === "number" ? baseSitemap.chunks : baseSitemap.chunkSize || defaultChunkSize;
        return {
          isChunked: true,
          baseSitemapName,
          chunkIndex: Number(lastPart),
          chunkSize
        };
      }
    }
  }
  return {
    isChunked: false,
    baseSitemapName: sitemapName,
    chunkIndex: void 0,
    chunkSize: defaultChunkSize
  };
}
function getSitemapConfig(sitemapName, sitemaps, defaultChunkSize = 1e3) {
  const chunkInfo = parseChunkInfo(sitemapName, sitemaps, defaultChunkSize);
  if (chunkInfo.isChunked) {
    if (chunkInfo.baseSitemapName === "sitemap" && typeof sitemaps.chunks !== "undefined") {
      return {
        ...sitemaps.chunks,
        sitemapName,
        _isChunking: true,
        _chunkSize: chunkInfo.chunkSize
      };
    }
    const baseSitemap = sitemaps[chunkInfo.baseSitemapName];
    if (baseSitemap) {
      return {
        ...baseSitemap,
        sitemapName,
        // Use the full name with chunk index
        _isChunking: true,
        _chunkSize: chunkInfo.chunkSize
      };
    }
  }
  return sitemaps[sitemapName];
}
function sliceUrlsForChunk(urls, sitemapName, sitemaps, defaultChunkSize = 1e3) {
  const chunkInfo = parseChunkInfo(sitemapName, sitemaps, defaultChunkSize);
  if (chunkInfo.isChunked && chunkInfo.chunkIndex !== void 0) {
    const startIndex = chunkInfo.chunkIndex * chunkInfo.chunkSize;
    const endIndex = (chunkInfo.chunkIndex + 1) * chunkInfo.chunkSize;
    return urls.slice(startIndex, endIndex);
  }
  return urls;
}

let naturalCompare;
function countPathSegments(loc) {
  let segments = 1;
  for (let i = 0; i < loc.length; i++) {
    if (loc.charCodeAt(i) === 47)
      segments++;
  }
  return segments;
}
function sortInPlace(urls) {
  urls.sort((a, b) => {
    const aLoc = typeof a === "string" ? a : a.loc;
    const bLoc = typeof b === "string" ? b : b.loc;
    const aSegments = countPathSegments(aLoc);
    const bSegments = countPathSegments(bLoc);
    if (aSegments !== bSegments) {
      return aSegments - bSegments;
    }
    return (naturalCompare ??= new Intl.Collator(void 0, { numeric: true }).compare)(aLoc, bLoc);
  });
  return urls;
}

function fetchWithEvent(event, request, options) {
  const client = createFetch({
    fetch: (input, init) => {
      if (typeof input === "string" && input.startsWith("//"))
        return globalThis.fetch(new URL(input, event.req.url).href, init);
      return typeof input === "string" && input.startsWith("/") ? serverFetch(event, input, init) : globalThis.fetch(input, init);
    }
  });
  return client(request, options);
}

const changeFrequencies = /* @__PURE__ */ new Set([
  "always",
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never"
]);
function readerEntryToSitemapInput(entry) {
  const priority = entry.priority === void 0 ? void 0 : Number.parseFloat(entry.priority);
  const changefreq = entry.changefreq && changeFrequencies.has(entry.changefreq) ? entry.changefreq : void 0;
  return {
    loc: entry.loc,
    ...entry.lastmod ? { lastmod: entry.lastmod } : {},
    ...changefreq ? { changefreq } : {},
    ...priority !== void 0 && Number.isFinite(priority) ? { priority } : {},
    ...entry.extensions?.alternatives ? { alternatives: entry.extensions.alternatives.map(({ hreflang, href }) => ({ hreflang, href })) } : {},
    ...entry.extensions?.images ? {
      images: entry.extensions.images.map((image) => ({
        loc: image.loc,
        ...image.caption ? { caption: image.caption } : {},
        ...image.geoLocation ? { geo_location: image.geoLocation } : {},
        ...image.title ? { title: image.title } : {},
        ...image.license ? { license: image.license } : {}
      }))
    } : {},
    ...entry.extensions?.videos ? { videos: entry.extensions.videos } : {},
    ...entry.extensions?.news ? { news: entry.extensions.news } : {}
  };
}
function normalizeSourceInput(source) {
  if (typeof source === "string") {
    return { context: { name: "hook" }, fetch: source };
  }
  if (Array.isArray(source)) {
    return { context: { name: "hook" }, fetch: source };
  }
  return source;
}
async function tryFetchWithFallback(url, options, event) {
  const isExternalUrl = !url.startsWith("/");
  if (isExternalUrl) {
    const strategies = [
      // Strategy 1: Use globalThis.$fetch (original approach)
      () => globalThis.$fetch(url, options),
      // Strategy 2: If event is available, try using event context even for external URLs
      event ? () => fetchWithEvent(event, url, options) : null,
      // Strategy 3: Use native fetch as last resort
      () => $fetch(url, options)
    ].filter(Boolean);
    let lastError = null;
    for (const strategy of strategies) {
      try {
        return await strategy();
      } catch (error) {
        lastError = error;
        continue;
      }
    }
    throw lastError;
  }
  return event ? await fetchWithEvent(event, url, options) : await globalThis.$fetch(url, options);
}
const SOURCE_FETCH_MEMO_KEY = "_sitemapSourceFetches";
function useSourceFetchMemo(event) {
  const context = event?.context;
  if (!context)
    return void 0;
  const existing = context[SOURCE_FETCH_MEMO_KEY];
  if (existing)
    return existing;
  const memo = /* @__PURE__ */ new Map();
  context[SOURCE_FETCH_MEMO_KEY] = memo;
  return memo;
}
const fetchSourceUrlsCached = defineSitemapCachedFunction(
  (event, _key, url, options) => fetchSourceUrls(url, options, event),
  {
    name: "sitemap:source-urls",
    keyParts: (_event, key) => [key],
    // A failed fetch must never be served again, otherwise one outage empties the sitemap for a
    // whole cache window.
    validate: (entry) => entry.value !== void 0 && !entry.value._isFailure
  }
);
function isSourceCacheEnabled() {
  const cacheMaxAgeSeconds = staticConfig.cacheMaxAgeSeconds;
  return cacheMaxAgeSeconds > 0;
}
async function fetchDataSource(input, event) {
  const context = typeof input.context === "string" ? { name: input.context } : input.context || { name: "fetch" };
  const url = typeof input.fetch === "string" ? input.fetch : input.fetch[0];
  const options = typeof input.fetch === "string" ? {} : input.fetch[1];
  const memo = useSourceFetchMemo(event);
  const key = `${url}::${JSON.stringify(options || {})}`;
  let request = memo?.get(key);
  if (!request) {
    request = event && isSourceCacheEnabled() ? fetchSourceUrlsCached(event, key, url, options) : fetchSourceUrls(url, options, event);
    memo?.set(key, request);
  }
  const result = await request;
  if (result._isFailure)
    memo?.delete(key);
  return { ...input, context, ...result };
}
async function fetchSourceUrls(url, options, event) {
  const start = Date.now();
  const isExternalUrl = !url.startsWith("/");
  const timeout = isExternalUrl ? 1e4 : options.timeout || 5e3;
  const timeoutController = new AbortController();
  const abortRequestTimeout = setTimeout(() => timeoutController.abort(), timeout);
  try {
    let isMaybeErrorResponse = false;
    const pathname = parseURL(url).pathname.toLowerCase();
    const isGzUrl = pathname.endsWith(".gz");
    const isXmlRequest = pathname.endsWith(".xml") || isGzUrl;
    const mergedHeaders = defu(
      options?.headers,
      {
        Accept: isXmlRequest ? "text/xml" : "application/json"
      },
      event && !isExternalUrl ? { host: getForwardedHost(event) } : {}
    );
    const fetchOptions = {
      ...options,
      // Fetch XML sources as raw bytes so we can detect and decompress a gzip body
      // (either a `.gz` URL, or a server that serves gzip without Content-Encoding)
      // before it's mangled by a UTF-8 text decode.
      responseType: isXmlRequest ? "arrayBuffer" : "json",
      signal: timeoutController.signal,
      headers: mergedHeaders,
      // Use ofetch's built-in retry for external sources
      ...isExternalUrl && {
        retry: 2,
        retryDelay: 200
      },
      // @ts-expect-error untyped
      onResponse({ response }) {
        if (typeof response._data === "string" && response._data.startsWith("<!DOCTYPE html>"))
          isMaybeErrorResponse = true;
      }
    };
    const res = await tryFetchWithFallback(url, fetchOptions, event);
    const timeTakenMs = Date.now() - start;
    if (isMaybeErrorResponse) {
      return {
        urls: [],
        timeTakenMs,
        error: "Received HTML response instead of JSON",
        // An HTML page is usually an outage or an auth wall, both transient. Treat it like a
        // failed fetch so the empty result is never cached.
        _isFailure: true
      };
    }
    let urls = [];
    if (isXmlRequest) {
      const bytes = res instanceof Uint8Array ? res : new Uint8Array(res);
      const result = await collectSitemap(bytes);
      if (result._tag !== "document")
        throw new Error(result.issues.map((issue) => issue.message).join("; ") || "Invalid sitemap document");
      if (result.document._tag !== "urlset")
        throw new Error("Sitemap URL source must be a URL set, not a sitemap index");
      urls = result.document.entries.map(readerEntryToSitemapInput);
    } else if (typeof res === "object") {
      urls = res.urls || res;
    }
    return {
      timeTakenMs,
      urls
    };
  } catch (_err) {
    const error = _err;
    if (isExternalUrl) {
      const errorInfo = {
        url,
        timeout,
        error: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        method: options?.method || "GET"
      };
      logger.error("Failed to fetch external source.", errorInfo);
    } else {
      logger.error("Failed to fetch source.", { url, error: error.message });
    }
    return {
      urls: [],
      error: error.message,
      _isFailure: true
      // Mark as failure to prevent caching
    };
  } finally {
    if (abortRequestTimeout) {
      clearTimeout(abortRequestTimeout);
    }
  }
}
async function globalSitemapSources() {
  const m = await import('../virtual/global-sources.mjs');
  return [...m.sources];
}
async function childSitemapSources(definition) {
  if (definition?.sources?.length)
    return [...definition.sources];
  if (definition?.urls) {
    const urls = typeof definition.urls === "function" ? await definition.urls() : definition.urls;
    return [{
      context: { name: `sitemaps:${definition.sitemapName}:urls`, description: "Set with the sitemap definition `urls`." },
      urls
    }];
  }
  if (!definition?._hasSourceChunk)
    return [];
  const m = await import('../virtual/child-sources.mjs');
  return [...m.sources[definition.sitemapName] || []];
}
async function resolveSitemapSources(sources, event) {
  return await Promise.all(
    sources.map((source) => {
      const normalized = normalizeSourceInput(source);
      if ("urls" in normalized) {
        return {
          timeTakenMs: 0,
          ...normalized,
          urls: normalized.urls
        };
      }
      if (normalized.fetch)
        return fetchDataSource(normalized, event);
      return {
        ...normalized,
        error: "Invalid source"
      };
    })
  );
}

function isGeneratedAlternative(alternative) {
  return alternative._i18nGenerated !== void 0 && alternative._i18nGenerated === JSON.stringify([alternative.hreflang, alternative.href.toString()]);
}
function resolveSitemapEntries(sitemap, urls, runtimeConfig, resolvers, baseURL) {
  const {
    autoI18n: configuredI18n,
    isI18nMapped
  } = runtimeConfig;
  const requestHost = configuredI18n?.multiDomainLocales && resolvers ? parseURL(resolvers.canonicalUrlResolver("/")).host : void 0;
  const domain = configuredI18n?.multiDomainLocales ? resolveI18nDomain(requestHost, configuredI18n) : void 0;
  const autoI18n = configuredI18n && domain ? { ...configuredI18n, defaultLocale: domain.defaultLocale } : configuredI18n;
  const availableLocales = domain?.locales || autoI18n?.locales;
  const hasFilters = !!sitemap.include?.length || !!sitemap.exclude?.length;
  const filterPath = hasFilters ? createPathFilter({
    include: sitemap.include,
    exclude: sitemap.exclude
  }, baseURL || "/") : void 0;
  const domainLocaleCodes = autoI18n?.multiDomainLocales && autoI18n.strategy !== "no_prefix" ? new Set(autoI18n.locales.map((l) => l.code)) : void 0;
  const domainLocaleKeys = autoI18n?.multiDomainLocales ? autoI18n.locales.map((l) => l._sitemap) : [];
  const _urls = [];
  const unavailableEntries = /* @__PURE__ */ new Set();
  for (const _e of urls) {
    const e = preNormalizeEntry(_e, resolvers);
    if (autoI18n && domainLocaleCodes && !e._abs && !e._i18nTransform && !e._i18nUnlocalized) {
      const prefix = splitForLocales(e._path?.pathname || "/", domainLocaleCodes)[0];
      const localeCode = prefix || autoI18n.defaultLocale;
      const sitemapLocale = isI18nMapped && typeof e._sitemap === "string" ? resolveI18nSitemapLocaleKey(e._sitemap, domainLocaleKeys) : null;
      const locale = autoI18n.locales.find((l) => l.code === localeCode);
      if (locale && availableLocales && !availableLocales.includes(locale))
        continue;
      if (autoI18n.strategy === "prefix_except_default" && prefix === autoI18n.defaultLocale)
        continue;
      if (sitemapLocale && sitemapLocale !== locale?._sitemap)
        continue;
      if (e.alternatives?.some(isGeneratedAlternative)) {
        const alternatives = e.alternatives.filter((alternative) => {
          if (!isGeneratedAlternative(alternative))
            return true;
          if (alternative.hreflang === "x-default")
            return false;
          const alternateLocale = autoI18n.locales.find((l) => l._hreflang === alternative.hreflang);
          if (!alternateLocale)
            return true;
          if (availableLocales && !availableLocales.includes(alternateLocale))
            return false;
          const alternatePrefix = splitForLocales(parseURL(alternative.href.toString()).pathname || "/", domainLocaleCodes)[0];
          if (["prefix_except_default", "prefix_and_default"].includes(autoI18n.strategy) && alternatePrefix === autoI18n.defaultLocale)
            return false;
          return (alternatePrefix || autoI18n.defaultLocale) === alternateLocale.code;
        });
        const defaultHreflang = autoI18n.locales.find((l) => l.code === autoI18n.defaultLocale)?._hreflang;
        const defaultAlternative = alternatives.find((a) => a.hreflang === defaultHreflang);
        e.alternatives = defaultAlternative && !alternatives.some((alternative) => alternative.hreflang === "x-default") ? [...alternatives, { ...defaultAlternative, hreflang: "x-default" }] : alternatives;
      }
    }
    const needsExpansion = e._i18nTransform && autoI18n && autoI18n.strategy !== "no_prefix";
    if (e.loc && (needsExpansion || !filterPath || filterPath(e.loc, e._path?.pathname)))
      _urls.push(e);
  }
  const withoutPrefixPaths = {};
  if (autoI18n && autoI18n.strategy !== "no_prefix") {
    const localeCodes = new Set(autoI18n.locales.map((l) => l.code));
    const localeByCode = new Map(autoI18n.locales.map((l) => [l.code, l]));
    const defaultLocale = autoI18n.defaultLocale;
    const hasDifferentDomains = !!autoI18n.differentDomains;
    const validI18nUrlsForTransform = [];
    for (let i = 0; i < _urls.length; i++) {
      const _e = _urls[i];
      if (_e._abs && !_e._i18nTransform)
        continue;
      const split = _e._i18nUnlocalized ? [null, _e._relativeLoc] : splitForLocales(_e._relativeLoc, localeCodes);
      let localeCode = split[0];
      const pathWithoutPrefix = split[1];
      if (!localeCode)
        localeCode = defaultLocale;
      const e = _e;
      e._pathWithoutPrefix = pathWithoutPrefix;
      const locale = localeByCode.get(localeCode);
      if (!locale)
        continue;
      e._locale = locale;
      e._index = i;
      e._key = `${e._sitemap || ""}${e._path?.pathname || "/"}${e._path?.search || ""}`;
      withoutPrefixPaths[pathWithoutPrefix] = withoutPrefixPaths[pathWithoutPrefix] || [];
      if (!e._i18nTransform && !e._i18nUnlocalized && !withoutPrefixPaths[pathWithoutPrefix].some((e2) => e2._locale.code === locale.code))
        withoutPrefixPaths[pathWithoutPrefix].push(e);
      validI18nUrlsForTransform.push(e);
    }
    for (const e of validI18nUrlsForTransform) {
      if (!e._i18nTransform && !e.alternatives?.length) {
        const alternatives = [];
        for (const u of e._i18nUnlocalized ? [e] : withoutPrefixPaths[e._pathWithoutPrefix] || []) {
          if (autoI18n.multiDomainLocales && availableLocales && !availableLocales.includes(u._locale))
            continue;
          if (u._locale.code === defaultLocale) {
            alternatives.push({
              href: u.loc,
              hreflang: "x-default"
            });
          }
          alternatives.push({
            href: u.loc,
            hreflang: u._locale._hreflang || defaultLocale
          });
        }
        if (alternatives.length)
          e.alternatives = alternatives;
      } else if (e._i18nTransform) {
        delete e._i18nTransform;
        const routeEntries = resolveI18nRouteEntries(e._relativeLoc, autoI18n, (href) => !filterPath || filterPath(href), autoI18n.multiDomainLocales ? { host: requestHost || "", domainMode: "request" } : {});
        if (autoI18n.multiDomainLocales) {
          if (!routeEntries.length) {
            unavailableEntries.add(e);
            continue;
          }
          if (autoI18n.strategy === "prefix_and_default") {
            const defaultEntry = routeEntries.find((entry) => entry.locale.code === defaultLocale);
            if (defaultEntry) {
              routeEntries.push({ ...defaultEntry, loc: `/${defaultLocale}${defaultEntry.loc === "/" ? "" : defaultEntry.loc}` });
            }
          }
        }
        if (hasDifferentDomains) {
          e.alternatives = routeEntries[0]?.alternatives;
        } else {
          const sourceLocaleAvailable = routeEntries.some((entry) => entry.locale.code === e._locale.code);
          for (const { alternatives, locale: l, loc } of routeEntries) {
            const _sitemap = isI18nMapped ? l._sitemap : void 0;
            const { _index: _, ...rest } = e;
            const newEntry = preNormalizeEntry({
              _sitemap,
              ...rest,
              _key: `${_sitemap || ""}${loc || "/"}`,
              _locale: l,
              loc,
              alternatives
            }, resolvers);
            if (e._index !== void 0 && (e._locale.code === newEntry._locale.code || !sourceLocaleAvailable)) {
              _urls[e._index] = newEntry;
              e._index = void 0;
            } else {
              _urls.push(newEntry);
            }
          }
        }
      }
      if (isI18nMapped) {
        e._sitemap = e._sitemap || e._locale._sitemap;
        e._key = `${e._sitemap || ""}${e.loc || "/"}${e._path?.search || ""}`;
      }
      if (e._index)
        _urls[e._index] = e;
    }
  }
  return _urls.filter((entry) => !unavailableEntries.has(entry) && (!filterPath || filterPath(entry.loc, entry._path?.pathname)));
}

async function buildResolvedSitemapUrls(effectiveSitemap, matchName, isChunked, resolvers, runtimeConfig, nitro) {
  const { sitemaps, autoI18n, isI18nMapped, isMultiSitemap, sortEntries } = runtimeConfig;
  let sourcesInput = effectiveSitemap.includeAppSources ? [...await globalSitemapSources(), ...await childSitemapSources(effectiveSitemap)] : await childSitemapSources(effectiveSitemap);
  if (nitro && resolvers.event) {
    const ctx = {
      event: resolvers.event,
      sitemapName: matchName,
      sources: sourcesInput
    };
    await nitro.hooks.callHook("sitemap:sources", ctx);
    sourcesInput = ctx.sources;
  }
  const sources = await resolveSitemapSources(sourcesInput, resolvers.event);
  const failedSources = sources.filter((source) => source.error && source._isFailure).map((source) => ({
    url: typeof source.fetch === "string" ? source.fetch : source.fetch?.[0] || "unknown",
    error: source.error || "Unknown error"
  }));
  const resolvedCtx = {
    urls: sources.flatMap((s) => s.urls),
    sitemapName: matchName,
    event: resolvers.event
  };
  await nitro?.hooks.callHook("sitemap:input", resolvedCtx);
  const enhancedUrls = resolveSitemapEntries(effectiveSitemap, resolvedCtx.urls, { autoI18n, isI18nMapped }, resolvers, useRuntimeConfig().app.baseURL);
  const localeSitemapKeys = isI18nMapped && autoI18n ? autoI18n.locales.map((l) => l._sitemap) : [];
  if (isMultiSitemap) {
    const sitemapNames = Object.keys(sitemaps).filter((k) => k !== "index");
    const validSitemapNames = new Set(sitemapNames);
    if (isI18nMapped) {
      for (const name of sitemapNames) {
        const localeKey = resolveI18nSitemapLocaleKey(name, localeSitemapKeys);
        if (localeKey)
          validSitemapNames.add(localeKey);
      }
    }
    const warnedSitemaps = nitro?._sitemapWarnedSitemaps || /* @__PURE__ */ new Set();
    for (const e of enhancedUrls) {
      const hasMatchingSitemap = typeof e._sitemap === "string" && validSitemapNames.has(e._sitemap);
      if (typeof e._sitemap === "string" && !hasMatchingSitemap) {
        if (!warnedSitemaps.has(e._sitemap)) {
          warnedSitemaps.add(e._sitemap);
          logger.error(`Sitemap \`${e._sitemap}\` not found in sitemap config. Available sitemaps: ${sitemapNames.join(", ")}. Either add it to the sitemap config or register it with the sitemap:sitemaps-resolved hook. Entry \`${e.loc}\` will be omitted.`);
        }
      }
    }
    if (nitro) {
      nitro._sitemapWarnedSitemaps = warnedSitemaps;
    }
  }
  const matchedLocaleSitemap = isI18nMapped ? resolveI18nSitemapLocaleKey(matchName, localeSitemapKeys) : null;
  const filteredUrls = enhancedUrls.filter((e) => {
    if (e._sitemap === false)
      return false;
    if (isMultiSitemap && e._sitemap && matchName) {
      if (isChunked)
        return e._sitemap === matchName;
      if (e._sitemap === matchName)
        return true;
      if (isI18nMapped)
        return e._sitemap === matchedLocaleSitemap;
      return false;
    }
    return true;
  });
  const urls = sortEntries ? sortInPlace(filteredUrls) : filteredUrls;
  return { urls, failedSources };
}
const buildResolvedSitemapUrlsCached = defineSitemapCachedFunction(
  async (_event, effectiveSitemap, matchName, isChunked, resolvers, runtimeConfig, nitro) => buildResolvedSitemapUrls(effectiveSitemap, matchName, isChunked, resolvers, runtimeConfig, nitro),
  {
    name: "sitemap:resolved-urls",
    keyParts: (_event, _effectiveSitemap, matchName, isChunked) => [matchName, isChunked],
    // A build with failed sources is never cached: one outage must not pin an empty sitemap
    // for a whole cache window. The next request retries the sources instead.
    validate: (entry) => entry.value !== void 0 && !entry.value.failedSources?.length
  }
);
async function getResolvedSitemapUrls(effectiveSitemap, matchName, isChunked, resolvers, runtimeConfig, nitro) {
  const event = resolvers.event;
  const shouldCache = typeof runtimeConfig.cacheMaxAgeSeconds === "number" && runtimeConfig.cacheMaxAgeSeconds > 0;
  if (shouldCache && event) {
    return buildResolvedSitemapUrlsCached(event, effectiveSitemap, matchName, isChunked, resolvers, runtimeConfig, nitro);
  }
  return buildResolvedSitemapUrls(effectiveSitemap, matchName, isChunked, resolvers, runtimeConfig, nitro);
}
async function buildSitemapUrls(sitemap, resolvers, runtimeConfig, nitro) {
  const { sitemaps, autoI18n, defaultSitemapsChunkSize } = runtimeConfig;
  const chunkSize = defaultSitemapsChunkSize || void 0;
  const chunkInfo = parseChunkInfo(sitemap.sitemapName, sitemaps, chunkSize);
  if (autoI18n?.differentDomains) {
    const domain = autoI18n.locales.find((e) => e.language === sitemap.sitemapName || e.code === sitemap.sitemapName)?.domain;
    if (domain) {
      const _tester = resolvers.canonicalUrlResolver;
      resolvers.canonicalUrlResolver = (path) => resolveSitePath(path, {
        absolute: true,
        withBase: false,
        siteUrl: withHttps(domain),
        trailingSlash: _tester("/test/").endsWith("/"),
        base: "/"
      });
    }
  }
  let effectiveSitemap = sitemap;
  const baseSitemapName = chunkInfo.baseSitemapName;
  if (chunkInfo.isChunked && baseSitemapName !== sitemap.sitemapName && sitemaps[baseSitemapName]) {
    effectiveSitemap = sitemaps[baseSitemapName];
  }
  const matchName = chunkInfo.isChunked ? baseSitemapName : sitemap.sitemapName;
  const resolved = await getResolvedSitemapUrls(effectiveSitemap, matchName, chunkInfo.isChunked, resolvers, runtimeConfig, nitro);
  const urls = sliceUrlsForChunk(resolved.urls, sitemap.sitemapName, sitemaps, chunkSize);
  return { urls, failedSources: resolved.failedSources };
}

const buildSitemapIndexCached = defineSitemapCachedFunction(
  async (_event, resolvers, runtimeConfig, nitro) => {
    return buildSitemapIndexInternal(resolvers, runtimeConfig, nitro);
  },
  { name: "sitemap:index" }
);
async function buildSitemapIndexInternal(resolvers, runtimeConfig, nitro) {
  const {
    sitemaps,
    autoLastmod,
    defaultSitemapsChunkSize,
    sitemapsPathPrefix
  } = runtimeConfig;
  if (!sitemaps)
    throw new Error("Attempting to build a sitemap index without required `sitemaps` configuration.");
  const nonChunkedNames = [];
  const allFailedSources = [];
  for (const sitemapName in sitemaps) {
    if (sitemapName === "index" || sitemapName === "chunks")
      continue;
    const sitemapConfig = sitemaps[sitemapName];
    if (sitemapConfig.chunks || sitemapConfig._isChunking) {
      sitemapConfig._isChunking = true;
      sitemapConfig._chunkSize = sitemapConfig.chunkSize || (typeof sitemapConfig.chunks === "number" ? sitemapConfig.chunks : defaultSitemapsChunkSize || 1e3);
    } else {
      const chunkInfo = parseChunkInfo(sitemapName, sitemaps, defaultSitemapsChunkSize || void 0);
      if (!chunkInfo.isChunked)
        nonChunkedNames.push(sitemapName);
    }
  }
  const indexLastmod = autoLastmod ? normaliseDate(/* @__PURE__ */ new Date()) : void 0;
  const entries = [];
  const pushEntry = (name) => {
    const entry = {
      _sitemapName: name,
      sitemap: resolvers.canonicalUrlResolver(joinURL(sitemapsPathPrefix || "", `/${name}.xml`))
    };
    if (indexLastmod)
      entry.lastmod = indexLastmod;
    entries.push(entry);
  };
  if (typeof sitemaps.chunks !== "undefined") {
    const sitemap = sitemaps.chunks;
    const resolved = await getResolvedSitemapUrls(sitemap, "sitemap", true, resolvers, runtimeConfig, nitro);
    allFailedSources.push(...resolved.failedSources);
    const chunkCount = Math.ceil(resolved.urls.length / (defaultSitemapsChunkSize || 1e3));
    for (let i = 0; i < chunkCount; i++)
      pushEntry(String(i));
  }
  for (const name of nonChunkedNames)
    pushEntry(name);
  for (const sitemapName in sitemaps) {
    const sitemapConfig = sitemaps[sitemapName];
    if (sitemapName !== "index" && sitemapConfig._isChunking) {
      const chunkSize = sitemapConfig._chunkSize || defaultSitemapsChunkSize || 1e3;
      let chunkCount;
      if (typeof sitemapConfig.chunkCount === "number" && sitemapConfig.chunkCount > 0) {
        chunkCount = sitemapConfig.chunkCount;
      } else {
        const resolved = await getResolvedSitemapUrls(sitemapConfig, sitemapName, true, resolvers, runtimeConfig, nitro);
        allFailedSources.push(...resolved.failedSources);
        chunkCount = Math.ceil(resolved.urls.length / chunkSize);
      }
      sitemapConfig._chunkCount = chunkCount;
      for (let i = 0; i < chunkCount; i++)
        pushEntry(`${sitemapName}-${i}`);
    }
  }
  if (sitemaps.index) {
    entries.push(...sitemaps.index.sitemaps.map((entry) => {
      return typeof entry === "string" ? { sitemap: entry } : entry;
    }));
  }
  return { entries, failedSources: allFailedSources };
}
async function buildSitemapIndex(resolvers, runtimeConfig, nitro) {
  if (typeof runtimeConfig.cacheMaxAgeSeconds === "number" && runtimeConfig.cacheMaxAgeSeconds > 0 && resolvers.event) {
    return buildSitemapIndexCached(resolvers.event, resolvers, runtimeConfig, nitro);
  }
  return buildSitemapIndexInternal(resolvers, runtimeConfig, nitro);
}

function withoutQuery(path) {
  const queryIndex = path.indexOf("?");
  return queryIndex === -1 ? path : path.slice(0, queryIndex);
}
function createNitroRouteRuleMatcher(runtimeConfig) {
  const { nitro, app } = runtimeConfig;
  const baseURL = app?.baseURL || "/";
  const _routeRulesMatcher = toRouteMatcher(
    createRouter({
      routes: Object.fromEntries(
        Object.entries(nitro?.routeRules || {}).map(([path, rules]) => [withoutTrailingSlash(path), rules])
      )
    })
  );
  return (pathOrUrl) => {
    const path = pathOrUrl[0] === "/" ? pathOrUrl : parseURL(pathOrUrl, baseURL).pathname;
    return defu({}, ..._routeRulesMatcher.matchAll(
      withoutBase(withoutTrailingSlash(withoutQuery(path)), baseURL)
    ).reverse());
  };
}

function useNitroUrlResolvers(e) {
  const canonicalQuery = getQuery(e).canonical;
  const isShowingCanonical = typeof canonicalQuery !== "undefined" && canonicalQuery !== "false";
  const siteConfig = getSiteConfig(e);
  return {
    event: e,
    fixSlashes: (path) => fixSlashes(siteConfig.trailingSlash, path),
    // we need these as they depend on the nitro event
    canonicalUrlResolver: createSitePathResolver(e, {
      canonical: isShowingCanonical || true,
      absolute: true,
      withBase: true
    }),
    relativeBaseUrlResolver: createSitePathResolver(e, { absolute: false, withBase: true })
  };
}
async function buildSitemapRenderPlan(event, definition, resolvers, runtimeConfig) {
  const { sitemapName } = definition;
  const nitro = useNitroApp();
  const { urls: resolvedSitemapUrls, failedSources } = await buildSitemapUrls(definition, resolvers, runtimeConfig, nitro);
  const sitemapUrls = resolvedSitemapUrls.slice();
  const routeRuleMatcher = createNitroRouteRuleMatcher(useRuntimeConfig());
  const headerRuleMatcher = createNitroRouteRuleMatcher({
    app: useRuntimeConfig().app,
    nitro: { routeRules: runtimeConfig.routeRuleHeaders || {} }
  });
  const { autoI18n } = runtimeConfig;
  const localeCodes = autoI18n?.locales && autoI18n.strategy !== "no_prefix" ? new Set(autoI18n.locales.map((l) => l.code)) : void 0;
  sitemapUrls.length;
  let validCount = 0;
  for (let i = 0; i < sitemapUrls.length; i++) {
    const u = sitemapUrls[i];
    const path = u._path?.pathname || u.loc;
    if (!getPathRobotConfig(event, { path, skipSiteIndexable: true }).indexable)
      continue;
    let routeRules = routeRuleMatcher(path);
    let headerRules = headerRuleMatcher(path);
    if (localeCodes) {
      const match = splitForLocales(path, localeCodes);
      const pathWithoutPrefix = match[1];
      if (pathWithoutPrefix && pathWithoutPrefix !== path)
        routeRules = defu(routeRules, routeRuleMatcher(pathWithoutPrefix));
      if (pathWithoutPrefix && pathWithoutPrefix !== path)
        headerRules = defu(headerRules, headerRuleMatcher(pathWithoutPrefix));
    }
    if (routeRules.sitemap === false)
      continue;
    if (robotsBlocksIndexing(routeRules.robots))
      continue;
    let hasRobotsDisabled = false;
    const headers = headerRules.headers;
    if (headers) {
      for (const name in headers) {
        if (name.toLowerCase() === "x-robots-tag" && headers[name].toLowerCase().includes("noindex")) {
          hasRobotsDisabled = true;
          break;
        }
      }
    }
    if (routeRules.redirect || hasRobotsDisabled)
      continue;
    sitemapUrls[validCount++] = routeRules.sitemap ? defu(u, routeRules.sitemap) : u;
  }
  sitemapUrls.length = validCount;
  const locSize = sitemapUrls.length;
  const resolvedCtx = {
    urls: sitemapUrls,
    sitemapName,
    event
  };
  await nitro.hooks.callHook("sitemap:resolved", resolvedCtx);
  if (resolvedCtx.urls.length !== locSize) {
    for (let i = 0; i < resolvedCtx.urls.length; i++)
      resolvedCtx.urls[i] = preNormalizeEntry(resolvedCtx.urls[i], resolvers);
  }
  const maybeSort = (urls2) => runtimeConfig.sortEntries ? sortInPlace(urls2) : urls2;
  const defaults = definition.defaults;
  const normalizedPreDedupe = resolvedCtx.urls;
  const firstLastmod = normalizedPreDedupe[0]?.lastmod ?? defaults?.lastmod;
  let cacheLastmod = normalizedPreDedupe.length > 1 && !!firstLastmod;
  for (let i = 1; cacheLastmod && i < Math.min(normalizedPreDedupe.length, 8); i++)
    cacheLastmod = (normalizedPreDedupe[i].lastmod ?? defaults?.lastmod) === firstLastmod;
  const normaliseCache = cacheLastmod ? {} : void 0;
  for (let i = 0; i < normalizedPreDedupe.length; i++)
    normalizedPreDedupe[i] = normaliseEntry(normalizedPreDedupe[i], defaults, resolvers, normaliseCache);
  const duplicateKeys = /* @__PURE__ */ new Set();
  const urls = mergeOnKey(normalizedPreDedupe, "_key", (key) => duplicateKeys.add(key));
  if (duplicateKeys.size) {
    for (let i = 0; i < urls.length; i++) {
      if (duplicateKeys.has(urls[i]._key))
        urls[i] = normaliseEntry(urls[i], defaults, resolvers, normaliseCache);
    }
  }
  maybeSort(urls);
  if (definition._isChunking && definition.sitemapName.includes("-")) {
    const parts = definition.sitemapName.split("-");
    const lastPart = parts.pop();
    if (!Number.isNaN(Number(lastPart))) {
      const chunkIndex = Number(lastPart);
      const baseSitemapName = parts.join("-");
      if (urls.length === 0 && chunkIndex > 0) {
        throw createError({
          status: 404,
          message: `Sitemap chunk ${chunkIndex} for "${baseSitemapName}" does not exist.`
        });
      }
    }
  }
  const errorInfo = failedSources.length > 0 ? {
    messages: failedSources.map((f) => f.error),
    urls: failedSources.map((f) => f.url)
  } : void 0;
  return { errorInfo, sitemapName, urls };
}
async function renderSitemapOutput(nitro, event, sitemapName, renderString, renderStream, shouldStream, debug) {
  {
    const ctx2 = { sitemap: renderString(), sitemapName, event };
    await nitro.hooks.callHook("sitemap:output", ctx2);
    return ctx2.sitemap;
  }
}
async function buildSitemapXml(event, definition, resolvers, runtimeConfig) {
  const { errorInfo, sitemapName, urls } = await buildSitemapRenderPlan(event, definition, resolvers, runtimeConfig);
  const sitemap = urlsToXml(urls, resolvers, runtimeConfig, errorInfo);
  const ctx = { sitemap, sitemapName, event };
  await useNitroApp().hooks.callHook("sitemap:output", ctx);
  return ctx.sitemap;
}
function sitemapKeyParts(_event, definition) {
  return [definition.sitemapName || "default"];
}
const buildSitemapXmlCached = defineSitemapCachedFunction(buildSitemapXml, { name: "sitemap:xml", keyParts: sitemapKeyParts });
function setSitemapResponseHeaders(event, runtimeConfig) {
  event.res.headers.set("Content-Type", "text/xml; charset=UTF-8");
  if (runtimeConfig.cacheMaxAgeSeconds) {
    event.res.headers.set("Cache-Control", `public, max-age=${runtimeConfig.cacheMaxAgeSeconds}, s-maxage=${runtimeConfig.cacheMaxAgeSeconds}, stale-while-revalidate=3600`);
    const now = /* @__PURE__ */ new Date();
    event.res.headers.set("X-Sitemap-Generated", now.toISOString());
    event.res.headers.set("X-Sitemap-Cache-Duration", `${runtimeConfig.cacheMaxAgeSeconds}s`);
    const expiryTime = new Date(now.getTime() + runtimeConfig.cacheMaxAgeSeconds * 1e3);
    event.res.headers.set("X-Sitemap-Cache-Expires", expiryTime.toISOString());
    const remainingSeconds = Math.floor((expiryTime.getTime() - now.getTime()) / 1e3);
    event.res.headers.set("X-Sitemap-Cache-Remaining", `${remainingSeconds}s`);
  } else {
    event.res.headers.set("Cache-Control", `no-cache, no-store`);
  }
  event.context._isSitemap = true;
}
async function createSitemap(event, definition, runtimeConfig) {
  const resolvers = useNitroUrlResolvers(event);
  const shouldCache = typeof runtimeConfig.cacheMaxAgeSeconds === "number" && runtimeConfig.cacheMaxAgeSeconds > 0;
  let xml;
  {
    xml = shouldCache ? await buildSitemapXmlCached(event, definition, resolvers, runtimeConfig) : await buildSitemapXml(event, definition, resolvers, runtimeConfig);
  }
  setSitemapResponseHeaders(event, runtimeConfig);
  return xml;
}

async function sitemapXmlEventHandler(e) {
  const runtimeConfig = await useResolvedSitemapRuntimeConfig(e);
  const { sitemaps } = runtimeConfig;
  if ("index" in sitemaps)
    return sendRedirect(e, withBase("/sitemap_index.xml", useRuntimeConfig().app.baseURL), 301);
  return createSitemap(e, Object.values(sitemaps)[0], runtimeConfig);
}
async function sitemapIndexXmlEventHandler(e) {
  const runtimeConfig = await useResolvedSitemapRuntimeConfig(e);
  const nitro = useNitroApp();
  const resolvers = useNitroUrlResolvers(e);
  const { entries: sitemaps, failedSources } = await buildSitemapIndex(resolvers, runtimeConfig, nitro);
  const indexResolvedCtx = { sitemaps, event: e };
  await nitro.hooks.callHook("sitemap:index-resolved", indexResolvedCtx);
  const errorInfo = failedSources.length > 0 ? { messages: failedSources.map((f) => f.error), urls: failedSources.map((f) => f.url) } : void 0;
  const output = await renderSitemapOutput(
    nitro,
    e,
    "sitemap",
    () => urlsToIndexXml(indexResolvedCtx.sitemaps, resolvers, runtimeConfig, errorInfo),
    void 0,
    false,
    runtimeConfig.debug
  );
  setSitemapResponseHeaders(e, runtimeConfig);
  return output;
}
async function sitemapChildXmlEventHandler(e) {
  const pathname = getRequestPathname(e);
  if (!pathname.endsWith(".xml"))
    return;
  const runtimeConfig = await useResolvedSitemapRuntimeConfig(e);
  const { sitemaps } = runtimeConfig;
  let sitemapName = getDecodedRouterParam(e, "sitemap");
  if (!sitemapName) {
    const match = pathname.match(/(?:\/__sitemap__\/)?(.+)\.xml$/);
    if (match)
      sitemapName = match[1];
  }
  if (!sitemapName)
    throw createError({ status: 400, message: "Invalid sitemap request" });
  sitemapName = sitemapName.replace(/\.xml$/, "");
  sitemapName = withLeadingSlash(sitemapName);
  if (sitemapName.startsWith("/__sitemap__/"))
    sitemapName = sitemapName.replace("/__sitemap__/", "/");
  if (runtimeConfig.sitemapsPathPrefix) {
    const prefix = withLeadingSlash(runtimeConfig.sitemapsPathPrefix);
    if (sitemapName.startsWith(prefix))
      sitemapName = sitemapName.replace(prefix, "/");
  }
  sitemapName = withoutLeadingSlash(withoutTrailingSlash(sitemapName));
  const chunkInfo = parseChunkInfo(sitemapName, sitemaps, runtimeConfig.defaultSitemapsChunkSize);
  const isAutoChunked = typeof sitemaps.chunks !== "undefined" && !Number.isNaN(Number(sitemapName));
  const sitemapExists = Object.hasOwn(sitemaps, sitemapName) || Object.hasOwn(sitemaps, chunkInfo.baseSitemapName) || isAutoChunked;
  if (!sitemapExists)
    throw createError({ status: 404, message: `Sitemap "${sitemapName}" not found.` });
  if (chunkInfo.isChunked && chunkInfo.chunkIndex !== void 0) {
    const baseSitemap = sitemaps[chunkInfo.baseSitemapName];
    if (baseSitemap && !baseSitemap.chunks && !baseSitemap._isChunking)
      throw createError({ status: 404, message: `Sitemap "${chunkInfo.baseSitemapName}" does not support chunking.` });
    if (baseSitemap?._chunkCount !== void 0 && chunkInfo.chunkIndex >= baseSitemap._chunkCount)
      throw createError({ status: 404, message: `Chunk ${chunkInfo.chunkIndex} does not exist for sitemap "${chunkInfo.baseSitemapName}".` });
  }
  const sitemapConfig = getSitemapConfig(sitemapName, sitemaps, runtimeConfig.defaultSitemapsChunkSize || void 0);
  return createSitemap(e, sitemapConfig, runtimeConfig);
}

export { sitemapChildXmlEventHandler as a, sitemapXmlEventHandler as b, sitemapIndexXmlEventHandler as s };
//# sourceMappingURL=event-handlers.mjs.map
