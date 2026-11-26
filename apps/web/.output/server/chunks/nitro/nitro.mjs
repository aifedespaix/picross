import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { createHead as createHead$1 } from 'unhead/server';
import { u as unref } from '../_/vue.mjs';
import { DeprecationsPlugin } from 'unhead/legacy';
import { PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin } from 'unhead/plugins';
import Bt, { Server as Server$1 } from 'node:http';
import zs, { Server } from 'node:https';
import { EventEmitter } from 'node:events';
import { Buffer as Buffer$1 } from 'node:buffer';
import { promises, existsSync } from 'node:fs';
import { resolve as resolve$1, dirname as dirname$1, join } from 'node:path';
import { createHash } from 'node:crypto';
import { defineDiagnostics, createConsoleReporter } from 'nostics';
import { createRouterMatcher } from 'vue-router';
import { fileURLToPath } from 'node:url';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  if (value[0] === '"' && value[value.length - 1] === '"' && value.indexOf("\\") === -1) {
    return value.slice(1, -1);
  }
  const _value = value.trim();
  if (_value.length <= 9) {
    switch (_value.toLowerCase()) {
      case "true": {
        return true;
      }
      case "false": {
        return false;
      }
      case "undefined": {
        return void 0;
      }
      case "null": {
        return null;
      }
      case "nan": {
        return Number.NaN;
      }
      case "infinity": {
        return Number.POSITIVE_INFINITY;
      }
      case "-infinity": {
        return Number.NEGATIVE_INFINITY;
      }
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE$1 = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE$1 = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
const ENC_ENC_SLASH_RE$1 = /%252f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE$1, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE$1, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return encode(text).replace(HASH_RE$1, "%23").replace(IM_RE, "%3F").replace(ENC_ENC_SLASH_RE$1, "%2F").replace(AMPERSAND_RE, "%26").replace(PLUS_RE, "%2B");
}
function decode$1(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode$1(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = /* @__PURE__ */ Object.create(null);
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map(
      (_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`
    ).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const TRAILING_SLASH_RE$1 = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE$1.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withoutLeadingSlash(input = "") {
  return (hasLeadingSlash(input) ? input.slice(1) : input) || "/";
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    const nextChar = input[_base.length];
    if (!nextChar || nextChar === "/" || nextChar === "?") {
      return input;
    }
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const nextChar = input[_base.length];
  if (nextChar && nextChar !== "/" && nextChar !== "?") {
    return input;
  }
  const trimmed = input.slice(_base.length).replace(/^\/+/, "");
  return "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$2(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}
function withHttps(input) {
  return withProtocol(input, "https://");
}
function withProtocol(input, protocol) {
  let match = input.match(PROTOCOL_REGEX);
  if (!match) {
    match = input.match(/^\/{2,}/);
  }
  if (!match) {
    return protocol + input;
  }
  return protocol + input.slice(match[0].length);
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

const fieldContentRegExp = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
function serialize$2(name, value, options) {
  const opt = options || {};
  const enc = opt.encode || encodeURIComponent;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  const encodedValue = enc(value);
  if (encodedValue && !fieldContentRegExp.test(encodedValue)) {
    throw new TypeError("argument val is invalid");
  }
  let str = name + "=" + encodedValue;
  if (void 0 !== opt.maxAge && opt.maxAge !== null) {
    const maxAge = opt.maxAge - 0;
    if (Number.isNaN(maxAge) || !Number.isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    if (!isDate(opt.expires) || Number.isNaN(opt.expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + opt.expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    const priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low": {
        str += "; Priority=Low";
        break;
      }
      case "medium": {
        str += "; Priority=Medium";
        break;
      }
      case "high": {
        str += "; Priority=High";
        break;
      }
      default: {
        throw new TypeError("option priority is invalid");
      }
    }
  }
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true: {
        str += "; SameSite=Strict";
        break;
      }
      case "lax": {
        str += "; SameSite=Lax";
        break;
      }
      case "strict": {
        str += "; SameSite=Strict";
        break;
      }
      case "none": {
        str += "; SameSite=None";
        break;
      }
      default: {
        throw new TypeError("option sameSite is invalid");
      }
    }
  }
  if (opt.partitioned) {
    str += "; Partitioned";
  }
  return str;
}
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]" || val instanceof Date;
}

function parseSetCookie(setCookieValue, options) {
  const parts = (setCookieValue || "").split(";").filter((str) => typeof str === "string" && !!str.trim());
  const nameValuePairStr = parts.shift() || "";
  const parsed = _parseNameValuePair(nameValuePairStr);
  const name = parsed.name;
  let value = parsed.value;
  try {
    value = options?.decode === false ? value : (options?.decode || decodeURIComponent)(value);
  } catch {
  }
  const cookie = {
    name,
    value
  };
  for (const part of parts) {
    const sides = part.split("=");
    const partKey = (sides.shift() || "").trimStart().toLowerCase();
    const partValue = sides.join("=");
    switch (partKey) {
      case "expires": {
        cookie.expires = new Date(partValue);
        break;
      }
      case "max-age": {
        cookie.maxAge = Number.parseInt(partValue, 10);
        break;
      }
      case "secure": {
        cookie.secure = true;
        break;
      }
      case "httponly": {
        cookie.httpOnly = true;
        break;
      }
      case "samesite": {
        cookie.sameSite = partValue;
        break;
      }
      default: {
        cookie[partKey] = partValue;
      }
    }
  }
  return cookie;
}
function _parseNameValuePair(nameValuePairStr) {
  let name = "";
  let value = "";
  const nameValueArr = nameValuePairStr.split("=");
  if (nameValueArr.length > 1) {
    name = nameValueArr.shift();
    value = nameValueArr.join("=");
  } else {
    value = nameValuePairStr;
  }
  return { name, value };
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = { ...defaults };
  for (const key of Object.keys(baseObject)) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function o(n){throw new Error(`${n} is not implemented yet!`)}let i$1 = class i extends EventEmitter{__unenv__={};readableEncoding=null;readableEnded=true;readableFlowing=false;readableHighWaterMark=0;readableLength=0;readableObjectMode=false;readableAborted=false;readableDidRead=false;closed=false;errored=null;readable=false;destroyed=false;static from(e,t){return new i(t)}constructor(e){super();}_read(e){}read(e){}setEncoding(e){return this}pause(){return this}resume(){return this}isPaused(){return  true}unpipe(e){return this}unshift(e,t){}wrap(e){return this}push(e,t){return  false}_destroy(e,t){this.removeAllListeners();}destroy(e){return this.destroyed=true,this._destroy(e),this}pipe(e,t){return {}}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return this.destroy(),Promise.resolve()}async*[Symbol.asyncIterator](){throw o("Readable.asyncIterator")}iterator(e){throw o("Readable.iterator")}map(e,t){throw o("Readable.map")}filter(e,t){throw o("Readable.filter")}forEach(e,t){throw o("Readable.forEach")}reduce(e,t,r){throw o("Readable.reduce")}find(e,t){throw o("Readable.find")}findIndex(e,t){throw o("Readable.findIndex")}some(e,t){throw o("Readable.some")}toArray(e){throw o("Readable.toArray")}every(e,t){throw o("Readable.every")}flatMap(e,t){throw o("Readable.flatMap")}drop(e,t){throw o("Readable.drop")}take(e,t){throw o("Readable.take")}asIndexedPairs(e){throw o("Readable.asIndexedPairs")}};let l$1 = class l extends EventEmitter{__unenv__={};writable=true;writableEnded=false;writableFinished=false;writableHighWaterMark=0;writableLength=0;writableObjectMode=false;writableCorked=0;closed=false;errored=null;writableNeedDrain=false;writableAborted=false;destroyed=false;_data;_encoding="utf8";constructor(e){super();}pipe(e,t){return {}}_write(e,t,r){if(this.writableEnded){r&&r();return}if(this._data===void 0)this._data=e;else {const s=typeof this._data=="string"?Buffer$1.from(this._data,this._encoding||t||"utf8"):this._data,a=typeof e=="string"?Buffer$1.from(e,t||this._encoding||"utf8"):e;this._data=Buffer$1.concat([s,a]);}this._encoding=t,r&&r();}_writev(e,t){}_destroy(e,t){}_final(e){}write(e,t,r){const s=typeof t=="string"?this._encoding:"utf8",a=typeof t=="function"?t:typeof r=="function"?r:void 0;return this._write(e,s,a),true}setDefaultEncoding(e){return this}end(e,t,r){const s=typeof e=="function"?e:typeof t=="function"?t:typeof r=="function"?r:void 0;if(this.writableEnded)return s&&s(),this;const a=e===s?void 0:e;if(a){const u=t===s?void 0:t;this.write(a,u);}return this.writableEnded=true,this.writableFinished=true,this.emit("close"),this.emit("finish"),s&&s(),this}cork(){}uncork(){}destroy(e){return this.destroyed=true,delete this._data,this.removeAllListeners(),this}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return Promise.resolve()}};const c=class{allowHalfOpen=true;_destroy;constructor(e=new i$1,t=new l$1){Object.assign(this,e),Object.assign(this,t),this._destroy=m(e._destroy,t._destroy);}};function _(){return Object.assign(c.prototype,i$1.prototype),Object.assign(c.prototype,l$1.prototype),c}function m(...n){return function(...e){for(const t of n)t(...e);}}const g=_();class A extends g{__unenv__={};bufferSize=0;bytesRead=0;bytesWritten=0;connecting=false;destroyed=false;pending=false;localAddress="";localPort=0;remoteAddress="";remoteFamily="";remotePort=0;autoSelectFamilyAttemptedAddresses=[];readyState="readOnly";constructor(e){super();}write(e,t,r){return  false}connect(e,t,r){return this}end(e,t,r){return this}setEncoding(e){return this}pause(){return this}resume(){return this}setTimeout(e,t){return this}setNoDelay(e){return this}setKeepAlive(e,t){return this}address(){return {}}unref(){return this}ref(){return this}destroySoon(){this.destroy();}resetAndDestroy(){const e=new Error("ERR_SOCKET_CLOSED");return e.code="ERR_SOCKET_CLOSED",this.destroy(e),this}}class y extends i$1{aborted=false;httpVersion="1.1";httpVersionMajor=1;httpVersionMinor=1;complete=true;connection;socket;headers={};trailers={};method="GET";url="/";statusCode=200;statusMessage="";closed=false;errored=null;readable=false;constructor(e){super(),this.socket=this.connection=e||new A;}get rawHeaders(){const e=this.headers,t=[];for(const r in e)if(Array.isArray(e[r]))for(const s of e[r])t.push(r,s);else t.push(r,e[r]);return t}get rawTrailers(){return []}setTimeout(e,t){return this}get headersDistinct(){return p(this.headers)}get trailersDistinct(){return p(this.trailers)}}function p(n){const e={};for(const[t,r]of Object.entries(n))t&&(e[t]=(Array.isArray(r)?r:[r]).filter(Boolean));return e}class w extends l$1{statusCode=200;statusMessage="";upgrading=false;chunkedEncoding=false;shouldKeepAlive=false;useChunkedEncodingByDefault=false;sendDate=false;finished=false;headersSent=false;strictContentLength=false;connection=null;socket=null;req;_headers={};constructor(e){super(),this.req=e;}assignSocket(e){e._httpMessage=this,this.socket=e,this.connection=e,this.emit("socket",e),this._flush();}_flush(){this.flushHeaders();}detachSocket(e){}writeContinue(e){}writeHead(e,t,r){e&&(this.statusCode=e),typeof t=="string"&&(this.statusMessage=t,t=void 0);const s=r||t;if(s&&!Array.isArray(s))for(const a in s)this.setHeader(a,s[a]);return this.headersSent=true,this}writeProcessing(){}setTimeout(e,t){return this}appendHeader(e,t){e=e.toLowerCase();const r=this._headers[e],s=[...Array.isArray(r)?r:[r],...Array.isArray(t)?t:[t]].filter(Boolean);return this._headers[e]=s.length>1?s:s[0],this}setHeader(e,t){return this._headers[e.toLowerCase()]=t,this}setHeaders(e){for(const[t,r]of Object.entries(e))this.setHeader(t,r);return this}getHeader(e){return this._headers[e.toLowerCase()]}getHeaders(){return this._headers}getHeaderNames(){return Object.keys(this._headers)}hasHeader(e){return e.toLowerCase()in this._headers}removeHeader(e){delete this._headers[e.toLowerCase()];}addTrailers(e){}flushHeaders(){}writeEarlyHints(e,t){typeof t=="function"&&t();}}const E=(()=>{const n=function(){};return n.prototype=Object.create(null),n})();function R(n={}){const e=new E,t=Array.isArray(n)||H(n)?n:Object.entries(n);for(const[r,s]of t)if(s){if(e[r]===void 0){e[r]=s;continue}e[r]=[...Array.isArray(e[r])?e[r]:[e[r]],...Array.isArray(s)?s:[s]];}return e}function H(n){return typeof n?.entries=="function"}function v(n={}){if(n instanceof Headers)return n;const e=new Headers;for(const[t,r]of Object.entries(n))if(r!==void 0){if(Array.isArray(r)){for(const s of r)e.append(t,String(s));continue}e.set(t,String(r));}return e}const S=new Set([101,204,205,304]);async function b(n,e){const t=new y,r=new w(t);t.url=e.url?.toString()||"/";let s;if(!t.url.startsWith("/")){const d=new URL(t.url);s=d.host,t.url=d.pathname+d.search+d.hash;}t.method=e.method||"GET",t.headers=R(e.headers||{}),t.headers.host||(t.headers.host=e.host||s||"localhost"),t.connection.encrypted=t.connection.encrypted||e.protocol==="https",t.body=e.body||null,t.__unenv__=e.context,await n(t,r);let a=r._data;(S.has(r.statusCode)||t.method.toUpperCase()==="HEAD")&&(a=null,delete r._headers["content-length"]);const u={status:r.statusCode,statusText:r.statusMessage,headers:r._headers,body:a};return t.destroy(),r.destroy(),u}async function C(n,e,t={}){try{const r=await b(n,{url:e,...t});return new Response(r.body,{status:r.status,statusText:r.statusText,headers:v(r.headers)})}catch(r){return new Response(r.toString(),{status:Number.parseInt(r.statusCode||r.code)||500,statusText:r.statusText})}}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

class H3Error extends Error {
  static __h3_error__ = true;
  statusCode = 500;
  fatal = false;
  unhandled = false;
  statusMessage;
  data;
  cause;
  constructor(message, opts = {}) {
    super(message, opts);
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
function createError$3(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$3(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery$1(event) {
  return getQuery$2(event.path || "");
}
function getRouterParams(event, opts = {}) {
  let params = event.context.params || {};
  if (opts.decode) {
    params = { ...params };
    for (const key in params) {
      params[key] = decode$1(params[key]);
    }
  }
  return params;
}
function getRouterParam$1(event, name, opts = {}) {
  const params = getRouterParams(event, opts);
  return params[name];
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$3({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders$1(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader$2(event, name) {
  const headers = getRequestHeaders$1(event);
  const value = headers[name.toLowerCase()];
  return value;
}
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const _header = event.node.req.headers["x-forwarded-host"];
    const xForwardedHost = (_header || "").split(",").shift()?.trim();
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL$1(event, opts = {}) {
  const host = getRequestHost(event, opts);
  const protocol = getRequestProtocol(event, opts);
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  return new URL(path, `${protocol}://${host}`);
}
function getRequestIP(event, opts = {}) {
  if (event.context.clientAddress) {
    return event.context.clientAddress;
  }
  if (opts.xForwardedFor) {
    const xForwardedFor = getRequestHeader$2(event, "x-forwarded-for")?.split(",").shift()?.trim();
    if (xForwardedFor) {
      return xForwardedFor;
    }
  }
  if (event.node.req.socket.remoteAddress) {
    return event.node.req.socket.remoteAddress;
  }
}

const RawBodySymbol = Symbol.for("h3RawBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      if (_resolved instanceof FormData) {
        return new Response(_resolved).bytes().then((uint8arr) => Buffer.from(uint8arr));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !/\bchunked\b/i.test(
    String(event.node.req.headers["transfer-encoding"] ?? "")
  )) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}

function getDistinctCookieKey(name, opts) {
  return [name, opts.domain || "", opts.path || "/"].join(";");
}
function setCookie$1(event, name, value, serializeOptions = {}) {
  if (!serializeOptions.path) {
    serializeOptions = { path: "/", ...serializeOptions };
  }
  const newCookie = serialize$2(name, value, serializeOptions);
  const currentCookies = splitCookiesString(
    event.node.res.getHeader("set-cookie")
  );
  if (currentCookies.length === 0) {
    event.node.res.setHeader("set-cookie", newCookie);
    return;
  }
  const newCookieKey = getDistinctCookieKey(name, serializeOptions);
  event.node.res.removeHeader("set-cookie");
  for (const cookie of currentCookies) {
    const parsed = parseSetCookie(cookie);
    const key = getDistinctCookieKey(parsed.name, parsed);
    if (key === newCookieKey) {
      continue;
    }
    event.node.res.appendHeader("set-cookie", cookie);
  }
  event.node.res.appendHeader("set-cookie", newCookie);
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect$1(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader$1(event, name, value) {
  event.node.res.setHeader(name, value);
}
const setHeader = setResponseHeader$1;
function appendResponseHeader(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
const noop = () => {
};
function writeEarlyHints(event, hints, cb = noop) {
  if (!event.node.res.socket) {
    cb();
    return;
  }
  if (typeof hints === "string" || Array.isArray(hints)) {
    hints = { link: hints };
  }
  if (hints.link) {
    hints.link = Array.isArray(hints.link) ? hints.link : hints.link.split(",");
  }
  const headers = Object.entries(hints).map(
    (e) => [e[0].toLowerCase(), e[1]]
  );
  if (headers.length === 0) {
    cb();
    return;
  }
  let hint = "HTTP/1.1 103 Early Hints";
  if (hints.link) {
    hint += `\r
Link: ${hints.link.join(", ")}`;
  }
  for (const [header, value] of headers) {
    if (header === "link") {
      continue;
    }
    hint += `\r
${header}: ${value}`;
  }
  if (event.node.res.socket) {
    event.node.res.socket.write(
      `${hint}\r
\r
`,
      "utf8",
      cb
    );
  } else {
    cb();
  }
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "accept-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders$1(
    getProxyRequestHeaders(event, { host: target.startsWith("/") }),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$3({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event, opts) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders$1(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name) || name === "host" && opts?.host) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event, {
        host: typeof req === "string" && req.startsWith("/")
      }),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders$1(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    const entries = Array.isArray(input) ? input : typeof input.entries === "function" ? input.entries() : Object.entries(input);
    for (const [key, value] of entries) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

class H3Event {
  "__is_event__" = true;
  // Context
  node;
  // Node
  web;
  // Web
  context = {};
  // Shared
  // Request
  _method;
  _path;
  _headers;
  _requestBody;
  // Response
  _handled = false;
  // Hooks
  _onBeforeResponseCalled;
  _onAfterResponseCalled;
  constructor(req, res) {
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler$2(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler$2;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _rawReqUrl = event.node.req.url || "/";
    const _reqPath = _decodePath(event._path || _rawReqUrl);
    event._path = _reqPath;
    const _needsRawUrl = _reqPath !== _rawReqUrl;
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _needsRawUrl ? layer.route.length > 1 ? _rawReqUrl.slice(layer.route.length) || "/" : _rawReqUrl : _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$3({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, void 0);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$3(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$3({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function _decodePath(url) {
  const qIndex = url.indexOf("?");
  const path = qIndex === -1 ? url : url.slice(0, qIndex);
  const query = qIndex === -1 ? "" : url.slice(qIndex);
  const decodedPath = path.includes("%25") ? decodePath(path.replace(/%25/g, "%2525")) : decodePath(path);
  return decodedPath + query;
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const url = info.request?.url || info.url || "/";
      const { pathname } = typeof url === "string" ? parseURL(url) : url;
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$3({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$3({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === void 0 && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$3(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

const s=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  if (value instanceof FormData || value instanceof URLSearchParams) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (contentType === "text/event-stream") {
    return "stream";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks$1(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: void 0,
      error: void 0
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks$1(context, context.options.onRequest);
      if (!(context.options.headers instanceof Headers)) {
        context.options.headers = new Headers(
          context.options.headers || {}
          /* compat */
        );
      }
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        const contentType = context.options.headers.get("content-type");
        if (typeof context.options.body !== "string") {
          context.options.body = contentType === "application/x-www-form-urlencoded" ? new URLSearchParams(
            context.options.body
          ).toString() : JSON.stringify(context.options.body);
        }
        if (!contentType) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks$1(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks$1(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks$1(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new Bt.Agent(agentOptions);
  const httpsAgent = new zs.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s;
const AbortController$1 = globalThis.AbortController || i;
const ofetch = createFetch({ fetch, Headers: Headers$1, AbortController: AbortController$1 });
const $fetch = ofetch;

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive$1(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive$1(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c) => c.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}

const storageKeyProperties = [
  "has",
  "hasItem",
  "get",
  "getItem",
  "getItemRaw",
  "set",
  "setItem",
  "setItemRaw",
  "del",
  "remove",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
const nonItemKeyProperties = /* @__PURE__ */ new Set([
  "getKeys",
  "clear",
  "mount",
  "unmount"
]);
function prefixStorage(storage, base) {
  if (base?.includes("?")) {
    throw new Error(`[unstorage] Invalid base: ${JSON.stringify(base)}`);
  }
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const itemKey = (key) => {
    if (!normalizeKey$1(key)) {
      throw new Error(`[unstorage] Invalid key: ${JSON.stringify(key)}`);
    }
    return base + key;
  };
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = nonItemKeyProperties.has(property) ? (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    ) : async (key = "", ...args) => (
      // @ts-ignore
      storage[property](itemKey(key), ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  nsStorage.keys = nsStorage.getKeys;
  nsStorage.getItems = async (items, commonOptions) => {
    const prefixedItems = items.map(
      (item) => typeof item === "string" ? itemKey(item) : { ...item, key: itemKey(item.key) }
    );
    const results = await storage.getItems(prefixedItems, commonOptions);
    return results.map((entry) => ({
      key: entry.key.slice(base.length),
      value: entry.value
    }));
  };
  nsStorage.setItems = async (items, commonOptions) => {
    const prefixedItems = items.map((item) => ({
      key: itemKey(item.key),
      value: item.value,
      options: item.options
    }));
    return storage.setItems(prefixedItems, commonOptions);
  };
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function hasDotSegment(key) {
  return key.split(":").some((segment) => segment === "." || segment === "..");
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}
function filterKeyByDepth(key, depth) {
  if (depth === void 0) {
    return true;
  }
  let substrCount = 0;
  let index = key.indexOf(":");
  while (index > -1) {
    substrCount++;
    index = key.indexOf(":", index + 1);
  }
  return substrCount <= depth;
}
function filterKeyByBase(key, base) {
  if (base) {
    return key.startsWith(base) && key[key.length - 1] !== "$";
  }
  return key[key.length - 1] !== "$";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const normalizeItemKey = (key) => {
    const normalizedKey = normalizeKey$1(key);
    if (!normalizedKey || hasDotSegment(normalizedKey)) {
      throw new Error(`[unstorage] Invalid key: ${JSON.stringify(key)}`);
    }
    return normalizedKey;
  };
  const normalizeBase = (base) => {
    const normalizedBase = normalizeBaseKey(base);
    if (hasDotSegment(normalizedBase)) {
      throw new Error(`[unstorage] Invalid base: ${JSON.stringify(base)}`);
    }
    return normalizedBase;
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeItemKey(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    async hasItem(key, opts = {}) {
      key = normalizeItemKey(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    async getItem(key, opts = {}) {
      key = normalizeItemKey(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    async getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    async getItemRaw(key, opts = {}) {
      key = normalizeItemKey(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeItemKey(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeItemKey(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeItemKey(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeItemKey(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    async setMeta(key, value, opts = {}) {
      return this.setItem(normalizeItemKey(key) + "$", value, opts);
    },
    async removeMeta(key, opts = {}) {
      return this.removeItem(normalizeItemKey(key) + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBase(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      let allMountsSupportMaxDepth = true;
      for (const mount of mounts) {
        if (!mount.driver.flags?.maxDepth) {
          allMountsSupportMaxDepth = false;
        }
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey$1(key);
          if (!maskedMounts.some((p) => fullKey.startsWith(p))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
      return allKeys.filter(
        (key) => (!shouldFilterByDepth || filterKeyByDepth(key, opts.maxDepth)) && filterKeyByBase(key, base)
      );
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBase(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBase(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]?.();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    },
    // Aliases
    keys: (base, opts = {}) => storage.getKeys(base, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {
  ["i18n:11a0e9c5.json"]: {
    import: () => import('../raw/11a0e9c5.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"1e2f-Yy0wqPMLYiyAC0JO4QVT2t0KuWo\"","mtime":"2026-11-26T07:51:25.717Z"}
  },
  ["i18n:dd194427.json"]: {
    import: () => import('../raw/dd194427.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"1a77-I36IGJPpGDufs3sNs2J0lp6pxDw\"","mtime":"2026-11-26T07:51:25.717Z"}
  }
};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
};

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError$2(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, createError$2);
  }
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError$2(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError$2(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding ?? null).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore, maxDepth) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        if (maxDepth === void 0 || maxDepth > 0) {
          const dirFiles = await readdirRecursive(
            entryPath,
            ignore,
            maxDepth === void 0 ? void 0 : maxDepth - 1
          );
          files.push(...dirFiles.map((f) => entry.name + "/" + f));
        }
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError$2(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    flags: {
      maxDepth: true
    },
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys(_base, topts) {
      return readdirRecursive(r("."), opts.ignore, topts?.maxDepth);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage$1 = createStorage({});

storage$1.mount('/assets', assets$1);

storage$1.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"./.data/kv"}));

function useStorage$1(base = "") {
  return base ? prefixStorage(storage$1, base) : storage$1;
}

function serialize$1(input) {
	if (typeof input === "string") return `'${input}'`;
	return new Serializer().serialize(input);
}
const asciiOrder = " _-,;:!?.'\"()[]{}@*/\\&#%`^+<=>|~$0123456789abcdefghijklmnopqrstuvwxyz";
const asciiWeights = /*@__PURE__*/ (function() {
	const weights = /* @__PURE__ */ new Uint8Array(128);
	for (let i = 0; i < 69; i++) weights[asciiOrder.charCodeAt(i)] = i + 1;
	for (let code = 65; code <= 90; code++) weights[code] = weights[code + 32];
	return weights;
})();
function compareStrings(a, b) {
	if (a === b) return 0;
	const length = Math.min(a.length, b.length);
	let tieBreaker = 0;
	for (let i = 0; i < length; i++) {
		const codeA = a.charCodeAt(i);
		const codeB = b.charCodeAt(i);
		if (codeA === codeB) continue;
		const weightA = codeA < 128 && asciiWeights[codeA] ? asciiWeights[codeA] : codeA + 128;
		const weightB = codeB < 128 && asciiWeights[codeB] ? asciiWeights[codeB] : codeB + 128;
		if (weightA !== weightB) return weightA < weightB ? -1 : 1;
		if (tieBreaker === 0) tieBreaker = codeA > codeB ? -1 : 1;
	}
	if (a.length !== b.length) return a.length < b.length ? -1 : 1;
	return tieBreaker;
}
const Serializer = /*@__PURE__*/ (function() {
	class Serializer {
		#context = /* @__PURE__ */ new Map();
		compare(a, b) {
			const typeA = typeof a;
			const typeB = typeof b;
			if (typeA === "string" && typeB === "string") return compareStrings(a, b);
			if (typeA === "number" && typeB === "number") return a - b;
			return compareStrings(this.serialize(a, true), this.serialize(b, true));
		}
		serialize(value, noQuotes) {
			if (value === null) return "null";
			switch (typeof value) {
				case "string": return noQuotes ? value : `'${value}'`;
				case "bigint": return `${value}n`;
				case "object": return this.$object(value);
				case "function": return this.$function(value);
			}
			return String(value);
		}
		serializeObject(object) {
			const objString = Object.prototype.toString.call(object);
			if (objString !== "[object Object]") return this.serializeBuiltInType(objString.length < 10 ? `unknown:${objString}` : objString.slice(8, -1), object);
			const constructor = object.constructor;
			const objName = constructor === Object || constructor === void 0 ? "" : constructor.name;
			if (objName !== "" && globalThis[objName] === constructor) return this.serializeBuiltInType(objName, object);
			if ("toJSON" in object && typeof object.toJSON === "function") {
				const json = object.toJSON();
				return objName + (json !== null && typeof json === "object" ? this.$object(json) : `(${this.serialize(json)})`);
			}
			const keys = Object.keys(object).sort(compareStrings);
			let content = `${objName}{`;
			for (let i = 0; i < keys.length; i++) {
				const key = keys[i];
				content += `${key}:${this.serialize(object[key])}`;
				if (i < keys.length - 1) content += ",";
			}
			return content + "}";
		}
		serializeBuiltInType(type, object) {
			const handler = this["$" + type];
			if (handler) return handler.call(this, object);
			if (typeof object.entries === "function") return this.serializeObjectEntries(type, object.entries());
			throw new Error(`Cannot serialize ${type}`);
		}
		serializeObjectEntries(type, entries) {
			const sortedEntries = Array.from(entries).sort((a, b) => this.compare(a[0], b[0]));
			let content = `${type}{`;
			for (let i = 0; i < sortedEntries.length; i++) {
				const [key, value] = sortedEntries[i];
				content += `${this.serialize(key, true)}:${this.serialize(value)}`;
				if (i < sortedEntries.length - 1) content += ",";
			}
			return content + "}";
		}
		$object(object) {
			let content = this.#context.get(object);
			if (content === void 0) {
				this.#context.set(object, `#${this.#context.size}`);
				content = this.serializeObject(object);
				this.#context.set(object, content);
			}
			return content;
		}
		$function(fn) {
			const fnStr = Function.prototype.toString.call(fn);
			if (fnStr.slice(-15) === "[native code] }") return `${fn.name || ""}()[native]`;
			return `${fn.name}(${fn.length})${fnStr.replace(/\s*\n\s*/g, "")}`;
		}
		$Array(arr) {
			let content = "[";
			for (let i = 0; i < arr.length; i++) {
				content += this.serialize(arr[i]);
				if (i < arr.length - 1) content += ",";
			}
			return content + "]";
		}
		$Date(date) {
			try {
				return `Date(${date.toISOString()})`;
			} catch {
				return `Date(null)`;
			}
		}
		$ArrayBuffer(arr) {
			return `ArrayBuffer[${new Uint8Array(arr).join(",")}]`;
		}
		$Set(set) {
			return `Set${this.$Array(Array.from(set).sort((a, b) => this.compare(a, b)))}`;
		}
		$Map(map) {
			return this.serializeObjectEntries("Map", map.entries());
		}
	}
	for (const type of [
		"Error",
		"RegExp",
		"URL"
	]) Serializer.prototype["$" + type] = function(val) {
		return `${type}(${val})`;
	};
	for (const type of [
		"Int8Array",
		"Uint8Array",
		"Uint8ClampedArray",
		"Int16Array",
		"Uint16Array",
		"Int32Array",
		"Uint32Array",
		"Float32Array",
		"Float64Array"
	]) Serializer.prototype["$" + type] = function(arr) {
		return `${type}[${arr.join(",")}]`;
	};
	for (const type of ["BigInt64Array", "BigUint64Array"]) Serializer.prototype["$" + type] = function(arr) {
		return `${type}[${arr.join("n,")}${arr.length > 0 ? "n" : ""}]`;
	};
	return Serializer;
})();

const fastHash = /*@__PURE__*/ (() => globalThis.process?.getBuiltinModule?.("crypto")?.hash)();
const algorithm = "sha256";
const encoding = "base64url";
function digest(data) {
	if (fastHash) return fastHash(algorithm, data, encoding);
	const h = createHash(algorithm).update(data);
	return globalThis.process?.versions?.webcontainer ? h.digest().toString(encoding) : h.digest(encoding);
}

function hash$1(input) {
	return digest(serialize$1(input));
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
const MAX_WRITE_HOLD_MS = 3e4;
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const heldUntil = /* @__PURE__ */ new WeakMap();
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage$1().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      let isPending = pending[key];
      if (isPending && heldUntil.has(isPending) && (shouldInvalidateCache || Date.now() > heldUntil.get(isPending))) {
        delete pending[key];
        isPending = void 0;
      }
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = (async () => resolver())();
      }
      const current = pending[key];
      const release = () => {
        if (pending[key] === current) {
          delete pending[key];
        }
      };
      try {
        entry.value = await current;
      } catch (error) {
        if (!isPending) {
          release();
        }
        throw error;
      }
      if (!isPending) {
        let isWriting = false;
        try {
          entry.mtime = Date.now();
          entry.integrity = integrity;
          if (validate(entry) === false) {
            if (opts._removeStaleOnInvalid?.(entry)) {
              const promise = useStorage$1().removeItem(cacheKey).catch((error) => {
                console.error(`[cache] Cache remove error.`, error);
                useNitroApp().captureError(error, {
                  event,
                  tags: ["cache"]
                });
              });
              if (event?.waitUntil) {
                event.waitUntil(promise);
              }
            }
          } else {
            heldUntil.set(
              current,
              entry.mtime + Math.min(MAX_WRITE_HOLD_MS, ttl || Infinity)
            );
            let setOpts;
            if (opts.maxAge && !opts.swr) {
              setOpts = { ttl: opts.maxAge };
            }
            const promise = useStorage$1().setItem(cacheKey, entry, setOpts).catch((error) => {
              console.error(`[cache] Cache write error.`, error);
              useNitroApp().captureError(error, { event, tags: ["cache"] });
            }).finally(release);
            isWriting = true;
            if (event?.waitUntil) {
              event.waitUntil(promise);
            }
          }
        } finally {
          if (!isWriting) {
            release();
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const _methodSuffix = event.method === "HEAD" ? ":HEAD" : "";
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey) + _methodSuffix;
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":") + _methodSuffix;
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      if (!isCacheableResponse(entry.value.headers, variableHeaderNames)) {
        return false;
      }
      return true;
    },
    _removeStaleOnInvalid: (entry) => !!entry.value && !isCacheableResponse(entry.value.headers, variableHeaderNames),
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _resolveResponse = async (incomingEvent) => {
    const variableHeaders = {};
    for (const header of variableHeaderNames) {
      const value = incomingEvent.node.req.headers[header];
      if (value !== void 0) {
        variableHeaders[header] = value;
      }
    }
    const reqProxy = cloneWithProxy(incomingEvent.node.req, {
      headers: variableHeaders
    });
    const resHeaders = {};
    let _resSendBody;
    const resProxy = cloneWithProxy(incomingEvent.node.res, {
      statusCode: 200,
      writableEnded: false,
      writableFinished: false,
      headersSent: false,
      closed: false,
      getHeader(name) {
        return resHeaders[name];
      },
      setHeader(name, value) {
        resHeaders[name] = value;
        return this;
      },
      getHeaderNames() {
        return Object.keys(resHeaders);
      },
      hasHeader(name) {
        return name in resHeaders;
      },
      removeHeader(name) {
        delete resHeaders[name];
      },
      appendHeader(name, value) {
        const values = [resHeaders[name], value].flat().filter((v) => v !== void 0).map(String);
        resHeaders[name] = values.length === 1 ? values[0] : values;
        return this;
      },
      getHeaders() {
        return resHeaders;
      },
      end(chunk, arg2, arg3) {
        if (typeof chunk === "string") {
          _resSendBody = chunk;
        }
        if (typeof arg2 === "function") {
          arg2();
        }
        if (typeof arg3 === "function") {
          arg3();
        }
        return this;
      },
      write(chunk, arg2, arg3) {
        if (typeof chunk === "string") {
          _resSendBody = chunk;
        }
        if (typeof arg2 === "function") {
          arg2(void 0);
        }
        if (typeof arg3 === "function") {
          arg3();
        }
        return true;
      },
      writeHead(statusCode, headers2) {
        this.statusCode = statusCode;
        if (headers2) {
          if (Array.isArray(headers2) || typeof headers2 === "string") {
            throw new TypeError("Raw headers  is not supported.");
          }
          for (const header in headers2) {
            const value = headers2[header];
            if (value !== void 0) {
              this.setHeader(header, value);
            }
          }
        }
        return this;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event._path = incomingEvent._path;
    event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
      fetch: useNitroApp().localFetch
    });
    event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
      fetch: globalThis.$fetch
    });
    event.waitUntil = incomingEvent.waitUntil;
    event.context = incomingEvent.context;
    event.context.cache = {
      options: _opts
    };
    const body = await handler(event) || _resSendBody;
    const headers = event.node.res.getHeaders();
    headers.etag = String(headers.Etag || headers.etag || `W/"${hash(body)}"`);
    headers["last-modified"] = String(
      headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
    );
    const cacheControl = [];
    if (!isCacheableResponse(headers, variableHeaderNames)) ; else if (opts.swr) {
      if (opts.maxAge) {
        cacheControl.push(`s-maxage=${opts.maxAge}`);
      }
      if (opts.staleMaxAge) {
        cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
      } else {
        cacheControl.push("stale-while-revalidate");
      }
    } else if (opts.maxAge) {
      cacheControl.push(`max-age=${opts.maxAge}`);
    }
    if (cacheControl.length > 0) {
      headers["cache-control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.node.res.statusCode,
      headers,
      body
    };
    responseOrigins.set(cacheEntry, incomingEvent);
    return cacheEntry;
  };
  const _cachedHandler = cachedFunction(
    // Anonymous wrapper keeps the default cache name (`fn.name` fallback) unchanged
    (event) => _resolveResponse(event),
    _opts
  );
  return defineEventHandler$2(async (event) => {
    if (event.method !== "GET" && event.method !== "HEAD" || event.node.req.headers.range !== void 0) {
      return handler(event);
    }
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    let response = await _cachedHandler(
      event
    );
    let isCacheable = isCacheableResponse(
      response.headers,
      variableHeaderNames
    );
    if (!isCacheable && responseOrigins.get(response) !== event) {
      response = await _resolveResponse(event);
      isCacheable = isCacheableResponse(response.headers, variableHeaderNames);
    }
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    const isOrigin = responseOrigins.get(response) === event;
    if (isCacheable && handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name.toLowerCase() === "set-cookie") {
        if (isOrigin && value !== void 0) {
          event.node.res.appendHeader(
            name,
            splitCookiesString(value)
          );
        }
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
const responseOrigins = /* @__PURE__ */ new WeakMap();
function getHeaderValue(headers, name) {
  const values = [];
  for (const key in headers) {
    if (key.toLowerCase() === name) {
      const value = headers[key];
      if (value !== void 0) {
        values.push(Array.isArray(value) ? value.join(", ") : String(value));
      }
    }
  }
  return values.length > 0 ? values.join(", ") : void 0;
}
const VARY_IGNORED_HEADERS = /* @__PURE__ */ new Set(["accept-encoding"]);
function isCacheableResponse(headers, variableHeaderNames) {
  if (getHeaderValue(headers, "set-cookie") !== void 0) {
    return false;
  }
  const cacheControl = getHeaderValue(headers, "cache-control");
  if (cacheControl && /(?:^|[\s,])(?:private|no-store|no-cache)(?:$|[\s,=])/i.test(cacheControl)) {
    return false;
  }
  const vary = getHeaderValue(headers, "vary");
  if (vary) {
    for (const _name of vary.split(",")) {
      const name = _name.trim().toLowerCase();
      if (!name || VARY_IGNORED_HEADERS.has(name)) {
        continue;
      }
      if (name === "*" || !variableHeaderNames.includes(name)) {
        return false;
      }
    }
  }
  return true;
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

const envKeys = /* @__PURE__ */ new Map();
const MAX_ENV_KEYS = 5e3;
function toEnvKey(key) {
  let envKey = envKeys.get(key);
  if (envKey === void 0) {
    envKey = snakeCase(key).toUpperCase();
    if (envKeys.size < MAX_ENV_KEYS) {
      envKeys.set(key, envKey);
    }
  }
  return envKey;
}
function getEnv(key, opts) {
  const envKey = toEnvKey(key);
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "7c4dc18f-94a2-4328-9380-fe6a8a27c401",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/**": {
        "headers": {
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
          "Referrer-Policy": "strict-origin-when-cross-origin",
          "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
          "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
          "Cross-Origin-Opener-Policy": "same-origin"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable",
          "Cache-Control": "public, max-age=31536000, immutable",
          "X-Robots-Tag": "noindex"
        },
        "robots": "noindex"
      },
      "/sitemap.xml": {
        "redirect": {
          "to": "/sitemap_index.xml",
          "statusCode": 307
        },
        "prerender": false
      },
      "/_nuxt": {
        "robots": "noindex",
        "headers": {
          "X-Robots-Tag": "noindex"
        }
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      }
    }
  },
  "appSecret": "",
  "public": {
    "nuxt-seo-utils-version": "9.1.0",
    "seo-utils": {
      "canonicalQueryWhitelist": [
        "page",
        "sort",
        "filter",
        "search",
        "q",
        "category",
        "tag"
      ],
      "canonicalLowercase": true,
      "automaticTwitterTags": true,
      "tagPriority": "low",
      "separator": "",
      "titleSeparator": ""
    },
    "i18n": {
      "baseUrl": "",
      "defaultLocale": "fr",
      "rootRedirect": "",
      "redirectStatusCode": 302,
      "skipSettingLocaleOnNavigate": false,
      "locales": [
        {
          "code": "fr",
          "language": "fr-FR",
          "name": "Français",
          "domains": [],
          "defaultForDomains": []
        },
        {
          "code": "en",
          "language": "en-US",
          "name": "English",
          "domains": [],
          "defaultForDomains": []
        }
      ],
      "detectBrowserLanguage": {
        "alwaysRedirect": false,
        "cookieCrossOrigin": false,
        "cookieDomain": "",
        "cookieKey": "picross_lang",
        "cookieSecure": true,
        "fallbackLocale": "fr",
        "redirectOn": "root",
        "useCookie": true
      },
      "experimental": {
        "localeDetector": "",
        "typedPages": true,
        "typedOptionsAndMessages": false,
        "alternateLinkCanonicalQueries": true,
        "devCache": false,
        "cacheLifetime": "",
        "stripMessagesPayload": false,
        "preload": false,
        "strictSeo": false,
        "nitroContextDetection": true,
        "httpCacheDuration": 10,
        "compactRoutes": false,
        "prerenderMessages": false,
        "optimizeMessageBundling": true
      },
      "domainLocales": {
        "fr": {
          "domain": ""
        },
        "en": {
          "domain": ""
        }
      }
    },
    "nuxt-robots": {
      "version": "7.1.0",
      "debug": false,
      "credits": true,
      "sitemap": [
        "/sitemap_index.xml"
      ],
      "header": true,
      "contentSignalHeader": "",
      "robotsEnabledValue": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      "robotsDisabledValue": "noindex, nofollow",
      "cacheControl": "max-age=14400, must-revalidate",
      "botDetection": true
    }
  },
  "apiUrl": "http://localhost:3000",
  "sitemap": {
    "cacheMaxAgeSeconds": 600,
    "debug": false
  },
  "nuxt-schema-org": {
    "reactive": false,
    "minify": true,
    "scriptAttributes": {
      "data-nuxt-schema-org": true
    },
    "identity": {
      "type": "Organization",
      "name": "Picross",
      "url": "http://localhost:5173",
      "logo": "/img/icons/android-chrome-512x512.png"
    },
    "excludeWorkTranslationLocales": [],
    "version": "7.1.1"
  },
  "nuxt-robots": {
    "version": "7.1.0",
    "debug": false,
    "credits": true,
    "sitemap": [
      "/sitemap_index.xml"
    ],
    "header": true,
    "contentSignalHeader": "",
    "robotsEnabledValue": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    "robotsDisabledValue": "noindex, nofollow",
    "cacheControl": "max-age=14400, must-revalidate",
    "botDetection": true,
    "groups": [
      {
        "comment": [],
        "disallow": [
          "/api/",
          "/en/api/",
          "/connexion",
          "/en/login",
          "/inscription",
          "/en/register",
          "/compte",
          "/en/account",
          "/creer",
          "/en/create",
          "/admin",
          "/en/admin",
          "/en/login",
          "/en/register",
          "/en/account",
          "/en/create",
          "/en/admin"
        ],
        "allow": [
          "/",
          "/en"
        ],
        "userAgent": [
          "*"
        ],
        "contentUsage": [],
        "contentSignal": [],
        "_indexable": true,
        "_rules": [
          {
            "pattern": "/api/",
            "allow": false
          },
          {
            "pattern": "/en/api/",
            "allow": false
          },
          {
            "pattern": "/connexion",
            "allow": false
          },
          {
            "pattern": "/en/login",
            "allow": false
          },
          {
            "pattern": "/inscription",
            "allow": false
          },
          {
            "pattern": "/en/register",
            "allow": false
          },
          {
            "pattern": "/compte",
            "allow": false
          },
          {
            "pattern": "/en/account",
            "allow": false
          },
          {
            "pattern": "/creer",
            "allow": false
          },
          {
            "pattern": "/en/create",
            "allow": false
          },
          {
            "pattern": "/admin",
            "allow": false
          },
          {
            "pattern": "/en/admin",
            "allow": false
          },
          {
            "pattern": "/en/login",
            "allow": false
          },
          {
            "pattern": "/en/register",
            "allow": false
          },
          {
            "pattern": "/en/account",
            "allow": false
          },
          {
            "pattern": "/en/create",
            "allow": false
          },
          {
            "pattern": "/en/admin",
            "allow": false
          },
          {
            "pattern": "/",
            "allow": true
          },
          {
            "pattern": "/en",
            "allow": true
          }
        ],
        "_normalized": true
      }
    ]
  },
  "nuxt-site-config": {
    "stack": [
      {
        "_context": "system",
        "_priority": -15,
        "env": "production"
      },
      {
        "_priority": -3,
        "_context": "nuxt-site-config:config",
        "url": "http://localhost:5173",
        "name": "Picross",
        "description": "Picross en ligne : résolvez des nonogrammes, créez vos grilles et partagez-les.",
        "defaultLocale": "fr"
      },
      {
        "_priority": -2,
        "_context": "@nuxtjs/i18n",
        "defaultLocale": "fr-FR"
      }
    ],
    "version": "5.1.0",
    "debug": false,
    "multiTenancy": []
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig$2(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig$2();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());

getContext("nitro-app", {
  asyncContext: false,
  AsyncLocalStorage: void 0
});

const MAX_DECODE_PASSES = 8;
const PERCENT_ESCAPE_RE = /%([\da-f]{2})/gi;
const HAS_PERCENT_ESCAPE_RE = /%[\da-f]{2}/i;
function canonicalizePath(pathname) {
  let path = pathname;
  for (let pass = 0; HAS_PERCENT_ESCAPE_RE.test(path); pass++) {
    if (pass >= MAX_DECODE_PASSES) {
      return void 0;
    }
    path = path.replace(
      PERCENT_ESCAPE_RE,
      (_, hex) => String.fromCharCode(Number.parseInt(hex, 16))
    );
  }
  const segments = [];
  for (const segment of path.replace(/\\/g, "/").split("/")) {
    if (segment === "" || segment === ".") {
      continue;
    }
    if (segment === "..") {
      segments.pop();
      continue;
    }
    segments.push(segment);
  }
  return "/" + segments.join("/");
}
function whatwgPathname(pathname) {
  try {
    return new URL(pathname, "http://_").pathname;
  } catch {
    return void 0;
  }
}
const READINGS = [
  (p) => canonicalizePath(p),
  (p) => {
    const whatwg = whatwgPathname(p);
    return whatwg === void 0 ? void 0 : canonicalizePath(whatwg);
  }
];
function getPathReadings(pathname) {
  return [.../* @__PURE__ */ new Set([pathname, ...READINGS.map((read) => read(pathname))])];
}
function isPathInScope(pathname, base) {
  if (!base || base === "/") {
    return true;
  }
  for (const read of READINGS) {
    const canonicalBase = read(base);
    const canonical = read(pathname);
    if (canonicalBase === void 0 || canonical === void 0) {
      return false;
    }
    if (canonicalBase === "/") {
      continue;
    }
    if (canonical !== canonicalBase && !canonical.startsWith(canonicalBase + "/")) {
      return false;
    }
  }
  return true;
}
function isTargetInScope(target, targetBase) {
  return isPathInScope(
    parseURL(target).pathname || "/",
    parseURL(targetBase).pathname || ""
  );
}
const LEADING_SEPARATORS_RE = (
  // eslint-disable-next-line no-control-regex
  /^(?:[\u0000-\u0020/\\]|%(?:2f|5c|[01][\da-f]|20))+/i
);
function normalizeRedirectPath(path) {
  return path.replace(LEADING_SEPARATORS_RE, "/");
}
function resolveRedirectTarget(path, to, stripBase) {
  if (!to.endsWith("/**")) {
    return path.includes("?") ? withQuery(to, getQuery$2(path)) : to;
  }
  let targetPath = path;
  if (stripBase) {
    if (!isPathInScope(path.split("?")[0], stripBase)) {
      return void 0;
    }
    targetPath = withoutBase(targetPath, stripBase);
  }
  targetPath = normalizeRedirectPath(targetPath);
  const targetBase = to.slice(0, -3);
  if (targetBase && targetBase !== "/" && !isPathInScope(joinURL("/_", targetPath.split("?")[0]), "/_")) {
    return void 0;
  }
  let target = joinURL(targetBase, targetPath);
  if (!targetBase || targetBase === "/") {
    target = normalizeRedirectPath(target);
    if (!target.startsWith("/")) {
      target = "/" + target;
    }
  }
  if (!isTargetInScope(target, targetBase)) {
    return void 0;
  }
  return target;
}

const config = useRuntimeConfig$2();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
const _caseInsensitiveMatcher = toRouteMatcher(
  createRouter$1({
    routes: createCaseInsensitiveRoutes(config.nitro.routeRules)
  })
);
function createCaseInsensitiveRoutes(routeRules = {}) {
  const routes = {};
  for (const [key, rules] of Object.entries(routeRules)) {
    const route = routes[key.toLowerCase()] ||= {};
    for (const rule of ["cache", "isr"]) {
      if (rules[rule] !== void 0 && route[rule] !== false) {
        route[rule] = rules[rule];
      }
    }
  }
  return routes;
}
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules$2(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
      if (Object.keys(routeRules.headers).some(
        (name) => name.toLowerCase() === "cache-control"
      )) {
        event.context._nitro.routeRulesCacheControl = getResponseHeader(
          event,
          "cache-control"
        );
      }
    }
    if (routeRules.redirect) {
      const target = resolveRedirectTarget(
        event.path,
        routeRules.redirect.to,
        routeRules.redirect._redirectStripBase
      );
      if (target === void 0) {
        throw createError$3({ statusCode: 400 });
      }
      return sendRedirect$1(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      const target = resolveRuleTarget(
        event,
        routeRules.proxy.to,
        routeRules.proxy._proxyStripBase
      );
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function resolveRuleTarget(event, to, stripBase) {
  if (!to.endsWith("/**")) {
    if (event.path.includes("?")) {
      return withQuery(to, getQuery$2(event.path));
    }
    return to;
  }
  const targetBase = to.slice(0, -3);
  let targetPath = event.path;
  if (stripBase) {
    if (!isPathInScope(event.path.split("?")[0], stripBase)) {
      throw createError$3({ statusCode: 400 });
    }
    targetPath = withoutBase(targetPath, stripBase);
  } else if (targetPath.startsWith("//")) {
    targetPath = targetPath.replace(/^\/+/, "/");
  }
  const target = joinURL(targetBase, targetPath);
  if (!isTargetInScope(target, targetBase)) {
    throw createError$3({ statusCode: 400 });
  }
  return target;
}
function getRouteRulesPath(event) {
  event.context._nitro = event.context._nitro || {};
  if (event.context._nitro.routeRulesPath === void 0) {
    event.context._nitro.routeRulesPath = withoutBase(
      event.path.split("?")[0],
      useRuntimeConfig$2().app.baseURL
    );
  }
  return event.context._nitro.routeRulesPath;
}
function getRouteRules$2(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      getRouteRulesPath(event)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteCacheRule(event) {
  const cache = getRouteRules$2(event).cache;
  if (!cache || isRouteRuleDisabled(getRouteRulesPath(event), "cache")) {
    return void 0;
  }
  return cache;
}
function isRouteRuleDisabled(path, rule) {
  for (const reading of getPathReadings(path)) {
    if (reading === void 0 || getRouteRulesForPath(reading)[rule] === false || _getCaseInsensitiveRules(reading)[rule] === false) {
      return true;
    }
  }
  return false;
}
function _getCaseInsensitiveRules(path) {
  return defu(
    {},
    ..._caseInsensitiveMatcher.matchAll(path.toLowerCase()).reverse()
  );
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

// src/runtime/utils/error.ts
/**
* Nitro internal functions extracted from https://github.com/nitrojs/nitro/blob/v2/src/runtime/internal/utils.ts
*/
function isJsonRequest(event) {
	if (hasReqHeader(event, "accept", "text/html")) return false;
	return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
	const value = getRequestHeader$2(event, name);
	return !!(value && typeof value === "string" && value.toLowerCase().includes(includes));
}

// src/runtime/utils/event.ts
const ENC_PIPE_RE = /%7C/g;
const ENC_BRACKET_OPEN_RE = /%5B/g;
const ENC_BRACKET_CLOSE_RE = /%5D/g;
const ENC_ENC_SLASH_RE = /%252F/gi;
const HASH_RE = /#/g;
const QUESTION_MARK_RE = /\?/g;
const DOT_SEGMENT_RE = /(?:^|\/)\.{1,2}(?:\/|$)/;
function encodeEventPath(path) {
	const queryIndex = path.indexOf("?");
	if (queryIndex === -1) return encodeVueRouterPath(path);
	return encodeVueRouterPath(path.slice(0, queryIndex)) + path.slice(queryIndex);
}
function encodeVueRouterPath(path) {
	return encodeURI(path).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]").replace(HASH_RE, "%23").replace(QUESTION_MARK_RE, "%3F").replace(ENC_ENC_SLASH_RE, "%2F");
}
/**
* The response headers of an h3 v1 event, in the shape the renderer writes them in.
*
* Backed by the node response rather than a copy of it, so a header the app sets through
* h3 and a header the renderer sets are the same header, and both are sent.
*/
var NodeResponseHeaders = class {
	res;
	constructor(res) {
		this.res = res;
	}
	get(name) {
		const value = this.res.getHeader(name);
		if (value === void 0) return null;
		return Array.isArray(value) ? value.join(", ") : String(value);
	}
	has(name) {
		return this.res.hasHeader(name);
	}
	set(name, value) {
		this.res.setHeader(name, value);
	}
	append(name, value) {
		const existing = this.res.getHeader(name);
		if (existing === void 0) {
			this.res.setHeader(name, value);
			return;
		}
		this.res.setHeader(name, Array.isArray(existing) ? [...existing, value] : [String(existing), value]);
	}
	delete(name) {
		this.res.removeHeader(name);
	}
	getSetCookie() {
		const value = this.res.getHeader("set-cookie");
		if (value === void 0) return [];
		return Array.isArray(value) ? value.map(String) : [String(value)];
	}
	*entries() {
		const headers = this.res.getHeaders();
		for (const name of Object.keys(headers).sort()) {
			const value = headers[name];
			if (value === void 0) continue;
			if (name === "set-cookie" && Array.isArray(value)) for (const entry of value) yield [name, entry];
			else yield [name, Array.isArray(value) ? value.join(", ") : String(value)];
		}
	}
	*keys() {
		for (const [name] of this.entries()) yield name;
	}
	*values() {
		for (const [, value] of this.entries()) yield value;
	}
	forEach(callback, thisArg) {
		for (const [name, value] of this.entries()) callback.call(thisArg, value, name, this);
	}
	[Symbol.iterator]() {
		return this.entries();
	}
};
const WEB_PROPERTIES = /* @__PURE__ */ new Set([
	"req",
	"res",
	"url",
	"~app"
]);
const PAYLOAD_METHODS = /* @__PURE__ */ new Set([
	"PATCH",
	"POST",
	"PUT",
	"DELETE"
]);
const BODY_READ_METHODS = /* @__PURE__ */ new Set([
	"arrayBuffer",
	"blob",
	"bytes",
	"formData",
	"json",
	"text"
]);
const RAW_BODY = Symbol.for("h3RawBody");
const requestBodies = /* @__PURE__ */ new WeakMap();
/**
* The request in the web-standard shape, with every read of its body served from the bytes
* h3 v1 caches on the node request.
*
* A body read here and a `readBody(event)` elsewhere in the same request therefore resolve
* to the same bytes whichever happens first, and reading the request twice - directly, from
* a clone, or as a stream - resolves the same bytes each time rather than the second read
* finding a stream the first has drained.
*/
function toWebRequest$1(event) {
	const existing = event.web?.request;
	if (existing) return existing;
	const method = event.method;
	const url = getRequestURL$1(event, { xForwardedProto: false });
	if (!PAYLOAD_METHODS.has(method)) return new Request(url, {
		method,
		headers: event.headers,
		signal: toRequestSignal(event)
	});
	const request = new Request(url, {
		method,
		headers: event.headers,
		body: getRequestBody(event).stream(),
		signal: toRequestSignal(event),
		duplex: "half"
	});
	const copy = () => getRequestBody(event).read().then((body) => new Response(body, { headers: request.headers }));
	const buffered = new Proxy(request, { get(target, property) {
		if (property === "bodyUsed") return false;
		if (property === "body") return getRequestBody(event).stream();
		if (property === "clone") return () => buffered;
		if (typeof property === "string" && BODY_READ_METHODS.has(property)) return () => copy().then((response) => response[property]());
		const value = Reflect.get(target, property, target);
		return typeof value === "function" ? value.bind(target) : value;
	} });
	return buffered;
}
/**
* Aborts when the client disconnects before the response is finished, the same moment an h3 v1
* handler would catch with `event.node.req.on('close')`.
*/
function toRequestSignal(event) {
	const controller = new AbortController();
	const res = event.node?.res;
	if (typeof res?.once === "function") res.once("close", () => {
		if (!res.writableFinished) controller.abort();
	});
	return controller.signal;
}
/**
* The body of the request, shared by every view of it and by h3's own body helpers.
*
* An unread node request is read incrementally, only as far as a read of the body has
* requested, and the chunks are kept so that later reads resolve the same bytes. A body h3
* has already read, or one the request carries in memory, is served from h3.
*/
function getRequestBody(event) {
	const req = event.node.req;
	let body = requestBodies.get(req);
	if (!body) {
		const hasBody = Number.parseInt(req.headers["content-length"] || "") || /\bchunked\b/i.test(String(req.headers["transfer-encoding"] ?? ""));
		const readByH3 = event._requestBody || req[RAW_BODY] || req.rawBody || req.body;
		body = hasBody && !readByH3 ? toIncrementalBody(req) : toRawBody(event);
		requestBodies.set(req, body);
	}
	return body;
}
function toRawBody(event) {
	const read = () => readRawBody(event, false).then((body) => body ? new Uint8Array(body) : /* @__PURE__ */ new Uint8Array());
	return {
		read,
		stream: () => new ReadableStream({ async pull(controller) {
			const body = await read();
			if (body.byteLength) controller.enqueue(body);
			controller.close();
		} }, { highWaterMark: 0 })
	};
}
function toIncrementalBody(req) {
	const chunks = [];
	let source;
	let done = false;
	let pending;
	const readChunk = () => pending ??= (source ??= req[Symbol.asyncIterator]()).next().then((result) => {
		if (result.done) done = true;
		else chunks.push(result.value);
	}).finally(() => {
		pending = void 0;
	});
	const readAll = async () => {
		while (!done) await readChunk();
		return Buffer.concat(chunks);
	};
	Object.defineProperty(req, RAW_BODY, {
		configurable: true,
		get: readAll
	});
	return {
		read: () => readAll().then((body) => new Uint8Array(body)),
		stream: () => {
			let index = 0;
			return new ReadableStream({ async pull(controller) {
				while (index >= chunks.length && !done) await readChunk();
				if (index < chunks.length) controller.enqueue(new Uint8Array(chunks[index++]));
				else controller.close();
			} }, { highWaterMark: 0 });
		}
	};
}
const portableEvents = /* @__PURE__ */ new WeakMap();
/**
* The event a `nuxt/server` handler is given, in the web-standard shape.
*
* Both shapes are served from one object: `req`, `res`, `url` and `~app` resolve to the web
* view, everything else to the h3 v1 event, so h3's own helpers work on it too (they read
* `event.node`, not its deprecated `req`/`res` aliases). Cached per event, with the web view
* built on first access. `resolveURL` replaces how `url` is derived from the event's path.
*/
function toPortableEvent(event, resolveURL) {
	const cached = portableEvents.get(event);
	if (cached) return cached;
	let web;
	const portable = new Proxy(event, {
		get(target, property) {
			if (property === "~portable") return true;
			return WEB_PROPERTIES.has(property) ? (web ??= toWebView(event, resolveURL))[property] : Reflect.get(target, property, target);
		},
		set(target, property, value) {
			if (property === "url") {
				(web ??= toWebView(event, resolveURL)).url = value;
				return true;
			}
			return Reflect.set(target, property, value, target);
		},
		has(target, property) {
			return WEB_PROPERTIES.has(property) || Reflect.has(target, property);
		}
	});
	portableEvents.set(event, portable);
	return portable;
}
/**
* The Nuxt context a request nitro made to itself was fetched with: `node-mock-http` carries
* it on the mock request rather than in the h3 event's own context. A request that arrives
* over the network has none, whoever sent it.
*/
function getFetchedRequestContext(event) {
	return event.node.req.__unenv__?.nuxt;
}
/**
* The event the SSR renderer reads, which reaches the h3 v1 event itself through `~app`.
* Of the Nuxt context a request nitro made to itself was fetched with, only the error render
* flag carries over.
*
* Paths with `.` or `..` segments 404, as `url` would resolve them to a page other than the
* one `event.path` names.
*/
function toRequestEvent(event) {
	const queryIndex = event.path.indexOf("?");
	if (DOT_SEGMENT_RE.test(queryIndex === -1 ? event.path : event.path.slice(0, queryIndex))) throw createError$3({
		statusCode: 404,
		statusMessage: "Page Not Found"
	});
	const requestEvent = toWebView(event);
	if (getFetchedRequestContext(event)?.["~rendering-error"]) event.context.nuxt = {
		"~rendering-error": true,
		...event.context.nuxt
	};
	return requestEvent;
}
function resolveEventURL(event) {
	const url = new URL(`${getRequestProtocol(event, { xForwardedProto: false })}://${getRequestHost(event)}`);
	const path = encodeEventPath(event.path);
	const queryIndex = path.indexOf("?");
	url.pathname = queryIndex === -1 ? path : path.slice(0, queryIndex);
	url.search = queryIndex === -1 ? "" : path.slice(queryIndex);
	url.hash = "";
	return url;
}
/**
* Describe an h3 v1 event in the web-standard shape, rather than adapting it in place:
* `event.req` and `event.res` already name the node request and response, and that is the
* shape `useRequestEvent()` and the render hooks must keep seeing.
*
* Everything is resolved on access, and the response is backed by the node response rather
* than a copy of it, so a header the application sets through h3 and a header the renderer
* sets are the same header.
*/
function toWebView(event, resolveURL = () => resolveEventURL(event)) {
	const node = event.node;
	let request;
	let url;
	const res = {
		get status() {
			return node.res.statusCode;
		},
		set status(status) {
			node.res.statusCode = status;
		},
		get statusText() {
			return node.res.statusMessage;
		},
		set statusText(statusText) {
			node.res.statusMessage = statusText;
		},
		headers: new NodeResponseHeaders(node.res)
	};
	const requestEvent = {
		context: event.context,
		res,
		get req() {
			return request ??= toWebRequest$1(event);
		},
		get url() {
			return url ??= resolveURL();
		},
		set url(value) {
			url = value;
			event._path = node.req.url = value.pathname + value.search;
		}
	};
	requestEvent["~app"] = event;
	return requestEvent;
}

const headSymbol = "usehead";
function installHead(app, head) {
  app.config.globalProperties.$unhead = app.config.globalProperties.$head = head;
  app.provide(headSymbol, head);
}
// @__NO_SIDE_EFFECTS__
function vueInstall(head) {
  return (app) => installHead(app, head);
}

const VueResolver = /* @__PURE__ */ Object.assign(
  // unref reads a ref and returns anything else as it is, functions included;
  // Vue refs are always non-null objects, so skip unref for primitives and functions
  (_, value) => typeof value === "object" && value !== null ? unref(value) : value,
  // identity for plain non-reactive values, so SSR init entries keep
  // their precomputed fast path (see unhead/server createHead)
  { _static: true }
);

// @__NO_SIDE_EFFECTS__
function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const legacyPlugins = [DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin];

const unheadOptions = {
  disableDefaults: true,
  plugins: legacyPlugins,
};

const renderSSRHeadOptions = {"omitLineBreaks":true};
const appComponentHead = [];

const NUXT_PRERENDER_NO_SSR_ROUTES = ["/index.html","/200.html","/404.html"];
const NUXT_NO_SCRIPTS_PATTERNS = [];
const NUXT_PAGE_PATTERNS = ["/jouer/:id?","/en/play/:id?","/admin","/en/admin","/creer","/en/create","/galerie","/en/gallery","/connexion","/en/login","/compte","/en/account","/inscription","/en/register","/","/en","/sitemap.xml"];
const NUXT_SSR_STREAMING = false;
const appHead = {"link":[{"rel":"icon","href":"/favicon.ico","sizes":"16x16 32x32 48x48","type":"image/vnd.microsoft.icon"},{"rel":"icon","type":"image/svg+xml","href":"/favicon.svg","sizes":"any"},{"rel":"apple-touch-icon","href":"/img/icons/apple-touch-icon.png"},{"rel":"manifest","href":"/manifest.webmanifest"}],"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1, viewport-fit=cover"},{"name":"theme-color","content":"#2563eb"},{"name":"color-scheme","content":"light dark"},{"property":"og:type","content":"website"}],"style":[],"script":[],"noscript":[],"htmlAttrs":{}};
const appRootTag = "div";
const appRootAttrs = {"id":"__nuxt"};
const appTeleportTag = "div";
const appTeleportAttrs = {"id":"teleports"};
const appSpaLoaderTag = "div";
const appSpaLoaderAttrs = {"id":"__nuxt-loader"};
const appId = "nuxt-app";

// src/runtime/handlers/error.ts
var error_default = async function errorhandler(error, event, { defaultHandler }) {
	if (event.handled) return;
	const isRenderingError = !!(event.context.nuxt?.["~rendering-error"] || getFetchedRequestContext(event)?.["~rendering-error"]);
	let errorCause;
	if (isJsonRequest(event)) {
		return;
	}
	const defaultRes = await defaultHandler(error, event, {
		json: true,
		silent: false
	});
	if ((error.status || error.statusCode || 500) === 404 && defaultRes.status === 302) {
		setResponseHeaders(event, defaultRes.headers);
		appendVary(event, "accept, sec-fetch-mode");
		setResponseStatus(event, defaultRes.status, defaultRes.statusText);
		return send(event, JSON.stringify(defaultRes.body, null, 2));
	}
	const errorObject = defaultRes.body;
	const url = new URL(errorObject.url);
	errorObject.url = withoutBase(url.pathname, useRuntimeConfig$2(event).app.baseURL) + url.search + url.hash;
	errorObject.message = error.unhandled ? errorObject.message || "Server Error" : error.message || errorObject.message || "Server Error";
	if (!error.unhandled) errorObject.data ||= error.data;
	errorObject.statusText ||= error.statusText || error.statusMessage;
	delete defaultRes.headers["content-type"];
	delete defaultRes.headers["content-security-policy"];
	setResponseHeaders(event, defaultRes.headers);
	appendVary(event, "accept, sec-fetch-mode");
	if (!isRenderingError) event.context.nuxt = {
		...event.context.nuxt,
		"~rendering-error": true
	};
	const res = isRenderingError ? null : await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig$2(event).app.baseURL, "/__nuxt_error"), {
		...errorObject,
		...errorCause !== void 0
	}), {
		headers: event.headers,
		redirect: "manual",
		context: { nuxt: { "~rendering-error": true } }
	}).catch(() => null);
	if (event.handled) return;
	if (!res) {
		setResponseHeader$1(event, "Content-Type", "text/html;charset=UTF-8");
		const { template } = await import('../_/error-template.mjs');
		return send(event, template(errorObject));
	}
	let html = await res.text();
	for (const [header, value] of res.headers.entries()) {
		if (header === ERROR_PAGE_HEADER) continue;
		if (header === "set-cookie" || header === "x-nitro-prerender") {
			appendResponseHeader(event, header, value);
			continue;
		}
		setResponseHeader$1(event, header, value);
	}
	setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
	return send(event, html);
};
/** Set when the app's own error page could not render. */
const ERROR_PAGE_HEADER = "x-nuxt-error-page";
/**
* Add `value`'s tokens to the response `vary` header, keeping any already
* present. `*` absorbs everything else, since it means the response varies on
* all headers.
*/
function appendVary(event, value) {
	const incoming = parseVary(value);
	if (!incoming.length) return;
	const existing = parseVary(getResponseHeader(event, "vary"));
	if (existing.includes("*")) return;
	if (incoming.includes("*")) {
		setResponseHeader$1(event, "vary", "*");
		return;
	}
	const merged = existing.slice();
	for (const token of incoming) if (!merged.includes(token)) merged.push(token);
	setResponseHeader$1(event, "vary", merged.join(", "));
}
function parseVary(value) {
	return (Array.isArray(value) ? value : typeof value === "string" ? value.split(",") : []).map((token) => token.trim().toLowerCase()).filter(Boolean);
}

function defineNitroErrorHandler(handler) {
  return handler;
}
function shouldDisableErrorCache(event, statusCode) {
  if (statusCode === 404) {
    return true;
  }
  const cacheControl = getResponseHeader(event, "cache-control");
  return !cacheControl || cacheControl === event.context._nitro?.routeRulesCacheControl;
}

const errorHandler$1 = defineNitroErrorHandler(
  function defaultNitroErrorHandler(error, event) {
    const res = defaultHandler(error, event);
    setResponseHeaders(event, res.headers);
    setResponseStatus(event, res.status, res.statusText);
    return send(event, JSON.stringify(res.body, null, 2));
  }
);
function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL$1(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    console.error(`[request error] ${tags} [${event.method}] ${url}
`, error);
  }
  const headers = {
    "content-type": "application/json",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'none'; frame-ancestors 'none';"
  };
  setResponseStatus(event, statusCode, statusMessage);
  if (shouldDisableErrorCache(event, statusCode)) {
    headers["cache-control"] = "no-cache";
  }
  const body = {
    error: true,
    url: url.href,
    statusCode,
    statusMessage,
    message: isSensitive ? "Server Error" : error.message,
    data: isSensitive ? void 0 : error.data
  };
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}

const errorHandlers = [error_default, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const _KYySOrLdryRQS0QrNvUEuDNiSFOC0M_ufzRw21qSfI = defineNitroPlugin((nitroApp) => {
  return;
});

const decodeRoutePath = function decodeRoutePath$1(path) {
	if (!path.includes("%")) return path;
	const queryIndex = path.indexOf("?");
	const pathname = queryIndex === -1 ? path : path.slice(0, queryIndex);
	try {
		return queryIndex === -1 ? decodeURI(pathname) : decodeURI(pathname) + path.slice(queryIndex);
	} catch {
		return path;
	}
};
const resolveRoutePathDotSegments = function resolveRoutePathDotSegments(path) {
	const queryIndex = path.indexOf("?");
	const pathname = queryIndex === -1 ? path : path.slice(0, queryIndex);
	if (!/(?:^|\/)(?:\.|%2e)/i.test(pathname)) return path;
	const input = pathname.split("/");
	const output = [];
	const root = pathname.startsWith("/") ? 1 : 0;
	for (const [i, segment] of input.entries()) {
		const dots = /^(?:\.|%2e)(\.|%2e)?$/i.exec(segment);
		if (!dots) {
			output.push(segment);
			continue;
		}
		if (dots[1] && output.length > root) output.pop();
		if (i === input.length - 1) output.push("");
	}
	const resolved = output.join("/");
	return queryIndex === -1 ? resolved : resolved + path.slice(queryIndex);
};
const foldRouteCase = function foldRouteCase$1(path) {
	return path.replace(/[A-Z]+|[^\0-\x7F]/g, (char) => {
		if (char.charCodeAt(0) < 128) return char.toLowerCase();
		const upper = char.toUpperCase();
		if (upper.length !== 1 || upper.charCodeAt(0) < 128) return char;
		const lower = upper.toLowerCase();
		return lower.length === 1 && lower.toUpperCase() === upper ? lower : upper;
	});
};
const matchAllRouteRules = function matchAllRouteRules$1(match, path) {
	const matches = match(path);
	if (typeof path !== "string") return matches;
	const collapse = (reading) => reading.replace(/^[^?]*/, (pathname) => pathname.replace(/\/{2,}/g, "/"));
	const split = path.replace(/^[^?]*/, (pathname) => pathname.replace(/%2f/gi, "/"));
	for (const reading of /* @__PURE__ */ new Set([
		collapse(path),
		split,
		collapse(split)
	])) {
		if (reading === path) continue;
		for (const rules of match(reading)) if (!matches.includes(rules)) matches.push(rules);
	}
	return matches;
};
const normalizePath = (path, fold) => {
  if (typeof path !== 'string') { return path }
  const decoded = decodeRoutePath(resolveRoutePathDotSegments(path));
  return fold ? foldRouteCase(decoded) : decoded
};
const normalizeRouteRulePath = path => normalizePath(path, true);

// src/runtime/utils/route-rules.ts
let matcher;
function getMatcher() {
	if (!matcher) {
		const routes = {};
		for (const [route, rules] of Object.entries(useRuntimeConfig$2().nitro?.routeRules || {})) routes[normalizeRouteRulePath(route)] = rules;
		matcher = toRouteMatcher(createRouter$1({ routes }));
	}
	return matcher;
}
/**
* Resolve the route rules for a path without the base URL. Keys and path are decoded,
* and case-folded unless routing is `sensitive`.
*/
function matchRouteRules(path) {
	return defu({}, ...matchAllRouteRules((path) => getMatcher().matchAll(normalizeRouteRulePath(path)), path).reverse());
}
const STRIP_BASE_KEYS = {
	redirect: "_redirectStripBase",
	proxy: "_proxyStripBase"
};
function withRequestStripBases(rules, path, baseURL) {
	for (const [name, key] of Object.entries(STRIP_BASE_KEYS)) {
		const options = rules[name];
		const stripBase = options?.[key];
		if (typeof stripBase !== "string") continue;
		const base = baseURL.replace(/\/$/, "") + stripBase;
		const rest = base.split("/").slice(1).reduce((remaining) => remaining.replace(/^(?:\/|%2f)+(?:(?!%2f)[^/])*/i, ""), path);
		const prefix = path.slice(0, path.length - rest.length);
		if (prefix !== stripBase && normalizeRouteRulePath(prefix.replace(/%2f/gi, "/").replace(/\/{2,}/g, "/")) === normalizeRouteRulePath(base)) rules[name] = {
			...options,
			[key]: prefix
		};
	}
	return rules;
}
/**
* Resolve the route rules for a request, as {@link matchRouteRules} does for its path. The
* strip base of a wildcard `redirect` or `proxy` rule is taken from the request path.
*/
function resolveRequestRouteRules(event) {
	const path = event.path.split("?")[0];
	const baseURL = useRuntimeConfig$2().app.baseURL;
	return withRequestStripBases(matchRouteRules(withoutBase(path, baseURL)), path, baseURL);
}
/** The route rules for a request, reusing those already resolved for it. */
function getRouteRules$1(event) {
	const context = event.context._nitro ||= {};
	return context.routeRules ||= resolveRequestRouteRules(event);
}

// src/runtime/plugins/route-rules.ts
var route_rules_default = (nitroApp) => {
	nitroApp.hooks.hook("request", (event) => {
		event.context._nitro ||= {};
		event.context._nitro.routeRules = resolveRequestRouteRules(event);
	});
};

const PROTOCOL_RE = /^https?:\/\//;
const TRAILING_SLASH_RE = /\/$/;
function isLocalhostHost(host) {
  if (!host || host.startsWith("localhost") || host.startsWith("127.") || host.startsWith("0.0.0.0"))
    return true;
  const hostname = host.startsWith("[") ? host.slice(0, host.indexOf("]") + 1) : host;
  return hostname === "[::1]" || hostname === "::1" || hostname === "[::]" || hostname === "::";
}
function extractHostname(host) {
  if (host.startsWith("[")) {
    const close = host.indexOf("]");
    return close !== -1 ? host.slice(0, close + 1) : host;
  }
  const colonCount = host.split(":").length - 1;
  return colonCount === 1 ? host.slice(0, host.indexOf(":")) : host;
}
function splitHostPort(host) {
  if (host.startsWith("[")) {
    const close = host.indexOf("]");
    const hostname = close !== -1 ? host.slice(0, close + 1) : host;
    const port = close !== -1 && host[close + 1] === ":" ? host.slice(close + 2) : "";
    const normalized = hostname === "[::1]" || hostname === "[::]" ? "localhost" : hostname;
    return { host: normalized, port };
  }
  if (host === "0.0.0.0" || host.startsWith("0.0.0.0:")) {
    const i = host.indexOf(":");
    return { host: "localhost", port: i !== -1 ? host.slice(i + 1) : "" };
  }
  const colonCount = host.split(":").length - 1;
  if (colonCount === 1) {
    const i = host.indexOf(":");
    return { host: host.slice(0, i), port: host.slice(i + 1) };
  }
  if (colonCount > 1) {
    const normalized = host === "::1" || host === "::" ? "localhost" : `[${host}]`;
    return { host: normalized, port: "" };
  }
  return { host, port: "" };
}
function getNitroOrigin$1(ctx = {}) {
  const isDev = ctx.isDev ?? (process.env.MODE === "development");
  const isPrerender = ctx.isPrerender ?? false;
  let host = "";
  let port = "";
  let protocol = process.env.NITRO_SSL_CERT && process.env.NITRO_SSL_KEY ? "https" : "http";
  if (isDev || isPrerender) {
    const devEnv = process.env.__NUXT_DEV__ || process.env.NUXT_VITE_NODE_OPTIONS;
    if (devEnv) {
      const parsed = JSON.parse(devEnv);
      const origin = parsed.proxy?.url || parsed.baseURL?.replace("/__nuxt_vite_node__", "");
      host = origin.replace(PROTOCOL_RE, "").replace(TRAILING_SLASH_RE, "");
      protocol = origin.startsWith("https") ? "https" : "http";
    }
  }
  if (isDev && isLocalhostHost(host) && ctx.requestHost) {
    const reqHost = extractHostname(ctx.requestHost);
    if (reqHost && !isLocalhostHost(reqHost)) {
      host = ctx.requestHost;
      protocol = ctx.requestProtocol || protocol;
    }
  }
  if (!host && ctx.requestHost) {
    host = ctx.requestHost;
    protocol = ctx.requestProtocol || protocol;
  }
  if (!host) {
    host = process.env.NITRO_HOST || process.env.HOST || "";
    if (isDev)
      port = process.env.NITRO_PORT || process.env.PORT || "3000";
  }
  const split = splitHostPort(host);
  host = split.host;
  if (split.port)
    port = split.port;
  host = process.env.NUXT_SITE_HOST_OVERRIDE || host;
  port = process.env.NUXT_SITE_PORT_OVERRIDE || port;
  if (host.startsWith("http://") || host.startsWith("https://")) {
    protocol = host.startsWith("https://") ? "https" : "http";
    host = host.replace(PROTOCOL_RE, "");
  } else if (!isDev && (!host || !isLocalhostHost(host))) {
    protocol = "https";
  }
  return `${protocol}://${host}${port ? `:${port}` : ""}/`;
}

// ../nuxt/src/app/error.ts
const NUXT_ERROR_SIGNATURE = "__nuxt_error";

// src/runtime/utils/paths.ts
function baseURL() {
	return useRuntimeConfig$2().app.baseURL;
}
function buildAssetsDir() {
	return useRuntimeConfig$2().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
	return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
	const app = useRuntimeConfig$2().app;
	const publicBase = app.cdnURL || app.baseURL;
	return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

/**
* E8xxx
* Nitro server runtime (dev server) diagnostics, sharing the range with the
* SSR renderer.
*/
const docsBase = (code) => `https://nuxt.com/docs/4.x/errors/${code.replace("NUXT_", "").toLowerCase()}`;
const serverDiagnostics = /* #__PURE__ */ defineDiagnostics({
	docsBase,
	reporters: [/* @__PURE__ */ createConsoleReporter(void 0)],
	codes: {
		NUXT_E8003: {
			why: (p) => `Failed to stringify dev server logs.${p.error ? ` Received \`${p.error}\`.` : ""}`,
			fix: "You can define your own reducer/reviver for rich types following the instructions in `https://nuxt.com/docs/4.x/api/composables/use-nuxt-app#payload`.",
			docs: false
		},
		NUXT_E8005: {
			why: "Island props cannot contain a `template` key, which the Vue runtime compiler would compile and execute.",
			fix: "Rename the prop (e.g. `templateName`), or disable `vue.runtimeCompiler` if you do not need runtime template compilation.",
			docs: false
		},
		NUXT_E8012: {
			why: (p) => `\`${p.helper}\` from \`nuxt/server\` was called with an h3 event. The handler was defined with h3's \`defineEventHandler\` (auto-imported), which passes a different event.`,
			fix: "Import `defineHandler` from `nuxt/server` alongside the helpers. See `https://nuxt.com/docs/4.x/getting-started/upgrade#moving-to-nuxtserver`.",
			docs: false
		},
		NUXT_E8016: {
			why: (p) => `\`defineHandler\` from \`nuxt/server\` accepts a handler function, but received ${p.received}. The object form is specific to h3.`,
			fix: "Pass the handler function directly, or import `defineEventHandler` from `h3` in this file to use the object form (`{ handler, onRequest, onBeforeResponse }`).",
			docs: false
		}
	}
});

function endIndex(str, min, len) {
	const index = str.indexOf(";", min);
	return index === -1 ? len : index;
}
function eqIndex(str, min, max) {
	const index = str.indexOf("=", min);
	return index < max ? index : -1;
}
function valueSlice(str, min, max) {
	if (min === max) return "";
	let start = min;
	let end = max;
	do {
		const code = str.charCodeAt(start);
		if (code !== 32 && code !== 9) break;
	} while (++start < end);
	while (end > start) {
		const code = str.charCodeAt(end - 1);
		if (code !== 32 && code !== 9) break;
		end--;
	}
	return str.slice(start, end);
}
const NullObject = /* @__PURE__ */ (() => {
	const C = function() {};
	C.prototype = Object.create(null);
	return C;
})();
function parse(str, options) {
	const obj = new NullObject();
	const len = str.length;
	if (len < 2) return obj;
	const dec = decode;
	let index = 0;
	do {
		const eqIdx = eqIndex(str, index, len);
		if (eqIdx === -1) break;
		const endIdx = endIndex(str, index, len);
		if (eqIdx > endIdx) {
			index = str.lastIndexOf(";", eqIdx - 1) + 1;
			continue;
		}
		const key = valueSlice(str, index, eqIdx);
		const val = dec(valueSlice(str, eqIdx + 1, endIdx));
		if (obj[key] === void 0) obj[key] = val;
		index = endIdx + 1;
	} while (index < len);
	return obj;
}
function decode(str) {
	if (!str.includes("%")) return str;
	try {
		return decodeURIComponent(str);
	} catch {
		return str;
	}
}

// src/server/fetch.ts
const DEFAULT_FORWARDED_HEADERS = ["cookie", "authorization"];
/** @internal */
function resolveServerFetchInit(event, init = {}) {
	const { forwardHeaders = true, ...requestInit } = init;
	const headers = new Headers(requestInit.headers);
	const names = forwardHeaders === true ? DEFAULT_FORWARDED_HEADERS : forwardHeaders || [];
	for (const name of names) {
		const value = event.req.headers.get(name);
		if (value !== null && !headers.has(name)) headers.set(name, value);
	}
	return {
		...requestInit,
		headers
	};
}

function callHooks(hooks, args, startIndex, task) {
	for (let i = startIndex; i < hooks.length; i += 1) try {
		const result = task ? task.run(() => hooks[i](...args)) : hooks[i](...args);
		if (result && typeof result.then === "function") return Promise.resolve(result).then(() => callHooks(hooks, args, i + 1, task));
	} catch (error) {
		return Promise.reject(error);
	}
}
var HookableCore = class {
	_hooks;
	constructor() {
		this._hooks = {};
	}
	hook(name, fn) {
		if (!name || typeof fn !== "function") return () => {};
		this._hooks[name] = this._hooks[name] || [];
		this._hooks[name].push(fn);
		return () => {
			if (fn) {
				this.removeHook(name, fn);
				fn = void 0;
			}
		};
	}
	removeHook(name, function_) {
		const hooks = this._hooks[name];
		if (hooks) {
			const index = hooks.indexOf(function_);
			if (index !== -1) hooks.splice(index, 1);
			if (hooks.length === 0) this._hooks[name] = void 0;
		}
	}
	callHook(name, ...args) {
		const hooks = this._hooks[name];
		if (!hooks || hooks.length === 0) return;
		return callHooks(hooks.slice(), args, 0);
	}
};

/**
* @see {@link import('nuxt/server').defineHandler}
*
* The handler is given the event in the portable shape, so that it can read
* `event.req`/`event.url`/`event.res` as the surface promises.
*/
function defineHandler(handler) {
	if (typeof handler !== "function") throw serverDiagnostics.NUXT_E8016({ received: handler === null ? "`null`" : `\`${typeof handler}\`` });
	return (event) => handler(toPortableEvent(event));
}
const defineEventHandler$1 = defineHandler;
/**
* @see {@link import('nuxt/server').createError}
*
* h3 v1 recognises an error of its own by the marker its constructor carries, so the error
* has to be one it made; `status`/`statusText` are the names it knows as
* `statusCode`/`statusMessage`.
*/
function createError$1(input) {
	if (typeof input === "string") return withSignature(createError$3(input));
	const { status, statusText, ...rest } = input;
	return withSignature(createError$3({
		...rest,
		...status === void 0 ? {} : { statusCode: status },
		...statusText === void 0 ? {} : {
			statusMessage: statusText,
			message: input.message ?? statusText
		}
	}));
}
/** Mark an h3 error as Nuxt's, so `isNuxtError()` recognises it either side of the wire. */
function withSignature(error) {
	if (!("__nuxt_error" in error)) Object.defineProperty(error, NUXT_ERROR_SIGNATURE, {
		value: true,
		configurable: false,
		writable: false
	});
	return withPortableStatus(error);
}
/**
* Read the status of an h3 v1 error under the names the portable surface promises.
*
* h3 v1 carries it as `statusCode`/`statusMessage`, and `NuxtErrorLike` declares
* `status`/`statusText`, so without this a handler that branches on `error.status` reads
* `undefined` here and a number on a server runtime built against h3 v2.
*/
function withPortableStatus(error) {
	const target = error;
	if (target.status === void 0 && target.statusCode !== void 0) Object.defineProperty(target, "status", {
		get: () => target.statusCode,
		configurable: true
	});
	if (target.statusText === void 0 && target.statusMessage !== void 0) Object.defineProperty(target, "statusText", {
		get: () => target.statusMessage,
		configurable: true
	});
	return target;
}
/** @see {@link import('nuxt/server').getRequestHeader} */
function getRequestHeader$1(event, name) {
	return getRequestHeader$2(event, name) || void 0;
}
/** @see {@link import('nuxt/server').getQuery} */
function getQuery(event) {
	return getQuery$1(event);
}
/**
* @see {@link import('nuxt/server').sendRedirect}
*
* h3 v1's own `sendRedirect` writes the response and resolves to nothing, where the
* portable surface sets the response and returns the body to respond with. The body is
* built here rather than taken from h3, so a handler that returns it behaves the same on
* every server runtime.
*/
function sendRedirect(event, location, status = 302) {
	setResponseStatus(event, status);
	setResponseHeader$1(event, "location", location);
	setResponseHeader$1(event, "content-type", "text/html");
	return `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${location.replace(REDIRECT_UNSAFE_RE, (char) => REDIRECT_ESCAPES[char])}"></head></html>`;
}
const REDIRECT_ESCAPES = {
	"\"": "%22",
	"'": "%27",
	"<": "%3C",
	">": "%3E",
	"&": "%26"
};
const REDIRECT_UNSAFE_RE = /["'<>&]/g;
/** @see {@link import('nuxt/server').getRouteRules} */
function getRouteRules(event) {
	return getRouteRules$1(event);
}
/** @see {@link import('nuxt/server').serverFetch} */
function serverFetch(event, path, init) {
	return useNitroApp().localFetch(joinURL(baseURL(), path), resolveServerFetchInit({ req: { headers: event.headers } }, init));
}
/** @see {@link import('nuxt/server').useRuntimeConfig} */
function useRuntimeConfig$1(event) {
	return useRuntimeConfig$2(event);
}

const SiteConfigPriority = {
  nitro: -4,
  runtime: 0
};

function toValue(source) {
  if (typeof source === "function")
    return source();
  if (source && source.__v_isRef === true)
    return source.value;
  return source;
}
const NUXT_SITE_PREFIX = "NUXT_SITE_";
const NUXT_PUBLIC_SITE_PREFIX = "NUXT_PUBLIC_SITE_";
function envSiteConfig(env = {}) {
  const config = {};
  for (const key of Object.keys(env)) {
    const prefixLength = key.startsWith(NUXT_SITE_PREFIX) ? NUXT_SITE_PREFIX.length : key.startsWith(NUXT_PUBLIC_SITE_PREFIX) ? NUXT_PUBLIC_SITE_PREFIX.length : 0;
    if (!prefixLength)
      continue;
    const segments = key.slice(prefixLength).split("_");
    let configKey = segments[0].toLowerCase();
    for (let i = 1; i < segments.length; i++) {
      const segment = segments[i];
      configKey += segment[0]?.toUpperCase() + segment.slice(1).toLowerCase();
    }
    config[configKey] = env[key];
  }
  return config;
}

function copyPlainData(value) {
  if (Array.isArray(value))
    return value.map(copyPlainData);
  if (!value || typeof value !== "object" || value.__v_isRef || value.__v_isReactive)
    return value;
  const proto = Object.getPrototypeOf(value);
  if (proto !== Object.prototype && proto !== null)
    return value;
  const copy = {};
  for (const key in value)
    copy[key] = copyPlainData(value[key]);
  return copy;
}
function normalizeSiteConfig(config) {
  if (typeof config.indexable !== "undefined")
    config.indexable = String(config.indexable) !== "false";
  else if (typeof config.env !== "undefined")
    config.indexable = config.env === "production";
  if (typeof config.trailingSlash !== "undefined")
    config.trailingSlash = String(config.trailingSlash) !== "false";
  if (config.url && !hasProtocol(String(config.url), { acceptRelative: true, strict: false }))
    config.url = withHttps(String(config.url));
  const keys = Object.keys(config).sort();
  const newConfig = {};
  for (const k of keys)
    newConfig[k] = config[k];
  return newConfig;
}
function createSiteConfigStack(options) {
  const debug = options?.debug || false;
  const stack = [];
  function push(input) {
    if (!input || typeof input !== "object" || Object.keys(input).length === 0) {
      return () => {
      };
    }
    const entry = {};
    for (const k in input) {
      const val = input[k];
      if (typeof val !== "undefined" && val !== "")
        entry[k] = copyPlainData(val);
    }
    if (!Object.keys(entry).some((k) => !k.startsWith("_"))) {
      return () => {
      };
    }
    if (!entry._context && debug) {
      let lastFunctionName = new Error("tmp").stack?.split("\n")[2]?.split(" ")[5];
      if (lastFunctionName?.includes("/"))
        lastFunctionName = "anonymous";
      entry._context = lastFunctionName;
    }
    stack.push(entry);
    return () => {
      const idx = stack.indexOf(entry);
      if (idx !== -1)
        stack.splice(idx, 1);
    };
  }
  function get(options2) {
    const siteConfig = {};
    if (options2?.debug)
      siteConfig._context = {};
    siteConfig._priority = {};
    for (const o in stack.sort((a, b) => (a._priority || 0) - (b._priority || 0))) {
      for (const k in stack[o]) {
        const key = k;
        const val = options2?.resolveRefs ? toValue(stack[o][k]) : stack[o][k];
        if (!k.startsWith("_") && typeof val !== "undefined" && val !== "") {
          siteConfig[k] = val;
          if (typeof stack[o]._priority !== "undefined" && stack[o]._priority !== -1) {
            siteConfig._priority[key] = stack[o]._priority;
          }
          if (options2?.debug)
            siteConfig._context[key] = stack[o]._context?.[key] || stack[o]._context || "anonymous";
        }
      }
    }
    return options2?.skipNormalize ? siteConfig : normalizeSiteConfig(siteConfig);
  }
  return {
    stack,
    push,
    get
  };
}

const PORT_SUFFIX_RE = /:\d+$/;
const serverEnvSiteConfigs = /* @__PURE__ */ new WeakMap();
function resolveServerEnvSiteConfig(event) {
  const { req } = event;
  const env = event.context.cloudflare?.env ?? req?.runtime?.cloudflare?.env ?? globalThis.__env__ ?? (typeof process === "undefined" ? void 0 : process.env);
  if (!env)
    return;
  let config = serverEnvSiteConfigs.get(env);
  if (!config) {
    config = envSiteConfig(env);
    serverEnvSiteConfigs.set(env, config);
  }
  return config;
}
async function initRequestSiteConfig(e, origin, routeRules) {
  if (e.context._initedSiteConfig)
    return;
  const runtimeConfig = useRuntimeConfig$1();
  const config = runtimeConfig["nuxt-site-config"];
  const nitroApp = useNitroApp();
  const siteConfig = e.context.siteConfig || createSiteConfigStack({
    debug: config.debug
  });
  const nitroOrigin = origin;
  e.context.siteConfigNitroOrigin = nitroOrigin;
  {
    siteConfig.push({
      _context: "nitro:init",
      _priority: SiteConfigPriority.nitro,
      url: nitroOrigin
    });
  }
  siteConfig.push({
    _context: "runtimeEnv",
    _priority: SiteConfigPriority.runtime,
    ...runtimeConfig.site || {},
    ...runtimeConfig.public.site || {},
    ...resolveServerEnvSiteConfig(e)
  });
  const buildStack = config.stack || [];
  buildStack.forEach((c) => siteConfig.push(c));
  if (routeRules.site) {
    siteConfig.push({
      _context: "route-rules",
      ...routeRules.site
    });
  }
  if (config.multiTenancy) {
    const host = parseURL(nitroOrigin).host?.replace(PORT_SUFFIX_RE, "") || "";
    const tenant = config.multiTenancy?.find((t) => t.hosts.includes(host));
    if (tenant) {
      siteConfig.push({
        _context: `multi-tenancy:${host}`,
        _priority: SiteConfigPriority.runtime,
        ...tenant.config
      });
    }
  }
  const ctx = { siteConfig, event: e };
  await nitroApp.hooks.callHook("site-config:init", ctx);
  e.context.siteConfig = ctx.siteConfig;
  e.context._initedSiteConfig = true;
}

const __NYOIuX0dIp3j0DR2CSDZPsB_InoqOVt7kf2d4MskrA = defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("request", (event) => {
    const path = withoutBase(event.path.split("?")[0] || "/", useRuntimeConfig$1().app.baseURL);
    return initRequestSiteConfig(event, getNitroOrigin$1({
      isDev: false,
      isPrerender: false,
      requestHost: getRequestHost(event, { xForwardedHost: true }),
      requestProtocol: getRequestProtocol(event, { xForwardedProto: true })
    }), matchRouteRules(path, event.method));
  });
});

const KNOWN_SEARCH_BOTS = [
  {
    pattern: "googlebot",
    name: "googlebot",
    secondaryPatterns: ["google.com/bot.html"]
  },
  {
    pattern: "bingbot",
    name: "bingbot",
    secondaryPatterns: ["msnbot"]
  },
  {
    pattern: "yandexbot",
    name: "yandexbot"
  },
  {
    pattern: "baiduspider",
    name: "baiduspider",
    secondaryPatterns: ["baidu.com"]
  },
  {
    pattern: "duckduckbot",
    name: "duckduckbot",
    secondaryPatterns: ["duckduckgo.com"]
  },
  {
    pattern: "slurp",
    name: "yahoo"
  },
  {
    pattern: "applebot",
    name: "applebot",
    secondaryPatterns: ["apple.com/go/applebot"]
  }
];
const SOCIAL_BOTS = [
  {
    pattern: "twitterbot",
    name: "twitter",
    secondaryPatterns: ["twitter"]
  },
  {
    pattern: "facebookexternalhit",
    name: "facebook",
    secondaryPatterns: ["facebook.com"]
  },
  {
    pattern: "linkedinbot",
    name: "linkedin",
    secondaryPatterns: ["linkedin"]
  },
  {
    pattern: "pinterestbot",
    name: "pinterest",
    secondaryPatterns: ["pinterest"]
  },
  {
    pattern: "discordbot",
    name: "discord",
    secondaryPatterns: ["discordapp"]
  }
];
const SEO_BOTS = [
  {
    pattern: "mj12bot",
    name: "majestic12",
    secondaryPatterns: ["majestic12.co.uk/bot"]
  },
  {
    pattern: "ahrefsbot",
    name: "ahrefs",
    secondaryPatterns: ["ahrefs.com"]
  },
  {
    pattern: "semrushbot",
    name: "semrush",
    secondaryPatterns: ["semrush.com/bot"]
  },
  {
    pattern: "screaming frog",
    name: "screaming-frog",
    secondaryPatterns: ["screamingfrog.co.uk"]
  },
  {
    pattern: "rogerbot",
    name: "moz"
  }
];
const AI_BOTS = [
  {
    pattern: "anthropic",
    name: "anthropic"
  },
  {
    pattern: "claude",
    name: "claude"
  },
  {
    pattern: "gptbot",
    name: "gpt",
    secondaryPatterns: ["openai.com"]
  },
  {
    pattern: "google-extended",
    name: "google-extended"
  },
  {
    pattern: "applebot-extended",
    name: "applebot-extended"
  },
  {
    pattern: "bytespider",
    name: "bytespider"
  },
  {
    pattern: "diffbot",
    name: "diffbot"
  },
  {
    pattern: "googlebot-news",
    name: "google-news"
  },
  {
    pattern: "cohere",
    name: "cohere",
    secondaryPatterns: ["cohere.com"]
  },
  {
    pattern: "ccbot",
    name: "commoncrawl",
    secondaryPatterns: ["commoncrawl.org"]
  },
  {
    pattern: "perplexitybot",
    name: "perplexity",
    secondaryPatterns: ["perplexity.ai"]
  }
];
const HTTP_TOOL_BOTS = [
  {
    pattern: "python-requests",
    name: "requests",
    secondaryPatterns: ["python"]
  },
  {
    pattern: "wget",
    name: "wget"
  },
  {
    pattern: "curl",
    name: "curl",
    secondaryPatterns: ["curl"]
  }
];
const SECURITY_SCANNING_BOTS = [
  {
    pattern: "zgrab",
    name: "zgrab"
  },
  {
    pattern: "masscan",
    name: "masscan"
  },
  {
    pattern: "nmap",
    name: "nmap",
    secondaryPatterns: ["insecure.org"]
  },
  {
    pattern: "nikto",
    name: "nikto"
  },
  {
    pattern: "wpscan",
    name: "wpscan"
  }
];
const SCRAPING_BOTS = [
  {
    pattern: "scrapy",
    name: "scrapy",
    secondaryPatterns: ["scrapy.org"]
  }
];
const AUTOMATION_BOTS = [
  {
    pattern: "phantomjs",
    name: "phantomjs"
  },
  {
    pattern: "headless",
    name: "headless-browser"
  },
  {
    pattern: "playwright",
    name: "playwright"
  },
  {
    pattern: "selenium",
    name: "selenium",
    secondaryPatterns: ["webdriver"]
  },
  {
    pattern: "puppeteer",
    name: "puppeteer",
    secondaryPatterns: ["headless"]
  }
];
const GENERIC_BOTS = [
  {
    pattern: "bot",
    name: "generic-bot"
  },
  {
    pattern: "spider",
    name: "generic-spider"
  },
  {
    pattern: "crawler",
    name: "generic-crawler"
  },
  {
    pattern: "scraper",
    name: "generic-scraper"
  }
];
const BOT_MAP = [
  {
    type: "search-engine",
    bots: KNOWN_SEARCH_BOTS,
    trusted: true
  },
  {
    type: "social",
    bots: SOCIAL_BOTS,
    trusted: true
  },
  {
    type: "seo",
    bots: SEO_BOTS,
    trusted: true
  },
  {
    type: "ai",
    bots: AI_BOTS,
    trusted: true
  },
  {
    type: "generic",
    bots: GENERIC_BOTS,
    trusted: false
  },
  {
    type: "automation",
    bots: AUTOMATION_BOTS,
    trusted: false
  },
  {
    type: "http-tool",
    bots: HTTP_TOOL_BOTS,
    trusted: false
  },
  {
    type: "security-scanner",
    bots: SECURITY_SCANNING_BOTS,
    trusted: false
  },
  {
    type: "scraping",
    bots: SCRAPING_BOTS,
    trusted: false
  }
];
const ROBOT_DIRECTIVE_VALUES = {
  // Standard directives
  enabled: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  disabled: "noindex, nofollow",
  index: "index",
  noindex: "noindex",
  follow: "follow",
  nofollow: "nofollow",
  none: "none",
  all: "all",
  // Non-standard directives (not part of official robots spec)
  noai: "noai",
  noimageai: "noimageai"
};
function formatMaxImagePreview(value) {
  return `max-image-preview:${value}`;
}
function formatMaxSnippet(value) {
  return `max-snippet:${value}`;
}
function formatMaxVideoPreview(value) {
  return `max-video-preview:${value}`;
}
function matches(pattern, path) {
  const pathLength = path.length;
  const patternLength = pattern.length;
  const matchingLengths = Array.from({ length: pathLength + 1 }).fill(0);
  let numMatchingLengths = 1;
  let p = 0;
  while (p < patternLength) {
    if (pattern[p] === "$" && p + 1 === patternLength) {
      return matchingLengths[numMatchingLengths - 1] === pathLength;
    }
    if (pattern[p] === "*") {
      numMatchingLengths = pathLength - matchingLengths[0] + 1;
      for (let i = 1; i < numMatchingLengths; i++) {
        matchingLengths[i] = matchingLengths[i - 1] + 1;
      }
    } else {
      let numMatches = 0;
      for (let i = 0; i < numMatchingLengths; i++) {
        const matchLength = matchingLengths[i];
        if (matchLength < pathLength && path[matchLength] === pattern[p]) {
          matchingLengths[numMatches++] = matchLength + 1;
        }
      }
      if (numMatches === 0) {
        return false;
      }
      numMatchingLengths = numMatches;
    }
    p++;
  }
  return true;
}
function matchPathToRule(path, _rules) {
  let matchedRule = null;
  const rules = _rules.filter(Boolean);
  const rulesLength = rules.length;
  let i = 0;
  while (i < rulesLength) {
    const rule = rules[i];
    if (!rule || !matches(rule.pattern, path)) {
      i++;
      continue;
    }
    if (!matchedRule || rule.pattern.length > matchedRule.pattern.length) {
      matchedRule = rule;
    } else if (rule.pattern.length === matchedRule.pattern.length && rule.allow && !matchedRule.allow) {
      matchedRule = rule;
    }
    i++;
  }
  return matchedRule;
}
function asArray(v) {
  return typeof v === "undefined" ? [] : Array.isArray(v) ? v : [v];
}
function contentUsageToString(prefs) {
  return Object.entries(prefs).filter(([_, value]) => value !== void 0).map(([key, value]) => `${key}=${value}`).join(", ");
}
function normalizeContentPreferences(value) {
  if (!value)
    return [];
  if (Array.isArray(value))
    return value.filter((rule) => Boolean(rule));
  if (typeof value === "object" && !Array.isArray(value)) {
    const str = contentUsageToString(value);
    return str ? [str] : [];
  }
  if (typeof value === "string")
    return value ? [value] : [];
  return [];
}
function normalizeGroup(group) {
  if (group._normalized) {
    const resolvedGroup = group;
    const disallow2 = asArray(resolvedGroup.disallow);
    resolvedGroup._indexable = !disallow2.includes("/");
    resolvedGroup._rules = [
      ...resolvedGroup.disallow.filter(Boolean).map((r) => ({ pattern: r, allow: false })),
      ...resolvedGroup.allow.map((r) => ({ pattern: r, allow: true }))
    ];
    return resolvedGroup;
  }
  const disallow = asArray(group.disallow);
  const allow = asArray(group.allow).filter((rule) => Boolean(rule));
  const contentUsage = normalizeContentPreferences(group.contentUsage);
  const contentSignal = normalizeContentPreferences(group.contentSignal);
  return {
    ...group,
    comment: asArray(group.comment),
    userAgent: group.userAgent ? asArray(group.userAgent) : ["*"],
    disallow,
    allow,
    contentUsage,
    contentSignal,
    _indexable: !disallow.includes("/"),
    _rules: [
      ...disallow.filter(Boolean).map((r) => ({ pattern: r, allow: false })),
      ...allow.map((r) => ({ pattern: r, allow: true }))
    ],
    _normalized: true
  };
}
function generateRobotsTxt({ groups, sitemaps }) {
  const lines = [];
  for (const group of groups) {
    for (const comment of group.comment || [])
      lines.push(`# ${comment}`);
    for (const userAgent of group.userAgent || ["*"])
      lines.push(`User-agent: ${userAgent}`);
    for (const allow of group.allow || [])
      lines.push(`Allow: ${allow}`);
    for (const disallow of group.disallow || [])
      lines.push(`Disallow: ${disallow}`);
    for (const cleanParam of group.cleanParam || [])
      lines.push(`Clean-param: ${cleanParam}`);
    for (const contentUsage of group.contentUsage || [])
      lines.push(`Content-Usage: ${contentUsage}`);
    for (const contentSignal of group.contentSignal || [])
      lines.push(`Content-Signal: ${contentSignal}`);
    lines.push("");
  }
  for (const sitemap of sitemaps)
    lines.push(`Sitemap: ${sitemap}`);
  return lines.join("\n");
}
function createPatternMap() {
  const patternMap = /* @__PURE__ */ new Map();
  for (const def of BOT_MAP) {
    for (const bot of def.bots) {
      const patterns = [bot.pattern, ...bot.secondaryPatterns || []];
      for (const pattern of patterns) {
        patternMap.set(pattern.toLowerCase(), {
          botName: bot.name,
          botCategory: def.type,
          trusted: def.trusted
        });
      }
    }
  }
  return patternMap;
}
function robotsDirectivesFromObject(obj) {
  const directives = [];
  for (const [key, value] of Object.entries(obj)) {
    if (value === false || value === null || value === void 0)
      continue;
    if (key in ROBOT_DIRECTIVE_VALUES && typeof value === "boolean" && value) {
      directives.push(ROBOT_DIRECTIVE_VALUES[key]);
    } else if (key === "max-image-preview" && typeof value === "string") {
      directives.push(formatMaxImagePreview(value));
    } else if (key === "max-snippet" && typeof value === "number") {
      directives.push(formatMaxSnippet(value));
    } else if (key === "max-video-preview" && typeof value === "number") {
      directives.push(formatMaxVideoPreview(value));
    }
  }
  return directives;
}
function isNoIndexRule(rule) {
  return rule.split(",").some((part) => ["noindex", "none"].includes(part.trim()));
}
function normaliseRobotsRouteRule(config) {
  if (!config)
    return void 0;
  let allow;
  if (typeof config.robots === "boolean")
    allow = config.robots;
  else if (typeof config.robots === "object" && config.robots !== null && "indexable" in config.robots && typeof config.robots.indexable !== "undefined")
    allow = config.robots.indexable;
  let rule;
  if (typeof config.robots === "object" && config.robots !== null) {
    if ("rule" in config.robots && typeof config.robots.rule !== "undefined") {
      rule = config.robots.rule;
    } else if (!("indexable" in config.robots)) {
      const directives = robotsDirectivesFromObject(config.robots);
      if (directives.length > 0) {
        rule = directives.join(", ");
      }
    }
  } else if (typeof config.robots === "string") {
    rule = config.robots;
  }
  if (rule && typeof allow === "undefined") {
    const disallowIndicators = ["none", "noindex"];
    allow = !disallowIndicators.some(
      (indicator) => rule === indicator || rule.split(",").some((part) => part.trim() === indicator)
    );
  }
  if (typeof allow === "undefined" && typeof rule === "undefined")
    return;
  return {
    allow,
    rule
  };
}

function useRuntimeConfigNuxtRobots(_event) {
  return useRuntimeConfig$1()["nuxt-robots"];
}

async function resolveRobotsTxtContext(e, nitro = useNitroApp()) {
  const { groups, sitemap: sitemaps } = useRuntimeConfigNuxtRobots();
  const generateRobotsTxtCtx = {
    event: e,
    context: e ? "robots.txt" : "init",
    errors: [],
    warnings: [],
    ...JSON.parse(JSON.stringify({ groups, sitemaps }))
  };
  await nitro.hooks.callHook("robots:config", generateRobotsTxtCtx);
  generateRobotsTxtCtx.groups = generateRobotsTxtCtx.groups.map(normalizeGroup);
  if (!e)
    nitro._robots.ctx = generateRobotsTxtCtx;
  return generateRobotsTxtCtx;
}

const _gVRjdwJ6IZMSVEspX0JIBTLtxvWCX4M4eTdkn5PtXbI = defineNitroPlugin(async (nitroApp) => {
  const { robotsDisabledValue, botDetection } = useRuntimeConfigNuxtRobots();
  if (botDetection !== false) {
    nitroApp._robotsPatternMap = createPatternMap();
  }
  nitroApp._robots = {};
  await resolveRobotsTxtContext(void 0, nitroApp);
});

const _wyrfzW6LTYbmIvl018GwLB_z5U45SY9FTGmbET4Q = defineNitroPlugin((nitro) => {
  nitro.hooks.hook("beforeResponse", (event) => {
    const { contentSignalHeader } = useRuntimeConfigNuxtRobots();
    if (contentSignalHeader && getResponseHeader(event, "content-signal") === void 0)
      setHeader(event, "Content-Signal", contentSignalHeader);
  });
});

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
const unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
const reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
const escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
const objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  const counts = /* @__PURE__ */ new Map();
  let logNum = 0;
  function log(message) {
    if (logNum < 100) {
      console.warn(message);
      logNum += 1;
    }
  }
  function walk(thing) {
    if (typeof thing === "function") {
      log(`Cannot stringify a function ${thing.name}`);
      return;
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      const type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          const proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            if (typeof thing.toJSON !== "function") {
              log(`Cannot stringify arbitrary non-POJOs ${thing.constructor.name}`);
            }
          } else if (Object.getOwnPropertySymbols(thing).length > 0) {
            log(`Cannot stringify POJOs with symbolic keys ${Object.getOwnPropertySymbols(thing).map((symbol) => symbol.toString())}`);
          } else {
            Object.keys(thing).forEach((key) => walk(thing[key]));
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    const type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify(thing.valueOf())})`;
      case "RegExp":
        return thing.toString();
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = thing.map((v, i) => i in thing ? stringify(v) : "");
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify).join(",")}])`;
      default:
        if (thing.toJSON) {
          let json = thing.toJSON();
          if (getType(json) === "String") {
            try {
              json = JSON.parse(json);
            } catch (e) {
            }
          }
          return stringify(json);
        }
        if (Object.getPrototypeOf(thing) === null) {
          if (Object.keys(thing).length === 0) {
            return "Object.create(null)";
          }
          return `Object.create(null,{${Object.keys(thing).map((key) => `${safeKey(key)}:{writable:true,enumerable:true,value:${stringify(thing[key])}}`).join(",")}})`;
        }
        return `{${Object.keys(thing).map((key) => `${safeKey(key)}:${stringify(thing[key])}`).join(",")}}`;
    }
  }
  const str = stringify(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (isPrimitive(thing)) {
        values.push(stringifyPrimitive(thing));
        return;
      }
      const type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name}[${i}]=${stringify(v)}`);
          });
          break;
        case "Set":
          values.push("new Set");
          statements.push(`${name}.${Array.from(thing).map((v) => `add(${stringify(v)})`).join(".")}`);
          break;
        case "Map":
          values.push("new Map");
          statements.push(`${name}.${Array.from(thing).map(([k, v]) => `set(${stringify(k)}, ${stringify(v)})`).join(".")}`);
          break;
        default:
          values.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach((key) => {
            statements.push(`${name}${safeProp(key)}=${stringify(thing[key])}`);
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(";")}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function getName(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string") {
    return stringifyString(thing);
  }
  if (thing === void 0) {
    return "void 0";
  }
  if (thing === 0 && 1 / thing < 0) {
    return "-0";
  }
  const str = String(thing);
  if (typeof thing === "number") {
    return str.replace(/^(-)?0\./, "$1.");
  }
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? `.${key}` : `[${escapeUnsafeChars(JSON.stringify(key))}]`;
}
function stringifyString(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}

const NUXT_SITE_CONFIG_SSR_DEFAULT = true;

function getSiteRouteRules(event) {
  const routeRules = getRouteRules(event);
  return { site: routeRules.site, ssr: routeRules.ssr ?? NUXT_SITE_CONFIG_SSR_DEFAULT };
}

function getSiteConfig(e, _options) {
  e.context.siteConfig = e.context.siteConfig || createSiteConfigStack();
  const options = defu(_options, useRuntimeConfig$1()["nuxt-site-config"], { debug: false });
  return e.context.siteConfig.get(options);
}

const _n5qT0eLcPEF6eFvn0ZFskzXFjVIxP0gRFeF8x4_vQPI = defineNitroPlugin(async (nitroApp) => {
  nitroApp.hooks.hook("render:html", async (ctx, { event }) => {
    const routeOptions = getSiteRouteRules(event);
    const isIsland = process.env.NUXT_COMPONENT_ISLANDS && event.path.startsWith("/__nuxt_island");
    event.path;
    const noSSR = !!process.env.NUXT_NO_SSR || event.context.nuxt?.noSSR || routeOptions.ssr === false && !isIsland || (false);
    if (noSSR) {
      const siteConfig = Object.fromEntries(
        Object.entries(getSiteConfig(event)).map(([k, v]) => [k, toValue(v)])
      );
      ctx.body.push(`<script>window.__NUXT_SITE_CONFIG__=${devalue(siteConfig)}<\/script>`);
    }
  });
});

function definePlugin(setup) {
  return defineNitroPlugin((nitro) => setup({
    onRequest: (fn) => nitro.hooks.hook("request", fn),
    onAfterResponse: (fn) => nitro.hooks.hook("afterResponse", fn),
    onBeforeRender: (fn) => nitro.hooks.hook("render:before", async (context) => {
      const redirect = await fn(context.event);
      if (redirect) {
        context.response = createRedirectResponse(context.event, redirect.location, redirect.status);
      }
    }),
    onRenderHTML: (fn) => nitro.hooks.hook("render:html", (html, { event }) => fn(html, event))
  }));
}
function createRedirectResponse(event, dest, code) {
  event.node.res.setHeader("location", dest);
  event.node.res.statusCode = sanitizeStatusCode(code, event.node.res.statusCode);
  return {
    headers: event.node.res.getHeaders(),
    statusCode: event.node.res.statusCode,
    body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${dest.replace(/"/g, "%22")}"></head></html>`
  };
}
const useRuntimeConfig = (event) => useRuntimeConfig$2(event);
const useStorage = (base) => useStorage$1(base);
const I18N_HANDLER_CACHE_PREFIX = "nitro:handlers:i18n";
const defineEventHandler = (handler) => defineEventHandler$2(handler);
const defineCachedHandler = (handler, options) => defineCachedEventHandler(handler, options);
const getRouterParam = (event, name) => getRouterParam$1(event, name);
const createError = (input) => createError$3(input);
const getRequestURL = (event) => getRequestURL$1(event, { xForwardedHost: true });
const getRenderPath = (event) => event.path;
const setCookie = (event, name, value, options) => setCookie$1(event, name, value, options);
const setResponseHeader = (event, name, value) => setResponseHeader$1(event, name, value);

/*!
  * shared v11.4.24
  * (c) 2026 kazuya kawaguchi
  * Released under the MIT License.
  */
/**
 * Original Utilities
 * written by kazuya kawaguchi
 */
const _create = Object.create;
const create = (obj = null) => _create(obj);
/**
 * Useful Utilities By Evan you
 * Modified by kazuya kawaguchi
 * MIT License
 * https://github.com/vuejs/vue-next/blob/master/packages/shared/src/index.ts
 * https://github.com/vuejs/vue-next/blob/master/packages/shared/src/codeframe.ts
 */
const isArray = Array.isArray;
const isFunction = (val) => typeof val === 'function';
const isString = (val) => typeof val === 'string';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isObject = (val) => val !== null && typeof val === 'object';
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);

const isNotObjectOrIsArray = (val) => !isObject(val) || isArray(val);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepCopy(src, des) {
    // src and des should both be objects, and none of them can be a array.
    // des can't be `Object.prototype` either: copying into it would pollute
    // every object
    if (isNotObjectOrIsArray(src) ||
        isNotObjectOrIsArray(des) ||
        des === Object.prototype) {
        throw new Error('Invalid value');
    }
    const stack = [{ src, des }];
    while (stack.length) {
        const { src, des } = stack.pop();
        // using `Object.keys` which skips prototype properties
        Object.keys(src).forEach(key => {
            if (key === '__proto__') {
                return;
            }
            const value = src[key];
            if (isArray(value)) {
                // replace arrays instead of merging them, without retaining source references
                const copied = [];
                copied.length = value.length;
                des[key] = copied;
                stack.push({ src: value, des: copied });
            }
            else if (isObject(value)) {
                if (!isObject(des[key]) || isArray(des[key])) {
                    des[key] = create();
                }
                stack.push({ src: value, des: des[key] });
            }
            else {
                des[key] = value;
            }
        });
    }
}

const __nuxtMock = { runWithContext: async (fn) => await fn() };
const merger = createDefu((obj, key, value) => {
  if (key === "messages" || key === "datetimeFormats" || key === "numberFormats") {
    obj[key] ??= create(null);
    deepCopy(value, obj[key]);
    return true;
  }
});
async function loadVueI18nOptions(vueI18nConfigs) {
  const nuxtApp = __nuxtMock;
  let vueI18nOptions = { messages: create(null) };
  for (const configFile of vueI18nConfigs) {
    const resolver = await configFile().then((x) => isModule(x) ? x.default : x);
    const resolved = isFunction(resolver) ? await nuxtApp.runWithContext(() => resolver()) : resolver;
    vueI18nOptions = merger(create(null), resolved, vueI18nOptions);
  }
  vueI18nOptions.fallbackLocale ??= false;
  return vueI18nOptions;
}
const isModule = (val) => toTypeString(val) === "[object Module]";
async function getLocaleMessages(locale, loader) {
  const nuxtApp = __nuxtMock;
  try {
    const getter = await nuxtApp.runWithContext(loader.load).then((x) => isModule(x) ? x.default : x);
    return isFunction(getter) ? await nuxtApp.runWithContext(() => getter(locale)) : getter;
  } catch (e) {
    throw new Error(`Failed loading locale (${locale}): ` + e.message, { cause: e });
  }
}
async function getLocaleMessagesMerged(locale, loaders = []) {
  const nuxtApp = __nuxtMock;
  const messages = await Promise.all(
    loaders.map((loader) => nuxtApp.runWithContext(() => getLocaleMessages(locale, loader)))
  );
  const merged = {};
  for (const message of messages) {
    deepCopy(message, merged);
  }
  return merged;
}

const parsed = /* @__PURE__ */ new Map();
function readI18nAsset(key) {
  if (!parsed.has(key)) {
    const promise = useStorage("assets/i18n").getItemRaw(key).then((raw) => {
      if (raw == null) {
        throw new Error(`Missing messages asset '${key}' - the server build may be stale, try rebuilding.`);
      }
      return JSON.parse(typeof raw === "string" ? raw : new TextDecoder().decode(raw));
    });
    parsed.set(key, promise);
    promise.catch(() => parsed.delete(key));
  }
  return parsed.get(key);
}

// @ts-nocheck
const localeCodes =  [
  "fr",
  "en"
];
const localeLoaders = {
  fr: [
    {
      key: "locale_fr_46json_11a0e9c5",
      load: () => readI18nAsset("11a0e9c5.json"),
      cache: true
    }
  ],
  en: [
    {
      key: "locale_en_46json_dd194427",
      load: () => readI18nAsset("dd194427.json"),
      cache: true
    }
  ]
};
const vueI18nConfigs = [];
const normalizedLocales = [
  {
    code: "fr",
    language: "fr-FR",
    name: "Français",
    domains: [],
    defaultForDomains: []
  },
  {
    code: "en",
    language: "en-US",
    name: "English",
    domains: [],
    defaultForDomains: []
  }
];

const setupVueI18nOptions = async (defaultLocale) => {
  const options = await loadVueI18nOptions(vueI18nConfigs);
  options.locale = defaultLocale || options.locale || "en-US";
  options.defaultLocale = defaultLocale;
  options.fallbackLocale ??= false;
  options.messages ??= {};
  for (const locale of localeCodes) {
    options.messages[locale] ??= {};
  }
  return options;
};

const normalizeDomain = (domain = "") => domain.replace(/^https?:\/\//i, "").toLowerCase();
function isLocaleOnHost(locale, host) {
  return !!locale?.domains.some((x) => normalizeDomain(x) === host);
}
function resolveLocaleReach(locales, host, locale) {
  const target = locales.find((l) => l.code === locale);
  if (!target?.domains.length || isLocaleOnHost(target, host)) {
    return "here";
  }
  return locales.some((l) => isLocaleOnHost(l, host)) ? "other-domain" : "off-host";
}
function isLocaleServedOnHost(locales, host, locale) {
  return resolveLocaleReach(locales, host, locale) !== "other-domain";
}
function matchDomainLocale(locales, host, pathLocale) {
  const matches = locales.filter((locale) => isLocaleOnHost(locale, host));
  return (
    // match by current path locale
    (matches.find((l) => l.code === pathLocale) || matches.find((l) => l.defaultForDomains.some((domain) => normalizeDomain(domain) === host)) || matches[0])?.code
  );
}
function cookieSpansDomains(locales, cookieDomain) {
  const scope = cookieDomain.replace(/^\./, "").replace(/:\d+$/, "").toLowerCase();
  return locales.every(
    (l) => l.domains.concat(l.domain || []).every((domain) => {
      const host = normalizeDomain(domain).replace(/:\d+$/, "");
      return host === scope || host.endsWith("." + scope);
    })
  );
}
function withRuntimeDomain(locale, domainLocales) {
  if (typeof locale === "string") {
    return locale;
  }
  const properties = locale;
  const domain = domainLocales[properties.code]?.domain;
  if (!domain || domain === properties.domain) {
    return locale;
  }
  return {
    ...properties,
    domain,
    domains: [domain],
    // a `domainDefault` configured without a domain is the default of the one it is given here (#4190)
    defaultForDomains: properties.defaultForDomains.length || properties.domainDefault ? [domain] : []
  };
}
const getDomainLocales = (domainLocales) => normalizedLocales.map((locale) => withRuntimeDomain(locale, domainLocales));

function createLocaleConfigs(fallbackLocale) {
  const localeConfigs = {};
  for (const locale of localeCodes) {
    const fallbacks = getFallbackLocaleCodes(fallbackLocale, [locale]);
    const cacheable = isLocaleWithFallbacksCacheable(locale, fallbacks);
    localeConfigs[locale] = { fallbacks, cacheable };
  }
  return localeConfigs;
}
function getFallbackLocaleCodes(fallback, locales) {
  if (fallback === false) {
    return [];
  }
  if (isArray(fallback)) {
    return fallback;
  }
  let fallbackLocales = [];
  if (isString(fallback)) {
    if (locales.every((locale) => locale !== fallback)) {
      fallbackLocales.push(fallback);
    }
    return fallbackLocales;
  }
  const targets = [...locales, "default"];
  for (const locale of targets) {
    if (locale in fallback == false) {
      continue;
    }
    fallbackLocales = [...fallbackLocales, ...fallback[locale].filter(Boolean)];
  }
  return fallbackLocales;
}
function isLocaleCacheable(locale) {
  return localeLoaders[locale] != null && localeLoaders[locale].every((loader) => loader.cache !== false);
}
function isLocaleWithFallbacksCacheable(locale, fallbackLocales) {
  return isLocaleCacheable(locale) && fallbackLocales.every((fallbackLocale) => isLocaleCacheable(fallbackLocale));
}
function getDefaultLocaleForDomain(host, locales) {
  return locales.find((l) => l.defaultForDomains.some((domain) => normalizeDomain(domain) === host))?.code;
}
function resolveDefaultLocale(host, defaultLocale, locales) {
  const resolved = getDefaultLocaleForDomain(host, locales) || defaultLocale;
  if (resolved) {
    return resolved;
  }
  return (locales.some((l) => l.domains.length) ? locales[0]?.code : "") || "";
}
const isSupportedLocale = (locale) => localeCodes.includes(locale || "");

const storage = useStorage("i18n");
function deepFreeze(value) {
  if (value == null || typeof value !== "object" || Object.isFrozen(value)) {
    return value;
  }
  for (const key of Object.keys(value)) {
    deepFreeze(value[key]);
  }
  return Object.freeze(value);
}
function cachedFunctionI18n(fn, opts) {
  opts = { maxAge: 1, ...opts };
  const pending = {};
  async function get(key, resolver) {
    const isPending = pending[key];
    if (!isPending) {
      pending[key] = Promise.resolve(resolver());
    }
    try {
      return await pending[key];
    } finally {
      delete pending[key];
    }
  }
  return async (...args) => {
    const key = [opts.name, opts.getKey(...args)].join(":").replace(/:\/$/, ":index");
    const maxAge = opts.maxAge ?? 1;
    const isCacheable = !opts.shouldBypassCache(...args) && maxAge >= 0;
    const cache = isCacheable && await storage.getItemRaw(key);
    if (!cache || cache.ttl < Date.now()) {
      pending[key] = Promise.resolve(fn(...args));
      const value = await get(key, () => fn(...args));
      if (isCacheable) {
        deepFreeze(value);
        await storage.setItemRaw(key, { ttl: Date.now() + maxAge * 1e3, value, mtime: Date.now() });
      }
      return value;
    }
    return cache.value;
  };
}

const _getMessages = async (locale) => {
  return { [locale]: await getLocaleMessagesMerged(locale, localeLoaders[locale]) };
};
const _getMessagesCached = cachedFunctionI18n(_getMessages, {
  name: "messages",
  maxAge: 60 * 60 * 24,
  getKey: (locale) => locale,
  shouldBypassCache: (locale) => !isLocaleCacheable(locale)
});
const getMessages = _getMessagesCached;
function appContextHint(e) {
  if (!/ is not defined|Nuxt instance unavailable/.test(e.message)) {
    return "";
  }
  return ". Locale loaders run outside the Nuxt app when the server produces messages, so Nuxt app composables (`useNuxtApp`, `useState`, `useCookie`, ...) are unavailable - call them in the locale file itself to have the build keep that locale in the app instead.";
}
const _getMergedMessages = async (locale, fallbackLocales) => {
  try {
    if (fallbackLocales.length === 0) {
      return await getMessages(locale) ?? {};
    }
    const merged = {};
    const messages = await Promise.all(fallbackLocales.map(getMessages));
    for (const message of messages) {
      deepCopy(message, merged);
    }
    deepCopy(await getMessages(locale), merged);
    return merged;
  } catch (e) {
    throw new Error("Failed to merge messages: " + e.message + appContextHint(e), { cause: e });
  }
};
const getMergedMessages = cachedFunctionI18n(_getMergedMessages, {
  name: "merged-single",
  maxAge: 60 * 60 * 24,
  getKey: (locale, fallbackLocales) => `${locale}-[${[...new Set(fallbackLocales)].sort().join("-")}]`,
  shouldBypassCache: (locale, fallbackLocales) => !isLocaleWithFallbacksCacheable(locale, fallbackLocales)
});

function tryUseI18nContext(event) {
  return event.context.nuxtI18n;
}
async function initializeI18nContext(event) {
  const runtimeI18n = useRuntimeConfig(event).public.i18n;
  const defaultLocale = runtimeI18n.defaultLocale || "";
  const options = await setupVueI18nOptions(
    resolveDefaultLocale(getRequestURL(event).host, defaultLocale, getDomainLocales(runtimeI18n.domainLocales))
  );
  const localeConfigs = createLocaleConfigs(options.fallbackLocale);
  const ctx = createI18nContext();
  ctx.vueI18nOptions = options;
  ctx.localeConfigs = localeConfigs;
  event.context.nuxtI18n = ctx;
  return ctx;
}
function createI18nContext() {
  return {
    messages: {},
    slp: {},
    localeConfigs: {},
    trackMap: {},
    vueI18nOptions: void 0,
    trackKey(key, locale) {
      this.trackMap[locale] ??= /* @__PURE__ */ new Set();
      this.trackMap[locale].add(key);
    },
    async loadMessages(locale) {
      return await getMergedMessages(locale, this.localeConfigs?.[locale]?.fallbacks ?? []) ?? {};
    }
  };
}

function useI18nDetection(runtimeI18n) {
  const detectBrowserLanguage = runtimeI18n.detectBrowserLanguage;
  const detect = detectBrowserLanguage || {};
  return {
    ...detect,
    enabled: !!detectBrowserLanguage,
    cookieKey: detect.cookieKey || "i18n_redirected"
  };
}
function resolveRootRedirect(config) {
  if (!config) {
    return void 0;
  }
  return {
    path: "/" + (isString(config) ? config : config.path).replace(/^\//, ""),
    code: !isString(config) && config.statusCode || 302
  };
}

function parseAcceptLanguage(value) {
  return value.split(",").map((tag) => tag.split(";")[0]).filter(
    (tag) => !(tag === "*" || tag === "")
  );
}
function createPathIndexLanguageParser(index = 0) {
  return (path) => {
    const rawPath = typeof path === "string" ? path : path.pathname;
    const normalizedPath = rawPath.split("?")[0];
    const parts = normalizedPath.split("/");
    if (parts[0] === "") {
      parts.shift();
    }
    return parts.length > index ? parts[index] || "" : "";
  };
}

const separator = "___";
const createTrailingSlashFormatter = (trailingSlash) => trailingSlash ? withTrailingSlash : withoutTrailingSlash;
function prefixable(currentLocale, defaultLocale, options) {
  return (currentLocale !== defaultLocale || options.strategy === "prefix");
}
const pathLanguageParser = createPathIndexLanguageParser(0);
const getLocaleFromRoutePath = (path) => pathLanguageParser(path);
const getLocaleFromRouteName = (name) => name.split(separator).at(1) ?? "";
function normalizeInput(input) {
  return typeof input !== "object" ? String(input) : String(input?.name || input?.path || "");
}
function getLocaleFromRoute(route) {
  const input = normalizeInput(route);
  if (input[0] === "/") {
    return getLocaleFromRoutePath(input);
  }
  const fromName = getLocaleFromRouteName(input);
  if (fromName) {
    return fromName;
  }
  if (typeof route === "object" && route?.path) {
    return getLocaleFromRoutePath(String(route.path));
  }
  return "";
}

function matchBrowserLocale(locales, browserLocales) {
  const matchedLocales = [];
  for (const [index, browserCode] of browserLocales.entries()) {
    const matchedLocale = locales.find((l) => l.language?.toLowerCase() === browserCode.toLowerCase());
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 1 - index / browserLocales.length });
      break;
    }
  }
  for (const [index, browserCode] of browserLocales.entries()) {
    const languageCode = browserCode.split("-")[0].toLowerCase();
    const matchedLocale = locales.find((l) => l.language?.split("-")[0].toLowerCase() === languageCode);
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 0.999 - index / browserLocales.length });
      break;
    }
  }
  return matchedLocales;
}
function compareBrowserLocale(a, b) {
  if (a.score === b.score) {
    return b.code.length - a.code.length;
  }
  return b.score - a.score;
}
function findBrowserLocale(locales, browserLocales) {
  const matchedLocales = matchBrowserLocale(
    locales.map((l) => ({ code: l.code, language: l.language || l.code })),
    browserLocales
  );
  return matchedLocales.sort(compareBrowserLocale).at(0)?.code ?? "";
}

function getRequestHeaders(event) {
  const req = event.req;
  return typeof req?.headers?.get === "function" ? req.headers : event.headers;
}
function getRequestHeader(event, name) {
  return getRequestHeaders(event).get(name) ?? void 0;
}
function getRequestCookie(event, name) {
  return parse(getRequestHeader(event, "cookie") || "")[name];
}

const getCookieLocale = (event, cookieName) => (getRequestCookie(event, cookieName)) || void 0;
const getRouteLocale = (event, route) => getLocaleFromRoute(route);
const getHeaderLocale = (event) => findBrowserLocale(normalizedLocales, parseAcceptLanguage(getRequestHeader(event, "accept-language") || ""));
const getRefererHost = (event) => {
  const referer = getRequestHeader(event, "referer");
  try {
    return referer && new URL(referer).host || void 0;
  } catch {
    return void 0;
  }
};
const useDetectors = (event, config, runtimeI18n, host) => {
  if (!event) {
    throw new Error("A request event is required for server-side locale detection");
  }
  let locales;
  const getLocales = () => locales ??= getDomainLocales(runtimeI18n.domainLocales);
  return {
    cookie: () => getCookieLocale(event, config.cookieKey),
    header: () => getHeaderLocale(event) ,
    navigator: () => void 0,
    host: (path) => matchDomainLocale(getLocales(), host, getLocaleFromRoutePath(path)),
    route: (path) => getRouteLocale(event, path),
    /** Passes the locale through when the current host serves it, `undefined` otherwise */
    onHost: (locale) => !locale || isLocaleServedOnHost(getLocales(), host, locale) ? locale : void 0,
    /** Whether the visitor arrived from one of the configured domains */
    fromOwnDomain: () => {
      const referer = getRefererHost(event);
      return !!referer && getLocales().some((l) => isLocaleOnHost(l, referer));
    },
    /** Whether a cookie scoped to the configured `cookieDomain` is readable on every domain */
    cookieSpans: () => !!config.cookieDomain && cookieSpansDomains(getLocales(), config.cookieDomain)
  };
};
function createLocaleDetector(config) {
  const { detection} = config;
  const isSupported = config.isSupportedLocale ?? isSupportedLocale;
  function skipDetect(path, pathLocale) {
    if (detection.redirectOn === "root" && path !== "/") {
      return true;
    }
    if (detection.redirectOn === "no prefix" && !detection.alwaysRedirect && isSupported(pathLocale)) {
      return true;
    }
    return false;
  }
  return function detectLocale(detectors, route, initial) {
    const path = isString(route) ? parsePath(route).pathname : route.path;
    const pass = (locale) => locale;
    const onHost = pass;
    function* detect() {
      const detecting = initial && detection.enabled && !skipDetect(path, detectors.route(path));
      if (detecting) {
        const cookie = onHost;
        const browser = onHost;
        yield cookie(detectors.cookie());
        yield browser(detectors.header());
        yield browser(detectors.navigator());
      }
      {
        yield detectors.route(route);
      }
      if (detecting) {
        yield onHost(detection.fallbackLocale);
      }
    }
    for (const detected of detect()) {
      if (detected && isSupported(detected)) {
        return detected;
      }
    }
    return "";
  };
}

// Generated by @nuxtjs/i18n
const localizedPaths = [
  "/play/:id?",
  "/admin",
  "/create",
  "/gallery",
  "/login",
  "/register",
  "/"
];
const pathToI18nConfig = {
  "/play/:id?": {
    "fr": "/jouer/:id?"
  },
  "/create": {
    "fr": "/creer"
  },
  "/gallery": {
    "fr": "/galerie"
  },
  "/login": {
    "fr": "/connexion"
  },
  "/profile": {
    "fr": "/compte",
    "en": "/account"
  },
  "/register": {
    "fr": "/inscription"
  }
};
const i18nPathToPath = {
  "/jouer/:id?": "/play/:id?",
  "/creer": "/create",
  "/galerie": "/gallery",
  "/connexion": "/login",
  "/compte": "/profile",
  "/account": "/profile",
  "/inscription": "/register"
};
const disabledPaths = [];

const emptyRoute = { path: "/", name: "", matched: [], params: {}, meta: {} };
function createPathMatcher(resources, config) {
  const matcher = createRouterMatcher([], {});
  for (const path of [...resources.localizedPaths, ...Object.keys(resources.i18nPathToPath)]) {
    matcher.addRoute({ path, component: () => "", meta: {} });
  }
  const disabledI18nMatcher = createRouterMatcher([], {});
  for (const path of resources.disabledPaths) {
    disabledI18nMatcher.addRoute({ path, component: () => "", meta: {} });
  }
  const formatTrailingSlash = createTrailingSlashFormatter(config.trailingSlash);
  const getI18nPathToI18nPath = (path, locale) => {
    if (!path || !locale) {
      return;
    }
    const plainPath = resources.i18nPathToPath[path] ?? path;
    const i18nConfig = resources.pathToI18nConfig[plainPath];
    if (i18nConfig == null || !(locale in i18nConfig)) {
      return plainPath;
    }
    return i18nConfig[locale] || void 0;
  };
  function isExistingNuxtRoute2(path) {
    if (path === "") {
      return;
    }
    if (path.endsWith("/__nuxt_error")) {
      return;
    }
    if (disabledI18nMatcher.resolve({ path }, emptyRoute).matched.length > 0) {
      return;
    }
    const resolvedMatch = matcher.resolve({ path }, emptyRoute);
    return resolvedMatch.matched.length > 0 ? resolvedMatch : void 0;
  }
  function matchLocalized2(path, locale, defaultLocale) {
    if (path === "") {
      return;
    }
    const parsed = parsePath(path);
    const resolvedMatch = matcher.resolve({ path: parsed.pathname || "/" }, emptyRoute);
    if (resolvedMatch.matched.length === 0) {
      return;
    }
    const alternate = getI18nPathToI18nPath(resolvedMatch.matched[0].path, locale);
    if (!alternate) {
      return;
    }
    const match = matcher.resolve({ params: resolvedMatch.params }, { ...emptyRoute, path: alternate });
    const isPrefixable = prefixable(locale, defaultLocale, config);
    return formatTrailingSlash(withLeadingSlash(joinURL(isPrefixable ? locale : "", match.path)), true);
  }
  return { isExistingNuxtRoute: isExistingNuxtRoute2, matchLocalized: matchLocalized2 };
}
const { isExistingNuxtRoute, matchLocalized } = createPathMatcher(
  { localizedPaths, i18nPathToPath, pathToI18nConfig, disabledPaths },
  { strategy: "prefix_except_default", trailingSlash: false }
);

function createRedirectResolver(config) {
  const { detection, rootRedirect, matchLocalized} = config;
  const isSupported = config.isSupportedLocale ?? isSupportedLocale;
  const detectLocale = createLocaleDetector({ detection, isSupportedLocale: isSupported});
  return function resolveRedirectPath(fullPath, path, pathLocale, defaultLocale, detectors, relocate) {
    let locale = detectLocale(detectors, fullPath, true) || defaultLocale;
    function getLocalizedMatch(locale2) {
      const res = matchLocalized(path || "/", locale2, defaultLocale);
      if (res && res !== fullPath) {
        return res;
      }
    }
    let resolvedPath = void 0;
    let redirectCode = 302;
    const pathname = parsePath(fullPath).pathname;
    if (rootRedirect && pathname === "/") {
      locale = detection.enabled && locale || defaultLocale;
      resolvedPath = isSupported(detectors.route(rootRedirect.path)) && rootRedirect.path || matchLocalized(rootRedirect.path, locale, defaultLocale);
      redirectCode = rootRedirect.code;
    } else if (config.redirectStatusCode) {
      redirectCode = config.redirectStatusCode;
    }
    switch (detection.redirectOn) {
      case "root":
        if (pathname !== "/") {
          break;
        }
      // fallthrough (root has no prefix)
      case "no prefix":
        if (pathLocale) {
          break;
        }
      // fallthrough to resolve
      case "all":
        resolvedPath ??= getLocalizedMatch(locale);
        break;
    }
    return { path: resolvedPath, code: redirectCode, locale };
  };
}

const _yl0uMsHBsnH5vsADNFQHPSDpWI6Pf0IPkn8wcAD6Z0I = definePlugin(async (hooks) => {
  const runtimeI18n = useRuntimeConfig().public.i18n;
  const rootRedirect = resolveRootRedirect(runtimeI18n.rootRedirect);
  runtimeI18n.defaultLocale || "";
  const detection = useI18nDetection(runtimeI18n);
  const cookieOptions = {
    path: "/",
    domain: detection.cookieDomain || void 0,
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: detection.cookieSecure
  };
  isFunction(runtimeI18n.baseUrl);
  const baseUrlGetter = (event) => {
    return "";
  };
  const resolveRedirectPath = createRedirectResolver({
    detection,
    rootRedirect,
    redirectStatusCode: runtimeI18n.redirectStatusCode,
    matchLocalized});
  hooks.onRequest(async (event) => {
    if (parsePath(getRenderPath(event)).pathname.includes("/__nuxt_island/")) {
      await initializeI18nContext(event);
    }
  });
  hooks.onBeforeRender(async (event) => {
    const ctx = tryUseI18nContext(event) || await initializeI18nContext(event);
    const renderPath = getRenderPath(event);
    const detector = useDetectors(event, detection, runtimeI18n, "");
    const localeSegment = detector.route(renderPath);
    const pathLocale = isSupportedLocale(localeSegment) && localeSegment || void 0;
    const { pathname, search } = parsePath(renderPath);
    const path = pathLocale ? pathname.slice(pathLocale.length + 1) || "/" : pathname;
    if (!pathname.includes("/_i18n") && !isExistingNuxtRoute(path)) {
      return;
    }
    const resolved = resolveRedirectPath(
      renderPath,
      path,
      pathLocale,
      ctx.vueI18nOptions.defaultLocale,
      detector);
    if (resolved.path && (resolved.origin || resolved.path !== pathname)) {
      ctx.detectLocale = resolved.locale;
      detection.useCookie && (!resolved.origin || detection.cookieDomain) && setCookie(event, detection.cookieKey, resolved.locale, cookieOptions);
      ctx.redirect = {
        // the resolved path is base-free (matched against base-free routes), re-add `app.baseURL`
        location: joinURL(
          resolved.origin || baseUrlGetter(),
          useRuntimeConfig(event).app.baseURL,
          resolved.path + search
        ),
        status: resolved.code
      };
      return ctx.redirect;
    }
  });
  hooks.onRenderHTML((htmlContext, event) => {
    tryUseI18nContext(event);
  });
  void clearHandlerCache();
});
async function clearHandlerCache() {
  try {
    const cacheStorage = useStorage("cache");
    const cachedKeys = await cacheStorage.getKeys(I18N_HANDLER_CACHE_PREFIX);
    await Promise.all(cachedKeys.map((key) => cacheStorage.removeItem(key)));
  } catch {
  }
}

function defineNitroPlugin(def) {
  return def;
}

const INLINE = /<(script|style)(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/\1>/g;
const sha256 = (content) => `'sha256-${createHash("sha256").update(content).digest("base64")}'`;
const _iaICyNs_fx_GW4aB7_cXOmHNU7lXFjcKsxtwdscXge8 = defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("render:html", (html, { event }) => {
    const scripts = /* @__PURE__ */ new Set();
    const styles = /* @__PURE__ */ new Set();
    const chunks = [...html.head, ...html.bodyPrepend, ...html.body, ...html.bodyAppend];
    for (const chunk of chunks) {
      for (const [, tag, attrs, content] of chunk.matchAll(INLINE)) {
        if (!(content == null ? void 0 : content.trim())) continue;
        if (tag === "script" && /type=["']application\/(ld\+)?json["']/.test(attrs != null ? attrs : "")) continue;
        (tag === "script" ? scripts : styles).add(sha256(content));
      }
    }
    setResponseHeader$1(
      event,
      "Content-Security-Policy",
      [
        "default-src 'self'",
        `script-src 'self' ${[...scripts].join(" ")}`.trim(),
        `style-src 'self' ${[...styles].join(" ")}`.trim(),
        // Attributs style="--cols: 10" posés par le rendu du plateau (variables CSS uniquement).
        "style-src-attr 'unsafe-inline'",
        "img-src 'self' data:",
        "media-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'"
      ].join("; ")
    );
  });
});

const plugins = [
  _KYySOrLdryRQS0QrNvUEuDNiSFOC0M_ufzRw21qSfI,
route_rules_default,
__NYOIuX0dIp3j0DR2CSDZPsB_InoqOVt7kf2d4MskrA,
_gVRjdwJ6IZMSVEspX0JIBTLtxvWCX4M4eTdkn5PtXbI,
_wyrfzW6LTYbmIvl018GwLB_z5U45SY9FTGmbET4Q,
_n5qT0eLcPEF6eFvn0ZFskzXFjVIxP0gRFeF8x4_vQPI,
_yl0uMsHBsnH5vsADNFQHPSDpWI6Pf0IPkn8wcAD6Z0I,
_iaICyNs_fx_GW4aB7_cXOmHNU7lXFjcKsxtwdscXge8
];

const assets = {
  "/_robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"27-UOAaLaYGRRGU2s45IciGSExKwT4\"",
    "mtime": "2026-11-26T07:51:25.847Z",
    "size": 39,
    "path": "../public/_robots.txt"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"3aee-MhSxHLXsQDpzfKWIWGQ9Upuf84s\"",
    "mtime": "2026-11-26T07:51:25.847Z",
    "size": 15086,
    "path": "../public/favicon.ico"
  },
  "/favicon.svg.br": {
    "type": "image/svg+xml",
    "encoding": "br",
    "etag": "\"78b-LdMBwcw1PKeCZGZo6jGjfFCUf/c\"",
    "mtime": "2026-11-26T07:51:25.865Z",
    "size": 1931,
    "path": "../public/favicon.svg.br"
  },
  "/favicon.svg": {
    "type": "image/svg+xml",
    "encoding": null,
    "etag": "\"1c8d-QomT4f3mqJviulM8eoH9RtB6qiA\"",
    "mtime": "2026-11-26T07:51:25.848Z",
    "size": 7309,
    "path": "../public/favicon.svg"
  },
  "/favicon.svg.gz": {
    "type": "image/svg+xml",
    "encoding": "gzip",
    "etag": "\"8f7-s+Jx++o0ppbANlRDEKYE0+ALk2Y\"",
    "mtime": "2026-11-26T07:51:25.853Z",
    "size": 2295,
    "path": "../public/favicon.svg.gz"
  },
  "/manifest.webmanifest": {
    "type": "application/manifest+json",
    "etag": "\"182-VNd/GNPCXkbmuiFxazcn8T5JepE\"",
    "mtime": "2026-11-26T07:51:25.848Z",
    "size": 386,
    "path": "../public/manifest.webmanifest"
  },
  "/_nuxt/BNAnzaV3.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"ae2-AAunuhNSPANH3YZXWP19mx+qdiE\"",
    "mtime": "2026-11-26T07:51:25.839Z",
    "size": 2786,
    "path": "../public/_nuxt/BNAnzaV3.js"
  },
  "/_nuxt/BNAnzaV3.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"4be-xzYrUnNbnAdYbazACpFvhPF9+OM\"",
    "mtime": "2026-11-26T07:51:25.853Z",
    "size": 1214,
    "path": "../public/_nuxt/BNAnzaV3.js.br"
  },
  "/_nuxt/BNAnzaV3.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"55f-G/3v34wrDeqqMKQvJQitKag6OcI\"",
    "mtime": "2026-11-26T07:51:25.853Z",
    "size": 1375,
    "path": "../public/_nuxt/BNAnzaV3.js.gz"
  },
  "/_nuxt/BTy6ee56.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3ec-DBr687/JY8g418VBlXz9DXiRqCM\"",
    "mtime": "2026-11-26T07:51:25.839Z",
    "size": 1004,
    "path": "../public/_nuxt/BTy6ee56.js"
  },
  "/_nuxt/BYjVg7ZZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14b-QdbvNWzfVeev57wMpUNamWICZXo\"",
    "mtime": "2026-11-26T07:51:25.839Z",
    "size": 331,
    "path": "../public/_nuxt/BYjVg7ZZ.js"
  },
  "/_nuxt/Bi7QtqjU.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"899-oN0LvCug6/V9vWNoDTNoflGWBt8\"",
    "mtime": "2026-11-26T07:51:25.865Z",
    "size": 2201,
    "path": "../public/_nuxt/Bi7QtqjU.js.br"
  },
  "/_nuxt/Bi7QtqjU.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"97c-+S7d7GL4BvEvWZ4M4vu51vjqtps\"",
    "mtime": "2026-11-26T07:51:25.853Z",
    "size": 2428,
    "path": "../public/_nuxt/Bi7QtqjU.js.gz"
  },
  "/_nuxt/Bnv6r63p.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"c11-VGoHhst3x5gZVPmh/QDEzj+bEn0\"",
    "mtime": "2026-11-26T07:51:25.839Z",
    "size": 3089,
    "path": "../public/_nuxt/Bnv6r63p.js"
  },
  "/_nuxt/Bnv6r63p.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"50e-5xd+fkhE5VSrwFUFDHbRn3AGwsk\"",
    "mtime": "2026-11-26T07:51:25.861Z",
    "size": 1294,
    "path": "../public/_nuxt/Bnv6r63p.js.br"
  },
  "/_nuxt/Bnv6r63p.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"5c6-gd82R4K4mQWnm/f2zu+aEyUEfwU\"",
    "mtime": "2026-11-26T07:51:25.853Z",
    "size": 1478,
    "path": "../public/_nuxt/Bnv6r63p.js.gz"
  },
  "/_nuxt/BoIGozAS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2c-GyZNdWKHLRqgn0wj0KqwoWqM4A4\"",
    "mtime": "2026-11-26T07:51:25.839Z",
    "size": 44,
    "path": "../public/_nuxt/BoIGozAS.js"
  },
  "/_nuxt/CUsEjnvk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2bf-wDr3c29gVbRvXYz8RZYruYFULvw\"",
    "mtime": "2026-11-26T07:51:25.839Z",
    "size": 703,
    "path": "../public/_nuxt/CUsEjnvk.js"
  },
  "/_nuxt/Cz4DXYHy.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"611-1gk6XxH5Rv6koCI6AjbenclvtUw\"",
    "mtime": "2026-11-26T07:51:25.839Z",
    "size": 1553,
    "path": "../public/_nuxt/Cz4DXYHy.js"
  },
  "/_nuxt/Cz4DXYHy.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"2c2-cUUIAhHn46YCEtpxa1JEkqTKV1A\"",
    "mtime": "2026-11-26T07:51:25.861Z",
    "size": 706,
    "path": "../public/_nuxt/Cz4DXYHy.js.br"
  },
  "/_nuxt/Cz4DXYHy.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"325-EaJwmNpsQiwlJCDKf7i/tgfZ6S0\"",
    "mtime": "2026-11-26T07:51:25.861Z",
    "size": 805,
    "path": "../public/_nuxt/Cz4DXYHy.js.gz"
  },
  "/_nuxt/D5yOCcmA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"87-Ki9SBmSk1JsP5PEh/qzvFeVtNYs\"",
    "mtime": "2026-11-26T07:51:25.839Z",
    "size": 135,
    "path": "../public/_nuxt/D5yOCcmA.js"
  },
  "/_nuxt/D6DeZEYs.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"96c-ElmBJqhH2SXYEKljizeZ+wNj/2k\"",
    "mtime": "2026-11-26T07:51:25.839Z",
    "size": 2412,
    "path": "../public/_nuxt/D6DeZEYs.js"
  },
  "/_nuxt/Bi7QtqjU.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"1653-yyu54+abDGjS5u4eSk7/NWurNvM\"",
    "mtime": "2026-11-26T07:51:25.839Z",
    "size": 5715,
    "path": "../public/_nuxt/Bi7QtqjU.js"
  },
  "/og.png": {
    "type": "image/png",
    "etag": "\"87dee-ACXCuh6OJwcnpN5zIkE13QUyMi8\"",
    "mtime": "2026-11-26T07:51:25.848Z",
    "size": 556526,
    "path": "../public/og.png"
  },
  "/_nuxt/D6DeZEYs.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"432-7L5d1EuzMOjFc0ZsesiwQ0UE3oA\"",
    "mtime": "2026-11-26T07:51:25.865Z",
    "size": 1074,
    "path": "../public/_nuxt/D6DeZEYs.js.br"
  },
  "/_nuxt/D6DeZEYs.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"4c7-sO0Wzks6RiMCiD6GhyIAofa8fuo\"",
    "mtime": "2026-11-26T07:51:25.861Z",
    "size": 1223,
    "path": "../public/_nuxt/D6DeZEYs.js.gz"
  },
  "/_nuxt/DDcX94dF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ac-DqrrsI1D64AnVNsMFFOuFyLVX38\"",
    "mtime": "2026-11-26T07:51:25.839Z",
    "size": 172,
    "path": "../public/_nuxt/DDcX94dF.js"
  },
  "/_nuxt/DF66chMV.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"5acd-Xh4ii/nIbMKeAe8q3lbZrwgW7KY\"",
    "mtime": "2026-11-26T07:51:25.873Z",
    "size": 23245,
    "path": "../public/_nuxt/DF66chMV.js.gz"
  },
  "/_nuxt/DF66chMV.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"13ea6-a7ivagGW6TQxdjSKbUNcNmYgg5A\"",
    "mtime": "2026-11-26T07:51:25.839Z",
    "size": 81574,
    "path": "../public/_nuxt/DF66chMV.js"
  },
  "/_nuxt/DF66chMV.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"5103-1NkccNwMfdtO5CjqTtPgBttphXk\"",
    "mtime": "2026-11-26T07:51:25.961Z",
    "size": 20739,
    "path": "../public/_nuxt/DF66chMV.js.br"
  },
  "/_nuxt/DbBSKqaO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"154-0jjkqD23YmlurLWAF/aofoP0V4Q\"",
    "mtime": "2026-11-26T07:51:25.839Z",
    "size": 340,
    "path": "../public/_nuxt/DbBSKqaO.js"
  },
  "/_nuxt/Dw0_u1Q4.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"19bdf-qJYi53x8CdodN7yMNVl8ZYTnvJQ\"",
    "mtime": "2026-11-26T07:51:26.529Z",
    "size": 105439,
    "path": "../public/_nuxt/Dw0_u1Q4.js.br"
  },
  "/_nuxt/Dycp2hLX.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"ef7-wK4bsIy1U63JAYAHZ0qFg2NnfDY\"",
    "mtime": "2026-11-26T07:51:25.839Z",
    "size": 3831,
    "path": "../public/_nuxt/Dycp2hLX.js"
  },
  "/_nuxt/Dycp2hLX.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"5a7-8XgzXkea7gqz/WWoORI+J6/v94I\"",
    "mtime": "2026-11-26T07:51:25.877Z",
    "size": 1447,
    "path": "../public/_nuxt/Dycp2hLX.js.br"
  },
  "/_nuxt/Dycp2hLX.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"672-jLe2SRu7z8jFHrtBjxpNvLtqk/k\"",
    "mtime": "2026-11-26T07:51:25.873Z",
    "size": 1650,
    "path": "../public/_nuxt/Dycp2hLX.js.gz"
  },
  "/_nuxt/LuxrvOyD.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"14a7-ERS4K0SMGjp42Z4tsWw+mK1mHuU\"",
    "mtime": "2026-11-26T07:51:25.839Z",
    "size": 5287,
    "path": "../public/_nuxt/LuxrvOyD.js"
  },
  "/_nuxt/Dw0_u1Q4.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"1d742-hwCJ0RrDbE/lF/i9FoOQ9kog5Cw\"",
    "mtime": "2026-11-26T07:51:25.917Z",
    "size": 120642,
    "path": "../public/_nuxt/Dw0_u1Q4.js.gz"
  },
  "/_nuxt/Dw0_u1Q4.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"520a9-Bh33atWeusGApDVc8i48kdDSBg0\"",
    "mtime": "2026-11-26T07:51:25.839Z",
    "size": 336041,
    "path": "../public/_nuxt/Dw0_u1Q4.js"
  },
  "/_nuxt/LuxrvOyD.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"6c6-Y1k3AahtzBOnehJBRPLwMBJVdfY\"",
    "mtime": "2026-11-26T07:51:25.877Z",
    "size": 1734,
    "path": "../public/_nuxt/LuxrvOyD.js.br"
  },
  "/_nuxt/LuxrvOyD.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"7a0-6JQJX8lWYHGLVxg3hYp0jTU6zy4\"",
    "mtime": "2026-11-26T07:51:25.877Z",
    "size": 1952,
    "path": "../public/_nuxt/LuxrvOyD.js.gz"
  },
  "/_nuxt/close.DBEX-eAa.mp3": {
    "type": "audio/mpeg",
    "etag": "\"2ea9-ZMs57w1BuIcW6TMWApqqoHOKNVc\"",
    "mtime": "2026-11-26T07:51:25.839Z",
    "size": 11945,
    "path": "../public/_nuxt/close.DBEX-eAa.mp3"
  },
  "/_nuxt/empty.DfIc8Rlb.mp3": {
    "type": "audio/mpeg",
    "etag": "\"25a9-53/MZMwUjgZdjA26xSkZIdeS2R4\"",
    "mtime": "2026-11-26T07:51:25.839Z",
    "size": 9641,
    "path": "../public/_nuxt/empty.DfIc8Rlb.mp3"
  },
  "/_nuxt/entry.BnDDBwKb.css": {
    "type": "text/css; charset=utf-8",
    "encoding": null,
    "etag": "\"8821-a3S/wan3jsphl9d2791ZHyIRqFA\"",
    "mtime": "2026-11-26T07:51:25.839Z",
    "size": 34849,
    "path": "../public/_nuxt/entry.BnDDBwKb.css"
  },
  "/_nuxt/entry.BnDDBwKb.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"17fe-Hc5dWtOi8ZEZb0coSd6ryL83Ah8\"",
    "mtime": "2026-11-26T07:51:25.917Z",
    "size": 6142,
    "path": "../public/_nuxt/entry.BnDDBwKb.css.br"
  },
  "/_nuxt/entry.BnDDBwKb.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"1bdb-fN7As8BhdjniuxWaIWRN6sZbu94\"",
    "mtime": "2026-11-26T07:51:25.889Z",
    "size": 7131,
    "path": "../public/_nuxt/entry.BnDDBwKb.css.gz"
  },
  "/_nuxt/kQga_n7A.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"2388-jmKXPK73xWALucCSMNaGleqTdQ0\"",
    "mtime": "2026-11-26T07:51:25.839Z",
    "size": 9096,
    "path": "../public/_nuxt/kQga_n7A.js"
  },
  "/_nuxt/kQga_n7A.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"d22-uklKoZ5E3U0g1F95Xo3i3ykmi8Y\"",
    "mtime": "2026-11-26T07:51:25.913Z",
    "size": 3362,
    "path": "../public/_nuxt/kQga_n7A.js.br"
  },
  "/_nuxt/kQga_n7A.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"ec8-yWvvDXQAcHuPk5EexgTFSNT12KQ\"",
    "mtime": "2026-11-26T07:51:25.913Z",
    "size": 3784,
    "path": "../public/_nuxt/kQga_n7A.js.gz"
  },
  "/_nuxt/layout.Ddb1N2Bz.css": {
    "type": "text/css; charset=utf-8",
    "encoding": null,
    "etag": "\"850-GOzEijBn5F0gjeV0dSRpexaiiRM\"",
    "mtime": "2026-11-26T07:51:25.839Z",
    "size": 2128,
    "path": "../public/_nuxt/layout.Ddb1N2Bz.css"
  },
  "/_nuxt/layout.Ddb1N2Bz.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"2d3-xR6XPBG6NEagLHqPTD1op/2C18Q\"",
    "mtime": "2026-11-26T07:51:25.913Z",
    "size": 723,
    "path": "../public/_nuxt/layout.Ddb1N2Bz.css.br"
  },
  "/_nuxt/layout.Ddb1N2Bz.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"347-/WBVLpYsqfeTB+OzBx3AUqdY5zY\"",
    "mtime": "2026-11-26T07:51:25.913Z",
    "size": 839,
    "path": "../public/_nuxt/layout.Ddb1N2Bz.css.gz"
  },
  "/_nuxt/pages.D22YmJcm.css": {
    "type": "text/css; charset=utf-8",
    "encoding": null,
    "etag": "\"1437-wfBRgxHHWpaSMv8FHVetyepW8ag\"",
    "mtime": "2026-11-26T07:51:25.839Z",
    "size": 5175,
    "path": "../public/_nuxt/pages.D22YmJcm.css"
  },
  "/_nuxt/pages.D22YmJcm.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"49e-YQWyNz6xeqv8vA+T7ClUdNsQESw\"",
    "mtime": "2026-11-26T07:51:25.913Z",
    "size": 1182,
    "path": "../public/_nuxt/pages.D22YmJcm.css.br"
  },
  "/_nuxt/pages.D22YmJcm.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"569-yDpguIGJmOxkTbtZsVfgYG9sEao\"",
    "mtime": "2026-11-26T07:51:25.913Z",
    "size": 1385,
    "path": "../public/_nuxt/pages.D22YmJcm.css.gz"
  },
  "/_nuxt/picross-icon.CsL2Z4Dv.svg": {
    "type": "image/svg+xml",
    "encoding": null,
    "etag": "\"1c8d-QomT4f3mqJviulM8eoH9RtB6qiA\"",
    "mtime": "2026-11-26T07:51:25.839Z",
    "size": 7309,
    "path": "../public/_nuxt/picross-icon.CsL2Z4Dv.svg"
  },
  "/_nuxt/picross-icon.CsL2Z4Dv.svg.br": {
    "type": "image/svg+xml",
    "encoding": "br",
    "etag": "\"78b-LdMBwcw1PKeCZGZo6jGjfFCUf/c\"",
    "mtime": "2026-11-26T07:51:25.913Z",
    "size": 1931,
    "path": "../public/_nuxt/picross-icon.CsL2Z4Dv.svg.br"
  },
  "/_nuxt/picross-icon.CsL2Z4Dv.svg.gz": {
    "type": "image/svg+xml",
    "encoding": "gzip",
    "etag": "\"8f7-s+Jx++o0ppbANlRDEKYE0+ALk2Y\"",
    "mtime": "2026-11-26T07:51:25.913Z",
    "size": 2295,
    "path": "../public/_nuxt/picross-icon.CsL2Z4Dv.svg.gz"
  },
  "/_nuxt/qmD_uJO7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"89-3c85EYsESKMQ4Rjw0lrlx7fIHxA\"",
    "mtime": "2026-11-26T07:51:25.839Z",
    "size": 137,
    "path": "../public/_nuxt/qmD_uJO7.js"
  },
  "/_nuxt/undo.DD7jM576.mp3": {
    "type": "audio/mpeg",
    "etag": "\"42e9-d1voiyhrNZ09QgjwIrjUWV/Rlq8\"",
    "mtime": "2026-11-26T07:51:25.839Z",
    "size": 17129,
    "path": "../public/_nuxt/undo.DD7jM576.mp3"
  },
  "/_nuxt/undo_2.D24FX4_f.mp3": {
    "type": "audio/mpeg",
    "etag": "\"37a9-0DLYX5OA0E/VxkHpl3zhngmzc0o\"",
    "mtime": "2026-11-26T07:51:25.839Z",
    "size": 14249,
    "path": "../public/_nuxt/undo_2.D24FX4_f.mp3"
  },
  "/_nuxt/useBoard.BlrGnIub.css": {
    "type": "text/css; charset=utf-8",
    "encoding": null,
    "etag": "\"606-R3NALyWzZYv/Au6ExJoJsrHcRkI\"",
    "mtime": "2026-11-26T07:51:25.839Z",
    "size": 1542,
    "path": "../public/_nuxt/useBoard.BlrGnIub.css"
  },
  "/_nuxt/useBoard.BlrGnIub.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"1fe-KbRgydRlRRYqKpRs2NEu+ciAC04\"",
    "mtime": "2026-11-26T07:51:25.917Z",
    "size": 510,
    "path": "../public/_nuxt/useBoard.BlrGnIub.css.br"
  },
  "/_nuxt/useBoard.BlrGnIub.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"260-ykWfn7qGeuRA0Y+fguxiJY+VWfM\"",
    "mtime": "2026-11-26T07:51:25.917Z",
    "size": 608,
    "path": "../public/_nuxt/useBoard.BlrGnIub.css.gz"
  },
  "/_nuxt/uudM2lxB.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"1c78-pfeUCeXCdbfw2uwBzrVgIK0bY9w\"",
    "mtime": "2026-11-26T07:51:25.840Z",
    "size": 7288,
    "path": "../public/_nuxt/uudM2lxB.js"
  },
  "/_nuxt/uudM2lxB.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"b04-mSQlsLGPOdL+NTXeQQNG2RqYLbI\"",
    "mtime": "2026-11-26T07:51:25.925Z",
    "size": 2820,
    "path": "../public/_nuxt/uudM2lxB.js.br"
  },
  "/_nuxt/uudM2lxB.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"c06-+MBoAi7x+b+P76mbIo/QYeZdUTM\"",
    "mtime": "2026-11-26T07:51:25.917Z",
    "size": 3078,
    "path": "../public/_nuxt/uudM2lxB.js.gz"
  },
  "/_nuxt/value.DZKgfTrE.mp3": {
    "type": "audio/mpeg",
    "etag": "\"25a9-VBtY+Hbu4oDHT3yFaAZW9sc6Bc4\"",
    "mtime": "2026-11-26T07:51:25.840Z",
    "size": 9641,
    "path": "../public/_nuxt/value.DZKgfTrE.mp3"
  },
  "/_nuxt/win.C62ATpsQ.mp3": {
    "type": "audio/mpeg",
    "etag": "\"a5e9-s6jnlHFufPIZiOfv2EjOGG75pCs\"",
    "mtime": "2026-11-26T07:51:25.840Z",
    "size": 42473,
    "path": "../public/_nuxt/win.C62ATpsQ.mp3"
  },
  "/_nuxt/y4ZIw2B-.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"2641-3pWoDy3uSy4s8j7IVGJaoZPwkx0\"",
    "mtime": "2026-11-26T07:51:25.840Z",
    "size": 9793,
    "path": "../public/_nuxt/y4ZIw2B-.js"
  },
  "/_nuxt/y4ZIw2B-.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"dba-lc1u1thABGMI6axZC9+UOy39tk0\"",
    "mtime": "2026-11-26T07:51:25.941Z",
    "size": 3514,
    "path": "../public/_nuxt/y4ZIw2B-.js.br"
  },
  "/_nuxt/y4ZIw2B-.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"f1e-GXRtVzRaNY66w7yO+7Zv0dSjRFM\"",
    "mtime": "2026-11-26T07:51:25.925Z",
    "size": 3870,
    "path": "../public/_nuxt/y4ZIw2B-.js.gz"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-yE48AThaFJZ87hCrhEtEmZcTBS8\"",
    "mtime": "2026-11-26T07:51:25.826Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/img/icons/android-chrome-192x192.png": {
    "type": "image/png",
    "etag": "\"1734-2ezmeLtMJjLHTV6jWalNt9BGhMA\"",
    "mtime": "2026-11-26T07:51:25.848Z",
    "size": 5940,
    "path": "../public/img/icons/android-chrome-192x192.png"
  },
  "/img/icons/android-chrome-384x384.png": {
    "type": "image/png",
    "etag": "\"2684-elf9NS3MDl4aaioGfPV6a6gMe38\"",
    "mtime": "2026-11-26T07:51:25.846Z",
    "size": 9860,
    "path": "../public/img/icons/android-chrome-384x384.png"
  },
  "/img/icons/android-chrome-512x512.png": {
    "type": "image/png",
    "etag": "\"17ce-9srgVtuNO0/zXBUv/QqYWVlbd7E\"",
    "mtime": "2026-11-26T07:51:25.847Z",
    "size": 6094,
    "path": "../public/img/icons/android-chrome-512x512.png"
  },
  "/img/icons/apple-touch-icon-120x120.png": {
    "type": "image/png",
    "etag": "\"c70-D8xhdZYVBE2w2hpC3wi/4T8SEHI\"",
    "mtime": "2026-11-26T07:51:25.847Z",
    "size": 3184,
    "path": "../public/img/icons/apple-touch-icon-120x120.png"
  },
  "/img/icons/apple-touch-icon-152x152.png": {
    "type": "image/png",
    "etag": "\"cf7-jvTpPHPF+fatgNrwdAYj+n/ef88\"",
    "mtime": "2026-11-26T07:51:25.847Z",
    "size": 3319,
    "path": "../public/img/icons/apple-touch-icon-152x152.png"
  },
  "/img/icons/apple-touch-icon-180x180.png": {
    "type": "image/png",
    "etag": "\"e06-0UrRczt83dj7IJN2O6sdUjWh9a0\"",
    "mtime": "2026-11-26T07:51:25.847Z",
    "size": 3590,
    "path": "../public/img/icons/apple-touch-icon-180x180.png"
  },
  "/img/icons/apple-touch-icon-60x60.png": {
    "type": "image/png",
    "etag": "\"5fa-rbE498CChjzGMgqWvPPptSZSRwU\"",
    "mtime": "2026-11-26T07:51:25.847Z",
    "size": 1530,
    "path": "../public/img/icons/apple-touch-icon-60x60.png"
  },
  "/img/icons/apple-touch-icon-76x76.png": {
    "type": "image/png",
    "etag": "\"76a-+81Ad9A84gyDk8J2tNL3bB3i6Y4\"",
    "mtime": "2026-11-26T07:51:25.847Z",
    "size": 1898,
    "path": "../public/img/icons/apple-touch-icon-76x76.png"
  },
  "/img/icons/apple-touch-icon.png": {
    "type": "image/png",
    "etag": "\"164d-tA9IZ2l6eHe90xq4yWaixl3xvLY\"",
    "mtime": "2026-11-26T07:51:25.847Z",
    "size": 5709,
    "path": "../public/img/icons/apple-touch-icon.png"
  },
  "/img/icons/browserconfig.xml": {
    "type": "application/xml",
    "etag": "\"f6-l0rqGL2lqVgCwGuAEmqx2W2R1wg\"",
    "mtime": "2026-11-26T07:51:25.847Z",
    "size": 246,
    "path": "../public/img/icons/browserconfig.xml"
  },
  "/img/icons/favicon-16x16.png": {
    "type": "image/png",
    "etag": "\"480-e1U2PpeyQHWpXTPUhw1bHVR9b14\"",
    "mtime": "2026-11-26T07:51:25.847Z",
    "size": 1152,
    "path": "../public/img/icons/favicon-16x16.png"
  },
  "/img/icons/favicon-32x32.png": {
    "type": "image/png",
    "etag": "\"82d-eNObSxwJuiCsZ2uBW1dZ77btYUo\"",
    "mtime": "2026-11-26T07:51:25.847Z",
    "size": 2093,
    "path": "../public/img/icons/favicon-32x32.png"
  },
  "/img/icons/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"3aee-MhSxHLXsQDpzfKWIWGQ9Upuf84s\"",
    "mtime": "2026-11-26T07:51:25.847Z",
    "size": 15086,
    "path": "../public/img/icons/favicon.ico"
  },
  "/img/icons/mstile-150x150.png": {
    "type": "image/png",
    "etag": "\"1213-scZiJLsZdsvg0WKBADePV/WVcUo\"",
    "mtime": "2026-11-26T07:51:25.847Z",
    "size": 4627,
    "path": "../public/img/icons/mstile-150x150.png"
  },
  "/img/icons/msapplication-icon-144x144.png": {
    "type": "image/png",
    "etag": "\"cb2-GhmbJs6eUfmv/jPjK2m0hVL2lho\"",
    "mtime": "2026-11-26T07:51:25.848Z",
    "size": 3250,
    "path": "../public/img/icons/msapplication-icon-144x144.png"
  },
  "/img/icons/safari-pinned-tab.svg": {
    "type": "image/svg+xml",
    "encoding": null,
    "etag": "\"1979-EvDQ5RTajPCsGO+2SRNCn8DqT0A\"",
    "mtime": "2026-11-26T07:51:25.847Z",
    "size": 6521,
    "path": "../public/img/icons/safari-pinned-tab.svg"
  },
  "/img/icons/safari-pinned-tab.svg.br": {
    "type": "image/svg+xml",
    "encoding": "br",
    "etag": "\"594-172ga+PxH7LrlxmMmyTmPaQeZpM\"",
    "mtime": "2026-11-26T07:51:25.941Z",
    "size": 1428,
    "path": "../public/img/icons/safari-pinned-tab.svg.br"
  },
  "/img/icons/safari-pinned-tab.svg.gz": {
    "type": "image/svg+xml",
    "encoding": "gzip",
    "etag": "\"69a-gPkjn4ESARyxuJ48E8++HS5WDBI\"",
    "mtime": "2026-11-26T07:51:25.941Z",
    "size": 1690,
    "path": "../public/img/icons/safari-pinned-tab.svg.gz"
  },
  "/_nuxt/builds/meta/7c4dc18f-94a2-4328-9380-fe6a8a27c401.json": {
    "type": "application/json",
    "etag": "\"58-ZrvneQRAxML60YUt5PsrHkfiJLs\"",
    "mtime": "2026-11-26T07:51:25.821Z",
    "size": 88,
    "path": "../public/_nuxt/builds/meta/7c4dc18f-94a2-4328-9380-fe6a8a27c401.json"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
const _ROOT_FOLDER_RE = /^\/([A-Za-z]:)?$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const relative = function(from, to) {
  const _from = resolve(from).replace(_ROOT_FOLDER_RE, "$1").split("/");
  const _to = resolve(to).replace(_ROOT_FOLDER_RE, "$1").split("/");
  if (_to[0][1] === ":" && _from[0][1] === ":" && _from[0] !== _to[0]) {
    return _to.join("/");
  }
  const _fromCopy = [..._from];
  for (const segment of _fromCopy) {
    if (_to[0] !== segment) {
      break;
    }
    _from.shift();
    _to.shift();
  }
  return [..._from.map(() => ".."), ..._to].join("/");
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  // Public dirs might be pruned after the build (uploaded to a CDN, sourcemaps
  // stripped), so a manifest entry with no file behind it reads as absent, not broken.
  return promises.readFile(resolve(serverDir, assets[id].path)).catch((error) => {
    if (error?.code !== 'ENOENT') { throw error }
  })
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_nuxt/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _MnRb5t = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader$2(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$3({ statusCode: 404 });
    }
    return;
  }
  if (asset.encoding !== void 0) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  const ifNotMatch = getRequestHeader$2(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader$2(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader$1(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader$1(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader$1(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader$1(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader$1(event, "Content-Length", asset.size);
  }
  const data = readAsset(id);
  return typeof data?.then === "function" ? data.then(
    (resolved) => assertAssetData(event, resolved)
  ) : assertAssetData(event, data);
});
function assertAssetData(event, data) {
  if (data === null || data === void 0) {
    removeResponseHeader(event, "Cache-Control");
    throw createError$3({ statusCode: 404 });
  }
  return data;
}

function getNitroOrigin(event) {
  if (event?.context.siteConfigNitroOrigin)
    return event.context.siteConfigNitroOrigin;
  const headers = event?.req?.headers;
  const forwardedHost = headers?.get("x-forwarded-host")?.split(",")[0]?.trim();
  const forwardedProtocol = headers?.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const requestProtocol = event?.req ? new URL(event.req.url).protocol.slice(0, -1) : void 0;
  return getNitroOrigin$1({
    isDev: false,
    isPrerender: false,
    requestHost: forwardedHost || headers?.get("host") || void 0,
    requestProtocol: forwardedProtocol === "https" || forwardedProtocol === "http" ? forwardedProtocol : requestProtocol
  });
}

function getSiteIndexable(e) {
  const { env, indexable } = getSiteConfig(e);
  if (typeof indexable !== "undefined")
    return String(indexable) === "true";
  return env === "production";
}

const FILE_EXT_RE = /\.[0-9a-z]+$/i;
function resolveSitePath(pathOrUrl, options) {
  let path = pathOrUrl;
  if (hasProtocol(pathOrUrl, { strict: false, acceptRelative: true })) {
    const parsed = parseURL(pathOrUrl);
    path = parsed.pathname;
  }
  const base = withLeadingSlash(options.base || "/");
  if (base !== "/" && path.startsWith(base)) {
    path = path.slice(base.length);
  }
  let origin = withoutTrailingSlash(options.absolute ? options.siteUrl : "");
  if (base !== "/" && origin.endsWith(base)) {
    origin = origin.slice(0, origin.indexOf(base));
  }
  const baseWithOrigin = options.withBase ? withBase(base, origin || "/") : origin;
  const resolvedUrl = withBase(path, baseWithOrigin);
  return path === "/" && !options.withBase ? withTrailingSlash(resolvedUrl) : fixSlashes(options.trailingSlash, resolvedUrl, options.fileExtensions);
}
const fileExtensions = [
  // Images
  "jpg",
  "jpeg",
  "png",
  "gif",
  "bmp",
  "webp",
  "svg",
  "ico",
  "heic",
  // Documents
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "txt",
  "md",
  "markdown",
  // Archives
  "zip",
  "rar",
  "7z",
  "tar",
  "gz",
  // Audio
  "mp3",
  "wav",
  "flac",
  "ogg",
  "opus",
  "m4a",
  "aac",
  "midi",
  "mid",
  // Video
  "mp4",
  "avi",
  "mkv",
  "mov",
  "wmv",
  "flv",
  "webm",
  // Web
  "html",
  "css",
  "js",
  "json",
  "xml",
  "tsx",
  "jsx",
  "ts",
  "vue",
  "svelte",
  "xsl",
  "rss",
  "atom",
  // Programming
  "php",
  "py",
  "rb",
  "java",
  "c",
  "cpp",
  "h",
  "go",
  // Data formats
  "csv",
  "tsv",
  "sql",
  "yaml",
  "yml",
  "fits",
  // 3D models
  "stl",
  "obj",
  "step",
  "3mf",
  // Geospatial data
  "kml",
  "kmz",
  "geojson",
  // Fonts
  "woff",
  "woff2",
  "ttf",
  "otf",
  "eot",
  // Executables/Binaries
  "exe",
  "msi",
  "apk",
  "ipa",
  "dmg",
  "iso",
  "bin",
  // Scripts/Config
  "bat",
  "cmd",
  "sh",
  "env",
  "htaccess",
  "conf",
  "toml",
  "ini",
  // Package formats
  "deb",
  "rpm",
  "jar",
  "war",
  // E-books
  "epub",
  "mobi",
  // Common temporary/backup files
  "log",
  "tmp",
  "bak",
  "old",
  "sav"
];
function isPathFile(path, extraExtensions) {
  const lastSegment = path.split("/").pop();
  const extension = (lastSegment || path).match(FILE_EXT_RE)?.[0].slice(1);
  if (!extension)
    return false;
  if (fileExtensions.includes(extension))
    return true;
  const lowerExtension = extension.toLowerCase();
  return Array.isArray(extraExtensions) && extraExtensions.some(
    (extra) => typeof extra === "string" && extra.replace(/^\./, "").toLowerCase() === lowerExtension
  );
}
function fixSlashes(trailingSlash, pathOrUrl, extraExtensions) {
  const $url = parseURL(pathOrUrl);
  if (isPathFile($url.pathname, extraExtensions))
    return pathOrUrl;
  const fixedPath = trailingSlash ? withTrailingSlash($url.pathname) : withoutTrailingSlash($url.pathname);
  return `${$url.protocol ? `${$url.protocol}//` : ""}${$url.host || ""}${fixedPath}${$url.search || ""}${$url.hash || ""}`;
}

function createSitePathResolver(e, options = {}) {
  const siteConfig = getSiteConfig(e);
  const nitroOrigin = getNitroOrigin(e);
  const nuxtBase = useRuntimeConfig$1().app.baseURL || "/";
  return (path) => {
    return resolveSitePath(path, {
      ...options,
      siteUrl: options.canonical !== false || false ? siteConfig.url || nitroOrigin : nitroOrigin,
      trailingSlash: siteConfig.trailingSlash,
      fileExtensions: siteConfig.fileExtensions,
      base: nuxtBase
    });
  };
}
function withSiteUrl(e, path, options = {}) {
  const siteConfig = getSiteConfig(e);
  let siteUrl = getNitroOrigin(e);
  if ((options.canonical !== false || false) && siteConfig.url)
    siteUrl = siteConfig.url;
  return resolveSitePath(path, {
    absolute: true,
    siteUrl,
    trailingSlash: siteConfig.trailingSlash,
    fileExtensions: siteConfig.fileExtensions,
    base: useRuntimeConfig$1().app.baseURL || "/",
    withBase: options.withBase
  });
}

function getSiteRobotConfig(e) {
  const query = getQuery(e);
  const hints = [];
  const { groups, debug } = useRuntimeConfigNuxtRobots();
  let indexable = getSiteIndexable(e);
  const queryIndexableEnabled = String(query.mockProductionEnv) === "true" || query.mockProductionEnv === "";
  if (debug || false) {
    const indexableSource = getSiteConfig(e, { debug: true })._context?.indexable;
    if (queryIndexableEnabled) {
      indexable = true;
      hints.push("You are mocking a production enviroment with ?mockProductionEnv query.");
    } else if (!indexable && indexableSource === "nuxt-robots:config") {
      hints.push("You are blocking indexing with your Nuxt Robots config.");
    } else if (!indexable && !queryIndexableEnabled) {
      hints.push(indexableSource ? `Indexing is blocked by site config set by ${indexableSource}.` : "Indexing is blocked by site config.");
    } else if (indexable && !queryIndexableEnabled) {
      hints.push(indexableSource ? `Indexing is enabled from ${indexableSource}.` : "Indexing is enabled.");
    }
  }
  if (groups.some((g) => g.userAgent.includes("*") && g.disallow.includes("/"))) {
    indexable = false;
    hints.push("You are blocking all user agents with a wildcard `Disallow /`.");
  } else if (groups.some((g) => g.disallow.includes("/"))) {
    hints.push("You are blocking specific user agents with `Disallow /`.");
  }
  return { indexable, hints };
}

const _KY2j0c = defineEventHandler$1(async (e) => {
  const nitroApp = useNitroApp();
  const { indexable} = getSiteRobotConfig(e);
  const { credits, cacheControl, robotsDisabledValue } = useRuntimeConfigNuxtRobots();
  let robotsTxtCtx = {
    sitemaps: [],
    groups: [
      {
        allow: [],
        comment: [],
        userAgent: ["*"],
        disallow: ["/"]
      }
    ]
  };
  if (indexable) {
    robotsTxtCtx = await resolveRobotsTxtContext(e);
    robotsTxtCtx.sitemaps = [...new Set(
      asArray(robotsTxtCtx.sitemaps).map((s) => !s.startsWith("http") ? withSiteUrl(e, s, { withBase: true}) : s)
    )];
  }
  let robotsTxt = generateRobotsTxt(robotsTxtCtx);
  if (credits) {
    const routeRules = useRuntimeConfig$1().nitro?.routeRules || {};
    const catchAllRule = normaliseRobotsRouteRule(routeRules["/**"]);
    const hasAllowRule = Object.values(routeRules).some((rules) => normaliseRobotsRouteRule(rules)?.allow === true);
    const siteIndexable = indexable && !robotsTxtCtx.groups.some((group) => group.userAgent.includes("*") && group.disallow.includes("/")) && !(catchAllRule?.allow === false && isNoIndexRule(catchAllRule.rule || robotsDisabledValue) && !hasAllowRule);
    robotsTxt = [
      `# START nuxt-robots (${siteIndexable ? "indexable" : "indexing disabled"})`,
      robotsTxt,
      "# END nuxt-robots"
    ].filter(Boolean).join("\n");
  }
  e.res.headers.set("Content-Type", "text/plain; charset=utf-8");
  e.res.headers.set("Cache-Control", !cacheControl ? "no-store" : cacheControl);
  const hookCtx = { robotsTxt, e };
  await nitroApp.hooks.callHook("robots:robots-txt", hookCtx);
  return hookCtx.robotsTxt;
});

function isUnlocalizedLocalePage(page) {
  return page._tag === "unlocalized" && typeof page.path === "string";
}
function matchesUnlocalizedLocalePage(page, path) {
  if (matchPagePattern(page.path, path))
    return true;
  if (!page.subtree)
    return false;
  const subtreePattern = `${page.path === "/" ? "" : page.path.replace(/\/$/, "")}/[...__nuxtSeoSubtree]`;
  return !!matchPagePattern(subtreePattern, path);
}
function normalizeHost(value) {
  const input = value.trim();
  return parseURL(input.startsWith("//") ? `https:${input}` : input.includes("://") ? input : `https://${input}`).host?.toLowerCase() || "";
}
function localeDomains(locale) {
  return [...locale.domains || [], ...locale.domain ? [locale.domain] : []];
}
function resolveI18nDomain(host, i18n) {
  const normalizedHost = host ? normalizeHost(host) : "";
  const domains = i18n.locales.map((locale) => ({
    locale,
    hosts: localeDomains(locale).map(normalizeHost),
    defaults: locale.defaultForDomains?.map(normalizeHost) || []
  }));
  const matches = normalizedHost ? domains.filter((entry) => entry.hosts.includes(normalizedHost) || entry.defaults.includes(normalizedHost)) : [];
  if (!matches.length)
    return { _tag: "unknown", defaultLocale: i18n.defaultLocale, locales: i18n.locales };
  const defaultLocale = matches.find((entry) => entry.defaults.includes(normalizedHost))?.locale || (matches.length === 1 ? matches[0].locale : void 0);
  return {
    _tag: "known",
    defaultLocale: defaultLocale?.code || i18n.defaultLocale,
    locales: domains.filter((entry) => !entry.hosts.length || entry.hosts.includes(normalizedHost)).map((entry) => entry.locale)
  };
}
function firstLocaleDomain(locale) {
  return locale?.defaultForDomains?.[0] || locale?.domain || locale?.domains?.[0];
}
function resolveCanonicalLocaleDomain(locale, defaultLocale) {
  return firstLocaleDomain(locale) || firstLocaleDomain(defaultLocale);
}
function splitRouteSuffix(route) {
  const suffixIndex = route.search(/[?#]/);
  const rawPathname = suffixIndex === -1 ? route : route.slice(0, suffixIndex);
  return {
    pathname: rawPathname ? rawPathname.startsWith("/") ? rawPathname : `/${rawPathname}` : "/",
    suffix: suffixIndex === -1 ? "" : route.slice(suffixIndex)
  };
}
function resolveLocaleFromRoute(route, i18n, context = {}) {
  const { pathname, suffix } = splitRouteSuffix(route);
  if (i18n.strategy !== "no_prefix") {
    const segments = pathname.split("/").filter(Boolean);
    const first = segments[0];
    const matched = first ? i18n.locales.find((l) => l.code === first) : void 0;
    if (matched) {
      const rest = segments.slice(1).join("/");
      const trailingSlash = rest && pathname.endsWith("/") ? "/" : "";
      return { locale: matched.code, basePath: `${rest ? `/${rest}${trailingSlash}` : "/"}${suffix}` };
    }
  }
  const contextLocale = context.locale ? i18n.locales.find((locale) => locale.code === context.locale) : void 0;
  const domain = resolveI18nDomain(context.host, i18n);
  const hostLocales = domain._tag === "known" ? domain.locales.filter((locale) => [...localeDomains(locale), ...locale.defaultForDomains || []].some((host) => normalizeHost(host) === normalizeHost(context.host))) : [];
  const hostLocale = hostLocales.find((locale) => locale.code === domain.defaultLocale) || hostLocales[0];
  return { locale: contextLocale?.code || hostLocale?.code || domain.defaultLocale, basePath: `${pathname}${suffix}` };
}
function localePath(basePath, locale, i18n, context = {}) {
  const { pathname, suffix } = splitRouteSuffix(basePath);
  if (i18n.strategy === "no_prefix")
    return `${pathname}${suffix}`;
  const domain = resolveI18nDomain(context.host, i18n);
  const isDefault = locale === domain.defaultLocale;
  const isDomainDefault = i18n.differentDomains || domain._tag === "known" && isDefault;
  if (i18n.strategy === "prefix_except_default" && (isDefault || i18n.differentDomains))
    return `${pathname}${suffix}`;
  if (i18n.strategy === "prefix_and_default" && isDomainDefault)
    return `${pathname}${suffix}`;
  if (pathname === "/")
    return `/${locale}${suffix}`;
  return `/${locale}${pathname}${suffix}`;
}
function toSegments(path) {
  return path.split("/").filter(Boolean);
}
const PAGE_PARAM_PATTERN = /\[\[(\.\.\.)?([^[\]]+)\]\]|\[(\.\.\.)?([^[\]]+)\]|:(\w+)(?:\((\.\*)?\))?([?*+]?)/g;
function parsePageSegment(segment) {
  const tokens = [];
  let offset = 0;
  for (const match of segment.matchAll(PAGE_PARAM_PATTERN)) {
    const index = match.index;
    if (index > offset)
      tokens.push({ _tag: "static", value: segment.slice(offset, index) });
    if (match[2]) {
      tokens.push({ _tag: "param", param: { name: match[2], catchAll: !!match[1], optional: true } });
    } else if (match[4]) {
      tokens.push({ _tag: "param", param: { name: match[4], catchAll: !!match[3], optional: false } });
    } else {
      const modifier = match[7];
      const routePattern = match[6];
      tokens.push({
        _tag: "param",
        param: {
          name: match[5],
          catchAll: !!routePattern?.includes(".*") || modifier === "*" || modifier === "+",
          optional: modifier === "?" || modifier === "*"
        }
      });
    }
    offset = index + match[0].length;
  }
  if (offset < segment.length)
    tokens.push({ _tag: "static", value: segment.slice(offset) });
  return tokens.length ? tokens : [{ _tag: "static", value: segment }];
}
function wholeSegmentParam(tokens) {
  return tokens.length === 1 && tokens[0]?._tag === "param" ? tokens[0].param : null;
}
function segmentRanks(pattern) {
  return toSegments(pattern).map((segment) => {
    const tokens = parsePageSegment(segment);
    const params = tokens.filter((token) => token._tag === "param");
    if (!params.length)
      return 6;
    const hasStatic = tokens.some((token) => token._tag === "static");
    if (hasStatic)
      return params.some((token) => token.param.optional) ? 3 : 4;
    const param = params[0].param;
    if (param.catchAll)
      return param.optional ? -1 : 0;
    return param.optional ? 1 : 2;
  });
}
function compareSpecificity(a, b) {
  const length = Math.min(a.length, b.length);
  for (let i = 0; i < length; i++) {
    const diff = b[i] - a[i];
    if (diff !== 0)
      return diff;
  }
  return a.length - b.length;
}
function matchSegmentTokens(tokens, path) {
  const failedStates = /* @__PURE__ */ new Set();
  function visit(index, offset, params) {
    const state = index * (path.length + 1) + offset;
    if (failedStates.has(state))
      return null;
    if (index === tokens.length) {
      if (offset === path.length)
        return params;
      failedStates.add(state);
      return null;
    }
    const token = tokens[index];
    if (token._tag === "static") {
      const matched = path.startsWith(token.value, offset) ? visit(index + 1, offset + token.value.length, params) : null;
      if (!matched)
        failedStates.add(state);
      return matched;
    }
    const minimumEnd = token.param.optional ? offset : offset + 1;
    for (let end = minimumEnd; end <= path.length; end++) {
      const value = path.slice(offset, end);
      const nextParams = value ? { ...params, [token.param.name]: value } : params;
      const matched = visit(index + 1, end, nextParams);
      if (matched)
        return matched;
    }
    failedStates.add(state);
    return null;
  }
  return visit(0, 0, {});
}
function matchPagePattern(pattern, path) {
  const patternSegments = toSegments(pattern);
  const pathSegments = toSegments(path);
  const failedStates = /* @__PURE__ */ new Set();
  function visit(patternIndex, pathIndex, params) {
    const state = patternIndex * (pathSegments.length + 1) + pathIndex;
    if (failedStates.has(state))
      return null;
    if (patternIndex === patternSegments.length) {
      if (pathIndex === pathSegments.length)
        return params;
      failedStates.add(state);
      return null;
    }
    const tokens = parsePageSegment(patternSegments[patternIndex]);
    const param = wholeSegmentParam(tokens);
    if (param?.catchAll) {
      const minimumEnd = param.optional ? pathIndex : pathIndex + 1;
      for (let end = pathSegments.length; end >= minimumEnd; end--) {
        const value = pathSegments.slice(pathIndex, end).join("/");
        const nextParams = value ? { ...params, [param.name]: value } : params;
        const matched2 = visit(patternIndex + 1, end, nextParams);
        if (matched2)
          return matched2;
      }
      failedStates.add(state);
      return null;
    }
    const segment = pathSegments[pathIndex];
    if (segment !== void 0) {
      const segmentParams = matchSegmentTokens(tokens, segment);
      if (segmentParams) {
        const matched2 = visit(patternIndex + 1, pathIndex + 1, { ...params, ...segmentParams });
        if (matched2)
          return matched2;
      }
    }
    const matched = param?.optional ? visit(patternIndex + 1, pathIndex, params) : null;
    if (!matched)
      failedStates.add(state);
    return matched;
  }
  return visit(0, 0, {});
}
function fillPagePattern(pattern, params) {
  const filled = [];
  for (const segment of toSegments(pattern)) {
    const tokens = parsePageSegment(segment);
    let value = "";
    for (const token of tokens) {
      if (token._tag === "static") {
        value += token.value;
        continue;
      }
      const paramValue = params[token.param.name];
      if (paramValue === void 0) {
        if (token.param.optional)
          continue;
        return null;
      }
      value += paramValue;
    }
    if (value)
      filled.push(value);
  }
  if (!filled.length)
    return "/";
  return `/${filled.join("/")}${pattern.endsWith("/") ? "/" : ""}`;
}
function alternatesForEntry(localePaths, params, i18n, context) {
  const untranslated = localePaths[i18n.defaultLocale];
  const alternates = [];
  const defaultLocale = i18n.locales.find((locale) => locale.code === i18n.defaultLocale);
  const locales = context.domainMode === "request" ? resolveI18nDomain(context.host, i18n).locales : i18n.locales;
  for (const l of locales) {
    const pattern = localePaths[l.code] ?? untranslated;
    if (localePaths[l.code] === false)
      continue;
    if (typeof pattern !== "string")
      continue;
    const path = fillPagePattern(pattern, params);
    if (path === null)
      continue;
    const domain = context.domainMode === "request" ? void 0 : resolveCanonicalLocaleDomain(l, defaultLocale);
    alternates.push({
      code: l.code,
      hreflang: l.hreflang || l.code,
      path: localePath(path, l.code, i18n, { host: domain || context.host }),
      ...domain ? { domain } : {}
    });
  }
  return alternates;
}
function alternatesFromPages(basePath, routePath, locale, i18n, context) {
  const pages = i18n.pages;
  const hasDomainLocales = i18n.differentDomains || i18n.multiDomainLocales;
  const hasContextLocale = !!context.locale && i18n.locales.some((locale2) => locale2.code === context.locale);
  if (!pages)
    return null;
  const allowLocalized = i18n.strategy !== "no_prefix" || hasDomainLocales || hasContextLocale;
  const matches = [];
  for (const page of Object.values(pages)) {
    if (!page)
      continue;
    if (isUnlocalizedLocalePage(page)) {
      if (matchesUnlocalizedLocalePage(page, routePath))
        matches.push({ _tag: "unlocalized", ranks: segmentRanks(page.path) });
      continue;
    }
    if (!allowLocalized)
      continue;
    const pattern = page[locale];
    if (!pattern)
      continue;
    const params = matchPagePattern(pattern, basePath);
    if (params)
      matches.push({ _tag: "localized", ranks: segmentRanks(pattern), localePaths: page, params });
  }
  matches.sort((a, b) => compareSpecificity(a.ranks, b.ranks));
  for (const match of matches) {
    if (match._tag === "unlocalized") {
      const defaultCode = context.domainMode === "request" ? resolveI18nDomain(context.host, i18n).defaultLocale : i18n.defaultLocale;
      const defaultLocale = i18n.locales.find((locale2) => locale2.code === defaultCode);
      if (defaultLocale) {
        const domain = context.domainMode === "request" ? void 0 : resolveCanonicalLocaleDomain(defaultLocale);
        return [{
          code: defaultLocale.code,
          hreflang: defaultLocale.hreflang || defaultLocale.code,
          path: routePath,
          ...domain ? { domain } : {}
        }];
      }
      continue;
    }
    return alternatesForEntry(match.localePaths, match.params, i18n, context);
  }
  return null;
}
function resolveLocaleAlternates(route, i18n, context = {}) {
  const { locale, basePath } = resolveLocaleFromRoute(route, i18n, context);
  const { pathname, suffix } = splitRouteSuffix(basePath);
  const { pathname: routePathname } = splitRouteSuffix(route);
  const translated = alternatesFromPages(pathname, routePathname, locale, i18n, context);
  if (translated) {
    return {
      _tag: "pages",
      alternates: translated.map((alternate) => ({ ...alternate, path: `${alternate.path}${suffix}` }))
    };
  }
  const defaultLocale = i18n.locales.find((locale2) => locale2.code === i18n.defaultLocale);
  return {
    _tag: "strategy",
    alternates: (context.domainMode === "request" ? resolveI18nDomain(context.host, i18n).locales : i18n.locales).map((l) => {
      const domain = context.domainMode === "request" ? void 0 : resolveCanonicalLocaleDomain(l, defaultLocale);
      return {
        code: l.code,
        hreflang: l.hreflang || l.code,
        path: localePath(basePath, l.code, i18n, { host: domain || context.host }),
        ...domain ? { domain } : {}
      };
    })
  };
}
function computeLocaleAlternates(route, i18n, context = {}) {
  return resolveLocaleAlternates(route, i18n, context).alternates;
}

const i18nStrategies = /* @__PURE__ */ new Set(["no_prefix", "prefix_except_default", "prefix", "prefix_and_default"]);
function parseRuntimeI18nConfig(input) {
  if (!input || typeof input !== "object")
    return null;
  const config = input;
  if (!Array.isArray(config.locales))
    return null;
  const locales = config.locales.flatMap((locale) => {
    const code = typeof locale === "string" ? locale : locale && typeof locale === "object" && typeof locale.code === "string" ? locale.code : null;
    return code ? [{ code, hreflang: code }] : [];
  });
  if (!locales.length)
    return null;
  const defaultLocale = typeof config.defaultLocale === "string" ? config.defaultLocale : locales[0].code;
  const strategy = typeof config.strategy === "string" && i18nStrategies.has(config.strategy) ? config.strategy : "prefix";
  return { defaultLocale, locales, strategy };
}
function withoutLocalePrefix(path, publicRuntimeConfig) {
  const i18nConfig = parseRuntimeI18nConfig(publicRuntimeConfig.i18n);
  return i18nConfig ? resolveLocaleFromRoute(path, i18nConfig).basePath : path;
}

const pageMetaMatchers = [];

function getPathRobotConfig(e, options) {
  const runtimeConfig = useRuntimeConfig$1();
  const { robotsDisabledValue, robotsEnabledValue } = useRuntimeConfigNuxtRobots();
  if (!options?.skipSiteIndexable) {
    if (!getSiteRobotConfig(e).indexable) {
      return {
        rule: robotsDisabledValue,
        indexable: false,
        debug: {
          source: "Site Config"
        }
      };
    }
  }
  const path = options?.path || `${e.url.pathname}${e.url.search}`;
  let userAgent = options?.userAgent;
  if (!userAgent) {
    userAgent = getRequestHeader$1(e, "User-Agent");
  }
  const nitroApp = useNitroApp();
  const groups = [
    // run explicit user agent matching first
    ...nitroApp._robots.ctx.groups.filter((g) => {
      if (userAgent) {
        return g.userAgent.some((ua) => !!ua && userAgent.toLowerCase().includes(ua.toLowerCase()));
      }
      return false;
    }),
    // run wildcard matches second
    ...nitroApp._robots.ctx.groups.filter((g) => g.userAgent.includes("*"))
  ];
  for (const group of groups) {
    if (!options?.skipSiteIndexable && group._indexable === false) {
      return {
        indexable: false,
        rule: robotsDisabledValue,
        debug: {
          source: "/robots.txt",
          line: JSON.stringify(group)
        }
      };
    }
    const rules = options?.skipSiteIndexable ? (group._rules || []).filter((r) => r.pattern !== "/") : group._rules || [];
    const robotsTxtRule = matchPathToRule(path, rules);
    if (robotsTxtRule) {
      if (!robotsTxtRule.allow) {
        return {
          indexable: false,
          rule: robotsDisabledValue,
          debug: {
            source: "/robots.txt",
            line: `Disallow: ${robotsTxtRule.pattern}`
          }
        };
      }
      break;
    }
  }
  const baseURL = runtimeConfig.app.baseURL;
  const matchRules = (pathOrUrl) => matchRouteRules(withoutBase(withoutTrailingSlash((pathOrUrl.startsWith("/") ? pathOrUrl : parseURL(pathOrUrl, baseURL).pathname).split("?")[0]), baseURL));
  let robotRouteRules = matchRules(path);
  let routeRulesPath = path;
  if (typeof robotRouteRules.robots === "undefined") {
    const basePath = withoutLocalePrefix(routeRulesPath, runtimeConfig.public);
    if (basePath !== routeRulesPath) {
      routeRulesPath = basePath;
      robotRouteRules = matchRules(routeRulesPath);
    }
  }
  const routeRules = normaliseRobotsRouteRule(robotRouteRules);
  if (routeRules && (typeof routeRules.allow !== "undefined" || typeof routeRules.rule !== "undefined")) {
    return {
      indexable: routeRules.allow ?? false,
      rule: routeRules.rule || (routeRules.allow ? robotsEnabledValue : robotsDisabledValue),
      debug: {
        source: "Route Rules"
      }
    };
  }
  const pagePath = withoutBase(parseURL(path).pathname || "/", runtimeConfig.app.baseURL);
  const pageMetaRule = pageMetaMatchers.find((page) => page.re.test(pagePath))?.robots;
  if (typeof pageMetaRule !== "undefined") {
    const normalised = normaliseRobotsRouteRule({ robots: pageMetaRule });
    if (normalised && (typeof normalised.allow !== "undefined" || typeof normalised.rule !== "undefined")) {
      return {
        indexable: normalised.allow ?? false,
        rule: normalised.rule || (normalised.allow ? robotsEnabledValue : robotsDisabledValue),
        debug: {
          source: "Page Meta"
        }
      };
    }
  }
  return {
    indexable: true,
    rule: robotsEnabledValue
  };
}

const _zfj6wI = defineEventHandler$1(async (e) => {
  if (e.url.pathname === "/robots.txt" || e.url.pathname.startsWith("/__") || e.url.pathname.startsWith("/api") || e.url.pathname.startsWith("/_nuxt")) {
    const { header, robotsDisabledValue } = useRuntimeConfigNuxtRobots();
    if (header && !getSiteRobotConfig(e).indexable)
      e.res.headers.set("X-Robots-Tag", robotsDisabledValue);
    return;
  }
  const nuxtRobotsConfig = useRuntimeConfigNuxtRobots();
  if (nuxtRobotsConfig) {
    const { header } = nuxtRobotsConfig;
    const robotConfig = getPathRobotConfig(e, { skipSiteIndexable: Boolean(getQuery(e)?.mockProductionEnv) });
    if (header) {
      e.res.headers.set("X-Robots-Tag", robotConfig.rule);
    }
    e.context.robots = robotConfig;
  }
});

const _GW9b1J = defineEventHandler$1((e) => initRequestSiteConfig(e, getNitroOrigin(e), getRouteRules(e)));

const localeHashes = {"fr":"78335400","en":"78335400"};
const _messagesHandler = defineEventHandler(async (event) => {
  const locale = getRouterParam(event, "locale");
  if (!locale) {
    throw createError({ status: 400, message: "Locale not specified." });
  }
  const ctx = tryUseI18nContext(event) || await initializeI18nContext(event);
  if (ctx.localeConfigs && !Object.hasOwn(ctx.localeConfigs, locale)) {
    throw createError({ status: 404, message: `Locale '${locale}' not found.` });
  }
  const messages = await ctx.loadMessages(locale);
  return messages;
});
const getCacheKey = (event) => [getRouterParam(event, "locale") ?? "null", getRouterParam(event, "hash") ?? "null"].join("-");
async function shouldBypassCache(event) {
  const locale = getRouterParam(event, "locale");
  if (locale == null) {
    return false;
  }
  const ctx = tryUseI18nContext(event) || await initializeI18nContext(event);
  return !ctx.localeConfigs?.[locale]?.cacheable;
}
const _cachedMessageLoader = defineCachedFunction(_messagesHandler, {
  name: "i18n:messages-internal",
  maxAge: 60 * 60 * 24,
  getKey: getCacheKey,
  shouldBypassCache
});
const _messagesHandlerCached = defineCachedHandler(_cachedMessageLoader, {
  name: "i18n:messages",
  maxAge: 10,
  swr: false,
  getKey: getCacheKey,
  shouldBypassCache
});
const messagesHandler = _messagesHandlerCached;
const _3TuGwt = defineEventHandler((event) => {
  const locale = getRouterParam(event, "locale");
  if (locale != null && getRouterParam(event, "hash") === localeHashes[locale]) {
    return messagesHandler(event);
  }
  setResponseHeader(event, "cache-control", "no-store");
  return _messagesHandler(event);
});

const _SxA8c9 = defineEventHandler$2(() => {});

const _lazy_v38Yxg = () => import('../routes/api/_..._.mjs');
const _lazy_UMNqsw = () => import('../routes/__sitemap__/urls.mjs');
const _lazy_pdKooL = () => import('../routes/renderer.mjs');
const _lazy_E58Dfs = () => import('../routes/sitemap_index.xml.mjs');
const _lazy_5I5U7P = () => import('../routes/__sitemap__/_sitemap_.xml.mjs');
const _lazy_aLhazc = () => import('../routes/sitemap.xml.mjs');

const handlers = [
  { route: '', handler: _MnRb5t, lazy: false, middleware: true, method: undefined },
  { route: '/api/**', handler: _lazy_v38Yxg, lazy: true, middleware: false, method: undefined },
  { route: '/__sitemap__/urls', handler: _lazy_UMNqsw, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_pdKooL, lazy: true, middleware: false, method: undefined },
  { route: '/sitemap_index.xml', handler: _lazy_E58Dfs, lazy: true, middleware: false, method: undefined },
  { route: '/__sitemap__/**:sitemap', handler: _lazy_5I5U7P, lazy: true, middleware: false, method: undefined },
  { route: '/sitemap.xml', handler: _lazy_aLhazc, lazy: true, middleware: false, method: undefined },
  { route: '/robots.txt', handler: _KY2j0c, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _zfj6wI, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _GW9b1J, lazy: false, middleware: true, method: undefined },
  { route: '/_i18n/:hash/:locale/messages.json', handler: _3TuGwt, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_pdKooL, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig$2();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => b(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return C(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  const hasCacheRules = Object.values(config.nitro.routeRules || {}).some(
    (rule) => rule.cache
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      if (hasCacheRules) {
        handler = withRouteRulesCache(handler);
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function withRouteRulesCache(handler) {
  const cachedHandlers = /* @__PURE__ */ new Map();
  const _handler = eventHandler((event) => {
    const cacheRule = getRouteCacheRule(event);
    if (!cacheRule) {
      return handler(event);
    }
    const key = JSON.stringify(cacheRule);
    let cachedHandler = cachedHandlers.get(key);
    if (!cachedHandler) {
      cachedHandler = cachedEventHandler(handler, {
        group: "nitro/routes",
        ...cacheRule
      });
      cachedHandlers.set(key, cachedHandler);
    }
    return cachedHandler(event);
  });
  if (handler.__resolve__) {
    _handler.__resolve__ = handler.__resolve__;
  }
  if (handler.__websocket__) {
    _handler.__websocket__ = handler.__websocket__;
  }
  return _handler;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig$2();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader$1(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    debug("received shut down signal", signal);
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((error) => {
      debug("server shut down error occurred", error);
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof Bt.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    debug("Destroy Connections : " + (force ? "forced close" : "close"));
    let counter = 0;
    let secureCounter = 0;
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        counter++;
        destroy(socket);
      }
    }
    debug("Connections destroyed : " + counter);
    debug("Connection Counter    : " + connectionCounter);
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        secureCounter++;
        destroy(socket);
      }
    }
    debug("Secure Connections destroyed : " + secureCounter);
    debug("Secure Connection Counter    : " + secureConnectionCounter);
  }
  server.on("request", (req, res) => {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", () => {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", () => {
    debug("closed");
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      debug("Close http server");
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    debug("shutdown signal - " + sig);
    if (options.development) {
      debug("DEV-Mode - immediate forceful shutdown");
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          debug("executing finally()");
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      debug(`waitForReadyToShutDown... ${totalNumInterval}`);
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        debug("All connections closed. Continue to shutting down");
        return Promise.resolve(false);
      }
      debug("Schedule the next waitForReadyToShutdown");
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    debug("shutting down");
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      debug("Do onShutdown now");
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((error) => {
      const errString = typeof error === "string" ? error : JSON.stringify(error);
      debug(errString);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT || "", 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((error) => {
          console.error(error);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const _port = destr(process.env.NITRO_PORT || process.env.PORT);
const port = _port === 0 ? 0 : _port || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const path = process.env.NITRO_UNIX_SOCKET;
const listener = server.listen(path ? { path } : { port, host }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  if (typeof addressInfo === "string") {
    console.log(`Listening on unix socket ${addressInfo}`);
    return;
  }
  const baseURL = (useRuntimeConfig$2().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening on ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

export { stringifyQuery as $, appHead as A, destr as B, appComponentHead as C, NUXT_SSR_STREAMING as D, renderSSRHeadOptions as E, defineRenderHandler as F, toRequestEvent as G, HookableCore as H, setResponseHeader$1 as I, getRequestHeader$1 as J, toRouteMatcher as K, createRouter$1 as L, parseURL as M, NUXT_PRERENDER_NO_SSR_ROUTES as N, withoutBase as O, withLeadingSlash as P, resolveLocaleFromRoute as Q, computeLocaleAlternates as R, withHttps as S, createDefu as T, hash$1 as U, defineCachedFunction as V, getSiteConfig as W, useRuntimeConfig$1 as X, withQuery as Y, hasProtocol as Z, parsePath as _, defineEventHandler$1 as a, parseQuery as a0, encodePath as a1, stringifyParsedURL as a2, withoutTrailingSlash as a3, defu as a4, createFetch as a5, serverFetch as a6, $fetch as a7, resolveI18nDomain as a8, resolveSitePath as a9, getQuery as aa, createSitePathResolver as ab, fixSlashes as ac, getPathRobotConfig as ad, createError$1 as ae, withoutLeadingSlash as af, sendRedirect as ag, withBase as ah, baseURL as ai, nodeServer as aj, appSpaLoaderTag as b, appSpaLoaderAttrs as c, defineEventHandler$2 as d, appRootTag as e, appRootAttrs as f, getRequestIP as g, publicAssetsURL as h, buildAssetsURL as i, createError$3 as j, useNitroApp as k, getRouteRules$1 as l, appId as m, createHead as n, unheadOptions as o, proxyRequest as p, appTeleportTag as q, appTeleportAttrs as r, NUXT_NO_SCRIPTS_PATTERNS as s, toPortableEvent as t, useRuntimeConfig$2 as u, relative as v, writeEarlyHints as w, joinURL as x, NUXT_PAGE_PATTERNS as y, getQuery$2 as z };
//# sourceMappingURL=nitro.mjs.map
