import { Buffer as Buffer$1 } from 'node:buffer';
import Bt from 'node:http';
import zs from 'node:https';
import st from 'node:zlib';
import me, { pipeline, PassThrough } from 'node:stream';
import { types, deprecate, promisify } from 'node:util';
import { format as format$1 } from 'node:url';
import { isIP } from 'node:net';
import { promises, statSync, createReadStream } from 'node:fs';
import { basename } from 'node:path';
import { parseQuery, START_LOCATION, stringifyQuery, useRoute as useRoute$1, RouterView, createMemoryHistory, createRouter, isNavigationFailure, NavigationFailureType } from 'vue-router';
import { ai as baseURL } from '../nitro/nitro.mjs';
import { s as shallowReactive, b as reactive, c as effectScope, h as hasInjectionContext, d as inject, g as getCurrentScope, f as getCurrentInstance, j as toRef, k as customRef, l as ref, o as onScopeDispose, m as ssrRenderComponent, n as ssrRenderAttrs, p as renderVNode, q as h, w as watch, v as shallowRef, x as computed, y as defineComponent, z as resolveComponent, A as camelize, e as escapeHtml, u as unref, B as createVNode, T as Text, F as Fragment, C as isRef, D as toValue, E as shallowReadonly, G as createApp, H as provide, I as onErrorCaptured, J as onServerPrefetch, K as ssrRenderSuspense, L as resolveDynamicComponent, M as withCtx, N as ssrInterpolate, O as createTextVNode, P as toDisplayString, Q as defineAsyncComponent, R as isVNode, S as createCommentVNode, U as watchEffect, V as isReadonly, t as toRaw, W as mergeProps, X as nextTick, Y as Suspense, Z as useSSRContext, a as isShallow, i as isReactive } from '../_/vue.mjs';
import { defineStore, setActivePinia, createPinia, shouldHydrate } from 'pinia';

// ../../node_modules/.pnpm/node-fetch-native@1.6.7/node_modules/node-fetch-native/dist/shared/node-fetch-native.DfbY2q-x.mjs
var t = Object.defineProperty;
var o$1 = (e, l) => t(e, "name", {
	value: l,
	configurable: true
});
var n$1 = typeof globalThis < "u" ? globalThis : typeof global < "u" ? global : typeof self < "u" ? self : {};
function f(e) {
	return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
o$1(f, "getDefaultExportFromCjs");
// ../../node_modules/.pnpm/node-fetch-native@1.6.7/node_modules/node-fetch-native/dist/node.mjs
var Os = Object.defineProperty;
var fi = (i) => {
	throw TypeError(i);
};
var n$2 = (i, o) => Os(i, "name", {
	value: o,
	configurable: true
});
var ci = (i, o, a) => o.has(i) || fi("Cannot " + a);
var O = (i, o, a) => (ci(i, o, "read from private field"), a ? a.call(i) : o.get(i));
var be = (i, o, a) => o.has(i) ? fi("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(i) : o.set(i, a);
var X = (i, o, a, f) => (ci(i, o, "write to private field"), o.set(i, a), a);
var ve;
var zt;
var bt;
var Cr;
var ze;
var It;
var Ft;
var mt;
var ee;
var yt;
var He;
var Ve;
var gt;
function Us(i) {
	if (!/^data:/i.test(i)) throw new TypeError("`uri` does not appear to be a Data URI (must begin with \"data:\")");
	i = i.replace(/\r?\n/g, "");
	const o = i.indexOf(",");
	if (o === -1 || o <= 4) throw new TypeError("malformed data: URI");
	const a = i.substring(5, o).split(";");
	let f = "", l = false;
	const p = a[0] || "text/plain";
	let h = p;
	for (let A = 1; A < a.length; A++) a[A] === "base64" ? l = true : a[A] && (h += `;${a[A]}`, a[A].indexOf("charset=") === 0 && (f = a[A].substring(8)));
	!a[0] && !f.length && (h += ";charset=US-ASCII", f = "US-ASCII");
	const S = l ? "base64" : "ascii", v = unescape(i.substring(o + 1)), w = Buffer.from(v, S);
	return w.type = p, w.typeFull = h, w.charset = f, w;
}
n$2(Us, "dataUriToBuffer");
var pi = {};
var kt = { exports: {} };
/**
* @license
* web-streams-polyfill v3.3.3
* Copyright 2024 Mattias Buelens, Diwank Singh Tomer and other contributors.
* This code is released under the MIT license.
* SPDX-License-Identifier: MIT
*/ var xs = kt.exports;
var bi;
function Ns() {
	return bi || (bi = 1, function(i, o) {
		(function(a, f) {
			f(o);
		})(xs, function(a) {
			function f() {}
			n$2(f, "noop");
			function l(e) {
				return typeof e == "object" && e !== null || typeof e == "function";
			}
			n$2(l, "typeIsObject");
			const p = f;
			function h(e, t) {
				try {
					Object.defineProperty(e, "name", {
						value: t,
						configurable: !0
					});
				} catch {}
			}
			n$2(h, "setFunctionName");
			const S = Promise, v = Promise.prototype.then, w = Promise.reject.bind(S);
			function A(e) {
				return new S(e);
			}
			n$2(A, "newPromise");
			function T(e) {
				return A((t) => t(e));
			}
			n$2(T, "promiseResolvedWith");
			function b(e) {
				return w(e);
			}
			n$2(b, "promiseRejectedWith");
			function q(e, t, r) {
				return v.call(e, t, r);
			}
			n$2(q, "PerformPromiseThen");
			function g(e, t, r) {
				q(q(e, t, r), void 0, p);
			}
			n$2(g, "uponPromise");
			function V(e, t) {
				g(e, t);
			}
			n$2(V, "uponFulfillment");
			function I(e, t) {
				g(e, void 0, t);
			}
			n$2(I, "uponRejection");
			function F(e, t, r) {
				return q(e, t, r);
			}
			n$2(F, "transformPromiseWith");
			function Q(e) {
				q(e, void 0, p);
			}
			n$2(Q, "setPromiseIsHandledToTrue");
			let ge = n$2((e) => {
				if (typeof queueMicrotask == "function") ge = queueMicrotask;
				else {
					const t = T(void 0);
					ge = n$2((r) => q(t, r), "_queueMicrotask");
				}
				return ge(e);
			}, "_queueMicrotask");
			function z(e, t, r) {
				if (typeof e != "function") throw new TypeError("Argument is not a function");
				return Function.prototype.apply.call(e, t, r);
			}
			n$2(z, "reflectCall");
			function j(e, t, r) {
				try {
					return T(z(e, t, r));
				} catch (s) {
					return b(s);
				}
			}
			n$2(j, "promiseCall");
			const U = 16384, bn = class bn {
				constructor() {
					this._cursor = 0, this._size = 0, this._front = {
						_elements: [],
						_next: void 0
					}, this._back = this._front, this._cursor = 0, this._size = 0;
				}
				get length() {
					return this._size;
				}
				push(t) {
					const r = this._back;
					let s = r;
					r._elements.length === 16383 && (s = {
						_elements: [],
						_next: void 0
					}), r._elements.push(t), s !== r && (this._back = s, r._next = s), ++this._size;
				}
				shift() {
					const t = this._front;
					let r = t;
					const s = this._cursor;
					let u = s + 1;
					const c = t._elements, d = c[s];
					return u === U && (r = t._next, u = 0), --this._size, this._cursor = u, t !== r && (this._front = r), c[s] = void 0, d;
				}
				forEach(t) {
					let r = this._cursor, s = this._front, u = s._elements;
					for (; (r !== u.length || s._next !== void 0) && !(r === u.length && (s = s._next, u = s._elements, r = 0, u.length === 0));) t(u[r]), ++r;
				}
				peek() {
					const t = this._front, r = this._cursor;
					return t._elements[r];
				}
			};
			n$2(bn, "SimpleQueue");
			let D = bn;
			const jt = Symbol("[[AbortSteps]]"), Qn = Symbol("[[ErrorSteps]]"), Ar = Symbol("[[CancelSteps]]"), Br = Symbol("[[PullSteps]]"), kr = Symbol("[[ReleaseSteps]]");
			function Yn(e, t) {
				e._ownerReadableStream = t, t._reader = e, t._state === "readable" ? qr(e) : t._state === "closed" ? xi(e) : Gn(e, t._storedError);
			}
			n$2(Yn, "ReadableStreamReaderGenericInitialize");
			function Wr(e, t) {
				const r = e._ownerReadableStream;
				return ie(r, t);
			}
			n$2(Wr, "ReadableStreamReaderGenericCancel");
			function _e(e) {
				const t = e._ownerReadableStream;
				t._state === "readable" ? Or(e, /* @__PURE__ */ new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")) : Ni(e, /* @__PURE__ */ new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")), t._readableStreamController[kr](), t._reader = void 0, e._ownerReadableStream = void 0;
			}
			n$2(_e, "ReadableStreamReaderGenericRelease");
			function Lt(e) {
				return /* @__PURE__ */ new TypeError("Cannot " + e + " a stream using a released reader");
			}
			n$2(Lt, "readerLockException");
			function qr(e) {
				e._closedPromise = A((t, r) => {
					e._closedPromise_resolve = t, e._closedPromise_reject = r;
				});
			}
			n$2(qr, "defaultReaderClosedPromiseInitialize");
			function Gn(e, t) {
				qr(e), Or(e, t);
			}
			n$2(Gn, "defaultReaderClosedPromiseInitializeAsRejected");
			function xi(e) {
				qr(e), Zn(e);
			}
			n$2(xi, "defaultReaderClosedPromiseInitializeAsResolved");
			function Or(e, t) {
				e._closedPromise_reject !== void 0 && (Q(e._closedPromise), e._closedPromise_reject(t), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0);
			}
			n$2(Or, "defaultReaderClosedPromiseReject");
			function Ni(e, t) {
				Gn(e, t);
			}
			n$2(Ni, "defaultReaderClosedPromiseResetToRejected");
			function Zn(e) {
				e._closedPromise_resolve !== void 0 && (e._closedPromise_resolve(void 0), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0);
			}
			n$2(Zn, "defaultReaderClosedPromiseResolve");
			const Kn = Number.isFinite || function(e) {
				return typeof e == "number" && isFinite(e);
			}, Hi = Math.trunc || function(e) {
				return e < 0 ? Math.ceil(e) : Math.floor(e);
			};
			function Vi(e) {
				return typeof e == "object" || typeof e == "function";
			}
			n$2(Vi, "isDictionary");
			function ue(e, t) {
				if (e !== void 0 && !Vi(e)) throw new TypeError(`${t} is not an object.`);
			}
			n$2(ue, "assertDictionary");
			function Z(e, t) {
				if (typeof e != "function") throw new TypeError(`${t} is not a function.`);
			}
			n$2(Z, "assertFunction");
			function Qi(e) {
				return typeof e == "object" && e !== null || typeof e == "function";
			}
			n$2(Qi, "isObject");
			function Jn(e, t) {
				if (!Qi(e)) throw new TypeError(`${t} is not an object.`);
			}
			n$2(Jn, "assertObject");
			function Se(e, t, r) {
				if (e === void 0) throw new TypeError(`Parameter ${t} is required in '${r}'.`);
			}
			n$2(Se, "assertRequiredArgument");
			function zr(e, t, r) {
				if (e === void 0) throw new TypeError(`${t} is required in '${r}'.`);
			}
			n$2(zr, "assertRequiredField");
			function Ir(e) {
				return Number(e);
			}
			n$2(Ir, "convertUnrestrictedDouble");
			function Xn(e) {
				return e === 0 ? 0 : e;
			}
			n$2(Xn, "censorNegativeZero");
			function Yi(e) {
				return Xn(Hi(e));
			}
			n$2(Yi, "integerPart");
			function Fr(e, t) {
				const s = Number.MAX_SAFE_INTEGER;
				let u = Number(e);
				if (u = Xn(u), !Kn(u)) throw new TypeError(`${t} is not a finite number`);
				if (u = Yi(u), u < 0 || u > s) throw new TypeError(`${t} is outside the accepted range of 0 to ${s}, inclusive`);
				return !Kn(u) || u === 0 ? 0 : u;
			}
			n$2(Fr, "convertUnsignedLongLongWithEnforceRange");
			function jr(e, t) {
				if (!We(e)) throw new TypeError(`${t} is not a ReadableStream.`);
			}
			n$2(jr, "assertReadableStream");
			function Qe(e) {
				return new fe(e);
			}
			n$2(Qe, "AcquireReadableStreamDefaultReader");
			function eo(e, t) {
				e._reader._readRequests.push(t);
			}
			n$2(eo, "ReadableStreamAddReadRequest");
			function Lr(e, t, r) {
				const u = e._reader._readRequests.shift();
				r ? u._closeSteps() : u._chunkSteps(t);
			}
			n$2(Lr, "ReadableStreamFulfillReadRequest");
			function $t(e) {
				return e._reader._readRequests.length;
			}
			n$2($t, "ReadableStreamGetNumReadRequests");
			function to(e) {
				const t = e._reader;
				return !(t === void 0 || !Ee(t));
			}
			n$2(to, "ReadableStreamHasDefaultReader");
			const mn = class mn {
				constructor(t) {
					if (Se(t, 1, "ReadableStreamDefaultReader"), jr(t, "First parameter"), qe(t)) throw new TypeError("This stream has already been locked for exclusive reading by another reader");
					Yn(this, t), this._readRequests = new D();
				}
				get closed() {
					return Ee(this) ? this._closedPromise : b(Dt("closed"));
				}
				cancel(t = void 0) {
					return Ee(this) ? this._ownerReadableStream === void 0 ? b(Lt("cancel")) : Wr(this, t) : b(Dt("cancel"));
				}
				read() {
					if (!Ee(this)) return b(Dt("read"));
					if (this._ownerReadableStream === void 0) return b(Lt("read from"));
					let t, r;
					const s = A((c, d) => {
						t = c, r = d;
					});
					return _t(this, {
						_chunkSteps: n$2((c) => t({
							value: c,
							done: false
						}), "_chunkSteps"),
						_closeSteps: n$2(() => t({
							value: void 0,
							done: true
						}), "_closeSteps"),
						_errorSteps: n$2((c) => r(c), "_errorSteps")
					}), s;
				}
				releaseLock() {
					if (!Ee(this)) throw Dt("releaseLock");
					this._ownerReadableStream !== void 0 && Gi(this);
				}
			};
			n$2(mn, "ReadableStreamDefaultReader");
			let fe = mn;
			Object.defineProperties(fe.prototype, {
				cancel: { enumerable: true },
				read: { enumerable: true },
				releaseLock: { enumerable: true },
				closed: { enumerable: true }
			}), h(fe.prototype.cancel, "cancel"), h(fe.prototype.read, "read"), h(fe.prototype.releaseLock, "releaseLock"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(fe.prototype, Symbol.toStringTag, {
				value: "ReadableStreamDefaultReader",
				configurable: true
			});
			function Ee(e) {
				return !l(e) || !Object.prototype.hasOwnProperty.call(e, "_readRequests") ? false : e instanceof fe;
			}
			n$2(Ee, "IsReadableStreamDefaultReader");
			function _t(e, t) {
				const r = e._ownerReadableStream;
				r._disturbed = true, r._state === "closed" ? t._closeSteps() : r._state === "errored" ? t._errorSteps(r._storedError) : r._readableStreamController[Br](t);
			}
			n$2(_t, "ReadableStreamDefaultReaderRead");
			function Gi(e) {
				_e(e);
				ro(e, /* @__PURE__ */ new TypeError("Reader was released"));
			}
			n$2(Gi, "ReadableStreamDefaultReaderRelease");
			function ro(e, t) {
				const r = e._readRequests;
				e._readRequests = new D(), r.forEach((s) => {
					s._errorSteps(t);
				});
			}
			n$2(ro, "ReadableStreamDefaultReaderErrorReadRequests");
			function Dt(e) {
				return /* @__PURE__ */ new TypeError(`ReadableStreamDefaultReader.prototype.${e} can only be used on a ReadableStreamDefaultReader`);
			}
			n$2(Dt, "defaultReaderBrandCheckException");
			const Zi = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {}).prototype), yn = class yn {
				constructor(t, r) {
					this._ongoingPromise = void 0, this._isFinished = false, this._reader = t, this._preventCancel = r;
				}
				next() {
					const t = n$2(() => this._nextSteps(), "nextSteps");
					return this._ongoingPromise = this._ongoingPromise ? F(this._ongoingPromise, t, t) : t(), this._ongoingPromise;
				}
				return(t) {
					const r = n$2(() => this._returnSteps(t), "returnSteps");
					return this._ongoingPromise ? F(this._ongoingPromise, r, r) : r();
				}
				_nextSteps() {
					if (this._isFinished) return Promise.resolve({
						value: void 0,
						done: true
					});
					const t = this._reader;
					let r, s;
					const u = A((d, m) => {
						r = d, s = m;
					});
					return _t(t, {
						_chunkSteps: n$2((d) => {
							this._ongoingPromise = void 0, ge(() => r({
								value: d,
								done: false
							}));
						}, "_chunkSteps"),
						_closeSteps: n$2(() => {
							this._ongoingPromise = void 0, this._isFinished = true, _e(t), r({
								value: void 0,
								done: true
							});
						}, "_closeSteps"),
						_errorSteps: n$2((d) => {
							this._ongoingPromise = void 0, this._isFinished = true, _e(t), s(d);
						}, "_errorSteps")
					}), u;
				}
				_returnSteps(t) {
					if (this._isFinished) return Promise.resolve({
						value: t,
						done: true
					});
					this._isFinished = true;
					const r = this._reader;
					if (!this._preventCancel) {
						const s = Wr(r, t);
						return _e(r), F(s, () => ({
							value: t,
							done: true
						}));
					}
					return _e(r), T({
						value: t,
						done: true
					});
				}
			};
			n$2(yn, "ReadableStreamAsyncIteratorImpl");
			let Mt = yn;
			const no = {
				next() {
					return oo(this) ? this._asyncIteratorImpl.next() : b(io("next"));
				},
				return(e) {
					return oo(this) ? this._asyncIteratorImpl.return(e) : b(io("return"));
				}
			};
			Object.setPrototypeOf(no, Zi);
			function Ki(e, t) {
				const r = Qe(e), s = new Mt(r, t), u = Object.create(no);
				return u._asyncIteratorImpl = s, u;
			}
			n$2(Ki, "AcquireReadableStreamAsyncIterator");
			function oo(e) {
				if (!l(e) || !Object.prototype.hasOwnProperty.call(e, "_asyncIteratorImpl")) return false;
				try {
					return e._asyncIteratorImpl instanceof Mt;
				} catch {
					return false;
				}
			}
			n$2(oo, "IsReadableStreamAsyncIterator");
			function io(e) {
				return /* @__PURE__ */ new TypeError(`ReadableStreamAsyncIterator.${e} can only be used on a ReadableSteamAsyncIterator`);
			}
			n$2(io, "streamAsyncIteratorBrandCheckException");
			const ao = Number.isNaN || function(e) {
				return e !== e;
			};
			var $r, Dr, Mr;
			function St(e) {
				return e.slice();
			}
			n$2(St, "CreateArrayFromList");
			function so(e, t, r, s, u) {
				new Uint8Array(e).set(new Uint8Array(r, s, u), t);
			}
			n$2(so, "CopyDataBlockBytes");
			let we = n$2((e) => (typeof e.transfer == "function" ? we = n$2((t) => t.transfer(), "TransferArrayBuffer") : typeof structuredClone == "function" ? we = n$2((t) => structuredClone(t, { transfer: [t] }), "TransferArrayBuffer") : we = n$2((t) => t, "TransferArrayBuffer"), we(e)), "TransferArrayBuffer"), Ae = n$2((e) => (typeof e.detached == "boolean" ? Ae = n$2((t) => t.detached, "IsDetachedBuffer") : Ae = n$2((t) => t.byteLength === 0, "IsDetachedBuffer"), Ae(e)), "IsDetachedBuffer");
			function lo(e, t, r) {
				if (e.slice) return e.slice(t, r);
				const s = r - t, u = new ArrayBuffer(s);
				return so(u, 0, e, t, s), u;
			}
			n$2(lo, "ArrayBufferSlice");
			function Ut(e, t) {
				const r = e[t];
				if (r != null) {
					if (typeof r != "function") throw new TypeError(`${String(t)} is not a function`);
					return r;
				}
			}
			n$2(Ut, "GetMethod");
			function Ji(e) {
				const t = { [Symbol.iterator]: () => e.iterator }, r = async function* () {
					return yield* t;
				}();
				return {
					iterator: r,
					nextMethod: r.next,
					done: false
				};
			}
			n$2(Ji, "CreateAsyncFromSyncIterator");
			const Ur = (Mr = ($r = Symbol.asyncIterator) !== null && $r !== void 0 ? $r : (Dr = Symbol.for) === null || Dr === void 0 ? void 0 : Dr.call(Symbol, "Symbol.asyncIterator")) !== null && Mr !== void 0 ? Mr : "@@asyncIterator";
			function uo(e, t = "sync", r) {
				if (r === void 0) if (t === "async") {
					if (r = Ut(e, Ur), r === void 0) return Ji(uo(e, "sync", Ut(e, Symbol.iterator)));
				} else r = Ut(e, Symbol.iterator);
				if (r === void 0) throw new TypeError("The object is not iterable");
				const s = z(r, e, []);
				if (!l(s)) throw new TypeError("The iterator method must return an object");
				return {
					iterator: s,
					nextMethod: s.next,
					done: false
				};
			}
			n$2(uo, "GetIterator");
			function Xi(e) {
				const t = z(e.nextMethod, e.iterator, []);
				if (!l(t)) throw new TypeError("The iterator.next() method must return an object");
				return t;
			}
			n$2(Xi, "IteratorNext");
			function ea(e) {
				return !!e.done;
			}
			n$2(ea, "IteratorComplete");
			function ta(e) {
				return e.value;
			}
			n$2(ta, "IteratorValue");
			function ra(e) {
				return !(typeof e != "number" || ao(e) || e < 0);
			}
			n$2(ra, "IsNonNegativeNumber");
			function fo(e) {
				const t = lo(e.buffer, e.byteOffset, e.byteOffset + e.byteLength);
				return new Uint8Array(t);
			}
			n$2(fo, "CloneAsUint8Array");
			function xr(e) {
				const t = e._queue.shift();
				return e._queueTotalSize -= t.size, e._queueTotalSize < 0 && (e._queueTotalSize = 0), t.value;
			}
			n$2(xr, "DequeueValue");
			function Nr(e, t, r) {
				if (!ra(r) || r === 1 / 0) throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
				e._queue.push({
					value: t,
					size: r
				}), e._queueTotalSize += r;
			}
			n$2(Nr, "EnqueueValueWithSize");
			function na(e) {
				return e._queue.peek().value;
			}
			n$2(na, "PeekQueueValue");
			function Be(e) {
				e._queue = new D(), e._queueTotalSize = 0;
			}
			n$2(Be, "ResetQueue");
			function co(e) {
				return e === DataView;
			}
			n$2(co, "isDataViewConstructor");
			function oa(e) {
				return co(e.constructor);
			}
			n$2(oa, "isDataView");
			function ia(e) {
				return co(e) ? 1 : e.BYTES_PER_ELEMENT;
			}
			n$2(ia, "arrayBufferViewElementSize");
			const gn = class gn {
				constructor() {
					throw new TypeError("Illegal constructor");
				}
				get view() {
					if (!Hr(this)) throw Zr("view");
					return this._view;
				}
				respond(t) {
					if (!Hr(this)) throw Zr("respond");
					if (Se(t, 1, "respond"), t = Fr(t, "First parameter"), this._associatedReadableByteStreamController === void 0) throw new TypeError("This BYOB request has been invalidated");
					if (Ae(this._view.buffer)) throw new TypeError("The BYOB request's buffer has been detached and so cannot be used as a response");
					Vt(this._associatedReadableByteStreamController, t);
				}
				respondWithNewView(t) {
					if (!Hr(this)) throw Zr("respondWithNewView");
					if (Se(t, 1, "respondWithNewView"), !ArrayBuffer.isView(t)) throw new TypeError("You can only respond with array buffer views");
					if (this._associatedReadableByteStreamController === void 0) throw new TypeError("This BYOB request has been invalidated");
					if (Ae(t.buffer)) throw new TypeError("The given view's buffer has been detached and so cannot be used as a response");
					Qt(this._associatedReadableByteStreamController, t);
				}
			};
			n$2(gn, "ReadableStreamBYOBRequest");
			let Re = gn;
			Object.defineProperties(Re.prototype, {
				respond: { enumerable: true },
				respondWithNewView: { enumerable: true },
				view: { enumerable: true }
			}), h(Re.prototype.respond, "respond"), h(Re.prototype.respondWithNewView, "respondWithNewView"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(Re.prototype, Symbol.toStringTag, {
				value: "ReadableStreamBYOBRequest",
				configurable: true
			});
			const _n = class _n {
				constructor() {
					throw new TypeError("Illegal constructor");
				}
				get byobRequest() {
					if (!Ie(this)) throw Rt("byobRequest");
					return Gr(this);
				}
				get desiredSize() {
					if (!Ie(this)) throw Rt("desiredSize");
					return Ro(this);
				}
				close() {
					if (!Ie(this)) throw Rt("close");
					if (this._closeRequested) throw new TypeError("The stream has already been closed; do not close it again!");
					const t = this._controlledReadableByteStream._state;
					if (t !== "readable") throw new TypeError(`The stream (in ${t} state) is not in the readable state and cannot be closed`);
					wt(this);
				}
				enqueue(t) {
					if (!Ie(this)) throw Rt("enqueue");
					if (Se(t, 1, "enqueue"), !ArrayBuffer.isView(t)) throw new TypeError("chunk must be an array buffer view");
					if (t.byteLength === 0) throw new TypeError("chunk must have non-zero byteLength");
					if (t.buffer.byteLength === 0) throw new TypeError("chunk's buffer must have non-zero byteLength");
					if (this._closeRequested) throw new TypeError("stream is closed or draining");
					const r = this._controlledReadableByteStream._state;
					if (r !== "readable") throw new TypeError(`The stream (in ${r} state) is not in the readable state and cannot be enqueued to`);
					Ht(this, t);
				}
				error(t = void 0) {
					if (!Ie(this)) throw Rt("error");
					K(this, t);
				}
				[Ar](t) {
					ho(this), Be(this);
					const r = this._cancelAlgorithm(t);
					return Nt(this), r;
				}
				[Br](t) {
					const r = this._controlledReadableByteStream;
					if (this._queueTotalSize > 0) {
						wo(this, t);
						return;
					}
					const s = this._autoAllocateChunkSize;
					if (s !== void 0) {
						let u;
						try {
							u = new ArrayBuffer(s);
						} catch (d) {
							t._errorSteps(d);
							return;
						}
						const c = {
							buffer: u,
							bufferByteLength: s,
							byteOffset: 0,
							byteLength: s,
							bytesFilled: 0,
							minimumFill: 1,
							elementSize: 1,
							viewConstructor: Uint8Array,
							readerType: "default"
						};
						this._pendingPullIntos.push(c);
					}
					eo(r, t), Fe(this);
				}
				[kr]() {
					if (this._pendingPullIntos.length > 0) {
						const t = this._pendingPullIntos.peek();
						t.readerType = "none", this._pendingPullIntos = new D(), this._pendingPullIntos.push(t);
					}
				}
			};
			n$2(_n, "ReadableByteStreamController");
			let te = _n;
			Object.defineProperties(te.prototype, {
				close: { enumerable: true },
				enqueue: { enumerable: true },
				error: { enumerable: true },
				byobRequest: { enumerable: true },
				desiredSize: { enumerable: true }
			}), h(te.prototype.close, "close"), h(te.prototype.enqueue, "enqueue"), h(te.prototype.error, "error"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(te.prototype, Symbol.toStringTag, {
				value: "ReadableByteStreamController",
				configurable: true
			});
			function Ie(e) {
				return !l(e) || !Object.prototype.hasOwnProperty.call(e, "_controlledReadableByteStream") ? false : e instanceof te;
			}
			n$2(Ie, "IsReadableByteStreamController");
			function Hr(e) {
				return !l(e) || !Object.prototype.hasOwnProperty.call(e, "_associatedReadableByteStreamController") ? false : e instanceof Re;
			}
			n$2(Hr, "IsReadableStreamBYOBRequest");
			function Fe(e) {
				if (!fa(e)) return;
				if (e._pulling) {
					e._pullAgain = true;
					return;
				}
				e._pulling = true;
				g(e._pullAlgorithm(), () => (e._pulling = false, e._pullAgain && (e._pullAgain = false, Fe(e)), null), (s) => (K(e, s), null));
			}
			n$2(Fe, "ReadableByteStreamControllerCallPullIfNeeded");
			function ho(e) {
				Qr(e), e._pendingPullIntos = new D();
			}
			n$2(ho, "ReadableByteStreamControllerClearPendingPullIntos");
			function Vr(e, t) {
				let r = false;
				e._state === "closed" && (r = true);
				const s = po(t);
				t.readerType === "default" ? Lr(e, s, r) : ma(e, s, r);
			}
			n$2(Vr, "ReadableByteStreamControllerCommitPullIntoDescriptor");
			function po(e) {
				const t = e.bytesFilled, r = e.elementSize;
				return new e.viewConstructor(e.buffer, e.byteOffset, t / r);
			}
			n$2(po, "ReadableByteStreamControllerConvertPullIntoDescriptor");
			function xt(e, t, r, s) {
				e._queue.push({
					buffer: t,
					byteOffset: r,
					byteLength: s
				}), e._queueTotalSize += s;
			}
			n$2(xt, "ReadableByteStreamControllerEnqueueChunkToQueue");
			function bo(e, t, r, s) {
				let u;
				try {
					u = lo(t, r, r + s);
				} catch (c) {
					throw K(e, c), c;
				}
				xt(e, u, 0, s);
			}
			n$2(bo, "ReadableByteStreamControllerEnqueueClonedChunkToQueue");
			function mo(e, t) {
				t.bytesFilled > 0 && bo(e, t.buffer, t.byteOffset, t.bytesFilled), Ye(e);
			}
			n$2(mo, "ReadableByteStreamControllerEnqueueDetachedPullIntoToQueue");
			function yo(e, t) {
				const r = Math.min(e._queueTotalSize, t.byteLength - t.bytesFilled), s = t.bytesFilled + r;
				let u = r, c = false;
				const m = s - s % t.elementSize;
				m >= t.minimumFill && (u = m - t.bytesFilled, c = true);
				const R = e._queue;
				for (; u > 0;) {
					const y = R.peek(), C = Math.min(u, y.byteLength), P = t.byteOffset + t.bytesFilled;
					so(t.buffer, P, y.buffer, y.byteOffset, C), y.byteLength === C ? R.shift() : (y.byteOffset += C, y.byteLength -= C), e._queueTotalSize -= C, go(e, C, t), u -= C;
				}
				return c;
			}
			n$2(yo, "ReadableByteStreamControllerFillPullIntoDescriptorFromQueue");
			function go(e, t, r) {
				r.bytesFilled += t;
			}
			n$2(go, "ReadableByteStreamControllerFillHeadPullIntoDescriptor");
			function _o(e) {
				e._queueTotalSize === 0 && e._closeRequested ? (Nt(e), At(e._controlledReadableByteStream)) : Fe(e);
			}
			n$2(_o, "ReadableByteStreamControllerHandleQueueDrain");
			function Qr(e) {
				e._byobRequest !== null && (e._byobRequest._associatedReadableByteStreamController = void 0, e._byobRequest._view = null, e._byobRequest = null);
			}
			n$2(Qr, "ReadableByteStreamControllerInvalidateBYOBRequest");
			function Yr(e) {
				for (; e._pendingPullIntos.length > 0;) {
					if (e._queueTotalSize === 0) return;
					const t = e._pendingPullIntos.peek();
					yo(e, t) && (Ye(e), Vr(e._controlledReadableByteStream, t));
				}
			}
			n$2(Yr, "ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue");
			function aa(e) {
				const t = e._controlledReadableByteStream._reader;
				for (; t._readRequests.length > 0;) {
					if (e._queueTotalSize === 0) return;
					wo(e, t._readRequests.shift());
				}
			}
			n$2(aa, "ReadableByteStreamControllerProcessReadRequestsUsingQueue");
			function sa(e, t, r, s) {
				const u = e._controlledReadableByteStream, c = t.constructor, d = ia(c), { byteOffset: m, byteLength: R } = t, y = r * d;
				let C;
				try {
					C = we(t.buffer);
				} catch (B) {
					s._errorSteps(B);
					return;
				}
				const P = {
					buffer: C,
					bufferByteLength: C.byteLength,
					byteOffset: m,
					byteLength: R,
					bytesFilled: 0,
					minimumFill: y,
					elementSize: d,
					viewConstructor: c,
					readerType: "byob"
				};
				if (e._pendingPullIntos.length > 0) {
					e._pendingPullIntos.push(P), Po(u, s);
					return;
				}
				if (u._state === "closed") {
					const B = new c(P.buffer, P.byteOffset, 0);
					s._closeSteps(B);
					return;
				}
				if (e._queueTotalSize > 0) {
					if (yo(e, P)) {
						const B = po(P);
						_o(e), s._chunkSteps(B);
						return;
					}
					if (e._closeRequested) {
						const B = /* @__PURE__ */ new TypeError("Insufficient bytes to fill elements in the given buffer");
						K(e, B), s._errorSteps(B);
						return;
					}
				}
				e._pendingPullIntos.push(P), Po(u, s), Fe(e);
			}
			n$2(sa, "ReadableByteStreamControllerPullInto");
			function la(e, t) {
				t.readerType === "none" && Ye(e);
				const r = e._controlledReadableByteStream;
				if (Kr(r)) for (; vo(r) > 0;) Vr(r, Ye(e));
			}
			n$2(la, "ReadableByteStreamControllerRespondInClosedState");
			function ua(e, t, r) {
				if (go(e, t, r), r.readerType === "none") {
					mo(e, r), Yr(e);
					return;
				}
				if (r.bytesFilled < r.minimumFill) return;
				Ye(e);
				const s = r.bytesFilled % r.elementSize;
				if (s > 0) {
					const u = r.byteOffset + r.bytesFilled;
					bo(e, r.buffer, u - s, s);
				}
				r.bytesFilled -= s, Vr(e._controlledReadableByteStream, r), Yr(e);
			}
			n$2(ua, "ReadableByteStreamControllerRespondInReadableState");
			function So(e, t) {
				const r = e._pendingPullIntos.peek();
				Qr(e), e._controlledReadableByteStream._state === "closed" ? la(e, r) : ua(e, t, r), Fe(e);
			}
			n$2(So, "ReadableByteStreamControllerRespondInternal");
			function Ye(e) {
				return e._pendingPullIntos.shift();
			}
			n$2(Ye, "ReadableByteStreamControllerShiftPendingPullInto");
			function fa(e) {
				const t = e._controlledReadableByteStream;
				return t._state !== "readable" || e._closeRequested || !e._started ? false : !!(to(t) && $t(t) > 0 || Kr(t) && vo(t) > 0 || Ro(e) > 0);
			}
			n$2(fa, "ReadableByteStreamControllerShouldCallPull");
			function Nt(e) {
				e._pullAlgorithm = void 0, e._cancelAlgorithm = void 0;
			}
			n$2(Nt, "ReadableByteStreamControllerClearAlgorithms");
			function wt(e) {
				const t = e._controlledReadableByteStream;
				if (!(e._closeRequested || t._state !== "readable")) {
					if (e._queueTotalSize > 0) {
						e._closeRequested = true;
						return;
					}
					if (e._pendingPullIntos.length > 0) {
						const r = e._pendingPullIntos.peek();
						if (r.bytesFilled % r.elementSize !== 0) {
							const s = /* @__PURE__ */ new TypeError("Insufficient bytes to fill elements in the given buffer");
							throw K(e, s), s;
						}
					}
					Nt(e), At(t);
				}
			}
			n$2(wt, "ReadableByteStreamControllerClose");
			function Ht(e, t) {
				const r = e._controlledReadableByteStream;
				if (e._closeRequested || r._state !== "readable") return;
				const { buffer: s, byteOffset: u, byteLength: c } = t;
				if (Ae(s)) throw new TypeError("chunk's buffer is detached and so cannot be enqueued");
				const d = we(s);
				if (e._pendingPullIntos.length > 0) {
					const m = e._pendingPullIntos.peek();
					if (Ae(m.buffer)) throw new TypeError("The BYOB request's buffer has been detached and so cannot be filled with an enqueued chunk");
					Qr(e), m.buffer = we(m.buffer), m.readerType === "none" && mo(e, m);
				}
				if (to(r)) if (aa(e), $t(r) === 0) xt(e, d, u, c);
				else {
					e._pendingPullIntos.length > 0 && Ye(e);
					Lr(r, new Uint8Array(d, u, c), false);
				}
				else Kr(r) ? (xt(e, d, u, c), Yr(e)) : xt(e, d, u, c);
				Fe(e);
			}
			n$2(Ht, "ReadableByteStreamControllerEnqueue");
			function K(e, t) {
				const r = e._controlledReadableByteStream;
				r._state === "readable" && (ho(e), Be(e), Nt(e), Zo(r, t));
			}
			n$2(K, "ReadableByteStreamControllerError");
			function wo(e, t) {
				const r = e._queue.shift();
				e._queueTotalSize -= r.byteLength, _o(e);
				const s = new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
				t._chunkSteps(s);
			}
			n$2(wo, "ReadableByteStreamControllerFillReadRequestFromQueue");
			function Gr(e) {
				if (e._byobRequest === null && e._pendingPullIntos.length > 0) {
					const t = e._pendingPullIntos.peek(), r = new Uint8Array(t.buffer, t.byteOffset + t.bytesFilled, t.byteLength - t.bytesFilled), s = Object.create(Re.prototype);
					da(s, e, r), e._byobRequest = s;
				}
				return e._byobRequest;
			}
			n$2(Gr, "ReadableByteStreamControllerGetBYOBRequest");
			function Ro(e) {
				const t = e._controlledReadableByteStream._state;
				return t === "errored" ? null : t === "closed" ? 0 : e._strategyHWM - e._queueTotalSize;
			}
			n$2(Ro, "ReadableByteStreamControllerGetDesiredSize");
			function Vt(e, t) {
				const r = e._pendingPullIntos.peek();
				if (e._controlledReadableByteStream._state === "closed") {
					if (t !== 0) throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
				} else {
					if (t === 0) throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
					if (r.bytesFilled + t > r.byteLength) throw new RangeError("bytesWritten out of range");
				}
				r.buffer = we(r.buffer), So(e, t);
			}
			n$2(Vt, "ReadableByteStreamControllerRespond");
			function Qt(e, t) {
				const r = e._pendingPullIntos.peek();
				if (e._controlledReadableByteStream._state === "closed") {
					if (t.byteLength !== 0) throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
				} else if (t.byteLength === 0) throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
				if (r.byteOffset + r.bytesFilled !== t.byteOffset) throw new RangeError("The region specified by view does not match byobRequest");
				if (r.bufferByteLength !== t.buffer.byteLength) throw new RangeError("The buffer of view has different capacity than byobRequest");
				if (r.bytesFilled + t.byteLength > r.byteLength) throw new RangeError("The region specified by view is larger than byobRequest");
				const u = t.byteLength;
				r.buffer = we(t.buffer), So(e, u);
			}
			n$2(Qt, "ReadableByteStreamControllerRespondWithNewView");
			function To(e, t, r, s, u, c, d) {
				t._controlledReadableByteStream = e, t._pullAgain = false, t._pulling = false, t._byobRequest = null, t._queue = t._queueTotalSize = void 0, Be(t), t._closeRequested = false, t._started = false, t._strategyHWM = c, t._pullAlgorithm = s, t._cancelAlgorithm = u, t._autoAllocateChunkSize = d, t._pendingPullIntos = new D(), e._readableStreamController = t;
				g(T(r()), () => (t._started = true, Fe(t), null), (R) => (K(t, R), null));
			}
			n$2(To, "SetUpReadableByteStreamController");
			function ca(e, t, r) {
				const s = Object.create(te.prototype);
				let u, c, d;
				t.start !== void 0 ? u = n$2(() => t.start(s), "startAlgorithm") : u = n$2(() => {}, "startAlgorithm"), t.pull !== void 0 ? c = n$2(() => t.pull(s), "pullAlgorithm") : c = n$2(() => T(void 0), "pullAlgorithm"), t.cancel !== void 0 ? d = n$2((R) => t.cancel(R), "cancelAlgorithm") : d = n$2(() => T(void 0), "cancelAlgorithm");
				const m = t.autoAllocateChunkSize;
				if (m === 0) throw new TypeError("autoAllocateChunkSize must be greater than 0");
				To(e, s, u, c, d, r, m);
			}
			n$2(ca, "SetUpReadableByteStreamControllerFromUnderlyingSource");
			function da(e, t, r) {
				e._associatedReadableByteStreamController = t, e._view = r;
			}
			n$2(da, "SetUpReadableStreamBYOBRequest");
			function Zr(e) {
				return /* @__PURE__ */ new TypeError(`ReadableStreamBYOBRequest.prototype.${e} can only be used on a ReadableStreamBYOBRequest`);
			}
			n$2(Zr, "byobRequestBrandCheckException");
			function Rt(e) {
				return /* @__PURE__ */ new TypeError(`ReadableByteStreamController.prototype.${e} can only be used on a ReadableByteStreamController`);
			}
			n$2(Rt, "byteStreamControllerBrandCheckException");
			function ha(e, t) {
				ue(e, t);
				const r = e?.mode;
				return { mode: r === void 0 ? void 0 : pa(r, `${t} has member 'mode' that`) };
			}
			n$2(ha, "convertReaderOptions");
			function pa(e, t) {
				if (e = `${e}`, e !== "byob") throw new TypeError(`${t} '${e}' is not a valid enumeration value for ReadableStreamReaderMode`);
				return e;
			}
			n$2(pa, "convertReadableStreamReaderMode");
			function ba(e, t) {
				var r;
				ue(e, t);
				return { min: Fr((r = e?.min) !== null && r !== void 0 ? r : 1, `${t} has member 'min' that`) };
			}
			n$2(ba, "convertByobReadOptions");
			function Co(e) {
				return new ce(e);
			}
			n$2(Co, "AcquireReadableStreamBYOBReader");
			function Po(e, t) {
				e._reader._readIntoRequests.push(t);
			}
			n$2(Po, "ReadableStreamAddReadIntoRequest");
			function ma(e, t, r) {
				const u = e._reader._readIntoRequests.shift();
				r ? u._closeSteps(t) : u._chunkSteps(t);
			}
			n$2(ma, "ReadableStreamFulfillReadIntoRequest");
			function vo(e) {
				return e._reader._readIntoRequests.length;
			}
			n$2(vo, "ReadableStreamGetNumReadIntoRequests");
			function Kr(e) {
				const t = e._reader;
				return !(t === void 0 || !je(t));
			}
			n$2(Kr, "ReadableStreamHasBYOBReader");
			const Sn = class Sn {
				constructor(t) {
					if (Se(t, 1, "ReadableStreamBYOBReader"), jr(t, "First parameter"), qe(t)) throw new TypeError("This stream has already been locked for exclusive reading by another reader");
					if (!Ie(t._readableStreamController)) throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
					Yn(this, t), this._readIntoRequests = new D();
				}
				get closed() {
					return je(this) ? this._closedPromise : b(Yt("closed"));
				}
				cancel(t = void 0) {
					return je(this) ? this._ownerReadableStream === void 0 ? b(Lt("cancel")) : Wr(this, t) : b(Yt("cancel"));
				}
				read(t, r = {}) {
					if (!je(this)) return b(Yt("read"));
					if (!ArrayBuffer.isView(t)) return b(/* @__PURE__ */ new TypeError("view must be an array buffer view"));
					if (t.byteLength === 0) return b(/* @__PURE__ */ new TypeError("view must have non-zero byteLength"));
					if (t.buffer.byteLength === 0) return b(/* @__PURE__ */ new TypeError("view's buffer must have non-zero byteLength"));
					if (Ae(t.buffer)) return b(/* @__PURE__ */ new TypeError("view's buffer has been detached"));
					let s;
					try {
						s = ba(r, "options");
					} catch (y) {
						return b(y);
					}
					const u = s.min;
					if (u === 0) return b(/* @__PURE__ */ new TypeError("options.min must be greater than 0"));
					if (oa(t)) {
						if (u > t.byteLength) return b(/* @__PURE__ */ new RangeError("options.min must be less than or equal to view's byteLength"));
					} else if (u > t.length) return b(/* @__PURE__ */ new RangeError("options.min must be less than or equal to view's length"));
					if (this._ownerReadableStream === void 0) return b(Lt("read from"));
					let c, d;
					const m = A((y, C) => {
						c = y, d = C;
					});
					return Eo(this, t, u, {
						_chunkSteps: n$2((y) => c({
							value: y,
							done: false
						}), "_chunkSteps"),
						_closeSteps: n$2((y) => c({
							value: y,
							done: true
						}), "_closeSteps"),
						_errorSteps: n$2((y) => d(y), "_errorSteps")
					}), m;
				}
				releaseLock() {
					if (!je(this)) throw Yt("releaseLock");
					this._ownerReadableStream !== void 0 && ya(this);
				}
			};
			n$2(Sn, "ReadableStreamBYOBReader");
			let ce = Sn;
			Object.defineProperties(ce.prototype, {
				cancel: { enumerable: true },
				read: { enumerable: true },
				releaseLock: { enumerable: true },
				closed: { enumerable: true }
			}), h(ce.prototype.cancel, "cancel"), h(ce.prototype.read, "read"), h(ce.prototype.releaseLock, "releaseLock"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(ce.prototype, Symbol.toStringTag, {
				value: "ReadableStreamBYOBReader",
				configurable: true
			});
			function je(e) {
				return !l(e) || !Object.prototype.hasOwnProperty.call(e, "_readIntoRequests") ? false : e instanceof ce;
			}
			n$2(je, "IsReadableStreamBYOBReader");
			function Eo(e, t, r, s) {
				const u = e._ownerReadableStream;
				u._disturbed = true, u._state === "errored" ? s._errorSteps(u._storedError) : sa(u._readableStreamController, t, r, s);
			}
			n$2(Eo, "ReadableStreamBYOBReaderRead");
			function ya(e) {
				_e(e);
				Ao(e, /* @__PURE__ */ new TypeError("Reader was released"));
			}
			n$2(ya, "ReadableStreamBYOBReaderRelease");
			function Ao(e, t) {
				const r = e._readIntoRequests;
				e._readIntoRequests = new D(), r.forEach((s) => {
					s._errorSteps(t);
				});
			}
			n$2(Ao, "ReadableStreamBYOBReaderErrorReadIntoRequests");
			function Yt(e) {
				return /* @__PURE__ */ new TypeError(`ReadableStreamBYOBReader.prototype.${e} can only be used on a ReadableStreamBYOBReader`);
			}
			n$2(Yt, "byobReaderBrandCheckException");
			function Tt(e, t) {
				const { highWaterMark: r } = e;
				if (r === void 0) return t;
				if (ao(r) || r < 0) throw new RangeError("Invalid highWaterMark");
				return r;
			}
			n$2(Tt, "ExtractHighWaterMark");
			function Gt(e) {
				const { size: t } = e;
				return t || (() => 1);
			}
			n$2(Gt, "ExtractSizeAlgorithm");
			function Zt(e, t) {
				ue(e, t);
				const r = e?.highWaterMark, s = e?.size;
				return {
					highWaterMark: r === void 0 ? void 0 : Ir(r),
					size: s === void 0 ? void 0 : ga(s, `${t} has member 'size' that`)
				};
			}
			n$2(Zt, "convertQueuingStrategy");
			function ga(e, t) {
				return Z(e, t), (r) => Ir(e(r));
			}
			n$2(ga, "convertQueuingStrategySize");
			function _a(e, t) {
				ue(e, t);
				const r = e?.abort, s = e?.close, u = e?.start, c = e?.type, d = e?.write;
				return {
					abort: r === void 0 ? void 0 : Sa(r, e, `${t} has member 'abort' that`),
					close: s === void 0 ? void 0 : wa(s, e, `${t} has member 'close' that`),
					start: u === void 0 ? void 0 : Ra(u, e, `${t} has member 'start' that`),
					write: d === void 0 ? void 0 : Ta(d, e, `${t} has member 'write' that`),
					type: c
				};
			}
			n$2(_a, "convertUnderlyingSink");
			function Sa(e, t, r) {
				return Z(e, r), (s) => j(e, t, [s]);
			}
			n$2(Sa, "convertUnderlyingSinkAbortCallback");
			function wa(e, t, r) {
				return Z(e, r), () => j(e, t, []);
			}
			n$2(wa, "convertUnderlyingSinkCloseCallback");
			function Ra(e, t, r) {
				return Z(e, r), (s) => z(e, t, [s]);
			}
			n$2(Ra, "convertUnderlyingSinkStartCallback");
			function Ta(e, t, r) {
				return Z(e, r), (s, u) => j(e, t, [s, u]);
			}
			n$2(Ta, "convertUnderlyingSinkWriteCallback");
			function Bo(e, t) {
				if (!Ge(e)) throw new TypeError(`${t} is not a WritableStream.`);
			}
			n$2(Bo, "assertWritableStream");
			function Ca(e) {
				if (typeof e != "object" || e === null) return false;
				try {
					return typeof e.aborted == "boolean";
				} catch {
					return false;
				}
			}
			n$2(Ca, "isAbortSignal");
			const Pa = typeof AbortController == "function";
			function va() {
				if (Pa) return new AbortController();
			}
			n$2(va, "createAbortController");
			const wn = class wn {
				constructor(t = {}, r = {}) {
					t === void 0 ? t = null : Jn(t, "First parameter");
					const s = Zt(r, "Second parameter"), u = _a(t, "First parameter");
					if (Wo(this), u.type !== void 0) throw new RangeError("Invalid type is specified");
					const d = Gt(s), m = Tt(s, 1);
					Da(this, u, m, d);
				}
				get locked() {
					if (!Ge(this)) throw tr("locked");
					return Ze(this);
				}
				abort(t = void 0) {
					return Ge(this) ? Ze(this) ? b(/* @__PURE__ */ new TypeError("Cannot abort a stream that already has a writer")) : Kt(this, t) : b(tr("abort"));
				}
				close() {
					return Ge(this) ? Ze(this) ? b(/* @__PURE__ */ new TypeError("Cannot close a stream that already has a writer")) : he(this) ? b(/* @__PURE__ */ new TypeError("Cannot close an already-closing stream")) : qo(this) : b(tr("close"));
				}
				getWriter() {
					if (!Ge(this)) throw tr("getWriter");
					return ko(this);
				}
			};
			n$2(wn, "WritableStream");
			let de = wn;
			Object.defineProperties(de.prototype, {
				abort: { enumerable: true },
				close: { enumerable: true },
				getWriter: { enumerable: true },
				locked: { enumerable: true }
			}), h(de.prototype.abort, "abort"), h(de.prototype.close, "close"), h(de.prototype.getWriter, "getWriter"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(de.prototype, Symbol.toStringTag, {
				value: "WritableStream",
				configurable: true
			});
			function ko(e) {
				return new re(e);
			}
			n$2(ko, "AcquireWritableStreamDefaultWriter");
			function Ea(e, t, r, s, u = 1, c = () => 1) {
				const d = Object.create(de.prototype);
				Wo(d);
				return Lo(d, Object.create(ke.prototype), e, t, r, s, u, c), d;
			}
			n$2(Ea, "CreateWritableStream");
			function Wo(e) {
				e._state = "writable", e._storedError = void 0, e._writer = void 0, e._writableStreamController = void 0, e._writeRequests = new D(), e._inFlightWriteRequest = void 0, e._closeRequest = void 0, e._inFlightCloseRequest = void 0, e._pendingAbortRequest = void 0, e._backpressure = false;
			}
			n$2(Wo, "InitializeWritableStream");
			function Ge(e) {
				return !l(e) || !Object.prototype.hasOwnProperty.call(e, "_writableStreamController") ? false : e instanceof de;
			}
			n$2(Ge, "IsWritableStream");
			function Ze(e) {
				return e._writer !== void 0;
			}
			n$2(Ze, "IsWritableStreamLocked");
			function Kt(e, t) {
				var r;
				if (e._state === "closed" || e._state === "errored") return T(void 0);
				e._writableStreamController._abortReason = t, (r = e._writableStreamController._abortController) === null || r === void 0 || r.abort(t);
				const s = e._state;
				if (s === "closed" || s === "errored") return T(void 0);
				if (e._pendingAbortRequest !== void 0) return e._pendingAbortRequest._promise;
				let u = false;
				s === "erroring" && (u = true, t = void 0);
				const c = A((d, m) => {
					e._pendingAbortRequest = {
						_promise: void 0,
						_resolve: d,
						_reject: m,
						_reason: t,
						_wasAlreadyErroring: u
					};
				});
				return e._pendingAbortRequest._promise = c, u || Xr(e, t), c;
			}
			n$2(Kt, "WritableStreamAbort");
			function qo(e) {
				const t = e._state;
				if (t === "closed" || t === "errored") return b(/* @__PURE__ */ new TypeError(`The stream (in ${t} state) is not in the writable state and cannot be closed`));
				const r = A((u, c) => {
					e._closeRequest = {
						_resolve: u,
						_reject: c
					};
				}), s = e._writer;
				return s !== void 0 && e._backpressure && t === "writable" && ln(s), Ma(e._writableStreamController), r;
			}
			n$2(qo, "WritableStreamClose");
			function Aa(e) {
				return A((r, s) => {
					const u = {
						_resolve: r,
						_reject: s
					};
					e._writeRequests.push(u);
				});
			}
			n$2(Aa, "WritableStreamAddWriteRequest");
			function Jr(e, t) {
				if (e._state === "writable") {
					Xr(e, t);
					return;
				}
				en(e);
			}
			n$2(Jr, "WritableStreamDealWithRejection");
			function Xr(e, t) {
				const r = e._writableStreamController;
				e._state = "erroring", e._storedError = t;
				const s = e._writer;
				s !== void 0 && zo(s, t), !Oa(e) && r._started && en(e);
			}
			n$2(Xr, "WritableStreamStartErroring");
			function en(e) {
				e._state = "errored", e._writableStreamController[Qn]();
				const t = e._storedError;
				if (e._writeRequests.forEach((u) => {
					u._reject(t);
				}), e._writeRequests = new D(), e._pendingAbortRequest === void 0) {
					Jt(e);
					return;
				}
				const r = e._pendingAbortRequest;
				if (e._pendingAbortRequest = void 0, r._wasAlreadyErroring) {
					r._reject(t), Jt(e);
					return;
				}
				g(e._writableStreamController[jt](r._reason), () => (r._resolve(), Jt(e), null), (u) => (r._reject(u), Jt(e), null));
			}
			n$2(en, "WritableStreamFinishErroring");
			function Ba(e) {
				e._inFlightWriteRequest._resolve(void 0), e._inFlightWriteRequest = void 0;
			}
			n$2(Ba, "WritableStreamFinishInFlightWrite");
			function ka(e, t) {
				e._inFlightWriteRequest._reject(t), e._inFlightWriteRequest = void 0, Jr(e, t);
			}
			n$2(ka, "WritableStreamFinishInFlightWriteWithError");
			function Wa(e) {
				e._inFlightCloseRequest._resolve(void 0), e._inFlightCloseRequest = void 0, e._state === "erroring" && (e._storedError = void 0, e._pendingAbortRequest !== void 0 && (e._pendingAbortRequest._resolve(), e._pendingAbortRequest = void 0)), e._state = "closed";
				const r = e._writer;
				r !== void 0 && Uo(r);
			}
			n$2(Wa, "WritableStreamFinishInFlightClose");
			function qa(e, t) {
				e._inFlightCloseRequest._reject(t), e._inFlightCloseRequest = void 0, e._pendingAbortRequest !== void 0 && (e._pendingAbortRequest._reject(t), e._pendingAbortRequest = void 0), Jr(e, t);
			}
			n$2(qa, "WritableStreamFinishInFlightCloseWithError");
			function he(e) {
				return !(e._closeRequest === void 0 && e._inFlightCloseRequest === void 0);
			}
			n$2(he, "WritableStreamCloseQueuedOrInFlight");
			function Oa(e) {
				return !(e._inFlightWriteRequest === void 0 && e._inFlightCloseRequest === void 0);
			}
			n$2(Oa, "WritableStreamHasOperationMarkedInFlight");
			function za(e) {
				e._inFlightCloseRequest = e._closeRequest, e._closeRequest = void 0;
			}
			n$2(za, "WritableStreamMarkCloseRequestInFlight");
			function Ia(e) {
				e._inFlightWriteRequest = e._writeRequests.shift();
			}
			n$2(Ia, "WritableStreamMarkFirstWriteRequestInFlight");
			function Jt(e) {
				e._closeRequest !== void 0 && (e._closeRequest._reject(e._storedError), e._closeRequest = void 0);
				const t = e._writer;
				t !== void 0 && an(t, e._storedError);
			}
			n$2(Jt, "WritableStreamRejectCloseAndClosedPromiseIfNeeded");
			function tn(e, t) {
				const r = e._writer;
				r !== void 0 && t !== e._backpressure && (t ? Ya(r) : ln(r)), e._backpressure = t;
			}
			n$2(tn, "WritableStreamUpdateBackpressure");
			const Rn = class Rn {
				constructor(t) {
					if (Se(t, 1, "WritableStreamDefaultWriter"), Bo(t, "First parameter"), Ze(t)) throw new TypeError("This stream has already been locked for exclusive writing by another writer");
					this._ownerWritableStream = t, t._writer = this;
					const r = t._state;
					if (r === "writable") !he(t) && t._backpressure ? nr(this) : xo(this), rr(this);
					else if (r === "erroring") sn(this, t._storedError), rr(this);
					else if (r === "closed") xo(this), Va(this);
					else {
						const s = t._storedError;
						sn(this, s), Mo(this, s);
					}
				}
				get closed() {
					return Le(this) ? this._closedPromise : b($e("closed"));
				}
				get desiredSize() {
					if (!Le(this)) throw $e("desiredSize");
					if (this._ownerWritableStream === void 0) throw Pt("desiredSize");
					return $a(this);
				}
				get ready() {
					return Le(this) ? this._readyPromise : b($e("ready"));
				}
				abort(t = void 0) {
					return Le(this) ? this._ownerWritableStream === void 0 ? b(Pt("abort")) : Fa(this, t) : b($e("abort"));
				}
				close() {
					if (!Le(this)) return b($e("close"));
					const t = this._ownerWritableStream;
					return t === void 0 ? b(Pt("close")) : he(t) ? b(/* @__PURE__ */ new TypeError("Cannot close an already-closing stream")) : Oo(this);
				}
				releaseLock() {
					if (!Le(this)) throw $e("releaseLock");
					this._ownerWritableStream !== void 0 && Io(this);
				}
				write(t = void 0) {
					return Le(this) ? this._ownerWritableStream === void 0 ? b(Pt("write to")) : Fo(this, t) : b($e("write"));
				}
			};
			n$2(Rn, "WritableStreamDefaultWriter");
			let re = Rn;
			Object.defineProperties(re.prototype, {
				abort: { enumerable: true },
				close: { enumerable: true },
				releaseLock: { enumerable: true },
				write: { enumerable: true },
				closed: { enumerable: true },
				desiredSize: { enumerable: true },
				ready: { enumerable: true }
			}), h(re.prototype.abort, "abort"), h(re.prototype.close, "close"), h(re.prototype.releaseLock, "releaseLock"), h(re.prototype.write, "write"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(re.prototype, Symbol.toStringTag, {
				value: "WritableStreamDefaultWriter",
				configurable: true
			});
			function Le(e) {
				return !l(e) || !Object.prototype.hasOwnProperty.call(e, "_ownerWritableStream") ? false : e instanceof re;
			}
			n$2(Le, "IsWritableStreamDefaultWriter");
			function Fa(e, t) {
				const r = e._ownerWritableStream;
				return Kt(r, t);
			}
			n$2(Fa, "WritableStreamDefaultWriterAbort");
			function Oo(e) {
				const t = e._ownerWritableStream;
				return qo(t);
			}
			n$2(Oo, "WritableStreamDefaultWriterClose");
			function ja(e) {
				const t = e._ownerWritableStream, r = t._state;
				return he(t) || r === "closed" ? T(void 0) : r === "errored" ? b(t._storedError) : Oo(e);
			}
			n$2(ja, "WritableStreamDefaultWriterCloseWithErrorPropagation");
			function La(e, t) {
				e._closedPromiseState === "pending" ? an(e, t) : Qa(e, t);
			}
			n$2(La, "WritableStreamDefaultWriterEnsureClosedPromiseRejected");
			function zo(e, t) {
				e._readyPromiseState === "pending" ? No(e, t) : Ga(e, t);
			}
			n$2(zo, "WritableStreamDefaultWriterEnsureReadyPromiseRejected");
			function $a(e) {
				const t = e._ownerWritableStream, r = t._state;
				return r === "errored" || r === "erroring" ? null : r === "closed" ? 0 : $o(t._writableStreamController);
			}
			n$2($a, "WritableStreamDefaultWriterGetDesiredSize");
			function Io(e) {
				const t = e._ownerWritableStream, r = /* @__PURE__ */ new TypeError("Writer was released and can no longer be used to monitor the stream's closedness");
				zo(e, r), La(e, r), t._writer = void 0, e._ownerWritableStream = void 0;
			}
			n$2(Io, "WritableStreamDefaultWriterRelease");
			function Fo(e, t) {
				const r = e._ownerWritableStream, s = r._writableStreamController, u = Ua(s, t);
				if (r !== e._ownerWritableStream) return b(Pt("write to"));
				const c = r._state;
				if (c === "errored") return b(r._storedError);
				if (he(r) || c === "closed") return b(/* @__PURE__ */ new TypeError("The stream is closing or closed and cannot be written to"));
				if (c === "erroring") return b(r._storedError);
				const d = Aa(r);
				return xa(s, t, u), d;
			}
			n$2(Fo, "WritableStreamDefaultWriterWrite");
			const jo = {}, Tn = class Tn {
				constructor() {
					throw new TypeError("Illegal constructor");
				}
				get abortReason() {
					if (!rn(this)) throw on("abortReason");
					return this._abortReason;
				}
				get signal() {
					if (!rn(this)) throw on("signal");
					if (this._abortController === void 0) throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
					return this._abortController.signal;
				}
				error(t = void 0) {
					if (!rn(this)) throw on("error");
					this._controlledWritableStream._state === "writable" && Do(this, t);
				}
				[jt](t) {
					const r = this._abortAlgorithm(t);
					return Xt(this), r;
				}
				[Qn]() {
					Be(this);
				}
			};
			n$2(Tn, "WritableStreamDefaultController");
			let ke = Tn;
			Object.defineProperties(ke.prototype, {
				abortReason: { enumerable: true },
				signal: { enumerable: true },
				error: { enumerable: true }
			}), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(ke.prototype, Symbol.toStringTag, {
				value: "WritableStreamDefaultController",
				configurable: true
			});
			function rn(e) {
				return !l(e) || !Object.prototype.hasOwnProperty.call(e, "_controlledWritableStream") ? false : e instanceof ke;
			}
			n$2(rn, "IsWritableStreamDefaultController");
			function Lo(e, t, r, s, u, c, d, m) {
				t._controlledWritableStream = e, e._writableStreamController = t, t._queue = void 0, t._queueTotalSize = void 0, Be(t), t._abortReason = void 0, t._abortController = va(), t._started = false, t._strategySizeAlgorithm = m, t._strategyHWM = d, t._writeAlgorithm = s, t._closeAlgorithm = u, t._abortAlgorithm = c;
				tn(e, nn(t));
				g(T(r()), () => (t._started = true, er(t), null), (P) => (t._started = true, Jr(e, P), null));
			}
			n$2(Lo, "SetUpWritableStreamDefaultController");
			function Da(e, t, r, s) {
				const u = Object.create(ke.prototype);
				let c, d, m, R;
				t.start !== void 0 ? c = n$2(() => t.start(u), "startAlgorithm") : c = n$2(() => {}, "startAlgorithm"), t.write !== void 0 ? d = n$2((y) => t.write(y, u), "writeAlgorithm") : d = n$2(() => T(void 0), "writeAlgorithm"), t.close !== void 0 ? m = n$2(() => t.close(), "closeAlgorithm") : m = n$2(() => T(void 0), "closeAlgorithm"), t.abort !== void 0 ? R = n$2((y) => t.abort(y), "abortAlgorithm") : R = n$2(() => T(void 0), "abortAlgorithm"), Lo(e, u, c, d, m, R, r, s);
			}
			n$2(Da, "SetUpWritableStreamDefaultControllerFromUnderlyingSink");
			function Xt(e) {
				e._writeAlgorithm = void 0, e._closeAlgorithm = void 0, e._abortAlgorithm = void 0, e._strategySizeAlgorithm = void 0;
			}
			n$2(Xt, "WritableStreamDefaultControllerClearAlgorithms");
			function Ma(e) {
				Nr(e, jo, 0), er(e);
			}
			n$2(Ma, "WritableStreamDefaultControllerClose");
			function Ua(e, t) {
				try {
					return e._strategySizeAlgorithm(t);
				} catch (r) {
					return Ct(e, r), 1;
				}
			}
			n$2(Ua, "WritableStreamDefaultControllerGetChunkSize");
			function $o(e) {
				return e._strategyHWM - e._queueTotalSize;
			}
			n$2($o, "WritableStreamDefaultControllerGetDesiredSize");
			function xa(e, t, r) {
				try {
					Nr(e, t, r);
				} catch (u) {
					Ct(e, u);
					return;
				}
				const s = e._controlledWritableStream;
				if (!he(s) && s._state === "writable") tn(s, nn(e));
				er(e);
			}
			n$2(xa, "WritableStreamDefaultControllerWrite");
			function er(e) {
				const t = e._controlledWritableStream;
				if (!e._started || t._inFlightWriteRequest !== void 0) return;
				if (t._state === "erroring") {
					en(t);
					return;
				}
				if (e._queue.length === 0) return;
				const s = na(e);
				s === jo ? Na(e) : Ha(e, s);
			}
			n$2(er, "WritableStreamDefaultControllerAdvanceQueueIfNeeded");
			function Ct(e, t) {
				e._controlledWritableStream._state === "writable" && Do(e, t);
			}
			n$2(Ct, "WritableStreamDefaultControllerErrorIfNeeded");
			function Na(e) {
				const t = e._controlledWritableStream;
				za(t), xr(e);
				const r = e._closeAlgorithm();
				Xt(e), g(r, () => (Wa(t), null), (s) => (qa(t, s), null));
			}
			n$2(Na, "WritableStreamDefaultControllerProcessClose");
			function Ha(e, t) {
				const r = e._controlledWritableStream;
				Ia(r);
				g(e._writeAlgorithm(t), () => {
					Ba(r);
					const u = r._state;
					if (xr(e), !he(r) && u === "writable") {
						const c = nn(e);
						tn(r, c);
					}
					return er(e), null;
				}, (u) => (r._state === "writable" && Xt(e), ka(r, u), null));
			}
			n$2(Ha, "WritableStreamDefaultControllerProcessWrite");
			function nn(e) {
				return $o(e) <= 0;
			}
			n$2(nn, "WritableStreamDefaultControllerGetBackpressure");
			function Do(e, t) {
				const r = e._controlledWritableStream;
				Xt(e), Xr(r, t);
			}
			n$2(Do, "WritableStreamDefaultControllerError");
			function tr(e) {
				return /* @__PURE__ */ new TypeError(`WritableStream.prototype.${e} can only be used on a WritableStream`);
			}
			n$2(tr, "streamBrandCheckException$2");
			function on(e) {
				return /* @__PURE__ */ new TypeError(`WritableStreamDefaultController.prototype.${e} can only be used on a WritableStreamDefaultController`);
			}
			n$2(on, "defaultControllerBrandCheckException$2");
			function $e(e) {
				return /* @__PURE__ */ new TypeError(`WritableStreamDefaultWriter.prototype.${e} can only be used on a WritableStreamDefaultWriter`);
			}
			n$2($e, "defaultWriterBrandCheckException");
			function Pt(e) {
				return /* @__PURE__ */ new TypeError("Cannot " + e + " a stream using a released writer");
			}
			n$2(Pt, "defaultWriterLockException");
			function rr(e) {
				e._closedPromise = A((t, r) => {
					e._closedPromise_resolve = t, e._closedPromise_reject = r, e._closedPromiseState = "pending";
				});
			}
			n$2(rr, "defaultWriterClosedPromiseInitialize");
			function Mo(e, t) {
				rr(e), an(e, t);
			}
			n$2(Mo, "defaultWriterClosedPromiseInitializeAsRejected");
			function Va(e) {
				rr(e), Uo(e);
			}
			n$2(Va, "defaultWriterClosedPromiseInitializeAsResolved");
			function an(e, t) {
				e._closedPromise_reject !== void 0 && (Q(e._closedPromise), e._closedPromise_reject(t), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0, e._closedPromiseState = "rejected");
			}
			n$2(an, "defaultWriterClosedPromiseReject");
			function Qa(e, t) {
				Mo(e, t);
			}
			n$2(Qa, "defaultWriterClosedPromiseResetToRejected");
			function Uo(e) {
				e._closedPromise_resolve !== void 0 && (e._closedPromise_resolve(void 0), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0, e._closedPromiseState = "resolved");
			}
			n$2(Uo, "defaultWriterClosedPromiseResolve");
			function nr(e) {
				e._readyPromise = A((t, r) => {
					e._readyPromise_resolve = t, e._readyPromise_reject = r;
				}), e._readyPromiseState = "pending";
			}
			n$2(nr, "defaultWriterReadyPromiseInitialize");
			function sn(e, t) {
				nr(e), No(e, t);
			}
			n$2(sn, "defaultWriterReadyPromiseInitializeAsRejected");
			function xo(e) {
				nr(e), ln(e);
			}
			n$2(xo, "defaultWriterReadyPromiseInitializeAsResolved");
			function No(e, t) {
				e._readyPromise_reject !== void 0 && (Q(e._readyPromise), e._readyPromise_reject(t), e._readyPromise_resolve = void 0, e._readyPromise_reject = void 0, e._readyPromiseState = "rejected");
			}
			n$2(No, "defaultWriterReadyPromiseReject");
			function Ya(e) {
				nr(e);
			}
			n$2(Ya, "defaultWriterReadyPromiseReset");
			function Ga(e, t) {
				sn(e, t);
			}
			n$2(Ga, "defaultWriterReadyPromiseResetToRejected");
			function ln(e) {
				e._readyPromise_resolve !== void 0 && (e._readyPromise_resolve(void 0), e._readyPromise_resolve = void 0, e._readyPromise_reject = void 0, e._readyPromiseState = "fulfilled");
			}
			n$2(ln, "defaultWriterReadyPromiseResolve");
			function Za() {
				if (typeof globalThis < "u") return globalThis;
				if (typeof self < "u") return self;
				if (typeof n$1 < "u") return n$1;
			}
			n$2(Za, "getGlobals");
			const un = Za();
			function Ka(e) {
				if (!(typeof e == "function" || typeof e == "object") || e.name !== "DOMException") return false;
				try {
					return new e(), !0;
				} catch {
					return false;
				}
			}
			n$2(Ka, "isDOMExceptionConstructor");
			function Ja() {
				const e = un?.DOMException;
				return Ka(e) ? e : void 0;
			}
			n$2(Ja, "getFromGlobal");
			function Xa() {
				const e = n$2(function(r, s) {
					this.message = r || "", this.name = s || "Error", Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
				}, "DOMException");
				return h(e, "DOMException"), e.prototype = Object.create(Error.prototype), Object.defineProperty(e.prototype, "constructor", {
					value: e,
					writable: true,
					configurable: true
				}), e;
			}
			n$2(Xa, "createPolyfill");
			const es = Ja() || Xa();
			function Ho(e, t, r, s, u, c) {
				const d = Qe(e), m = ko(t);
				e._disturbed = true;
				let R = false, y = T(void 0);
				return A((C, P) => {
					let B;
					if (c !== void 0) {
						if (B = n$2(() => {
							const _ = c.reason !== void 0 ? c.reason : new es("Aborted", "AbortError"), E = [];
							s || E.push(() => t._state === "writable" ? Kt(t, _) : T(void 0)), u || E.push(() => e._state === "readable" ? ie(e, _) : T(void 0)), N(() => Promise.all(E.map((k) => k())), true, _);
						}, "abortAlgorithm"), c.aborted) {
							B();
							return;
						}
						c.addEventListener("abort", B);
					}
					function ae() {
						return A((_, E) => {
							function k(Y) {
								Y ? _() : q(nt(), k, E);
							}
							n$2(k, "next"), k(false);
						});
					}
					n$2(ae, "pipeLoop");
					function nt() {
						return R ? T(true) : q(m._readyPromise, () => A((_, E) => {
							_t(d, {
								_chunkSteps: n$2((k) => {
									y = q(Fo(m, k), void 0, f), _(false);
								}, "_chunkSteps"),
								_closeSteps: n$2(() => _(true), "_closeSteps"),
								_errorSteps: E
							});
						}));
					}
					if (n$2(nt, "pipeStep"), Te(e, d._closedPromise, (_) => (s ? J(true, _) : N(() => Kt(t, _), true, _), null)), Te(t, m._closedPromise, (_) => (u ? J(true, _) : N(() => ie(e, _), true, _), null)), x(e, d._closedPromise, () => (r ? J() : N(() => ja(m)), null)), he(t) || t._state === "closed") {
						const _ = /* @__PURE__ */ new TypeError("the destination writable stream closed before all data could be piped to it");
						u ? J(true, _) : N(() => ie(e, _), true, _);
					}
					Q(ae());
					function Oe() {
						const _ = y;
						return q(y, () => _ !== y ? Oe() : void 0);
					}
					n$2(Oe, "waitForWritesToFinish");
					function Te(_, E, k) {
						_._state === "errored" ? k(_._storedError) : I(E, k);
					}
					n$2(Te, "isOrBecomesErrored");
					function x(_, E, k) {
						_._state === "closed" ? k() : V(E, k);
					}
					n$2(x, "isOrBecomesClosed");
					function N(_, E, k) {
						if (R) return;
						R = true, t._state === "writable" && !he(t) ? V(Oe(), Y) : Y();
						function Y() {
							return g(_(), () => Ce(E, k), (ot) => Ce(true, ot)), null;
						}
						n$2(Y, "doTheRest");
					}
					n$2(N, "shutdownWithAction");
					function J(_, E) {
						R || (R = true, t._state === "writable" && !he(t) ? V(Oe(), () => Ce(_, E)) : Ce(_, E));
					}
					n$2(J, "shutdown");
					function Ce(_, E) {
						return Io(m), _e(d), c !== void 0 && c.removeEventListener("abort", B), _ ? P(E) : C(void 0), null;
					}
					n$2(Ce, "finalize");
				});
			}
			n$2(Ho, "ReadableStreamPipeTo");
			const Cn = class Cn {
				constructor() {
					throw new TypeError("Illegal constructor");
				}
				get desiredSize() {
					if (!or(this)) throw ar("desiredSize");
					return fn(this);
				}
				close() {
					if (!or(this)) throw ar("close");
					if (!Je(this)) throw new TypeError("The stream is not in a state that permits close");
					De(this);
				}
				enqueue(t = void 0) {
					if (!or(this)) throw ar("enqueue");
					if (!Je(this)) throw new TypeError("The stream is not in a state that permits enqueue");
					return Ke(this, t);
				}
				error(t = void 0) {
					if (!or(this)) throw ar("error");
					oe(this, t);
				}
				[Ar](t) {
					Be(this);
					const r = this._cancelAlgorithm(t);
					return ir(this), r;
				}
				[Br](t) {
					const r = this._controlledReadableStream;
					if (this._queue.length > 0) {
						const s = xr(this);
						this._closeRequested && this._queue.length === 0 ? (ir(this), At(r)) : vt(this), t._chunkSteps(s);
					} else eo(r, t), vt(this);
				}
				[kr]() {}
			};
			n$2(Cn, "ReadableStreamDefaultController");
			let ne = Cn;
			Object.defineProperties(ne.prototype, {
				close: { enumerable: true },
				enqueue: { enumerable: true },
				error: { enumerable: true },
				desiredSize: { enumerable: true }
			}), h(ne.prototype.close, "close"), h(ne.prototype.enqueue, "enqueue"), h(ne.prototype.error, "error"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(ne.prototype, Symbol.toStringTag, {
				value: "ReadableStreamDefaultController",
				configurable: true
			});
			function or(e) {
				return !l(e) || !Object.prototype.hasOwnProperty.call(e, "_controlledReadableStream") ? false : e instanceof ne;
			}
			n$2(or, "IsReadableStreamDefaultController");
			function vt(e) {
				if (!Vo(e)) return;
				if (e._pulling) {
					e._pullAgain = true;
					return;
				}
				e._pulling = true;
				g(e._pullAlgorithm(), () => (e._pulling = false, e._pullAgain && (e._pullAgain = false, vt(e)), null), (s) => (oe(e, s), null));
			}
			n$2(vt, "ReadableStreamDefaultControllerCallPullIfNeeded");
			function Vo(e) {
				const t = e._controlledReadableStream;
				return !Je(e) || !e._started ? false : !!(qe(t) && $t(t) > 0 || fn(e) > 0);
			}
			n$2(Vo, "ReadableStreamDefaultControllerShouldCallPull");
			function ir(e) {
				e._pullAlgorithm = void 0, e._cancelAlgorithm = void 0, e._strategySizeAlgorithm = void 0;
			}
			n$2(ir, "ReadableStreamDefaultControllerClearAlgorithms");
			function De(e) {
				if (!Je(e)) return;
				const t = e._controlledReadableStream;
				e._closeRequested = true, e._queue.length === 0 && (ir(e), At(t));
			}
			n$2(De, "ReadableStreamDefaultControllerClose");
			function Ke(e, t) {
				if (!Je(e)) return;
				const r = e._controlledReadableStream;
				if (qe(r) && $t(r) > 0) Lr(r, t, false);
				else {
					let s;
					try {
						s = e._strategySizeAlgorithm(t);
					} catch (u) {
						throw oe(e, u), u;
					}
					try {
						Nr(e, t, s);
					} catch (u) {
						throw oe(e, u), u;
					}
				}
				vt(e);
			}
			n$2(Ke, "ReadableStreamDefaultControllerEnqueue");
			function oe(e, t) {
				const r = e._controlledReadableStream;
				r._state === "readable" && (Be(e), ir(e), Zo(r, t));
			}
			n$2(oe, "ReadableStreamDefaultControllerError");
			function fn(e) {
				const t = e._controlledReadableStream._state;
				return t === "errored" ? null : t === "closed" ? 0 : e._strategyHWM - e._queueTotalSize;
			}
			n$2(fn, "ReadableStreamDefaultControllerGetDesiredSize");
			function ts(e) {
				return !Vo(e);
			}
			n$2(ts, "ReadableStreamDefaultControllerHasBackpressure");
			function Je(e) {
				const t = e._controlledReadableStream._state;
				return !e._closeRequested && t === "readable";
			}
			n$2(Je, "ReadableStreamDefaultControllerCanCloseOrEnqueue");
			function Qo(e, t, r, s, u, c, d) {
				t._controlledReadableStream = e, t._queue = void 0, t._queueTotalSize = void 0, Be(t), t._started = false, t._closeRequested = false, t._pullAgain = false, t._pulling = false, t._strategySizeAlgorithm = d, t._strategyHWM = c, t._pullAlgorithm = s, t._cancelAlgorithm = u, e._readableStreamController = t;
				g(T(r()), () => (t._started = true, vt(t), null), (R) => (oe(t, R), null));
			}
			n$2(Qo, "SetUpReadableStreamDefaultController");
			function rs(e, t, r, s) {
				const u = Object.create(ne.prototype);
				let c, d, m;
				t.start !== void 0 ? c = n$2(() => t.start(u), "startAlgorithm") : c = n$2(() => {}, "startAlgorithm"), t.pull !== void 0 ? d = n$2(() => t.pull(u), "pullAlgorithm") : d = n$2(() => T(void 0), "pullAlgorithm"), t.cancel !== void 0 ? m = n$2((R) => t.cancel(R), "cancelAlgorithm") : m = n$2(() => T(void 0), "cancelAlgorithm"), Qo(e, u, c, d, m, r, s);
			}
			n$2(rs, "SetUpReadableStreamDefaultControllerFromUnderlyingSource");
			function ar(e) {
				return /* @__PURE__ */ new TypeError(`ReadableStreamDefaultController.prototype.${e} can only be used on a ReadableStreamDefaultController`);
			}
			n$2(ar, "defaultControllerBrandCheckException$1");
			function ns(e, t) {
				return Ie(e._readableStreamController) ? is(e) : os(e);
			}
			n$2(ns, "ReadableStreamTee");
			function os(e, t) {
				const r = Qe(e);
				let s = false, u = false, c = false, d = false, m, R, y, C, P;
				const B = A((x) => {
					P = x;
				});
				function ae() {
					return s ? (u = true, T(void 0)) : (s = true, _t(r, {
						_chunkSteps: n$2((N) => {
							ge(() => {
								u = false;
								const J = N, Ce = N;
								c || Ke(y._readableStreamController, J), d || Ke(C._readableStreamController, Ce), s = false, u && ae();
							});
						}, "_chunkSteps"),
						_closeSteps: n$2(() => {
							s = false, c || De(y._readableStreamController), d || De(C._readableStreamController), (!c || !d) && P(void 0);
						}, "_closeSteps"),
						_errorSteps: n$2(() => {
							s = false;
						}, "_errorSteps")
					}), T(void 0));
				}
				n$2(ae, "pullAlgorithm");
				function nt(x) {
					if (c = true, m = x, d) {
						const J = ie(e, St([m, R]));
						P(J);
					}
					return B;
				}
				n$2(nt, "cancel1Algorithm");
				function Oe(x) {
					if (d = true, R = x, c) {
						const J = ie(e, St([m, R]));
						P(J);
					}
					return B;
				}
				n$2(Oe, "cancel2Algorithm");
				function Te() {}
				return n$2(Te, "startAlgorithm"), y = Et(Te, ae, nt), C = Et(Te, ae, Oe), I(r._closedPromise, (x) => (oe(y._readableStreamController, x), oe(C._readableStreamController, x), (!c || !d) && P(void 0), null)), [y, C];
			}
			n$2(os, "ReadableStreamDefaultTee");
			function is(e) {
				let t = Qe(e), r = false, s = false, u = false, c = false, d = false, m, R, y, C, P;
				const B = A((_) => {
					P = _;
				});
				function ae(_) {
					I(_._closedPromise, (E) => (_ !== t || (K(y._readableStreamController, E), K(C._readableStreamController, E), (!c || !d) && P(void 0)), null));
				}
				n$2(ae, "forwardReaderError");
				function nt() {
					je(t) && (_e(t), t = Qe(e), ae(t)), _t(t, {
						_chunkSteps: n$2((E) => {
							ge(() => {
								s = false, u = false;
								const k = E;
								let Y = E;
								if (!c && !d) try {
									Y = fo(E);
								} catch (ot) {
									K(y._readableStreamController, ot), K(C._readableStreamController, ot), P(ie(e, ot));
									return;
								}
								c || Ht(y._readableStreamController, k), d || Ht(C._readableStreamController, Y), r = false, s ? Te() : u && x();
							});
						}, "_chunkSteps"),
						_closeSteps: n$2(() => {
							r = false, c || wt(y._readableStreamController), d || wt(C._readableStreamController), y._readableStreamController._pendingPullIntos.length > 0 && Vt(y._readableStreamController, 0), C._readableStreamController._pendingPullIntos.length > 0 && Vt(C._readableStreamController, 0), (!c || !d) && P(void 0);
						}, "_closeSteps"),
						_errorSteps: n$2(() => {
							r = false;
						}, "_errorSteps")
					});
				}
				n$2(nt, "pullWithDefaultReader");
				function Oe(_, E) {
					Ee(t) && (_e(t), t = Co(e), ae(t));
					const k = E ? C : y, Y = E ? y : C;
					Eo(t, _, 1, {
						_chunkSteps: n$2((it) => {
							ge(() => {
								s = false, u = false;
								const at = E ? d : c;
								if (E ? c : d) at || Qt(k._readableStreamController, it);
								else {
									let ui;
									try {
										ui = fo(it);
									} catch (kn) {
										K(k._readableStreamController, kn), K(Y._readableStreamController, kn), P(ie(e, kn));
										return;
									}
									at || Qt(k._readableStreamController, it), Ht(Y._readableStreamController, ui);
								}
								r = false, s ? Te() : u && x();
							});
						}, "_chunkSteps"),
						_closeSteps: n$2((it) => {
							r = false;
							const at = E ? d : c, cr = E ? c : d;
							at || wt(k._readableStreamController), cr || wt(Y._readableStreamController), it !== void 0 && (at || Qt(k._readableStreamController, it), !cr && Y._readableStreamController._pendingPullIntos.length > 0 && Vt(Y._readableStreamController, 0)), (!at || !cr) && P(void 0);
						}, "_closeSteps"),
						_errorSteps: n$2(() => {
							r = false;
						}, "_errorSteps")
					});
				}
				n$2(Oe, "pullWithBYOBReader");
				function Te() {
					if (r) return s = true, T(void 0);
					r = true;
					const _ = Gr(y._readableStreamController);
					return _ === null ? nt() : Oe(_._view, false), T(void 0);
				}
				n$2(Te, "pull1Algorithm");
				function x() {
					if (r) return u = true, T(void 0);
					r = true;
					const _ = Gr(C._readableStreamController);
					return _ === null ? nt() : Oe(_._view, true), T(void 0);
				}
				n$2(x, "pull2Algorithm");
				function N(_) {
					if (c = true, m = _, d) {
						const k = ie(e, St([m, R]));
						P(k);
					}
					return B;
				}
				n$2(N, "cancel1Algorithm");
				function J(_) {
					if (d = true, R = _, c) {
						const k = ie(e, St([m, R]));
						P(k);
					}
					return B;
				}
				n$2(J, "cancel2Algorithm");
				function Ce() {}
				return n$2(Ce, "startAlgorithm"), y = Go(Ce, Te, N), C = Go(Ce, x, J), ae(t), [y, C];
			}
			n$2(is, "ReadableByteStreamTee");
			function as(e) {
				return l(e) && typeof e.getReader < "u";
			}
			n$2(as, "isReadableStreamLike");
			function ss(e) {
				return as(e) ? us(e.getReader()) : ls(e);
			}
			n$2(ss, "ReadableStreamFrom");
			function ls(e) {
				let t;
				const r = uo(e, "async"), s = f;
				function u() {
					let d;
					try {
						d = Xi(r);
					} catch (R) {
						return b(R);
					}
					return F(T(d), (R) => {
						if (!l(R)) throw new TypeError("The promise returned by the iterator.next() method must fulfill with an object");
						if (ea(R)) De(t._readableStreamController);
						else {
							const C = ta(R);
							Ke(t._readableStreamController, C);
						}
					});
				}
				n$2(u, "pullAlgorithm");
				function c(d) {
					const m = r.iterator;
					let R;
					try {
						R = Ut(m, "return");
					} catch (P) {
						return b(P);
					}
					if (R === void 0) return T(void 0);
					let y;
					try {
						y = z(R, m, [d]);
					} catch (P) {
						return b(P);
					}
					return F(T(y), (P) => {
						if (!l(P)) throw new TypeError("The promise returned by the iterator.return() method must fulfill with an object");
					});
				}
				return n$2(c, "cancelAlgorithm"), t = Et(s, u, c, 0), t;
			}
			n$2(ls, "ReadableStreamFromIterable");
			function us(e) {
				let t;
				const r = f;
				function s() {
					let c;
					try {
						c = e.read();
					} catch (d) {
						return b(d);
					}
					return F(c, (d) => {
						if (!l(d)) throw new TypeError("The promise returned by the reader.read() method must fulfill with an object");
						if (d.done) De(t._readableStreamController);
						else {
							const m = d.value;
							Ke(t._readableStreamController, m);
						}
					});
				}
				n$2(s, "pullAlgorithm");
				function u(c) {
					try {
						return T(e.cancel(c));
					} catch (d) {
						return b(d);
					}
				}
				return n$2(u, "cancelAlgorithm"), t = Et(r, s, u, 0), t;
			}
			n$2(us, "ReadableStreamFromDefaultReader");
			function fs(e, t) {
				ue(e, t);
				const r = e, s = r?.autoAllocateChunkSize, u = r?.cancel, c = r?.pull, d = r?.start, m = r?.type;
				return {
					autoAllocateChunkSize: s === void 0 ? void 0 : Fr(s, `${t} has member 'autoAllocateChunkSize' that`),
					cancel: u === void 0 ? void 0 : cs(u, r, `${t} has member 'cancel' that`),
					pull: c === void 0 ? void 0 : ds(c, r, `${t} has member 'pull' that`),
					start: d === void 0 ? void 0 : hs(d, r, `${t} has member 'start' that`),
					type: m === void 0 ? void 0 : ps(m, `${t} has member 'type' that`)
				};
			}
			n$2(fs, "convertUnderlyingDefaultOrByteSource");
			function cs(e, t, r) {
				return Z(e, r), (s) => j(e, t, [s]);
			}
			n$2(cs, "convertUnderlyingSourceCancelCallback");
			function ds(e, t, r) {
				return Z(e, r), (s) => j(e, t, [s]);
			}
			n$2(ds, "convertUnderlyingSourcePullCallback");
			function hs(e, t, r) {
				return Z(e, r), (s) => z(e, t, [s]);
			}
			n$2(hs, "convertUnderlyingSourceStartCallback");
			function ps(e, t) {
				if (e = `${e}`, e !== "bytes") throw new TypeError(`${t} '${e}' is not a valid enumeration value for ReadableStreamType`);
				return e;
			}
			n$2(ps, "convertReadableStreamType");
			function bs(e, t) {
				return ue(e, t), { preventCancel: !!e?.preventCancel };
			}
			n$2(bs, "convertIteratorOptions");
			function Yo(e, t) {
				ue(e, t);
				const r = e?.preventAbort, s = e?.preventCancel, u = e?.preventClose, c = e?.signal;
				return c !== void 0 && ms(c, `${t} has member 'signal' that`), {
					preventAbort: !!r,
					preventCancel: !!s,
					preventClose: !!u,
					signal: c
				};
			}
			n$2(Yo, "convertPipeOptions");
			function ms(e, t) {
				if (!Ca(e)) throw new TypeError(`${t} is not an AbortSignal.`);
			}
			n$2(ms, "assertAbortSignal");
			function ys(e, t) {
				ue(e, t);
				const r = e?.readable;
				zr(r, "readable", "ReadableWritablePair"), jr(r, `${t} has member 'readable' that`);
				const s = e?.writable;
				return zr(s, "writable", "ReadableWritablePair"), Bo(s, `${t} has member 'writable' that`), {
					readable: r,
					writable: s
				};
			}
			n$2(ys, "convertReadableWritablePair");
			const Pn = class Pn {
				constructor(t = {}, r = {}) {
					t === void 0 ? t = null : Jn(t, "First parameter");
					const s = Zt(r, "Second parameter"), u = fs(t, "First parameter");
					if (cn(this), u.type === "bytes") {
						if (s.size !== void 0) throw new RangeError("The strategy for a byte stream cannot have a size function");
						const c = Tt(s, 0);
						ca(this, u, c);
					} else {
						const c = Gt(s), d = Tt(s, 1);
						rs(this, u, d, c);
					}
				}
				get locked() {
					if (!We(this)) throw Me("locked");
					return qe(this);
				}
				cancel(t = void 0) {
					return We(this) ? qe(this) ? b(/* @__PURE__ */ new TypeError("Cannot cancel a stream that already has a reader")) : ie(this, t) : b(Me("cancel"));
				}
				getReader(t = void 0) {
					if (!We(this)) throw Me("getReader");
					return ha(t, "First parameter").mode === void 0 ? Qe(this) : Co(this);
				}
				pipeThrough(t, r = {}) {
					if (!We(this)) throw Me("pipeThrough");
					Se(t, 1, "pipeThrough");
					const s = ys(t, "First parameter"), u = Yo(r, "Second parameter");
					if (qe(this)) throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
					if (Ze(s.writable)) throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
					return Q(Ho(this, s.writable, u.preventClose, u.preventAbort, u.preventCancel, u.signal)), s.readable;
				}
				pipeTo(t, r = {}) {
					if (!We(this)) return b(Me("pipeTo"));
					if (t === void 0) return b("Parameter 1 is required in 'pipeTo'.");
					if (!Ge(t)) return b(/* @__PURE__ */ new TypeError("ReadableStream.prototype.pipeTo's first argument must be a WritableStream"));
					let s;
					try {
						s = Yo(r, "Second parameter");
					} catch (u) {
						return b(u);
					}
					return qe(this) ? b(/* @__PURE__ */ new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream")) : Ze(t) ? b(/* @__PURE__ */ new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream")) : Ho(this, t, s.preventClose, s.preventAbort, s.preventCancel, s.signal);
				}
				tee() {
					if (!We(this)) throw Me("tee");
					return St(ns(this));
				}
				values(t = void 0) {
					if (!We(this)) throw Me("values");
					const r = bs(t, "First parameter");
					return Ki(this, r.preventCancel);
				}
				[Ur](t) {
					return this.values(t);
				}
				static from(t) {
					return ss(t);
				}
			};
			n$2(Pn, "ReadableStream");
			let L = Pn;
			Object.defineProperties(L, { from: { enumerable: true } }), Object.defineProperties(L.prototype, {
				cancel: { enumerable: true },
				getReader: { enumerable: true },
				pipeThrough: { enumerable: true },
				pipeTo: { enumerable: true },
				tee: { enumerable: true },
				values: { enumerable: true },
				locked: { enumerable: true }
			}), h(L.from, "from"), h(L.prototype.cancel, "cancel"), h(L.prototype.getReader, "getReader"), h(L.prototype.pipeThrough, "pipeThrough"), h(L.prototype.pipeTo, "pipeTo"), h(L.prototype.tee, "tee"), h(L.prototype.values, "values"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(L.prototype, Symbol.toStringTag, {
				value: "ReadableStream",
				configurable: true
			}), Object.defineProperty(L.prototype, Ur, {
				value: L.prototype.values,
				writable: true,
				configurable: true
			});
			function Et(e, t, r, s = 1, u = () => 1) {
				const c = Object.create(L.prototype);
				cn(c);
				return Qo(c, Object.create(ne.prototype), e, t, r, s, u), c;
			}
			n$2(Et, "CreateReadableStream");
			function Go(e, t, r) {
				const s = Object.create(L.prototype);
				cn(s);
				return To(s, Object.create(te.prototype), e, t, r, 0, void 0), s;
			}
			n$2(Go, "CreateReadableByteStream");
			function cn(e) {
				e._state = "readable", e._reader = void 0, e._storedError = void 0, e._disturbed = false;
			}
			n$2(cn, "InitializeReadableStream");
			function We(e) {
				return !l(e) || !Object.prototype.hasOwnProperty.call(e, "_readableStreamController") ? false : e instanceof L;
			}
			n$2(We, "IsReadableStream");
			function qe(e) {
				return e._reader !== void 0;
			}
			n$2(qe, "IsReadableStreamLocked");
			function ie(e, t) {
				if (e._disturbed = true, e._state === "closed") return T(void 0);
				if (e._state === "errored") return b(e._storedError);
				At(e);
				const r = e._reader;
				if (r !== void 0 && je(r)) {
					const u = r._readIntoRequests;
					r._readIntoRequests = new D(), u.forEach((c) => {
						c._closeSteps(void 0);
					});
				}
				return F(e._readableStreamController[Ar](t), f);
			}
			n$2(ie, "ReadableStreamCancel");
			function At(e) {
				e._state = "closed";
				const t = e._reader;
				if (t !== void 0 && (Zn(t), Ee(t))) {
					const r = t._readRequests;
					t._readRequests = new D(), r.forEach((s) => {
						s._closeSteps();
					});
				}
			}
			n$2(At, "ReadableStreamClose");
			function Zo(e, t) {
				e._state = "errored", e._storedError = t;
				const r = e._reader;
				r !== void 0 && (Or(r, t), Ee(r) ? ro(r, t) : Ao(r, t));
			}
			n$2(Zo, "ReadableStreamError");
			function Me(e) {
				return /* @__PURE__ */ new TypeError(`ReadableStream.prototype.${e} can only be used on a ReadableStream`);
			}
			n$2(Me, "streamBrandCheckException$1");
			function Ko(e, t) {
				ue(e, t);
				const r = e?.highWaterMark;
				return zr(r, "highWaterMark", "QueuingStrategyInit"), { highWaterMark: Ir(r) };
			}
			n$2(Ko, "convertQueuingStrategyInit");
			const Jo = n$2((e) => e.byteLength, "byteLengthSizeFunction");
			h(Jo, "size");
			const vn = class vn {
				constructor(t) {
					Se(t, 1, "ByteLengthQueuingStrategy"), t = Ko(t, "First parameter"), this._byteLengthQueuingStrategyHighWaterMark = t.highWaterMark;
				}
				get highWaterMark() {
					if (!ei(this)) throw Xo("highWaterMark");
					return this._byteLengthQueuingStrategyHighWaterMark;
				}
				get size() {
					if (!ei(this)) throw Xo("size");
					return Jo;
				}
			};
			n$2(vn, "ByteLengthQueuingStrategy");
			let Xe = vn;
			Object.defineProperties(Xe.prototype, {
				highWaterMark: { enumerable: true },
				size: { enumerable: true }
			}), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(Xe.prototype, Symbol.toStringTag, {
				value: "ByteLengthQueuingStrategy",
				configurable: true
			});
			function Xo(e) {
				return /* @__PURE__ */ new TypeError(`ByteLengthQueuingStrategy.prototype.${e} can only be used on a ByteLengthQueuingStrategy`);
			}
			n$2(Xo, "byteLengthBrandCheckException");
			function ei(e) {
				return !l(e) || !Object.prototype.hasOwnProperty.call(e, "_byteLengthQueuingStrategyHighWaterMark") ? false : e instanceof Xe;
			}
			n$2(ei, "IsByteLengthQueuingStrategy");
			const ti = n$2(() => 1, "countSizeFunction");
			h(ti, "size");
			const En = class En {
				constructor(t) {
					Se(t, 1, "CountQueuingStrategy"), t = Ko(t, "First parameter"), this._countQueuingStrategyHighWaterMark = t.highWaterMark;
				}
				get highWaterMark() {
					if (!ni(this)) throw ri("highWaterMark");
					return this._countQueuingStrategyHighWaterMark;
				}
				get size() {
					if (!ni(this)) throw ri("size");
					return ti;
				}
			};
			n$2(En, "CountQueuingStrategy");
			let et = En;
			Object.defineProperties(et.prototype, {
				highWaterMark: { enumerable: true },
				size: { enumerable: true }
			}), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(et.prototype, Symbol.toStringTag, {
				value: "CountQueuingStrategy",
				configurable: true
			});
			function ri(e) {
				return /* @__PURE__ */ new TypeError(`CountQueuingStrategy.prototype.${e} can only be used on a CountQueuingStrategy`);
			}
			n$2(ri, "countBrandCheckException");
			function ni(e) {
				return !l(e) || !Object.prototype.hasOwnProperty.call(e, "_countQueuingStrategyHighWaterMark") ? false : e instanceof et;
			}
			n$2(ni, "IsCountQueuingStrategy");
			function gs(e, t) {
				ue(e, t);
				const r = e?.cancel, s = e?.flush, u = e?.readableType, c = e?.start, d = e?.transform, m = e?.writableType;
				return {
					cancel: r === void 0 ? void 0 : Rs(r, e, `${t} has member 'cancel' that`),
					flush: s === void 0 ? void 0 : _s(s, e, `${t} has member 'flush' that`),
					readableType: u,
					start: c === void 0 ? void 0 : Ss(c, e, `${t} has member 'start' that`),
					transform: d === void 0 ? void 0 : ws(d, e, `${t} has member 'transform' that`),
					writableType: m
				};
			}
			n$2(gs, "convertTransformer");
			function _s(e, t, r) {
				return Z(e, r), (s) => j(e, t, [s]);
			}
			n$2(_s, "convertTransformerFlushCallback");
			function Ss(e, t, r) {
				return Z(e, r), (s) => z(e, t, [s]);
			}
			n$2(Ss, "convertTransformerStartCallback");
			function ws(e, t, r) {
				return Z(e, r), (s, u) => j(e, t, [s, u]);
			}
			n$2(ws, "convertTransformerTransformCallback");
			function Rs(e, t, r) {
				return Z(e, r), (s) => j(e, t, [s]);
			}
			n$2(Rs, "convertTransformerCancelCallback");
			const An = class An {
				constructor(t = {}, r = {}, s = {}) {
					t === void 0 && (t = null);
					const u = Zt(r, "Second parameter"), c = Zt(s, "Third parameter"), d = gs(t, "First parameter");
					if (d.readableType !== void 0) throw new RangeError("Invalid readableType specified");
					if (d.writableType !== void 0) throw new RangeError("Invalid writableType specified");
					const m = Tt(c, 0), R = Gt(c), y = Tt(u, 1), C = Gt(u);
					let P;
					const B = A((ae) => {
						P = ae;
					});
					Ts(this, B, y, C, m, R), Ps(this, d), d.start !== void 0 ? P(d.start(this._transformStreamController)) : P(void 0);
				}
				get readable() {
					if (!oi(this)) throw li("readable");
					return this._readable;
				}
				get writable() {
					if (!oi(this)) throw li("writable");
					return this._writable;
				}
			};
			n$2(An, "TransformStream");
			let tt = An;
			Object.defineProperties(tt.prototype, {
				readable: { enumerable: true },
				writable: { enumerable: true }
			}), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(tt.prototype, Symbol.toStringTag, {
				value: "TransformStream",
				configurable: true
			});
			function Ts(e, t, r, s, u, c) {
				function d() {
					return t;
				}
				n$2(d, "startAlgorithm");
				function m(B) {
					return As(e, B);
				}
				n$2(m, "writeAlgorithm");
				function R(B) {
					return Bs(e, B);
				}
				n$2(R, "abortAlgorithm");
				function y() {
					return ks(e);
				}
				n$2(y, "closeAlgorithm"), e._writable = Ea(d, m, y, R, r, s);
				function C() {
					return Ws(e);
				}
				n$2(C, "pullAlgorithm");
				function P(B) {
					return qs(e, B);
				}
				n$2(P, "cancelAlgorithm"), e._readable = Et(d, C, P, u, c), e._backpressure = void 0, e._backpressureChangePromise = void 0, e._backpressureChangePromise_resolve = void 0, sr(e, true), e._transformStreamController = void 0;
			}
			n$2(Ts, "InitializeTransformStream");
			function oi(e) {
				return !l(e) || !Object.prototype.hasOwnProperty.call(e, "_transformStreamController") ? false : e instanceof tt;
			}
			n$2(oi, "IsTransformStream");
			function ii(e, t) {
				oe(e._readable._readableStreamController, t), dn(e, t);
			}
			n$2(ii, "TransformStreamError");
			function dn(e, t) {
				ur(e._transformStreamController), Ct(e._writable._writableStreamController, t), hn(e);
			}
			n$2(dn, "TransformStreamErrorWritableAndUnblockWrite");
			function hn(e) {
				e._backpressure && sr(e, false);
			}
			n$2(hn, "TransformStreamUnblockWrite");
			function sr(e, t) {
				e._backpressureChangePromise !== void 0 && e._backpressureChangePromise_resolve(), e._backpressureChangePromise = A((r) => {
					e._backpressureChangePromise_resolve = r;
				}), e._backpressure = t;
			}
			n$2(sr, "TransformStreamSetBackpressure");
			const Bn = class Bn {
				constructor() {
					throw new TypeError("Illegal constructor");
				}
				get desiredSize() {
					if (!lr(this)) throw fr("desiredSize");
					const t = this._controlledTransformStream._readable._readableStreamController;
					return fn(t);
				}
				enqueue(t = void 0) {
					if (!lr(this)) throw fr("enqueue");
					ai(this, t);
				}
				error(t = void 0) {
					if (!lr(this)) throw fr("error");
					vs(this, t);
				}
				terminate() {
					if (!lr(this)) throw fr("terminate");
					Es(this);
				}
			};
			n$2(Bn, "TransformStreamDefaultController");
			let pe = Bn;
			Object.defineProperties(pe.prototype, {
				enqueue: { enumerable: true },
				error: { enumerable: true },
				terminate: { enumerable: true },
				desiredSize: { enumerable: true }
			}), h(pe.prototype.enqueue, "enqueue"), h(pe.prototype.error, "error"), h(pe.prototype.terminate, "terminate"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(pe.prototype, Symbol.toStringTag, {
				value: "TransformStreamDefaultController",
				configurable: true
			});
			function lr(e) {
				return !l(e) || !Object.prototype.hasOwnProperty.call(e, "_controlledTransformStream") ? false : e instanceof pe;
			}
			n$2(lr, "IsTransformStreamDefaultController");
			function Cs(e, t, r, s, u) {
				t._controlledTransformStream = e, e._transformStreamController = t, t._transformAlgorithm = r, t._flushAlgorithm = s, t._cancelAlgorithm = u, t._finishPromise = void 0, t._finishPromise_resolve = void 0, t._finishPromise_reject = void 0;
			}
			n$2(Cs, "SetUpTransformStreamDefaultController");
			function Ps(e, t) {
				const r = Object.create(pe.prototype);
				let s, u, c;
				t.transform !== void 0 ? s = n$2((d) => t.transform(d, r), "transformAlgorithm") : s = n$2((d) => {
					try {
						return ai(r, d), T(void 0);
					} catch (m) {
						return b(m);
					}
				}, "transformAlgorithm"), t.flush !== void 0 ? u = n$2(() => t.flush(r), "flushAlgorithm") : u = n$2(() => T(void 0), "flushAlgorithm"), t.cancel !== void 0 ? c = n$2((d) => t.cancel(d), "cancelAlgorithm") : c = n$2(() => T(void 0), "cancelAlgorithm"), Cs(e, r, s, u, c);
			}
			n$2(Ps, "SetUpTransformStreamDefaultControllerFromTransformer");
			function ur(e) {
				e._transformAlgorithm = void 0, e._flushAlgorithm = void 0, e._cancelAlgorithm = void 0;
			}
			n$2(ur, "TransformStreamDefaultControllerClearAlgorithms");
			function ai(e, t) {
				const r = e._controlledTransformStream, s = r._readable._readableStreamController;
				if (!Je(s)) throw new TypeError("Readable side is not in a state that permits enqueue");
				try {
					Ke(s, t);
				} catch (c) {
					throw dn(r, c), r._readable._storedError;
				}
				ts(s) !== r._backpressure && sr(r, true);
			}
			n$2(ai, "TransformStreamDefaultControllerEnqueue");
			function vs(e, t) {
				ii(e._controlledTransformStream, t);
			}
			n$2(vs, "TransformStreamDefaultControllerError");
			function si(e, t) {
				return F(e._transformAlgorithm(t), void 0, (s) => {
					throw ii(e._controlledTransformStream, s), s;
				});
			}
			n$2(si, "TransformStreamDefaultControllerPerformTransform");
			function Es(e) {
				const t = e._controlledTransformStream, r = t._readable._readableStreamController;
				De(r);
				dn(t, /* @__PURE__ */ new TypeError("TransformStream terminated"));
			}
			n$2(Es, "TransformStreamDefaultControllerTerminate");
			function As(e, t) {
				const r = e._transformStreamController;
				if (e._backpressure) {
					const s = e._backpressureChangePromise;
					return F(s, () => {
						const u = e._writable;
						if (u._state === "erroring") throw u._storedError;
						return si(r, t);
					});
				}
				return si(r, t);
			}
			n$2(As, "TransformStreamDefaultSinkWriteAlgorithm");
			function Bs(e, t) {
				const r = e._transformStreamController;
				if (r._finishPromise !== void 0) return r._finishPromise;
				const s = e._readable;
				r._finishPromise = A((c, d) => {
					r._finishPromise_resolve = c, r._finishPromise_reject = d;
				});
				const u = r._cancelAlgorithm(t);
				return ur(r), g(u, () => (s._state === "errored" ? rt(r, s._storedError) : (oe(s._readableStreamController, t), pn(r)), null), (c) => (oe(s._readableStreamController, c), rt(r, c), null)), r._finishPromise;
			}
			n$2(Bs, "TransformStreamDefaultSinkAbortAlgorithm");
			function ks(e) {
				const t = e._transformStreamController;
				if (t._finishPromise !== void 0) return t._finishPromise;
				const r = e._readable;
				t._finishPromise = A((u, c) => {
					t._finishPromise_resolve = u, t._finishPromise_reject = c;
				});
				const s = t._flushAlgorithm();
				return ur(t), g(s, () => (r._state === "errored" ? rt(t, r._storedError) : (De(r._readableStreamController), pn(t)), null), (u) => (oe(r._readableStreamController, u), rt(t, u), null)), t._finishPromise;
			}
			n$2(ks, "TransformStreamDefaultSinkCloseAlgorithm");
			function Ws(e) {
				return sr(e, false), e._backpressureChangePromise;
			}
			n$2(Ws, "TransformStreamDefaultSourcePullAlgorithm");
			function qs(e, t) {
				const r = e._transformStreamController;
				if (r._finishPromise !== void 0) return r._finishPromise;
				const s = e._writable;
				r._finishPromise = A((c, d) => {
					r._finishPromise_resolve = c, r._finishPromise_reject = d;
				});
				const u = r._cancelAlgorithm(t);
				return ur(r), g(u, () => (s._state === "errored" ? rt(r, s._storedError) : (Ct(s._writableStreamController, t), hn(e), pn(r)), null), (c) => (Ct(s._writableStreamController, c), hn(e), rt(r, c), null)), r._finishPromise;
			}
			n$2(qs, "TransformStreamDefaultSourceCancelAlgorithm");
			function fr(e) {
				return /* @__PURE__ */ new TypeError(`TransformStreamDefaultController.prototype.${e} can only be used on a TransformStreamDefaultController`);
			}
			n$2(fr, "defaultControllerBrandCheckException");
			function pn(e) {
				e._finishPromise_resolve !== void 0 && (e._finishPromise_resolve(), e._finishPromise_resolve = void 0, e._finishPromise_reject = void 0);
			}
			n$2(pn, "defaultControllerFinishPromiseResolve");
			function rt(e, t) {
				e._finishPromise_reject !== void 0 && (Q(e._finishPromise), e._finishPromise_reject(t), e._finishPromise_resolve = void 0, e._finishPromise_reject = void 0);
			}
			n$2(rt, "defaultControllerFinishPromiseReject");
			function li(e) {
				return /* @__PURE__ */ new TypeError(`TransformStream.prototype.${e} can only be used on a TransformStream`);
			}
			n$2(li, "streamBrandCheckException"), a.ByteLengthQueuingStrategy = Xe, a.CountQueuingStrategy = et, a.ReadableByteStreamController = te, a.ReadableStream = L, a.ReadableStreamBYOBReader = ce, a.ReadableStreamBYOBRequest = Re, a.ReadableStreamDefaultController = ne, a.ReadableStreamDefaultReader = fe, a.TransformStream = tt, a.TransformStreamDefaultController = pe, a.WritableStream = de, a.WritableStreamDefaultController = ke, a.WritableStreamDefaultWriter = re;
		});
	}(kt, kt.exports)), kt.exports;
}
n$2(Ns, "requirePonyfill_es2018");
var mi;
function Hs() {
	if (mi) return pi;
	mi = 1;
	const i = 65536;
	if (!globalThis.ReadableStream) try {
		const o = require("node:process"), { emitWarning: a } = o;
		try {
			o.emitWarning = () => {}, Object.assign(globalThis, require("node:stream/web")), o.emitWarning = a;
		} catch (f) {
			throw o.emitWarning = a, f;
		}
	} catch {
		Object.assign(globalThis, Ns());
	}
	try {
		const { Blob: o } = require("buffer");
		o && !o.prototype.stream && (o.prototype.stream = n$2(function(f) {
			let l = 0;
			const p = this;
			return new ReadableStream({
				type: "bytes",
				async pull(h) {
					const v = await p.slice(l, Math.min(p.size, l + i)).arrayBuffer();
					l += v.byteLength, h.enqueue(new Uint8Array(v)), l === p.size && h.close();
				}
			});
		}, "name"));
	} catch {}
	return pi;
}
n$2(Hs, "requireStreams"), Hs();
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */ var yi = 65536;
async function* Wn(i, o = true) {
	for (const a of i) if ("stream" in a) yield* a.stream();
	else if (ArrayBuffer.isView(a)) if (o) {
		let f = a.byteOffset;
		const l = a.byteOffset + a.byteLength;
		for (; f !== l;) {
			const p = Math.min(l - f, yi), h = a.buffer.slice(f, f + p);
			f += h.byteLength, yield new Uint8Array(h);
		}
	} else yield a;
	else {
		let f = 0, l = a;
		for (; f !== l.size;) {
			const h = await l.slice(f, Math.min(l.size, f + yi)).arrayBuffer();
			f += h.byteLength, yield new Uint8Array(h);
		}
	}
}
n$2(Wn, "toIterator");
var gi = (ze = class {
	constructor(o = [], a = {}) {
		be(this, ve, []);
		be(this, zt, "");
		be(this, bt, 0);
		be(this, Cr, "transparent");
		if (typeof o != "object" || o === null) throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
		if (typeof o[Symbol.iterator] != "function") throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
		if (typeof a != "object" && typeof a != "function") throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
		a === null && (a = {});
		const f = new TextEncoder();
		for (const p of o) {
			let h;
			ArrayBuffer.isView(p) ? h = new Uint8Array(p.buffer.slice(p.byteOffset, p.byteOffset + p.byteLength)) : p instanceof ArrayBuffer ? h = new Uint8Array(p.slice(0)) : p instanceof ze ? h = p : h = f.encode(`${p}`), X(this, bt, O(this, bt) + (ArrayBuffer.isView(h) ? h.byteLength : h.size)), O(this, ve).push(h);
		}
		X(this, Cr, `${a.endings === void 0 ? "transparent" : a.endings}`);
		const l = a.type === void 0 ? "" : String(a.type);
		X(this, zt, /^[\x20-\x7E]*$/.test(l) ? l : "");
	}
	get size() {
		return O(this, bt);
	}
	get type() {
		return O(this, zt);
	}
	async text() {
		const o = new TextDecoder();
		let a = "";
		for await (const f of Wn(O(this, ve), false)) a += o.decode(f, { stream: true });
		return a += o.decode(), a;
	}
	async arrayBuffer() {
		const o = new Uint8Array(this.size);
		let a = 0;
		for await (const f of Wn(O(this, ve), false)) o.set(f, a), a += f.length;
		return o.buffer;
	}
	stream() {
		const o = Wn(O(this, ve), true);
		return new globalThis.ReadableStream({
			type: "bytes",
			async pull(a) {
				const f = await o.next();
				f.done ? a.close() : a.enqueue(f.value);
			},
			async cancel() {
				await o.return();
			}
		});
	}
	slice(o = 0, a = this.size, f = "") {
		const { size: l } = this;
		let p = o < 0 ? Math.max(l + o, 0) : Math.min(o, l), h = a < 0 ? Math.max(l + a, 0) : Math.min(a, l);
		const S = Math.max(h - p, 0), v = O(this, ve), w = [];
		let A = 0;
		for (const b of v) {
			if (A >= S) break;
			const q = ArrayBuffer.isView(b) ? b.byteLength : b.size;
			if (p && q <= p) p -= q, h -= q;
			else {
				let g;
				ArrayBuffer.isView(b) ? (g = b.subarray(p, Math.min(q, h)), A += g.byteLength) : (g = b.slice(p, Math.min(q, h)), A += g.size), h -= q, w.push(g), p = 0;
			}
		}
		const T = new ze([], { type: String(f).toLowerCase() });
		return X(T, bt, S), X(T, ve, w), T;
	}
	get [Symbol.toStringTag]() {
		return "Blob";
	}
	static [Symbol.hasInstance](o) {
		return o && typeof o == "object" && typeof o.constructor == "function" && (typeof o.stream == "function" || typeof o.arrayBuffer == "function") && /^(Blob|File)$/.test(o[Symbol.toStringTag]);
	}
}, ve = /* @__PURE__ */ new WeakMap(), zt = /* @__PURE__ */ new WeakMap(), bt = /* @__PURE__ */ new WeakMap(), Cr = /* @__PURE__ */ new WeakMap(), n$2(ze, "Blob"), ze);
Object.defineProperties(gi.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});
var ut = gi;
var qn = (mt = class extends ut {
	constructor(a, f, l = {}) {
		if (arguments.length < 2) throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
		super(a, l);
		be(this, It, 0);
		be(this, Ft, "");
		l === null && (l = {});
		const p = l.lastModified === void 0 ? Date.now() : Number(l.lastModified);
		Number.isNaN(p) || X(this, It, p), X(this, Ft, String(f));
	}
	get name() {
		return O(this, Ft);
	}
	get lastModified() {
		return O(this, It);
	}
	get [Symbol.toStringTag]() {
		return "File";
	}
	static [Symbol.hasInstance](a) {
		return !!a && a instanceof ut && /^(File)$/.test(a[Symbol.toStringTag]);
	}
}, It = /* @__PURE__ */ new WeakMap(), Ft = /* @__PURE__ */ new WeakMap(), n$2(mt, "File"), mt);
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */ var { toStringTag: Wt, iterator: Qs, hasInstance: Ys } = Symbol, _i = Math.random, Gs = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(","), Si = n$2((i, o, a) => (i += "", /^(Blob|File)$/.test(o && o[Wt]) ? [(a = a !== void 0 ? a + "" : o[Wt] == "File" ? o.name : "blob", i), o.name !== a || o[Wt] == "blob" ? new qn([o], a, o) : o] : [i, o + ""]), "f"), On = n$2((i, o) => (o ? i : i.replace(/\r?\n|\r/g, `\r
`)).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22"), "e$1"), Ue = n$2((i, o, a) => {
	if (o.length < a) throw new TypeError(`Failed to execute '${i}' on 'FormData': ${a} arguments required, but only ${o.length} present.`);
}, "x");
var br = (yt = class {
	constructor(...o) {
		be(this, ee, []);
		if (o.length) throw new TypeError("Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.");
	}
	get [Wt]() {
		return "FormData";
	}
	[Qs]() {
		return this.entries();
	}
	static [Ys](o) {
		return o && typeof o == "object" && o[Wt] === "FormData" && !Gs.some((a) => typeof o[a] != "function");
	}
	append(...o) {
		Ue("append", arguments, 2), O(this, ee).push(Si(...o));
	}
	delete(o) {
		Ue("delete", arguments, 1), o += "", X(this, ee, O(this, ee).filter(([a]) => a !== o));
	}
	get(o) {
		Ue("get", arguments, 1), o += "";
		for (var a = O(this, ee), f = a.length, l = 0; l < f; l++) if (a[l][0] === o) return a[l][1];
		return null;
	}
	getAll(o, a) {
		return Ue("getAll", arguments, 1), a = [], o += "", O(this, ee).forEach((f) => f[0] === o && a.push(f[1])), a;
	}
	has(o) {
		return Ue("has", arguments, 1), o += "", O(this, ee).some((a) => a[0] === o);
	}
	forEach(o, a) {
		Ue("forEach", arguments, 1);
		for (var [f, l] of this) o.call(a, l, f, this);
	}
	set(...o) {
		Ue("set", arguments, 2);
		var a = [], f = true;
		o = Si(...o), O(this, ee).forEach((l) => {
			l[0] === o[0] ? f && (f = !a.push(o)) : a.push(l);
		}), f && a.push(o), X(this, ee, a);
	}
	*entries() {
		yield* O(this, ee);
	}
	*keys() {
		for (var [o] of this) yield o;
	}
	*values() {
		for (var [, o] of this) yield o;
	}
}, ee = /* @__PURE__ */ new WeakMap(), n$2(yt, "FormData"), yt);
function Zs(i, o = ut) {
	var a = `${_i()}${_i()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), f = [], l = `--${a}\r
Content-Disposition: form-data; name="`;
	return i.forEach((p, h) => typeof p == "string" ? f.push(l + On(h) + `"\r
\r
${p.replace(/\r(?!\n)|(?<!\r)\n/g, `\r
`)}\r
`) : f.push(l + On(h) + `"; filename="${On(p.name, 1)}"\r
Content-Type: ${p.type || "application/octet-stream"}\r
\r
`, p, `\r
`)), f.push(`--${a}--`), new o(f, { type: "multipart/form-data; boundary=" + a });
}
n$2(Zs, "formDataToBlob");
var Un = class Un extends Error {
	constructor(o, a) {
		super(o), Error.captureStackTrace(this, this.constructor), this.type = a;
	}
	get name() {
		return this.constructor.name;
	}
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
};
n$2(Un, "FetchBaseError");
var ft = Un;
var xn = class xn extends ft {
	constructor(o, a, f) {
		super(o, a), f && (this.code = this.errno = f.code, this.erroredSysCall = f.syscall);
	}
};
n$2(xn, "FetchError");
var G = xn;
var mr = Symbol.toStringTag;
var wi = n$2((i) => typeof i == "object" && typeof i.append == "function" && typeof i.delete == "function" && typeof i.get == "function" && typeof i.getAll == "function" && typeof i.has == "function" && typeof i.set == "function" && typeof i.sort == "function" && i[mr] === "URLSearchParams", "isURLSearchParameters");
var yr = n$2((i) => i && typeof i == "object" && typeof i.arrayBuffer == "function" && typeof i.type == "string" && typeof i.stream == "function" && typeof i.constructor == "function" && /^(Blob|File)$/.test(i[mr]), "isBlob");
var Ks = n$2((i) => typeof i == "object" && (i[mr] === "AbortSignal" || i[mr] === "EventTarget"), "isAbortSignal");
var Js = n$2((i, o) => {
	const a = new URL(o).hostname, f = new URL(i).hostname;
	return a === f || a.endsWith(`.${f}`);
}, "isDomainOrSubdomain");
var Xs = n$2((i, o) => {
	return new URL(o).protocol === new URL(i).protocol;
}, "isSameProtocol");
var el = promisify(me.pipeline);
var H = Symbol("Body internals");
var Nn = class Nn {
	constructor(o, { size: a = 0 } = {}) {
		let f = null;
		o === null ? o = null : wi(o) ? o = Buffer$1.from(o.toString()) : yr(o) || Buffer$1.isBuffer(o) || (types.isAnyArrayBuffer(o) ? o = Buffer$1.from(o) : ArrayBuffer.isView(o) ? o = Buffer$1.from(o.buffer, o.byteOffset, o.byteLength) : o instanceof me || (o instanceof br ? (o = Zs(o), f = o.type.split("=")[1]) : o = Buffer$1.from(String(o))));
		let l = o;
		Buffer$1.isBuffer(o) ? l = me.Readable.from(o) : yr(o) && (l = me.Readable.from(o.stream())), this[H] = {
			body: o,
			stream: l,
			boundary: f,
			disturbed: false,
			error: null
		}, this.size = a, o instanceof me && o.on("error", (p) => {
			const h = p instanceof ft ? p : new G(`Invalid response body while trying to fetch ${this.url}: ${p.message}`, "system", p);
			this[H].error = h;
		});
	}
	get body() {
		return this[H].stream;
	}
	get bodyUsed() {
		return this[H].disturbed;
	}
	async arrayBuffer() {
		const { buffer: o, byteOffset: a, byteLength: f } = await zn(this);
		return o.slice(a, a + f);
	}
	async formData() {
		const o = this.headers.get("content-type");
		if (o.startsWith("application/x-www-form-urlencoded")) {
			const f = new br(), l = new URLSearchParams(await this.text());
			for (const [p, h] of l) f.append(p, h);
			return f;
		}
		const { toFormData: a } = await import('../build/multipart-parser-C6R-syKz.mjs');
		return a(this.body, o);
	}
	async blob() {
		const o = this.headers && this.headers.get("content-type") || this[H].body && this[H].body.type || "";
		return new ut([await this.arrayBuffer()], { type: o });
	}
	async json() {
		const o = await this.text();
		return JSON.parse(o);
	}
	async text() {
		const o = await zn(this);
		return new TextDecoder().decode(o);
	}
	buffer() {
		return zn(this);
	}
};
n$2(Nn, "Body");
var xe = Nn;
xe.prototype.buffer = deprecate(xe.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer"), Object.defineProperties(xe.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true },
	data: { get: deprecate(() => {}, "data doesn't exist, use json(), text(), arrayBuffer(), or body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (response)") }
});
async function zn(i) {
	if (i[H].disturbed) throw new TypeError(`body used already for: ${i.url}`);
	if (i[H].disturbed = true, i[H].error) throw i[H].error;
	const { body: o } = i;
	if (o === null) return Buffer$1.alloc(0);
	if (!(o instanceof me)) return Buffer$1.alloc(0);
	const a = [];
	let f = 0;
	try {
		for await (const l of o) {
			if (i.size > 0 && f + l.length > i.size) {
				const p = new G(`content size at ${i.url} over limit: ${i.size}`, "max-size");
				throw o.destroy(p), p;
			}
			f += l.length, a.push(l);
		}
	} catch (l) {
		throw l instanceof ft ? l : new G(`Invalid response body while trying to fetch ${i.url}: ${l.message}`, "system", l);
	}
	if (o.readableEnded === true || o._readableState.ended === true) try {
		return a.every((l) => typeof l == "string") ? Buffer$1.from(a.join("")) : Buffer$1.concat(a, f);
	} catch (l) {
		throw new G(`Could not create Buffer from response body for ${i.url}: ${l.message}`, "system", l);
	}
	else throw new G(`Premature close of server response while trying to fetch ${i.url}`);
}
n$2(zn, "consumeBody");
var In = n$2((i, o) => {
	let a, f, { body: l } = i[H];
	if (i.bodyUsed) throw new Error("cannot clone body after it is used");
	return l instanceof me && typeof l.getBoundary != "function" && (a = new PassThrough({ highWaterMark: o }), f = new PassThrough({ highWaterMark: o }), l.pipe(a), l.pipe(f), i[H].stream = a, l = f), l;
}, "clone");
var tl = deprecate((i) => i.getBoundary(), "form-data doesn't follow the spec and requires special treatment. Use alternative package", "https://github.com/node-fetch/node-fetch/issues/1167");
var Ri = n$2((i, o) => i === null ? null : typeof i == "string" ? "text/plain;charset=UTF-8" : wi(i) ? "application/x-www-form-urlencoded;charset=UTF-8" : yr(i) ? i.type || null : Buffer$1.isBuffer(i) || types.isAnyArrayBuffer(i) || ArrayBuffer.isView(i) ? null : i instanceof br ? `multipart/form-data; boundary=${o[H].boundary}` : i && typeof i.getBoundary == "function" ? `multipart/form-data;boundary=${tl(i)}` : i instanceof me ? null : "text/plain;charset=UTF-8", "extractContentType");
var rl = n$2((i) => {
	const { body: o } = i[H];
	return o === null ? 0 : yr(o) ? o.size : Buffer$1.isBuffer(o) ? o.length : o && typeof o.getLengthSync == "function" && o.hasKnownLength && o.hasKnownLength() ? o.getLengthSync() : null;
}, "getTotalBytes");
var nl = n$2(async (i, { body: o }) => {
	o === null ? i.end() : await el(o, i);
}, "writeToStream");
var gr = typeof Bt.validateHeaderName == "function" ? Bt.validateHeaderName : (i) => {
	if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(i)) {
		const o = /* @__PURE__ */ new TypeError(`Header name must be a valid HTTP token [${i}]`);
		throw Object.defineProperty(o, "code", { value: "ERR_INVALID_HTTP_TOKEN" }), o;
	}
};
var Fn = typeof Bt.validateHeaderValue == "function" ? Bt.validateHeaderValue : (i, o) => {
	if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(o)) {
		const a = /* @__PURE__ */ new TypeError(`Invalid character in header content ["${i}"]`);
		throw Object.defineProperty(a, "code", { value: "ERR_INVALID_CHAR" }), a;
	}
};
var Pr = class Pr extends URLSearchParams {
	constructor(o) {
		let a = [];
		if (o instanceof Pr) {
			const f = o.raw();
			for (const [l, p] of Object.entries(f)) a.push(...p.map((h) => [l, h]));
		} else if (o != null) if (typeof o == "object" && !types.isBoxedPrimitive(o)) {
			const f = o[Symbol.iterator];
			if (f == null) a.push(...Object.entries(o));
			else {
				if (typeof f != "function") throw new TypeError("Header pairs must be iterable");
				a = [...o].map((l) => {
					if (typeof l != "object" || types.isBoxedPrimitive(l)) throw new TypeError("Each header pair must be an iterable object");
					return [...l];
				}).map((l) => {
					if (l.length !== 2) throw new TypeError("Each header pair must be a name/value tuple");
					return [...l];
				});
			}
		} else throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
		return a = a.length > 0 ? a.map(([f, l]) => (gr(f), Fn(f, String(l)), [String(f).toLowerCase(), String(l)])) : void 0, super(a), new Proxy(this, { get(f, l, p) {
			switch (l) {
				case "append":
				case "set": return (h, S) => (gr(h), Fn(h, String(S)), URLSearchParams.prototype[l].call(f, String(h).toLowerCase(), String(S)));
				case "delete":
				case "has":
				case "getAll": return (h) => (gr(h), URLSearchParams.prototype[l].call(f, String(h).toLowerCase()));
				case "keys": return () => (f.sort(), new Set(URLSearchParams.prototype.keys.call(f)).keys());
				default: return Reflect.get(f, l, p);
			}
		} });
	}
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
	toString() {
		return Object.prototype.toString.call(this);
	}
	get(o) {
		const a = this.getAll(o);
		if (a.length === 0) return null;
		let f = a.join(", ");
		return /^content-encoding$/i.test(o) && (f = f.toLowerCase()), f;
	}
	forEach(o, a = void 0) {
		for (const f of this.keys()) Reflect.apply(o, a, [
			this.get(f),
			f,
			this
		]);
	}
	*values() {
		for (const o of this.keys()) yield this.get(o);
	}
	*entries() {
		for (const o of this.keys()) yield [o, this.get(o)];
	}
	[Symbol.iterator]() {
		return this.entries();
	}
	raw() {
		return [...this.keys()].reduce((o, a) => (o[a] = this.getAll(a), o), {});
	}
	[Symbol.for("nodejs.util.inspect.custom")]() {
		return [...this.keys()].reduce((o, a) => {
			const f = this.getAll(a);
			return a === "host" ? o[a] = f[0] : o[a] = f.length > 1 ? f : f[0], o;
		}, {});
	}
};
n$2(Pr, "Headers");
var ye = Pr;
Object.defineProperties(ye.prototype, [
	"get",
	"entries",
	"forEach",
	"values"
].reduce((i, o) => (i[o] = { enumerable: true }, i), {}));
function ol(i = []) {
	return new ye(i.reduce((o, a, f, l) => (f % 2 === 0 && o.push(l.slice(f, f + 2)), o), []).filter(([o, a]) => {
		try {
			return gr(o), Fn(o, String(a)), !0;
		} catch {
			return false;
		}
	}));
}
n$2(ol, "fromRawHeaders");
var il = /* @__PURE__ */ new Set([
	301,
	302,
	303,
	307,
	308
]);
var jn = n$2((i) => il.has(i), "isRedirect");
var se = Symbol("Response internals");
var Ne = class Ne extends xe {
	constructor(o = null, a = {}) {
		super(o, a);
		const f = a.status != null ? a.status : 200, l = new ye(a.headers);
		if (o !== null && !l.has("Content-Type")) {
			const p = Ri(o, this);
			p && l.append("Content-Type", p);
		}
		this[se] = {
			type: "default",
			url: a.url,
			status: f,
			statusText: a.statusText || "",
			headers: l,
			counter: a.counter,
			highWaterMark: a.highWaterMark
		};
	}
	get type() {
		return this[se].type;
	}
	get url() {
		return this[se].url || "";
	}
	get status() {
		return this[se].status;
	}
	get ok() {
		return this[se].status >= 200 && this[se].status < 300;
	}
	get redirected() {
		return this[se].counter > 0;
	}
	get statusText() {
		return this[se].statusText;
	}
	get headers() {
		return this[se].headers;
	}
	get highWaterMark() {
		return this[se].highWaterMark;
	}
	clone() {
		return new Ne(In(this, this.highWaterMark), {
			type: this.type,
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected,
			size: this.size,
			highWaterMark: this.highWaterMark
		});
	}
	static redirect(o, a = 302) {
		if (!jn(a)) throw new RangeError("Failed to execute \"redirect\" on \"response\": Invalid status code");
		return new Ne(null, {
			headers: { location: new URL(o).toString() },
			status: a
		});
	}
	static error() {
		const o = new Ne(null, {
			status: 0,
			statusText: ""
		});
		return o[se].type = "error", o;
	}
	static json(o = void 0, a = {}) {
		const f = JSON.stringify(o);
		if (f === void 0) throw new TypeError("data is not JSON serializable");
		const l = new ye(a && a.headers);
		return l.has("content-type") || l.set("content-type", "application/json"), new Ne(f, {
			...a,
			headers: l
		});
	}
	get [Symbol.toStringTag]() {
		return "Response";
	}
};
n$2(Ne, "Response");
var le = Ne;
Object.defineProperties(le.prototype, {
	type: { enumerable: true },
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});
var al = n$2((i) => {
	if (i.search) return i.search;
	const o = i.href.length - 1, a = i.hash || (i.href[o] === "#" ? "#" : "");
	return i.href[o - a.length] === "?" ? "?" : "";
}, "getSearch");
function Ti(i, o = false) {
	return i == null || (i = new URL(i), /^(about|blob|data):$/.test(i.protocol)) ? "no-referrer" : (i.username = "", i.password = "", i.hash = "", o && (i.pathname = "", i.search = ""), i);
}
n$2(Ti, "stripURLForUseAsAReferrer");
var Ci = /* @__PURE__ */ new Set([
	"",
	"no-referrer",
	"no-referrer-when-downgrade",
	"same-origin",
	"origin",
	"strict-origin",
	"origin-when-cross-origin",
	"strict-origin-when-cross-origin",
	"unsafe-url"
]);
var sl = "strict-origin-when-cross-origin";
function ll(i) {
	if (!Ci.has(i)) throw new TypeError(`Invalid referrerPolicy: ${i}`);
	return i;
}
n$2(ll, "validateReferrerPolicy");
function ul(i) {
	if (/^(http|ws)s:$/.test(i.protocol)) return true;
	const o = i.host.replace(/(^\[)|(]$)/g, ""), a = isIP(o);
	return a === 4 && /^127\./.test(o) || a === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(o) ? true : i.host === "localhost" || i.host.endsWith(".localhost") ? false : i.protocol === "file:";
}
n$2(ul, "isOriginPotentiallyTrustworthy");
function ct(i) {
	return /^about:(blank|srcdoc)$/.test(i) || i.protocol === "data:" || /^(blob|filesystem):$/.test(i.protocol) ? true : ul(i);
}
n$2(ct, "isUrlPotentiallyTrustworthy");
function fl(i, { referrerURLCallback: o, referrerOriginCallback: a } = {}) {
	if (i.referrer === "no-referrer" || i.referrerPolicy === "") return null;
	const f = i.referrerPolicy;
	if (i.referrer === "about:client") return "no-referrer";
	const l = i.referrer;
	let p = Ti(l), h = Ti(l, true);
	p.toString().length > 4096 && (p = h), o && (p = o(p)), a && (h = a(h));
	const S = new URL(i.url);
	switch (f) {
		case "no-referrer": return "no-referrer";
		case "origin": return h;
		case "unsafe-url": return p;
		case "strict-origin": return ct(p) && !ct(S) ? "no-referrer" : h.toString();
		case "strict-origin-when-cross-origin": return p.origin === S.origin ? p : ct(p) && !ct(S) ? "no-referrer" : h;
		case "same-origin": return p.origin === S.origin ? p : "no-referrer";
		case "origin-when-cross-origin": return p.origin === S.origin ? p : h;
		case "no-referrer-when-downgrade": return ct(p) && !ct(S) ? "no-referrer" : p;
		default: throw new TypeError(`Invalid referrerPolicy: ${f}`);
	}
}
n$2(fl, "determineRequestsReferrer");
function cl(i) {
	const o = (i.get("referrer-policy") || "").split(/[,\s]+/);
	let a = "";
	for (const f of o) f && Ci.has(f) && (a = f);
	return a;
}
n$2(cl, "parseReferrerPolicyFromHeader");
var $ = Symbol("Request internals");
var qt = n$2((i) => typeof i == "object" && typeof i[$] == "object", "isRequest");
var dl = deprecate(() => {}, ".data is not a valid RequestInit property, use .body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (request)");
var vr = class vr extends xe {
	constructor(o, a = {}) {
		let f;
		if (qt(o) ? f = new URL(o.url) : (f = new URL(o), o = {}), f.username !== "" || f.password !== "") throw new TypeError(`${f} is an url with embedded credentials.`);
		let l = a.method || o.method || "GET";
		if (/^(delete|get|head|options|post|put)$/i.test(l) && (l = l.toUpperCase()), !qt(a) && "data" in a && dl(), (a.body != null || qt(o) && o.body !== null) && (l === "GET" || l === "HEAD")) throw new TypeError("Request with GET/HEAD method cannot have body");
		const p = a.body ? a.body : qt(o) && o.body !== null ? In(o) : null;
		super(p, { size: a.size || o.size || 0 });
		const h = new ye(a.headers || o.headers || {});
		if (p !== null && !h.has("Content-Type")) {
			const w = Ri(p, this);
			w && h.set("Content-Type", w);
		}
		let S = qt(o) ? o.signal : null;
		if ("signal" in a && (S = a.signal), S != null && !Ks(S)) throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
		let v = a.referrer == null ? o.referrer : a.referrer;
		if (v === "") v = "no-referrer";
		else if (v) {
			const w = new URL(v);
			v = /^about:(\/\/)?client$/.test(w) ? "client" : w;
		} else v = void 0;
		this[$] = {
			method: l,
			redirect: a.redirect || o.redirect || "follow",
			headers: h,
			parsedURL: f,
			signal: S,
			referrer: v
		}, this.follow = a.follow === void 0 ? o.follow === void 0 ? 20 : o.follow : a.follow, this.compress = a.compress === void 0 ? o.compress === void 0 ? true : o.compress : a.compress, this.counter = a.counter || o.counter || 0, this.agent = a.agent || o.agent, this.highWaterMark = a.highWaterMark || o.highWaterMark || 16384, this.insecureHTTPParser = a.insecureHTTPParser || o.insecureHTTPParser || false, this.referrerPolicy = a.referrerPolicy || o.referrerPolicy || "";
	}
	get method() {
		return this[$].method;
	}
	get url() {
		return format$1(this[$].parsedURL);
	}
	get headers() {
		return this[$].headers;
	}
	get redirect() {
		return this[$].redirect;
	}
	get signal() {
		return this[$].signal;
	}
	get referrer() {
		if (this[$].referrer === "no-referrer") return "";
		if (this[$].referrer === "client") return "about:client";
		if (this[$].referrer) return this[$].referrer.toString();
	}
	get referrerPolicy() {
		return this[$].referrerPolicy;
	}
	set referrerPolicy(o) {
		this[$].referrerPolicy = ll(o);
	}
	clone() {
		return new vr(this);
	}
	get [Symbol.toStringTag]() {
		return "Request";
	}
};
n$2(vr, "Request");
var dt = vr;
Object.defineProperties(dt.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true },
	referrer: { enumerable: true },
	referrerPolicy: { enumerable: true }
});
var hl = n$2((i) => {
	const { parsedURL: o } = i[$], a = new ye(i[$].headers);
	a.has("Accept") || a.set("Accept", "*/*");
	let f = null;
	if (i.body === null && /^(post|put)$/i.test(i.method) && (f = "0"), i.body !== null) {
		const S = rl(i);
		typeof S == "number" && !Number.isNaN(S) && (f = String(S));
	}
	f && a.set("Content-Length", f), i.referrerPolicy === "" && (i.referrerPolicy = sl), i.referrer && i.referrer !== "no-referrer" ? i[$].referrer = fl(i) : i[$].referrer = "no-referrer", i[$].referrer instanceof URL && a.set("Referer", i.referrer), a.has("User-Agent") || a.set("User-Agent", "node-fetch"), i.compress && !a.has("Accept-Encoding") && a.set("Accept-Encoding", "gzip, deflate, br");
	let { agent: l } = i;
	typeof l == "function" && (l = l(o));
	const p = al(o);
	return {
		parsedURL: o,
		options: {
			path: o.pathname + p,
			method: i.method,
			headers: a[Symbol.for("nodejs.util.inspect.custom")](),
			insecureHTTPParser: i.insecureHTTPParser,
			agent: l
		}
	};
}, "getNodeRequestOptions");
var Hn = class Hn extends ft {
	constructor(o, a = "aborted") {
		super(o, a);
	}
};
n$2(Hn, "AbortError");
var _r = Hn;
/*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */ var Ln;
var Pi;
function pl() {
	if (Pi) return Ln;
	if (Pi = 1, !globalThis.DOMException) try {
		const { MessageChannel: i } = require("worker_threads"), o = new i().port1, a = /* @__PURE__ */ new ArrayBuffer();
		o.postMessage(a, [a, a]);
	} catch (i) {
		i.constructor.name === "DOMException" && (globalThis.DOMException = i.constructor);
	}
	return Ln = globalThis.DOMException, Ln;
}
n$2(pl, "requireNodeDomexception");
var ml = f(pl()), { stat: $n } = promises;
n$2((i, o) => vi(statSync(i), i, o), "blobFromSync");
n$2((i, o) => $n(i).then((a) => vi(a, i, o)), "blobFrom");
n$2((i, o) => $n(i).then((a) => Ei(a, i, o)), "fileFrom");
n$2((i, o) => Ei(statSync(i), i, o), "fileFromSync");
var vi = n$2((i, o, a = "") => new ut([new Sr({
	path: o,
	size: i.size,
	lastModified: i.mtimeMs,
	start: 0
})], { type: a }), "fromBlob"), Ei = n$2((i, o, a = "") => new qn([new Sr({
	path: o,
	size: i.size,
	lastModified: i.mtimeMs,
	start: 0
})], basename(o), {
	type: a,
	lastModified: i.mtimeMs
}), "fromFile"), Er = class Er {
	constructor(o) {
		be(this, He);
		be(this, Ve);
		X(this, He, o.path), X(this, Ve, o.start), this.size = o.size, this.lastModified = o.lastModified;
	}
	slice(o, a) {
		return new Er({
			path: O(this, He),
			lastModified: this.lastModified,
			size: a - o,
			start: O(this, Ve) + o
		});
	}
	async *stream() {
		const { mtimeMs: o } = await $n(O(this, He));
		if (o > this.lastModified) throw new ml("The requested file could not be read, typically due to permission problems that have occurred after a reference to a file was acquired.", "NotReadableError");
		yield* createReadStream(O(this, He), {
			start: O(this, Ve),
			end: O(this, Ve) + this.size - 1
		});
	}
	get [Symbol.toStringTag]() {
		return "Blob";
	}
};
He = /* @__PURE__ */ new WeakMap(), Ve = /* @__PURE__ */ new WeakMap(), n$2(Er, "BlobDataItem");
var Sr = Er;
var wl = /* @__PURE__ */ new Set([
	"data:",
	"http:",
	"https:"
]);
async function Ai(i, o) {
	return new Promise((a, f) => {
		const l = new dt(i, o), { parsedURL: p, options: h } = hl(l);
		if (!wl.has(p.protocol)) throw new TypeError(`node-fetch cannot load ${i}. URL scheme "${p.protocol.replace(/:$/, "")}" is not supported.`);
		if (p.protocol === "data:") {
			const g = Us(l.url);
			a(new le(g, { headers: { "Content-Type": g.typeFull } }));
			return;
		}
		const S = (p.protocol === "https:" ? zs : Bt).request, { signal: v } = l;
		let w = null;
		const A = n$2(() => {
			const g = new _r("The operation was aborted.");
			f(g), l.body && l.body instanceof me.Readable && l.body.destroy(g), w && w.body && w.body.emit("error", g);
		}, "abort");
		if (v && v.aborted) {
			A();
			return;
		}
		const T = n$2(() => {
			A(), q();
		}, "abortAndFinalize"), b = S(p.toString(), h);
		v && v.addEventListener("abort", T);
		const q = n$2(() => {
			b.abort(), v && v.removeEventListener("abort", T);
		}, "finalize");
		b.on("error", (g) => {
			f(new G(`request to ${l.url} failed, reason: ${g.message}`, "system", g)), q();
		}), Rl(b, (g) => {
			w && w.body && w.body.destroy(g);
		}), process.version < "v14" && b.on("socket", (g) => {
			let V;
			g.prependListener("end", () => {
				V = g._eventsCount;
			}), g.prependListener("close", (I) => {
				if (w && V < g._eventsCount && !I) {
					const F = /* @__PURE__ */ new Error("Premature close");
					F.code = "ERR_STREAM_PREMATURE_CLOSE", w.body.emit("error", F);
				}
			});
		}), b.on("response", (g) => {
			b.setTimeout(0);
			const V = ol(g.rawHeaders);
			if (jn(g.statusCode)) {
				const z = V.get("Location");
				let j = null;
				try {
					j = z === null ? null : new URL(z, l.url);
				} catch {
					if (l.redirect !== "manual") {
						f(new G(`uri requested responds with an invalid redirect URL: ${z}`, "invalid-redirect")), q();
						return;
					}
				}
				switch (l.redirect) {
					case "error":
						f(new G(`uri requested responds with a redirect, redirect mode is set to error: ${l.url}`, "no-redirect")), q();
						return;
					case "manual": break;
					case "follow": {
						if (j === null) break;
						if (l.counter >= l.follow) {
							f(new G(`maximum redirect reached at: ${l.url}`, "max-redirect")), q();
							return;
						}
						const U = {
							headers: new ye(l.headers),
							follow: l.follow,
							counter: l.counter + 1,
							agent: l.agent,
							compress: l.compress,
							method: l.method,
							body: In(l),
							signal: l.signal,
							size: l.size,
							referrer: l.referrer,
							referrerPolicy: l.referrerPolicy
						};
						if (!Js(l.url, j) || !Xs(l.url, j)) for (const jt of [
							"authorization",
							"www-authenticate",
							"cookie",
							"cookie2"
						]) U.headers.delete(jt);
						if (g.statusCode !== 303 && l.body && o.body instanceof me.Readable) {
							f(new G("Cannot follow redirect with body being a readable stream", "unsupported-redirect")), q();
							return;
						}
						(g.statusCode === 303 || (g.statusCode === 301 || g.statusCode === 302) && l.method === "POST") && (U.method = "GET", U.body = void 0, U.headers.delete("content-length"));
						const D = cl(V);
						D && (U.referrerPolicy = D), a(Ai(new dt(j, U))), q();
						return;
					}
					default: return f(/* @__PURE__ */ new TypeError(`Redirect option '${l.redirect}' is not a valid value of RequestRedirect`));
				}
			}
			v && g.once("end", () => {
				v.removeEventListener("abort", T);
			});
			let I = pipeline(g, new PassThrough(), (z) => {
				z && f(z);
			});
			process.version < "v12.10" && g.on("aborted", T);
			const F = {
				url: l.url,
				status: g.statusCode,
				statusText: g.statusMessage,
				headers: V,
				size: l.size,
				counter: l.counter,
				highWaterMark: l.highWaterMark
			}, Q = V.get("Content-Encoding");
			if (!l.compress || l.method === "HEAD" || Q === null || g.statusCode === 204 || g.statusCode === 304) {
				w = new le(I, F), a(w);
				return;
			}
			const ge = {
				flush: st.Z_SYNC_FLUSH,
				finishFlush: st.Z_SYNC_FLUSH
			};
			if (Q === "gzip" || Q === "x-gzip") {
				I = pipeline(I, st.createGunzip(ge), (z) => {
					z && f(z);
				}), w = new le(I, F), a(w);
				return;
			}
			if (Q === "deflate" || Q === "x-deflate") {
				const z = pipeline(g, new PassThrough(), (j) => {
					j && f(j);
				});
				z.once("data", (j) => {
					(j[0] & 15) === 8 ? I = pipeline(I, st.createInflate(), (U) => {
						U && f(U);
					}) : I = pipeline(I, st.createInflateRaw(), (U) => {
						U && f(U);
					}), w = new le(I, F), a(w);
				}), z.once("end", () => {
					w || (w = new le(I, F), a(w));
				});
				return;
			}
			if (Q === "br") {
				I = pipeline(I, st.createBrotliDecompress(), (z) => {
					z && f(z);
				}), w = new le(I, F), a(w);
				return;
			}
			w = new le(I, F), a(w);
		}), nl(b, l).catch(f);
	});
}
n$2(Ai, "fetch$1");
function Rl(i, o) {
	const a = Buffer$1.from(`0\r
\r
`);
	let f = false, l = false, p;
	i.on("response", (h) => {
		const { headers: S } = h;
		f = S["transfer-encoding"] === "chunked" && !S["content-length"];
	}), i.on("socket", (h) => {
		const S = n$2(() => {
			if (f && !l) {
				const w = /* @__PURE__ */ new Error("Premature close");
				w.code = "ERR_STREAM_PREMATURE_CLOSE", o(w);
			}
		}, "onSocketClose"), v = n$2((w) => {
			l = Buffer$1.compare(w.slice(-5), a) === 0, !l && p && (l = Buffer$1.compare(p.slice(-3), a.slice(0, 3)) === 0 && Buffer$1.compare(w.slice(-2), a.slice(3)) === 0), p = w;
		}, "onData");
		h.prependListener("close", S), h.on("data", v), i.on("close", () => {
			h.removeListener("close", S), h.removeListener("data", v);
		});
	});
}
n$2(Rl, "fixResponseChunkedTransferBadEnding");
var Bi = /* @__PURE__ */ new WeakMap();
var Dn = /* @__PURE__ */ new WeakMap();
function W(i) {
	const o = Bi.get(i);
	return console.assert(o != null, "'this' is expected an Event object, but got", i), o;
}
n$2(W, "pd");
function ki(i) {
	if (i.passiveListener != null) {
		typeof console < "u" && typeof console.error == "function" && console.error("Unable to preventDefault inside passive event listener invocation.", i.passiveListener);
		return;
	}
	i.event.cancelable && (i.canceled = true, typeof i.event.preventDefault == "function" && i.event.preventDefault());
}
n$2(ki, "setCancelFlag");
function ht(i, o) {
	Bi.set(this, {
		eventTarget: i,
		event: o,
		eventPhase: 2,
		currentTarget: i,
		canceled: false,
		stopped: false,
		immediateStopped: false,
		passiveListener: null,
		timeStamp: o.timeStamp || Date.now()
	}), Object.defineProperty(this, "isTrusted", {
		value: false,
		enumerable: true
	});
	const a = Object.keys(o);
	for (let f = 0; f < a.length; ++f) {
		const l = a[f];
		l in this || Object.defineProperty(this, l, Wi(l));
	}
}
n$2(ht, "Event"), ht.prototype = {
	get type() {
		return W(this).event.type;
	},
	get target() {
		return W(this).eventTarget;
	},
	get currentTarget() {
		return W(this).currentTarget;
	},
	composedPath() {
		const i = W(this).currentTarget;
		return i == null ? [] : [i];
	},
	get NONE() {
		return 0;
	},
	get CAPTURING_PHASE() {
		return 1;
	},
	get AT_TARGET() {
		return 2;
	},
	get BUBBLING_PHASE() {
		return 3;
	},
	get eventPhase() {
		return W(this).eventPhase;
	},
	stopPropagation() {
		const i = W(this);
		i.stopped = true, typeof i.event.stopPropagation == "function" && i.event.stopPropagation();
	},
	stopImmediatePropagation() {
		const i = W(this);
		i.stopped = true, i.immediateStopped = true, typeof i.event.stopImmediatePropagation == "function" && i.event.stopImmediatePropagation();
	},
	get bubbles() {
		return !!W(this).event.bubbles;
	},
	get cancelable() {
		return !!W(this).event.cancelable;
	},
	preventDefault() {
		ki(W(this));
	},
	get defaultPrevented() {
		return W(this).canceled;
	},
	get composed() {
		return !!W(this).event.composed;
	},
	get timeStamp() {
		return W(this).timeStamp;
	},
	get srcElement() {
		return W(this).eventTarget;
	},
	get cancelBubble() {
		return W(this).stopped;
	},
	set cancelBubble(i) {
		if (!i) return;
		const o = W(this);
		o.stopped = true, typeof o.event.cancelBubble == "boolean" && (o.event.cancelBubble = true);
	},
	get returnValue() {
		return !W(this).canceled;
	},
	set returnValue(i) {
		i || ki(W(this));
	},
	initEvent() {}
}, Object.defineProperty(ht.prototype, "constructor", {
	value: ht,
	configurable: true,
	writable: true
});
function Wi(i) {
	return {
		get() {
			return W(this).event[i];
		},
		set(o) {
			W(this).event[i] = o;
		},
		configurable: true,
		enumerable: true
	};
}
n$2(Wi, "defineRedirectDescriptor");
function Tl(i) {
	return {
		value() {
			const o = W(this).event;
			return o[i].apply(o, arguments);
		},
		configurable: true,
		enumerable: true
	};
}
n$2(Tl, "defineCallDescriptor");
function Cl(i, o) {
	const a = Object.keys(o);
	if (a.length === 0) return i;
	function f(l, p) {
		i.call(this, l, p);
	}
	n$2(f, "CustomEvent"), f.prototype = Object.create(i.prototype, { constructor: {
		value: f,
		configurable: true,
		writable: true
	} });
	for (let l = 0; l < a.length; ++l) {
		const p = a[l];
		if (!(p in i.prototype)) {
			const S = typeof Object.getOwnPropertyDescriptor(o, p).value == "function";
			Object.defineProperty(f.prototype, p, S ? Tl(p) : Wi(p));
		}
	}
	return f;
}
n$2(Cl, "defineWrapper");
function qi(i) {
	if (i == null || i === Object.prototype) return ht;
	let o = Dn.get(i);
	return o ?? (o = Cl(qi(Object.getPrototypeOf(i)), i), Dn.set(i, o)), o;
}
n$2(qi, "getWrapper");
function Pl(i, o) {
	return new (qi(Object.getPrototypeOf(o)))(i, o);
}
n$2(Pl, "wrapEvent");
function vl(i) {
	return W(i).immediateStopped;
}
n$2(vl, "isStopped");
function El(i, o) {
	W(i).eventPhase = o;
}
n$2(El, "setEventPhase");
function Al(i, o) {
	W(i).currentTarget = o;
}
n$2(Al, "setCurrentTarget");
function Oi(i, o) {
	W(i).passiveListener = o;
}
n$2(Oi, "setPassiveListener");
var zi = /* @__PURE__ */ new WeakMap();
var Ii = 1;
var Fi = 2;
var wr = 3;
function Rr(i) {
	return i !== null && typeof i == "object";
}
n$2(Rr, "isObject");
function Ot(i) {
	const o = zi.get(i);
	if (o == null) throw new TypeError("'this' is expected an EventTarget object, but got another value.");
	return o;
}
n$2(Ot, "getListeners");
function Bl(i) {
	return {
		get() {
			let a = Ot(this).get(i);
			for (; a != null;) {
				if (a.listenerType === wr) return a.listener;
				a = a.next;
			}
			return null;
		},
		set(o) {
			typeof o != "function" && !Rr(o) && (o = null);
			const a = Ot(this);
			let f = null, l = a.get(i);
			for (; l != null;) l.listenerType === wr ? f !== null ? f.next = l.next : l.next !== null ? a.set(i, l.next) : a.delete(i) : f = l, l = l.next;
			if (o !== null) {
				const p = {
					listener: o,
					listenerType: wr,
					passive: false,
					once: false,
					next: null
				};
				f === null ? a.set(i, p) : f.next = p;
			}
		},
		configurable: true,
		enumerable: true
	};
}
n$2(Bl, "defineEventAttributeDescriptor");
function ji(i, o) {
	Object.defineProperty(i, `on${o}`, Bl(o));
}
n$2(ji, "defineEventAttribute");
function Li(i) {
	function o() {
		Pe.call(this);
	}
	n$2(o, "CustomEventTarget"), o.prototype = Object.create(Pe.prototype, { constructor: {
		value: o,
		configurable: true,
		writable: true
	} });
	for (let a = 0; a < i.length; ++a) ji(o.prototype, i[a]);
	return o;
}
n$2(Li, "defineCustomEventTarget");
function Pe() {
	if (this instanceof Pe) {
		zi.set(this, /* @__PURE__ */ new Map());
		return;
	}
	if (arguments.length === 1 && Array.isArray(arguments[0])) return Li(arguments[0]);
	if (arguments.length > 0) {
		const i = new Array(arguments.length);
		for (let o = 0; o < arguments.length; ++o) i[o] = arguments[o];
		return Li(i);
	}
	throw new TypeError("Cannot call a class as a function");
}
n$2(Pe, "EventTarget"), Pe.prototype = {
	addEventListener(i, o, a) {
		if (o == null) return;
		if (typeof o != "function" && !Rr(o)) throw new TypeError("'listener' should be a function or an object.");
		const f = Ot(this), l = Rr(a), h = (l ? !!a.capture : !!a) ? Ii : Fi, S = {
			listener: o,
			listenerType: h,
			passive: l && !!a.passive,
			once: l && !!a.once,
			next: null
		};
		let v = f.get(i);
		if (v === void 0) {
			f.set(i, S);
			return;
		}
		let w = null;
		for (; v != null;) {
			if (v.listener === o && v.listenerType === h) return;
			w = v, v = v.next;
		}
		w.next = S;
	},
	removeEventListener(i, o, a) {
		if (o == null) return;
		const f = Ot(this), p = (Rr(a) ? !!a.capture : !!a) ? Ii : Fi;
		let h = null, S = f.get(i);
		for (; S != null;) {
			if (S.listener === o && S.listenerType === p) {
				h !== null ? h.next = S.next : S.next !== null ? f.set(i, S.next) : f.delete(i);
				return;
			}
			h = S, S = S.next;
		}
	},
	dispatchEvent(i) {
		if (i == null || typeof i.type != "string") throw new TypeError("\"event.type\" should be a string.");
		const o = Ot(this), a = i.type;
		let f = o.get(a);
		if (f == null) return true;
		const l = Pl(this, i);
		let p = null;
		for (; f != null;) {
			if (f.once ? p !== null ? p.next = f.next : f.next !== null ? o.set(a, f.next) : o.delete(a) : p = f, Oi(l, f.passive ? f.listener : null), typeof f.listener == "function") try {
				f.listener.call(this, l);
			} catch (h) {
				typeof console < "u" && typeof console.error == "function" && console.error(h);
			}
			else f.listenerType !== wr && typeof f.listener.handleEvent == "function" && f.listener.handleEvent(l);
			if (vl(l)) break;
			f = f.next;
		}
		return Oi(l, null), El(l, 0), Al(l, null), !l.defaultPrevented;
	}
}, Object.defineProperty(Pe.prototype, "constructor", {
	value: Pe,
	configurable: true,
	writable: true
});
var Vn = class Vn extends Pe {
	constructor() {
		throw super(), /* @__PURE__ */ new TypeError("AbortSignal cannot be constructed directly");
	}
	get aborted() {
		const o = Tr.get(this);
		if (typeof o != "boolean") throw new TypeError(`Expected 'this' to be an 'AbortSignal' object, but got ${this === null ? "null" : typeof this}`);
		return o;
	}
};
n$2(Vn, "AbortSignal");
var pt = Vn;
ji(pt.prototype, "abort");
function kl() {
	const i = Object.create(pt.prototype);
	return Pe.call(i), Tr.set(i, false), i;
}
n$2(kl, "createAbortSignal");
function Wl(i) {
	Tr.get(i) === false && (Tr.set(i, true), i.dispatchEvent({ type: "abort" }));
}
n$2(Wl, "abortSignal");
var Tr = /* @__PURE__ */ new WeakMap();
Object.defineProperties(pt.prototype, { aborted: { enumerable: true } }), typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol" && Object.defineProperty(pt.prototype, Symbol.toStringTag, {
	configurable: true,
	value: "AbortSignal"
});
var Mn = (gt = class {
	constructor() {
		$i.set(this, kl());
	}
	get signal() {
		return Di(this);
	}
	abort() {
		Wl(Di(this));
	}
}, n$2(gt, "AbortController"), gt);
var $i = /* @__PURE__ */ new WeakMap();
function Di(i) {
	const o = $i.get(i);
	if (o == null) throw new TypeError(`Expected 'this' to be an 'AbortController' object, but got ${i === null ? "null" : typeof i}`);
	return o;
}
n$2(Di, "getSignal"), Object.defineProperties(Mn.prototype, {
	signal: { enumerable: true },
	abort: { enumerable: true }
}), typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol" && Object.defineProperty(Mn.prototype, Symbol.toStringTag, {
	configurable: true,
	value: "AbortController"
});
var ql = Object.defineProperty;
var Ol = n$2((i, o) => ql(i, "name", {
	value: o,
	configurable: true
}), "e");
var Mi = Ai;
Ui();
function Ui() {
	!globalThis.process?.versions?.node && !globalThis.process?.env?.DISABLE_NODE_FETCH_NATIVE_WARN && console.warn("[node-fetch-native] Node.js compatible build of `node-fetch-native` is being used in a non-Node.js environment. Please make sure you are using proper export conditions or report this issue to https://github.com/unjs/node-fetch-native. You can set `process.env.DISABLE_NODE_FETCH_NATIVE_WARN` to disable this warning.");
}
n$2(Ui, "s"), Ol(Ui, "checkNodeEnvironment");

// ../../node_modules/.pnpm/unctx@3.0.1_magic-string@1.4.5_oxc-parser@0.157.0_rolldown@1.2.19_unplugin@3.7.0_esbuil_1043f6c5dabe422023edbde353f7d509/node_modules/unctx/dist/index.mjs
function _getAsyncLocalStorage() {
	return globalThis.AsyncLocalStorage || globalThis.process?.getBuiltinModule?.("node:async_hooks")?.AsyncLocalStorage;
}
var _WeakRef = globalThis.WeakRef || class StrongRef {
	#value;
	constructor(value) {
		this.#value = value;
	}
	deref() {
		return this.#value;
	}
};
function createContext(opts = {}) {
	let currentInstance;
	let isSingleton = false;
	const checkConflict = (instance) => {
		if (currentInstance && currentInstance !== instance) throw new Error("Context conflict");
	};
	let als;
	if (opts.asyncContext) {
		const _AsyncLocalStorage = opts.AsyncLocalStorage || _getAsyncLocalStorage();
		if (_AsyncLocalStorage) als = new _AsyncLocalStorage();
		else console.warn("[unctx] `AsyncLocalStorage` is not provided.");
	}
	const _wrapInstance = (instance) => als && instance !== null && typeof instance === "object" ? { __unctx_weak: new _WeakRef(instance) } : instance;
	const _unwrapInstance = (store) => store && store.__unctx_weak ? store.__unctx_weak.deref() : store;
	const _getCurrentInstance = () => {
		if (als) {
			const store = als.getStore();
			if (store !== void 0) return _unwrapInstance(store);
		}
		return currentInstance;
	};
	return {
		use: () => {
			const _instance = _getCurrentInstance();
			if (_instance === void 0) throw new Error("Context is not available");
			return _instance;
		},
		tryUse: () => {
			return _getCurrentInstance() ?? null;
		},
		set: (instance, replace) => {
			if (!replace) checkConflict(instance);
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
				return als ? als.run(_wrapInstance(instance), callback) : callback();
			} finally {
				if (!isSingleton) currentInstance = void 0;
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
				const r = als ? als.run(_wrapInstance(instance), callback) : callback();
				if (!isSingleton) currentInstance = void 0;
				return await r;
			} finally {
				asyncHandlers.delete(onLeave);
			}
		}
	};
}
function createNamespace(defaultOpts = {}) {
	const contexts = {};
	return { get(key, opts = {}) {
		if (!contexts[key]) contexts[key] = createContext({
			...defaultOpts,
			...opts
		});
		return contexts[key];
	} };
}
var _globalThis$1 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
var globalKey = "__unctx__";
var defaultNamespace = _globalThis$1[globalKey] || (_globalThis$1[globalKey] = createNamespace());
var getContext$1 = (key, opts = {}) => defaultNamespace.get(key, opts);
var asyncHandlersKey = "__unctx_async_handlers__";
var asyncHandlers = _globalThis$1[asyncHandlersKey] || (_globalThis$1[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
	const restores = [];
	for (const leaveHandler of asyncHandlers) {
		const restore = leaveHandler();
		if (restore) restores.push(restore);
	}
	const restore = () => {
		for (const restore of restores) restore();
	};
	let awaitable = function_();
	if (awaitable && typeof awaitable === "object" && "catch" in awaitable) awaitable = awaitable.catch((error) => {
		restore();
		throw error;
	});
	return [awaitable, restore];
}
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/internal/context.js
globalThis.__nuxt_app_ctx__ ||= {};
function getContext(key, opts) {
	return getContext$1(key, opts);
}
var captureStackTrace = Error.captureStackTrace;
var Diagnostic = class Diagnostic extends Error {
	/**
	* Alias for {@link Error.message}: the reason this diagnostic was raised.
	*/
	get why() {
		return this.message;
	}
	/**
	* @param init        structured initializer; `why` is required
	* @param captureFrom V8 stack-cutoff frame. Defaults to {@link Diagnostic}
	* so the top of the trace is the `new Diagnostic(...)` call site.
	* `defineDiagnostics` passes its action method to strip its own frames too.
	* Ignored on engines without `Error.captureStackTrace`.
	*/
	constructor(init, captureFrom = Diagnostic) {
		super(init.why, { cause: init.cause });
		this.code = this.name = init.code;
		this.docs = init.docs;
		this.fix = init.fix;
		this.sources = init.sources;
		this.data = init.data;
		captureStackTrace?.(this, captureFrom);
	}
	/**
	* Converts the diagnostic into a serializable structured object.
	*/
	toJSON() {
		return {
			name: this.name,
			why: this.why,
			fix: this.fix,
			docs: this.docs,
			sources: this.sources,
			cause: this.cause,
			data: this.data,
			stack: this.stack
		};
	}
};
/**
* Resolves the docs URL for a code from a `docsBase` (string template or
* resolver function). Shared by {@link defineDiagnostics} and
* {@link defineProdDiagnostics}. Per-code `docs` overrides are handled by the
* caller; this only covers the `docsBase`-derived case.
*
* @internal
*/
function deriveDocs(docsBase, code) {
	return typeof docsBase === "string" ? `${docsBase}/${code.toLowerCase()}` : docsBase?.(code);
}
/**
* Runtime of {@link Diagnostics.is}: matches diagnostics tagged with `id`.
*
* @internal
*/
var createRegistryIs = (id) => (error) => error instanceof Diagnostic && id in error;
/**
* Production counterpart to {@link defineDiagnostics}. Returns a `Proxy` that
* builds a minimal {@link Diagnostic} for any accessed code: the code becomes
* the instance `name`, `docs` is derived from `docsBase`, and `why` points to
* the docs URL when one exists (empty otherwise, so the thrown header is just
* the code). It carries no catalog text or data, so it stays tiny in a bundle.
*
* The strip plugin (`@nostics/unplugin`) can rewrite a `defineDiagnostics()`
* call into a `"production" === 'production'` ternary that selects this
* factory in production, dropping every `why`/`fix` string from the bundle.
*
* @example
* ```ts
* const diagnostics = defineProdDiagnostics({ docsBase: 'https://docs.example.com' })
* throw diagnostics.NUXT_B2011() // NUXT_B2011: https://docs.example.com/nuxt_b2011
* ```
*/
/* @__NO_SIDE_EFFECTS__ */
function defineProdDiagnostics(options = {}) {
	const { docsBase, reporters = [] } = options;
	const id = Symbol();
	const is = createRegistryIs(id);
	const target = Object.defineProperty({}, "is", { value: is });
	return new Proxy(target, { get(_target, code) {
		if (typeof code !== "string" || code === "toJSON") return void 0;
		if (code === "is") return is;
		const handle = (params = {}, reporterOptions = {}) => {
			const docs = deriveDocs(docsBase, code);
			const diagnostic = new Diagnostic({
				code,
				why: docs ?? "",
				docs,
				cause: params.cause,
				sources: params.sources
			}, handle);
			diagnostic[id] = 1;
			for (const reporter of reporters) reporter(diagnostic, reporterOptions);
			return diagnostic;
		};
		handle.is = (err) => is(err) && err.code === code;
		return handle;
	} });
}
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/diagnostics/_shared.js
/**
* Shared configuration for the runtime (E<N>xxx) diagnostics catalogs.
*
* Catalogs are split by domain and imported directly where used (no barrel),
* so the browser bundle only pulls in the codes a module references. Pair the
* pure-call annotations on each `defineDiagnostics()` with dev-guarded,
* statement-level report calls so report-only diagnostics strip from production.
*
* Codes are stable, fully-qualified `NUXT_E<NNNN>` identifiers. Codes with a
* dedicated docs page resolve a `see:` URL via {@link docsBase}; the rest opt
* out with `docs: false`.
*/
function docsBase(code) {
	return `https://nuxt.com/docs/4.x/errors/${code.replace("NUXT_", "").toLowerCase()}`;
}
var prodReporter = (diagnostic) => {
	console.error(`[${diagnostic.name}]`);
};
var prodReporters = [prodReporter];
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/diagnostics/core.js
/**
* E1xxx
* Core / Nuxt-instance / lifecycle runtime diagnostics.
*/
var appDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
var HASH_RE$1 = /#/g;
var AMPERSAND_RE = /&/g;
var SLASH_RE = /\//g;
var EQUAL_RE = /=/g;
var PLUS_RE = /\+/g;
var ENC_CARET_RE = /%5e/gi;
var ENC_BACKTICK_RE = /%60/gi;
var ENC_PIPE_RE$1 = /%7c/gi;
var ENC_SPACE_RE = /%20/gi;
var ENC_SLASH_RE = /%2f/gi;
function encode(text) {
	return encodeURI("" + text).replace(ENC_PIPE_RE$1, "|");
}
function encodeQueryValue(input) {
	return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE$1, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
	return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode$2(text = "") {
	try {
		return decodeURIComponent("" + text);
	} catch {
		return "" + text;
	}
}
function decodePath(text) {
	return decode$2(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
	return decode$2(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
	return decode$2(text.replace(PLUS_RE, " "));
}
function parseQuery$2(parametersString = "") {
	const object = /* @__PURE__ */ Object.create(null);
	if (parametersString[0] === "?") parametersString = parametersString.slice(1);
	for (const parameter of parametersString.split("&")) {
		const s = parameter.match(/([^=]+)=?(.*)/) || [];
		if (s.length < 2) continue;
		const key = decodeQueryKey(s[1]);
		if (key === "__proto__" || key === "constructor") continue;
		const value = decodeQueryValue(s[2] || "");
		if (object[key] === void 0) object[key] = value;
		else if (Array.isArray(object[key])) object[key].push(value);
		else object[key] = [object[key], value];
	}
	return object;
}
function encodeQueryItem(key, value) {
	if (typeof value === "number" || typeof value === "boolean") value = String(value);
	if (!value) return encodeQueryKey(key);
	if (Array.isArray(value)) return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
	return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery$2(query) {
	return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}
var PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
var PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
var PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
var PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
var TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
var JOIN_LEADING_SLASH_RE$1 = /^\.?\//;
function hasProtocol$1(inputString, opts = {}) {
	if (typeof opts === "boolean") opts = { acceptRelative: opts };
	if (opts.strict) return PROTOCOL_STRICT_REGEX.test(inputString);
	return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
	return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
	if (!respectQueryAndFragment) return input.endsWith("/");
	return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash$1(input = "", respectQueryAndFragment) {
	if (!respectQueryAndFragment) return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
	if (!hasTrailingSlash(input, true)) return input || "/";
	let path = input;
	let fragment = "";
	const fragmentIndex = input.indexOf("#");
	if (fragmentIndex !== -1) {
		path = input.slice(0, fragmentIndex);
		fragment = input.slice(fragmentIndex);
	}
	const [s0, ...s] = path.split("?");
	return ((s0.endsWith("/") ? s0.slice(0, -1) : s0) || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash$1(input = "", respectQueryAndFragment) {
	if (!respectQueryAndFragment) return input.endsWith("/") ? input : input + "/";
	if (hasTrailingSlash(input, true)) return input || "/";
	let path = input;
	let fragment = "";
	const fragmentIndex = input.indexOf("#");
	if (fragmentIndex !== -1) {
		path = input.slice(0, fragmentIndex);
		fragment = input.slice(fragmentIndex);
		if (!path) return fragment;
	}
	const [s0, ...s] = path.split("?");
	return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
	return input.startsWith("/");
}
function withLeadingSlash(input = "") {
	return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase$1(input, base) {
	if (isEmptyURL(base) || hasProtocol$1(input)) return input;
	const _base = withoutTrailingSlash$1(base);
	if (input.startsWith(_base)) {
		const nextChar = input[_base.length];
		if (!nextChar || nextChar === "/" || nextChar === "?") return input;
	}
	return joinURL$1(_base, input);
}
function withQuery(input, query) {
	const parsed = parseURL(input);
	parsed.search = stringifyQuery$2({
		...parseQuery$2(parsed.search),
		...query
	});
	return stringifyParsedURL(parsed);
}
function isEmptyURL(url) {
	return !url || url === "/";
}
function isNonEmptyURL(url) {
	return url && url !== "/";
}
function joinURL$1(base, ...input) {
	let url = base || "";
	for (const segment of input.filter((url2) => isNonEmptyURL(url2))) if (url) {
		const _segment = segment.replace(JOIN_LEADING_SLASH_RE$1, "");
		url = withTrailingSlash$1(url) + _segment;
	} else url = segment;
	return url;
}
function withHttps(input) {
	return withProtocol$1(input, "https://");
}
function withProtocol$1(input, protocol) {
	let match = input.match(PROTOCOL_REGEX);
	if (!match) match = input.match(/^\/{2,}/);
	if (!match) return protocol + input;
	return protocol + input.slice(match[0].length);
}
function isEqual$1(a, b, options = {}) {
	if (!options.trailingSlash) {
		a = withTrailingSlash$1(a);
		b = withTrailingSlash$1(b);
	}
	if (!options.leadingSlash) {
		a = withLeadingSlash(a);
		b = withLeadingSlash(b);
	}
	if (!options.encoding) {
		a = decode$2(a);
		b = decode$2(b);
	}
	return a === b;
}
var protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
	const _specialProtoMatch = input.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i);
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
	if (!hasProtocol$1(input, { acceptRelative: true })) return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
	const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
	let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
	if (protocol === "file:") path = path.replace(/\/(?=[A-Za-z]:)/, "");
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
	return (parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "") + auth + host + pathname + search + hash;
}
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/utils.js
var PROBE_ORIGIN_A = "https://a.invalid";
var PROBE_ORIGIN_B = "http://b.invalid";
var PROBE_BASE_A = `${PROBE_ORIGIN_A}/probe/`;
var PROBE_BASE_B = `${PROBE_ORIGIN_B}/probe/`;
function parseAnchorURL(value, base = PROBE_BASE_A) {
	try {
		return new URL(value, base);
	} catch {
		return null;
	}
}
function resolvesWithoutBase(value) {
	const a = parseAnchorURL(value);
	const b = parseAnchorURL(value, PROBE_BASE_B);
	return !!a && !!b && (a.origin !== PROBE_ORIGIN_A || b.origin !== PROBE_ORIGIN_B);
}
/** Whether a URL string is a path rooted at the current origin, so carries no protocol. */
function isRootedPath(value) {
	if (value[0] !== "/" || value[1] === "/" || value[1] === "\\") return false;
	return value[1] !== "	" && value[1] !== "\n" && value[1] !== "\r" || !resolvesWithoutBase(value);
}
/** Whether a URL string carries its own protocol or authority. */
function isAbsoluteHref(value) {
	return !!value && !isRootedPath(value) && resolvesWithoutBase(value);
}
/** The script-capable protocol a URL string would navigate to, or `null` when it is safe. */
function getScriptProtocol(value) {
	if (!value || isRootedPath(value)) return null;
	let resolved = parseAnchorURL(value.replace(/[\u0000-\u001F\u007F\s]+/g, ""));
	while (resolved?.protocol === "view-source:") resolved = parseAnchorURL(resolved.pathname);
	if (!resolved) return "";
	return isScriptProtocol(resolved.protocol) ? resolved.protocol : null;
}
/** Returns the value unchanged when safe to use as an anchor `href`, or `null`. */
function sanitizeAnchorHref(value) {
	return getScriptProtocol(value) === null ? value : null;
}
/** @since 3.9.0 */
function toArray$1(value) {
	return Array.isArray(value) ? value : [value];
}
// ../../node_modules/.pnpm/hookable@6.1.2/node_modules/hookable/dist/index.mjs
function flatHooks(configHooks, hooks = {}, parentName) {
	for (const key in configHooks) {
		const subHook = configHooks[key];
		const name = parentName ? `${parentName}:${key}` : key;
		if (typeof subHook === "object" && subHook !== null) flatHooks(subHook, hooks, name);
		else if (typeof subHook === "function") hooks[name] = subHook;
	}
	return hooks;
}
var createTask = /* @__PURE__ */ (() => {
	if (console.createTask) return console.createTask;
	const defaultTask = { run: (fn) => fn() };
	return () => defaultTask;
})();
function callHooks$1(hooks, args, startIndex, task) {
	for (let i = startIndex; i < hooks.length; i += 1) try {
		const result = task ? task.run(() => hooks[i](...args)) : hooks[i](...args);
		if (result && typeof result.then === "function") return Promise.resolve(result).then(() => callHooks$1(hooks, args, i + 1, task));
	} catch (error) {
		return Promise.reject(error);
	}
}
function serialTaskCaller(hooks, args, name) {
	if (hooks.length > 0) return callHooks$1(hooks, args, 0, createTask(name));
}
function parallelTaskCaller(hooks, args, name) {
	if (hooks.length > 0) {
		const task = createTask(name);
		return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
	}
}
function callEachWith(callbacks, arg0) {
	for (const callback of [...callbacks]) callback(arg0);
}
var Hookable = class {
	_hooks;
	_before;
	_after;
	_deprecatedHooks;
	_deprecatedMessages;
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
		if (!name || typeof function_ !== "function") return () => {};
		const originalName = name;
		let dep;
		while (this._deprecatedHooks[name]) {
			dep = this._deprecatedHooks[name];
			name = dep.to;
		}
		if (dep && !options.allowDeprecated) {
			let message = dep.message;
			if (!message) message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
			if (!this._deprecatedMessages) this._deprecatedMessages = /* @__PURE__ */ new Set();
			if (!this._deprecatedMessages.has(message)) {
				console.warn(message);
				this._deprecatedMessages.add(message);
			}
		}
		if (!function_.name) try {
			Object.defineProperty(function_, "name", {
				get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
				configurable: true
			});
		} catch {}
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
			if (typeof _unreg === "function") _unreg();
			_unreg = void 0;
			_function = void 0;
			return function_(...arguments_);
		};
		_unreg = this.hook(name, _function);
		return _unreg;
	}
	removeHook(name, function_) {
		const hooks = this._hooks[name];
		if (hooks) {
			const index = hooks.indexOf(function_);
			if (index !== -1) hooks.splice(index, 1);
			if (hooks.length === 0) this._hooks[name] = void 0;
		}
	}
	clearHook(name) {
		this._hooks[name] = void 0;
	}
	deprecateHook(name, deprecated) {
		this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
		const _hooks = this._hooks[name] || [];
		this._hooks[name] = void 0;
		for (const hook of _hooks) this.hook(name, hook);
	}
	deprecateHooks(deprecatedHooks) {
		for (const name in deprecatedHooks) this.deprecateHook(name, deprecatedHooks[name]);
	}
	addHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		const removeFns = Object.keys(hooks).map((key) => this.hook(key, hooks[key]));
		return () => {
			for (const unreg of removeFns) unreg();
			removeFns.length = 0;
		};
	}
	removeHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		for (const key in hooks) this.removeHook(key, hooks[key]);
	}
	removeAllHooks() {
		this._hooks = {};
	}
	callHook(name, ...args) {
		return this.callHookWith(serialTaskCaller, name, args);
	}
	callHookParallel(name, ...args) {
		return this.callHookWith(parallelTaskCaller, name, args);
	}
	callHookWith(caller, name, args) {
		const event = this._before || this._after ? {
			name,
			args,
			context: {}
		} : void 0;
		if (this._before) callEachWith(this._before, event);
		const result = caller(this._hooks[name] ? [...this._hooks[name]] : [], args, name);
		if (result instanceof Promise) return result.finally(() => {
			if (this._after && event) callEachWith(this._after, event);
		});
		if (this._after && event) callEachWith(this._after, event);
		return result;
	}
	beforeEach(function_) {
		this._before = this._before || [];
		this._before.push(function_);
		return () => {
			if (this._before !== void 0) {
				const index = this._before.indexOf(function_);
				if (index !== -1) this._before.splice(index, 1);
			}
		};
	}
	afterEach(function_) {
		this._after = this._after || [];
		this._after.push(function_);
		return () => {
			if (this._after !== void 0) {
				const index = this._after.indexOf(function_);
				if (index !== -1) this._after.splice(index, 1);
			}
		};
	}
};
function createHooks() {
	return new Hookable();
}
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fnuxt.config.mjs
var nuxtLinkDefaults = {
	"componentName": "NuxtLink"};
var asyncDataDefaults = { "deep": false };
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/nuxt.js
function getNuxtAppCtx(id = "nuxt-app") {
	return getContext(id, { asyncContext: false });
}
var NuxtPluginIndicator = "__nuxt_plugin";
/** @since 3.0.0 */
function createNuxtApp(options) {
	let hydratingCount = 0;
	const nuxtApp = {
		_id: options.id || "nuxt-app",
		_scope: effectScope(),
		provide: void 0,
		versions: {
			get nuxt() {
				return "4.7.0";
			},
			get vue() {
				return nuxtApp.vueApp.version;
			}
		},
		payload: shallowReactive({
			...options.ssrContext?.payload || {},
			data: shallowReactive({}),
			state: reactive({}),
			once: /* @__PURE__ */ new Set(),
			_errors: shallowReactive({})
		}),
		static: { data: {} },
		runWithContext(fn) {
			if (nuxtApp._scope.active && !getCurrentScope()) return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
			return callWithNuxt(nuxtApp, fn);
		},
		isHydrating: false,
		deferHydration() {
			if (!nuxtApp.isHydrating) return () => {};
			hydratingCount++;
			let called = false;
			return () => {
				if (called) return;
				called = true;
				hydratingCount--;
				if (hydratingCount === 0) {
					nuxtApp.isHydrating = false;
					return nuxtApp.callHook("app:suspense:resolve");
				}
			};
		},
		_asyncDataPromises: Object.create(null),
		_asyncData: shallowReactive(Object.create(null)),
		_state: shallowReactive({}),
		_payloadRevivers: {},
		...options
	};
	nuxtApp.payload.serverRendered = true;
	if (nuxtApp.ssrContext) {
		nuxtApp.payload.path = nuxtApp.ssrContext.url;
		nuxtApp.ssrContext.nuxt = nuxtApp;
		nuxtApp.ssrContext.payload = nuxtApp.payload;
		nuxtApp.ssrContext.config = {
			public: nuxtApp.ssrContext.runtimeConfig.public,
			app: nuxtApp.ssrContext.runtimeConfig.app
		};
	}
	nuxtApp.hooks = createHooks();
	nuxtApp.hook = nuxtApp.hooks.hook;
	{
		const runHooks = async (hooks, args) => {
			for (const hook of hooks) await nuxtApp.runWithContext(() => hook(...args));
		};
		const contextCaller = runHooks;
		nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, args);
	}
	nuxtApp.callHook = nuxtApp.hooks.callHook;
	nuxtApp.provide = (name, value) => {
		const $name = "$" + name;
		defineGetter(nuxtApp, $name, value);
		defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
	};
	defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
	defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
	const runtimeConfig = options.ssrContext.runtimeConfig;
	nuxtApp.provide("config", runtimeConfig);
	return nuxtApp;
}
/** @since 3.12.0 */
function registerPluginHooks(nuxtApp, plugin) {
	if (plugin.hooks) nuxtApp.hooks.addHooks(plugin.hooks);
}
/** @since 3.0.0 */
async function applyPlugin(nuxtApp, plugin) {
	if (typeof plugin === "function") {
		const run = () => nuxtApp.runWithContext(() => plugin(nuxtApp));
		const { provide } = await run() || {};
		if (provide && typeof provide === "object") for (const key in provide) nuxtApp.provide(key, provide[key]);
	}
}
/** @since 3.0.0 */
async function applyPlugins(nuxtApp, plugins) {
	return applyPluginsWithDependencies(nuxtApp, plugins);
}
async function applyPluginsWithDependencies(nuxtApp, plugins) {
	const resolvedPlugins = /* @__PURE__ */ new Set();
	const unresolvedPlugins = [];
	const parallels = [];
	let error;
	let promiseDepth = 0;
	const activePlugins = plugins;
	async function executePlugin(plugin) {
		const unresolvedPluginsForThisPlugin = plugin.dependsOn?.filter((name) => activePlugins.some((p) => p._name === name) && !resolvedPlugins.has(name)) ?? [];
		if (unresolvedPluginsForThisPlugin.length > 0) unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin]);
		else {
			const promise = applyPlugin(nuxtApp, plugin).then(async () => {
				if (plugin._name) {
					resolvedPlugins.add(plugin._name);
					await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
						if (dependsOn.has(plugin._name)) {
							dependsOn.delete(plugin._name);
							if (dependsOn.size === 0) {
								promiseDepth++;
								await executePlugin(unexecutedPlugin);
							}
						}
					}));
				}
			}).catch((e) => {
				if (!plugin.parallel && !nuxtApp.payload.error) throw e;
				error ||= e;
			});
			if (plugin.parallel) parallels.push(promise);
			else await promise;
		}
	}
	for (const plugin of activePlugins) registerPluginHooks(nuxtApp, plugin);
	for (const plugin of activePlugins) await executePlugin(plugin);
	await Promise.all(parallels);
	if (promiseDepth) for (let i = 0; i < promiseDepth; i++) await Promise.all(parallels);
	if (error) throw nuxtApp.payload.error || error;
}
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtPlugin(plugin) {
	if (typeof plugin === "function") return plugin;
	const _name = plugin._name || plugin.name;
	delete plugin.name;
	return Object.assign(plugin.setup || (() => {}), plugin, {
		[NuxtPluginIndicator]: true,
		_name
	});
}
var definePayloadPlugin = defineNuxtPlugin;
/**
* Ensures that the setup function passed in has access to the Nuxt instance via `useNuxtApp`.
* @param nuxt A Nuxt instance
* @param setup The function to call
* @since 3.0.0
*/
function callWithNuxt(nuxt, setup, args) {
	const fn = () => setup();
	const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
	return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
}
function tryUseNuxtApp(id) {
	let nuxtAppInstance;
	if (hasInjectionContext()) nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
	nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
	return nuxtAppInstance || null;
}
function useNuxtApp(id) {
	const nuxtAppInstance = tryUseNuxtApp(id);
	if (!nuxtAppInstance) throw appDiagnostics.NUXT_E1001();
	return nuxtAppInstance;
}
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function useRuntimeConfig(_event) {
	return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
	Object.defineProperty(obj, key, { get: () => val });
}
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/injections.js
var LayoutMetaSymbol = Symbol("layout-meta");
var LayoutSymbol = Symbol("layout");
var PageRouteSymbol = Symbol("route");
// ../../node_modules/.pnpm/cookie-es@1.2.3/node_modules/cookie-es/dist/index.mjs
var NullObject$1 = /* @__PURE__ */ (() => {
	const C = function() {};
	C.prototype = /* @__PURE__ */ Object.create(null);
	return C;
})();
function parse$1(str, options) {
	if (typeof str !== "string") throw new TypeError("argument str must be a string");
	const obj = new NullObject$1();
	const opt = {};
	const dec = opt.decode || decode$1;
	let index = 0;
	while (index < str.length) {
		const eqIdx = str.indexOf("=", index);
		if (eqIdx === -1) break;
		let endIdx = str.indexOf(";", index);
		if (endIdx === -1) endIdx = str.length;
		else if (endIdx < eqIdx) {
			index = str.lastIndexOf(";", eqIdx - 1) + 1;
			continue;
		}
		const key = str.slice(index, eqIdx).trim();
		if (opt?.filter && !opt?.filter(key)) {
			index = endIdx + 1;
			continue;
		}
		if (void 0 === obj[key]) {
			let val = str.slice(eqIdx + 1, endIdx).trim();
			if (val.codePointAt(0) === 34) val = val.slice(1, -1);
			obj[key] = tryDecode(val, dec);
		}
		index = endIdx + 1;
	}
	return obj;
}
function decode$1(str) {
	return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode(str, decode2) {
	try {
		return decode2(str);
	} catch {
		return str;
	}
}
var fieldContentRegExp = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
function serialize$2(name, value, options) {
	const opt = options || {};
	const enc = opt.encode || encodeURIComponent;
	if (typeof enc !== "function") throw new TypeError("option encode is invalid");
	if (!fieldContentRegExp.test(name)) throw new TypeError("argument name is invalid");
	const encodedValue = enc(value);
	if (encodedValue && !fieldContentRegExp.test(encodedValue)) throw new TypeError("argument val is invalid");
	let str = name + "=" + encodedValue;
	if (void 0 !== opt.maxAge && opt.maxAge !== null) {
		const maxAge = opt.maxAge - 0;
		if (Number.isNaN(maxAge) || !Number.isFinite(maxAge)) throw new TypeError("option maxAge is invalid");
		str += "; Max-Age=" + Math.floor(maxAge);
	}
	if (opt.domain) {
		if (!fieldContentRegExp.test(opt.domain)) throw new TypeError("option domain is invalid");
		str += "; Domain=" + opt.domain;
	}
	if (opt.path) {
		if (!fieldContentRegExp.test(opt.path)) throw new TypeError("option path is invalid");
		str += "; Path=" + opt.path;
	}
	if (opt.expires) {
		if (!isDate$2(opt.expires) || Number.isNaN(opt.expires.valueOf())) throw new TypeError("option expires is invalid");
		str += "; Expires=" + opt.expires.toUTCString();
	}
	if (opt.httpOnly) str += "; HttpOnly";
	if (opt.secure) str += "; Secure";
	if (opt.priority) switch (typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority) {
		case "low":
			str += "; Priority=Low";
			break;
		case "medium":
			str += "; Priority=Medium";
			break;
		case "high":
			str += "; Priority=High";
			break;
		default: throw new TypeError("option priority is invalid");
	}
	if (opt.sameSite) switch (typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite) {
		case true:
			str += "; SameSite=Strict";
			break;
		case "lax":
			str += "; SameSite=Lax";
			break;
		case "strict":
			str += "; SameSite=Strict";
			break;
		case "none":
			str += "; SameSite=None";
			break;
		default: throw new TypeError("option sameSite is invalid");
	}
	if (opt.partitioned) str += "; Partitioned";
	return str;
}
function isDate$2(val) {
	return Object.prototype.toString.call(val) === "[object Date]" || val instanceof Date;
}
function parseSetCookie$1(setCookieValue, options) {
	const parts = (setCookieValue || "").split(";").filter((str) => typeof str === "string" && !!str.trim());
	const parsed = _parseNameValuePair(parts.shift() || "");
	const name = parsed.name;
	let value = parsed.value;
	try {
		value = options?.decode === false ? value : (options?.decode || decodeURIComponent)(value);
	} catch {}
	const cookie = {
		name,
		value
	};
	for (const part of parts) {
		const sides = part.split("=");
		const partKey = (sides.shift() || "").trimStart().toLowerCase();
		const partValue = sides.join("=");
		switch (partKey) {
			case "expires":
				cookie.expires = new Date(partValue);
				break;
			case "max-age":
				cookie.maxAge = Number.parseInt(partValue, 10);
				break;
			case "secure":
				cookie.secure = true;
				break;
			case "httponly":
				cookie.httpOnly = true;
				break;
			case "samesite":
				cookie.sameSite = partValue;
				break;
			default: cookie[partKey] = partValue;
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
	} else value = nameValuePairStr;
	return {
		name,
		value
	};
}
// ../../node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs
function isPlainObject$2(value) {
	if (value === null || typeof value !== "object") return false;
	const prototype = Object.getPrototypeOf(value);
	if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) return false;
	if (Symbol.iterator in value) return false;
	if (Symbol.toStringTag in value) return Object.prototype.toString.call(value) === "[object Module]";
	return true;
}
function _defu(baseObject, defaults, namespace = ".", merger) {
	if (!isPlainObject$2(defaults)) return _defu(baseObject, {}, namespace, merger);
	const object = { ...defaults };
	for (const key of Object.keys(baseObject)) {
		if (key === "__proto__" || key === "constructor") continue;
		const value = baseObject[key];
		if (value === null || value === void 0) continue;
		if (merger && merger(object, key, value, namespace)) continue;
		if (Array.isArray(value) && Array.isArray(object[key])) object[key] = [...value, ...object[key]];
		else if (isPlainObject$2(value) && isPlainObject$2(object[key])) object[key] = _defu(value, object[key], (namespace ? `${namespace}.` : "") + key.toString(), merger);
		else object[key] = value;
	}
	return object;
}
function createDefu(merger) {
	return (...arguments_) => arguments_.reduce((p, c) => _defu(p, c, "", merger), {});
}
var defu = createDefu();
// ../../node_modules/.pnpm/destr@2.0.5/node_modules/destr/dist/index.mjs
var suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
var suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
var JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
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
	if (typeof value !== "string") return value;
	if (value[0] === "\"" && value[value.length - 1] === "\"" && value.indexOf("\\") === -1) return value.slice(1, -1);
	const _value = value.trim();
	if (_value.length <= 9) switch (_value.toLowerCase()) {
		case "true": return true;
		case "false": return false;
		case "undefined": return;
		case "null": return null;
		case "nan": return NaN;
		case "infinity": return Number.POSITIVE_INFINITY;
		case "-infinity": return Number.NEGATIVE_INFINITY;
	}
	if (!JsonSigRx.test(value)) {
		if (options.strict) throw new SyntaxError("[destr] Invalid JSON");
		return value;
	}
	try {
		if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
			if (options.strict) throw new Error("[destr] Possible prototype pollution");
			return JSON.parse(value, jsonParseTransform);
		}
		return JSON.parse(value);
	} catch (error) {
		if (options.strict) throw error;
		return value;
	}
}
// ../../node_modules/.pnpm/h3@1.15.11/node_modules/h3/dist/index.mjs
function hasProp(obj, prop) {
	try {
		return prop in obj;
	} catch {
		return false;
	}
}
var H3Error = class extends Error {
	static __h3_error__ = true;
	statusCode = 500;
	fatal = false;
	unhandled = false;
	statusMessage;
	data;
	cause;
	constructor(message, opts = {}) {
		super(message, opts);
		if (opts.cause && !this.cause) this.cause = opts.cause;
	}
	toJSON() {
		const obj = {
			message: this.message,
			statusCode: sanitizeStatusCode(this.statusCode, 500)
		};
		if (this.statusMessage) obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
		if (this.data !== void 0) obj.data = this.data;
		return obj;
	}
};
function createError$1(input) {
	if (typeof input === "string") return new H3Error(input);
	if (isError(input)) return input;
	const err = new H3Error(input.message ?? input.statusMessage ?? "", { cause: input.cause || input });
	if (hasProp(input, "stack")) try {
		Object.defineProperty(err, "stack", { get() {
			return input.stack;
		} });
	} catch {
		try {
			err.stack = input.stack;
		} catch {}
	}
	if (input.data) err.data = input.data;
	if (input.statusCode) err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
	else if (input.status) err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
	if (input.statusMessage) err.statusMessage = input.statusMessage;
	else if (input.statusText) err.statusMessage = input.statusText;
	if (err.statusMessage) {
		const originalMessage = err.statusMessage;
		if (sanitizeStatusMessage(err.statusMessage) !== originalMessage) console.warn("[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default.");
	}
	if (input.fatal !== void 0) err.fatal = input.fatal;
	if (input.unhandled !== void 0) err.unhandled = input.unhandled;
	return err;
}
function isError(input) {
	return input?.constructor?.__h3_error__ === true;
}
function getRequestHeaders$1(event) {
	const _headers = {};
	for (const key in event.node.req.headers) {
		const val = event.node.req.headers[key];
		_headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
	}
	return _headers;
}
function getRequestHeader$1(event, name) {
	return getRequestHeaders$1(event)[name.toLowerCase()];
}
function getRequestHost(event, opts = {}) {
	if (opts.xForwardedHost) {
		const xForwardedHost = (event.node.req.headers["x-forwarded-host"] || "").split(",").shift()?.trim();
		if (xForwardedHost) return xForwardedHost;
	}
	return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
	if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") return "https";
	return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
	const host = getRequestHost(event, opts);
	const protocol = getRequestProtocol(event, opts);
	const path = (event.node.req.originalUrl || event.path).replace(/^[/\\]+/g, "/");
	return new URL(path, `${protocol}://${host}`);
}
var DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
	return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
	if (!statusCode) return defaultStatusCode;
	if (typeof statusCode === "string") statusCode = Number.parseInt(statusCode, 10);
	if (statusCode < 100 || statusCode > 999) return defaultStatusCode;
	return statusCode;
}
function getDistinctCookieKey(name, opts) {
	return [
		name,
		opts.domain || "",
		opts.path || "/"
	].join(";");
}
function parseCookies(event) {
	return parse$1(event.node.req.headers.cookie || "");
}
function getCookie(event, name) {
	return parseCookies(event)[name];
}
function setCookie(event, name, value, serializeOptions = {}) {
	if (!serializeOptions.path) serializeOptions = {
		path: "/",
		...serializeOptions
	};
	const newCookie = serialize$2(name, value, serializeOptions);
	const currentCookies = splitCookiesString(event.node.res.getHeader("set-cookie"));
	if (currentCookies.length === 0) {
		event.node.res.setHeader("set-cookie", newCookie);
		return;
	}
	const newCookieKey = getDistinctCookieKey(name, serializeOptions);
	event.node.res.removeHeader("set-cookie");
	for (const cookie of currentCookies) {
		const parsed = parseSetCookie$1(cookie);
		if (getDistinctCookieKey(parsed.name, parsed) === newCookieKey) continue;
		event.node.res.appendHeader("set-cookie", cookie);
	}
	event.node.res.appendHeader("set-cookie", newCookie);
}
function deleteCookie(event, name, serializeOptions) {
	setCookie(event, name, "", {
		...serializeOptions,
		maxAge: 0
	});
}
function splitCookiesString(cookiesString) {
	if (Array.isArray(cookiesString)) return cookiesString.flatMap((c) => splitCookiesString(c));
	if (typeof cookiesString !== "string") return [];
	const cookiesStrings = [];
	let pos = 0;
	let start;
	let ch;
	let lastComma;
	let nextStart;
	let cookiesSeparatorFound;
	const skipWhitespace = () => {
		while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) pos += 1;
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
				while (pos < cookiesString.length && notSpecialChar()) pos += 1;
				if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
					cookiesSeparatorFound = true;
					pos = nextStart;
					cookiesStrings.push(cookiesString.slice(start, lastComma));
					start = pos;
				} else pos = lastComma + 1;
			} else pos += 1;
		}
		if (!cookiesSeparatorFound || pos >= cookiesString.length) cookiesStrings.push(cookiesString.slice(start));
	}
	return cookiesStrings;
}
function getResponseHeader(event, name) {
	return event.node.res.getHeader(name);
}
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/error.js
var NUXT_ERROR_SIGNATURE = "__nuxt_error";
/** @since 3.0.0 */
var isNuxtError = (error) => !!error && typeof error === "object" && "__nuxt_error" in error;
/** @since 3.0.0 */
var createError = (error) => {
	if (isNuxtError(error)) return error;
	if (typeof error !== "string" && error?.statusText) error.message ??= error.statusText;
	const nuxtError = createError$1(error ?? {});
	Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
		value: true,
		configurable: false,
		writable: false
	});
	if (typeof nuxtError.status !== "number") {
		Object.defineProperty(nuxtError, "status", {
			get: () => nuxtError.statusCode,
			configurable: true
		});
		Object.defineProperty(nuxtError, "statusText", {
			get: () => nuxtError.statusMessage,
			configurable: true
		});
	}
	return nuxtError;
};
/** An error raised deliberately with an HTTP status, as h3 recognises one. */
function isHTTPError(value) {
	return value instanceof Error && value.constructor?.__h3_error__ === true;
}
/**
* Wrap whatever the app threw. Anything other than an HTTP error is marked `unhandled`,
* which keeps its message and `data` out of the response and the payload. In development
* the thrown value and where the app was are remembered for the error report.
*
* @internal
*/
function createErrorFromThrown(thrown, context) {
	const error = createError(thrown);
	if (error !== thrown && !isHTTPError(thrown)) error.unhandled = true;
	return error;
}
/**
* Whether an error thrown on the server should be masked from the client.
*
* Only errors deliberately raised with an HTTP status and `$fetch` errors with a
* response status share their status, message and data.
*
* @internal
*/
function isUntrustedError(error) {
	if (error instanceof Error && error.name === "FetchError" && typeof error.status === "number") return false;
	return !!createErrorFromThrown(error).unhandled;
}
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/diagnostics/navigation.js
/**
* E2xxx
* Navigation / routing / middleware runtime diagnostics.
*/
var navigationDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/vfor.js
/**
* Upper bound on `v-for` iterations expanded server-side in a server component or island.
* Island props are attacker-controllable, so a large numeric `v-for` source is a
* memory-amplification vector; this caps it.
*
* @internal
*/
var MAX_VFOR_LENGTH = 1e4;
/**
* Clamp a numeric `v-for` source before iteration. Only numbers are bounded (the
* amplification vector); other sources are returned unchanged.
*
* @internal
*/
function vforBound(source) {
	if (typeof source !== "number" || source <= 1e4) return source;
	return MAX_VFOR_LENGTH;
}
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/utils.js
/**
* Internal utility
* @private
*/
var _wrapInTransition = (props, children) => {
	return { default: () => children.default?.() };
};
function getRouteKey(route) {
	const key = route.meta.key ?? route.path;
	return typeof key === "function" ? key(route) : key;
}
/**
* Utility used within router guards
* return true if the route has been changed with a page change during navigation
*/
function isChangingPage(to, from) {
	if (to === from || from === START_LOCATION) return false;
	if (getRouteKey(to) !== getRouteKey(from)) return true;
	return !to.matched.every((comp, index) => comp.components && comp.components.default === from.matched[index]?.components?.default);
}
/**
* Internal utility
* @private
*/
function _mergeTransitionProps(routeProps) {
	const _props = [];
	for (const prop of routeProps) {
		if (!prop) continue;
		_props.push({
			...prop,
			onAfterLeave: prop.onAfterLeave ? toArray$1(prop.onAfterLeave) : void 0,
			onBeforeLeave: prop.onBeforeLeave ? toArray$1(prop.onBeforeLeave) : void 0
		});
	}
	return defu(..._props);
}
function _startTransition(nuxtApp) {
	nuxtApp["~transitionPromise"] ||= new Promise((resolve) => {
		nuxtApp["~transitionFinish"] = resolve;
	});
}
function _finishTransition(nuxtApp) {
	nuxtApp["~transitionFinish"]?.();
	delete nuxtApp["~transitionFinish"];
	delete nuxtApp["~transitionPromise"];
}
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/pages/runtime/router.options.js
var router_options_default = { scrollBehavior(to, from, savedPosition) {
	const nuxtApp = useNuxtApp();
	const router = useRouter();
	const hashScrollBehaviour = router.options?.scrollBehaviorType ?? "auto";
	if (from === START_LOCATION && !savedPosition && !to.hash) return false;
	if (to.path.replace(/\/$/, "") === from.path.replace(/\/$/, "")) {
		if (from.hash && !to.hash) return savedPosition ?? {
			left: 0,
			top: 0
		};
		if (to.hash) return {
			el: to.hash,
			top: _getHashElementScrollMarginTop(to.hash),
			behavior: hashScrollBehaviour
		};
		return false;
	}
	if ((typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop) === false) return false;
	if (from === START_LOCATION) return _calculatePosition(to, from, savedPosition, hashScrollBehaviour);
	return new Promise((resolve) => {
		const doScroll = () => {
			requestAnimationFrame(() => {
				if (router.currentRoute.value.fullPath !== to.fullPath) {
					resolve(false);
					return;
				}
				resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour));
			});
		};
		nuxtApp.hooks.hookOnce("page:loading:end", () => {
			const transitionPromise = nuxtApp["~transitionPromise"];
			if (transitionPromise) transitionPromise.then(doScroll);
			else doScroll();
		});
	});
} };
function _getHashElementScrollMarginTop(hash) {
	const elem = (void 0).getElementById(hash.slice(1));
	if (!elem) return 0;
	return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
	if (savedPosition) return savedPosition;
	if (to.hash) return {
		el: to.hash,
		top: _getHashElementScrollMarginTop(to.hash),
		behavior: isChangingPage(to, from) ? defaultHashScrollBehaviour : "instant"
	};
	return {
		left: 0,
		top: 0
	};
}
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default = {
	hashMode: false,
	scrollBehaviorType: "auto",
	sensitive: false,
	...router_options_default
};
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fpages.mjs
var parseQuery$1 = (search) => (virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.parseQuery || parseQuery)(search[0] === "?" ? search.slice(1) : search);
var stringifyQuery$1 = (query) => (virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.stringifyQuery || stringifyQuery)(query);
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/composables/router.js
/** @since 3.0.0 */
var useRouter = (() => {
	return useNuxtApp()?.$router;
});
/**
* Whether the current effect scope is (a descendant of) the component instance's scope.
* A detached scope (e.g. `createSharedComposable`) outlives the component, so the
* per-page route injected there would freeze after navigation (#18903).
*/
function getParentScope(scope) {
	const internal = scope;
	return internal.parent ?? internal.subs?.sub;
}
function isScopeWithinInstance(instance) {
	const instanceScope = instance.scope;
	let scope = getCurrentScope();
	while (scope) {
		if (scope === instanceScope) return true;
		scope = getParentScope(scope);
	}
	return false;
}
/** @since 3.0.0 */
var useRoute = (() => {
	if (hasInjectionContext()) {
		const instance = getCurrentInstance();
		if (!instance || isScopeWithinInstance(instance)) return inject(PageRouteSymbol, useNuxtApp()._route);
	}
	return useNuxtApp()._route;
});
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtRouteMiddleware(middleware) {
	return middleware;
}
/** @since 3.0.0 */
var isProcessingMiddleware = () => {
	try {
		if (useNuxtApp()._processingMiddleware) return true;
	} catch {
		return false;
	}
	return false;
};
var HTML_ATTR_UNSAFE_RE = /[&"'<>]/g;
var HTML_ATTR_ENCODE_MAP = {
	"&": "&amp;",
	"\"": "&quot;",
	"'": "&#x27;",
	"<": "&lt;",
	">": "&gt;"
};
function encodeForHtmlAttr(value) {
	return value.replace(HTML_ATTR_UNSAFE_RE, (c) => HTML_ATTR_ENCODE_MAP[c]);
}
function navigateTo(to, options) {
	to ||= "/";
	const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
	if (options?.open) {
		const protocol = getScriptProtocol(toPath);
		if (protocol !== null) throw navigationDiagnostics.NUXT_E2002({
			toPath,
			protocol
		});
		return Promise.resolve();
	}
	const isExternalHost = isAbsoluteHref(toPath);
	const isExternal = options?.external || isExternalHost;
	if (isExternal) {
		if (!options?.external) throw navigationDiagnostics.NUXT_E2001({ toPath });
		const protocol = getScriptProtocol(toPath);
		if (protocol !== null) throw navigationDiagnostics.NUXT_E2002({
			toPath,
			protocol
		});
	}
	const inMiddleware = isProcessingMiddleware();
	const router = useRouter();
	const nuxtApp = useNuxtApp();
	if (nuxtApp.ssrContext) {
		const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
		let location = isExternal ? toPath : joinURL$1((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
		const redirect = async function(response) {
			const encodedHeader = encodeURL(location, isExternalHost);
			const encodedLoc = encodeForHtmlAttr(encodedHeader);
			nuxtApp.ssrContext["~renderResponse"] = {
				statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
				body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
				headers: { location: encodedHeader }
			};
			await nuxtApp.callHook("app:redirected");
			return response;
		};
		if (!isExternal && inMiddleware) {
			let expectedPath = fullPath;
			if (typeof to === "string" && toPath.includes("?")) {
				const target = router.resolve(to);
				expectedPath = router.resolve({
					path: target.path,
					query: target.query,
					hash: target.hash
				}).fullPath || "/";
				location = joinURL$1((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, expectedPath);
			}
			router.afterEach((final) => final.fullPath === expectedPath ? redirect(false) : void 0);
			return to;
		}
		return redirect(!inMiddleware ? void 0 : false);
	}
	if (isExternal) {
		nuxtApp._cookieWriters?.forEach((write) => write());
		(void 0).addEventListener("pagehide", (event) => {
			if (!event.persisted) nuxtApp._scope.stop();
		}, { once: true });
		if (options?.replace) (void 0).replace(toPath);
		else (void 0).href = toPath;
		if (inMiddleware) {
			if (!nuxtApp.isHydrating) return false;
			return new Promise(() => {});
		}
		return Promise.resolve();
	}
	const encodedTo = typeof to === "string" ? encodeRoutePath(to) : to;
	return options?.replace ? router.replace(encodedTo) : router.push(encodedTo);
}
/**
* @internal
*/
function resolveRouteObject(to) {
	const parsed = parseURL(to.path || "");
	const search = stringifyQuery$1({
		...parsed.search && parseQuery$1(parsed.search),
		...to.query
	});
	parsed.search = search && "?" + search;
	return stringifyParsedURL(parsed) + (to.hash || "");
}
/**
* @internal
*/
function encodeURL(location, isExternalHost = false) {
	const url = new URL(location, "http://localhost");
	if (!isExternalHost) return url.pathname.replace(/^\/{2,}/, "/") + url.search + url.hash;
	if (location.startsWith("//")) return url.toString().replace(url.protocol, "");
	return url.toString();
}
/**
* Encode the pathname of a route location string. Ensures decoded paths like
* `/café` are percent-encoded to match vue-router's encoded route records.
* Already-encoded paths are not double-encoded.
* @internal
*/
function encodeRoutePath(url) {
	const parsed = parseURL(url);
	return encodeVueRouterPath(decodePath(parsed.pathname)) + parsed.search + parsed.hash;
}
var ENC_PIPE_RE = /%7C/g;
var ENC_BRACKET_OPEN_RE = /%5B/g;
var ENC_BRACKET_CLOSE_RE = /%5D/g;
var ENC_ENC_SLASH_RE = /%252F/gi;
var HASH_RE$2 = /#/g;
var QUESTION_MARK_RE = /\?/g;
/**
* Apply vue-router's own path encoding, which leaves sub-delimiters like `&`
* and `+` literal. This must stay in sync with `encodeVueRouterPath` in
* `unrouting`, which encodes the route records we need to match against.
*/
function encodeVueRouterPath(value) {
	return encodeURI(value).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]").replace(HASH_RE$2, "%23").replace(QUESTION_MARK_RE, "%3F").replace(ENC_ENC_SLASH_RE, "%2F");
}
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/composables/error.js
/** @since 3.0.0 */
var useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
/** @since 3.0.0 */
var showError = (error) => {
	const nuxtError = createError(error);
	try {
		const error = /* @__PURE__ */ useError();
		error.value ||= nuxtError;
	} catch {
		throw nuxtError;
	}
	return nuxtError;
};
/**
* Call a user-provided `app.config.errorHandler` for an error stopped by an
* `onErrorCaptured` hook, which prevents Vue from invoking it (#22691).
*
* @internal
*/
var _invokeAppErrorHandler = (nuxtApp, err, target, info) => {
	const errorHandler = nuxtApp.vueApp.config.errorHandler;
	if (errorHandler && !errorHandler.__nuxt_default) try {
		errorHandler(err, target, info);
	} catch (handlerError) {
		console.error("[nuxt] Error in `app.config.errorHandler`", handlerError);
	}
};
/**
* Show the error page unless the current client is a crawler, in which case the
* bot receives the already server-rendered HTML instead (#32137, #35338).
*
* @internal
*/
var _showErrorUnlessCrawler = async (nuxtApp, error) => {
	await nuxtApp.runWithContext(() => showError(createErrorFromThrown(error)));
};
/** @since 3.0.0 */
var clearError = async (options = {}) => {
	const nuxtApp = useNuxtApp();
	const error = /* @__PURE__ */ useError();
	nuxtApp.callHook("app:error:cleared", options);
	if (options.redirect) await useRouter().replace(options.redirect);
	error.value = void 0;
};
// ../../node_modules/.pnpm/node-fetch-native@1.6.7/node_modules/node-fetch-native/dist/index.mjs
var o = !!globalThis.process?.env?.FORCE_NODE_FETCH;
var r = !o && globalThis.fetch || Mi;
var n = !o && globalThis.Headers || ye;
var T = !o && globalThis.AbortController || Mn;
// ../../node_modules/.pnpm/ofetch@1.5.1/node_modules/ofetch/dist/shared/ofetch.CWycOUEr.mjs
var FetchError = class extends Error {
	constructor(message, opts) {
		super(message, opts);
		this.name = "FetchError";
		if (opts?.cause && !this.cause) this.cause = opts.cause;
	}
};
function createFetchError(ctx) {
	const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
	const method = ctx.request?.method || ctx.options?.method || "GET";
	const url = ctx.request?.url || String(ctx.request) || "/";
	const fetchError = new FetchError(`${`[${method}] ${JSON.stringify(url)}`}: ${ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>"}${errorMessage ? ` ${errorMessage}` : ""}`, ctx.error ? { cause: ctx.error } : void 0);
	for (const key of [
		"request",
		"options",
		"response"
	]) Object.defineProperty(fetchError, key, { get() {
		return ctx[key];
	} });
	for (const [key, refKey] of [
		["data", "_data"],
		["status", "status"],
		["statusCode", "status"],
		["statusText", "statusText"],
		["statusMessage", "statusText"]
	]) Object.defineProperty(fetchError, key, { get() {
		return ctx.response && ctx.response[refKey];
	} });
	return fetchError;
}
var payloadMethods = new Set(Object.freeze([
	"PATCH",
	"POST",
	"PUT",
	"DELETE"
]));
function isPayloadMethod(method = "GET") {
	return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
	if (value === void 0) return false;
	const t = typeof value;
	if (t === "string" || t === "number" || t === "boolean" || t === null) return true;
	if (t !== "object") return false;
	if (Array.isArray(value)) return true;
	if (value.buffer) return false;
	if (value instanceof FormData || value instanceof URLSearchParams) return false;
	return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
var textTypes = /* @__PURE__ */ new Set([
	"image/svg",
	"application/xml",
	"application/xhtml",
	"application/html"
]);
var JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
	if (!_contentType) return "json";
	const contentType = _contentType.split(";").shift() || "";
	if (JSON_RE.test(contentType)) return "json";
	if (contentType === "text/event-stream") return "stream";
	if (textTypes.has(contentType) || contentType.startsWith("text/")) return "text";
	return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
	const headers = mergeHeaders(input?.headers ?? request?.headers, defaults?.headers, Headers);
	let query;
	if (defaults?.query || defaults?.params || input?.params || input?.query) query = {
		...defaults?.params,
		...defaults?.query,
		...input?.params,
		...input?.query
	};
	return {
		...defaults,
		...input,
		query,
		params: query,
		headers
	};
}
function mergeHeaders(input, defaults, Headers) {
	if (!defaults) return new Headers(input);
	const headers = new Headers(defaults);
	if (input) for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) headers.set(key, value);
	return headers;
}
async function callHooks(context, hooks) {
	if (hooks) {
		if (Array.isArray(hooks)) for (const hook of hooks) await hook(context);
		else await hooks(context);
	}
}
var retryStatusCodes = /* @__PURE__ */ new Set([
	408,
	409,
	425,
	429,
	500,
	502,
	503,
	504
]);
var nullBodyResponses = /* @__PURE__ */ new Set([
	101,
	204,
	205,
	304
]);
function createFetch(globalOptions = {}) {
	const { fetch = globalThis.fetch, Headers = globalThis.Headers, AbortController = globalThis.AbortController } = globalOptions;
	async function onError(context) {
		const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
		if (context.options.retry !== false && !isAbort) {
			let retries;
			if (typeof context.options.retry === "number") retries = context.options.retry;
			else retries = isPayloadMethod(context.options.method) ? 0 : 1;
			const responseCode = context.response && context.response.status || 500;
			if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
				const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
				if (retryDelay > 0) await new Promise((resolve) => setTimeout(resolve, retryDelay));
				return $fetchRaw(context.request, {
					...context.options,
					retry: retries - 1
				});
			}
		}
		const error = createFetchError(context);
		if (Error.captureStackTrace) Error.captureStackTrace(error, $fetchRaw);
		throw error;
	}
	const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
		const context = {
			request: _request,
			options: resolveFetchOptions(_request, _options, globalOptions.defaults, Headers),
			response: void 0,
			error: void 0
		};
		if (context.options.method) context.options.method = context.options.method.toUpperCase();
		if (context.options.onRequest) {
			await callHooks(context, context.options.onRequest);
			if (!(context.options.headers instanceof Headers)) context.options.headers = new Headers(context.options.headers || {});
		}
		if (typeof context.request === "string") {
			if (context.options.baseURL) context.request = withBase$1(context.request, context.options.baseURL);
			if (context.options.query) {
				context.request = withQuery(context.request, context.options.query);
				delete context.options.query;
			}
			if ("query" in context.options) delete context.options.query;
			if ("params" in context.options) delete context.options.params;
		}
		if (context.options.body && isPayloadMethod(context.options.method)) {
			if (isJSONSerializable(context.options.body)) {
				const contentType = context.options.headers.get("content-type");
				if (typeof context.options.body !== "string") context.options.body = contentType === "application/x-www-form-urlencoded" ? new URLSearchParams(context.options.body).toString() : JSON.stringify(context.options.body);
				if (!contentType) context.options.headers.set("content-type", "application/json");
				if (!context.options.headers.has("accept")) context.options.headers.set("accept", "application/json");
			} else if ("pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || typeof context.options.body.pipe === "function") {
				if (!("duplex" in context.options)) context.options.duplex = "half";
			}
		}
		let abortTimeout;
		if (!context.options.signal && context.options.timeout) {
			const controller = new AbortController();
			abortTimeout = setTimeout(() => {
				const error = /* @__PURE__ */ new Error("[TimeoutError]: The operation was aborted due to timeout");
				error.name = "TimeoutError";
				error.code = 23;
				controller.abort(error);
			}, context.options.timeout);
			context.options.signal = controller.signal;
		}
		try {
			context.response = await fetch(context.request, context.options);
		} catch (error) {
			context.error = error;
			if (context.options.onRequestError) await callHooks(context, context.options.onRequestError);
			return await onError(context);
		} finally {
			if (abortTimeout) clearTimeout(abortTimeout);
		}
		if ((context.response.body || context.response._bodyInit) && !nullBodyResponses.has(context.response.status) && context.options.method !== "HEAD") {
			const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
			switch (responseType) {
				case "json": {
					const data = await context.response.text();
					const parseFunction = context.options.parseResponse || destr;
					context.response._data = parseFunction(data);
					break;
				}
				case "stream":
					context.response._data = context.response.body || context.response._bodyInit;
					break;
				default: context.response._data = await context.response[responseType]();
			}
		}
		if (context.options.onResponse) await callHooks(context, context.options.onResponse);
		if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
			if (context.options.onResponseError) await callHooks(context, context.options.onResponseError);
			return await onError(context);
		}
		return context.response;
	};
	const $fetch = async function $fetch2(request, options) {
		return (await $fetchRaw(request, options))._data;
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
// ../../node_modules/.pnpm/ofetch@1.5.1/node_modules/ofetch/dist/node.mjs
function createNodeFetch() {
	if (!JSON.parse(process.env.FETCH_KEEP_ALIVE || "false")) return r;
	const agentOptions = { keepAlive: true };
	const httpAgent = new Bt.Agent(agentOptions);
	const httpsAgent = new zs.Agent(agentOptions);
	const nodeFetchOptions = { agent(parsedURL) {
		return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
	} };
	return function nodeFetchWithKeepAlive(input, init) {
		return r(input, {
			...nodeFetchOptions,
			...init
		});
	};
}
var $fetch$2 = createFetch({
	fetch: globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch(),
	Headers: globalThis.Headers || n,
	AbortController: globalThis.AbortController || T
});
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Ffetch.server.mjs
if (!globalThis.$fetch) globalThis.$fetch = $fetch$2.create({ baseURL: baseURL() });
var $fetch = globalThis.$fetch;
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/diagnostics/state.js
/**
* E7xxx
* Payload / state / cookie runtime diagnostics.
*/
var stateDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
// ../../node_modules/.pnpm/unhead@3.5.3_esbuild@0.28.2_rolldown@1.2.19_rollup@4.68.8_vite@8.3.8_@types+node@22.20._959e829c331ed0d24dafb9557225b322/node_modules/unhead/dist/shared/unhead.BGzbtuEJ.mjs
function defineHeadPlugin(plugin, key) {
	return key && typeof plugin == "function" && (plugin.key = key), plugin;
}
// ../../node_modules/.pnpm/unhead@3.5.3_esbuild@0.28.2_rolldown@1.2.19_rollup@4.68.8_vite@8.3.8_@types+node@22.20._959e829c331ed0d24dafb9557225b322/node_modules/unhead/dist/shared/unhead.mZmt1d9n.mjs
var MetaTagsArrayable = /* @__PURE__ */ new Set([
	"theme-color",
	"google-site-verification",
	"author",
	"og:locale:alternate",
	"og:image",
	"og:video",
	"og:audio",
	"article:author",
	"article:tag",
	"book:author",
	"book:tag",
	"twitter:image"
]);
var hasContent = (value) => typeof value == "number" ? Number.isFinite(value) : value;
// ../../node_modules/.pnpm/unhead@3.5.3_esbuild@0.28.2_rolldown@1.2.19_rollup@4.68.8_vite@8.3.8_@types+node@22.20._959e829c331ed0d24dafb9557225b322/node_modules/unhead/dist/shared/unhead.BO821oKz.mjs
var META_NAMESPACES = ["twitter", "fediverse"];
var PROPERTY_NAMESPACES = [
	"og",
	"book",
	"article",
	"profile",
	"fb",
	"payment"
];
var MEDIA_KEYS = [
	"ogImage",
	"ogVideo",
	"ogAudio",
	"twitterImage"
];
var HTTP_EQUIV_KEYS = [
	"contentType",
	"defaultStyle",
	"xUaCompatible",
	"refresh",
	"contentSecurityPolicy"
];
var CAPS_RE = /([A-Z])/g;
var HYPHEN_OR_CAP_RE = /[-A-Z]/;
var OG_TWITTER_RE = /^(?:og|twitter)/;
var MSAPP_ALIAS_RE = /^msapplication(?:Config|TileColor|TileImage)$/;
var OG_MEDIA_URL_RE = /^og(?:Audio|Image|Video)Url$/;
var UNDERSCORE_ALIAS_RE = /^(?:article(?:Expiration|Modified|Published)Time|bookReleaseDate|fbAppId|og(?:SiteName|(?:Audio|Image|Video)SecureUrl)|payment(?:ExpiresAt|SuccessUrl)|profile(?:First|Last)Name)$/;
var MetaPackingUnpack = {
	appleItunesApp: {
		entrySeparator: ", ",
		resolve: ({ key, value }) => `${fixKeyCase(key)}=${value}`
	},
	robots: {
		entrySeparator: ", ",
		resolve: ({ key, value }) => typeof value == "boolean" ? fixKeyCase(key) : `${fixKeyCase(key)}:${value}`
	},
	contentSecurityPolicy: {
		entrySeparator: "; ",
		resolve: ({ key, value }) => `${fixKeyCase(key)} ${value}`
	}
};
var fixKeyCaseCache = /* @__PURE__ */ new Map();
function fixKeyCase(key) {
	const cached = fixKeyCaseCache.get(key);
	if (cached !== void 0) return cached;
	const prefixIndex = key.search(HYPHEN_OR_CAP_RE);
	let result;
	if (prefixIndex === -1) result = key.toLowerCase();
	else {
		const prefix = key.slice(0, prefixIndex).toLowerCase(), replacement = META_NAMESPACES.includes(prefix) || PROPERTY_NAMESPACES.includes(prefix) ? ":$1" : "-$1";
		result = key.replace(CAPS_RE, replacement).toLowerCase();
	}
	return fixKeyCaseCache.size < 256 && fixKeyCaseCache.set(key, result), result;
}
function resolveAlias(key, fixed) {
	if (MSAPP_ALIAS_RE.test(key)) return `msapplication-${key.slice(13)}`;
	if (OG_MEDIA_URL_RE.test(key)) return fixed.slice(0, -4);
	if (UNDERSCORE_ALIAS_RE.test(key)) {
		const lastColon = fixed.lastIndexOf(":");
		return `${fixed.slice(0, lastColon)}_${fixed.slice(lastColon + 1)}`;
	}
	return fixed;
}
function sanitizeObject(input) {
	return Object.fromEntries(Object.entries(input).filter(([k, v]) => String(v) !== "false" && k));
}
function normalizeRobotsDirectives(input) {
	if (input.index !== false && input.follow !== false) return input;
	const value = { ...input };
	return value.index === false && (delete value.index, value.noindex === void 0 && (value.noindex = true)), value.follow === false && (delete value.follow, value.nofollow === void 0 && (value.nofollow = true)), value;
}
function transformObject(obj) {
	return Array.isArray(obj) ? obj.map(transformObject) : !obj || typeof obj != "object" ? obj : Object.fromEntries(Object.entries(obj).map(([k, v]) => [fixKeyCase(k), transformObject(v)]));
}
function unpackToString(value, options = {}) {
	const { entrySeparator = "", keyValueSeparator = "", resolve } = options;
	return Object.entries(value).map(([key, val]) => {
		if (resolve) {
			const resolved = resolve({
				key,
				value: val
			});
			if (resolved !== void 0) return resolved;
		}
		const processedVal = typeof val == "object" ? unpackToString(val, options) : typeof val == "number" ? val.toString() : val;
		return `${key}${keyValueSeparator}${processedVal}`;
	}).join(entrySeparator);
}
function handleObjectEntry(key, value) {
	const sanitizedValue = sanitizeObject(value), fixedKey = fixKeyCase(key), attr = resolveMetaKeyType(fixedKey);
	if (!MetaTagsArrayable.has(fixedKey)) return [{
		[attr]: fixedKey,
		...sanitizedValue
	}];
	return unpackMeta(Object.fromEntries(Object.entries(sanitizedValue).map(([k, v]) => [`${key}${k === "url" ? "" : `${k[0].toUpperCase()}${k.slice(1)}`}`, v])) || {}).sort((a, b) => (a[attr]?.length || 0) - (b[attr]?.length || 0));
}
function metaKeyType(key, fixed) {
	if (HTTP_EQUIV_KEYS.includes(key)) return "http-equiv";
	fixed ??= fixKeyCase(key);
	const colonIndex = fixed.indexOf(":");
	return colonIndex === -1 ? "name" : PROPERTY_NAMESPACES.includes(fixed.slice(0, colonIndex)) ? "property" : "name";
}
function resolveMetaKeyType(key) {
	return metaKeyType(key);
}
function resolvePackedMetaObjectValue(value, key) {
	return key === "refresh" ? `${value.seconds};url=${value.url}` : unpackToString(transformObject(value), {
		keyValueSeparator: "=",
		entrySeparator: ", ",
		resolve: ({ value: value2, key: key2 }) => value2 === null ? "" : typeof value2 == "boolean" ? key2 : void 0,
		...MetaPackingUnpack[key]
	});
}
function unpackMeta(input) {
	const meta = [], primitives = {};
	for (const key in input) {
		if (!Object.hasOwn(input, key)) continue;
		const value = input[key];
		if (Array.isArray(value)) {
			if (key === "themeColor") {
				value.forEach((v) => {
					typeof v == "object" && v !== null && meta.push({
						name: "theme-color",
						...v
					});
				});
				continue;
			}
			for (const v of value) if (typeof v == "object" && v !== null) {
				const urlProps = [], otherProps = [];
				for (const propKey in v) {
					if (!Object.hasOwn(v, propKey)) continue;
					const propValue = v[propKey], items = unpackMeta({ [`${key}${propKey === "url" ? "" : `:${propKey}`}`]: propValue });
					(propKey === "url" ? urlProps : otherProps).push(...items);
				}
				meta.push(...urlProps, ...otherProps);
			} else meta.push(...typeof v == "string" ? unpackMeta({ [key]: v }) : handleObjectEntry(key, v));
			continue;
		}
		if (typeof value == "object" && value) if (MEDIA_KEYS.includes(key)) {
			const prefix = key.startsWith("twitter") ? "twitter" : "og", type = key.replace(OG_TWITTER_RE, "").toLowerCase(), metaKey = prefix === "twitter" ? "name" : "property";
			value.url && meta.push({
				[metaKey]: `${prefix}:${type}`,
				content: value.url
			}), value.secureUrl && meta.push({
				[metaKey]: `${prefix}:${type}:secure_url`,
				content: value.secureUrl
			});
			for (const propKey in value) propKey !== "url" && propKey !== "secureUrl" && Object.hasOwn(value, propKey) && meta.push({
				[metaKey]: `${prefix}:${type}:${propKey}`,
				content: value[propKey]
			});
		} else MetaTagsArrayable.has(fixKeyCase(key)) ? meta.push(...handleObjectEntry(key, value)) : primitives[key] = sanitizeObject(key === "robots" ? normalizeRobotsDirectives(value) : value);
		else primitives[key] = value;
	}
	for (const key in primitives) {
		if (!Object.hasOwn(primitives, key)) continue;
		const value = primitives[key];
		if (key === "charset") {
			meta.push({ charset: value === null ? "_null" : value });
			continue;
		}
		const fixed = fixKeyCase(key), attr = metaKeyType(key, fixed), keyValue = resolveAlias(key, fixed), processedValue = value === null ? null : typeof value == "object" ? resolvePackedMetaObjectValue(value, key) : typeof value == "number" ? value.toString() : value;
		meta.push({
			[attr]: keyValue,
			content: processedValue
		});
	}
	return meta;
}
// ../../node_modules/.pnpm/unhead@3.5.3_esbuild@0.28.2_rolldown@1.2.19_rollup@4.68.8_vite@8.3.8_@types+node@22.20._959e829c331ed0d24dafb9557225b322/node_modules/unhead/dist/shared/unhead.Bf_fPVYA.mjs
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
function hasOwn$1(object, key) {
	return hasOwnProperty$1.call(object, key);
}
// ../../node_modules/.pnpm/unhead@3.5.3_esbuild@0.28.2_rolldown@1.2.19_rollup@4.68.8_vite@8.3.8_@types+node@22.20._959e829c331ed0d24dafb9557225b322/node_modules/unhead/dist/shared/unhead.CwUsyXEg.mjs
var FlatMetaPlugin = /* @__PURE__ */ defineHeadPlugin({
	key: "flatMeta",
	hooks: { "entries:normalize": (ctx) => {
		const input = ctx.tags;
		let tags, tagsToAdd;
		for (let i = 0; i < input.length; i++) {
			const t = input[i];
			if (t.tag !== "_flatMeta") {
				tags?.push(t);
				continue;
			}
			tags || (tags = input.slice(0, i), tagsToAdd = []);
			for (const props of unpackMeta(t.props)) tagsToAdd.push({
				...t,
				tag: "meta",
				props
			});
		}
		if (tags) {
			for (let i = 0; i < tagsToAdd.length; i++) tags.push(tagsToAdd[i]);
			ctx.tags = tags;
		}
	} }
});
// @__NO_SIDE_EFFECTS__
function injectHead$1() {
	const instance = hasInjectionContext() && inject("usehead");
	if (instance) return instance;
	throw new Error("useHead() was called without provide context, ensure you call it through the setup() function.");
}
// ../../node_modules/.pnpm/@unhead+vue@3.5.3_@oxc-project+types@0.160.0_esbuild@0.28.2_lightningcss@1.33.0_oxc-par_621fc2bee521546171f4676ba2e2914f/node_modules/@unhead/vue/dist/shared/vue.CRUyf2JW.mjs
function useHead$1(input, options = {}) {
	return (options.head || /* @__PURE__ */ injectHead$1()).push(input || {}, options);
}
function normalizeSeoMetaInput(input) {
	if (input._flatMeta) return input;
	const meta = {};
	for (const key in input) {
		if (!hasOwn$1(input, key) || key === "title" || key === "titleTemplate") continue;
		meta[key] = input[key];
	}
	return {
		title: input.title,
		titleTemplate: input.titleTemplate,
		_flatMeta: meta
	};
}
function useSeoMeta$1(input = {}, options = {}) {
	(options.head || /* @__PURE__ */ injectHead$1()).use(FlatMetaPlugin);
	const entry = useHead$1(normalizeSeoMetaInput(input), options);
	const corePatch = entry.patch;
	if (!entry.__patched) {
		entry.patch = (input2) => corePatch(normalizeSeoMetaInput(input2));
		entry.__patched = true;
	}
	return entry;
}
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/diagnostics/head.js
/**
* E6xxx
* Head / unhead runtime diagnostics.
*/
var unheadDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/composables.js
/**
* Injects the head client from the Nuxt context or Vue inject.
*/
function injectHead(nuxtApp) {
	const nuxt = nuxtApp || useNuxtApp();
	return nuxt.ssrContext?.head || nuxt.runWithContext(() => {
		if (hasInjectionContext()) {
			const head = inject("usehead");
			if (!head) throw unheadDiagnostics.NUXT_E6001();
			return head;
		}
	});
}
function useHead(input, options = {}) {
	return useHead$1(input, {
		head: options.head || injectHead(options.nuxt),
		...options
	});
}
function useSeoMeta(input, options = {}) {
	return useSeoMeta$1(input, {
		head: options.head || injectHead(options.nuxt),
		...options
	});
}
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/composables/ssr.js
var $fetch$1 = $fetch;
/** @since 3.0.0 */
function useRequestEvent(nuxtApp) {
	nuxtApp ||= useNuxtApp();
	return nuxtApp.ssrContext?.event;
}
/**
* `event` as a web-standard request event (as `@nuxt/vite-server` provides), or `undefined` for an h3 event.
* @internal
*/
function asWebRequestEvent(event) {
	return "node" in event ? void 0 : event;
}
function useRequestHeaders(include) {
	const event = useRequestEvent();
	const _headers = event ? readRequestHeaders(event) : {};
	if (!include || !event) return _headers;
	const headers = Object.create(null);
	for (const _key of include) {
		const key = _key.toLowerCase();
		const header = _headers[key];
		if (header) headers[key] = header;
	}
	return headers;
}
function readRequestHeaders(event) {
	const webEvent = asWebRequestEvent(event);
	return webEvent ? Object.fromEntries(webEvent.req.headers) : getRequestHeaders$1(event);
}
var UNFORWARDED_HEADERS = /* @__PURE__ */ new Set([
	"accept",
	"accept-encoding",
	"connection",
	"content-length",
	"content-md5",
	"content-type",
	"expect",
	"host",
	"if-match",
	"if-modified-since",
	"if-none-match",
	"if-range",
	"if-unmodified-since",
	"keep-alive",
	"proxy-authenticate",
	"proxy-authorization",
	"range",
	"te",
	"trailer",
	"transfer-encoding",
	"upgrade"
]);
function forwardRequestHeaders(event, request, options) {
	const isLocal = typeof request === "string" && request[0] === "/";
	const headers = new Headers(options?.headers);
	for (const [name, value] of event.headers || event.req.headers) if ((!UNFORWARDED_HEADERS.has(name) || name === "host" && isLocal) && !headers.has(name)) headers.set(name, value);
	const context = options?.context || event.context;
	return {
		...options,
		headers,
		context
	};
}
var requestFetchers = /* @__PURE__ */ new WeakMap();
function createRequestFetch(event) {
	const base = $fetch$1;
	return base.create({}, { fetch: (request, options) => {
		const init = forwardRequestHeaders(event, request, options);
		const context = init.context;
		return base.native(request, init, {
			...context,
			nuxt: void 0
		});
	} });
}
/** @since 3.2.0 */
function useRequestFetch() {
	const event = useRequestEvent();
	if (!event) return $fetch$1;
	let fetcher = requestFetchers.get(event);
	if (!fetcher) {
		fetcher = createRequestFetch(event);
		requestFetchers.set(event, fetcher);
	}
	return fetcher;
}
/** @since 3.8.0 */
function prerenderRoutes(path) {
	return;
}
// ../../node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs
function klona(x) {
	if (typeof x !== "object") return x;
	var k, tmp, str = Object.prototype.toString.call(x);
	if (str === "[object Object]") {
		if (x.constructor !== Object && typeof x.constructor === "function") {
			tmp = new x.constructor();
			for (k in x) if (x.hasOwnProperty(k) && tmp[k] !== x[k]) tmp[k] = klona(x[k]);
		} else {
			tmp = {};
			for (k in x) if (k === "__proto__") Object.defineProperty(tmp, k, {
				value: klona(x[k]),
				configurable: true,
				enumerable: true,
				writable: true
			});
			else tmp[k] = klona(x[k]);
		}
		return tmp;
	}
	if (str === "[object Array]") {
		k = x.length;
		for (tmp = Array(k); k--;) tmp[k] = klona(x[k]);
		return tmp;
	}
	if (str === "[object Set]") {
		tmp = /* @__PURE__ */ new Set();
		x.forEach(function(val) {
			tmp.add(klona(val));
		});
		return tmp;
	}
	if (str === "[object Map]") {
		tmp = /* @__PURE__ */ new Map();
		x.forEach(function(val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}
	if (str === "[object Date]") return /* @__PURE__ */ new Date(+x);
	if (str === "[object RegExp]") {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}
	if (str === "[object DataView]") return new x.constructor(klona(x.buffer));
	if (str === "[object ArrayBuffer]") return x.slice(0);
	if (str.slice(-6) === "Array]") return new x.constructor(x);
	return x;
}
// ../../node_modules/.pnpm/cookie-es@3.1.1/node_modules/cookie-es/dist/index.mjs
var COOKIE_MAX_AGE_LIMIT = 3456e4;
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
var NullObject = /* @__PURE__ */ (() => {
	const C = function() {};
	C.prototype = Object.create(null);
	return C;
})();
function parse$2(str, options) {
	const obj = new NullObject();
	const len = str.length;
	if (len < 2) return obj;
	const dec = options?.decode || decode;
	const allowMultiple = options?.allowMultiple || false;
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
		if (options?.filter && !options.filter(key)) {
			index = endIdx + 1;
			continue;
		}
		const val = dec(valueSlice(str, eqIdx + 1, endIdx));
		if (allowMultiple) {
			const existing = obj[key];
			if (existing === void 0) obj[key] = val;
			else if (Array.isArray(existing)) existing.push(val);
			else obj[key] = [existing, val];
		} else if (obj[key] === void 0) obj[key] = val;
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
var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
var pathValueRegExp = /^[\u0020-\u003A\u003C-\u007E]*$/;
var __toString = Object.prototype.toString;
function serialize$1(_a0, _a1, _a2) {
	const isObj = typeof _a0 === "object" && _a0 !== null;
	const options = isObj ? _a1 : _a2;
	const stringify = options?.stringify || JSON.stringify;
	const cookie = isObj ? _a0 : {
		..._a2,
		name: _a0,
		value: _a1 == void 0 ? "" : typeof _a1 === "string" ? _a1 : stringify(_a1)
	};
	const enc = options?.encode || encodeURIComponent;
	if (!cookieNameRegExp.test(cookie.name)) throw new TypeError(`argument name is invalid: ${cookie.name}`);
	const value = cookie.value ? enc(cookie.value) : "";
	if (!cookieValueRegExp.test(value)) throw new TypeError(`argument val is invalid: ${cookie.value}`);
	if (!cookie.secure) {
		if (cookie.partitioned) throw new TypeError(`Partitioned cookies must have the Secure attribute`);
		if (cookie.sameSite && String(cookie.sameSite).toLowerCase() === "none") throw new TypeError(`SameSite=None cookies must have the Secure attribute`);
		if (cookie.name.length > 9 && cookie.name.charCodeAt(0) === 95 && cookie.name.charCodeAt(1) === 95) {
			const nameLower = cookie.name.toLowerCase();
			if (nameLower.startsWith("__secure-") || nameLower.startsWith("__host-")) throw new TypeError(`${cookie.name} cookies must have the Secure attribute`);
		}
	}
	if (cookie.name.length > 7 && cookie.name.charCodeAt(0) === 95 && cookie.name.charCodeAt(1) === 95 && cookie.name.toLowerCase().startsWith("__host-")) {
		if (cookie.path !== "/") throw new TypeError(`__Host- cookies must have Path=/`);
		if (cookie.domain) throw new TypeError(`__Host- cookies must not have a Domain attribute`);
	}
	let str = cookie.name + "=" + value;
	if (cookie.maxAge !== void 0) {
		if (!Number.isInteger(cookie.maxAge)) throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
		str += "; Max-Age=" + Math.max(0, Math.min(cookie.maxAge, COOKIE_MAX_AGE_LIMIT));
	}
	if (cookie.domain) {
		if (!domainValueRegExp.test(cookie.domain)) throw new TypeError(`option domain is invalid: ${cookie.domain}`);
		str += "; Domain=" + cookie.domain;
	}
	if (cookie.path) {
		if (!pathValueRegExp.test(cookie.path)) throw new TypeError(`option path is invalid: ${cookie.path}`);
		str += "; Path=" + cookie.path;
	}
	if (cookie.expires) {
		if (!isDate$1(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) throw new TypeError(`option expires is invalid: ${cookie.expires}`);
		str += "; Expires=" + cookie.expires.toUTCString();
	}
	if (cookie.httpOnly) str += "; HttpOnly";
	if (cookie.secure) str += "; Secure";
	if (cookie.partitioned) str += "; Partitioned";
	if (cookie.priority) switch (typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0) {
		case "low":
			str += "; Priority=Low";
			break;
		case "medium":
			str += "; Priority=Medium";
			break;
		case "high":
			str += "; Priority=High";
			break;
		default: throw new TypeError(`option priority is invalid: ${cookie.priority}`);
	}
	if (cookie.sameSite) switch (typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite) {
		case true:
		case "strict":
			str += "; SameSite=Strict";
			break;
		case "lax":
			str += "; SameSite=Lax";
			break;
		case "none":
			str += "; SameSite=None";
			break;
		default: throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
	}
	return str;
}
function isDate$1(val) {
	return __toString.call(val) === "[object Date]";
}
var maxAgeRegExp = /^-?\d+$/;
var _nullProto = /* @__PURE__ */ Object.getPrototypeOf({});
function parseSetCookie(str, options) {
	const len = str.length;
	let _endIdx = len;
	let eqIdx = -1;
	for (let i = 0; i < len; i++) {
		const c = str.charCodeAt(i);
		if (c === 59) {
			_endIdx = i;
			break;
		}
		if (c === 61 && eqIdx === -1) eqIdx = i;
	}
	if (eqIdx >= _endIdx) eqIdx = -1;
	const name = eqIdx === -1 ? "" : _trim(str, 0, eqIdx);
	if (name && name in _nullProto) return void 0;
	let value = eqIdx === -1 ? _trim(str, 0, _endIdx) : _trim(str, eqIdx + 1, _endIdx);
	if (!name && !value) return void 0;
	if (name.length + value.length > 4096) return void 0;
	if (options?.decode !== false) value = _decode(value, options?.decode);
	const setCookie = {
		name,
		value
	};
	let index = _endIdx + 1;
	while (index < len) {
		let endIdx = len;
		let attrEqIdx = -1;
		for (let i = index; i < len; i++) {
			const c = str.charCodeAt(i);
			if (c === 59) {
				endIdx = i;
				break;
			}
			if (c === 61 && attrEqIdx === -1) attrEqIdx = i;
		}
		if (attrEqIdx >= endIdx) attrEqIdx = -1;
		const attr = attrEqIdx === -1 ? _trim(str, index, endIdx) : _trim(str, index, attrEqIdx);
		const val = attrEqIdx === -1 ? void 0 : _trim(str, attrEqIdx + 1, endIdx);
		if (val === void 0 || val.length <= 1024) switch (attr.toLowerCase()) {
			case "httponly":
				setCookie.httpOnly = true;
				break;
			case "secure":
				setCookie.secure = true;
				break;
			case "partitioned":
				setCookie.partitioned = true;
				break;
			case "domain":
				if (val) setCookie.domain = (val.charCodeAt(0) === 46 ? val.slice(1) : val).toLowerCase();
				break;
			case "path":
				setCookie.path = val;
				break;
			case "max-age":
				if (val && maxAgeRegExp.test(val)) setCookie.maxAge = Math.min(Number(val), COOKIE_MAX_AGE_LIMIT);
				break;
			case "expires": {
				if (!val) break;
				const date = new Date(val);
				if (Number.isFinite(date.valueOf())) {
					const maxDate = new Date(Date.now() + COOKIE_MAX_AGE_LIMIT * 1e3);
					setCookie.expires = date > maxDate ? maxDate : date;
				}
				break;
			}
			case "priority": {
				if (!val) break;
				const priority = val.toLowerCase();
				if (priority === "low" || priority === "medium" || priority === "high") setCookie.priority = priority;
				break;
			}
			case "samesite": {
				if (!val) break;
				const sameSite = val.toLowerCase();
				if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") setCookie.sameSite = sameSite;
				else setCookie.sameSite = "lax";
				break;
			}
			default: {
				const attrLower = attr.toLowerCase();
				if (attrLower && !(attrLower in _nullProto)) setCookie[attrLower] = val;
			}
		}
		index = endIdx + 1;
	}
	return setCookie;
}
function _trim(str, start, end) {
	if (start === end) return "";
	let s = start;
	let e = end;
	while (s < e && (str.charCodeAt(s) === 32 || str.charCodeAt(s) === 9)) s++;
	while (e > s && (str.charCodeAt(e - 1) === 32 || str.charCodeAt(e - 1) === 9)) e--;
	return str.slice(s, e);
}
function _decode(value, decode) {
	if (!decode && !value.includes("%")) return value;
	try {
		return (decode || decodeURIComponent)(value);
	} catch {
		return value;
	}
}
// ../../node_modules/.pnpm/ohash@2.0.12/node_modules/ohash/dist/_chunks/is-equal.mjs
function serialize(input) {
	if (typeof input === "string") return `'${input}'`;
	return new Serializer().serialize(input);
}
var asciiOrder = " _-,;:!?.'\"()[]{}@*/\\&#%`^+<=>|~$0123456789abcdefghijklmnopqrstuvwxyz";
var asciiWeights = /*@__PURE__*/ (function() {
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
var Serializer = /*@__PURE__*/ (function() {
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
function isEqual(object1, object2) {
	if (object1 === object2) return true;
	if (serialize(object1) === serialize(object2)) return true;
	return false;
}
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/composables/cookie.js
function parseCookieValue(value) {
	if (value === "undefined") return;
	try {
		const parsed = JSON.parse(value);
		if (typeof parsed === "number" && String(parsed) !== value) return value;
		return parsed;
	} catch {
		return value;
	}
}
function resolveExpires(expires) {
	return typeof expires === "function" ? expires() : expires;
}
var CookieDefaults = {
	path: "/",
	watch: true,
	decode: (val) => val ? parseCookieValue(decodeURIComponent(val)) : val,
	encode: (val) => {
		if (typeof val !== "string" || val === "undefined") return encodeURIComponent(JSON.stringify(val));
		try {
			if (typeof JSON.parse(val) !== "string") return encodeURIComponent(JSON.stringify(val));
		} catch {}
		return encodeURIComponent(val);
	},
	refresh: false
};
function useCookie(name, _opts) {
	const opts = {
		...CookieDefaults,
		..._opts
	};
	opts.filter ??= (key) => key === name;
	const nuxtApp = useNuxtApp();
	const jar = readServerCookieJar(nuxtApp);
	const rawValue = opts.filter(name) ? jar[name] : void 0;
	const cookies = { [name]: rawValue === void 0 ? void 0 : opts.decode(rawValue) };
	let delay;
	if (opts.maxAge !== void 0) delay = opts.maxAge * 1e3;
	else if (opts.expires) {
		const expires = resolveExpires(opts.expires);
		if (expires) delay = expires.getTime() - Date.now();
	}
	const hasExpired = delay !== void 0 && delay <= 0;
	const cookie = cookieServerRef(name, klona(hasExpired ? void 0 : cookies[name] ?? opts.default?.()), opts, nuxtApp);
	if (!opts.readonly && rawValue === void 0) {
		const initialValue = cookie.value;
		if (initialValue !== void 0 && initialValue !== null) updateServerCookieJar(nuxtApp, name, opts.encode(initialValue));
	}
	{
		const writeCookieValue = () => {
			const valueIsSame = isEqual(cookie.value, cookies[name]);
			if (opts.readonly || valueIsSame && !opts.refresh) return;
			nuxtApp._cookiesChanged ||= {};
			if (valueIsSame && opts.refresh && !nuxtApp._cookiesChanged[name]) return;
			nuxtApp._cookies ||= {};
			if (name in nuxtApp._cookies) {
				if (isEqual(cookie.value, nuxtApp._cookies[name])) return;
			}
			nuxtApp._cookies[name] = cookie.value;
			const encoded = cookie.value === null || cookie.value === void 0 ? void 0 : opts.encode(cookie.value);
			writeServerCookie(useRequestEvent(nuxtApp), name, encoded, opts);
		};
		const writeFinalCookieValue = () => {
			if (!nuxtApp.ssrContext?.["~headersSent"]) writeCookieValue();
		};
		(nuxtApp._cookieWriters ||= /* @__PURE__ */ new Set()).add(writeFinalCookieValue);
		const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
		nuxtApp.hooks.hookOnce("app:error", () => {
			unhook();
			return writeFinalCookieValue();
		});
	}
	return cookie;
}
/**
* Cookie jar for the current request, seeded from the incoming `cookie` header.
*
* @see https://github.com/nuxt/nuxt/issues/22631
*/
function readServerCookieJar(nuxtApp) {
	const event = useRequestEvent(nuxtApp);
	const jar = nuxtApp._cookieJar ??= parse$2(readRequestCookieHeader(event) || "", { decode: identity });
	const setCookies = readResponseSetCookies(event);
	for (let i = nuxtApp._appliedSetCookies || 0; i < setCookies.length; i++) {
		const cookie = parseSetCookie(setCookies[i], { decode: false });
		if (!cookie) continue;
		if (cookie.maxAge !== void 0 && cookie.maxAge <= 0 || cookie.expires && cookie.expires.getTime() <= Date.now()) delete jar[cookie.name];
		else jar[cookie.name] = cookie.value;
	}
	nuxtApp._appliedSetCookies = setCookies.length;
	return jar;
}
function updateServerCookieJar(nuxtApp, name, value) {
	const jar = readServerCookieJar(nuxtApp);
	if (value === void 0) delete jar[name];
	else jar[name] = value;
}
function readRequestCookieHeader(event) {
	const webEvent = asWebRequestEvent(event);
	return webEvent ? webEvent.req.headers.get("cookie") : getRequestHeader$1(event, "cookie");
}
function readResponseSetCookies(event) {
	const webEvent = asWebRequestEvent(event);
	return webEvent ? webEvent.res.headers.getSetCookie() : splitCookiesString(getResponseHeader(event, "set-cookie") ?? []);
}
var identity = (val) => val;
function toSerializeOptions(opts) {
	const { encode: _encode, decode: _decode, expires, ...rest } = opts;
	return {
		...rest,
		expires: resolveExpires(expires),
		encode: identity
	};
}
function reportUnserializable(name, write) {
	try {
		return write();
	} catch (cause) {
		throw stateDiagnostics.NUXT_E7011({
			name,
			reason: cause instanceof Error ? cause.message : String(cause),
			cause
		});
	}
}
function serializeOrThrow(name, value, opts) {
	return reportUnserializable(name, () => serialize$1(name, value, opts));
}
function writeServerCookie(event, name, value, opts = {}) {
	if (event) {
		const serializeOpts = toSerializeOptions(opts);
		const webEvent = asWebRequestEvent(event);
		if (value !== void 0) return webEvent ? setResponseCookie(webEvent, name, value, serializeOpts) : reportUnserializable(name, () => setCookie(event, name, value, serializeOpts));
		if ((webEvent ? parse$2(webEvent.req.headers.get("cookie") || "")[name] : getCookie(event, name)) !== void 0 || responseSetsCookie(event, name)) return webEvent ? setResponseCookie(webEvent, name, "", {
			...serializeOpts,
			maxAge: 0
		}) : reportUnserializable(name, () => deleteCookie(event, name, serializeOpts));
	}
}
function responseSetsCookie(event, name) {
	for (const raw of readResponseSetCookies(event)) if (parseSetCookie(raw, { decode: false })?.name === name) return true;
	return false;
}
function cookieKey(name, opts) {
	return [
		name,
		(opts.domain || "").replace(/^\./, "").toLowerCase(),
		opts.path || "/"
	].join(";");
}
function setResponseCookie(event, name, value, opts) {
	const newCookie = serializeOrThrow(name, value, {
		path: "/",
		...opts
	});
	const currentCookies = event.res.headers.getSetCookie();
	if (currentCookies.length === 0) {
		event.res.headers.set("set-cookie", newCookie);
		return;
	}
	const namePrefix = `${name}=`;
	if (!currentCookies.some((cookie) => cookie.startsWith(namePrefix))) {
		event.res.headers.append("set-cookie", newCookie);
		return;
	}
	const newCookieKey = cookieKey(name, opts);
	event.res.headers.delete("set-cookie");
	for (const cookie of currentCookies) {
		const parsed = parseSetCookie(cookie);
		if (parsed ? cookieKey(parsed.name, parsed) === newCookieKey : cookie.startsWith(namePrefix)) continue;
		event.res.headers.append("set-cookie", cookie);
	}
	event.res.headers.append("set-cookie", newCookie);
}
/**
* Custom ref that tracks explicit cookie writes on the server.
*
* This is required for the `refresh` option to ensure the cookie is
* re-written on SSR even when the value remains unchanged.
*/
function cookieServerRef(name, value, opts, nuxtApp, onAssign) {
	const internalRef = ref(value);
	return customRef((track, trigger) => {
		return {
			get() {
				track();
				return internalRef.value;
			},
			set(newValue) {
				nuxtApp._cookiesChanged ||= {};
				nuxtApp._cookiesChanged[name] = true;
				if (!opts.readonly) updateServerCookieJar(nuxtApp, name, newValue === null || newValue === void 0 ? void 0 : opts.encode(newValue));
				internalRef.value = newValue;
				trigger();
			}
		};
	});
}
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/composables/url.js
/** @since 3.5.0 */
function useRequestURL(opts) {
	{
		const event = useRequestEvent();
		const webEvent = asWebRequestEvent(event);
		return webEvent ? getWebRequestURL(webEvent, opts) : getRequestURL(event, opts);
	}
}
function getWebRequestURL(event, opts = {}) {
	const url = new URL(event.url || event.req.url);
	if (opts.xForwardedProto) {
		const proto = event.req.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
		if (proto === "http" || proto === "https") url.protocol = proto;
	}
	if (opts.xForwardedHost) {
		const host = event.req.headers.get("x-forwarded-host")?.split(",")[0]?.trim() || event.req.headers.get("host");
		if (host) applyForwardedHost(url, host);
	}
	return url;
}
function applyForwardedHost(url, host) {
	const sep = host.lastIndexOf(":");
	const hasPort = sep > host.lastIndexOf("]");
	const hostname = hasPort ? host.slice(0, sep) : host;
	const prevHostname = url.hostname;
	url.hostname = hostname;
	if (url.hostname === prevHostname && hostname.toLowerCase() !== prevHostname) return;
	const port = hasPort ? host.slice(sep + 1) : "";
	url.port = /^\d{1,5}$/.test(port) && +port < 65536 ? port : "";
}
// ../../node_modules/.pnpm/@intlify+shared@11.4.24/node_modules/@intlify/shared/dist/shared.mjs
/*!
* shared v11.4.24
* (c) 2026 kazuya kawaguchi
* Released under the MIT License.
*/
var makeSymbol = (name, shareable = false) => !shareable ? Symbol(name) : Symbol.for(name);
var generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({
	l: locale,
	k: key,
	s: source
});
var friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
var isNumber = (val) => typeof val === "number" && isFinite(val);
var isDate = (val) => toTypeString(val) === "[object Date]";
var isRegExp = (val) => toTypeString(val) === "[object RegExp]";
var isEmptyObject = (val) => isPlainObject$1(val) && Object.keys(val).length === 0;
var assign = Object.assign;
var _create = Object.create;
var create = (obj = null) => _create(obj);
var _globalThis;
var getGlobalThis = () => {
	return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : create());
};
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
	return hasOwnProperty.call(obj, key);
}
/**
* Get `obj[key]` only when `key` is an own property of `obj`, so that a key
* such as `constructor` does not read a property inherited from
* `Object.prototype`.
* The property is read before the check, so that a reactive `obj` tracks
* `key` even when it is missing.
*/
function getOwn(obj, key) {
	const value = obj[key];
	return hasOwn(obj, key) ? value : void 0;
}
/**
* Whether `key` is a property name of `Object.prototype`, such as `__proto__`,
* `constructor` or `toString`.
* On a plain object, such a key reads a built-in, and assigning to `__proto__`
* replaces the prototype.
*/
function isObjectPrototypeKey(key) {
	return hasOwn(Object.prototype, key);
}
/**
* Useful Utilities By Evan you
* Modified by kazuya kawaguchi
* MIT License
* https://github.com/vuejs/vue-next/blob/master/packages/shared/src/index.ts
* https://github.com/vuejs/vue-next/blob/master/packages/shared/src/codeframe.ts
*/
var isArray = Array.isArray;
var isFunction = (val) => typeof val === "function";
var isString = (val) => typeof val === "string";
var isBoolean = (val) => typeof val === "boolean";
var isObject$2 = (val) => val !== null && typeof val === "object";
var isPromise = (val) => {
	return isObject$2(val) && isFunction(val.then) && isFunction(val.catch);
};
var objectToString = Object.prototype.toString;
var toTypeString = (value) => objectToString.call(value);
var isPlainObject$1 = (val) => toTypeString(val) === "[object Object]";
var toDisplayString$1 = (val) => {
	return val == null ? "" : isArray(val) || isPlainObject$1(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
};
function join(items, separator = "") {
	return items.reduce((str, item, index) => index === 0 ? str + item : str + separator + item, "");
}
function warn(msg, err) {
	if (typeof console !== "undefined") {
		console.warn(`[intlify] ` + msg);
		/* istanbul ignore if */
		if (err) console.warn(err.stack);
	}
}
function escapeHtml$1(rawText) {
	return rawText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2F;").replace(/=/g, "&#x3D;");
}
function escapeAttributeValue(value) {
	return value.replace(/&(?![a-z0-9#]{2,6};)/gi, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var javascriptSchemePattern = /^javascript:/i;
var urlAttributePattern = /^(?:href|xlink:href|src|action|formaction)$/i;
var numericCharacterReferencePattern = /&#(?:x([0-9a-f]+)|(\d+));?/gi;
var namedWhitespaceCharacterReferencePattern = /&(?:Tab|NewLine);/g;
var colonCharacterReferencePattern = /&colon;?/gi;
var controlOrWhitespacePattern = /[\u0000-\u0020\u007f-\u009f]/g;
var eventHandlerPattern = /^on\w/i;
var srcdocPattern = /^srcdoc$/i;
var dangerousElementPattern = /^(?:base|animate|set|script|plaintext)$/i;
var textContentElementPattern = /^(?:iframe|noembed|noframes|noscript|style|textarea|title|xmp)$/i;
var tagStartPattern = /<(\/?)([a-z][^\t\n\f\r />]*)/iy;
var tagStepPattern = /([\t\n\f\r /]*)(?:(>)|([^\t\n\f\r />][^\t\n\f\r />=]*)(?:[\t\n\f\r ]*=[\t\n\f\r ]*(?:(["'])([\s\S]*?)(\4|$)|([^\t\n\f\r >]*)))?)/y;
var commentPattern = /<!--(?:>|->|[\s\S]*?--!?>)/y;
function decodeNumericCharacterReference(match, hex, decimal) {
	const digits = hex || decimal;
	if (!digits) return match;
	const codePoint = Number.parseInt(digits, hex ? 16 : 10);
	return codePoint <= 127 ? String.fromCharCode(codePoint) : match;
}
function hasJavascriptScheme(value) {
	const normalized = value.replace(numericCharacterReferencePattern, decodeNumericCharacterReference).replace(namedWhitespaceCharacterReferencePattern, "").replace(colonCharacterReferencePattern, ":").replace(controlOrWhitespacePattern, "");
	return javascriptSchemePattern.test(normalized);
}
function sanitizeStyleValue(value) {
	const urlPattern = /url\s*\(/gi;
	let sanitized = "";
	let cursor = 0;
	let match;
	while ((match = urlPattern.exec(value)) !== null) {
		const urlStart = match.index;
		const openParenIndex = urlPattern.lastIndex - 1;
		let index = openParenIndex + 1;
		let depth = 1;
		let quote = null;
		for (; index < value.length; index++) {
			const char = value[index];
			if (quote) {
				if (char === quote) quote = null;
				continue;
			}
			if (char === "\"" || char === "'") quote = char;
			else if (char === "(") depth++;
			else if (char === ")") {
				depth--;
				if (depth === 0) break;
			}
		}
		if (depth !== 0) break;
		const rawUrlValue = value.slice(openParenIndex + 1, index).trim();
		const unquotedUrlValue = rawUrlValue.startsWith("\"") && rawUrlValue.endsWith("\"") || rawUrlValue.startsWith("'") && rawUrlValue.endsWith("'") ? rawUrlValue.slice(1, -1).trim() : rawUrlValue;
		sanitized += value.slice(cursor, urlStart);
		sanitized += hasJavascriptScheme(unquotedUrlValue) ? "url(about:blank)" : value.slice(urlStart, index + 1);
		cursor = index + 1;
	}
	return sanitized + value.slice(cursor);
}
function sanitizeAttributeValue(attrName, value) {
	if (urlAttributePattern.test(attrName) && hasJavascriptScheme(value)) return "about:blank";
	return escapeAttributeValue(attrName.toLowerCase() === "style" ? sanitizeStyleValue(value) : value);
}
function escapeLessThan(text) {
	return text.replace(/</g, "&lt;");
}
function serializeAttribute(attrName, value, quote, neutralized) {
	let name = attrName;
	if (eventHandlerPattern.test(attrName)) {
		neutralized.eventHandler = true;
		name = `&#111;n${attrName.slice(2)}`;
	} else if (srcdocPattern.test(attrName)) {
		neutralized.srcdoc = true;
		name = `&#115;${attrName.slice(1)}`;
	}
	if (value === void 0) return name;
	const valueQuote = quote || "";
	return `${name}=${valueQuote}${sanitizeAttributeValue(attrName, value)}${valueQuote}`;
}
var HTML = 0;
var SVG = 1;
var MATHML = 2;
var notOpenedElementPattern = /^(?:area|base|basefont|bgsound|br|col|embed|frame|hr|image|img|input|keygen|link|meta|param|source|track|wbr|html|head|body|frameset)$/;
var breakoutElementPattern = /^(?:b|big|blockquote|body|br|center|code|dd|div|dl|dt|em|embed|h[1-6]|head|hr|i|img|li|listing|menu|meta|nobr|ol|p|pre|ruby|s|small|span|strong|strike|sub|sup|table|tt|u|ul|var)$/;
var paragraphClosingElementPattern = /^(?:address|article|aside|blockquote|center|details|dialog|dir|div|dl|fieldset|figcaption|figure|footer|header|hgroup|main|menu|nav|ol|p|search|section|summary|ul|h[1-6]|pre|listing|form|li|dd|dt|plaintext|table|hr|xmp)$/;
var buttonScopeElementPattern = /^(?:applet|caption|html|table|td|th|marquee|object|template|button)$/;
var svgIntegrationPattern = /^(?:foreignobject|desc|title)$/;
var integrationNamePattern = /^(?:foreignobject|desc|mi|mo|mn|ms|mtext|annotation-xml)$/;
var mathmlIntegrationPattern = /^(?:mi|mo|mn|ms|mtext)$/;
var htmlEncodingPattern = /^(?:text\/html|application\/xhtml\+xml)$/i;
function asciiLowercase(text) {
	return text.replace(/[A-Z]+/g, (upper) => upper.toLowerCase());
}
function isForeignContext(top, name) {
	return !!top && top.namespace !== HTML && (!top.integration || mathmlIntegrationPattern.test(top.name) && (name === "mglyph" || name === "malignmark")) && !(top.name === "annotation-xml" && name === "svg");
}
function isBreakout(name, attributes) {
	return breakoutElementPattern.test(name) || name === "font" && (attributes.has("color") || attributes.has("face") || attributes.has("size"));
}
function closeDownTo(stack, length, parts) {
	let endTags = "";
	for (let index = stack.length - 1; index >= length; index--) {
		const element = stack[index];
		if (element.namespace === HTML && element.name === "form") parts[element.part] = escapeLessThan(parts[element.part]);
		else endTags += `</${element.name}>`;
	}
	stack.length = length;
	return endTags;
}
function closeForeign(stack, parts) {
	let length = stack.length;
	while (length > 0 && stack[length - 1].namespace !== HTML && !stack[length - 1].integration) length--;
	return closeDownTo(stack, length, parts);
}
/**
* Open an element for a start tag, as the tree builder does
*
* @returns The end tags to write before the start tag: the SVG and MathML elements that it ends, and a `<p>`
* of the translation that it closes, with the elements in the `<p>` (so that no formatting element in it is
* made again after it), or `undefined` when the start tag becomes text
*/
function openElement(stack, parts, name, attributes, selfClosing) {
	const part = parts.length + 1;
	let endTags = "";
	const top = stack[stack.length - 1];
	if (isForeignContext(top, name)) {
		if (!isBreakout(name, attributes)) {
			if (!selfClosing) stack.push({
				name,
				namespace: top.namespace,
				integration: top.namespace === SVG ? svgIntegrationPattern.test(name) : mathmlIntegrationPattern.test(name) || name === "annotation-xml" && htmlEncodingPattern.test((attributes.get("encoding") || "").replace(numericCharacterReferencePattern, decodeNumericCharacterReference)),
				part
			});
			return endTags;
		}
		endTags = closeForeign(stack, parts);
	}
	if (paragraphClosingElementPattern.test(name)) for (let index = stack.length - 1; index >= 0; index--) {
		const element = stack[index];
		if (element.namespace === HTML ? buttonScopeElementPattern.test(element.name) : element.integration) break;
		if (element.namespace === HTML && element.name === "p") {
			endTags += closeDownTo(stack, index, parts);
			break;
		}
	}
	if (integrationNamePattern.test(name)) return;
	if (name === "svg" || name === "math") {
		if (!selfClosing) stack.push({
			name,
			namespace: name === "svg" ? SVG : MATHML,
			integration: false,
			part
		});
	} else if (!notOpenedElementPattern.test(name)) stack.push({
		name,
		namespace: HTML,
		integration: false,
		part
	});
	return endTags;
}
/**
* Close the element of an end tag: an SVG or MathML element with the same name above the innermost HTML
* element, or else an HTML element with the same name
*
* @returns The end tags to write before the end tag (of the elements in the closed element), or `undefined`
* when the end tag closes nothing in the translation, and is removed
*/
function closeElement(stack, parts, name) {
	let endTags = "";
	if (name === "p" || name === "br") endTags = closeForeign(stack, parts);
	let index = stack.length - 1;
	while (index >= 0 && stack[index].namespace !== HTML && stack[index].name !== name) index--;
	if (index >= 0 && stack[index].namespace !== HTML);
	else while (index >= 0 && !(stack[index].namespace === HTML && stack[index].name === name)) index--;
	if (index < 0) return name === "br" || name === "p" ? endTags : void 0;
	endTags += closeDownTo(stack, index + 1, parts);
	stack.length = index;
	return endTags;
}
/**
* Read a tag with the rules of the HTML tokenizer.
* A start tag is written again with its attributes sanitized, and an end tag is kept as it is
*
* @param html - The HTML
* @param start - The index of `<`
* @param neutralized - What has been neutralized
* @returns The tag, the tag name, the index after the tag (-1 when the tag is not closed),
* whether the start tag is self-closing (`/>`), and the attributes of the start tag,
* or `undefined` when `<` does not start a tag
*/
function readTag(html, start, neutralized) {
	tagStartPattern.lastIndex = start;
	const tagStart = tagStartPattern.exec(html);
	if (!tagStart) return;
	const [, slash, tagName] = tagStart;
	let tag = tagStart[0];
	const attributes = /* @__PURE__ */ new Map();
	let step;
	tagStepPattern.lastIndex = tagStartPattern.lastIndex;
	while (step = tagStepPattern.exec(html)) {
		const [raw, separator, close, attrName, quote, quotedValue, closingQuote, unquotedValue] = step;
		if (close) {
			const end = tagStepPattern.lastIndex;
			return [
				slash ? html.slice(start, end) : tag + raw,
				tagName,
				end,
				!slash && separator.endsWith("/"),
				attributes
			];
		}
		if (quote && !closingQuote) break;
		if (!slash) {
			const value = quote ? quotedValue : unquotedValue;
			const name = asciiLowercase(attrName);
			if (!attributes.has(name)) attributes.set(name, value || "");
			tag += separator + serializeAttribute(attrName, value, quote, neutralized);
		}
	}
	return [
		tag,
		tagName,
		-1,
		false,
		attributes
	];
}
/**
* Find the end tag of an element whose content is text, as the HTML tokenizer does:
* the first `</` followed by the tag name, and by whitespace, `/` or `>`
*
* @returns The index of the end tag, or -1 when it is not found or not closed in the string
*/
function findTextContentEnd(html, from, tagName) {
	for (let index = html.indexOf("</", from); index !== -1; index = html.indexOf("</", index + 2)) {
		const endTag = readTag(html, index, {});
		if (endTag && endTag[1].toLowerCase() === tagName.toLowerCase()) return endTag[2] === -1 ? -1 : index;
	}
	return -1;
}
/**
* Sanitize the translated HTML
*
* @remarks
* Tags are read with the rules of the HTML tokenizer, so that the sanitizer and browsers agree on
* where each tag and each attribute starts and ends, and every attribute of every start tag is checked.
* What is still open at the end of the string (a tag, a comment, or an element whose content is text,
* like `<textarea>`) becomes text: on the server (SSR), the rest of the page follows the translation,
* and it would be read as a part of what is open.
* For the same reason, the elements are followed as the tree builder of browsers opens and closes them,
* including SVG and MathML: an end tag that closes no element of the translation is removed, the elements
* in the element that an end tag closes are closed before it, and the elements still open at the end are
* closed. A `<form>` that the translation does not close becomes text, because browsers ignore it in a form
* of the page, and `</form>` would close that form
*
* @param html - The translated HTML
* @returns The sanitized HTML
*/
function sanitizeTranslatedHtml(html) {
	const neutralized = {};
	const parts = [];
	const stack = [];
	let index = 0;
	let lessThan;
	while ((lessThan = html.indexOf("<", index)) !== -1) {
		parts.push(html.slice(index, lessThan));
		index = lessThan + 1;
		const read = readTag(html, lessThan, neutralized);
		if (read) {
			const [tag, tagName, end, selfClosing, attributes] = read;
			if (end === -1) {
				neutralized.unclosed = true;
				parts.push(escapeLessThan(html.slice(lessThan)));
				index = html.length;
				break;
			}
			index = end;
			if (tag[1] === "/") {
				const endTags = closeElement(stack, parts, asciiLowercase(tagName));
				if (endTags === void 0) neutralized.closed = true;
				else {
					if (endTags) neutralized.closed = true;
					parts.push(endTags + tag);
				}
			} else if (dangerousElementPattern.test(tagName)) {
				neutralized.element = true;
				parts.push(escapeLessThan(tag));
			} else {
				let content = "";
				if (textContentElementPattern.test(tagName)) {
					const contentEnd = findTextContentEnd(html, end, tagName);
					if (contentEnd === -1) {
						neutralized.unclosed = true;
						parts.push(escapeLessThan(tag));
						continue;
					}
					content = escapeLessThan(html.slice(end, contentEnd));
					index = contentEnd;
				}
				const endTags = openElement(stack, parts, asciiLowercase(tagName), attributes, selfClosing);
				if (endTags === void 0) {
					neutralized.closed = true;
					parts.push(escapeLessThan(tag) + content);
				} else parts.push(endTags, tag + content);
			}
			continue;
		}
		commentPattern.lastIndex = lessThan;
		if (commentPattern.test(html)) {
			parts.push(html.slice(lessThan, commentPattern.lastIndex));
			index = commentPattern.lastIndex;
			continue;
		}
		if (html.startsWith("<!--", lessThan)) neutralized.unclosed = true;
		parts.push("&lt;");
	}
	parts.push(html.slice(index));
	for (let open = stack.length - 1; open >= 0; open--) {
		const element = stack[open];
		neutralized.closed = true;
		if (element.namespace === HTML && element.name === "form") parts[element.part] = escapeLessThan(parts[element.part]);
		else parts.push(`</${element.name}>`);
	}
	return parts.join("");
}
var isNotObjectOrIsArray = (val) => !isObject$2(val) || isArray(val);
function deepCopy(src, des) {
	if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des) || des === Object.prototype) throw new Error("Invalid value");
	const stack = [{
		src,
		des
	}];
	while (stack.length) {
		const { src, des } = stack.pop();
		Object.keys(src).forEach((key) => {
			if (key === "__proto__") return;
			const value = src[key];
			if (isArray(value)) {
				const copied = [];
				copied.length = value.length;
				des[key] = copied;
				stack.push({
					src: value,
					des: copied
				});
			} else if (isObject$2(value)) {
				if (!isObject$2(des[key]) || isArray(des[key])) des[key] = create();
				stack.push({
					src: value,
					des: des[key]
				});
			} else des[key] = value;
		});
	}
}
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fi18n-options.mjs
var localeCodes = ["fr", "en"];
var localeLoaders = {
	fr: [{
		key: "locale_fr_46json_11a0e9c5",
		load: () => Promise.resolve({}),
		cache: true
	}],
	en: [{
		key: "locale_en_46json_dd194427",
		load: () => Promise.resolve({}),
		cache: true
	}]
};
var vueI18nConfigs = [];
var normalizedLocales = [{
	code: "fr",
	language: "fr-FR",
	name: "Français",
	domains: [],
	defaultForDomains: []
}, {
	code: "en",
	language: "en-US",
	name: "English",
	domains: [],
	defaultForDomains: []
}];
// ../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/routing/routing.js
function localePath$1(ctx, route, locale = ctx.getLocale()) {
	if (isString(route) && hasProtocol$1(route, { acceptRelative: true })) return route;
	try {
		return resolveRoute(ctx, route, locale).fullPath;
	} catch {
		return "";
	}
}
function localeRoute(ctx, route, locale = ctx.getLocale()) {
	try {
		return resolveRoute(ctx, route, locale);
	} catch {
		return;
	}
}
function normalizeRawLocation(route) {
	if (!isString(route)) return assign({}, route);
	if (route[0] === "/") {
		const { pathname: path, search, hash } = parsePath(route);
		return {
			path,
			query: parseQuery$2(search),
			hash
		};
	}
	return { name: route };
}
function resolveRoute(ctx, route, locale) {
	const normalized = normalizeRawLocation(route);
	const localized = ctx.resolveLocalizedRouteObject(normalized, locale);
	if (localized.name) localized.path = void 0;
	const resolved = ctx.router.resolve(localized);
	if (resolved.name) return resolved;
	return ctx.router.resolve(route);
}
function switchLocalePath(ctx, locale, route = ctx.router.currentRoute.value) {
	const name = ctx.getRouteBaseName(route);
	if (!name) return "";
	const path = localePath$1(ctx, {
		name,
		params: assign({}, route.params, ctx.getLocalizedDynamicParams(locale)),
		fullPath: route.fullPath,
		query: route.query,
		hash: route.hash,
		meta: route.meta
	}, locale);
	return ctx.afterSwitchLocalePath(path, locale);
}
// ../../node_modules/.pnpm/@intlify+utils@0.14.1/node_modules/@intlify/utils/dist/shared/utils.9f8159f5.mjs
function parseAcceptLanguage(value) {
	return value.split(",").map((tag) => tag.split(";")[0]).filter((tag) => !(tag === "*" || tag === ""));
}
function createPathIndexLanguageParser(index = 0) {
	return (path) => {
		const parts = (typeof path === "string" ? path : path.pathname).split("?")[0].split("/");
		if (parts[0] === "") parts.shift();
		return parts.length > index ? parts[index] || "" : "";
	};
}
// ../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/kit/routing.js
var separator = "___";
var defaultRouteNameSuffix = "___default";
function normalizeRouteName(routeName) {
	if (typeof routeName === "string") return routeName;
	if (routeName != null) return routeName.toString();
	return "";
}
function getRouteBaseName(route) {
	return normalizeRouteName(typeof route === "object" ? route?.name : route).split(separator)[0];
}
function getLocalizedRouteName(routeName, locale, isDefault) {
	return !isDefault ? routeName + separator + locale : routeName + separator + locale + defaultRouteNameSuffix;
}
var createTrailingSlashFormatter = (trailingSlash) => trailingSlash ? withTrailingSlash$1 : withoutTrailingSlash$1;
function prefixable(currentLocale, defaultLocale, options) {
	return options.routing && (currentLocale !== defaultLocale || options.strategy === "prefix");
}
var pathLanguageParser = createPathIndexLanguageParser(0);
var getLocaleFromRoutePath = (path) => pathLanguageParser(path);
var getLocaleFromRouteName = (name) => name.split(separator).at(1) ?? "";
function normalizeInput(input) {
	return typeof input !== "object" ? String(input) : String(input?.name || input?.path || "");
}
function getLocaleFromRoute(route) {
	const input = normalizeInput(route);
	if (input[0] === "/") return getLocaleFromRoutePath(input);
	const fromName = getLocaleFromRouteName(input);
	if (fromName) return fromName;
	if (typeof route === "object" && route?.path) return getLocaleFromRoutePath(String(route.path));
	return "";
}
// ../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/routing/utils.js
function createLocaleRouteNameGetter(hasRoute, config) {
	if (!config.routing && !config.domains) return (routeName) => normalizeRouteName(routeName);
	return (name, locale) => {
		const normalized = normalizeRouteName(name);
		const suffixed = getLocalizedRouteName(normalized, locale, true);
		return hasRoute(suffixed) ? suffixed : getLocalizedRouteName(normalized, locale, false);
	};
}
function createLocalizedRouteByPathResolver(router, config) {
	if (!config.routing) return (route) => route;
	if (config.strategy === "prefix") return (route, locale) => {
		const targetPath = "/" + locale + (route.path === "/" ? "" : route.path);
		const _route = router.options.routes.find((r) => r.path === targetPath);
		if (_route != null) return router.resolve(assign({}, route, _route, { path: targetPath }));
		return route;
	};
	return (route) => router.resolve(route);
}
// ../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/shared/domain.js
var normalizeDomain = (domain = "") => domain.replace(/^https?:\/\//i, "").toLowerCase();
function isLocaleOnHost(locale, host) {
	return !!locale?.domains.some((x) => normalizeDomain(x) === host);
}
function resolveLocaleReach(locales, host, locale) {
	const target = locales.find((l) => l.code === locale);
	if (!target?.domains.length || isLocaleOnHost(target, host)) return "here";
	return locales.some((l) => isLocaleOnHost(l, host)) ? "other-domain" : "off-host";
}
function isLocaleServedOnHost(locales, host, locale) {
	return resolveLocaleReach(locales, host, locale) !== "other-domain";
}
var canonicalDomain = (target) => target?.defaultForDomains[0] || target?.domain || target?.domains[0];
function relocateHostForLocale(host, locale, locales) {
	if (isLocaleServedOnHost(locales, host, locale)) return;
	return canonicalDomain(locales.find((l) => l.code === locale));
}
function matchDomainLocale(locales, host, pathLocale) {
	const matches = locales.filter((locale) => isLocaleOnHost(locale, host));
	return (matches.find((l) => l.code === pathLocale) || matches.find((l) => l.defaultForDomains.some((domain) => normalizeDomain(domain) === host)) || matches[0])?.code;
}
function cookieSpansDomains(locales, cookieDomain) {
	const scope = cookieDomain.replace(/^\./, "").replace(/:\d+$/, "").toLowerCase();
	return locales.every((l) => l.domains.concat(l.domain || []).every((domain) => {
		const host = normalizeDomain(domain).replace(/:\d+$/, "");
		return host === scope || host.endsWith("." + scope);
	}));
}
var withProtocol = (domain, url) => hasProtocol$1(domain, { strict: true }) ? domain : url.protocol + "//" + domain;
function domainFromLocale(domainLocales, url, locale, locales = normalizedLocales) {
	const lang = locales.find((x) => x.code === locale);
	const domain = domainLocales?.[locale]?.domain || lang?.domain || lang?.domains.find((v) => normalizeDomain(v) === url.host) || relocateHostForLocale(url.host, locale, locales);
	if (!domain) return;
	return withProtocol(domain, url);
}
function withRuntimeDomain(locale, domainLocales) {
	if (typeof locale === "string") return locale;
	const properties = locale;
	const domain = domainLocales[properties.code]?.domain;
	if (!domain || domain === properties.domain) return locale;
	return {
		...properties,
		domain,
		domains: [domain],
		defaultForDomains: properties.defaultForDomains.length || properties.domainDefault ? [domain] : []
	};
}
var getDomainLocales = (domainLocales) => normalizedLocales.map((locale) => withRuntimeDomain(locale, domainLocales));
// ../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/shared/locales.js
function getDefaultLocaleForDomain(host, locales) {
	return locales.find((l) => l.defaultForDomains.some((domain) => normalizeDomain(domain) === host))?.code;
}
function resolveDefaultLocale$1(host, defaultLocale, locales) {
	const resolved = getDefaultLocaleForDomain(host, locales) || defaultLocale;
	if (resolved) return resolved;
	return (locales.some((l) => l.domains.length) ? locales[0]?.code : "") || "";
}
var isSupportedLocale = (locale) => localeCodes.includes(locale || "");
var resolveSupportedLocale = (locale) => isSupportedLocale(locale) ? locale : void 0;
// ../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/routing/context.js
var isRouteLocationPathRaw = (val) => !!val.path && !val.name;
function createRoutingContext(options) {
	const { router, defaultLocale, strictSeo, compactRoutes } = options;
	const config = {
		strategy: options.strategy,
		routing: options.routing,
		domains: options.domains
	};
	const formatTrailingSlash = createTrailingSlashFormatter(options.trailingSlash);
	const getLocalizedRouteName = createLocaleRouteNameGetter((name) => router.hasRoute(name), config);
	function resolveLocalizedRouteByName(route, locale) {
		route.name = getRouteBaseName(route.name || router.currentRoute.value);
		const localizedName = getLocalizedRouteName(route.name, locale);
		if (router.hasRoute(localizedName)) {
			route.name = localizedName;
			if (compactRoutes && route.params) delete route.params.locale;
		} else if (compactRoutes && isSupportedLocale(locale) && getCompactRouteNames().has(route.name)) {
			route.params = {
				...route.params || {},
				locale
			};
			return route;
		}
		route.name = localizedName;
		return route;
	}
	const routeByPathResolver = createLocalizedRouteByPathResolver(router, config);
	let compactRouteRecords;
	function getCompactRouteNames() {
		if (compactRouteRecords) return compactRouteRecords;
		compactRouteRecords = /* @__PURE__ */ new Set();
		if (compactRoutes) {
			for (const r of router.getRoutes()) if (r.name != null && /^\/:locale\(/.test(r.path)) compactRouteRecords.add(String(r.name));
		}
		return compactRouteRecords;
	}
	function resolveLocalizedRouteByPath(input, locale) {
		const route = routeByPathResolver(input, locale);
		const baseName = getRouteBaseName(route);
		if (baseName) {
			const localizedName = getLocalizedRouteName(baseName, locale);
			if (router.hasRoute(localizedName)) {
				route.name = localizedName;
				const named = route;
				if (compactRoutes && named.params) delete named.params.locale;
				return route;
			}
			if (compactRoutes && getCompactRouteNames().has(baseName)) {
				const compacted = route;
				compacted.name = baseName;
				compacted.params = {
					...compacted.params || {},
					locale
				};
				return compacted;
			}
			route.name = localizedName;
			return route;
		}
		if (prefixable(locale, defaultLocale, config)) route.path = "/" + locale + route.path;
		route.path = formatTrailingSlash(route.path, true);
		return route;
	}
	const getRouteLocalizedParams = () => router.currentRoute.value.meta["nuxtI18nInternal"] ?? {};
	const missesLocalizedParams = (locale, params = getRouteLocalizedParams()) => strictSeo && !!locale && Object.keys(params).length > 0 && !params[locale];
	const stripsDefaultPrefix = config.strategy === "prefix_except_default" || config.strategy === "prefix_and_default";
	const unprefixesLocale = (domain, locale, locales) => !!domain && resolveDefaultLocale$1(normalizeDomain(domain), options.configuredDefaultLocale, locales) === locale;
	const toDomainUrl = (getBase) => (path, locale, target, locales) => {
		const base = getBase(locale);
		if (!base) return path;
		if (stripsDefaultPrefix && unprefixesLocale(canonicalDomain(target), locale, locales) && getLocaleFromRoutePath(path) === locale) path = path.slice(locale.length + 1) || "/";
		return joinURL$1(base, path);
	};
	const toServingUrl = toDomainUrl(options.getBaseUrl);
	const toCanonicalUrl = toDomainUrl(options.getCanonicalBaseUrl);
	return {
		router,
		getLocale: options.getLocale,
		getLocales: options.getLocales,
		getBaseUrl: options.getBaseUrl,
		getRouteBaseName,
		getRouteLocalizedParams,
		getLocalizedDynamicParams: (locale) => {
			const payload = options.getLocalePathPayload?.();
			if (payload) return payload[locale] || {};
			return getRouteLocalizedParams()?.[locale];
		},
		afterSwitchLocalePath: (path, locale) => {
			if (missesLocalizedParams(locale)) return "";
			if (!config.domains) return path;
			const host = options.getHost() ?? "";
			const locales = options.getLocales();
			const target = locales.find((l) => l.code === locale);
			if (isLocaleOnHost(target, host)) return path;
			if (!path) return path;
			return toServingUrl(path, locale, target, locales);
		},
		getAlternatePath: (path, locale) => {
			if (locale !== options.getLocale() && missesLocalizedParams(locale)) return "";
			if (!config.domains || !path) return path;
			const locales = options.getLocales();
			return toCanonicalUrl(path, locale, locales.find((l) => l.code === locale), locales);
		},
		resolveLocalizedRouteObject: (route, locale) => {
			return isRouteLocationPathRaw(route) ? resolveLocalizedRouteByPath(route, locale) : resolveLocalizedRouteByName(route, locale);
		}
	};
}
// ../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/composable-context.js
function useComposableContext(nuxtApp) {
	const context = nuxtApp?._nuxtI18n?.composableCtx;
	if (!context) throw new Error("i18n context is not initialized. Ensure the i18n plugin is installed and the composable is used within a Vue component or setup function.");
	return context;
}
var getRouter = (nuxtApp) => nuxtApp.$router;
function createComposableContext(ctx, nuxtApp) {
	const localePathPayload = getLocalePathPayload();
	return {
		...createRoutingContext({
			router: getRouter(nuxtApp),
			defaultLocale: ctx.getDefaultLocale(),
			configuredDefaultLocale: ctx.config.defaultLocale || "",
			getLocale: ctx.getLocale,
			getLocales: ctx.getLocales,
			getBaseUrl: ctx.getBaseUrl,
			getCanonicalBaseUrl: ctx.getCanonicalBaseUrl,
			getHost: () => useRequestURL({ xForwardedHost: true }).host,
			getLocalePathPayload: () => false,
			strategy: "prefix_except_default",
			routing: true,
			domains: false,
			trailingSlash: false,
			strictSeo: false,
			compactRoutes: false
		}),
		strictSeo: false,
		_head: void 0,
		get head() {
			this._head ??= useHead({});
			return this._head;
		},
		metaState: {
			htmlAttrs: {},
			meta: [],
			link: []
		},
		seoSettings: {
			dir: false,
			lang: false,
			seo: typeof ctx.config.experimental.strictSeo === "object" && ctx.config.experimental.strictSeo || false
		},
		localePathPayload,
		routingOptions: {
			defaultLocale: ctx.config.defaultLocale || "",
			domains: false,
			strictCanonicals: ctx.config.experimental.alternateLinkCanonicalQueries ?? true,
			hreflangLinks: true
		}
	};
}
function getLocalePathPayload(nuxtApp) {
	return JSON.parse("{}");
}
// ../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/kit/head.js
function localeHead$1(options, currentLanguage = options.getCurrentLanguage(), currentDirection = options.getCurrentDirection()) {
	const metaObject = {
		htmlAttrs: {},
		link: [],
		meta: []
	};
	if (options.dir) metaObject.htmlAttrs.dir = currentDirection;
	if (options.lang && currentLanguage) metaObject.htmlAttrs.lang = currentLanguage;
	if (options.seo) {
		const routeWithoutQuery = options.strictCanonicals ? options.getRouteWithoutQuery() : void 0;
		const alternateLinks = getHreflangLinks(options, routeWithoutQuery);
		const canonical = getCanonicalUrl(options, routeWithoutQuery);
		metaObject.link = metaObject.link.concat(alternateLinks, getCanonicalLink(options, canonical));
		metaObject.meta = metaObject.meta.concat(getOgUrl(options, canonical), getCurrentOgLocale(options), getAlternateOgLocales(options, getAlternateOgLanguages(options, alternateLinks)));
	}
	return metaObject;
}
function createLocaleMap(locales) {
	const localeMap = /* @__PURE__ */ new Map();
	for (const locale of locales) {
		if (!locale.language) {
			console.warn("Locale `language` ISO code is required to generate alternate link");
			continue;
		}
		const [language, region] = locale.language.split("-");
		if (language && region && (locale.isCatchallLocale || !localeMap.has(language))) localeMap.set(language, locale);
		localeMap.set(locale.language, locale);
	}
	return localeMap;
}
function getHreflangLinks(options, routeWithoutQuery = options.strictCanonicals ? options.getRouteWithoutQuery() : void 0) {
	if (!options.hreflangLinks) return [];
	const links = [];
	const localeMap = createLocaleMap(options.locales);
	const hrefs = /* @__PURE__ */ new Map();
	for (const [language, locale] of localeMap.entries()) {
		const href = hrefs.get(locale.code) ?? resolveAlternateHref(locale.code, options, routeWithoutQuery);
		if (!href) continue;
		hrefs.set(locale.code, href);
		const link = options.strictSeo ? {
			rel: "alternate",
			href,
			hreflang: language
		} : {
			[options.key]: `i18n-alt-${language}`,
			rel: "alternate",
			href,
			hreflang: language
		};
		links.push(link);
		if (options.defaultLocale && options.defaultLocale === locale.code && links[0].hreflang !== "x-default") links.unshift(options.strictSeo ? {
			rel: "alternate",
			href,
			hreflang: "x-default"
		} : {
			[options.key]: "i18n-xd",
			rel: "alternate",
			href,
			hreflang: "x-default"
		});
	}
	return links;
}
function resolveAlternateHref(locale, options, routeWithoutQuery = options.strictCanonicals ? options.getRouteWithoutQuery() : void 0) {
	const localePath = options.getLocalizedRoute(locale, routeWithoutQuery);
	if (!localePath) return;
	return withQuery(withBase$1(localePath, options.baseUrl), options.strictCanonicals ? getCanonicalQueryParams(options) : {});
}
function getCanonicalUrl(options, routeWithoutQuery = options.strictCanonicals ? options.getRouteWithoutQuery() : void 0) {
	const localePath = options.getLocalizedRoute(options.currentLocale, routeWithoutQuery);
	if (!localePath) return "";
	return withQuery(withBase$1(localePath, options.baseUrl), getCanonicalQueryParams(options));
}
function getCanonicalLink(options, href = getCanonicalUrl(options)) {
	if (!href) return [];
	return [options.strictSeo ? {
		rel: "canonical",
		href
	} : {
		[options.key]: "i18n-can",
		rel: "canonical",
		href
	}];
}
function getCanonicalQueryParams(options, route = options.getCurrentRoute()) {
	if (!options.canonicalQueries.length) return {};
	const currentRouteQuery = options.getLocaleRoute(Object.assign({}, route, {
		path: void 0,
		name: options.getRouteBaseName(route)
	}))?.query ?? {};
	const params = {};
	for (const param of options.canonicalQueries.filter((x) => x in currentRouteQuery)) {
		params[param] ??= [];
		for (const val of toArray$2(currentRouteQuery[param])) params[param].push(val || "");
	}
	return params;
}
function getOgUrl(options, href = getCanonicalUrl(options)) {
	if (!href) return [];
	return [options.strictSeo ? {
		property: "og:url",
		content: href
	} : {
		[options.key]: "i18n-og-url",
		property: "og:url",
		content: href
	}];
}
function getCurrentOgLocale(options, currentLanguage = options.getCurrentLanguage()) {
	if (!currentLanguage) return [];
	return [options.strictSeo ? {
		property: "og:locale",
		content: formatOgLanguage(currentLanguage)
	} : {
		[options.key]: "i18n-og",
		property: "og:locale",
		content: formatOgLanguage(currentLanguage)
	}];
}
function getAlternateOgLanguages(options, alternateLinks) {
	const languages = options.locales.map((x) => x.language || x.code);
	if (!options.strictSeo) return languages;
	const available = new Set(alternateLinks.map((x) => x.hreflang));
	return languages.filter((x) => available.has(x));
}
function getAlternateOgLocales(options, languages, currentLanguage = options.getCurrentLanguage()) {
	return languages.filter((locale) => locale && locale !== currentLanguage).map((locale) => options.strictSeo ? {
		property: "og:locale:alternate",
		content: formatOgLanguage(locale)
	} : {
		[options.key]: `i18n-og-alt-${locale}`,
		property: "og:locale:alternate",
		content: formatOgLanguage(locale)
	});
}
function formatOgLanguage(val = "") {
	return val.replace(/-/g, "_");
}
function toArray$2(value) {
	return Array.isArray(value) ? value : [value];
}
// ../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/routing/head.js
function createHeadContext(ctx, config, locale = ctx.getLocale(), locales = ctx.getLocales(), baseUrl = ctx.routingOptions.domains ? ctx.getBaseUrl(locale) : ctx.getBaseUrl()) {
	const currentLocale = locales.find((l) => l.code === locale) || { };
	const canonicalQueries = [...new Set(typeof config.seo === "object" && config.seo?.canonicalQueries || [])];
	const alternateCtx = {
		...ctx,
		afterSwitchLocalePath: ctx.getAlternatePath
	};
	if (config.seo && !baseUrl && !ctx.routingOptions.domains) {
		if (ctx.strictSeo) throw new Error("I18n `baseUrl` is required to generate valid SEO tag links.");
		console.warn("I18n `baseUrl` is required to generate valid SEO tag links.");
	}
	return {
		...config,
		key: ctx.strictSeo ? "key" : "id",
		strictSeo: ctx.strictSeo,
		locales,
		currentLocale: locale,
		baseUrl,
		canonicalQueries,
		hreflangLinks: ctx.routingOptions.hreflangLinks,
		defaultLocale: ctx.routingOptions.defaultLocale,
		strictCanonicals: ctx.strictSeo || ctx.routingOptions.strictCanonicals,
		getRouteBaseName: ctx.getRouteBaseName,
		getCurrentRoute: () => ctx.router.currentRoute.value,
		getCurrentLanguage: () => currentLocale.language,
		getCurrentDirection: () => currentLocale.dir || "ltr",
		getLocaleRoute: (route) => localeRoute(ctx, route),
		getLocalizedRoute: (locale2, route) => switchLocalePath(alternateCtx, locale2, route),
		getRouteWithoutQuery: () => {
			try {
				return assign({}, ctx.router.resolve({ query: {} }), { meta: ctx.router.currentRoute.value.meta });
			} catch {
				return;
			}
		}
	};
}
function localeHead(ctx, { dir = true, lang = true, seo = true }) {
	return localeHead$1(createHeadContext(ctx, {
		dir,
		lang,
		seo
	}));
}
// ../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/composables/index.js
function useRouteBaseName(nuxtApp = useNuxtApp()) {
	const common = useComposableContext(nuxtApp);
	return (route) => {
		if (route == null) return;
		return common.getRouteBaseName(route) || void 0;
	};
}
function useLocalePath(nuxtApp = useNuxtApp()) {
	const common = useComposableContext(nuxtApp);
	return (route, locale) => localePath$1(common, route, locale);
}
function useLocaleRoute(nuxtApp = useNuxtApp()) {
	const common = useComposableContext(nuxtApp);
	return (route, locale) => localeRoute(common, route, locale);
}
function useSwitchLocalePath(nuxtApp = useNuxtApp()) {
	const common = useComposableContext(nuxtApp);
	return (locale) => switchLocalePath(common, locale);
}

// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/route-match.js
/** An absolute path with no query, hash or percent-encoding: its `href` is the history base plus the path. */
function isPlainAbsolutePath(to) {
	return to[0] === "/" && !to.includes("?") && !to.includes("#") && !to.includes("%");
}
var PARAM_SEGMENT_RE = /^:\w+\(\)$/;
var routePatternCache = /* @__PURE__ */ new WeakMap();
/**
* Whether `path` might resolve to a record in `currentRoute.matched`, the precondition for a
* link being active. Conservative: `true` unless every record's path is a plain mix of static
* and required param segments and none can match.
*/
function mayMatchCurrentRoute(currentRoute, path) {
	const matched = currentRoute.matched;
	let patterns = routePatternCache.get(matched);
	if (patterns === void 0) {
		patterns = [];
		for (const record of matched) {
			if (record.aliasOf || record.alias) {
				patterns = null;
				break;
			}
			const segments = splitSegments(record.path);
			for (const segment of segments) if (segment.includes(":") ? !PARAM_SEGMENT_RE.test(segment) : /[?*+()]/.test(segment)) {
				patterns = null;
				break;
			}
			if (!patterns) break;
			patterns.push(segments);
		}
		routePatternCache.set(matched, patterns);
	}
	if (!patterns) return true;
	const count = countSegments(path);
	let target;
	outer: for (const pattern of patterns) {
		if (pattern.length !== count) continue;
		target ??= splitSegments(path);
		for (let i = 0; i < pattern.length; i++) {
			const p = pattern[i];
			const t = target[i];
			if (p[0] === ":") {
				if (!t) continue outer;
			} else if (p.toLowerCase() !== t.toLowerCase()) continue outer;
		}
		return true;
	}
	return false;
}
/** The number of segments `splitSegments` returns for `path`. */
function countSegments(path) {
	let count = 1;
	for (let i = path.indexOf("/"); i !== -1; i = path.indexOf("/", i + 1)) count++;
	return count > 1 && path.endsWith("/") ? count - 1 : count;
}
function splitSegments(path) {
	const segments = path.split("/");
	if (segments.length > 1 && segments[segments.length - 1] === "") segments.pop();
	return segments;
}
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-link.js
var firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtLink(options) {
	const componentName = options.componentName || "NuxtLink";
	function isHashLinkWithoutHashMode(link) {
		return typeof link === "string" && link.startsWith("#");
	}
	function resolveTrailingSlashBehavior(to, resolve, trailingSlash) {
		const effectiveTrailingSlash = trailingSlash ?? options.trailingSlash;
		if (!to || effectiveTrailingSlash !== "append" && effectiveTrailingSlash !== "remove") return to;
		if (typeof to === "string") return applyTrailingSlashBehavior(to, effectiveTrailingSlash);
		const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
		return {
			...to,
			name: void 0,
			path: applyTrailingSlashBehavior(path, effectiveTrailingSlash)
		};
	}
	/**
	* The link state `<NuxtLink>` renders with. Kept separate from `useNuxtLink` so the component
	* does not resolve the `<RouterLink>` link state backing `route`/`isActive`/`isExactActive`,
	* which it never reads.
	*/
	function useLinkTarget(props, attrs) {
		const router = useRouter();
		const config = /* @__PURE__ */ useRuntimeConfig();
		const rootedHref = router.options?.history?.createHref ?? ((path) => joinURL$1(config.app.baseURL, path));
		const hasTarget = computed(() => !!unref(props.target) && unref(props.target) !== "_self");
		const isAbsoluteUrl = computed(() => {
			const path = unref(props.to) || unref(props.href) || "";
			return typeof path === "string" && isAbsoluteHref(path);
		});
		const download = computed(() => attrs?.download !== void 0);
		const isExternal = computed(() => {
			if (unref(props.external)) return true;
			const path = unref(props.to) || unref(props.href) || "";
			if (typeof path === "object") return false;
			return path === "" || isAbsoluteUrl.value;
		});
		const to = computed(() => {
			const path = unref(props.to) || unref(props.href) || "";
			if (isExternal.value) return path;
			return resolveTrailingSlashBehavior(path, router.resolve, unref(props.trailingSlash));
		});
		const href = computed(() => {
			const effectiveTrailingSlash = unref(props.trailingSlash) ?? options.trailingSlash;
			if (!to.value || isAbsoluteUrl.value || isHashLinkWithoutHashMode(to.value)) {
				const raw = to.value;
				return typeof raw === "string" ? sanitizeAnchorHref(raw) : raw;
			}
			if (isExternal.value) {
				const path = typeof to.value === "object" && "path" in to.value ? resolveRouteObject(to.value) : to.value;
				const href = typeof path === "object" ? router.resolve(path).href : path;
				const safe = typeof href === "string" ? sanitizeAnchorHref(href) : href;
				return safe === null ? null : applyTrailingSlashBehavior(safe, effectiveTrailingSlash);
			}
			if (typeof to.value === "object") return router.resolve(to.value)?.href ?? null;
			if (download.value && isRootedPath(to.value)) return joinURL$1(config.app.baseURL, to.value);
			return applyTrailingSlashBehavior(isRootedPath(to.value) ? rootedHref(to.value) : router.resolve(to.value).href, effectiveTrailingSlash);
		});
		return {
			to,
			hasTarget,
			isAbsoluteUrl,
			isExternal,
			download,
			href,
			async navigate(_e) {
				if (href.value === null) return;
				await navigateTo(href.value, {
					replace: unref(props.replace),
					external: isExternal.value || hasTarget.value
				});
			}
		};
	}
	function useNuxtLink(props) {
		const router = useRouter();
		const target = useLinkTarget(props);
		const builtinRouterLink = resolveComponent("RouterLink");
		const useBuiltinLink = builtinRouterLink && typeof builtinRouterLink !== "string" ? builtinRouterLink.useLink : void 0;
		const link = target.isExternal.value ? void 0 : useBuiltinLink?.({
			...props,
			to: target.to,
			viewTransition: unref(props.viewTransition)
		});
		return {
			...target,
			isActive: link?.isActive ?? computed(() => target.to.value === router.currentRoute.value.path),
			isExactActive: link?.isExactActive ?? computed(() => target.to.value === router.currentRoute.value.path),
			route: link?.route ?? computed(() => router.resolve(target.to.value))
		};
	}
	/**
	* Resolve the link state `<RouterLink>` exposes for an internal location.
	*/
	function resolveStaticLink(props, router, rawTo, currentRoute = router.currentRoute.value) {
		let route;
		let href;
		let isActive = false;
		let isExactActive = false;
		if (typeof rawTo === "string" && router.options.history && isPlainAbsolutePath(rawTo) && !props.trailingSlash && !options.trailingSlash && !mayMatchCurrentRoute(currentRoute, rawTo)) href = router.options.history.base + rawTo;
		else {
			route = router.resolve(resolveTrailingSlashBehavior(rawTo, router.resolve, props.trailingSlash));
			href = route.href;
			const index = activeRecordIndex(route, currentRoute);
			isActive = index > -1 && includesParams(currentRoute.params, route.params);
			isExactActive = index > -1 && index === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.params);
		}
		return new StaticLink(router, rawTo, route, href, isActive, isExactActive, props.replace);
	}
	/**
	* Render an internal link as a plain anchor, matching the markup `<RouterLink>` produces
	* for the same location.
	*/
	function renderStaticInternalLink(props, slots, router, rawTo, nuxtApp) {
		const link = resolveStaticLink(props, router, rawTo);
		return h("a", staticInternalLinkAttrs(props, router, link), slots.default?.(link));
	}
	function staticInternalLinkClasses(props, router) {
		return [getLinkClass(props.activeClass || options.activeClass, router.options.linkActiveClass, "router-link-active"), getLinkClass(props.exactActiveClass || options.exactActiveClass, router.options.linkExactActiveClass, "router-link-exact-active")];
	}
	function staticInternalLinkAttrs(props, router, link, nuxtApp) {
		const linkClass = staticInternalLinkClass(props, router, link);
		return {
			"aria-current": link.isExactActive ? props.ariaCurrentValue ?? "page" : null,
			"href": link.href,
			...linkClass && { class: linkClass },
			"rel": props.rel || void 0,
			"data-internal": void 0
		};
	}
	function staticInternalLinkClass(props, router, link) {
		if (!link.isActive && !link.isExactActive) return "";
		const [activeClass, exactActiveClass] = staticInternalLinkClasses(props, router);
		return link.isExactActive ? activeClass === exactActiveClass ? activeClass : `${activeClass} ${exactActiveClass}` : activeClass !== exactActiveClass ? activeClass : "";
	}
	function staticInternalLinkOpenTag(props, router, link, nuxtApp) {
		let tag = "<a";
		if (link.isExactActive) tag += ` aria-current="${escapeHtml(props.ariaCurrentValue ?? "page")}"`;
		tag += ` href="${escapeHtml(link.href)}"`;
		const linkClass = staticInternalLinkClass(props, router, link);
		if (linkClass) tag += ` class="${escapeHtml(linkClass)}"`;
		if (props.rel) tag += ` rel="${escapeHtml(props.rel)}"`;
		return tag;
	}
	function isStaticInternalLink(props, rawTo, download = false) {
		return !(props.external || download || typeof rawTo === "string" && (rawTo === "" || isAbsoluteHref(rawTo))) && !isHashLinkWithoutHashMode(rawTo) && (!props.target || props.target === "_self");
	}
	/** Resolves the anchor of a template `<NuxtLink>` that can be rendered without a component instance. */
	function resolveSsrLink(rawProps, parent) {
		const props = directRenderProps(rawProps);
		const rawTo = props?.to;
		if (!props || !rawTo || !isStaticInternalLink(props, rawTo, props.attrs?.download !== void 0)) return;
		const nuxtApp = parent.appContext.app.$nuxt;
		const router = nuxtApp?.$router ?? useRouter();
		const link = resolveStaticLink(props, router, rawTo);
		return {
			link,
			openTag: props.class || props.style || props.attrs ? void 0 : staticInternalLinkOpenTag(props, router, link),
			attrs: () => {
				const attrs = staticInternalLinkAttrs(props, router, link);
				if (props.attrs) Object.assign(attrs, props.attrs);
				if (props.class) attrs.class = [attrs.class, props.class];
				if (props.style) attrs.style = props.style;
				return attrs;
			}
		};
	}
	/**
	* Render the slot of an internal `custom` link with the props `<RouterLink custom>` passes to it.
	*/
	function renderStaticCustomLink(props, slots, router, rawTo) {
		const link = resolveStaticLink(props, router, rawTo);
		const vnodes = slots.default?.({
			...link,
			route: link.route,
			rel: firstNonUndefined(props.noRel ? "" : props.rel, options.externalRelAttribute, "") || null,
			target: props.target || null,
			isExternal: false,
			prefetch: async () => {},
			prefetched: false,
			shouldPrefetch: () => false
		});
		return vnodes?.length === 1 ? vnodes[0] : vnodes;
	}
	const component = defineComponent({
		name: componentName,
		props: {
			to: {
				type: [String, Object],
				required: false
			},
			href: {
				type: [String, Object],
				required: false
			},
			target: {
				type: String,
				required: false
			},
			rel: {
				type: String,
				required: false
			},
			noRel: {
				type: Boolean,
				default: void 0,
				required: false
			},
			prefetch: {
				type: Boolean,
				default: void 0,
				required: false
			},
			prefetchOn: {
				type: [String, Object],
				required: false
			},
			noPrefetch: {
				type: Boolean,
				default: void 0,
				required: false
			},
			activeClass: {
				type: String,
				required: false
			},
			exactActiveClass: {
				type: String,
				required: false
			},
			prefetchedClass: {
				type: String,
				required: false
			},
			replace: {
				type: Boolean,
				default: void 0,
				required: false
			},
			ariaCurrentValue: {
				type: String,
				required: false
			},
			external: {
				type: Boolean,
				default: void 0,
				required: false
			},
			custom: {
				type: Boolean,
				default: void 0,
				required: false
			},
			trailingSlash: {
				type: String,
				required: false
			}
		},
		useLink: useNuxtLink,
		setup(props, { slots, attrs }) {
			const router = useRouter();
			{
				const rawTo = props.to || props.href || "";
				if (isStaticInternalLink(props, rawTo, attrs.download !== void 0)) {
					if (props.custom) return () => renderStaticCustomLink(props, slots, router, rawTo);
					return () => renderStaticInternalLink(props, slots, router, rawTo);
				}
			}
			const routerLinkComponent = resolveComponent("RouterLink");
			const { to, href, navigate, isExternal, hasTarget, isAbsoluteUrl, download } = useLinkTarget(props, attrs);
			const prefetched = shallowRef(false);
			const el = void 0;
			const elRef = void 0;
			function shouldPrefetch(mode) {
				return false;
			}
			async function prefetch(nuxtApp = useNuxtApp()) {}
			return () => {
				const target = props.target || null;
				const rel = firstNonUndefined(props.noRel ? "" : props.rel, options.externalRelAttribute, isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : "") || null;
				const getCustomSlotProps = (routerLinkSlotProps) => ({
					navigate,
					get route() {
						if (!href.value) return;
						const url = new URL(href.value, "http://localhost");
						return {
							path: url.pathname,
							fullPath: url.pathname,
							get query() {
								return url.search ? parseQuery$1(url.search) : {};
							},
							hash: url.hash,
							params: {},
							name: void 0,
							matched: [],
							redirectedFrom: void 0,
							meta: {},
							href: href.value
						};
					},
					rel,
					target,
					isExternal: isExternal.value || hasTarget.value,
					isActive: false,
					isExactActive: false,
					...routerLinkSlotProps,
					href: typeof routerLinkSlotProps?.href === "string" ? sanitizeAnchorHref(routerLinkSlotProps.href) : href.value,
					prefetch,
					prefetched: prefetched.value,
					shouldPrefetch
				});
				if (!isExternal.value && !download.value && !hasTarget.value && !isHashLinkWithoutHashMode(to.value)) {
					const routerLinkProps = {
						ref: elRef,
						to: to.value,
						activeClass: props.activeClass || options.activeClass,
						exactActiveClass: props.exactActiveClass || options.exactActiveClass,
						replace: props.replace,
						ariaCurrentValue: props.ariaCurrentValue,
						custom: props.custom
					};
					if (!props.custom) routerLinkProps.rel = props.rel || void 0;
					return h(routerLinkComponent, routerLinkProps, props.custom && slots.default ? { default: (slotProps) => slots.default(getCustomSlotProps(slotProps)) } : slots.default);
				}
				if (props.custom) {
					if (!slots.default) return null;
					return slots.default(getCustomSlotProps());
				}
				return h("a", {
					ref: el,
					href: href.value || null,
					rel,
					target,
					onClick: async (event) => {
						if (isExternal.value || hasTarget.value || download.value) return;
						event.preventDefault();
						try {
							const encodedHref = encodeRoutePath(href.value ?? "");
							return await (props.replace ? router.replace(encodedHref) : router.push(encodedHref));
						} finally {}
					}
				}, slots.default?.());
			};
		}
	});
	component.__ssrLink = resolveSsrLink;
	return component;
}
var NuxtLink = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function isSameRouteRecord(a, b) {
	return (a.aliasOf || a) === (b.aliasOf || b);
}
function getOriginalPath(record) {
	return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
function isEquivalentArray(a, b) {
	return Array.isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
function isSameParamValue(a, b) {
	return Array.isArray(a) ? isEquivalentArray(a, b) : Array.isArray(b) ? isEquivalentArray(b, a) : (a && a.valueOf()) === (b && b.valueOf());
}
function isSameRouteLocationParams(a, b) {
	if (Object.keys(a).length !== Object.keys(b).length) return false;
	for (const key in a) if (!isSameParamValue(a[key], b[key])) return false;
	return true;
}
/** The link state `<RouterLink>` exposes for an internal location, resolving `route` when it is read. */
var StaticLink = class {
	href;
	isActive;
	isExactActive;
	navigate;
	#router;
	#to;
	#route;
	constructor(router, to, route, href, isActive, isExactActive, replace) {
		this.href = sanitizeAnchorHref(href);
		this.isActive = isActive;
		this.isExactActive = isExactActive;
		this.navigate = async () => {
			await navigateTo(href, { replace });
		};
		this.#router = router;
		this.#to = to;
		this.#route = route;
	}
	get route() {
		return this.#route ??= this.#router.resolve(this.#to);
	}
};
var DIRECT_RENDER_PROPS = /* @__PURE__ */ new Set([
	"key",
	"to",
	"class",
	"style",
	"rel",
	"activeClass",
	"exactActiveClass",
	"ariaCurrentValue",
	"prefetchOn",
	"prefetchedClass"
]);
var COMPONENT_RENDER_KEYS = /* @__PURE__ */ new Set([
	"href",
	"target",
	"noRel",
	"prefetch",
	"noPrefetch",
	"replace",
	"external",
	"custom",
	"trailingSlash",
	"viewTransition",
	"ref",
	"ref_for",
	"ref_key",
	"innerHTML",
	"textContent"
]);
function directRenderProps(raw) {
	let props = raw;
	let attrs;
	for (const key in raw) {
		const name = key.includes("-") ? camelize(key) : key;
		if (!DIRECT_RENDER_PROPS.has(name)) {
			if (COMPONENT_RENDER_KEYS.has(name) || key.startsWith("onVnode")) return;
			(attrs ??= {})[key] = raw[key];
		} else if (name !== key) {
			if (props === raw) props = { ...raw };
			props[name] = raw[key];
		}
	}
	if (attrs) {
		if (props === raw) props = { ...raw };
		props.attrs = attrs;
	}
	return props;
}
function includesParams(outer, inner) {
	for (const key in inner) {
		const innerValue = inner[key];
		const outerValue = outer[key];
		if (typeof innerValue === "string") {
			if (innerValue !== outerValue) return false;
		} else if (!Array.isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value.valueOf() !== outerValue[i].valueOf())) return false;
	}
	return true;
}
function activeRecordIndex(route, currentRoute) {
	const { matched } = route;
	const { length } = matched;
	const routeMatched = matched[length - 1];
	const currentMatched = currentRoute.matched;
	if (!routeMatched || !currentMatched.length) return -1;
	const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
	if (index > -1) return index;
	const parentRecordPath = getOriginalPath(matched[length - 2]);
	return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index;
}
/** Resolve an active-link class, falling back from the per-link value to the router-wide one. */
function getLinkClass(propClass, globalClass, defaultClass) {
	return propClass ?? globalClass ?? defaultClass;
}
function applyTrailingSlashBehavior(to, trailingSlash) {
	if (trailingSlash !== "append" && trailingSlash !== "remove") return to;
	const normalizeFn = trailingSlash === "append" ? withTrailingSlash$1 : withoutTrailingSlash$1;
	if (hasProtocol$1(to) && !to.startsWith("http")) return to;
	return normalizeFn(to, true);
}
// ../../node_modules/.pnpm/@intlify+message-compiler@11.4.24/node_modules/@intlify/message-compiler/dist/message-compiler.mjs
/*!
* message-compiler v11.4.24
* (c) 2026 kazuya kawaguchi
* Released under the MIT License.
*/
function createPosition(line, column, offset) {
	return {
		line,
		column,
		offset
	};
}
function createLocation(start, end, source) {
	const loc = {
		start,
		end
	};
	return loc;
}
var CompileErrorCodes = {
	EXPECTED_TOKEN: 1,
	INVALID_TOKEN_IN_PLACEHOLDER: 2,
	UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
	UNKNOWN_ESCAPE_SEQUENCE: 4,
	INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
	UNBALANCED_CLOSING_BRACE: 6,
	UNTERMINATED_CLOSING_BRACE: 7,
	EMPTY_PLACEHOLDER: 8,
	NOT_ALLOW_NEST_PLACEHOLDER: 9,
	INVALID_LINKED_FORMAT: 10,
	MUST_HAVE_MESSAGES_IN_PLURAL: 11,
	UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
	UNEXPECTED_EMPTY_LINKED_KEY: 13,
	UNEXPECTED_LEXICAL_ANALYSIS: 14};
function createCompileError(code, loc, options = {}) {
	const { domain, messages, args } = options;
	const error = new SyntaxError(String(code));
	error.code = code;
	if (loc) error.location = loc;
	error.domain = domain;
	return error;
}
/** @internal */
function defaultOnError(error) {
	throw error;
}
var CHAR_SP = " ";
var CHAR_CR = "\r";
var CHAR_LF = "\n";
var CHAR_LS = String.fromCharCode(8232);
var CHAR_PS = String.fromCharCode(8233);
function createScanner(str) {
	const _buf = str;
	let _index = 0;
	let _line = 1;
	let _column = 1;
	let _peekOffset = 0;
	const isCRLF = (index) => _buf[index] === CHAR_CR && _buf[index + 1] === CHAR_LF;
	const isLF = (index) => _buf[index] === CHAR_LF;
	const isPS = (index) => _buf[index] === CHAR_PS;
	const isLS = (index) => _buf[index] === CHAR_LS;
	const isLineEnd = (index) => isCRLF(index) || isLF(index) || isPS(index) || isLS(index);
	const index = () => _index;
	const line = () => _line;
	const column = () => _column;
	const peekOffset = () => _peekOffset;
	const charAt = (offset) => isCRLF(offset) || isPS(offset) || isLS(offset) ? CHAR_LF : _buf[offset];
	const currentChar = () => charAt(_index);
	const currentPeek = () => charAt(_index + _peekOffset);
	function next() {
		_peekOffset = 0;
		if (isLineEnd(_index)) {
			_line++;
			_column = 0;
		}
		if (isCRLF(_index)) _index++;
		_index++;
		_column++;
		return _buf[_index];
	}
	function peek() {
		if (isCRLF(_index + _peekOffset)) _peekOffset++;
		_peekOffset++;
		return _buf[_index + _peekOffset];
	}
	function reset() {
		_index = 0;
		_line = 1;
		_column = 1;
		_peekOffset = 0;
	}
	function resetPeek(offset = 0) {
		_peekOffset = offset;
	}
	function skipToPeek() {
		const target = _index + _peekOffset;
		while (target !== _index) next();
		_peekOffset = 0;
	}
	return {
		index,
		line,
		column,
		peekOffset,
		charAt,
		currentChar,
		currentPeek,
		next,
		peek,
		reset,
		resetPeek,
		skipToPeek
	};
}
var EOF = void 0;
var TAB = "	";
var LITERAL_DELIMITER = "'";
var ERROR_DOMAIN$3 = "tokenizer";
function createTokenizer(source, options = {}) {
	const location = options.location !== false;
	const _scnr = createScanner(source);
	const currentOffset = () => _scnr.index();
	const currentPosition = () => createPosition(_scnr.line(), _scnr.column(), _scnr.index());
	const _initLoc = currentPosition();
	const _initOffset = currentOffset();
	const _context = {
		currentType: 13,
		offset: _initOffset,
		startLoc: _initLoc,
		endLoc: _initLoc,
		lastType: 13,
		lastOffset: _initOffset,
		lastStartLoc: _initLoc,
		lastEndLoc: _initLoc,
		braceNest: 0,
		inLinked: false,
		text: ""
	};
	const context = () => _context;
	const { onError } = options;
	function emitError(code, pos, offset, ...args) {
		const ctx = context();
		pos.column += offset;
		pos.offset += offset;
		if (onError) {
			const err = createCompileError(code, location ? createLocation(ctx.startLoc, pos) : null, {
				domain: ERROR_DOMAIN$3,
				args
			});
			onError(err);
		}
	}
	function getToken(context, type, value) {
		context.endLoc = currentPosition();
		context.currentType = type;
		const token = { type };
		if (location) token.loc = createLocation(context.startLoc, context.endLoc);
		if (value != null) token.value = value;
		return token;
	}
	const getEndToken = (context) => getToken(context, 13);
	function eat(scnr, ch) {
		if (scnr.currentChar() === ch) {
			scnr.next();
			return ch;
		} else {
			emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch);
			return "";
		}
	}
	function peekSpaces(scnr) {
		let buf = "";
		while (scnr.currentPeek() === CHAR_SP || scnr.currentPeek() === CHAR_LF) {
			buf += scnr.currentPeek();
			scnr.peek();
		}
		return buf;
	}
	function skipSpaces(scnr) {
		const buf = peekSpaces(scnr);
		scnr.skipToPeek();
		return buf;
	}
	function isIdentifierStart(ch) {
		if (ch === EOF) return false;
		const cc = ch.charCodeAt(0);
		return cc >= 97 && cc <= 122 || cc >= 65 && cc <= 90 || cc === 95;
	}
	function isNumberStart(ch) {
		if (ch === EOF) return false;
		const cc = ch.charCodeAt(0);
		return cc >= 48 && cc <= 57;
	}
	function isNamedIdentifierStart(scnr, context) {
		const { currentType } = context;
		if (currentType !== 2) return false;
		peekSpaces(scnr);
		const ret = isIdentifierStart(scnr.currentPeek());
		scnr.resetPeek();
		return ret;
	}
	function isListIdentifierStart(scnr, context) {
		const { currentType } = context;
		if (currentType !== 2) return false;
		peekSpaces(scnr);
		const ret = isNumberStart(scnr.currentPeek() === "-" ? scnr.peek() : scnr.currentPeek());
		scnr.resetPeek();
		return ret;
	}
	function isLiteralStart(scnr, context) {
		const { currentType } = context;
		if (currentType !== 2) return false;
		peekSpaces(scnr);
		const ret = scnr.currentPeek() === LITERAL_DELIMITER;
		scnr.resetPeek();
		return ret;
	}
	function isLinkedDotStart(scnr, context) {
		const { currentType } = context;
		if (currentType !== 7) return false;
		peekSpaces(scnr);
		const ret = scnr.currentPeek() === ".";
		scnr.resetPeek();
		return ret;
	}
	function isLinkedModifierStart(scnr, context) {
		const { currentType } = context;
		if (currentType !== 8) return false;
		peekSpaces(scnr);
		const ret = isIdentifierStart(scnr.currentPeek());
		scnr.resetPeek();
		return ret;
	}
	function isLinkedDelimiterStart(scnr, context) {
		const { currentType } = context;
		if (!(currentType === 7 || currentType === 11)) return false;
		peekSpaces(scnr);
		const ret = scnr.currentPeek() === ":";
		scnr.resetPeek();
		return ret;
	}
	function isLinkedReferStart(scnr, context) {
		const { currentType } = context;
		if (currentType !== 9) return false;
		const fn = () => {
			const ch = scnr.currentPeek();
			if (ch === "{") return isIdentifierStart(scnr.peek());
			else if (ch === "@" || ch === "|" || ch === ":" || ch === "." || ch === CHAR_SP || !ch) return false;
			else if (ch === CHAR_LF) {
				scnr.peek();
				return fn();
			} else return isTextStart(scnr, false);
		};
		const ret = fn();
		scnr.resetPeek();
		return ret;
	}
	function isPluralStart(scnr) {
		peekSpaces(scnr);
		const ret = scnr.currentPeek() === "|";
		scnr.resetPeek();
		return ret;
	}
	function isTextStart(scnr, reset = true) {
		const fn = (hasSpace = false, prev = "") => {
			const ch = scnr.currentPeek();
			if (ch === "{") return hasSpace;
			else if (ch === "@" || !ch) return hasSpace;
			else if (ch === "|") return !(prev === CHAR_SP || prev === CHAR_LF);
			else if (ch === CHAR_SP) {
				scnr.peek();
				return fn(true, CHAR_SP);
			} else if (ch === CHAR_LF) {
				scnr.peek();
				return fn(true, CHAR_LF);
			} else return true;
		};
		const ret = fn();
		reset && scnr.resetPeek();
		return ret;
	}
	function takeChar(scnr, fn) {
		const ch = scnr.currentChar();
		if (ch === EOF) return;
		if (fn(ch)) {
			scnr.next();
			return ch;
		}
		return null;
	}
	function isIdentifier(ch) {
		const cc = ch.charCodeAt(0);
		return cc >= 97 && cc <= 122 || cc >= 65 && cc <= 90 || cc >= 48 && cc <= 57 || cc === 95 || cc === 36;
	}
	function takeIdentifierChar(scnr) {
		return takeChar(scnr, isIdentifier);
	}
	function isNamedIdentifier(ch) {
		const cc = ch.charCodeAt(0);
		return cc >= 97 && cc <= 122 || cc >= 65 && cc <= 90 || cc >= 48 && cc <= 57 || cc === 95 || cc === 36 || cc === 45;
	}
	function takeNamedIdentifierChar(scnr) {
		return takeChar(scnr, isNamedIdentifier);
	}
	function isDigit(ch) {
		const cc = ch.charCodeAt(0);
		return cc >= 48 && cc <= 57;
	}
	function takeDigit(scnr) {
		return takeChar(scnr, isDigit);
	}
	function isHexDigit(ch) {
		const cc = ch.charCodeAt(0);
		return cc >= 48 && cc <= 57 || cc >= 65 && cc <= 70 || cc >= 97 && cc <= 102;
	}
	function takeHexDigit(scnr) {
		return takeChar(scnr, isHexDigit);
	}
	function getDigits(scnr) {
		let ch = "";
		let num = "";
		while (ch = takeDigit(scnr)) num += ch;
		return num;
	}
	function readText(scnr) {
		let buf = "";
		while (true) {
			const ch = scnr.currentChar();
			if (ch === "\\") {
				const nextCh = scnr.peek();
				if (nextCh === "{" || nextCh === "}" || nextCh === "@" || nextCh === "|" || nextCh === "\\") {
					buf += ch + nextCh;
					scnr.next();
					scnr.next();
				} else {
					scnr.resetPeek();
					buf += ch;
					scnr.next();
				}
			} else if (ch === "{" || ch === "}" || ch === "@" || ch === "|" || !ch) break;
			else if (ch === CHAR_SP || ch === CHAR_LF) {
				if (isTextStart(scnr)) {
					buf += ch;
					scnr.next();
				} else if (isPluralStart(scnr)) break;
				else {
					buf += ch;
					scnr.next();
				}
			} else {
				buf += ch;
				scnr.next();
			}
		}
		return buf;
	}
	function readNamedIdentifier(scnr) {
		skipSpaces(scnr);
		let ch = "";
		let name = "";
		while (ch = takeNamedIdentifierChar(scnr)) name += ch;
		const currentChar = scnr.currentChar();
		if (currentChar && currentChar !== "}" && currentChar !== EOF && currentChar !== CHAR_SP && currentChar !== CHAR_LF && currentChar !== "　") {
			const invalidPart = readInvalidIdentifier(scnr);
			emitError(CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, currentPosition(), 0, name + invalidPart);
			return name + invalidPart;
		}
		if (scnr.currentChar() === EOF) emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
		return name;
	}
	function readListIdentifier(scnr) {
		skipSpaces(scnr);
		let value = "";
		if (scnr.currentChar() === "-") {
			scnr.next();
			value += `-${getDigits(scnr)}`;
		} else value += getDigits(scnr);
		if (scnr.currentChar() === EOF) emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
		return value;
	}
	function isLiteral(ch) {
		return ch !== LITERAL_DELIMITER && ch !== CHAR_LF;
	}
	function readLiteral(scnr) {
		skipSpaces(scnr);
		eat(scnr, `\'`);
		let ch = "";
		let literal = "";
		while (ch = takeChar(scnr, isLiteral)) if (ch === "\\") literal += readEscapeSequence(scnr);
		else literal += ch;
		const current = scnr.currentChar();
		if (current === CHAR_LF || current === EOF) {
			emitError(CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, currentPosition(), 0);
			if (current === CHAR_LF) {
				scnr.next();
				eat(scnr, `\'`);
			}
			return literal;
		}
		eat(scnr, `\'`);
		return literal;
	}
	function readEscapeSequence(scnr) {
		const ch = scnr.currentChar();
		switch (ch) {
			case "\\":
			case `\'`:
				scnr.next();
				return `\\${ch}`;
			case "u": return readUnicodeEscapeSequence(scnr, ch, 4);
			case "U": return readUnicodeEscapeSequence(scnr, ch, 6);
			default:
				emitError(CompileErrorCodes.UNKNOWN_ESCAPE_SEQUENCE, currentPosition(), 0, ch);
				return "";
		}
	}
	function readUnicodeEscapeSequence(scnr, unicode, digits) {
		eat(scnr, unicode);
		let sequence = "";
		for (let i = 0; i < digits; i++) {
			const ch = takeHexDigit(scnr);
			if (!ch) {
				emitError(CompileErrorCodes.INVALID_UNICODE_ESCAPE_SEQUENCE, currentPosition(), 0, `\\${unicode}${sequence}${scnr.currentChar()}`);
				break;
			}
			sequence += ch;
		}
		return `\\${unicode}${sequence}`;
	}
	function isInvalidIdentifier(ch) {
		return ch !== "{" && ch !== "}" && ch !== CHAR_SP && ch !== CHAR_LF;
	}
	function readInvalidIdentifier(scnr) {
		skipSpaces(scnr);
		let ch = "";
		let identifiers = "";
		while (ch = takeChar(scnr, isInvalidIdentifier)) identifiers += ch;
		return identifiers;
	}
	function readLinkedModifier(scnr) {
		let ch = "";
		let name = "";
		while (ch = takeIdentifierChar(scnr)) name += ch;
		return name;
	}
	function isLinkedKeyChar(ch) {
		return !(ch === "{" || ch === "@" || ch === "|" || ch === "(" || ch === ")" || ch === CHAR_SP || ch === TAB || ch === CHAR_LF);
	}
	function readLinkedRefer(scnr) {
		while (scnr.currentChar() === TAB) scnr.next();
		let buf = "";
		let ch;
		while ((ch = scnr.currentChar()) && isLinkedKeyChar(ch)) {
			buf += ch;
			scnr.next();
		}
		return buf;
	}
	function readPlural(scnr) {
		skipSpaces(scnr);
		const plural = eat(scnr, "|");
		skipSpaces(scnr);
		return plural;
	}
	function readTokenInPlaceholder(scnr, context) {
		let token = null;
		switch (scnr.currentChar()) {
			case "{":
				if (context.braceNest >= 1) emitError(CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER, currentPosition(), 0);
				scnr.next();
				token = getToken(context, 2, "{");
				skipSpaces(scnr);
				context.braceNest++;
				return token;
			case "}":
				if (context.braceNest > 0 && context.currentType === 2) emitError(CompileErrorCodes.EMPTY_PLACEHOLDER, currentPosition(), 0);
				scnr.next();
				token = getToken(context, 3, "}");
				context.braceNest--;
				context.braceNest > 0 && skipSpaces(scnr);
				if (context.inLinked && context.braceNest === 0) context.inLinked = false;
				return token;
			case "@":
				if (context.braceNest > 0) emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
				token = readTokenInLinked(scnr, context) || getEndToken(context);
				context.braceNest = 0;
				return token;
			default: {
				let validNamedIdentifier = true;
				let validListIdentifier = true;
				let validLiteral = true;
				if (isPluralStart(scnr)) {
					if (context.braceNest > 0) emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
					token = getToken(context, 1, readPlural(scnr));
					context.braceNest = 0;
					context.inLinked = false;
					return token;
				}
				if (context.braceNest > 0 && (context.currentType === 4 || context.currentType === 5 || context.currentType === 6)) {
					emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
					context.braceNest = 0;
					return readToken(scnr, context);
				}
				if (validNamedIdentifier = isNamedIdentifierStart(scnr, context)) {
					token = getToken(context, 4, readNamedIdentifier(scnr));
					skipSpaces(scnr);
					return token;
				}
				if (validListIdentifier = isListIdentifierStart(scnr, context)) {
					token = getToken(context, 5, readListIdentifier(scnr));
					skipSpaces(scnr);
					return token;
				}
				if (validLiteral = isLiteralStart(scnr, context)) {
					token = getToken(context, 6, readLiteral(scnr));
					skipSpaces(scnr);
					return token;
				}
				if (!validNamedIdentifier && !validListIdentifier && !validLiteral) {
					token = getToken(context, 12, readInvalidIdentifier(scnr));
					emitError(CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, currentPosition(), 0, token.value);
					skipSpaces(scnr);
					return token;
				}
				break;
			}
		}
		return token;
	}
	function readTokenInLinked(scnr, context) {
		const { currentType } = context;
		let token = null;
		const ch = scnr.currentChar();
		if ((currentType === 7 || currentType === 8 || currentType === 11 || currentType === 9) && (ch === CHAR_LF || ch === CHAR_SP)) emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
		switch (ch) {
			case "@":
				scnr.next();
				token = getToken(context, 7, "@");
				context.inLinked = true;
				return token;
			case ".":
				skipSpaces(scnr);
				scnr.next();
				return getToken(context, 8, ".");
			case ":":
				skipSpaces(scnr);
				scnr.next();
				return getToken(context, 9, ":");
			default:
				if (isPluralStart(scnr)) {
					token = getToken(context, 1, readPlural(scnr));
					context.braceNest = 0;
					context.inLinked = false;
					return token;
				}
				if (isLinkedDotStart(scnr, context) || isLinkedDelimiterStart(scnr, context)) {
					skipSpaces(scnr);
					return readTokenInLinked(scnr, context);
				}
				if (isLinkedModifierStart(scnr, context)) {
					skipSpaces(scnr);
					return getToken(context, 11, readLinkedModifier(scnr));
				}
				if (isLinkedReferStart(scnr, context)) {
					skipSpaces(scnr);
					if (ch === "{") return readTokenInPlaceholder(scnr, context) || token;
					else return getToken(context, 10, readLinkedRefer(scnr));
				}
				if (currentType === 7) emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
				context.braceNest = 0;
				context.inLinked = false;
				return readToken(scnr, context);
		}
	}
	function readToken(scnr, context) {
		let token = { type: 13 };
		if (context.braceNest > 0) return readTokenInPlaceholder(scnr, context) || getEndToken(context);
		if (context.inLinked) return readTokenInLinked(scnr, context) || getEndToken(context);
		switch (scnr.currentChar()) {
			case "{": return readTokenInPlaceholder(scnr, context) || getEndToken(context);
			case "}":
				emitError(CompileErrorCodes.UNBALANCED_CLOSING_BRACE, currentPosition(), 0);
				scnr.next();
				return getToken(context, 3, "}");
			case "@": return readTokenInLinked(scnr, context) || getEndToken(context);
			default:
				if (isPluralStart(scnr)) {
					token = getToken(context, 1, readPlural(scnr));
					context.braceNest = 0;
					context.inLinked = false;
					return token;
				}
				if (isTextStart(scnr)) return getToken(context, 0, readText(scnr));
		}
		return token;
	}
	function nextToken() {
		const { currentType, offset, startLoc, endLoc } = _context;
		_context.lastType = currentType;
		_context.lastOffset = offset;
		_context.lastStartLoc = startLoc;
		_context.lastEndLoc = endLoc;
		_context.offset = currentOffset();
		_context.startLoc = currentPosition();
		if (_scnr.currentChar() === EOF) return getToken(_context, 13);
		return readToken(_scnr, _context);
	}
	return {
		nextToken,
		currentOffset,
		currentPosition,
		context
	};
}
var ERROR_DOMAIN$2 = "parser";
var KNOWN_ESCAPES = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
var TEXT_ESCAPES = /\\([\\@{}|])/g;
function fromTextEscapeSequence(_match, char) {
	return char;
}
function fromEscapeSequence(match, codePoint4, codePoint6) {
	switch (match) {
		case `\\\\`: return `\\`;
		case `\\\'`: return `\'`;
		default: {
			const codePoint = parseInt(codePoint4 || codePoint6, 16);
			if (codePoint <= 55295 || codePoint >= 57344) return String.fromCodePoint(codePoint);
			return "�";
		}
	}
}
function createParser(options = {}) {
	const location = options.location !== false;
	const { onError } = options;
	function emitError(tokenzer, code, start, offset, ...args) {
		const end = tokenzer.currentPosition();
		end.offset += offset;
		end.column += offset;
		if (onError) {
			const err = createCompileError(code, location ? createLocation(start, end) : null, {
				domain: ERROR_DOMAIN$2,
				args
			});
			onError(err);
		}
	}
	function startNode(type, offset, loc) {
		const node = { type };
		if (location) {
			node.start = offset;
			node.end = offset;
			node.loc = {
				start: loc,
				end: loc
			};
		}
		return node;
	}
	function endNode(node, offset, pos, type) {
		if (location) {
			node.end = offset;
			if (node.loc) node.loc.end = pos;
		}
	}
	function parseText(tokenizer, value) {
		const context = tokenizer.context();
		const node = startNode(3, context.offset, context.startLoc);
		node.value = value.replace(TEXT_ESCAPES, fromTextEscapeSequence);
		endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
		return node;
	}
	function parseList(tokenizer, index) {
		const { lastOffset: offset, lastStartLoc: loc } = tokenizer.context();
		const node = startNode(5, offset, loc);
		node.index = parseInt(index, 10);
		tokenizer.nextToken();
		endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
		return node;
	}
	function parseNamed(tokenizer, key) {
		const { lastOffset: offset, lastStartLoc: loc } = tokenizer.context();
		const node = startNode(4, offset, loc);
		node.key = key;
		tokenizer.nextToken();
		endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
		return node;
	}
	function parseLiteral(tokenizer, value) {
		const { lastOffset: offset, lastStartLoc: loc } = tokenizer.context();
		const node = startNode(9, offset, loc);
		node.value = value.replace(KNOWN_ESCAPES, fromEscapeSequence);
		tokenizer.nextToken();
		endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
		return node;
	}
	function parseLinkedModifier(tokenizer) {
		const token = tokenizer.nextToken();
		const context = tokenizer.context();
		const { lastOffset: offset, lastStartLoc: loc } = context;
		const node = startNode(8, offset, loc);
		if (token.type !== 11) {
			emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER, context.lastStartLoc, 0);
			node.value = "";
			endNode(node, offset, loc);
			return {
				nextConsumeToken: token,
				node
			};
		}
		if (token.value == null) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
		node.value = token.value || "";
		endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
		return { node };
	}
	function parseLinkedKey(tokenizer, value) {
		const context = tokenizer.context();
		const node = startNode(7, context.offset, context.startLoc);
		node.value = value;
		endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
		return node;
	}
	function parseLinked(tokenizer) {
		const context = tokenizer.context();
		const linkedNode = startNode(6, context.offset, context.startLoc);
		let token = tokenizer.nextToken();
		if (token.type === 8) {
			const parsed = parseLinkedModifier(tokenizer);
			linkedNode.modifier = parsed.node;
			token = parsed.nextConsumeToken || tokenizer.nextToken();
		}
		if (token.type !== 9) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
		token = tokenizer.nextToken();
		if (token.type === 2) token = tokenizer.nextToken();
		switch (token.type) {
			case 10:
				if (token.value == null) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
				linkedNode.key = parseLinkedKey(tokenizer, token.value || "");
				break;
			case 4:
				if (token.value == null) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
				linkedNode.key = parseNamed(tokenizer, token.value || "");
				break;
			case 5:
				if (token.value == null) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
				linkedNode.key = parseList(tokenizer, token.value || "");
				break;
			case 6:
				if (token.value == null) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
				linkedNode.key = parseLiteral(tokenizer, token.value || "");
				break;
			default: {
				emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY, context.lastStartLoc, 0);
				const nextContext = tokenizer.context();
				const emptyLinkedKeyNode = startNode(7, nextContext.offset, nextContext.startLoc);
				emptyLinkedKeyNode.value = "";
				endNode(emptyLinkedKeyNode, nextContext.offset, nextContext.startLoc);
				linkedNode.key = emptyLinkedKeyNode;
				endNode(linkedNode, nextContext.offset, nextContext.startLoc);
				return {
					nextConsumeToken: token,
					node: linkedNode
				};
			}
		}
		endNode(linkedNode, tokenizer.currentOffset(), tokenizer.currentPosition());
		return { node: linkedNode };
	}
	function parseMessage(tokenizer) {
		const context = tokenizer.context();
		const node = startNode(2, context.currentType === 1 ? tokenizer.currentOffset() : context.offset, context.currentType === 1 ? context.endLoc : context.startLoc);
		node.items = [];
		let nextToken = null;
		do {
			const token = nextToken || tokenizer.nextToken();
			nextToken = null;
			switch (token.type) {
				case 0:
					if (token.value == null) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
					node.items.push(parseText(tokenizer, token.value || ""));
					break;
				case 5:
					if (token.value == null) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
					node.items.push(parseList(tokenizer, token.value || ""));
					break;
				case 4:
					if (token.value == null) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
					node.items.push(parseNamed(tokenizer, token.value || ""));
					break;
				case 6:
					if (token.value == null) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
					node.items.push(parseLiteral(tokenizer, token.value || ""));
					break;
				case 7: {
					const parsed = parseLinked(tokenizer);
					node.items.push(parsed.node);
					nextToken = parsed.nextConsumeToken || null;
					break;
				}
			}
		} while (context.currentType !== 13 && context.currentType !== 1);
		endNode(node, context.currentType === 1 ? context.lastOffset : tokenizer.currentOffset(), context.currentType === 1 ? context.lastEndLoc : tokenizer.currentPosition());
		return node;
	}
	function parsePlural(tokenizer, offset, loc, msgNode) {
		const context = tokenizer.context();
		let hasEmptyMessage = msgNode.items.length === 0;
		const node = startNode(1, offset, loc);
		node.cases = [];
		node.cases.push(msgNode);
		do {
			const msg = parseMessage(tokenizer);
			if (!hasEmptyMessage) hasEmptyMessage = msg.items.length === 0;
			node.cases.push(msg);
		} while (context.currentType !== 13);
		if (hasEmptyMessage) emitError(tokenizer, CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL, loc, 0);
		endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
		return node;
	}
	function parseResource(tokenizer) {
		const context = tokenizer.context();
		const { offset, startLoc } = context;
		const msgNode = parseMessage(tokenizer);
		if (context.currentType === 13) return msgNode;
		else return parsePlural(tokenizer, offset, startLoc, msgNode);
	}
	function parse(source) {
		const tokenizer = createTokenizer(source, assign({}, options));
		const context = tokenizer.context();
		const node = startNode(0, context.offset, context.startLoc);
		if (location && node.loc) node.loc.source = source;
		node.body = parseResource(tokenizer);
		if (options.onCacheKey) node.cacheKey = options.onCacheKey(source);
		if (context.currentType !== 13) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, source[context.offset] || "");
		endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
		return node;
	}
	return { parse };
}
function getTokenCaption(token) {
	if (token.type === 13) return "EOF";
	const name = (token.value || "").replace(/\r?\n/gu, "\\n");
	return name.length > 10 ? name.slice(0, 9) + "…" : name;
}
function createTransformer(ast, options = {}) {
	const _context = {
		ast,
		helpers: /* @__PURE__ */ new Set()
	};
	const context = () => _context;
	const helper = (name) => {
		_context.helpers.add(name);
		return name;
	};
	return {
		context,
		helper
	};
}
function traverseNodes(nodes, transformer) {
	for (let i = 0; i < nodes.length; i++) traverseNode(nodes[i], transformer);
}
function traverseNode(node, transformer) {
	switch (node.type) {
		case 1:
			traverseNodes(node.cases, transformer);
			transformer.helper("plural");
			break;
		case 2:
			traverseNodes(node.items, transformer);
			break;
		case 6:
			traverseNode(node.key, transformer);
			transformer.helper("linked");
			transformer.helper("type");
			break;
		case 5:
			transformer.helper("interpolate");
			transformer.helper("list");
			break;
		case 4:
			transformer.helper("interpolate");
			transformer.helper("named");
	}
}
function transform(ast, options = {}) {
	const transformer = createTransformer(ast);
	transformer.helper("normalize");
	ast.body && traverseNode(ast.body, transformer);
	const context = transformer.context();
	ast.helpers = Array.from(context.helpers);
}
function optimize(ast) {
	const body = ast.body;
	if (body.type === 2) optimizeMessageNode(body);
	else body.cases.forEach((c) => optimizeMessageNode(c));
	return ast;
}
function optimizeMessageNode(message) {
	if (message.items.length === 1) {
		const item = message.items[0];
		if (item.type === 3 || item.type === 9) {
			message.static = item.value;
			delete item.value;
		}
	} else {
		const values = [];
		for (let i = 0; i < message.items.length; i++) {
			const item = message.items[i];
			if (!(item.type === 3 || item.type === 9)) break;
			if (item.value == null) break;
			values.push(item.value);
		}
		if (values.length === message.items.length) {
			message.static = join(values);
			for (let i = 0; i < message.items.length; i++) {
				const item = message.items[i];
				if (item.type === 3 || item.type === 9) delete item.value;
			}
		}
	}
}
function minify(node) {
	node.t = node.type;
	switch (node.type) {
		case 0: {
			const resource = node;
			minify(resource.body);
			resource.b = resource.body;
			delete resource.body;
			break;
		}
		case 1: {
			const plural = node;
			const cases = plural.cases;
			for (let i = 0; i < cases.length; i++) minify(cases[i]);
			plural.c = cases;
			delete plural.cases;
			break;
		}
		case 2: {
			const message = node;
			const items = message.items;
			for (let i = 0; i < items.length; i++) minify(items[i]);
			message.i = items;
			delete message.items;
			if (message.static) {
				message.s = message.static;
				delete message.static;
			}
			break;
		}
		case 3:
		case 9:
		case 8:
		case 7: {
			const valueNode = node;
			if (valueNode.value) {
				valueNode.v = valueNode.value;
				delete valueNode.value;
			}
			break;
		}
		case 6: {
			const linked = node;
			minify(linked.key);
			linked.k = linked.key;
			delete linked.key;
			if (linked.modifier) {
				minify(linked.modifier);
				linked.m = linked.modifier;
				delete linked.modifier;
			}
			break;
		}
		case 5: {
			const list = node;
			list.i = list.index;
			delete list.index;
			break;
		}
		case 4: {
			const named = node;
			named.k = named.key;
			delete named.key;
			break;
		}
	}
	delete node.type;
}
function createCodeGenerator(ast, options) {
	const { filename, breakLineCode, needIndent: _needIndent } = options;
	const location = options.location !== false;
	const _context = {
		filename,
		code: "",
		column: 1,
		line: 1,
		offset: 0,
		map: void 0,
		breakLineCode,
		needIndent: _needIndent,
		indentLevel: 0
	};
	if (location && ast.loc) _context.source = ast.loc.source;
	const context = () => _context;
	function push(code, node) {
		_context.code += code;
	}
	function _newline(n, withBreakLine = true) {
		const _breakLineCode = withBreakLine ? breakLineCode : "";
		push(_needIndent ? _breakLineCode + `  `.repeat(n) : _breakLineCode);
	}
	function indent(withNewLine = true) {
		const level = ++_context.indentLevel;
		withNewLine && _newline(level);
	}
	function deindent(withNewLine = true) {
		const level = --_context.indentLevel;
		withNewLine && _newline(level);
	}
	function newline() {
		_newline(_context.indentLevel);
	}
	const helper = (key) => `_${key}`;
	const needIndent = () => _context.needIndent;
	return {
		context,
		push,
		indent,
		deindent,
		newline,
		helper,
		needIndent
	};
}
function generateLinkedNode(generator, node) {
	const { helper } = generator;
	generator.push(`${helper("linked")}(`);
	generateNode(generator, node.key);
	if (node.modifier) {
		generator.push(`, `);
		generateNode(generator, node.modifier);
		generator.push(`, _type`);
	} else generator.push(`, undefined, _type`);
	generator.push(`)`);
}
function generateMessageNode(generator, node) {
	const { helper, needIndent } = generator;
	generator.push(`${helper("normalize")}([`);
	generator.indent(needIndent());
	const length = node.items.length;
	for (let i = 0; i < length; i++) {
		generateNode(generator, node.items[i]);
		if (i === length - 1) break;
		generator.push(", ");
	}
	generator.deindent(needIndent());
	generator.push("])");
}
function generatePluralNode(generator, node) {
	const { helper, needIndent } = generator;
	if (node.cases.length > 1) {
		generator.push(`${helper("plural")}([`);
		generator.indent(needIndent());
		const length = node.cases.length;
		for (let i = 0; i < length; i++) {
			generateNode(generator, node.cases[i]);
			if (i === length - 1) break;
			generator.push(", ");
		}
		generator.deindent(needIndent());
		generator.push(`])`);
	}
}
function generateResource(generator, node) {
	if (node.body) generateNode(generator, node.body);
	else generator.push("null");
}
function generateNode(generator, node) {
	const { helper } = generator;
	switch (node.type) {
		case 0:
			generateResource(generator, node);
			break;
		case 1:
			generatePluralNode(generator, node);
			break;
		case 2:
			generateMessageNode(generator, node);
			break;
		case 6:
			generateLinkedNode(generator, node);
			break;
		case 8:
			generator.push(JSON.stringify(node.value), node);
			break;
		case 7:
			generator.push(JSON.stringify(node.value), node);
			break;
		case 5:
			generator.push(`${helper("interpolate")}(${helper("list")}(${node.index}))`, node);
			break;
		case 4:
			generator.push(`${helper("interpolate")}(${helper("named")}(${JSON.stringify(node.key)}))`, node);
			break;
		case 9:
			generator.push(JSON.stringify(node.value), node);
			break;
		case 3: generator.push(JSON.stringify(node.value), node);
	}
}
var generate = (ast, options = {}) => {
	const mode = isString(options.mode) ? options.mode : "normal";
	const filename = isString(options.filename) ? options.filename : "message.intl";
	options.sourceMap;
	const breakLineCode = options.breakLineCode != null ? options.breakLineCode : mode === "arrow" ? ";" : "\n";
	const needIndent = options.needIndent ? options.needIndent : mode !== "arrow";
	const helpers = ast.helpers || [];
	const generator = createCodeGenerator(ast, {
		filename,
		breakLineCode,
		needIndent
	});
	generator.push(mode === "normal" ? `function __msg__ (ctx) {` : `(ctx) => {`);
	generator.indent(needIndent);
	if (helpers.length > 0) {
		generator.push(`const { ${join(helpers.map((s) => `${s}: _${s}`), ", ")} } = ctx`);
		generator.newline();
	}
	generator.push(`return `);
	generateNode(generator, ast);
	generator.deindent(needIndent);
	generator.push(`}`);
	delete ast.helpers;
	const { code, map } = generator.context();
	return {
		ast,
		code,
		map: map ? map.toJSON() : void 0
	};
};
function baseCompile$1(source, options = {}) {
	const assignedOptions = assign({}, options);
	const jit = !!assignedOptions.jit;
	const enalbeMinify = !!assignedOptions.minify;
	const enambeOptimize = assignedOptions.optimize == null ? true : assignedOptions.optimize;
	const ast = createParser(assignedOptions).parse(source);
	if (!jit) {
		transform(ast, assignedOptions);
		return generate(ast, assignedOptions);
	} else {
		enambeOptimize && optimize(ast);
		enalbeMinify && minify(ast);
		return {
			ast,
			code: ""
		};
	}
}
// ../../node_modules/.pnpm/@intlify+core-base@11.4.24/node_modules/@intlify/core-base/dist/core-base.mjs
/*!
* core-base v11.4.24
* (c) 2026 kazuya kawaguchi
* Released under the MIT License.
*/
function isMessageAST(val) {
	return isObject$2(val) && resolveType(val) === 0 && (hasOwn(val, "b") || hasOwn(val, "body"));
}
var PROPS_BODY = ["b", "body"];
function resolveBody(node) {
	return resolveProps(node, PROPS_BODY);
}
var PROPS_CASES = ["c", "cases"];
function resolveCases(node) {
	return resolveProps(node, PROPS_CASES, []);
}
var PROPS_STATIC = ["s", "static"];
function resolveStatic(node) {
	return resolveProps(node, PROPS_STATIC);
}
var PROPS_ITEMS = ["i", "items"];
function resolveItems(node) {
	return resolveProps(node, PROPS_ITEMS, []);
}
var PROPS_TYPE = ["t", "type"];
function resolveType(node) {
	return resolveProps(node, PROPS_TYPE);
}
var PROPS_VALUE = ["v", "value"];
function resolveValue$1(node, type) {
	const resolved = resolveProps(node, PROPS_VALUE);
	if (resolved != null) return resolved;
	else throw createUnhandleNodeError(type);
}
var PROPS_MODIFIER = ["m", "modifier"];
function resolveLinkedModifier(node) {
	return resolveProps(node, PROPS_MODIFIER);
}
var PROPS_KEY = ["k", "key"];
function resolveLinkedKey(node) {
	const resolved = resolveProps(node, PROPS_KEY);
	if (resolved) return resolved;
	else throw createUnhandleNodeError(6);
}
function resolveProps(node, props, defaultValue) {
	for (let i = 0; i < props.length; i++) {
		const prop = props[i];
		if (hasOwn(node, prop) && node[prop] != null) return node[prop];
	}
	return defaultValue;
}
var AST_NODE_PROPS_KEYS = [
	...PROPS_BODY,
	...PROPS_CASES,
	...PROPS_STATIC,
	...PROPS_ITEMS,
	...PROPS_KEY,
	...PROPS_MODIFIER,
	...PROPS_VALUE,
	...PROPS_TYPE
];
function createUnhandleNodeError(type) {
	return /* @__PURE__ */ new Error(`unhandled node type: ${type}`);
}
function format(ast) {
	const msg = (ctx) => formatParts(ctx, ast);
	return msg;
}
function formatParts(ctx, ast) {
	const body = resolveBody(ast);
	if (body == null) throw createUnhandleNodeError(0);
	if (resolveType(body) === 1) {
		const cases = resolveCases(body);
		return ctx.plural(cases.reduce((messages, c) => [...messages, formatMessageParts(ctx, c)], []));
	} else return formatMessageParts(ctx, body);
}
function formatMessageParts(ctx, node) {
	const static_ = resolveStatic(node);
	if (static_ != null) return ctx.type === "text" ? static_ : ctx.normalize([static_]);
	else {
		const messages = resolveItems(node).reduce((acm, c) => [...acm, formatMessagePart(ctx, c)], []);
		return ctx.normalize(messages);
	}
}
function formatMessagePart(ctx, node) {
	const type = resolveType(node);
	switch (type) {
		case 3: return resolveValue$1(node, type);
		case 9: return resolveValue$1(node, type);
		case 4: {
			const named = node;
			if (hasOwn(named, "k") && named.k) return ctx.interpolate(ctx.named(named.k));
			if (hasOwn(named, "key") && named.key) return ctx.interpolate(ctx.named(named.key));
			throw createUnhandleNodeError(type);
		}
		case 5: {
			const list = node;
			if (hasOwn(list, "i") && isNumber(list.i)) return ctx.interpolate(ctx.list(list.i));
			if (hasOwn(list, "index") && isNumber(list.index)) return ctx.interpolate(ctx.list(list.index));
			throw createUnhandleNodeError(type);
		}
		case 6: {
			const linked = node;
			const modifier = resolveLinkedModifier(linked);
			const key = resolveLinkedKey(linked);
			return ctx.linked(formatMessagePart(ctx, key), modifier ? formatMessagePart(ctx, modifier) : void 0, ctx.type);
		}
		case 7: return resolveValue$1(node, type);
		case 8: return resolveValue$1(node, type);
		default: throw new Error(`unhandled node on format message part: ${type}`);
	}
}
var defaultOnCacheKey = (message) => message;
var compileCache = create();
function baseCompile(message, options = {}) {
	let detectError = false;
	const onError = options.onError || defaultOnError;
	options.onError = (err) => {
		detectError = true;
		onError(err);
	};
	return {
		...baseCompile$1(message, options),
		detectError
	};
}
/* #__NO_SIDE_EFFECTS__ */
function compile(message, context) {
	if (isString(message)) {
		isBoolean(context.warnHtmlMessage) && context.warnHtmlMessage;
		const cacheKey = (context.onCacheKey || defaultOnCacheKey)(message);
		const cached = compileCache[cacheKey];
		if (cached) return cached;
		const { ast, detectError } = baseCompile(message, {
			...context,
			location: false,
			jit: true
		});
		const msg = format(ast);
		return !detectError ? compileCache[cacheKey] = msg : msg;
	} else {
		if (!isMessageAST(message)) return (() => message);
		const cacheKey = message.cacheKey;
		if (cacheKey) {
			const cached = compileCache[cacheKey];
			if (cached) return cached;
			return compileCache[cacheKey] = format(message);
		} else return format(message);
	}
}
var CoreErrorCodes = {
	INVALID_ARGUMENT: 17,
	INVALID_DATE_ARGUMENT: 18,
	INVALID_ISO_DATE_ARGUMENT: 19,
	NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
	NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
	NOT_SUPPORT_LOCALE_TYPE: 23
};
function createCoreError(code) {
	return createCompileError(code, null, void 0);
}
/** @internal */
function getLocale(context, options) {
	return options.locale != null ? resolveLocale(options.locale) : resolveLocale(context.locale);
}
var _resolveLocale;
/** @internal */
function resolveLocale(locale) {
	if (isString(locale)) return locale;
	else if (isFunction(locale)) {
		if (locale.resolvedOnce && _resolveLocale != null) return _resolveLocale;
		else if (locale.constructor.name === "Function") {
			const resolve = locale();
			if (isPromise(resolve)) throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
			return _resolveLocale = resolve;
		} else throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
	} else throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_TYPE);
}
/**
* Fallback with simple implemenation
*
* @remarks
* A fallback locale function implemented with a simple fallback algorithm.
*
* Basically, the chain consists of `start` plus the specified fallback: for a string or array `fallbackLocale`, the value as specified in the props is used; for a map `fallbackLocale`, the map's **keys** are used and the `default` key is skipped since it is not a locale name.
*
* @param ctx - A context
* @param fallback - A {@link FallbackLocale | fallback locale}
* @param start - A starting {@link Locale | locale}
*
* @returns Fallback locales
*
* @VueI18nGeneral
*/
function fallbackWithSimple(ctx, fallback, start) {
	return [.../* @__PURE__ */ new Set([start, ...isArray(fallback) ? fallback : isObject$2(fallback) ? Object.keys(fallback).filter((locale) => locale !== "default") : isString(fallback) ? [fallback] : [start]])];
}
/**
* Fallback with locale chain
*
* @remarks
* A fallback locale function implemented with a fallback chain algorithm. It's used in VueI18n as default.
*
* Chains are cached per fallback identity. If you mutate an object or array fallback in place,
* pass a new object or array instead so that the chain is recomputed.
*
* @param ctx - A context
* @param fallback - A {@link FallbackLocale | fallback locale}
* @param start - A starting {@link Locale | locale}
*
* @returns Fallback locales
*
* @VueI18nSee [Fallbacking](../guide/essentials/fallback)
*
* @VueI18nGeneral
*/
function fallbackWithLocaleChain(ctx, fallback, start) {
	const startLocale = isString(start) ? start : DEFAULT_LOCALE$1;
	const context = ctx;
	let chains;
	if (isObject$2(fallback)) {
		if (!context.__localeChainObjectCache) context.__localeChainObjectCache = /* @__PURE__ */ new WeakMap();
		chains = context.__localeChainObjectCache.get(fallback);
		if (!chains) {
			chains = /* @__PURE__ */ new Map();
			context.__localeChainObjectCache.set(fallback, chains);
		}
	} else {
		if (!context.__localeChainCache) context.__localeChainCache = /* @__PURE__ */ new Map();
		chains = context.__localeChainCache.get(fallback);
		if (!chains) {
			chains = /* @__PURE__ */ new Map();
			context.__localeChainCache.set(fallback, chains);
		}
	}
	const cached = chains.get(startLocale);
	if (cached) return cached;
	const chain = [];
	let block = [start];
	while (isArray(block)) block = appendBlockToChain(chain, block, fallback);
	const defaults = isArray(fallback) || !isPlainObject$1(fallback) ? fallback : fallback["default"] ? fallback["default"] : null;
	block = isString(defaults) ? [defaults] : defaults;
	if (isArray(block)) appendBlockToChain(chain, block, false);
	chains.set(startLocale, chain);
	return chain;
}
function appendBlockToChain(chain, block, blocks) {
	let follow = true;
	for (let i = 0; i < block.length && isBoolean(follow); i++) {
		const locale = block[i];
		if (isString(locale)) follow = appendLocaleToChain(chain, block[i], blocks);
	}
	return follow;
}
function appendLocaleToChain(chain, locale, blocks) {
	let follow;
	const tokens = locale.split("-");
	do {
		follow = appendItemToChain(chain, tokens.join("-"), blocks);
		tokens.splice(-1, 1);
	} while (tokens.length && follow === true);
	return follow;
}
function appendItemToChain(chain, target, blocks) {
	let follow = false;
	if (!chain.includes(target)) {
		follow = true;
		if (target) {
			follow = target[target.length - 1] !== "!";
			const locale = target.replace(/!/g, "");
			chain.push(locale);
			if ((isArray(blocks) || isPlainObject$1(blocks)) && blocks[locale]) follow = blocks[locale];
		}
	}
	return follow;
}
var pathStateMachine = [];
pathStateMachine[0] = {
	["w"]: [0],
	["i"]: [3, 0],
	["["]: [4],
	["o"]: [7]
};
pathStateMachine[1] = {
	["w"]: [1],
	["."]: [2],
	["["]: [4],
	["o"]: [7]
};
pathStateMachine[2] = {
	["w"]: [2],
	["i"]: [3, 0],
	["0"]: [3, 0]
};
pathStateMachine[3] = {
	["i"]: [3, 0],
	["0"]: [3, 0],
	["w"]: [1, 1],
	["."]: [2, 1],
	["["]: [4, 1],
	["o"]: [7, 1]
};
pathStateMachine[4] = {
	["'"]: [5, 0],
	["\""]: [6, 0],
	["["]: [4, 2],
	["]"]: [1, 3],
	["o"]: 8,
	["l"]: [4, 0]
};
pathStateMachine[5] = {
	["'"]: [4, 0],
	["o"]: 8,
	["l"]: [5, 0]
};
pathStateMachine[6] = {
	["\""]: [4, 0],
	["o"]: 8,
	["l"]: [6, 0]
};
/**
* Check if an expression is a literal value.
*/
var literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
	return literalValueRE.test(exp);
}
/**
* Strip quotes from a string
*/
function stripQuotes(str) {
	const a = str.charCodeAt(0);
	return a === str.charCodeAt(str.length - 1) && (a === 34 || a === 39) ? str.slice(1, -1) : str;
}
/**
* Determine the type of a character in a keypath.
*/
function getPathCharType(ch) {
	if (ch === void 0 || ch === null) return "o";
	switch (ch.charCodeAt(0)) {
		case 91:
		case 93:
		case 46:
		case 34:
		case 39: return ch;
		case 95:
		case 36:
		case 45: return "i";
		case 9:
		case 10:
		case 13:
		case 160:
		case 65279:
		case 8232:
		case 8233: return "w";
	}
	return "i";
}
/**
* Format a subPath, return its plain form if it is
* a literal string or number. Otherwise prepend the
* dynamic indicator (*).
*/
function formatSubPath(path) {
	const trimmed = path.trim();
	if (path.charAt(0) === "0" && isNaN(parseInt(path))) return false;
	return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
}
/**
* Parse a string path into an array of segments
*/
function parse(path) {
	const keys = [];
	let index = -1;
	let mode = 0;
	let subPathDepth = 0;
	let c;
	let key;
	let newChar;
	let type;
	let transition;
	let action;
	let typeMap;
	const actions = [];
	actions[0] = () => {
		if (key === void 0) key = newChar;
		else key += newChar;
	};
	actions[1] = () => {
		if (key !== void 0) {
			keys.push(key);
			key = void 0;
		}
	};
	actions[2] = () => {
		actions[0]();
		subPathDepth++;
	};
	actions[3] = () => {
		if (subPathDepth > 0) {
			subPathDepth--;
			mode = 4;
			actions[0]();
		} else {
			subPathDepth = 0;
			if (key === void 0) return false;
			key = formatSubPath(key);
			if (key === false) return false;
			else actions[1]();
		}
	};
	function maybeUnescapeQuote() {
		const nextChar = path[index + 1];
		if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === "\"") {
			index++;
			newChar = "\\" + nextChar;
			actions[0]();
			return true;
		}
	}
	while (mode !== null) {
		index++;
		c = path[index];
		if (c === "\\" && maybeUnescapeQuote()) continue;
		type = getPathCharType(c);
		typeMap = pathStateMachine[mode];
		transition = typeMap[type] || typeMap["l"] || 8;
		if (transition === 8) return;
		mode = transition[0];
		if (transition[1] !== void 0) {
			action = actions[transition[1]];
			if (action) {
				newChar = c;
				if (action() === false) return;
			}
		}
		if (mode === 7) return keys;
	}
}
var cache = /* @__PURE__ */ new Map();
/**
* key-value message resolver
*
* @remarks
* Resolves messages with the key-value structure. Note that messages with a hierarchical structure such as objects cannot be resolved
*
* @param obj - A target object to be resolved with path
* @param path - A {@link Path | path} to resolve the value of message
*
* @returns A resolved {@link PathValue | path value}
*
* @VueI18nGeneral
*/
function resolveWithKeyValue(obj, path) {
	return isObject$2(obj) ? getOwn(obj, path) : null;
}
/**
* message resolver
*
* @remarks
* Resolves messages. messages with a hierarchical structure such as objects can be resolved. This resolver is used in VueI18n as default.
*
* @param obj - A target object to be resolved with path
* @param path - A {@link Path | path} to resolve the value of message
*
* @returns A resolved {@link PathValue | path value}
*
* @VueI18nGeneral
*/
function resolveValue(obj, path) {
	if (!isObject$2(obj)) return null;
	let hit = cache.get(path);
	if (!hit) {
		hit = parse(path);
		if (hit) cache.set(path, hit);
	}
	if (!hit) return null;
	const len = hit.length;
	let last = obj;
	let i = 0;
	while (i < len) {
		const key = hit[i];
		/**
		* NOTE:
		* if `key` is intlify message format AST node key and `last` is intlify message format AST, skip it.
		* because the AST node is not a key-value structure.
		*/
		if (AST_NODE_PROPS_KEYS.includes(key) && isMessageAST(last)) return null;
		if (!isObject$2(last)) return null;
		const val = getOwn(last, key);
		if (val === void 0) return null;
		if (isFunction(last)) return null;
		last = val;
		i++;
	}
	return last;
}
/**
* Intlify core-base version
* @internal
*/
var VERSION$1 = "11.4.24";
var DEFAULT_LOCALE$1 = "en-US";
var capitalize = (str) => `${str.charAt(0).toLocaleUpperCase()}${str.substr(1)}`;
function getDefaultLinkedModifiers() {
	return {
		upper: (val, type) => {
			return type === "text" && isString(val) ? val.toUpperCase() : type === "vnode" && isObject$2(val) && "__v_isVNode" in val ? val.children.toUpperCase() : val;
		},
		lower: (val, type) => {
			return type === "text" && isString(val) ? val.toLowerCase() : type === "vnode" && isObject$2(val) && "__v_isVNode" in val ? val.children.toLowerCase() : val;
		},
		capitalize: (val, type) => {
			return type === "text" && isString(val) ? capitalize(val) : type === "vnode" && isObject$2(val) && "__v_isVNode" in val ? capitalize(val.children) : val;
		}
	};
}
var _compiler;
function registerMessageCompiler(compiler) {
	_compiler = compiler;
}
var _resolver;
/**
* Register the message resolver
*
* @param resolver - A {@link MessageResolver} function
*
* @VueI18nGeneral
*/
function registerMessageResolver(resolver) {
	_resolver = resolver;
}
var _fallbacker;
/**
* Register the locale fallbacker
*
* @param fallbacker - A {@link LocaleFallbacker} function
*
* @VueI18nGeneral
*/
function registerLocaleFallbacker(fallbacker) {
	_fallbacker = fallbacker;
}
var _fallbackContext = null;
var setFallbackContext = (context) => {
	_fallbackContext = context;
};
var getFallbackContext = () => _fallbackContext;
var _cid = 0;
function createCoreContext(options = {}) {
	const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
	const version = isString(options.version) ? options.version : VERSION$1;
	const locale = isString(options.locale) || isFunction(options.locale) ? options.locale : DEFAULT_LOCALE$1;
	const _locale = isFunction(locale) ? DEFAULT_LOCALE$1 : locale;
	const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject$1(options.fallbackLocale) || isString(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale;
	const messages = isPlainObject$1(options.messages) ? options.messages : createResources(_locale);
	const datetimeFormats = isPlainObject$1(options.datetimeFormats) ? options.datetimeFormats : createResources(_locale);
	const numberFormats = isPlainObject$1(options.numberFormats) ? options.numberFormats : createResources(_locale);
	const modifiers = assign(create(), options.modifiers, getDefaultLinkedModifiers());
	const pluralRules = options.pluralRules || create();
	const missing = isFunction(options.missing) ? options.missing : null;
	const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
	const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
	const fallbackFormat = !!options.fallbackFormat;
	const unresolving = !!options.unresolving;
	const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
	const processor = isPlainObject$1(options.processor) ? options.processor : null;
	const warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
	const escapeParameter = !!options.escapeParameter;
	const messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
	const messageResolver = isFunction(options.messageResolver) ? options.messageResolver : _resolver || resolveWithKeyValue;
	const localeFallbacker = isFunction(options.localeFallbacker) ? options.localeFallbacker : _fallbacker || fallbackWithSimple;
	const fallbackContext = isObject$2(options.fallbackContext) ? options.fallbackContext : void 0;
	const internalOptions = options;
	const __datetimeFormatters = isObject$2(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
	const __numberFormatters = isObject$2(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
	const __meta = isObject$2(internalOptions.__meta) ? internalOptions.__meta : {};
	_cid++;
	const context = {
		version,
		cid: _cid,
		locale,
		fallbackLocale,
		messages,
		modifiers,
		pluralRules,
		missing,
		missingWarn,
		fallbackWarn,
		fallbackFormat,
		unresolving,
		postTranslation,
		processor,
		warnHtmlMessage,
		escapeParameter,
		messageCompiler,
		messageResolver,
		localeFallbacker,
		fallbackContext,
		onWarn,
		__meta
	};
	context.datetimeFormats = datetimeFormats;
	context.numberFormats = numberFormats;
	context.__datetimeFormatters = __datetimeFormatters;
	context.__numberFormatters = __numberFormatters;
	return context;
}
var createResources = (locale) => ({ [locale]: create() });
/** @internal */
function handleMissing(context, key, locale, missingWarn, type) {
	const { missing, onWarn } = context;
	if (missing !== null) {
		const ret = missing(context, locale, key, type);
		return isString(ret) ? ret : key;
	} else return key;
}
function invalidateLocaleChainCache(ctx, fallback) {
	const context = ctx;
	if (isObject$2(fallback)) context.__localeChainObjectCache?.delete(fallback);
	else context.__localeChainCache?.delete(fallback);
}
/** @internal */
function updateFallbackLocale(ctx, locale, fallback) {
	invalidateLocaleChainCache(ctx, fallback);
	if (ctx.fallbackContext) invalidateLocaleChainCache(ctx.fallbackContext, fallback);
	ctx.localeFallbacker(ctx, fallback, locale);
}
/** @internal */
function isAlmostSameLocale(locale, compareLocale) {
	if (locale === compareLocale) return false;
	return locale.split("-")[0] === compareLocale.split("-")[0];
}
/** @internal */
function isImplicitFallback(targetLocale, locales) {
	const index = locales.indexOf(targetLocale);
	if (index === -1) return false;
	for (let i = index + 1; i < locales.length; i++) if (isAlmostSameLocale(targetLocale, locales[i])) return true;
	return false;
}
function resolveFormatLocale(context, key, locale, formats, missingWarn, fallbackWarn, type) {
	const { fallbackLocale, localeFallbacker, onWarn } = context;
	const locales = localeFallbacker(context, fallbackLocale, locale);
	for (let i = 0; i < locales.length; i++) {
		const targetLocale = locales[i];
		const format = getOwn(getOwn(formats, targetLocale) || {}, key);
		if (isPlainObject$1(format) && isString(targetLocale)) return targetLocale;
		handleMissing(context, key, targetLocale, missingWarn, type);
	}
	return null;
}
function getFormatterCacheKey(locale, key, overrides) {
	let id = `${locale}__${key}`;
	if (isPlainObject$1(overrides) && !isEmptyObject(overrides)) id = `${id}__${JSON.stringify(overrides)}`;
	return id;
}
function clearFormatCache(formatters, locale, format) {
	for (const key in format) {
		const prefix = `${locale}__${key}`;
		for (const id of formatters.keys()) if (id === prefix || id.startsWith(`${prefix}__`)) formatters.delete(id);
	}
}
function parseFormatArgs(args, options, initialOverrides, optionsKeys) {
	const [, arg2, arg3, arg4] = args;
	let overrides = initialOverrides;
	if (isString(arg2)) options.key = arg2;
	else if (isPlainObject$1(arg2)) Object.keys(arg2).forEach((key) => {
		if (optionsKeys.includes(key)) overrides[key] = arg2[key];
		else options[key] = arg2[key];
	});
	if (isString(arg3)) options.locale = arg3;
	else if (isPlainObject$1(arg3)) overrides = arg3;
	if (isPlainObject$1(arg4)) overrides = arg4;
	return overrides;
}
function datetime(context, ...args) {
	const { datetimeFormats, unresolving, onWarn } = context;
	const { __datetimeFormatters } = context;
	if (!isString(args[0]) && !isDate(args[0]) && !isNumber(args[0])) return "";
	const [key, value, options, overrides] = parseDateTimeArgs(...args);
	const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
	const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
	const part = !!options.part;
	const locale = getLocale(context, options);
	if (!isString(key) || key === "") {
		const formatter = new Intl.DateTimeFormat(locale.replace(/!/g, ""), overrides);
		return !part ? formatter.format(value) : formatter.formatToParts(value);
	}
	const targetLocale = resolveFormatLocale(context, key, locale, datetimeFormats, missingWarn, fallbackWarn, "datetime format");
	if (!isString(targetLocale)) return unresolving ? -1 : key;
	const format = datetimeFormats[targetLocale][key];
	const id = getFormatterCacheKey(targetLocale, key, overrides);
	let formatter = __datetimeFormatters.get(id);
	if (!formatter) {
		formatter = new Intl.DateTimeFormat(targetLocale, assign({}, format, overrides));
		__datetimeFormatters.set(id, formatter);
	}
	return !part ? formatter.format(value) : formatter.formatToParts(value);
}
/** @internal */
var DATETIME_FORMAT_OPTIONS_KEYS = [
	"localeMatcher",
	"weekday",
	"era",
	"year",
	"month",
	"day",
	"hour",
	"minute",
	"second",
	"timeZoneName",
	"formatMatcher",
	"hour12",
	"timeZone",
	"dateStyle",
	"timeStyle",
	"calendar",
	"dayPeriod",
	"numberingSystem",
	"hourCycle",
	"fractionalSecondDigits"
];
/** @internal */
function parseDateTimeArgs(...args) {
	const [arg1] = args;
	const options = create();
	const initialOverrides = create();
	let value;
	if (isString(arg1)) {
		const matches = arg1.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
		if (!matches) throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
		const dateTime = matches[3] ? matches[3].trim().startsWith("T") ? `${matches[1].trim()}${matches[3].trim()}` : `${matches[1].trim()}T${matches[3].trim()}` : matches[1].trim();
		value = new Date(dateTime);
		try {
			value.toISOString();
		} catch {
			throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
		}
	} else if (isDate(arg1)) {
		if (isNaN(arg1.getTime())) throw createCoreError(CoreErrorCodes.INVALID_DATE_ARGUMENT);
		value = arg1;
	} else if (isNumber(arg1)) value = arg1;
	else throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
	const overrides = parseFormatArgs(args, options, initialOverrides, DATETIME_FORMAT_OPTIONS_KEYS);
	return [
		options.key || "",
		value,
		options,
		overrides
	];
}
/** @internal */
function clearDateTimeFormat(ctx, locale, format) {
	clearFormatCache(ctx.__datetimeFormatters, locale, format);
}
function number(context, ...args) {
	const { numberFormats, unresolving, onWarn } = context;
	const { __numberFormatters } = context;
	if (!isNumber(args[0])) return "";
	const [key, value, options, overrides] = parseNumberArgs(...args);
	const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
	const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
	const part = !!options.part;
	const locale = getLocale(context, options);
	if (!isString(key) || key === "") {
		const formatter = new Intl.NumberFormat(locale.replace(/!/g, ""), overrides);
		return !part ? formatter.format(value) : formatter.formatToParts(value);
	}
	const targetLocale = resolveFormatLocale(context, key, locale, numberFormats, missingWarn, fallbackWarn, "number format");
	if (!isString(targetLocale)) return unresolving ? -1 : key;
	const format = numberFormats[targetLocale][key];
	const id = getFormatterCacheKey(targetLocale, key, overrides);
	let formatter = __numberFormatters.get(id);
	if (!formatter) {
		formatter = new Intl.NumberFormat(targetLocale, assign({}, format, overrides));
		__numberFormatters.set(id, formatter);
	}
	return !part ? formatter.format(value) : formatter.formatToParts(value);
}
/** @internal */
var NUMBER_FORMAT_OPTIONS_KEYS = [
	"localeMatcher",
	"style",
	"currency",
	"currencyDisplay",
	"currencySign",
	"useGrouping",
	"minimumIntegerDigits",
	"minimumFractionDigits",
	"maximumFractionDigits",
	"minimumSignificantDigits",
	"maximumSignificantDigits",
	"compactDisplay",
	"notation",
	"signDisplay",
	"unit",
	"unitDisplay",
	"roundingMode",
	"roundingPriority",
	"roundingIncrement",
	"trailingZeroDisplay"
];
/** @internal */
function parseNumberArgs(...args) {
	const [arg1] = args;
	const options = create();
	const initialOverrides = create();
	if (!isNumber(arg1)) throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
	const value = arg1;
	const overrides = parseFormatArgs(args, options, initialOverrides, NUMBER_FORMAT_OPTIONS_KEYS);
	return [
		options.key || "",
		value,
		options,
		overrides
	];
}
/** @internal */
function clearNumberFormat(ctx, locale, format) {
	clearFormatCache(ctx.__numberFormatters, locale, format);
}
var DEFAULT_MODIFIER = (str) => str;
var DEFAULT_MESSAGE = (ctx) => "";
var DEFAULT_MESSAGE_DATA_TYPE = "text";
var DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : join(values);
var DEFAULT_INTERPOLATE = toDisplayString$1;
function pluralDefault(choice, choicesLength) {
	choice = Math.abs(choice);
	if (choicesLength === 2) return choice === 1 ? 0 : 1;
	return Math.min(choice, 2);
}
function getPluralIndex(options) {
	const index = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
	return isNumber(options.named?.count) ? options.named.count : isNumber(options.named?.n) ? options.named.n : index;
}
function createMessageContext(options = {}) {
	const locale = options.locale;
	const pluralIndex = getPluralIndex(options);
	const pluralRule = isString(locale) && options.pluralRules && isFunction(getOwn(options.pluralRules, locale)) ? options.pluralRules[locale] : pluralDefault;
	const orgPluralRule = pluralRule === pluralDefault ? void 0 : pluralDefault;
	const plural = (messages) => messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
	const _list = options.list || [];
	const list = (index) => _list[index];
	const _named = options.named || create();
	const hasPluralIndex = isNumber(options.pluralIndex);
	const named = (key) => {
		const value = isObjectPrototypeKey(key) ? getOwn(_named, key) : _named[key];
		return hasPluralIndex && !value && (key === "count" || key === "n") ? options.pluralIndex : value;
	};
	function message(key, useLinked) {
		const msg = isFunction(options.messages) ? options.messages(key, !!useLinked) : isObject$2(options.messages) ? options.messages[key] : false;
		return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
	}
	const _modifier = (name) => options.modifiers ? getOwn(options.modifiers, name) : DEFAULT_MODIFIER;
	const normalize = isFunction(options.processor?.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
	const interpolate = isFunction(options.processor?.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
	const type = isString(options.processor?.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
	const linked = (key, ...args) => {
		const [arg1, arg2] = args;
		let type = "text";
		let modifier = "";
		if (args.length === 1) {
			if (isObject$2(arg1)) {
				modifier = arg1.modifier || modifier;
				type = arg1.type || type;
			} else if (isString(arg1)) modifier = arg1 || modifier;
		} else if (args.length === 2) {
			if (isString(arg1)) modifier = arg1 || modifier;
			if (isString(arg2)) type = arg2 || type;
		}
		const ret = message(key, true)(ctx);
		const resolved = ret === "" || ret === void 0 ? key : ret;
		const msg = type === "vnode" && isArray(resolved) && modifier ? resolved[0] : resolved;
		if (!modifier) return msg;
		const modify = _modifier(modifier);
		if (isFunction(modify)) return modify(msg, type);
		return msg;
	};
	const ctx = {
		["list"]: list,
		["named"]: named,
		["plural"]: plural,
		["linked"]: linked,
		["message"]: message,
		["type"]: type,
		["interpolate"]: interpolate,
		["normalize"]: normalize,
		["values"]: assign(create(), _list, _named, hasPluralIndex ? {
			count: named("count"),
			n: named("n")
		} : {})
	};
	return ctx;
}
var NOOP_MESSAGE_FUNCTION = () => "";
var isMessageFunction = (val) => isFunction(val);
/** @internal */
var isMessageFormat = (val) => isString(val) || isMessageAST(val) || isMessageFunction(val);
function translate(context, ...args) {
	const { fallbackFormat, postTranslation, unresolving, messageCompiler, fallbackLocale, messages } = context;
	const [key, options] = parseTranslateArgs(...args);
	const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
	const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
	const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
	const resolvedMessage = !!options.resolvedMessage;
	const defaultMsgOrKey = isString(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : !messageCompiler ? () => key : key : fallbackFormat ? !messageCompiler ? () => key : key : null;
	const enableDefaultMsg = fallbackFormat || defaultMsgOrKey != null && (isString(defaultMsgOrKey) || isFunction(defaultMsgOrKey));
	const locale = getLocale(context, options);
	escapeParameter && escapeParams(options);
	let [formatScope, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
		key,
		locale,
		getOwn(messages, locale) || create()
	];
	let format = formatScope;
	let cacheBaseKey = key;
	if (!resolvedMessage && !isMessageFormat(format)) {
		if (enableDefaultMsg) {
			format = defaultMsgOrKey;
			cacheBaseKey = format;
		}
	}
	if (!resolvedMessage && (!isMessageFormat(format) || !isString(targetLocale))) return unresolving ? -1 : key;
	let occurred = false;
	const onError = () => {
		occurred = true;
	};
	const msg = !isMessageFunction(format) ? compileMessageFormat(context, key, targetLocale, format, cacheBaseKey, onError) : format;
	if (occurred) return format;
	const messaged = evaluateMessage(context, msg, createMessageContext(getMessageContextOptions(context, targetLocale, message, options, escapeParameter)));
	let ret = postTranslation ? postTranslation(messaged, key) : messaged;
	if (escapeParameter && isString(ret)) ret = sanitizeTranslatedHtml(ret);
	return ret;
}
function escapeParams(options) {
	if (isArray(options.list)) options.list = options.list.map((item) => isString(item) ? escapeHtml$1(item) : item);
	if (isObject$2(options.named)) {
		const source = options.named;
		const named = create();
		for (const key of Object.keys(source)) {
			const value = source[key];
			named[key] = isString(value) ? escapeHtml$1(value) : value;
		}
		options.named = named;
	}
}
function interpolateEscaped(value) {
	return isString(value) ? value : escapeHtml$1(toDisplayString$1(value));
}
function resolveProcessor(processor, escapeParameter) {
	if (!escapeParameter || isFunction(processor?.interpolate)) return processor;
	return assign({}, processor, { interpolate: interpolateEscaped });
}
function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
	const { messages, onWarn, messageResolver: resolveValue, localeFallbacker } = context;
	const locales = localeFallbacker(context, fallbackLocale, locale);
	let message = create();
	let targetLocale;
	let format = null;
	const type = "translate";
	for (let i = 0; i < locales.length; i++) {
		targetLocale = locales[i];
		message = getOwn(messages, targetLocale) || create();
		if ((format = resolveValue(message, key)) === null) format = getOwn(message, key);
		if (isMessageFormat(format)) break;
		if (!isImplicitFallback(targetLocale, locales)) {
			const missingRet = handleMissing(context, key, targetLocale, missingWarn, type);
			if (missingRet !== key) format = missingRet;
		}
	}
	return [
		format,
		targetLocale,
		message
	];
}
function compileMessageFormat(context, key, targetLocale, format, cacheBaseKey, onError) {
	const { messageCompiler, warnHtmlMessage } = context;
	if (isMessageFunction(format)) {
		const msg = format;
		msg.locale = msg.locale || targetLocale;
		msg.key = msg.key || key;
		return msg;
	}
	if (messageCompiler == null) {
		const msg = (() => format);
		msg.locale = targetLocale;
		msg.key = key;
		return msg;
	}
	const msg = messageCompiler(format, getCompileContext(context, targetLocale, cacheBaseKey, format, warnHtmlMessage, onError));
	msg.locale = targetLocale;
	msg.key = key;
	msg.source = format;
	return msg;
}
function evaluateMessage(context, msg, msgCtx) {
	return msg(msgCtx);
}
/** @internal */
function parseTranslateArgs(...args) {
	const [arg1, arg2, arg3] = args;
	const options = create();
	if (!isString(arg1) && !isNumber(arg1) && !isMessageFunction(arg1) && !isMessageAST(arg1)) throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
	const key = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
	if (isNumber(arg2)) options.plural = arg2;
	else if (isString(arg2)) options.default = arg2;
	else if (isPlainObject$1(arg2) && !isEmptyObject(arg2)) options.named = arg2;
	else if (isArray(arg2)) options.list = arg2;
	if (isNumber(arg3)) options.plural = arg3;
	else if (isString(arg3)) options.default = arg3;
	else if (isPlainObject$1(arg3)) assign(options, arg3);
	return [key, options];
}
function getCompileContext(context, locale, key, source, warnHtmlMessage, onError) {
	return {
		locale,
		key,
		warnHtmlMessage,
		onError: (err) => {
			onError && onError(err);
			throw err;
		},
		onCacheKey: (source) => generateFormatCacheKey(locale, key, source)
	};
}
function getMessageContextOptions(context, locale, message, options, escapeParameter) {
	const { modifiers, pluralRules, messageResolver: resolveValue, fallbackLocale, fallbackWarn, missingWarn, fallbackContext } = context;
	const resolveMessage = (key, useLinked) => {
		let val = resolveValue(message, key);
		if (val == null && (fallbackContext || useLinked)) {
			const [format, , message] = resolveMessageFormat(fallbackContext || context, key, locale, fallbackLocale, fallbackWarn, missingWarn);
			val = format ?? resolveValue(message, key);
		}
		if (isString(val) || isMessageAST(val)) {
			let occurred = false;
			const onError = () => {
				occurred = true;
			};
			const msg = compileMessageFormat(context, key, locale, val, key, onError);
			return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
		} else if (isMessageFunction(val)) return val;
		else return NOOP_MESSAGE_FUNCTION;
	};
	const ctxOptions = {
		locale,
		modifiers,
		pluralRules,
		messages: resolveMessage
	};
	const processor = resolveProcessor(context.processor, escapeParameter);
	if (processor) ctxOptions.processor = processor;
	if (options.list) ctxOptions.list = options.list;
	if (options.named) ctxOptions.named = options.named;
	if (isNumber(options.plural)) ctxOptions.pluralIndex = options.plural;
	return ctxOptions;
}
// ../../node_modules/.pnpm/vue-i18n@11.4.24_vue@3.5.46_typescript@5.9.3_/node_modules/vue-i18n/dist/vue-i18n.mjs
/*!
* vue-i18n v11.4.24
* (c) 2026 kazuya kawaguchi
* Released under the MIT License.
*/
/**
* Vue I18n Version
*
* @remarks
* Semver format. Same format as the package.json `version` field.
*
* @VueI18nGeneral
*/
var VERSION = "11.4.24";
var I18nErrorCodes = {
	UNEXPECTED_RETURN_TYPE: 24,
	INVALID_ARGUMENT: 25,
	MUST_BE_CALL_SETUP_TOP: 26,
	NOT_INSTALLED: 27,
	REQUIRED_VALUE: 28,
	INVALID_VALUE: 29,
	NOT_INSTALLED_WITH_PROVIDE: 31,
	UNEXPECTED_ERROR: 32,
	NOT_AVAILABLE_COMPOSITION_IN_LEGACY: 34
};
function createI18nError(code, ...args) {
	return createCompileError(code, null, void 0);
}
var TranslateVNodeSymbol = /* #__PURE__*/ makeSymbol("__translateVNode");
var DatetimePartsSymbol = /* #__PURE__*/ makeSymbol("__datetimeParts");
var NumberPartsSymbol = /* #__PURE__*/ makeSymbol("__numberParts");
var SetPluralRulesSymbol = makeSymbol("__setPluralRules");
var InejctWithOptionSymbol = /* #__PURE__*/ makeSymbol("__injectWithOption");
var DisposeSymbol = /* #__PURE__*/ makeSymbol("__dispose");
var mirroredCurrentInstance = null;
{
	const setters = getGlobalThis().__VUE_INSTANCE_SETTERS__;
	if (isArray(setters)) setters.push((instance) => {
		mirroredCurrentInstance = instance;
	});
}
/**
* Whether `locale` can't be a key of the locale messages and formats.
* A property name of `Object.prototype`, such as `__proto__` or `constructor`,
* would read or replace a built-in object, so it is ignored with a warning.
*/
function isUnsafeLocale(locale) {
	if (isObjectPrototypeKey(locale)) return true;
	return false;
}
/**
* Transform flat json in obj to normal json in obj
*/
function handleFlatJson(obj) {
	if (!isObject$2(obj)) return obj;
	if (isMessageAST(obj)) return obj;
	for (const key in obj) {
		if (!hasOwn(obj, key)) continue;
		if (!key.includes(".")) {
			if (isObject$2(obj[key])) handleFlatJson(obj[key]);
		} else {
			const subKeys = key.split(".");
			const lastIndex = subKeys.length - 1;
			let currentObj = obj;
			let hasStringValue = false;
			for (let i = 0; i < lastIndex; i++) {
				if (subKeys[i] === "__proto__") throw new Error(`unsafe key: ${subKeys[i]}`);
				if (!(subKeys[i] in currentObj)) currentObj[subKeys[i]] = create();
				if (!isObject$2(currentObj[subKeys[i]])) {
					hasStringValue = true;
					break;
				}
				if (isMessageAST(currentObj[subKeys[i]]) && (AST_NODE_PROPS_KEYS.includes(subKeys[i + 1]) || subKeys[i + 1] === "cacheKey")) {
					hasStringValue = true;
					break;
				}
				currentObj = currentObj[subKeys[i]];
			}
			if (!hasStringValue) {
				currentObj[subKeys[lastIndex]] = obj[key];
				delete obj[key];
			}
			const target = currentObj[subKeys[lastIndex]];
			if (isObject$2(target)) handleFlatJson(target);
		}
	}
	return obj;
}
function getLocaleMessages$1(locale, options) {
	const { messages, __i18n, messageResolver, flatJson } = options;
	const ret = isPlainObject$1(messages) ? messages : isArray(__i18n) ? create() : { [locale]: create() };
	if (isArray(__i18n)) __i18n.forEach((custom) => {
		if ("locale" in custom && "resource" in custom) {
			const { locale, resource } = custom;
			if (locale) {
				if (isUnsafeLocale(locale)) return;
				ret[locale] = getOwn(ret, locale) || create();
				deepCopy(resource, ret[locale]);
			} else deepCopy(resource, ret);
		} else isString(custom) && deepCopy(JSON.parse(custom), ret);
	});
	if (messageResolver == null && flatJson) {
		for (const key in ret) if (hasOwn(ret, key)) handleFlatJson(ret[key]);
	}
	return ret;
}
function getComponentOptions(instance) {
	return instance.type;
}
function adjustI18nResources(gl, options, componentOptions) {
	let messages = isObject$2(options.messages) ? options.messages : create();
	if ("__i18nGlobal" in componentOptions) messages = getLocaleMessages$1(gl.locale.value, {
		messages,
		__i18n: componentOptions.__i18nGlobal
	});
	const locales = Object.keys(messages);
	if (locales.length) locales.forEach((locale) => {
		gl.mergeLocaleMessage(locale, messages[locale]);
	});
	if (isObject$2(options.datetimeFormats)) {
		const locales = Object.keys(options.datetimeFormats);
		if (locales.length) locales.forEach((locale) => {
			gl.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
		});
	}
	if (isObject$2(options.numberFormats)) {
		const locales = Object.keys(options.numberFormats);
		if (locales.length) locales.forEach((locale) => {
			gl.mergeNumberFormat(locale, options.numberFormats[locale]);
		});
	}
}
function createTextNode(key) {
	return createVNode(Text, null, key, 0);
}
function getCurrentInstance$2() {
	return mirroredCurrentInstance ?? getCurrentInstance();
}
/**
* Get the effect scope of a component instance.
*
* Every component instance has one, but it is not in the published types of Vue.
*/
function getInstanceScope(instance) {
	return instance.scope;
}
/**
* Run `fn` when the effect scope of a component instance stops.
*
* Vue stops this scope when it unmounts the component, and also when
* `<Suspense>` discards a pending branch. In the second case, Vue drops the
* post-render jobs of the branch, so `onUnmounted` hooks never run.
*
* If the scope has already stopped, `fn` runs right away. This happens when
* `<Suspense>` discards a component while its async `setup()` is waiting,
* and the `setup()` continues after the `await`.
*/
function onInstanceScopeDispose(instance, fn) {
	const scope = getInstanceScope(instance);
	if (scope.active) scope.run(() => onScopeDispose(fn));
	else fn();
}
var NOOP_RETURN_ARRAY = () => [];
var NOOP_RETURN_FALSE = () => false;
var composerID = 0;
function defineCoreMissingHandler(missing) {
	return ((ctx, locale, key, type) => {
		return missing(locale, key, getCurrentInstance$2() || void 0, type);
	});
}
/**
* Create composer interface factory
*
* @internal
*/
function createComposer(options = {}) {
	const { __root, __injectWithOption } = options;
	const _isGlobal = __root === void 0;
	const flatJson = options.flatJson;
	const _ref = shallowRef;
	let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
	const _locale = _ref(__root && _inheritLocale ? __root.locale.value : isString(options.locale) ? options.locale : DEFAULT_LOCALE$1);
	const _fallbackLocale = _ref(__root && _inheritLocale ? __root.fallbackLocale.value : isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject$1(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value);
	const _messages = _ref(getLocaleMessages$1(_locale.value, options));
	const _datetimeFormats = _ref(isPlainObject$1(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
	const _numberFormats = _ref(isPlainObject$1(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
	let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
	let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
	let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
	let _fallbackFormat = !!options.fallbackFormat;
	let _missing = isFunction(options.missing) ? options.missing : null;
	let _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
	let _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
	let _warnHtmlMessage = __root ? __root.warnHtmlMessage : isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
	let _escapeParameter = !!options.escapeParameter;
	const _modifiers = __root ? __root.modifiers : isPlainObject$1(options.modifiers) ? options.modifiers : {};
	let _pluralRules = options.pluralRules || __root && __root.pluralRules;
	let _context;
	const getCoreContext = () => {
		_isGlobal && setFallbackContext(null);
		const ctxOptions = {
			version: VERSION,
			locale: _locale.value,
			fallbackLocale: _fallbackLocale.value,
			messages: _messages.value,
			modifiers: _modifiers,
			pluralRules: _pluralRules,
			missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
			missingWarn: _missingWarn,
			fallbackWarn: _fallbackWarn,
			fallbackFormat: _fallbackFormat,
			unresolving: true,
			postTranslation: _postTranslation === null ? void 0 : _postTranslation,
			warnHtmlMessage: _warnHtmlMessage,
			escapeParameter: _escapeParameter,
			messageResolver: options.messageResolver,
			messageCompiler: options.messageCompiler,
			__meta: { framework: "vue" }
		};
		ctxOptions.datetimeFormats = _datetimeFormats.value;
		ctxOptions.numberFormats = _numberFormats.value;
		const ctx = createCoreContext(ctxOptions);
		_isGlobal && setFallbackContext(ctx);
		return ctx;
	};
	_context = getCoreContext();
	updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
	function trackReactivityValues() {
		return [
			_locale.value,
			_fallbackLocale.value,
			_messages.value,
			_datetimeFormats.value,
			_numberFormats.value
		];
	}
	const locale = computed({
		get: () => _locale.value,
		set: (val) => {
			_context.locale = val;
			_locale.value = val;
		}
	});
	function withRootFallbackContext(fn) {
		if (!_isGlobal) _context.fallbackContext = getFallbackContext();
		try {
			return fn();
		} finally {
			if (!_isGlobal) _context.fallbackContext = void 0;
		}
	}
	function updateFallbackLocaleWithRoot(fallback) {
		withRootFallbackContext(() => updateFallbackLocale(_context, _locale.value, fallback));
	}
	const fallbackLocale = computed({
		get: () => _fallbackLocale.value,
		set: (val) => {
			_fallbackLocale.value = val;
			_context.fallbackLocale = _fallbackLocale.value;
			updateFallbackLocaleWithRoot(_fallbackLocale.value);
		}
	});
	const messages = computed(() => _messages.value);
	const datetimeFormats = /* #__PURE__*/ computed(() => _datetimeFormats.value);
	const numberFormats = /* #__PURE__*/ computed(() => _numberFormats.value);
	function getPostTranslationHandler() {
		return isFunction(_postTranslation) ? _postTranslation : null;
	}
	function setPostTranslationHandler(handler) {
		_postTranslation = handler;
		_context.postTranslation = handler;
	}
	function getMissingHandler() {
		return _missing;
	}
	function setMissingHandler(handler) {
		if (handler !== null) _runtimeMissing = defineCoreMissingHandler(handler);
		_missing = handler;
		_context.missing = _runtimeMissing;
	}
	const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
		trackReactivityValues();
		let ret;
		try {
			ret = withRootFallbackContext(() => fn(_context));
		} finally {}
		if (warnType !== "translate exists" && isNumber(ret) && ret === -1 || warnType === "translate exists" && !ret) {
			const [key, arg2] = argumentParser();
			return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
		} else if (successCondition(ret)) return ret;
		else
 /* istanbul ignore next */
		throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE);
	};
	function t(...args) {
		return wrapWithDeps((context) => Reflect.apply(translate, null, [context, ...args]), () => parseTranslateArgs(...args), "translate", (root) => Reflect.apply(root.t, root, [...args]), (key) => key, (val) => isString(val));
	}
	function rt(...args) {
		const [arg1, arg2, arg3] = args;
		if (arg3 && !isObject$2(arg3)) throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
		return t(...[
			arg1,
			arg2,
			assign({ resolvedMessage: true }, arg3 || {})
		]);
	}
	function d(...args) {
		return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => Reflect.apply(root.d, root, [...args]), () => "", (val) => isString(val) || isArray(val));
	}
	function n(...args) {
		return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => Reflect.apply(root.n, root, [...args]), () => "", (val) => isString(val) || isArray(val));
	}
	function normalize(values) {
		return values.map((val) => isString(val) || isNumber(val) || isBoolean(val) ? createTextNode(String(val)) : val);
	}
	const interpolate = (val) => val;
	const processor = {
		normalize,
		interpolate,
		type: "vnode"
	};
	function translateVNode(...args) {
		return wrapWithDeps((context) => {
			let ret;
			const _context = context;
			try {
				_context.processor = processor;
				ret = Reflect.apply(translate, null, [_context, ...args]);
			} finally {
				_context.processor = null;
			}
			return ret;
		}, () => parseTranslateArgs(...args), "translate", (root) => root[TranslateVNodeSymbol](...args), (key) => [createTextNode(key)], (val) => isArray(val));
	}
	function numberParts(...args) {
		return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => root[NumberPartsSymbol](...args), NOOP_RETURN_ARRAY, (val) => isString(val) || isArray(val));
	}
	function datetimeParts(...args) {
		return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => root[DatetimePartsSymbol](...args), NOOP_RETURN_ARRAY, (val) => isString(val) || isArray(val));
	}
	function setPluralRules(rules) {
		_pluralRules = rules;
		_context.pluralRules = _pluralRules;
	}
	function resolveLocaleMessageValue(locale, key) {
		const message = getLocaleMessage(locale);
		const value = _context.messageResolver(message, key);
		return value === null ? getOwn(message, key) : value;
	}
	function te(key, locale) {
		return wrapWithDeps(() => {
			if (!key) return false;
			const targetLocale = isString(locale) ? locale : _locale.value;
			const locales = isString(locale) ? [targetLocale] : _context.localeFallbacker(_context, _fallbackLocale.value, targetLocale);
			for (let i = 0; i < locales.length; i++) if (isMessageFormat(resolveLocaleMessageValue(locales[i], key))) return true;
			return false;
		}, () => [key], "translate exists", (root) => {
			return Reflect.apply(root.te, root, [key, locale]);
		}, NOOP_RETURN_FALSE, (val) => isBoolean(val));
	}
	function resolveMessages(key) {
		let messages = null;
		const locales = _context.localeFallbacker(_context, _fallbackLocale.value, _locale.value);
		for (let i = 0; i < locales.length; i++) {
			const messageValue = resolveLocaleMessageValue(locales[i], key);
			if (messageValue != null) {
				messages = messageValue;
				break;
			}
		}
		return messages;
	}
	function tm(key) {
		const messages = resolveMessages(key);
		return messages != null ? messages : __root ? __root.tm(key) || {} : {};
	}
	function getLocaleMessage(locale) {
		return getOwn(_messages.value, locale) || {};
	}
	function setLocaleMessage(locale, message) {
		if (isUnsafeLocale(locale)) return;
		if (flatJson) handleFlatJson(message);
		_messages.value[locale] = message;
		_context.messages = _messages.value;
	}
	function mergeLocaleMessage(locale, message) {
		if (isUnsafeLocale(locale)) return;
		_messages.value[locale] = getOwn(_messages.value, locale) || {};
		if (flatJson) handleFlatJson(message);
		deepCopy(message, _messages.value[locale]);
		_context.messages = _messages.value;
	}
	function getDateTimeFormat(locale) {
		return getOwn(_datetimeFormats.value, locale) || {};
	}
	function setDateTimeFormat(locale, format) {
		if (isUnsafeLocale(locale)) return;
		_datetimeFormats.value[locale] = format;
		_context.datetimeFormats = _datetimeFormats.value;
		clearDateTimeFormat(_context, locale, format);
	}
	function mergeDateTimeFormat(locale, format) {
		if (isUnsafeLocale(locale)) return;
		_datetimeFormats.value[locale] = assign(getOwn(_datetimeFormats.value, locale) || {}, format);
		_context.datetimeFormats = _datetimeFormats.value;
		clearDateTimeFormat(_context, locale, format);
	}
	function getNumberFormat(locale) {
		return getOwn(_numberFormats.value, locale) || {};
	}
	function setNumberFormat(locale, format) {
		if (isUnsafeLocale(locale)) return;
		_numberFormats.value[locale] = format;
		_context.numberFormats = _numberFormats.value;
		clearNumberFormat(_context, locale, format);
	}
	function mergeNumberFormat(locale, format) {
		if (isUnsafeLocale(locale)) return;
		_numberFormats.value[locale] = assign(getOwn(_numberFormats.value, locale) || {}, format);
		_context.numberFormats = _numberFormats.value;
		clearNumberFormat(_context, locale, format);
	}
	composerID++;
	watch(_fallbackLocale, () => updateFallbackLocaleWithRoot(_fallbackLocale.value), {
		deep: true,
		flush: "sync"
	});
	const composer = {
		id: composerID,
		locale,
		fallbackLocale,
		get inheritLocale() {
			return _inheritLocale;
		},
		set inheritLocale(val) {
			_inheritLocale = val;
			if (val && __root) {
				locale.value = __root.locale.value;
				fallbackLocale.value = __root.fallbackLocale.value;
			}
		},
		get availableLocales() {
			return Object.keys(_messages.value).sort();
		},
		messages,
		get modifiers() {
			return _modifiers;
		},
		get pluralRules() {
			return _pluralRules || {};
		},
		get isGlobal() {
			return _isGlobal;
		},
		get missingWarn() {
			return _missingWarn;
		},
		set missingWarn(val) {
			_missingWarn = val;
			_context.missingWarn = _missingWarn;
		},
		get fallbackWarn() {
			return _fallbackWarn;
		},
		set fallbackWarn(val) {
			_fallbackWarn = val;
			_context.fallbackWarn = _fallbackWarn;
		},
		get fallbackRoot() {
			return _fallbackRoot;
		},
		set fallbackRoot(val) {
			_fallbackRoot = val;
		},
		get fallbackFormat() {
			return _fallbackFormat;
		},
		set fallbackFormat(val) {
			_fallbackFormat = val;
			_context.fallbackFormat = _fallbackFormat;
		},
		get warnHtmlMessage() {
			return _warnHtmlMessage;
		},
		set warnHtmlMessage(val) {
			_warnHtmlMessage = val;
			_context.warnHtmlMessage = val;
		},
		get escapeParameter() {
			return _escapeParameter;
		},
		set escapeParameter(val) {
			_escapeParameter = val;
			_context.escapeParameter = val;
		},
		t,
		getLocaleMessage,
		setLocaleMessage,
		mergeLocaleMessage,
		getPostTranslationHandler,
		setPostTranslationHandler,
		getMissingHandler,
		setMissingHandler,
		[SetPluralRulesSymbol]: setPluralRules
	};
	composer.datetimeFormats = datetimeFormats;
	composer.numberFormats = numberFormats;
	composer.rt = rt;
	composer.te = te;
	composer.tm = tm;
	composer.d = d;
	composer.n = n;
	composer.getDateTimeFormat = getDateTimeFormat;
	composer.setDateTimeFormat = setDateTimeFormat;
	composer.mergeDateTimeFormat = mergeDateTimeFormat;
	composer.getNumberFormat = getNumberFormat;
	composer.setNumberFormat = setNumberFormat;
	composer.mergeNumberFormat = mergeNumberFormat;
	composer[InejctWithOptionSymbol] = __injectWithOption;
	composer[TranslateVNodeSymbol] = translateVNode;
	composer[DatetimePartsSymbol] = datetimeParts;
	composer[NumberPartsSymbol] = numberParts;
	return composer;
}
var baseFormatProps = {
	tag: { type: [String, Object] },
	locale: { type: String },
	scope: {
		type: String,
		validator: (val) => val === "parent" || val === "global",
		default: "parent"
	},
	i18n: { type: Object }
};
function getInterpolateArg({ slots }, keys) {
	if (keys.length === 1 && keys[0] === "default") return (slots.default ? slots.default() : []).reduce((slot, current) => {
		return [...slot, ...current.type === Fragment ? current.children : [current]];
	}, []);
	else return keys.reduce((arg, key) => {
		const slot = slots[key];
		if (slot) arg[key] = slot();
		return arg;
	}, create());
}
function getFragmentableTag() {
	return Fragment;
}
/**
* export the public type for h/tsx inference
* also to avoid inline import() in generated d.ts files
*/
/**
* Translation Component
*
* @remarks
* See the following items for property about details
*
* @VueI18nSee [TranslationProps](component#translationprops)
* @VueI18nSee [BaseFormatProps](component#baseformatprops)
* @VueI18nSee [Component Interpolation](../guide/advanced/component)
*
* @example
* ```html
* <div id="app">
*   <!-- ... -->
*   <i18n keypath="term" tag="label" for="tos">
*     <a :href="url" target="_blank">{{ $t('tos') }}</a>
*   </i18n>
*   <!-- ... -->
* </div>
* ```
* ```js
* import { createApp } from 'vue'
* import { createI18n } from 'vue-i18n'
*
* const messages = {
*   en: {
*     tos: 'Term of Service',
*     term: 'I accept xxx {0}.'
*   },
*   ja: {
*     tos: '利用規約',
*     term: '私は xxx の{0}に同意します。'
*   }
* }
*
* const i18n = createI18n({
*   locale: 'en',
*   messages
* })
*
* const app = createApp({
*   data: {
*     url: '/term'
*   }
* }).use(i18n).mount('#app')
* ```
*
* @VueI18nComponent
*/
var Translation = /* @__PURE__ */ defineComponent({
	name: "i18n-t",
	props: assign({
		keypath: {
			type: String,
			required: true
		},
		plural: {
			type: [Number, String],
			validator: (val) => isNumber(val) || !isNaN(val)
		}
	}, baseFormatProps),
	setup(props, context) {
		const { slots, attrs } = context;
		const i18n = props.i18n || useI18n({
			useScope: props.scope,
			__useComponent: true
		});
		return () => {
			const renderChildren = () => {
				const keys = Object.keys(slots).filter((key) => key[0] !== "_");
				const options = create();
				if (props.locale) options.locale = props.locale;
				if (props.plural !== void 0) options.plural = isString(props.plural) ? +props.plural : props.plural;
				const arg = getInterpolateArg(context, keys);
				return i18n[TranslateVNodeSymbol](props.keypath, arg, options);
			};
			const assignedAttrs = assign(create(), attrs);
			const tag = isString(props.tag) || isObject$2(props.tag) ? props.tag : getFragmentableTag();
			return isObject$2(tag) ? h(tag, assignedAttrs, { default: renderChildren }) : h(tag, assignedAttrs, renderChildren());
		};
	}
});
function isVNode$1(target) {
	return isArray(target) && !isString(target[0]);
}
function renderFormatter(props, context, slotKeys, partFormatter) {
	const { slots, attrs } = context;
	return () => {
		const renderChildren = () => {
			const options = { part: true };
			let overrides = create();
			if (props.locale) options.locale = props.locale;
			if (isString(props.format)) options.key = props.format;
			else if (isObject$2(props.format)) {
				if (isString(props.format.key)) options.key = props.format.key;
				overrides = Object.keys(props.format).reduce((options, prop) => {
					return slotKeys.includes(prop) ? assign(create(), options, { [prop]: props.format[prop] }) : options;
				}, create());
			}
			const parts = partFormatter(...[
				props.value,
				options,
				overrides
			]);
			let children = [options.key];
			if (isArray(parts)) children = parts.map((part, index) => {
				const slot = slots[part.type];
				const node = slot ? slot({
					[part.type]: part.value,
					index,
					parts
				}) : [part.value];
				if (isVNode$1(node)) node[0].key = `${part.type}-${index}`;
				return node;
			});
			else if (isString(parts)) children = [parts];
			return children;
		};
		const assignedAttrs = assign(create(), attrs);
		const tag = isString(props.tag) || isObject$2(props.tag) ? props.tag : getFragmentableTag();
		return isObject$2(tag) ? h(tag, assignedAttrs, { default: renderChildren }) : h(tag, assignedAttrs, renderChildren());
	};
}
/**
* export the public type for h/tsx inference
* also to avoid inline import() in generated d.ts files
*/
/**
* Number Format Component
*
* @remarks
* See the following items for property about details
*
* @VueI18nSee [FormattableProps](component#formattableprops)
* @VueI18nSee [BaseFormatProps](component#baseformatprops)
* @VueI18nSee [Custom Formatting](../guide/essentials/number#custom-formatting)
*
* @VueI18nDanger
* Not supported IE, due to no support `Intl.NumberFormat#formatToParts` in [IE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts)
*
* If you want to use it, you need to use [polyfill](https://github.com/formatjs/formatjs/tree/main/packages/intl-numberformat)
*
* @VueI18nComponent
*/
var NumberFormat = /* @__PURE__ */ defineComponent({
	name: "i18n-n",
	props: assign({
		value: {
			type: Number,
			required: true
		},
		format: { type: [String, Object] }
	}, baseFormatProps),
	setup(props, context) {
		const i18n = props.i18n || useI18n({
			useScope: props.scope,
			__useComponent: true
		});
		return renderFormatter(props, context, NUMBER_FORMAT_OPTIONS_KEYS, (...args) => i18n[NumberPartsSymbol](...args));
	}
});
function getComposer$1(i18n, instance) {
	const i18nInternal = i18n;
	if (i18n.mode === "composition") return i18nInternal.__getInstance(instance) || i18n.global;
	else {
		const vueI18n = i18nInternal.__getInstance(instance);
		return vueI18n != null ? vueI18n.__composer : i18n.global.__composer;
	}
}
/**
* @deprecated will be removed at vue-i18n v12
*/
function vTDirective(i18n) {
	const _process = (binding) => {
		const { instance, value } = binding;
		/* istanbul ignore if */
		if (!instance || !instance.$) throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
		const composer = getComposer$1(i18n, instance.$);
		const parsedValue = parseValue(value);
		return [Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]), composer];
	};
	const register = (el, binding) => {
		const [textContent, composer] = _process(binding);
		el.__composer = composer;
		el.textContent = textContent;
	};
	const unregister = (el) => {
		if (el.__composer) {
			el.__composer = void 0;
			delete el.__composer;
		}
	};
	const update = (el, { value }) => {
		if (el.__composer) {
			const composer = el.__composer;
			const parsedValue = parseValue(value);
			el.textContent = Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]);
		}
	};
	const getSSRProps = (binding) => {
		const [textContent] = _process(binding);
		return { textContent };
	};
	return {
		created: register,
		unmounted: unregister,
		beforeUpdate: update,
		getSSRProps
	};
}
function parseValue(value) {
	if (isString(value)) return { path: value };
	else if (isPlainObject$1(value)) {
		if (!("path" in value)) throw createI18nError(I18nErrorCodes.REQUIRED_VALUE, "path");
		return value;
	} else throw createI18nError(I18nErrorCodes.INVALID_VALUE);
}
function makeParams(value) {
	const { path, locale, args, choice, plural } = value;
	const options = {};
	const named = args || {};
	if (isString(locale)) options.locale = locale;
	if (isNumber(choice)) options.plural = choice;
	if (isNumber(plural)) options.plural = plural;
	return [
		path,
		named,
		options
	];
}
function apply(app, i18n, ...options) {
	const pluginOptions = isPlainObject$1(options[0]) ? options[0] : {};
	if (isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true) {
		[Translation.name, "I18nT"].forEach((name) => app.component(name, Translation));
		[NumberFormat.name, "I18nN"].forEach((name) => app.component(name, NumberFormat));
		[DatetimeFormat.name, "I18nD"].forEach((name) => app.component(name, DatetimeFormat));
	}
	app.directive("t", vTDirective(i18n));
}
/**
* Injection key for {@link useI18n}
*
* @remarks
* The global injection key for I18n instances with `useI18n`. this injection key is used in Web Components.
* Specify the i18n instance created by {@link createI18n} together with `provide` function.
*
* @VueI18nGeneral
*/
var I18nInjectionKey = /* #__PURE__*/ makeSymbol("global-vue-i18n");
function createI18n(options = {}) {
	const __globalInjection = isBoolean(options.globalInjection) ? options.globalInjection : true;
	const __instances = /* @__PURE__ */ new Map();
	const [globalScope, __global] = createGlobal(options);
	const symbol = /* #__PURE__*/ makeSymbol("");
	function __getInstance(component) {
		return __instances.get(component) || null;
	}
	function __setInstance(component, instance) {
		__instances.set(component, instance);
	}
	function __deleteInstance(component) {
		__instances.delete(component);
	}
	const i18n = {
		get mode() {
			return "composition";
		},
		install(app, ...options) {
			app.__VUE_I18N_SYMBOL__ = symbol;
			app.provide(app.__VUE_I18N_SYMBOL__, i18n);
			if (isPlainObject$1(options[0])) {
				const opts = options[0];
				i18n.__composerExtend = opts.__composerExtend;
				i18n.__vueI18nExtend = opts.__vueI18nExtend;
			}
			let globalReleaseHandler = null;
			if (__globalInjection) globalReleaseHandler = injectGlobalFields(app, i18n.global);
			apply(app, i18n, ...options);
			const unmountApp = app.unmount;
			app.unmount = () => {
				globalReleaseHandler && globalReleaseHandler();
				i18n.dispose();
				unmountApp();
			};
		},
		get global() {
			return __global;
		},
		dispose() {
			globalScope.stop();
		},
		__instances,
		__getInstance,
		__setInstance,
		__deleteInstance
	};
	return i18n;
}
function useI18n(options = {}) {
	const instance = getCurrentInstance$2();
	if (instance == null) throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP);
	if (!instance.isCE && instance.appContext.app != null && !instance.appContext.app.__VUE_I18N_SYMBOL__) throw createI18nError(I18nErrorCodes.NOT_INSTALLED);
	const i18n = getI18nInstance(instance);
	const gl = getGlobalComposer(i18n);
	const componentOptions = getComponentOptions(instance);
	const scope = getScope(options, componentOptions);
	if (scope === "global") {
		adjustI18nResources(gl, options, componentOptions);
		return gl;
	}
	if (scope === "parent") {
		let composer = getComposer$2(i18n, instance, options.__useComponent);
		if (composer == null) composer = gl;
		return composer;
	}
	if (scope === "isolated") {
		if (i18n.mode !== "composition") throw createI18nError(I18nErrorCodes.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);
		const i18nInternalIso = i18n;
		const composerOptions = assign({}, options);
		composerOptions.__root = getComposer$2(i18n, instance) || gl;
		const composer = createComposer(composerOptions);
		if (i18nInternalIso.__composerExtend) composer[DisposeSymbol] = i18nInternalIso.__composerExtend(composer);
		if (getCurrentScope()) onScopeDispose(() => {
			const dispose = composer[DisposeSymbol];
			if (dispose) {
				dispose();
				delete composer[DisposeSymbol];
			}
		});
		return composer;
	}
	const i18nInternal = i18n;
	let composer = i18nInternal.__getInstance(instance);
	if (composer == null) {
		const composerOptions = assign({}, options);
		if ("__i18n" in componentOptions) composerOptions.__i18n = componentOptions.__i18n;
		if (gl) composerOptions.__root = gl;
		composer = createComposer(composerOptions);
		if (i18nInternal.__composerExtend) composer[DisposeSymbol] = i18nInternal.__composerExtend(composer);
		i18nInternal.__setInstance(instance, composer);
		setupLifeCycle(i18nInternal, instance, composer);
	}
	return composer;
}
function createGlobal(options, legacyMode) {
	const scope = effectScope();
	const obj = scope.run(() => createComposer(options));
	if (obj == null) throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
	return [scope, obj];
}
function getI18nInstance(instance) {
	const i18n = inject(!instance.isCE ? instance.appContext.app.__VUE_I18N_SYMBOL__ : I18nInjectionKey);
	/* istanbul ignore if */
	if (!i18n) throw createI18nError(!instance.isCE ? I18nErrorCodes.UNEXPECTED_ERROR : I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE);
	return i18n;
}
function getScope(options, componentOptions) {
	return isEmptyObject(options) ? "__i18n" in componentOptions ? "local" : "global" : !options.useScope ? "local" : options.useScope;
}
function getGlobalComposer(i18n) {
	return i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
}
function getComposer$2(i18n, target, useComponent = false) {
	let composer = null;
	const root = target.root;
	let current = getParentComponentInstance(target, useComponent);
	while (current != null) {
		const i18nInternal = i18n;
		if (i18n.mode === "composition") composer = i18nInternal.__getInstance(current);
		if (composer != null) break;
		if (root === current) break;
		current = current.parent;
	}
	return composer;
}
function getParentComponentInstance(target, useComponent = false) {
	if (target == null) return null;
	return !useComponent ? target.parent : target.vnode.ctx || target.parent;
}
function setupLifeCycle(i18n, target, composer) {
	onInstanceScopeDispose(target, () => {
		const _composer = composer;
		i18n.__deleteInstance(target);
		const dispose = _composer[DisposeSymbol];
		if (dispose) {
			dispose();
			delete _composer[DisposeSymbol];
		}
	});
}
var globalExportProps = [
	"locale",
	"fallbackLocale",
	"availableLocales"
];
var globalExportMethods = [
	"t",
	"rt",
	"d",
	"n",
	"tm",
	"te"
];
function injectGlobalFields(app, composer) {
	const i18n = Object.create(null);
	globalExportProps.forEach((prop) => {
		const desc = Object.getOwnPropertyDescriptor(composer, prop);
		if (!desc) throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
		const wrap = isRef(desc.value) ? {
			get() {
				return desc.value.value;
			},
			set(val) {
				desc.value.value = val;
			}
		} : { get() {
			return desc.get && desc.get();
		} };
		Object.defineProperty(i18n, prop, wrap);
	});
	app.config.globalProperties.$i18n = i18n;
	globalExportMethods.forEach((method) => {
		const desc = Object.getOwnPropertyDescriptor(composer, method);
		if (!desc || !desc.value) throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
		Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
	});
	const dispose = () => {
		delete app.config.globalProperties.$i18n;
		globalExportMethods.forEach((method) => {
			delete app.config.globalProperties[`$${method}`];
		});
	};
	return dispose;
}
/**
* Datetime Format Component
*
* @remarks
* See the following items for property about details
*
* @VueI18nSee [FormattableProps](component#formattableprops)
* @VueI18nSee [BaseFormatProps](component#baseformatprops)
* @VueI18nSee [Custom Formatting](../guide/essentials/datetime#custom-formatting)
*
* @VueI18nDanger
* Not supported IE, due to no support `Intl.DateTimeFormat#formatToParts` in [IE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts)
*
* If you want to use it, you need to use [polyfill](https://github.com/formatjs/formatjs/tree/main/packages/intl-datetimeformat)
*
* @VueI18nComponent
*/
var DatetimeFormat = /* @__PURE__ */ defineComponent({
	name: "i18n-d",
	props: assign({
		value: {
			type: [Number, Date],
			required: true
		},
		format: { type: [String, Object] }
	}, baseFormatProps),
	setup(props, context) {
		const i18n = props.i18n || useI18n({
			useScope: props.scope,
			__useComponent: true
		});
		return renderFormatter(props, context, DATETIME_FORMAT_OPTIONS_KEYS, (...args) => i18n[DatetimePartsSymbol](...args));
	}
});
registerMessageCompiler(compile);
registerMessageResolver(resolveValue);
registerLocaleFallbacker(fallbackWithLocaleChain);
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-link-ssr-render.js
/**
* Renders a template `<NuxtLink>` straight into the parent's SSR buffer, without a component
* instance, when the link resolves to a static anchor.
*/
function ssrRenderNuxtLink(comp, props, slots, parent, slotScopeId) {
	const state = props && slots && comp.__ssrLink?.(props, parent);
	if (!state || !slots) return ssrRenderComponent(comp, props, slots, parent, slotScopeId);
	let html = (state.openTag ?? `<a${ssrRenderAttrs(state.attrs())}`) + ssrScopeIds(slotScopeId) + ">";
	let buffer;
	const push = (item) => {
		if (buffer) buffer.push(item);
		else if (typeof item === "string") html += item;
		else {
			buffer = [html, item];
			buffer.hasAsync = true;
		}
	};
	const ret = slots.default?.(state.link, push, parent, slotScopeId ? " " + slotScopeId : "");
	if (ret !== void 0) {
		html = "";
		buffer = void 0;
		renderVNode(push, h("a", state.attrs(), ret), parent, slotScopeId);
		return buffer ?? html;
	}
	if (buffer) {
		buffer.push("</a>");
		return buffer;
	}
	return html + "</a>";
}
function ssrScopeIds(slotScopeId) {
	const scopeId = (getCurrentInstance()?.type)?.__scopeId;
	let ids = scopeId ? " " + scopeId : "";
	if (slotScopeId) {
		for (const id of slotScopeId.trim().split(" ")) if (id && id !== scopeId) ids += " " + id;
	}
	return ids;
}

// app/api/client.ts
var ApiError = class extends Error {
	status;
	code;
	fields;
	constructor(status, code, fields = {}) {
		super(code);
		this.status = status;
		this.code = code;
		this.fields = fields;
	}
	/** `true` pour une panne réseau / serveur injoignable. */
	get isNetwork() {
		return this.status === 0 || this.status >= 502;
	}
};
async function request(fetcher, method, path, body, query) {
	try {
		return await fetcher(`/api${path}`, {
			method,
			body,
			query
		});
	} catch (error) {
		const e = error;
		const status = e.status ?? e.statusCode ?? 0;
		throw new ApiError(status, e.data?.error ?? (status ? "unknown" : "network"), e.data?.fields);
	}
}
var clean = (params) => Object.fromEntries(Object.entries(params).filter(([, value]) => value !== void 0 && value !== ""));
/** `getLang` : langue courante de l'interface, pour recevoir les titres des grilles dans la bonne langue. */
function createApi(fetcher, getLang = () => "fr") {
	const lang = () => ({ lang: getLang() });
	return {
		me: () => request(fetcher, "GET", "/auth/me"),
		login: (input) => request(fetcher, "POST", "/auth/login", input),
		register: (input) => request(fetcher, "POST", "/auth/register", input),
		logout: () => request(fetcher, "POST", "/auth/logout"),
		listPicrosses: (params = {}) => request(fetcher, "GET", "/picrosses", void 0, {
			...clean(params),
			...lang()
		}),
		myPicrosses: () => request(fetcher, "GET", "/picrosses/mine", void 0, lang()),
		randomPicross: (exclude) => request(fetcher, "GET", "/picrosses/random", void 0, {
			...clean({ exclude }),
			...lang()
		}),
		getPicross: (id) => request(fetcher, "GET", `/picrosses/${id}`, void 0, lang()),
		createPicross: (input) => request(fetcher, "POST", "/picrosses", input, lang()),
		deletePicross: (id) => request(fetcher, "DELETE", `/picrosses/${id}`),
		likePicross: (id, liked) => request(fetcher, "PUT", `/picrosses/${id}/like`, { liked }, lang()),
		validatePicross: (id, validated) => request(fetcher, "PUT", `/picrosses/${id}/validation`, { validated }, lang())
	};
}
// app/composables/useApi.ts
/**
* Client d'API. Pendant le rendu serveur on utilise `useRequestFetch()` : la requête est routée en
* interne (sans HTTP) et les cookies du visiteur sont relayés, donc le SSR voit l'utilisateur connecté.
* La langue courante est transmise pour recevoir les titres des grilles dans la bonne langue.
* Doit être appelé dans un contexte Nuxt (setup, plugin, middleware, store).
*/
function useApi() {
	const { $i18n } = useNuxtApp();
	return createApi(useRequestFetch(), () => $i18n.locale.value);
}

// ../../node_modules/.pnpm/@vueuse+shared@15.1.0_vue@3.5.46_typescript@5.9.3_/node_modules/@vueuse/shared/dist/index.js
/**
* Call onScopeDispose() if it's inside an effect scope lifecycle, if not, do nothing
*
* @param fn
*/
function tryOnScopeDispose(fn, failSilently) {
	if (getCurrentScope()) {
		onScopeDispose(fn, failSilently);
		return true;
	}
	return false;
}
var localProvidedStateMap = /* @__PURE__ */ new WeakMap();
/**
* On the basis of `inject`, it is allowed to directly call inject to obtain the value after call provide in the same component.
*
* @example
* ```ts
* injectLocal('MyInjectionKey', 1)
* const injectedValue = injectLocal('MyInjectionKey') // injectedValue === 1
* ```
*
* @NO_SIDE_EFFECTS
*/
var injectLocal = /* @__NO_SIDE_EFFECTS__ */ (...args) => {
	var _getCurrentInstance;
	const key = args[0];
	const instance = (_getCurrentInstance = getCurrentInstance()) === null || _getCurrentInstance === void 0 ? void 0 : _getCurrentInstance.proxy;
	const owner = instance !== null && instance !== void 0 ? instance : getCurrentScope();
	if (owner == null && !hasInjectionContext()) throw new Error("injectLocal must be called in setup");
	if (owner && localProvidedStateMap.has(owner) && key in localProvidedStateMap.get(owner)) return localProvidedStateMap.get(owner)[key];
	return inject(...args);
};
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
var toString = Object.prototype.toString;
var isObject$1 = (val) => toString.call(val) === "[object Object]";
var noop = () => {};
function createFilterWrapper(filter, fn) {
	function wrapper(...args) {
		return new Promise((resolve, reject) => {
			Promise.resolve(filter(() => fn.apply(this, args), {
				fn,
				thisArg: this,
				args
			})).then(resolve).catch(reject);
		});
	}
	if ("cancel" in filter) Object.assign(wrapper, {
		cancel: filter.cancel,
		flush: filter.flush,
		isPending: filter.isPending
	});
	return wrapper;
}
/**
* Create an EventFilter that debounce the events
*/
function debounceFilter(ms, options = {}) {
	let timer;
	let maxTimer;
	let lastRejector = noop;
	let lastResolve = noop;
	const _pending = shallowRef(false);
	const _clearTimeout = (timer) => {
		clearTimeout(timer);
		lastRejector();
		lastRejector = noop;
	};
	let lastInvoker;
	const handler = (invoke) => {
		const duration = toValue(ms);
		const maxDuration = toValue(options.maxWait);
		if (timer) _clearTimeout(timer);
		if (duration <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
			if (maxTimer) {
				_clearTimeout(maxTimer);
				maxTimer = void 0;
			}
			_pending.value = false;
			return Promise.resolve(invoke());
		}
		_pending.value = true;
		return new Promise((resolve, reject) => {
			lastRejector = options.rejectOnCancel ? reject : resolve;
			lastResolve = resolve;
			lastInvoker = invoke;
			if (maxDuration && !maxTimer) maxTimer = setTimeout(() => {
				if (timer) _clearTimeout(timer);
				maxTimer = void 0;
				_pending.value = false;
				resolve(lastInvoker());
			}, maxDuration);
			timer = setTimeout(() => {
				if (maxTimer) _clearTimeout(maxTimer);
				maxTimer = void 0;
				_pending.value = false;
				resolve(invoke());
			}, duration);
		});
	};
	return Object.assign(handler, {
		cancel: () => {
			if (timer) {
				_clearTimeout(timer);
				timer = void 0;
			}
			if (maxTimer) {
				_clearTimeout(maxTimer);
				maxTimer = void 0;
			}
			_pending.value = false;
			lastResolve = noop;
		},
		flush: () => {
			if (_pending.value) {
				if (timer) {
					clearTimeout(timer);
					timer = void 0;
				}
				if (maxTimer) {
					clearTimeout(maxTimer);
					maxTimer = void 0;
				}
				_pending.value = false;
				const resolve = lastResolve;
				lastRejector = noop;
				lastResolve = noop;
				resolve(lastInvoker());
			}
		},
		isPending: shallowReadonly(_pending)
	});
}
/**
* Get a px value for SSR use, do not rely on this method outside of SSR as REM unit is assumed at 16px, which might not be the case on the client
*/
function pxValue(px) {
	return px.endsWith("rem") ? Number.parseFloat(px) * 16 : Number.parseFloat(px);
}
function toArray(value) {
	return Array.isArray(value) ? value : [value];
}
/**
* Debounce execution of a function.
*
* @see https://vueuse.org/useDebounceFn
* @param  fn          A function to be executed after delay milliseconds debounced.
* @param  ms          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
* @param  options     Options
*
* @return A new, debounced, function with isPending, cancel, and flush properties.
*/
function useDebounceFn(fn, ms = 200, options = {}) {
	return createFilterWrapper(debounceFilter(ms, options), fn);
}
/**
* Debounce updates of a ref.
*
* @return A new debounced ref.
*/
function refDebounced(value, ms = 200, options = {}) {
	const debounced = ref(toValue(value));
	const updater = useDebounceFn(() => {
		debounced.value = value.value;
	}, ms, options);
	watch(value, () => updater());
	return shallowReadonly(debounced);
}
/**
* Wrapper for `setInterval` with controls
*
* @see https://vueuse.org/useIntervalFn
* @param cb
* @param interval
* @param options
*/
function useIntervalFn(cb, interval = 1e3, options = {}) {
	const { immediate = true, immediateCallback = false } = options;
	let timer = null;
	const isActive = shallowRef(false);
	function clean() {
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
	}
	function pause() {
		isActive.value = false;
		clean();
	}
	function resume() {
		const intervalValue = toValue(interval);
		if (intervalValue <= 0) return;
		isActive.value = true;
		if (immediateCallback) cb();
		clean();
		if (isActive.value) timer = setInterval(cb, intervalValue);
	}
	if (isRef(interval) || typeof interval === "function") tryOnScopeDispose(watch(interval, () => {
		if (isActive.value && false);
	}));
	tryOnScopeDispose(pause);
	return {
		isActive: shallowReadonly(isActive),
		pause,
		resume
	};
}
/**
* Shorthand for watching value with {immediate: true}
*
* @see https://vueuse.org/watchImmediate
*/
function watchImmediate(source, cb, options) {
	return watch(source, cb, {
		...options,
		immediate: true
	});
}

// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fglobal-polyfills.mjs
if (!("global" in globalThis)) globalThis.global = globalThis;
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/diagnostics/manifest.js
/**
* E5xxx
* App manifest / route-rules runtime diagnostics.
*/
var manifestDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Froute-rules.mjs
var foldedMatcher = /* @__PURE__ */ (() => {
	const $0 = {
		redirect: "/sitemap_index.xml",
		prerender: false
	};
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1);
		if (p === "/sitemap.xml") r.push({ data: $0 });
		else if (p.charCodeAt(p.length - 1) === 47) {
			if (p === "/sitemap.xml/") r.push({ data: $0 });
		}
		return r.reverse();
	};
})();
var decodeRoutePath = function decodeRoutePath$1(path) {
	if (!path.includes("%")) return path;
	const queryIndex = path.indexOf("?");
	const pathname = queryIndex === -1 ? path : path.slice(0, queryIndex);
	try {
		return queryIndex === -1 ? decodeURI(pathname) : decodeURI(pathname) + path.slice(queryIndex);
	} catch {
		return path;
	}
};
var resolveRoutePathDotSegments = function resolveRoutePathDotSegments(path) {
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
var foldRouteCase = function foldRouteCase$1(path) {
	return path.replace(/[A-Z]+|[^\0-\x7F]/g, (char) => {
		if (char.charCodeAt(0) < 128) return char.toLowerCase();
		const upper = char.toUpperCase();
		if (upper.length !== 1 || upper.charCodeAt(0) < 128) return char;
		const lower = upper.toLowerCase();
		return lower.length === 1 && lower.toUpperCase() === upper ? lower : upper;
	});
};
var matchAllRouteRules = function matchAllRouteRules$1(match, path) {
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
var normalizePath = (path, fold) => {
	if (typeof path !== "string") return path;
	const decoded = decodeRoutePath(resolveRoutePathDotSegments(path));
	return fold ? foldRouteCase(decoded) : decoded;
};
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froute_rules_default = (path) => defu({}, ...matchAllRouteRules((path) => foldedMatcher("", normalizePath(path, true)).map((r) => r.data), path).reverse());
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/composables/manifest.js
function routeRulesMatcher(path) {
	return virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froute_rules_default(path);
}
function getRouteRules(arg) {
	const path = typeof arg === "string" ? arg : arg.path;
	try {
		return routeRulesMatcher(path);
	} catch (e) {
		manifestDiagnostics.NUXT_E5003({
			path,
			cause: e
		});
		return {};
	}
}
// ../../node_modules/.pnpm/unhead@3.5.3_esbuild@0.28.2_rolldown@1.2.19_rollup@4.68.8_vite@8.3.8_@types+node@22.20._959e829c331ed0d24dafb9557225b322/node_modules/unhead/dist/shared/unhead.Dr4xyboz.mjs
var LT_RE = /</g;
var TOKEN_RE = /%\w+(?:\.\w+)?/g;
var LONE_PERCENT_RE = /%(?![0-9a-f]{2})/i;
var SepSub = "%separator";
function sub(p, token, isJson) {
	const dot = token.indexOf("."), val = token === "s" || token === "pageTitle" ? p.pageTitle : dot === -1 ? p[token] : p[token.slice(0, dot)]?.[token.slice(dot + 1)];
	if (val === void 0) return;
	const str = String(typeof val == "number" ? val : val || "");
	return isJson ? JSON.stringify(str).slice(1, -1).replace(LT_RE, "\\u003C") : str;
}
function processTemplateParams(s, p, sep, isJson) {
	if (typeof s != "string" || !s.includes("%")) return s;
	let decoded = s;
	if (!LONE_PERCENT_RE.test(s)) try {
		decoded = decodeURI(s);
	} catch {}
	const tokens = decoded === s ? void 0 : decoded.match(TOKEN_RE);
	if (tokens === null) return s;
	let hasTokens = tokens !== void 0;
	const replaced = s.replace(TOKEN_RE, (token) => (hasTokens = true, token === SepSub || tokens && !tokens.includes(token) ? token : sub(p, token.slice(1), isJson) ?? token));
	if (!hasTokens) return s;
	const rendered = replaced.trim();
	return s.includes(SepSub) ? rendered.split(SepSub).map((part) => part.trim()).filter(Boolean).join(sep ? ` ${sep} ` : " ") : rendered;
}
// ../../node_modules/.pnpm/unhead@3.5.3_esbuild@0.28.2_rolldown@1.2.19_rollup@4.68.8_vite@8.3.8_@types+node@22.20._959e829c331ed0d24dafb9557225b322/node_modules/unhead/dist/shared/unhead.1QrGCllP.mjs
var SupportedAttrs = {
	meta: "content",
	link: "href",
	htmlAttrs: "lang"
};
var contentAttrs = ["innerHTML", "textContent"];
var isJsonScript = (tag) => tag.tag === "script" && String(tag.props.type).endsWith("json");
function takesSafeTitle(tag) {
	return tag.tag === "meta" ? !tag.props["http-equiv"] && String(tag.props.name).toLowerCase() !== "referrer" : tag.tag === "title" || tag.tag === "titleTemplate" || tag.tag === "htmlAttrs" || isJsonScript(tag);
}
var TemplateParamsPlugin = /* @__PURE__ */ defineHeadPlugin((head) => ({
	key: "template-params",
	hooks: {
		"tags:resolve": ({ tagMap, tags }) => {
			const params = tagMap.get("templateParams")?.props || {}, sep = params.separator || "|";
			delete params.separator;
			const safeTitle = !params.pageTitle && head._titleSafe;
			params.pageTitle = processTemplateParams(params.pageTitle || head._title || "", params, sep);
			let withoutSafeTitle = params;
			safeTitle && (withoutSafeTitle = { ...params }, delete withoutSafeTitle.pageTitle);
			for (const tag of tags) {
				if (tag.processTemplateParams === false) continue;
				const v = SupportedAttrs[tag.tag];
				if (v && typeof tag.props[v] == "string") {
					if (tag.props[v].includes("%")) {
						const tagParams = safeTitle && !takesSafeTitle(tag) ? withoutSafeTitle : params;
						tag.props[v] = processTemplateParams(tag.props[v], tagParams, sep);
					}
				} else if (tag.processTemplateParams || tag.tag === "titleTemplate" || tag.tag === "title") {
					let tagParams;
					for (const p of contentAttrs) {
						const content = tag[p];
						typeof content == "string" && content.includes("%") && (tagParams ??= safeTitle && !takesSafeTitle(tag) ? withoutSafeTitle : params, tag[p] = processTemplateParams(content, tagParams, sep, isJsonScript(tag)));
					}
				}
			}
			head._templateParams = params, head._separator = sep;
		},
		"tags:afterResolve": ({ tagMap }) => {
			const title = tagMap.get("title");
			typeof title?.textContent == "string" && title.processTemplateParams !== false && title.textContent.includes("%") && (title.textContent = processTemplateParams(title.textContent, head._templateParams, head._separator));
		}
	}
}), "template-params");
// ../../node_modules/.pnpm/unhead@3.5.3_esbuild@0.28.2_rolldown@1.2.19_rollup@4.68.8_vite@8.3.8_@types+node@22.20._959e829c331ed0d24dafb9557225b322/node_modules/unhead/dist/plugins.mjs
var IMAGE_META_KEYS = /* @__PURE__ */ new Set([
	"og:image",
	"og:image:url",
	"og:image:secure_url",
	"twitter:image",
	"twitter:image:src"
]);
function hasImageContent(content) {
	return !!hasContent(content) && String(content).trim() !== "";
}
function elementMetaKey(el) {
	return el.getAttribute("property") || el.getAttribute("name") || "";
}
function InferSeoMetaPlugin(options = {}) {
	return defineHeadPlugin((head) => {
		let serverImages = (options.twitterCard, []);
		return options.twitterCard !== false && head.push({ meta: [options.twitterCard ? {
			name: "twitter:card",
			content: options.twitterCard,
			tagPriority: "low"
		} : {
			name: "twitter:card",
			tagPriority: "low",
			"data-infer": ""
		}] }), head.push({ meta: [{
			property: "og:title",
			tagPriority: "low",
			"data-infer": ""
		}, {
			property: "og:description",
			tagPriority: "low",
			"data-infer": ""
		}] }), {
			key: "infer-seo-meta",
			hooks: {
				"tags:beforeResolve": ({ tagMap }) => {
					let title = head._titleTemplate || head._title;
					const ogTitle = tagMap.get("meta:og:title");
					typeof ogTitle?.props["data-infer"] < "u" && (typeof title == "function" && (title = title(head._title)), title = hasContent(title) ? String(title) : void 0, ogTitle.props.content = options.ogTitle ? options.ogTitle(title) : title || "", ogTitle.processTemplateParams = true);
					const descriptionValue = tagMap.get("meta:description")?.props?.content, description = hasContent(descriptionValue) ? String(descriptionValue) : void 0, ogDescription = tagMap.get("meta:og:description");
					typeof ogDescription?.props["data-infer"] < "u" && (ogDescription.props.content = options.ogDescription ? options.ogDescription(description) : description || "", ogDescription.processTemplateParams = true);
				},
				"tags:afterResolve": (ctx) => {
					let cardIndex = -1, hasImage = false;
					for (let i = 0; i < ctx.tags.length; i++) {
						const tag = ctx.tags[i];
						if (tag.tag !== "meta") continue;
						if (tag.props.name === "twitter:card" && typeof tag.props["data-infer"] < "u") {
							cardIndex = i;
							continue;
						}
						const key = tag.props.property || tag.props.name;
						IMAGE_META_KEYS.has(key) && (hasImage ||= hasImageContent(tag.props.content), serverImages.length && (serverImages = serverImages.filter((el) => elementMetaKey(el) !== key)));
					}
					if (cardIndex === -1) return;
					!hasImage && serverImages.length && (serverImages = serverImages.filter((el) => el.isConnected), hasImage = serverImages.length > 0);
					const card = ctx.tags[cardIndex], props = {
						...card.props,
						content: hasImage ? "summary_large_image" : "summary"
					};
					delete props["data-infer"], ctx.tags[cardIndex] = {
						...card,
						props
					};
				}
			}
		};
	}, "infer-seo-meta");
}
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/composables/payload.js
/**
* This is an experimental function for configuring passing rich data from server -> client.
* @since 3.4.0
*/
function definePayloadReducer(name, reduce) {
	useNuxtApp().ssrContext["~payloadReducers"][name] = reduce;
}
// ../../node_modules/.pnpm/@pinia+nuxt@1.0.3_@nuxt+schema@4.7.0_confbox@0.3.2_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_14cdf70bbc0235feeacc2c0a5a84ffad/node_modules/@pinia/nuxt/dist/runtime/payload-plugin.js
var payloadPlugin = definePayloadPlugin(() => {
	definePayloadReducer("skipHydrate", (data) => !shouldHydrate(data) && 1);
});
var hexDigits = "0123456789abcdef";
Array.from({ length: 256 }, (_, i) => hexDigits.charAt(i >> 4) + hexDigits.charAt(i & 15));
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Funhead.config.mjs
var appComponentHead = [];
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/composables/state.js
var useStateKeyPrefix = "$s";
function useState(...args) {
	const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
	if (typeof args[0] !== "string") args.unshift(autoKey);
	const [_key, init] = args;
	if (!_key || typeof _key !== "string") throw stateDiagnostics.NUXT_E7009({ key: _key });
	if (init !== void 0 && typeof init !== "function") throw stateDiagnostics.NUXT_E7007({ type: typeof init });
	const key = useStateKeyPrefix + _key;
	const nuxtApp = useNuxtApp();
	const state = toRef(nuxtApp.payload.state, key);
	if (init) {
		const inits = nuxtApp._state[key] ||= /* @__PURE__ */ new Map();
		const scope = getCurrentScope();
		if (!inits.has(scope)) {
			inits.set(scope, init);
			if (scope) onScopeDispose(() => {
				inits.delete(scope);
				if (!inits.size && nuxtApp._state[key] === inits) delete nuxtApp._state[key];
			});
		}
	}
	if (state.value === void 0 && init) {
		const initialValue = init();
		if (isRef(initialValue)) {
			nuxtApp.payload.state[key] = initialValue;
			return state;
		}
		state.value = initialValue;
	}
	return state;
}
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/composables/layout.js
function resolveLayoutName(route, name) {
	return unref(name) ?? route?.meta.layout ?? getRouteRules({ path: route?.path ?? "/" }).appLayout ?? "default";
}
// ../../node_modules/.pnpm/site-config-stack@5.1.0_vue@3.5.46_typescript@5.9.3_/node_modules/site-config-stack/dist/index.mjs
var SiteConfigPriority = {
	i18n: -2};
// ../../node_modules/.pnpm/nuxt-site-config@5.1.0_3f384d5806bbc92f23f712545ee63e42/node_modules/nuxt-site-config/dist/runtime/app/plugins/0.siteConfig.js
var _0_siteConfig_default = defineNuxtPlugin({
	name: "nuxt-site-config:init",
	enforce: "pre",
	async setup(nuxtApp) {
		const stack = useRequestEvent()?.context?.siteConfig;
		const state = useState("site-config");
		nuxtApp.hooks.hook("app:rendered", () => {
			state.value = stack?.get({
				debug: useRuntimeConfig()["nuxt-site-config"].debug,
				resolveRefs: true
			});
		});
		return { provide: { nuxtSiteConfig: stack } };
	}
});
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/island-head.js
/**
* No-op `head.push` until the returned `unfreeze` runs. Plugin/transformer
* augmentations on the same head are unaffected.
*/
function freezeHead(head) {
	const realPush = head.push;
	head.push = () => ({
		dispose: () => {},
		patch: () => {},
		_i: 0
	});
	return () => {
		head.push = realPush;
	};
}
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/head/runtime/plugins/unhead.server.js
var plugin$3 = defineNuxtPlugin({
	name: "nuxt:head",
	enforce: "pre",
	setup(nuxtApp) {
		const head = nuxtApp.ssrContext.head;
		if (nuxtApp.ssrContext.islandContext) {
			const unfreeze = freezeHead(head);
			nuxtApp.hooks.hookOnce("app:created", unfreeze);
		} else if (appComponentHead.length) nuxtApp.hooks.hookOnce("vue:setup", () => {
			for (const input of appComponentHead) head.push(input);
		});
		nuxtApp.vueApp.use(head);
	}
});
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/pages/runtime/utils.js
var ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
var ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
var ROUTE_KEY_NORMAL_RE = /:\w+/g;
var interpolatePath = (route, match) => {
	return match.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
};
var generateRouteKey = (routeProps, override) => {
	const matchedRoute = routeProps.route.matched.find((m) => m.components?.default === routeProps.Component.type);
	const source = matchedRoute?.meta.key ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
	return typeof source === "function" ? source(routeProps.route) : source;
};
/**
* Shares a lazy route component import between every router created from the route table,
* as vue-router only caches the resolved component per router.
* @internal
*/
function memoizeRouteComponent(load) {
	let promise;
	return () => promise ||= load().catch((error) => {
		promise = void 0;
		throw error;
	});
}
Object.assign(Object.create(null), {});
var pageIslandRoutes = Object.assign(Object.create(null), {});
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fmiddleware.mjs
var globalMiddleware = [defineNuxtRouteMiddleware(async (to) => {
	let __temp, __restore;
	if (!to.meta?.validate) return;
	const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
	if (result === true) return;
	return createError({
		fatal: false,
		status: result && (result.status || result.statusCode) || 404,
		statusText: result && (result.statusText || result.statusMessage) || `Page Not Found: ${to.fullPath}`,
		data: { path: to.fullPath }
	});
}), /* @__PURE__ */ defineNuxtRouteMiddleware((to) => {
	if (!useNuxtApp().ssrContext?.islandContext) return;
	const rules = getRouteRules({ path: to.path });
	if (rules.redirect) {
		const path = rules.redirect.includes("#") ? rules.redirect : rules.redirect + to.hash;
		return navigateTo(path, { external: isAbsoluteHref(path) });
	}
})];
var namedMiddleware = {
	admin: () => import('../build/admin-BRmnV_8s.mjs'),
	auth: () => import('../build/auth-Dzj_b8ba.mjs'),
	guest: () => import('../build/guest-Bfjhr46p.mjs')
};
// app/pages/play/[[id]].vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta = { key: "play" };
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Froutes.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default = [
	{
		name: "play-id___fr",
		path: "/jouer/:id?",
		meta: __nuxt_page_meta || {},
		component: memoizeRouteComponent(() => import('../build/_id_-DDRPhbzJ.mjs'))
	},
	{
		name: "play-id___en",
		path: "/en/play/:id?",
		meta: __nuxt_page_meta || {},
		component: memoizeRouteComponent(() => import('../build/_id_-DDRPhbzJ.mjs'))
	},
	{
		name: "admin___fr",
		path: "/admin",
		meta: { "middleware": ["auth", "admin"] },
		component: memoizeRouteComponent(() => import('../build/admin-B4rl-Oel.mjs'))
	},
	{
		name: "admin___en",
		path: "/en/admin",
		meta: { "middleware": ["auth", "admin"] },
		component: memoizeRouteComponent(() => import('../build/admin-B4rl-Oel.mjs'))
	},
	{
		name: "create___fr",
		path: "/creer",
		meta: { "middleware": "auth" },
		component: memoizeRouteComponent(() => import('../build/create-D_hantBx.mjs'))
	},
	{
		name: "create___en",
		path: "/en/create",
		meta: { "middleware": "auth" },
		component: memoizeRouteComponent(() => import('../build/create-D_hantBx.mjs'))
	},
	{
		name: "gallery___fr",
		path: "/galerie",
		component: memoizeRouteComponent(() => import('../build/gallery-DGt8ZSqR.mjs'))
	},
	{
		name: "gallery___en",
		path: "/en/gallery",
		component: memoizeRouteComponent(() => import('../build/gallery-DGt8ZSqR.mjs'))
	},
	{
		name: "login___fr",
		path: "/connexion",
		meta: { "middleware": "guest" },
		component: memoizeRouteComponent(() => import('../build/login-C4YFrlwH.mjs'))
	},
	{
		name: "login___en",
		path: "/en/login",
		meta: { "middleware": "guest" },
		component: memoizeRouteComponent(() => import('../build/login-C4YFrlwH.mjs'))
	},
	{
		name: "profile___fr",
		path: "/compte",
		meta: { "middleware": "auth" },
		component: memoizeRouteComponent(() => import('../build/profile-DfHmCnyY.mjs'))
	},
	{
		name: "profile___en",
		path: "/en/account",
		meta: { "middleware": "auth" },
		component: memoizeRouteComponent(() => import('../build/profile-DfHmCnyY.mjs'))
	},
	{
		name: "register___fr",
		path: "/inscription",
		meta: { "middleware": "guest" },
		component: memoizeRouteComponent(() => import('../build/register-DC-KHA9I.mjs'))
	},
	{
		name: "register___en",
		path: "/en/register",
		meta: { "middleware": "guest" },
		component: memoizeRouteComponent(() => import('../build/register-DC-KHA9I.mjs'))
	},
	{
		name: "index___fr",
		path: "/",
		component: memoizeRouteComponent(() => import('../build/pages-C3_qsSxi.mjs'))
	},
	{
		name: "index___en",
		path: "/en",
		component: memoizeRouteComponent(() => import('../build/pages-C3_qsSxi.mjs'))
	},
	{
		name: void 0,
		path: "/sitemap.xml",
		component: {}
	}
];
var plugin$2 = defineNuxtPlugin({
	name: "nuxt:router",
	enforce: "pre",
	async setup(nuxtApp) {
		let __temp, __restore;
		let routerBase = useRuntimeConfig().app.baseURL;
		const history = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.history?.(routerBase) ?? createMemoryHistory(routerBase);
		const routes = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.routes ? ([__temp, __restore] = executeAsync(() => virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.routes(virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default)), __temp = await __temp, __restore(), __temp) ?? virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default : virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default;
		let startPosition;
		const router = createRouter({
			...virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default,
			scrollBehavior: (to, from, savedPosition) => {
				if (from === START_LOCATION) {
					startPosition = savedPosition;
					return;
				}
				if (virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior) {
					router.options.scrollBehavior = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior;
					if ("scrollRestoration" in (void 0).history) {
						const unsub = router.beforeEach(() => {
							unsub();
							(void 0).history.scrollRestoration = "manual";
						});
					}
					return virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
				}
			},
			history,
			routes,
			matcher: void 0
		});
		nuxtApp.vueApp.use(router);
		const previousRoute = shallowRef(router.currentRoute.value);
		router.afterEach((_to, from) => {
			previousRoute.value = from;
		});
		Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", { get: () => previousRoute.value });
		const initialURL = nuxtApp.ssrContext.url;
		const _route = shallowRef(router.currentRoute.value);
		const syncCurrentRoute = () => {
			_route.value = router.currentRoute.value;
		};
		router.afterEach((to, from) => {
			const lastTo = to.matched.at(-1)?.components?.default;
			const lastFrom = from.matched.at(-1)?.components?.default;
			if (lastTo === lastFrom) {
				if (generateRouteKey({
					route: to,
					Component: { type: lastTo }
				}) === generateRouteKey({
					route: from,
					Component: { type: lastFrom }
				})) syncCurrentRoute();
				return;
			}
			if (to.matched.length < from.matched.length && to.matched.every((m, i) => m.components?.default === from.matched[i]?.components?.default)) syncCurrentRoute();
		});
		const route = { sync: syncCurrentRoute };
		for (const key in _route.value) Object.defineProperty(route, key, {
			get: () => _route.value[key],
			enumerable: true
		});
		nuxtApp._route = shallowReactive(route);
		nuxtApp._middleware ||= {
			global: [],
			named: Object.create(null)
		};
		const error = useError();
		const isServerPage = nuxtApp.ssrContext?.islandContext?.name?.startsWith("page_");
		function endNavigation(to) {
			delete nuxtApp._processingMiddleware;
			delete nuxtApp._middlewareTo;
		}
		if (!nuxtApp.ssrContext?.islandContext || isServerPage) router.afterEach(async (to, _from, failure) => {
			endNavigation();
			if (failure) await nuxtApp.callHook("page:loading:end");
			if (failure?.type === 4) return;
			if (to.redirectedFrom && to.fullPath !== initialURL) await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
		});
		router.onError(async (_error, to) => {
			endNavigation();
			await nuxtApp.callHook("page:loading:end");
		});
		try {
			[__temp, __restore] = executeAsync(() => router.push(initialURL)), __temp = await __temp, __restore();
			[__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
		} catch (error) {
			[__temp, __restore] = executeAsync(() => _showErrorUnlessCrawler(nuxtApp, error)), await __temp, __restore();
		}
		const resolvedInitialRoute = router.currentRoute.value;
		syncCurrentRoute();
		if (nuxtApp.ssrContext?.islandContext && !isServerPage) return { provide: { router } };
		const initialLayout = nuxtApp.payload.state._layout;
		router.beforeEach(async (to, from) => {
			return runMiddleware(to, from);
		});
		async function runMiddleware(to, from) {
			await nuxtApp.callHook("page:loading:start");
			to.meta = reactive(to.meta);
			if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) to.meta.layout = initialLayout;
			nuxtApp._processingMiddleware = true;
			nuxtApp._middlewareTo = to;
			if (!nuxtApp.ssrContext?.islandContext || isServerPage) {
				const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
				for (const component of to.matched) {
					const componentMiddleware = component.meta.middleware;
					if (!componentMiddleware) continue;
					for (const entry of toArray$1(componentMiddleware)) middlewareEntries.add(entry);
				}
				const routeRules = getRouteRules({ path: to.path });
				if (routeRules.appMiddleware) for (const key in routeRules.appMiddleware) if (routeRules.appMiddleware[key]) middlewareEntries.add(key);
				else middlewareEntries.delete(key);
				for (const entry of middlewareEntries) {
					const middleware = typeof entry === "string" ? nuxtApp._middleware.named[entry] || await namedMiddleware[entry]?.().then((r) => r.default || r) : entry;
					if (!middleware) throw navigationDiagnostics.NUXT_E2004({
						entry: String(entry),
						validMiddleware: void 0
					});
					try {
						const run = () => nuxtApp.runWithContext(() => middleware(to, from));
						const result = await run();
						if (result === false || result instanceof Error) {
							const error = result || createError({
								status: 404,
								statusText: `Page Not Found: ${initialURL}`
							});
							await nuxtApp.runWithContext(() => showError(error));
							return false;
						}
						if (result === true) continue;
						if (result === false) return result;
						if (result) {
							if (isNuxtError(result) && result.fatal) await nuxtApp.runWithContext(() => showError(result));
							return result;
						}
					} catch (err) {
						const error = createErrorFromThrown(err);
						if (error.fatal) await nuxtApp.runWithContext(() => showError(error));
						return error;
					}
				}
			}
		}
		if (isServerPage) router.beforeResolve((to) => {
			const expected = pageIslandRoutes[nuxtApp.ssrContext.islandContext.name];
			const actual = to.matched.find((m) => (m.components?.default)?.__nuxt_island)?.components?.default;
			if (!expected || expected !== actual?.__nuxt_island) {
				nuxtApp.ssrContext["~renderResponse"] = {
					statusCode: 400,
					statusMessage: "Invalid island request path"
				};
				return false;
			}
		});
		router.afterEach((to, _from, failure) => {
			if (to.matched.length === 0 && !error.value && !isNavigationFailure(failure, NavigationFailureType.aborted | NavigationFailureType.cancelled)) return nuxtApp.runWithContext(() => showError(createError({
				status: 404,
				fatal: false,
				statusText: `Page not found: ${to.fullPath}`,
				data: { path: to.fullPath }
			})));
		});
		nuxtApp.hooks.hookOnce("app:created", async () => {
			try {
				if ("name" in resolvedInitialRoute) resolvedInitialRoute.name = void 0;
				await router.replace({
					...resolvedInitialRoute,
					force: true
				});
				router.options.scrollBehavior = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior;
			} catch (error) {
				await _showErrorUnlessCrawler(nuxtApp, error);
			}
		});
		return { provide: { router } };
	}
});
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/plugins/revive-payload.server.js
var isObject = (data) => typeof data === "object" && data !== null;
var reducers = [
	["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
	["EmptyShallowRef", (data) => isObject(data) && isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
	["EmptyRef", (data) => isObject(data) && isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
	["ShallowRef", (data) => isObject(data) && isRef(data) && isShallow(data) && data.value],
	["ShallowReactive", (data) => isObject(data) && isReactive(data) && isShallow(data) && toRaw(data)],
	["Ref", (data) => isObject(data) && isRef(data) && data.value],
	["Reactive", (data) => isObject(data) && isReactive(data) && toRaw(data)]
];
var plugin$1 = /* @__PURE__ */ defineNuxtPlugin({
	name: "nuxt:revive-payload:server",
	setup() {
		for (const [reducer, fn] of reducers) definePayloadReducer(reducer, fn);
	}
});
// ../../node_modules/.pnpm/@pinia+nuxt@1.0.3_@nuxt+schema@4.7.0_confbox@0.3.2_dotenv@17.4.2_giget@3.3.1_jiti@2.7.0_14cdf70bbc0235feeacc2c0a5a84ffad/node_modules/@pinia/nuxt/dist/runtime/plugin.js
var plugin = defineNuxtPlugin({
	name: "pinia",
	setup(nuxtApp) {
		const pinia = createPinia();
		nuxtApp.vueApp.use(pinia);
		setActivePinia(pinia);
		if (nuxtApp.payload && nuxtApp.payload.pinia) pinia.state.value = nuxtApp.payload.pinia;
		return { provide: { pinia } };
	},
	hooks: { "app:rendered"() {
		const nuxtApp = useNuxtApp();
		nuxtApp.payload.pinia = toRaw(nuxtApp.$pinia).state.value;
		setActivePinia(void 0);
	} }
});
// ../../node_modules/.pnpm/nuxtseo-shared@6.0.5_c3df22339061a7f73bb7d371158874bd/node_modules/nuxtseo-shared/dist/i18n-runtime.mjs
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
	if (!matches.length) return {
		_tag: "unknown",
		defaultLocale: i18n.defaultLocale,
		locales: i18n.locales
	};
	return {
		_tag: "known",
		defaultLocale: (matches.find((entry) => entry.defaults.includes(normalizedHost))?.locale || (matches.length === 1 ? matches[0].locale : void 0))?.code || i18n.defaultLocale,
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
function localePath(basePath, locale, i18n, context = {}) {
	const { pathname, suffix } = splitRouteSuffix(basePath);
	if (i18n.strategy === "no_prefix") return `${pathname}${suffix}`;
	const domain = resolveI18nDomain(context.host, i18n);
	const isDefault = locale === domain.defaultLocale;
	const isDomainDefault = i18n.differentDomains || domain._tag === "known" && isDefault;
	if (i18n.strategy === "prefix_except_default" && (isDefault || i18n.differentDomains)) return `${pathname}${suffix}`;
	if (i18n.strategy === "prefix_and_default" && isDomainDefault) return `${pathname}${suffix}`;
	if (pathname === "/") return `/${locale}${suffix}`;
	return `/${locale}${pathname}${suffix}`;
}
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fnuxt-site-config%2Fi18n-plugin-deps.mjs
var i18nPluginDeps = [
	"i18n:plugin",
	"i18n:plugin:ssg-detect",
	"i18n:plugin:route-locale-detect"
];
// ../../node_modules/.pnpm/nuxt-site-config@5.1.0_3f384d5806bbc92f23f712545ee63e42/node_modules/nuxt-site-config/dist/runtime/app/plugins/i18n-server.js
function createServerGetter(target, resolve, ...args) {
	return () => {
		const instance = target.deref();
		return instance ? resolve(instance, ...args) : void 0;
	};
}
// ../../node_modules/.pnpm/nuxt-site-config@5.1.0_3f384d5806bbc92f23f712545ee63e42/node_modules/nuxt-site-config/dist/runtime/app/plugins/i18n-shared.js
function getSiteConfigStack() {
	return useRequestEvent()?.context.siteConfig;
}
// ../../node_modules/.pnpm/nuxt-site-config@5.1.0_3f384d5806bbc92f23f712545ee63e42/node_modules/nuxt-site-config/dist/runtime/app/plugins/i18n.js
function resolveDefaultLocale(i18n) {
	const locale = toValue(i18n.locales).find((l) => l.code === i18n.defaultLocale);
	return locale?.language || locale?.iso || i18n.defaultLocale;
}
function resolveSiteUrlOrigin(url) {
	if (!url || url.startsWith("/")) return void 0;
	const absolute = hasProtocol$1(url, {
		acceptRelative: true,
		strict: false
	}) ? url : `https://${url}`;
	const { protocol, host } = parseURL(absolute);
	return host ? `${protocol}//${host}` : void 0;
}
function resolveI18nUrl(i18n, requestProtocol) {
	const baseUrl = toValue(i18n.baseUrl) || void 0;
	if (!toValue(i18n.differentDomains)) return resolveSiteUrlOrigin(baseUrl);
	const defaultLocale = toValue(i18n.locales).find((locale) => locale.code === toValue(i18n.defaultLocale));
	const domain = resolveCanonicalLocaleDomain(toValue(i18n.localeProperties), defaultLocale);
	if (!domain) return resolveSiteUrlOrigin(baseUrl);
	return resolveSiteUrlOrigin(hasProtocol$1(domain, { strict: true }) ? domain : `${requestProtocol}//${domain}`);
}
function resolveCurrentLocale(i18n) {
	const properties = toValue(i18n.localeProperties);
	if (properties.language) return properties.language;
	return resolveDefaultLocale(i18n);
}
function resolveDescription(i18n) {
	return i18n.te("nuxtSiteConfig.description") ? i18n.t("nuxtSiteConfig.description") : void 0;
}
function resolveName(i18n) {
	return i18n.te("nuxtSiteConfig.name") ? i18n.t("nuxtSiteConfig.name") : void 0;
}
var i18n_default$1 = defineNuxtPlugin({
	name: "nuxt-site-config:i18n",
	dependsOn: i18nPluginDeps,
	setup(nuxtApp) {
		const i18n = nuxtApp.$i18n;
		if (!i18n) return;
		const stack = getSiteConfigStack();
		const requestProtocol = useRequestURL().protocol;
		const i18nBaseUrl = toValue(i18n.baseUrl);
		if (i18nBaseUrl) {
			const siteConfig = stack.get({ resolveRefs: true });
			const currentUrl = siteConfig.url;
			if (currentUrl && !currentUrl.includes("localhost")) {
				const i18nURL = parseURL(i18nBaseUrl, "https://");
				const siteConfigURL = parseURL(currentUrl, "https://");
				if (i18nURL.host && i18nURL.host !== siteConfigURL.host) {
					if (siteConfig.env === "production") console.error(`[Nuxt Site Config] Your I18n baseUrl \`${i18nURL.host}\` doesn't match your site url ${siteConfigURL.host}. This will cause production SEO issues. Either provide a matching baseUrl or remove the site url config.`);
				}
			}
		}
		{
			const target = new WeakRef(i18n);
			stack.push({
				_priority: SiteConfigPriority.i18n,
				_context: "@nuxtjs/i18n",
				url: createServerGetter(target, resolveI18nUrl, requestProtocol),
				defaultLocale: createServerGetter(target, resolveDefaultLocale),
				currentLocale: createServerGetter(target, resolveCurrentLocale),
				description: createServerGetter(target, resolveDescription),
				name: createServerGetter(target, resolveName)
			});
			return;
		}
	}
});
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fcomponents.plugin.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fcomponents_plugin_default = defineNuxtPlugin({ name: "nuxt:global-components" });
// ../../node_modules/.pnpm/nuxt-site-config@5.1.0_3f384d5806bbc92f23f712545ee63e42/node_modules/nuxt-site-config/dist/runtime/app/composables/useSiteConfig.js
function useSiteConfig(options) {
	const stack = useRequestEvent()?.context.siteConfig?.get(defu({ resolveRefs: true }, options)) || reactive({});
	delete stack._priority;
	return stack;
}
// ../../node_modules/.pnpm/nuxt-seo-utils@9.1.0_74f027baaee2fd75a18687f6c8d3b9ef/node_modules/nuxt-seo-utils/dist/runtime/app/plugins/siteConfig.js
var siteConfig_default = defineNuxtPlugin(() => {
	const head = injectHead();
	if (!head) return;
	const { tagPriority, separator, titleSeparator } = useRuntimeConfig().public["seo-utils"];
	const siteConfig = useSiteConfig();
	const resolvedSeparator = siteConfig.separator || separator || siteConfig.titleSeparator || titleSeparator;
	const resolvedTitleSeparator = siteConfig.titleSeparator || titleSeparator || siteConfig.separator || separator;
	const input = { templateParams: {
		site: siteConfig,
		siteUrl: siteConfig.url,
		siteName: siteConfig.name
	} };
	if (resolvedSeparator) input.templateParams.separator = resolvedSeparator;
	if (resolvedTitleSeparator) input.templateParams.titleSeparator = resolvedTitleSeparator;
	if (siteConfig.description) {
		input.templateParams.siteDescription = siteConfig.description;
		input.meta = [{
			name: "description",
			content: "%site.description",
			tagPriority
		}];
	}
	head.push(input);
});
// ../../node_modules/.pnpm/nuxt-seo-utils@9.1.0_74f027baaee2fd75a18687f6c8d3b9ef/node_modules/nuxt-seo-utils/dist/runtime/app/plugins/inferSeoMetaPlugin.js
var inferSeoMetaPlugin_default = defineNuxtPlugin(() => {
	const head = injectHead();
	if (!head) return;
	head.use(TemplateParamsPlugin);
	const { automaticTwitterTags } = useRuntimeConfig().public["seo-utils"];
	if (automaticTwitterTags === false) head.use(InferSeoMetaPlugin({ twitterCard: false }));
	else head.use(InferSeoMetaPlugin());
});
// ../../node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs
var NUMBER_CHAR_RE = /\d/;
var STR_SPLITTERS = [
	"-",
	"_",
	"/",
	"."
];
function isUppercase(char = "") {
	if (NUMBER_CHAR_RE.test(char)) return;
	return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
	const splitters = STR_SPLITTERS;
	const parts = [];
	if (!str || typeof str !== "string") return parts;
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
function upperFirst(str) {
	return str ? str[0].toUpperCase() + str.slice(1) : "";
}
var titleCaseExceptions = /^(a|an|and|as|at|but|by|for|if|in|is|nor|of|on|or|the|to|with)$/i;
function titleCase(str, opts) {
	return (Array.isArray(str) ? str : splitByCase(str)).filter(Boolean).map((p) => titleCaseExceptions.test(p) ? p.toLowerCase() : upperFirst(p)).join(" ");
}
// ../../node_modules/.pnpm/nuxt-seo-utils@9.1.0_74f027baaee2fd75a18687f6c8d3b9ef/node_modules/nuxt-seo-utils/dist/runtime/app/composables/useFallbackTitle.js
function useFallbackTitle() {
	const route = useRoute();
	const err = useError();
	let i18n;
	try {
		i18n = useNuxtApp().$i18n;
	} catch {}
	return computed(() => {
		if (err.value?.statusCode && [404, 500].includes(err.value.statusCode)) return `${err.value.statusCode} - ${err.value.message}`;
		if (typeof route.meta?.title === "string") return route.meta?.title;
		const lastSegment = withoutTrailingSlash$1(route.path || "/").split("/").pop();
		let fallback = lastSegment ? titleCase(lastSegment) : null;
		const matched = route.matched?.at(-1);
		if (matched) {
			const routeName = String(matched.name).split("___")?.[0];
			if (routeName && i18n) fallback = i18n.t(`pages.${routeName}.title`, fallback || "", { missingWarn: false }) || fallback;
		}
		return fallback;
	});
}
// ../../node_modules/.pnpm/nuxt-seo-utils@9.1.0_74f027baaee2fd75a18687f6c8d3b9ef/node_modules/nuxt-seo-utils/dist/runtime/app/plugins/titlesWaitI18n.js
var titlesWaitI18n_default = defineNuxtPlugin({
	name: "nuxt-seo:fallback-titles",
	env: { islands: false },
	dependsOn: ["nuxt-site-config:i18n"],
	setup() {
		const title = useFallbackTitle();
		useHead({ title: () => title.value }, { tagPriority: 101 });
	}
});
// ../../node_modules/.pnpm/site-config-stack@5.1.0_vue@3.5.46_typescript@5.9.3_/node_modules/site-config-stack/dist/urls.mjs
var FILE_EXT_RE = /\.[0-9a-z]+$/i;
function resolveSitePath(pathOrUrl, options) {
	let path = pathOrUrl;
	if (hasProtocol$1(pathOrUrl, {
		strict: false,
		acceptRelative: true
	})) path = parseURL(pathOrUrl).pathname;
	const base = withLeadingSlash(options.base || "/");
	if (base !== "/" && path.startsWith(base)) path = path.slice(base.length);
	let origin = withoutTrailingSlash$1(options.absolute ? options.siteUrl : "");
	if (base !== "/" && origin.endsWith(base)) origin = origin.slice(0, origin.indexOf(base));
	const baseWithOrigin = options.withBase ? withBase$1(base, origin || "/") : origin;
	const resolvedUrl = withBase$1(path, baseWithOrigin);
	return path === "/" && !options.withBase ? withTrailingSlash$1(resolvedUrl) : fixSlashes(options.trailingSlash, resolvedUrl, options.fileExtensions);
}
var fileExtensions = [
	"jpg",
	"jpeg",
	"png",
	"gif",
	"bmp",
	"webp",
	"svg",
	"ico",
	"heic",
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
	"zip",
	"rar",
	"7z",
	"tar",
	"gz",
	"mp3",
	"wav",
	"flac",
	"ogg",
	"opus",
	"m4a",
	"aac",
	"midi",
	"mid",
	"mp4",
	"avi",
	"mkv",
	"mov",
	"wmv",
	"flv",
	"webm",
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
	"php",
	"py",
	"rb",
	"java",
	"c",
	"cpp",
	"h",
	"go",
	"csv",
	"tsv",
	"sql",
	"yaml",
	"yml",
	"fits",
	"stl",
	"obj",
	"step",
	"3mf",
	"kml",
	"kmz",
	"geojson",
	"woff",
	"woff2",
	"ttf",
	"otf",
	"eot",
	"exe",
	"msi",
	"apk",
	"ipa",
	"dmg",
	"iso",
	"bin",
	"bat",
	"cmd",
	"sh",
	"env",
	"htaccess",
	"conf",
	"toml",
	"ini",
	"deb",
	"rpm",
	"jar",
	"war",
	"epub",
	"mobi",
	"log",
	"tmp",
	"bak",
	"old",
	"sav"
];
function isPathFile(path, extraExtensions) {
	const extension = (path.split("/").pop() || path).match(FILE_EXT_RE)?.[0].slice(1);
	if (!extension) return false;
	if (fileExtensions.includes(extension)) return true;
	const lowerExtension = extension.toLowerCase();
	return Array.isArray(extraExtensions) && extraExtensions.some((extra) => typeof extra === "string" && extra.replace(/^\./, "").toLowerCase() === lowerExtension);
}
function fixSlashes(trailingSlash, pathOrUrl, extraExtensions) {
	const $url = parseURL(pathOrUrl);
	if (isPathFile($url.pathname, extraExtensions)) return pathOrUrl;
	const fixedPath = trailingSlash ? withTrailingSlash$1($url.pathname) : withoutTrailingSlash$1($url.pathname);
	return `${$url.protocol ? `${$url.protocol}//` : ""}${$url.host || ""}${fixedPath}${$url.search || ""}${$url.hash || ""}`;
}
// ../../node_modules/.pnpm/nuxt-site-config@5.1.0_3f384d5806bbc92f23f712545ee63e42/node_modules/nuxt-site-config/dist/runtime/app/composables/getNitroOrigin.js
function getNitroOrigin(e) {
	e = e || useRequestEvent();
	return e?.context?.siteConfigNitroOrigin || "";
}
// ../../node_modules/.pnpm/nuxt-site-config@5.1.0_3f384d5806bbc92f23f712545ee63e42/node_modules/nuxt-site-config/dist/runtime/app/composables/utils.js
function createSitePathResolver(options = {}) {
	const siteConfig = useSiteConfig();
	const nitroOrigin = getNitroOrigin();
	const nuxtBase = useRuntimeConfig().app.baseURL || "/";
	return (path) => {
		return computed(() => resolveSitePath(unref(path), {
			absolute: unref(options.absolute),
			withBase: unref(options.withBase),
			siteUrl: unref(options.canonical) !== false || false ? siteConfig.url : nitroOrigin,
			trailingSlash: siteConfig.trailingSlash,
			fileExtensions: siteConfig.fileExtensions,
			base: nuxtBase
		}));
	};
}
// ../../node_modules/.pnpm/nuxt-seo-utils@9.1.0_74f027baaee2fd75a18687f6c8d3b9ef/node_modules/nuxt-seo-utils/dist/runtime/shared/canonicalUrl.js
var LOCALE_UNDERSCORE_RE$1 = /_/g;
var DEFAULT_LOCALE = "en";
function normaliseCanonicalUrl(url, { lowercase, locale }) {
	if (!lowercase) return url;
	const parsed = parseURL(url);
	if (parsed.host) parsed.host = parsed.host.toLowerCase();
	parsed.pathname = lowercasePath(parsed.pathname, locale);
	return stringifyParsedURL(parsed);
}
function lowercasePath(path, locale) {
	try {
		return path.toLocaleLowerCase(locale ? locale.replace(LOCALE_UNDERSCORE_RE$1, "-") : DEFAULT_LOCALE);
	} catch {
		return path.toLowerCase();
	}
}
function resolveCanonicalUrl(url, query, options) {
	const normalised = normaliseCanonicalUrl(url, options);
	const filteredQuery = Object.fromEntries(Object.entries(query).filter(([key]) => options.queryWhitelist.includes(key)).sort(([a], [b]) => a.localeCompare(b)));
	return Object.keys(filteredQuery).length ? `${normalised}?${stringifyQuery$2(filteredQuery)}` : normalised;
}
var OG_URL_KEY = "nuxt-seo-utils:og-url";
// ../../node_modules/.pnpm/nuxt-seo-utils@9.1.0_74f027baaee2fd75a18687f6c8d3b9ef/node_modules/nuxt-seo-utils/dist/runtime/app/logic/applyDefaults.js
var LOCALE_UNDERSCORE_RE = /_/g;
function applyDefaults() {
	const siteConfig = useSiteConfig({ resolveRefs: false });
	const resolveCurrentLocale = () => {
		return (toValue(siteConfig.currentLocale) || toValue(siteConfig.defaultLocale) || "en").replace(LOCALE_UNDERSCORE_RE, "-");
	};
	injectHead().use(TemplateParamsPlugin);
	const { canonicalQueryWhitelist, canonicalLowercase, tagPriority, separator, titleSeparator } = useRuntimeConfig().public["seo-utils"];
	const err = useError();
	const resolveSeparator = () => toValue(siteConfig.separator) || separator || toValue(siteConfig.titleSeparator) || titleSeparator;
	const resolveTitleSeparator = () => toValue(siteConfig.titleSeparator) || titleSeparator || toValue(siteConfig.separator) || separator;
	const minimalPriority = { tagPriority: "low" };
	const input = {
		htmlAttrs: { lang: resolveCurrentLocale },
		templateParams: {
			site: () => siteConfig,
			siteName: () => siteConfig.name,
			separator: resolveSeparator,
			titleSeparator: resolveTitleSeparator
		},
		titleTemplate: () => err.value ? "%s" : "%s %separator %siteName"
	};
	const route = useRoute();
	const resolveUrl = createSitePathResolver({
		withBase: true,
		absolute: true
	});
	const canonicalUrl = computed(() => {
		if (err.value) return false;
		return {
			rel: "canonical",
			href: resolveCanonicalUrl(resolveUrl(route.path || "/").value || route.path, route.query, {
				lowercase: canonicalLowercase,
				locale: resolveCurrentLocale(),
				queryWhitelist: canonicalQueryWhitelist
			})
		};
	});
	const seoMetaPriority = { tagPriority };
	input.link = [() => canonicalUrl.value];
	useHead(input, minimalPriority);
	useSeoMeta({ ogLocale: () => {
		const locale = resolveCurrentLocale();
		if (locale) {
			const l = locale.replace("-", "_");
			if (l.includes("_")) return l;
		}
		return false;
	} }, minimalPriority);
	const seoMeta = {
		ogType: "website",
		ogSiteName: siteConfig.name
	};
	if (siteConfig.description) useSeoMeta({ description: siteConfig.description }, minimalPriority);
	if (siteConfig.twitter) {
		const id = siteConfig.twitter.startsWith("@") ? siteConfig.twitter : `@${siteConfig.twitter}`;
		seoMeta.twitterCreator = id;
		seoMeta.twitterSite = id;
	}
	useSeoMeta(seoMeta, seoMetaPriority);
	useHead({ meta: [{
		property: "og:url",
		content: () => {
			const url = canonicalUrl.value;
			return url ? url.href : false;
		},
		key: OG_URL_KEY
	}] }, seoMetaPriority);
}
// ../../node_modules/.pnpm/nuxt-seo-utils@9.1.0_74f027baaee2fd75a18687f6c8d3b9ef/node_modules/nuxt-seo-utils/dist/runtime/app/plugins/defaultsWaitI18n.js
var defaultsWaitI18n_default = defineNuxtPlugin({
	name: "nuxt-seo:defaults",
	env: { islands: false },
	dependsOn: ["nuxt-site-config:i18n"],
	setup() {
		applyDefaults();
	}
});
// ../../node_modules/.pnpm/nuxt-seo-utils@9.1.0_74f027baaee2fd75a18687f6c8d3b9ef/node_modules/nuxt-seo-utils/dist/runtime/app/logic/syncDerivedTags.js
function entryOf(tag) {
	return tag._p === void 0 ? void 0 : tag._p >> 10;
}
function metaKey(tag) {
	const key = tag.props.property ?? tag.props.name;
	return typeof key === "string" ? key : void 0;
}
function isOgImage(tag) {
	return tag.tag === "meta" && metaKey(tag) === "og:image";
}
function ogImageEntryIds(entryTags) {
	const ids = /* @__PURE__ */ new Set();
	for (const tags of entryTags) {
		const tag = tags.find(isOgImage);
		const id = tag && entryOf(tag);
		if (id !== void 0) ids.add(id);
	}
	return ids;
}
function syncDerivedTags(tags, entriesWithOgImage) {
	const winningOgImageEntries = /* @__PURE__ */ new Set();
	let canonicalTag;
	for (const tag of tags) {
		if (isOgImage(tag)) winningOgImageEntries.add(entryOf(tag));
		if (!canonicalTag && tag.tag === "link" && tag.props.rel === "canonical") canonicalTag = tag;
	}
	const canonicalHref = canonicalTag?.props.href;
	const lostOgImage = (tag) => {
		const entry = entryOf(tag);
		return entry !== void 0 && entriesWithOgImage.has(entry) && !winningOgImageEntries.has(entry);
	};
	const result = [];
	for (const tag of tags) {
		if (tag.tag === "meta") {
			if (metaKey(tag)?.startsWith("og:image:") && lostOgImage(tag)) continue;
			if (tag.key?.startsWith("nuxt-seo-utils:twitter-image-fallback") && lostOgImage(tag)) continue;
			if (tag.key === "nuxt-seo-utils:og-url") {
				if (typeof canonicalHref !== "string" || !canonicalHref) continue;
				result.push({
					...tag,
					props: {
						...tag.props,
						content: canonicalHref
					}
				});
				continue;
			}
		}
		result.push(tag);
	}
	return result;
}
// ../../node_modules/.pnpm/nuxt-seo-utils@9.1.0_74f027baaee2fd75a18687f6c8d3b9ef/node_modules/nuxt-seo-utils/dist/runtime/app/plugins/derivedTags.js
var derivedTags_default = defineNuxtPlugin({
	name: "nuxt-seo:derived-tags",
	setup() {
		const head = injectHead();
		head.use({
			key: "nuxt-seo-utils:derived-tags",
			hooks: { "tags:beforeResolve": (ctx) => {
				const entryTags = [...head.entries.values()].map((entry) => entry._tags || entry._precomputedTags || []);
				ctx.tags = syncDerivedTags(ctx.tags, ogImageEntryIds(entryTags));
			} }
		});
	}
});
// ../../node_modules/.pnpm/@nuxtjs+robots@7.1.0_3f384d5806bbc92f23f712545ee63e42/node_modules/@nuxtjs/robots/dist/runtime/app/plugins/robot-meta.server.js
var robot_meta_server_default = defineNuxtPlugin({ setup(nuxtApp) {
	const event = useRequestEvent();
	const ctx = event?.context?.robots;
	event?.context?.robotsProduction;
	if (!ctx || !event) return;
	const { robotsDisabledValue } = useRuntimeConfig()["nuxt-robots"];
	useHead({ meta: [{
		"name": "robots",
		"content": () => ctx.rule || "",
		"data-hint": () => void 0,
		"data-production-content": () => void 0
	}] });
} });
// ../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/routing/navigation.js
function createNavigationResolver(config) {
	const { strategy, compactRoutes } = config;
	function isUnlocalizedRoute(to) {
		if (strategy === "no_prefix" || to.name == null) return false;
		const name = String(to.name);
		if (getRouteBaseName(name) !== name) return false;
		if (compactRoutes && to.matched.some((r) => r.meta.__i18nCompact)) return false;
		return !config.getLocaleCodes().some((code) => config.hasRoute(getLocalizedRouteName(name, code, false)));
	}
	return function resolveNavigation(to, locale, pendingLocale = false) {
		const reach = config.localeReach?.(locale);
		if (reach === "off-host") return;
		if (reach === "other-domain") {
			if (isUnlocalizedRoute(to) || pendingLocale) return;
			const destination2 = config.switchLocalePath(locale, to);
			if (!destination2 || !hasProtocol$1(destination2, { strict: true })) return;
			return {
				path: destination2,
				code: config.redirectStatusCode,
				external: true
			};
		}
		if (to.path === "/" && config.rootRedirect) return {
			path: config.localePath(config.rootRedirect.path, locale),
			code: config.rootRedirect.code
		};
		if (isUnlocalizedRoute(to)) return;
		if (pendingLocale) return;
		if (config.routeLocale(to) === locale) return;
		const destination = config.switchLocalePath(locale, to) || config.localePath(to.fullPath, locale);
		if (isEqual$1(destination, to.fullPath)) return;
		return {
			path: destination,
			code: config.redirectStatusCode
		};
	};
}
// ../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/shared/messages.js
var cacheMessages = /* @__PURE__ */ new Map();
function cloneDeep(value) {
	if (value == null || typeof value !== "object") return value;
	if (Array.isArray(value)) return value.map(cloneDeep);
	const out = create(null);
	for (const key of Object.keys(value)) out[key] = cloneDeep(value[key]);
	return out;
}
var isTree = (value) => value != null && typeof value === "object" && !Array.isArray(value);
function fillMissing(over, base) {
	return isTree(over) && isTree(base) ? fillTree(over, base) : over;
}
function fillTree(over, base) {
	let out = over;
	for (const key of Object.keys(base)) {
		const has = Object.hasOwn(over, key);
		const current = over[key];
		const filled = !has ? base[key] : isTree(current) && isTree(base[key]) ? fillTree(current, base[key]) : current;
		if (has && filled === current) continue;
		if (out === over) out = assign(create(null), over);
		out[key] = filled;
	}
	return out;
}
var merger = createDefu((obj, key, value) => {
	if (key === "messages" || key === "datetimeFormats" || key === "numberFormats") {
		obj[key] ??= create(null);
		deepCopy(value, obj[key]);
		return true;
	}
});
async function loadVueI18nOptions(vueI18nConfigs) {
	const nuxtApp = useNuxtApp();
	let vueI18nOptions = { messages: create(null) };
	for (const configFile of vueI18nConfigs) {
		const resolver = await configFile().then((x) => isModule(x) ? x.default : x);
		const resolved = isFunction(resolver) ? await nuxtApp.runWithContext(() => resolver()) : resolver;
		vueI18nOptions = merger(create(null), resolved, vueI18nOptions);
	}
	vueI18nOptions.fallbackLocale ??= false;
	return vueI18nOptions;
}
var isModule = (val) => toTypeString(val) === "[object Module]";
async function getLocaleMessages(locale, loader) {
	const nuxtApp = useNuxtApp();
	try {
		const getter = await nuxtApp.runWithContext(loader.load).then((x) => isModule(x) ? x.default : x);
		return isFunction(getter) ? await nuxtApp.runWithContext(() => getter(locale)) : getter;
	} catch (e) {
		throw new Error(`Failed loading locale (${locale}): ` + e.message, { cause: e });
	}
}
async function getLocaleMessagesMergedCached(locale, loaders = []) {
	const nuxtApp = useNuxtApp();
	const messages = await Promise.all(loaders.map(async (loader) => {
		const cached = getCachedMessages(loader);
		const messages2 = cached || await nuxtApp.runWithContext(() => getLocaleMessages(locale, loader));
		if (!cached && loader.cache !== false) cacheMessages.set(loader.key, {
			ttl: Date.now() + 864e5,
			value: messages2
		});
		return messages2;
	}));
	const merged = {};
	for (const message of messages) deepCopy(message, merged);
	return merged;
}
function getCachedMessages(loader) {
	if (loader.cache === false) return;
	const cache = cacheMessages.get(loader.key);
	if (cache == null) return;
	return cache.ttl > Date.now() ? cache.value : void 0;
}
// ../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/shared/delivery.js
function createPrerenderablePredicate(config) {
	return (locale) => !config.dynamic.includes(locale) && !config.undeliverable.includes(locale);
}
function createRuntimeLoaderPredicate(config) {
	return (locale) => config.undeliverable.includes(locale) || config.dynamic.includes(locale) && (config.ssg);
}
// ../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/compatibility.js
function getI18nTarget(i18n) {
	return i18n != null && "global" in i18n && "mode" in i18n ? i18n.global : i18n;
}
function getComposer(i18n) {
	const target = getI18nTarget(i18n);
	return "__composer" in target ? target.__composer : target;
}
// ../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/shared/utils.js
function useRuntimeI18n(nuxtApp) {
	return nuxtApp.$config.public.i18n;
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
	if (!config) return;
	return {
		path: "/" + (isString(config) ? config : config.path).replace(/^\//, ""),
		code: !isString(config) && config.statusCode || 302
	};
}
var HTML_ESCAPES = {
	"&": "&amp;",
	"\"": "&quot;",
	"'": "&#39;",
	"<": "&lt;",
	">": "&gt;"
};
function escapeHtmlAttr(value) {
	return value.replace(/["'&<>]/g, (c) => HTML_ESCAPES[c]);
}
// ../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/context.js
var useLocaleConfigs = () => useState("i18n:cached-locale-configs", () => void 0);
var useResolvedLocale = () => useState("i18n:resolved-locale", () => "");
function withConfiguredProtocol(url, baseUrl) {
	const protocol = !isFunction(baseUrl) && parseURL(baseUrl).protocol;
	return protocol ? {
		host: url.host,
		protocol
	} : url;
}
function createBaseUrlGetter(opts) {
	const { baseUrl, appBase, getDomainFromLocale } = opts;
	const base = isFunction(baseUrl) ? baseUrl : () => baseUrl || "";
	return (locale) => joinURL$1(locale && getDomainFromLocale(locale) || base(), appBase);
}
function useI18nCookie({ cookieCrossOrigin, cookieDomain, cookieSecure, cookieKey }) {
	const date = /* @__PURE__ */ new Date();
	return useCookie(cookieKey || "i18n_redirected", {
		path: "/",
		readonly: false,
		expires: new Date(date.setDate(date.getDate() + 365)),
		sameSite: cookieCrossOrigin ? "none" : "lax",
		domain: cookieDomain || void 0,
		secure: cookieCrossOrigin || cookieSecure
	});
}
var isPrerenderable = createPrerenderablePredicate({
	dynamic: [],
	undeliverable: []
});
function createMessageInstaller(i18n, flatJson = false) {
	const byRef = /* @__PURE__ */ new Map();
	const merge = i18n.mergeLocaleMessage.bind(i18n);
	const set = i18n.setLocaleMessage.bind(i18n);
	i18n.mergeLocaleMessage = ((locale, message) => {
		if (byRef.delete(locale)) set(locale, cloneDeep(i18n.getLocaleMessage(locale)));
		merge(locale, message);
	});
	i18n.setLocaleMessage = ((locale, message) => {
		byRef.delete(locale);
		set(locale, message);
	});
	return (locale, message) => {
		if (flatJson) message = cloneDeep(message);
		if (byRef.get(locale) === message) return;
		if (byRef.has(locale)) {
			i18n.mergeLocaleMessage(locale, message);
			return;
		}
		set(locale, fillMissing(message, i18n.getLocaleMessage(locale)));
		byRef.set(locale, message);
	};
}
function createNuxtI18nContext(nuxt, vueI18n, defaultLocale, flatJson = false) {
	const i18n = getI18nTarget(vueI18n);
	const installMessages = createMessageInstaller(getComposer(vueI18n), flatJson);
	const runtimeI18n = useRuntimeI18n(nuxt);
	const detectConfig = useI18nDetection(runtimeI18n);
	const serverLocaleConfigs = useLocaleConfigs();
	const localeCookie = useI18nCookie(detectConfig);
	const $fetch = useRequestFetch();
	const loadMap = /* @__PURE__ */ new Set();
	const getLocaleConfig = (locale) => serverLocaleConfigs.value[locale];
	let url;
	const requestUrl = () => url ??= withConfiguredProtocol(useRequestURL({ xForwardedHost: true }), runtimeI18n.baseUrl);
	const getDomainFromLocale = (locale) => domainFromLocale(runtimeI18n.domainLocales, requestUrl(), locale);
	const getBaseUrl = createBaseUrlGetter({
		baseUrl: isFunction(runtimeI18n.baseUrl) ? () => runtimeI18n.baseUrl(nuxt) : runtimeI18n.baseUrl,
		appBase: nuxt.$config.app.baseURL,
		getDomainFromLocale
	});
	const getCanonicalBaseUrl = getBaseUrl;
	const resolvedLocale = useResolvedLocale();
	if (nuxt.ssrContext?.event?.context?.nuxtI18n?.detectLocale) resolvedLocale.value = nuxt.ssrContext.event.context.nuxtI18n.detectLocale;
	const buildUsesRuntimeLoaders = createRuntimeLoaderPredicate({
		ssg: false,
		dynamic: [],
		undeliverable: []
	});
	const cdnPrefix = (locale) => "";
	const loadMessagesFromLoaders = async (locale) => {
		if (locale in localeLoaders === false) return;
		const loaded = await nuxt.runWithContext(() => getLocaleMessagesMergedCached(locale, localeLoaders[locale]));
		const msg = flatJson ? cloneDeep(loaded) : loaded;
		i18n.mergeLocaleMessage(locale, msg);
	};
	const loadMessagesFromServer = async (locale) => {
		if (locale in localeLoaders === false) return;
		const deliverable = (messages2) => Object.keys(messages2).filter((k) => !ctx.usesRuntimeLoaders(k));
		const serverCtx = nuxt.ssrContext?.event?.context?.nuxtI18n;
		if (serverCtx?.loadMessages && installMessages) {
			const messages2 = await serverCtx.loadMessages(locale);
			for (const k of deliverable(messages2)) installMessages(k, messages2[k]);
			return;
		}
		const headers = getLocaleConfig(locale)?.cacheable ? {} : { "Cache-Control": "no-cache" };
		const url2 = joinURL$1(cdnPrefix(), "/_i18n", {
			"fr": "aba0262c",
			"en": "aba0262c"
		}[locale], locale, "messages.json");
		const messages = await $fetch(url2, { headers });
		for (const k of deliverable(messages)) i18n.mergeLocaleMessage(k, messages[k]);
	};
	const ctx = {
		vueI18n,
		initial: true,
		preloaded: false,
		config: runtimeI18n,
		rootRedirect: resolveRootRedirect(runtimeI18n.rootRedirect),
		redirectStatusCode: runtimeI18n.redirectStatusCode ?? 302,
		usesRuntimeLoaders: (locale) => buildUsesRuntimeLoaders(locale),
		getDefaultLocale: () => defaultLocale,
		getLocale: () => unref(i18n.locale),
		setLocale: async (locale) => {
			const oldLocale = ctx.getLocale();
			if (locale === oldLocale || !isSupportedLocale(locale)) return;
			if (isRef(i18n.locale)) i18n.locale.value = locale;
			else i18n.locale = locale;
			await nuxt.callHook("i18n:localeSwitched", {
				newLocale: locale,
				oldLocale
			});
			resolvedLocale.value = locale;
		},
		setLocaleSuspend: async (locale) => {
			if (!isSupportedLocale(locale)) return;
			ctx.vueI18n.__pendingLocale = locale;
			ctx.vueI18n.__pendingLocalePromise = new Promise((resolve) => {
				ctx.vueI18n.__resolvePendingLocalePromise = async () => {
					ctx.setCookieLocale(locale);
					await ctx.setLocale(locale);
					ctx.vueI18n.__pendingLocale = void 0;
					resolve();
				};
			});
			await ctx.vueI18n.__resolvePendingLocalePromise?.();
		},
		getLocales: () => unref(i18n.locales).map((x) => isString(x) ? {
			code: x,
			domains: [],
			defaultForDomains: []
		} : x),
		setCookieLocale: (locale) => {
			if (detectConfig.useCookie && isSupportedLocale(locale)) localeCookie.value = locale;
		},
		getBaseUrl,
		getCanonicalBaseUrl,
		loadMessages: async (locale) => {
			if (nuxt.isHydrating && loadMap.has(locale)) return;
			try {
				const fallbacks = getLocaleConfig(locale)?.fallbacks ?? [];
				const chain = fallbacks.includes(locale) ? fallbacks : [...fallbacks, locale];
				if (!chain.some((x) => ctx.usesRuntimeLoaders(x))) return await loadMessagesFromServer(locale);
				await Promise.all(chain.map(async (k) => {
					try {
						await (ctx.usesRuntimeLoaders(k) ? loadMessagesFromLoaders(k) : loadMessagesFromServer(k));
					} catch (e) {
						console.warn(`Failed to load messages for locale "${k}"`, e);
					}
				}));
			} catch (e) {
				console.warn(`Failed to load messages for locale "${locale}"`, e);
			} finally {
				loadMap.add(locale);
			}
		},
		composableCtx: void 0
	};
	ctx.composableCtx = createComposableContext(ctx, nuxt);
	return ctx;
}
function useNuxtI18nContext(nuxt) {
	if (nuxt._nuxtI18n == null) throw new Error("Nuxt I18n context has not been set up yet.");
	return nuxt._nuxtI18n;
}
// ../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/kit/browser.js
function matchBrowserLocale(locales, browserLocales) {
	const matchedLocales = [];
	for (const [index, browserCode] of browserLocales.entries()) {
		const matchedLocale = locales.find((l) => l.language?.toLowerCase() === browserCode.toLowerCase());
		if (matchedLocale) {
			matchedLocales.push({
				code: matchedLocale.code,
				score: 1 - index / browserLocales.length
			});
			break;
		}
	}
	for (const [index, browserCode] of browserLocales.entries()) {
		const languageCode = browserCode.split("-")[0].toLowerCase();
		const matchedLocale = locales.find((l) => l.language?.split("-")[0].toLowerCase() === languageCode);
		if (matchedLocale) {
			matchedLocales.push({
				code: matchedLocale.code,
				score: .999 - index / browserLocales.length
			});
			break;
		}
	}
	return matchedLocales;
}
function compareBrowserLocale(a, b) {
	if (a.score === b.score) return b.code.length - a.code.length;
	return b.score - a.score;
}
function findBrowserLocale(locales, browserLocales) {
	return matchBrowserLocale(locales.map((l) => ({
		code: l.code,
		language: l.language || l.code
	})), browserLocales).sort(compareBrowserLocale).at(0)?.code ?? "";
}
// ../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/shared/request.js
function getRequestHeaders(event) {
	const req = event.req;
	return typeof req?.headers?.get === "function" ? req.headers : event.headers;
}
function getRequestHeader(event, name) {
	return getRequestHeaders(event).get(name) ?? void 0;
}
function getRequestCookie(event, name) {
	return parse$2(getRequestHeader(event, "cookie") || "")[name];
}
// ../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/shared/detection.js
var getCookieLocale = (event, cookieName) => getRequestCookie(event, cookieName) || void 0;
var getRouteLocale = (event, route) => getLocaleFromRoute(route);
var getHeaderLocale = (event) => findBrowserLocale(normalizedLocales, parseAcceptLanguage(getRequestHeader(event, "accept-language") || ""));
var getRefererHost = (event) => {
	const referer = getRequestHeader(event, "referer");
	try {
		return referer && new URL(referer).host || void 0;
	} catch {
		return;
	}
};
var useDetectors = (event, config, runtimeI18n, host) => {
	if (!event) throw new Error("A request event is required for server-side locale detection");
	let locales;
	const getLocales = () => locales ??= getDomainLocales(runtimeI18n.domainLocales);
	return {
		cookie: () => getCookieLocale(event, config.cookieKey),
		header: () => getHeaderLocale(event),
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
		if (detection.redirectOn === "root" && path !== "/") return true;
		if (detection.redirectOn === "no prefix" && !detection.alwaysRedirect && isSupported(pathLocale)) return true;
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
			yield detectors.route(route);
			if (detecting) yield onHost(detection.fallbackLocale);
		}
		for (const detected of detect()) if (detected && isSupported(detected)) return detected;
		return "";
	};
}
// ../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/utils.js
async function loadAndSetLocale(nuxtApp, locale) {
	const ctx = useNuxtI18nContext(nuxtApp);
	const oldLocale = ctx.getLocale();
	if (locale === oldLocale && !ctx.initial && (!ctx.vueI18n.__pendingLocale || ctx.vueI18n.__pendingLocale === locale)) return locale;
	const data = {
		oldLocale,
		newLocale: locale,
		initialSetup: ctx.initial,
		context: nuxtApp
	};
	let override = await nuxtApp.callHook("i18n:beforeLocaleSwitch", data);
	override ??= data.newLocale;
	if (isSupportedLocale(override)) locale = override;
	await ctx.loadMessages(locale);
	await ctx.setLocaleSuspend(locale);
	return locale;
}
var getHost = () => "";
function detectLocale(nuxtApp, route) {
	const runtimeI18n = useRuntimeI18n(nuxtApp);
	const detectConfig = useI18nDetection(runtimeI18n);
	const detectors = useDetectors(useRequestEvent(nuxtApp), detectConfig, runtimeI18n, getHost());
	const ctx = useNuxtI18nContext(nuxtApp);
	return createLocaleDetector({
		detection: detectConfig})(detectors, route, ctx.initial) || ctx.getLocale() || ctx.getDefaultLocale() || "";
}
function navigate(nuxtApp, to, locale) {
	const ctx = useNuxtI18nContext(nuxtApp);
	const _ctx = useComposableContext(nuxtApp);
	const runtimeI18n = useRuntimeI18n(nuxtApp);
	const host = getHost();
	const detectors = useDetectors(useRequestEvent(nuxtApp), useI18nDetection(runtimeI18n), runtimeI18n, host);
	const resolved = createNavigationResolver({
		localeReach: void 0,
		rootRedirect: ctx.rootRedirect,
		redirectStatusCode: ctx.redirectStatusCode,
		localePath: (path, locale2) => localePath$1(_ctx, path, locale2),
		switchLocalePath: (locale2, route) => switchLocalePath(_ctx, locale2, route),
		routeLocale: (route) => detectors.route(route),
		hasRoute: (name) => _ctx.router.hasRoute(name),
		getLocaleCodes: () => _ctx.getLocales().map((locale2) => locale2.code),
		strategy: "prefix_except_default",
		compactRoutes: false
	})(to, locale, !!ctx.vueI18n.__pendingLocale && !!nuxtApp._processingMiddleware);
	if (resolved) return navigateTo(resolved.path, {
		redirectCode: resolved.code,
		external: resolved.external
	});
}
// ../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/routing/i18n.js
function extendI18n(i18n, { extendComposer, extendComposerInstance }) {
	const scope = effectScope();
	const installI18n = i18n.install.bind(i18n);
	i18n.install = (app, ...options) => {
		const pluginOptions = assign({}, options[0]);
		pluginOptions.__composerExtend = (c) => {
			extendComposerInstance(c, getComposer(i18n));
			return () => {};
		};
		if (i18n.mode === "legacy") pluginOptions.__vueI18nExtend = (vueI18n) => {
			extendComposerInstance(vueI18n, getComposer(vueI18n));
			return () => {};
		};
		Reflect.apply(installI18n, i18n, [app, pluginOptions]);
		const globalComposer = getComposer(i18n);
		scope.run(() => {
			extendComposer(globalComposer);
			if (i18n.mode === "legacy" && "__composer" in i18n.global) extendComposerInstance(i18n.global, getComposer(i18n.global));
		});
		if (i18n.mode === "composition" && app.config.globalProperties.$i18n != null) extendComposerInstance(app.config.globalProperties.$i18n, globalComposer);
		if (app.unmount) {
			const unmountApp = app.unmount.bind(app);
			app.unmount = () => {
				scope.stop();
				unmountApp();
			};
		}
	};
}
// ../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/shared/vue-i18n.js
var setupVueI18nOptions = async (defaultLocale) => {
	const options = await loadVueI18nOptions(vueI18nConfigs);
	options.locale = defaultLocale || options.locale || "en-US";
	options.defaultLocale = defaultLocale;
	options.fallbackLocale ??= false;
	options.messages ??= {};
	for (const locale of localeCodes) options.messages[locale] ??= {};
	return options;
};
// ../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/plugins/i18n.js
var i18n_default = defineNuxtPlugin({
	name: "i18n:plugin",
	parallel: false,
	async setup(nuxt) {
		let __temp, __restore;
		Object.defineProperty(nuxt.versions, "nuxtI18n", { get: () => "10.7.0" });
		const runtimeI18n = useRuntimeI18n(nuxt);
		const event = useRequestEvent(nuxt);
		const preloadedOptions = event?.context?.nuxtI18n?.vueI18nOptions;
		const host = useRequestURL({ xForwardedHost: true }).host;
		const _defaultLocale = resolveDefaultLocale$1(host, runtimeI18n.defaultLocale, getDomainLocales(runtimeI18n.domainLocales));
		const optionsI18n = preloadedOptions || ([__temp, __restore] = executeAsync(() => setupVueI18nOptions(_defaultLocale)), __temp = await __temp, __restore(), __temp);
		const localeConfigs = useLocaleConfigs();
		localeConfigs.value = event.context.nuxtI18n?.localeConfigs || {};
		prerenderRoutes(localeCodes.filter(isPrerenderable).map((locale) => `/_i18n/${{
			"fr": "aba0262c",
			"en": "aba0262c"
		}[locale]}/${locale}/messages.json`));
		const i18n = createI18n(optionsI18n);
		const detectors = useDetectors(event, useI18nDetection(runtimeI18n), runtimeI18n, host);
		const ctx = createNuxtI18nContext(nuxt, i18n, optionsI18n.defaultLocale, !!optionsI18n.flatJson);
		nuxt._nuxtI18n = ctx;
		extendI18n(i18n, {
			extendComposer(composer) {
				composer.locales = computed(() => runtimeI18n.locales.map((locale) => withRuntimeDomain(locale, runtimeI18n.domainLocales)));
				composer.localeCodes = computed(() => localeCodes);
				const _baseUrl = ref(ctx.getBaseUrl());
				composer.baseUrl = computed(() => _baseUrl.value);
				composer.strategy = "prefix_except_default";
				composer.localeProperties = computed(() => withRuntimeDomain(normalizedLocales.find((l) => l.code === composer.locale.value) || {
					code: composer.locale.value,
					domains: [],
					defaultForDomains: []
				}, runtimeI18n.domainLocales));
				composer.setLocale = async (locale) => {
					await loadAndSetLocale(nuxt, locale);
					await nuxt.runWithContext(() => navigate(nuxt, nuxt.$router.currentRoute.value, locale));
				};
				composer.loadLocaleMessages = ctx.loadMessages;
				composer.differentDomains = false;
				composer.defaultLocale = optionsI18n.defaultLocale;
				composer.getBrowserLocale = () => resolveSupportedLocale(detectors.header());
				composer.getLocaleCookie = () => resolveSupportedLocale(detectors.cookie());
				composer.setLocaleCookie = ctx.setCookieLocale;
				composer.finalizePendingLocaleChange = async () => {
					if (!i18n.__pendingLocale) return;
					await i18n.__resolvePendingLocalePromise?.();
				};
				composer.waitForPendingLocaleChange = async () => {
					await i18n?.__pendingLocalePromise;
				};
			},
			extendComposerInstance(instance, c) {
				const props = [
					["locales", () => c.locales],
					["localeCodes", () => c.localeCodes],
					["baseUrl", () => c.baseUrl],
					["strategy", () => "prefix_except_default"],
					["localeProperties", () => c.localeProperties],
					["setLocale", () => (locale) => Reflect.apply(c.setLocale, c, [locale])],
					["loadLocaleMessages", () => (locale) => Reflect.apply(c.loadLocaleMessages, c, [locale])],
					["differentDomains", () => false],
					["defaultLocale", () => c.defaultLocale],
					["getBrowserLocale", () => () => Reflect.apply(c.getBrowserLocale, c, [])],
					["getLocaleCookie", () => () => Reflect.apply(c.getLocaleCookie, c, [])],
					["setLocaleCookie", () => (locale) => Reflect.apply(c.setLocaleCookie, c, [locale])],
					["finalizePendingLocaleChange", () => () => Reflect.apply(c.finalizePendingLocaleChange, c, [])],
					["waitForPendingLocaleChange", () => () => Reflect.apply(c.waitForPendingLocaleChange, c, [])]
				];
				for (const [key, get] of props) Object.defineProperty(instance, key, { get });
			}
		});
		nuxt.vueApp.use(i18n);
		Object.defineProperty(nuxt, "$i18n", { get: () => getI18nTarget(i18n) });
		nuxt.provide("localeHead", (options) => localeHead(nuxt._nuxtI18n.composableCtx, options));
		nuxt.provide("localePath", useLocalePath(nuxt));
		nuxt.provide("localeRoute", useLocaleRoute(nuxt));
		nuxt.provide("routeBaseName", useRouteBaseName(nuxt));
		nuxt.provide("getRouteBaseName", useRouteBaseName(nuxt));
		nuxt.provide("switchLocalePath", useSwitchLocalePath(nuxt));
	}
});
// ../../node_modules/.pnpm/nuxt-schema-org@7.1.1_01626844176f246658be8c689ed43173/node_modules/nuxt-schema-org/dist/vendor/schema-org-v3/shared/schema-org.Bfx2QBO0.mjs
// @__NO_SIDE_EFFECTS__
function defineSchemaOrgResolver(schema) {
	return schema;
}
var PROTOCOL_RE = /^[\s\w\0+.-]{2,}:(?:[/\\]{2})?/;
var JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(input) {
	return PROTOCOL_RE.test(input);
}
function withoutTrailingSlash(input = "") {
	return (input.endsWith("/") ? input.slice(0, -1) : input) || "/";
}
function withTrailingSlash(input = "") {
	return input.endsWith("/") ? input : `${input}/`;
}
function joinURL(base, input) {
	if (!input || input === "/") return base || "";
	return base ? withTrailingSlash(base) + input.replace(JOIN_LEADING_SLASH_RE, "") : input;
}
function withBase(input, base) {
	if (!base || base === "/" || input.startsWith("//") || hasProtocol(input)) return input;
	const normalizedBase = withoutTrailingSlash(base);
	if (input.startsWith(normalizedBase)) {
		const nextChar = input[normalizedBase.length];
		if (!nextChar || nextChar === "/" || nextChar === "?") return input;
	}
	return joinURL(normalizedBase, input);
}
function idReference(node) {
	return { "@id": typeof node !== "string" ? node["@id"] : node };
}
var IS_VALID_W3C_DATE = [
	/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
	/^\d{4}-[01]\d-[0-3]\d$/,
	/^\d{4}-[01]\d$/,
	/^\d{4}$/
];
function isValidW3CDate(d) {
	return IS_VALID_W3C_DATE.some((r) => r.test(d));
}
function resolvableDateToIso(val) {
	if (!val) return val;
	try {
		if (val instanceof Date) return val.toISOString();
		else if (isValidW3CDate(val)) return val;
		else return new Date(Date.parse(val)).toISOString();
	} catch {}
	return typeof val === "string" ? val : val.toString();
}
var IdentityId = "#identity";
function isHomePage(meta) {
	return meta.path === "/";
}
function setIfEmpty(node, field, value) {
	if (node?.[field] === void 0 && value != null) node[field] = value;
}
function asArray(input) {
	return Array.isArray(input) ? input : [input];
}
function prefixId(url, id) {
	if (hasProtocol(id)) return id;
	if (!id.includes("#")) id = `#${id}`;
	return `${url || ""}${id}`;
}
function isSiteIdentityId(id, host) {
	if (!id) return false;
	return id === IdentityId || id === prefixId(host, IdentityId);
}
function resolveDefaultType(node, defaultType) {
	const val = node["@type"];
	if (val === defaultType) return;
	if (typeof val === "string" && typeof defaultType === "string") {
		if (val !== defaultType) node["@type"] = [defaultType, val];
		return;
	}
	const types = new Set(asArray(defaultType));
	for (const t of asArray(val)) if (t != null) types.add(t);
	const resolved = [...types];
	node["@type"] = resolved.length === 1 ? resolved[0] : resolved;
}
function resolveWithBase(base, urlOrPath) {
	if (!base || !urlOrPath || hasProtocol(urlOrPath) || urlOrPath[0] !== "/" && urlOrPath[0] !== "#") return urlOrPath;
	return withBase(urlOrPath, base);
}
function resolveAsGraphKey(key) {
	if (!key) return key;
	return key.substring(key.lastIndexOf("#"));
}
function stripEmptyProperties(obj) {
	for (const k in obj) {
		if (!hasOwn$1(obj, k)) continue;
		const v = obj[k];
		if (v === "" || v === void 0) delete obj[k];
		else if (typeof v === "object" && v !== null) {
			if (v.__v_isReadonly || v.__v_isRef) continue;
			stripEmptyProperties(v);
		}
	}
	return obj;
}
function stripNullProperties(obj) {
	if (Array.isArray(obj)) {
		let next = 0;
		for (let i = 0; i < obj.length; i++) {
			const v = obj[i];
			if (v === null) continue;
			if (typeof v === "object" && v !== null) stripNullProperties(v);
			obj[next++] = v;
		}
		obj.length = next;
		return obj;
	}
	for (const k in obj) {
		if (!hasOwn$1(obj, k)) continue;
		const v = obj[k];
		if (v === null) delete obj[k];
		else if (typeof v === "object") {
			if (v.__v_isReadonly || v.__v_isRef) continue;
			stripNullProperties(v);
		}
	}
	return obj;
}
var interactionCounterResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "InteractionCounter" } });
var propertyValueResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "PropertyValue" } });
var definedRegionResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "DefinedRegion" } });
var quantitativeValueResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	cast(node) {
		if (typeof node === "number") return { value: node };
		return node;
	},
	defaults: { "@type": "QuantitativeValue" },
	resolve(node, ctx) {
		node.valueReference = resolveRelation(node.valueReference, ctx, quantitativeValueResolver);
		return node;
	}
});
var monetaryAmountResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "MonetaryAmount" },
	resolve(node, ctx) {
		if (typeof node.value === "object") node.value = resolveRelation(node.value, ctx, quantitativeValueResolver);
		return node;
	}
});
var merchantReturnPolicyResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "MerchantReturnPolicy" },
	resolve(node, ctx) {
		if (node.returnPolicyCategory) node.returnPolicyCategory = withBase(node.returnPolicyCategory, "https://schema.org/");
		if (node.returnFees) node.returnFees = withBase(node.returnFees, "https://schema.org/");
		if (node.returnMethod) node.returnMethod = withBase(node.returnMethod, "https://schema.org/");
		node.returnShippingFeesAmount = resolveRelation(node.returnShippingFeesAmount, ctx, monetaryAmountResolver);
		return node;
	}
});
var unitPriceSpecificationResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "UnitPriceSpecification" },
	resolve(node, ctx) {
		if (node.price !== void 0) setIfEmpty(node, "priceCurrency", ctx.meta.currency);
		if (node.priceType) node.priceType = withBase(node.priceType, "https://schema.org/");
		node.referenceQuantity = resolveRelation(node.referenceQuantity, ctx, quantitativeValueResolver);
		node.validForMemberTier = resolveRelation(node.validForMemberTier, ctx, memberProgramTierResolver);
		node.validFrom = resolvableDateToIso(node.validFrom);
		node.validThrough = resolvableDateToIso(node.validThrough);
		return node;
	}
});
var addressResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "PostalAddress" } });
var listItemResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	cast(node) {
		if (typeof node === "string") node = { name: node };
		return node;
	},
	defaults: { "@type": "ListItem" },
	resolve(node, ctx) {
		if (typeof node.item === "string") node.item = resolveWithBase(ctx.meta.host, node.item);
		else if (typeof node.item === "object") node.item = resolveRelation(node.item, ctx);
		if (node.url) node.url = resolveWithBase(ctx.meta.host, node.url);
		return node;
	}
});
var PrimaryBreadcrumbId = "#breadcrumb";
var breadcrumbResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "BreadcrumbList" },
	idPrefix: ["url", PrimaryBreadcrumbId],
	resolve(breadcrumb, ctx) {
		if (breadcrumb.itemListElement) {
			let index = 1;
			breadcrumb.itemListElement = resolveRelation(breadcrumb.itemListElement, ctx, listItemResolver, {
				array: true,
				afterResolve(node) {
					setIfEmpty(node, "position", index++);
				}
			});
		}
		return breadcrumb;
	},
	resolveRootNode(node, { find }) {
		const webPage = find(PrimaryWebPageId);
		if (webPage) setIfEmpty(webPage, "breadcrumb", idReference(node));
	}
});
var clipResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "Clip" },
	resolve(node, ctx) {
		node.url = resolveWithBase(ctx.meta.host, node.url);
		return node;
	}
});
var broadcastEventResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "BroadcastEvent" },
	resolve(node) {
		node.startDate = resolvableDateToIso(node.startDate);
		node.endDate = resolvableDateToIso(node.endDate);
		return node;
	}
});
var seekToActionResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "SeekToAction" },
	resolve(node, ctx) {
		node.target = resolveWithBase(ctx.meta.host, node.target);
		return node;
	}
});
var videoResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	cast(input) {
		if (typeof input === "string") input = { url: input };
		return input;
	},
	alias: "video",
	defaults: { "@type": "VideoObject" },
	inheritMeta: [
		{
			meta: "title",
			key: "name"
		},
		"description",
		"image",
		"inLanguage",
		{
			meta: "datePublished",
			key: "uploadDate"
		}
	],
	idPrefix: "host",
	resolve(video, ctx) {
		if (video.uploadDate) video.uploadDate = resolvableDateToIso(video.uploadDate);
		video.expires = resolvableDateToIso(video.expires);
		if (video.url) video.url = resolveWithBase(ctx.meta.host, video.url);
		if (video.contentUrl) video.contentUrl = resolveWithBase(ctx.meta.host, video.contentUrl);
		if (video.embedUrl) video.embedUrl = resolveWithBase(ctx.meta.host, video.embedUrl);
		if (video.caption && !video.description) video.description = video.caption;
		if (!video.description) video.description = "No description";
		if (video.thumbnailUrl && (typeof video.thumbnailUrl === "string" || Array.isArray(video.thumbnailUrl))) {
			const images = asArray(video.thumbnailUrl).map((image) => resolveWithBase(ctx.meta.host, image));
			video.thumbnailUrl = images.length > 1 ? images : images[0];
		}
		if (video.thumbnail) video.thumbnail = resolveRelation(video.thumbnail, ctx, imageResolver);
		video.hasPart = resolveRelation(video.hasPart, ctx, clipResolver);
		video.interactionStatistic = resolveRelation(video.interactionStatistic, ctx, interactionCounterResolver);
		video.potentialAction = resolveRelation(video.potentialAction, ctx, seekToActionResolver);
		video.publication = resolveRelation(video.publication, ctx, broadcastEventResolver);
		return video;
	},
	resolveRootNode(video, { find, meta }) {
		if (video.image && !video.thumbnailUrl) {
			const firstImage = asArray(video.image)[0];
			if (typeof firstImage === "string") setIfEmpty(video, "thumbnailUrl", resolveWithBase(meta.host, firstImage));
			else if (firstImage?.["@id"]) setIfEmpty(video, "thumbnailUrl", find(firstImage["@id"], isImageObject)?.url);
		}
	}
});
var PrimaryArticleId = "#article";
var searchActionResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: {
		"@type": "SearchAction",
		"target": { "@type": "EntryPoint" },
		"query-input": {
			"@type": "PropertyValueSpecification",
			"valueRequired": true,
			"valueName": "search_term_string"
		}
	},
	resolve(node, ctx) {
		if (typeof node.target === "string") node.target = {
			"@type": "EntryPoint",
			"urlTemplate": resolveWithBase(ctx.meta.host, node.target)
		};
		return node;
	}
});
var PrimaryWebSiteId = "#website";
var webSiteResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "WebSite" },
	inheritMeta: ["inLanguage", {
		meta: "host",
		key: "url"
	}],
	idPrefix: ["host", PrimaryWebSiteId],
	resolve(node, ctx) {
		node.potentialAction = resolveRelation(node.potentialAction, ctx, searchActionResolver, { array: true });
		node.publisher = resolveRelation(node.publisher, ctx);
		node.dateModified = resolvableDateToIso(node.dateModified);
		node.datePublished = resolvableDateToIso(node.datePublished);
		return node;
	},
	resolveRootNode(node, { find }) {
		if (resolveAsGraphKey(node["@id"]) === "#website") {
			const identity = find(IdentityId);
			if (identity) setIfEmpty(node, "publisher", idReference(identity));
			const webPage = find(PrimaryWebPageId);
			if (webPage) setIfEmpty(webPage, "isPartOf", idReference(node));
		}
		return node;
	}
});
var personResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	cast(node) {
		if (typeof node === "string") return { name: node };
		return node;
	},
	defaults: { "@type": "Person" },
	idPrefix: ["host", IdentityId],
	resolve(node, ctx) {
		if (node.identifier) {
			const resolveIdentifier = (identifier) => typeof identifier === "string" ? identifier : resolveRelation(identifier, ctx, propertyValueResolver);
			node.identifier = Array.isArray(node.identifier) ? node.identifier.map(resolveIdentifier) : resolveIdentifier(node.identifier);
		}
		node.agentInteractionStatistic = resolveRelation(node.agentInteractionStatistic, ctx, interactionCounterResolver);
		node.interactionStatistic = resolveRelation(node.interactionStatistic, ctx, interactionCounterResolver);
		if (node.url) node.url = resolveWithBase(ctx.meta.host, node.url);
		return node;
	},
	resolveRootNode(node, { find, meta }) {
		if (isSiteIdentityId(node["@id"], meta.host)) {
			setIfEmpty(node, "url", meta.host);
			const webPage = find(PrimaryWebPageId);
			if (webPage && isHomePage(meta)) setIfEmpty(webPage, "about", idReference(node));
			const webSite = find(PrimaryWebSiteId);
			if (webSite) setIfEmpty(webSite, "publisher", idReference(node));
			const article = find(PrimaryArticleId);
			if (article) setIfEmpty(article, "author", idReference(node));
		}
	}
});
var readActionResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "ReadAction" },
	resolve(node, ctx) {
		node.target ||= [];
		if (!node.target.includes(ctx.meta.url)) node.target.unshift(ctx.meta.url);
		return node;
	}
});
var speakableSpecificationResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "SpeakableSpecification" } });
var webPageElementResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "WebPageElement" } });
var PrimaryWebPageId = "#webpage";
var webPageResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults({ meta }) {
		const endPath = withoutTrailingSlash(meta.path.substring(meta.path.lastIndexOf("/") + 1));
		let type = "WebPage";
		switch (endPath.toLowerCase()) {
			case "about":
			case "about-us":
				type = "AboutPage";
				break;
			case "search":
				type = "SearchResultsPage";
				break;
			case "checkout":
				type = "CheckoutPage";
				break;
			case "contact":
			case "get-in-touch":
			case "contact-us":
				type = "ContactPage";
				break;
			case "faq": type = "FAQPage";
		}
		return { "@type": type };
	},
	idPrefix: ["url", PrimaryWebPageId],
	inheritMeta: [
		{
			meta: "title",
			key: "name"
		},
		"description",
		"datePublished",
		"dateModified",
		"url"
	],
	resolve(node, ctx) {
		node.dateCreated = resolvableDateToIso(node.dateCreated);
		node.dateModified = resolvableDateToIso(node.dateModified);
		node.datePublished = resolvableDateToIso(node.datePublished);
		resolveDefaultType(node, "WebPage");
		node.about = resolveRelation(node.about, ctx, organizationResolver);
		node.breadcrumb = resolveRelation(node.breadcrumb, ctx, breadcrumbResolver);
		node.author = resolveRelation(node.author, ctx, personResolver);
		if (node.hasPart) {
			const resolvePart = (part) => {
				return typeof part === "object" && part !== null && (part["@type"] === "WebPageElement" || "cssSelector" in part) ? resolveRelation(part, ctx, webPageElementResolver) : resolveRelation(part, ctx);
			};
			node.hasPart = Array.isArray(node.hasPart) ? node.hasPart.map(resolvePart) : resolvePart(node.hasPart);
		}
		if (node.primaryImageOfPage === false) node.primaryImageOfPage = null;
		node.primaryImageOfPage = resolveRelation(node.primaryImageOfPage, ctx, imageResolver);
		node.speakable = resolveRelation(node.speakable, ctx, speakableSpecificationResolver);
		node.video = resolveRelation(node.video, ctx, videoResolver);
		if (Array.isArray(node["@type"]) && node["@type"].includes("ProfilePage")) node.mainEntity = resolveIdentityRelation(node.mainEntity, ctx, {
			organization: organizationResolver,
			person: personResolver
		}, { root: true });
		if (node.potentialAction) {
			const resolveAction = (action) => {
				if (!action || typeof action !== "object") return action;
				const type = action["@type"];
				return type === "ReadAction" || Array.isArray(type) && type.includes("ReadAction") || "target" in action ? resolveRelation(action, ctx, readActionResolver) : resolveRelation(action, ctx);
			};
			node.potentialAction = Array.isArray(node.potentialAction) ? node.potentialAction.map(resolveAction) : resolveAction(node.potentialAction);
		}
		if (node["@type"] === "WebPage" && ctx.meta.url) setIfEmpty(node, "potentialAction", [{
			"@type": "ReadAction",
			"target": [ctx.meta.url]
		}]);
		return node;
	},
	resolveRootNode(webPage, { find, meta }) {
		const identity = find(IdentityId);
		const webSite = find(PrimaryWebSiteId);
		const logo = find("#logo");
		if (identity && isHomePage(meta)) setIfEmpty(webPage, "about", idReference(identity));
		if (logo) setIfEmpty(webPage, "primaryImageOfPage", idReference(logo));
		if (webSite) setIfEmpty(webPage, "isPartOf", idReference(webSite));
		const breadcrumb = find(PrimaryBreadcrumbId);
		if (breadcrumb) setIfEmpty(webPage, "breadcrumb", idReference(breadcrumb));
		return webPage;
	}
});
var contactPointResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "ContactPoint" } });
var creditCardResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "CreditCard" } });
var memberProgramTierResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "MemberProgramTier" },
	resolve(node, ctx) {
		node.hasTierBenefit = Array.isArray(node.hasTierBenefit) ? node.hasTierBenefit.map((benefit) => withBase(benefit, "https://schema.org/")) : withBase(node.hasTierBenefit, "https://schema.org/");
		if (node.hasTierRequirement) {
			const requirement = node.hasTierRequirement;
			if (typeof requirement === "object") {
				const types = asArray(requirement["@type"]);
				if (types.includes("CreditCard")) node.hasTierRequirement = resolveRelation(requirement, ctx, creditCardResolver);
				else if (types.includes("MonetaryAmount") || "currency" in requirement) node.hasTierRequirement = resolveRelation(requirement, ctx, monetaryAmountResolver);
				else node.hasTierRequirement = resolveRelation(requirement, ctx, unitPriceSpecificationResolver);
			}
		}
		node.isTierOf = resolveRelation(node.isTierOf, ctx, memberProgramResolver);
		node.membershipPointsEarned = resolveRelation(node.membershipPointsEarned, ctx, quantitativeValueResolver);
		if (node.url) node.url = resolveWithBase(ctx.meta.host, node.url);
		return node;
	}
});
var memberProgramResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "MemberProgram" },
	resolve(node, ctx) {
		node.hasTiers = resolveRelation(node.hasTiers, ctx, memberProgramTierResolver);
		if (node.url) node.url = resolveWithBase(ctx.meta.host, node.url);
		return node;
	}
});
var servicePeriodResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "ServicePeriod" },
	resolve(node, ctx) {
		node.duration = resolveRelation(node.duration, ctx, quantitativeValueResolver);
		return node;
	}
});
var shippingRateSettingsResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "ShippingRateSettings" } });
var shippingSeasonalOverrideResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "OpeningHoursSpecification" },
	resolve(node) {
		node.validFrom = resolvableDateToIso(node.validFrom);
		node.validThrough = resolvableDateToIso(node.validThrough);
		return node;
	}
});
var shippingConditionsResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "ShippingConditions" },
	resolve(node, ctx) {
		node.numItems = resolveRelation(node.numItems, ctx, quantitativeValueResolver);
		node.orderValue = resolveRelation(node.orderValue, ctx, monetaryAmountResolver);
		node.seasonalOverride = resolveRelation(node.seasonalOverride, ctx, shippingSeasonalOverrideResolver);
		node.shippingDestination = resolveRelation(node.shippingDestination, ctx, definedRegionResolver);
		node.shippingOrigin = resolveRelation(node.shippingOrigin, ctx, definedRegionResolver);
		if (node.shippingRate) node.shippingRate = typeof node.shippingRate === "object" && ("orderPercentage" in node.shippingRate || "weightPercentage" in node.shippingRate) ? resolveRelation(node.shippingRate, ctx, shippingRateSettingsResolver) : resolveRelation(node.shippingRate, ctx, monetaryAmountResolver);
		node.transitTime = resolveRelation(node.transitTime, ctx, servicePeriodResolver);
		node.weight = resolveRelation(node.weight, ctx, quantitativeValueResolver);
		return node;
	}
});
var shippingServiceResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "ShippingService" },
	resolve(node, ctx) {
		if (node.fulfillmentType) node.fulfillmentType = withBase(node.fulfillmentType, "https://schema.org/");
		node.handlingTime = resolveRelation(node.handlingTime, ctx, servicePeriodResolver);
		node.shippingConditions = resolveRelation(node.shippingConditions, ctx, shippingConditionsResolver);
		node.validForMemberTier = resolveRelation(node.validForMemberTier, ctx, memberProgramTierResolver);
		return node;
	}
});
var organizationResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	cast(node) {
		if (typeof node === "string") return { name: node };
		return node;
	},
	defaults: { "@type": "Organization" },
	idPrefix: ["host", IdentityId],
	resolve(node, ctx) {
		resolveDefaultType(node, "Organization");
		node.address = resolveRelation(node.address, ctx, addressResolver);
		node.agentInteractionStatistic = resolveRelation(node.agentInteractionStatistic, ctx, interactionCounterResolver);
		node.contactPoint = resolveRelation(node.contactPoint, ctx, contactPointResolver);
		node.hasMemberProgram = resolveRelation(node.hasMemberProgram, ctx, memberProgramResolver);
		node.hasMerchantReturnPolicy = resolveRelation(node.hasMerchantReturnPolicy, ctx, merchantReturnPolicyResolver);
		node.hasShippingService = resolveRelation(node.hasShippingService, ctx, shippingServiceResolver);
		if (node.identifier) {
			const resolveIdentifier = (identifier) => typeof identifier === "string" ? identifier : resolveRelation(identifier, ctx, propertyValueResolver);
			node.identifier = Array.isArray(node.identifier) ? node.identifier.map(resolveIdentifier) : resolveIdentifier(node.identifier);
		}
		node.interactionStatistic = resolveRelation(node.interactionStatistic, ctx, interactionCounterResolver);
		node.numberOfEmployees = resolveRelation(node.numberOfEmployees, ctx, quantitativeValueResolver);
		if (node.url) node.url = resolveWithBase(ctx.meta.host, node.url);
		if (isSiteIdentityId(node["@id"], ctx.meta.host)) setIfEmpty(node, "url", ctx.meta.host);
		return node;
	},
	resolveRootNode(node, ctx) {
		const isIdentity = isSiteIdentityId(node["@id"], ctx.meta.host);
		const webPage = ctx.find(PrimaryWebPageId);
		if (isIdentity) setIfEmpty(node, "url", ctx.meta.host);
		if (node.logo && isIdentity) {
			const logoNode = resolveRelation(Array.isArray(node.logo) ? node.logo[0] : node.logo, ctx, imageResolver, {
				root: true,
				afterResolve(logo) {
					logo["@id"] = prefixId(ctx.meta.host, "#logo");
					setIfEmpty(logo, "caption", node.name);
				}
			});
			if (webPage && logoNode) setIfEmpty(webPage, "primaryImageOfPage", idReference(logoNode));
			node.logo = logoNode;
		}
		if (isIdentity && webPage && isHomePage(ctx.meta)) setIfEmpty(webPage, "about", idReference(node));
		const webSite = ctx.find(PrimaryWebSiteId);
		if (webSite && isIdentity) setIfEmpty(webSite, "publisher", idReference(node));
	}
});
function isImageObject(node) {
	return typeof node.url === "string" || typeof node.contentUrl === "string";
}
var imageResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	alias: "image",
	cast(input) {
		if (typeof input === "string") input = { url: input };
		return input;
	},
	defaults: { "@type": "ImageObject" },
	inheritMeta: ["inLanguage"],
	idPrefix: "host",
	resolve(image, ctx) {
		const { meta } = ctx;
		if (image.url) image.url = resolveWithBase(meta.host, image.url);
		if (image.contentUrl) image.contentUrl = resolveWithBase(meta.host, image.contentUrl);
		setIfEmpty(image, "contentUrl", image.url);
		setIfEmpty(image, "url", image.contentUrl);
		image.creator = resolveIdentityRelation(image.creator, ctx, {
			organization: organizationResolver,
			person: personResolver
		}, { root: true });
		if (image.license) image.license = resolveWithBase(meta.host, image.license);
		if (image.acquireLicensePage) image.acquireLicensePage = resolveWithBase(meta.host, image.acquireLicensePage);
		if (image.height && !image.width) delete image.height;
		if (image.width && !image.height) delete image.width;
		return image;
	}
});
var ALIAS_RE = /([a-z])([A-Z])/g;
function nextNodeId(ctx, alias) {
	ctx.nodeIdCounters[alias] = (ctx.nodeIdCounters[alias] || 0) + 1;
	return ctx.nodeIdCounters[alias].toString();
}
var ABSOLUTE_URL_RE = /^https?:\/\//i;
var QUERY_RE = /[?#]/;
var HASH_RE = /#/;
var TRAILING_SLASHES_RE = /\/+$/;
function parseAbsoluteUrl(url) {
	if (!ABSOLUTE_URL_RE.test(url)) return void 0;
	try {
		return new URL(url);
	} catch {
		return;
	}
}
function parseMetaUrl(input, host) {
	const url = input.split(HASH_RE, 1)[0];
	if (url.startsWith("/") && !url.startsWith("//")) return {
		url: host ? joinURL(host, url) : url,
		path: url.split(QUERY_RE, 1)[0]
	};
	const parsed = parseAbsoluteUrl(url);
	if (!parsed) return void 0;
	const hostUrl = host ? parseAbsoluteUrl(host) : void 0;
	if (!hostUrl) return {
		url,
		path: parsed.pathname
	};
	const basePath = hostUrl.pathname.replace(TRAILING_SLASHES_RE, "");
	if (hostUrl.origin === parsed.origin && (parsed.pathname === basePath || parsed.pathname.startsWith(`${basePath}/`))) return {
		url,
		path: parsed.pathname.slice(basePath.length) || "/"
	};
	return { url };
}
function resolveMeta(meta) {
	const explicit = meta.url ? parseMetaUrl(meta.url, meta.host) : void 0;
	if (explicit?.path && !meta.host && ABSOLUTE_URL_RE.test(explicit.url)) meta.host = new URL(explicit.url).origin;
	if (explicit?.path) meta.path = explicit.path;
	if (!meta.path) meta.path = "/";
	if (!meta.host && false);
	if (meta.path !== "/") {
		if (meta.trailingSlash && !meta.path.endsWith("/")) meta.path = withTrailingSlash(meta.path);
		else if (!meta.trailingSlash && meta.path.endsWith("/")) meta.path = withoutTrailingSlash(meta.path);
	}
	const siteUrl = joinURL(meta.host || "", meta.path);
	const resolved = meta;
	resolved.url = explicit?.url || siteUrl;
	resolved.idUrl = explicit?.path ? explicit.url : siteUrl;
	return resolved;
}
function resolveNode(node, ctx, resolver) {
	if (resolver?.cast) node = resolver.cast(node, ctx);
	if (resolver?.defaults) {
		let defaults = resolver.defaults;
		if (typeof defaults === "function") defaults = defaults(ctx);
		node = {
			...defaults,
			...node
		};
	}
	const inheritMeta = resolver?.inheritMeta;
	if (inheritMeta) for (let i = 0; i < inheritMeta.length; i++) {
		const entry = inheritMeta[i];
		if (typeof entry === "string") setIfEmpty(node, entry, ctx.meta[entry]);
		else setIfEmpty(node, entry.key, ctx.meta[entry.meta]);
	}
	if (resolver?.resolve) node = resolver.resolve(node, ctx);
	for (const k in node) {
		const v = node[k];
		if (Array.isArray(v)) for (let i = 0; i < v.length; i++) {
			const item = v[i];
			if (typeof item === "object" && item?._resolver) node[k][i] = resolveRelation(item, ctx, item._resolver);
		}
		else if (typeof v === "object" && v?._resolver) node[k] = resolveRelation(v, ctx, v._resolver);
	}
	stripEmptyProperties(node);
	return node;
}
function idBase(ctx, prefix) {
	return prefix === "url" ? ctx.meta.idUrl : ctx.meta.host;
}
function resolveNodeId(node, ctx, resolver, resolveAsRoot = false) {
	if (node["@id"] && node["@id"].startsWith("http")) return node;
	const prefix = resolver ? (Array.isArray(resolver.idPrefix) ? resolver.idPrefix[0] : resolver.idPrefix) || "url" : "url";
	const rootId = node["@id"] || (resolver ? Array.isArray(resolver.idPrefix) ? resolver.idPrefix?.[1] : void 0 : "");
	if (!node["@id"] && resolveAsRoot && rootId) {
		node["@id"] = prefixId(idBase(ctx, prefix), rootId);
		return node;
	}
	if (node["@id"]?.startsWith("#/schema/") || node["@id"]?.startsWith("/")) {
		node["@id"] = prefixId(idBase(ctx, prefix), node["@id"]);
		return node;
	}
	let alias = resolver?.alias;
	if (!alias) alias = (asArray(node["@type"])?.[0] || "").replace(ALIAS_RE, "$1-$2").toLowerCase();
	node["@id"] = prefixId(node["@id"] ? idBase(ctx, prefix) : ctx.meta.idUrl, `#/schema/${alias}/${node["@id"] || nextNodeId(ctx, alias)}`);
	return node;
}
function resolveRelation(input, ctx, fallbackResolver, options = {}) {
	if (!input) return input;
	const items = asArray(input);
	const ids = [];
	for (let i = 0; i < items.length; i++) {
		const a = items[i];
		if (!a) {
			ids.push(a);
			continue;
		}
		let keyCount = 0;
		for (const _ in a) keyCount++;
		if (keyCount === 1 && a["@id"] || keyCount === 2 && a["@id"] && a["@type"]) {
			ids.push(resolveNodeId({ "@id": ctx.find(a["@id"])?.["@id"] || a["@id"] }, ctx));
			continue;
		}
		let resolver = fallbackResolver;
		if (a._resolver && typeof a._resolver !== "string") {
			resolver = a._resolver;
			delete a._resolver;
		}
		if (!resolver) {
			ids.push(a);
			continue;
		}
		let node = resolveNode(a, ctx, resolver);
		if (options.afterResolve) options.afterResolve(node);
		if (options.generateId || options.root) node = resolveNodeId(node, ctx, resolver, false);
		if (options.root) {
			if (resolver.resolveRootNode) resolver.resolveRootNode(node, ctx);
			ctx.push(node);
			ids.push(idReference(node["@id"]));
			continue;
		}
		ids.push(node);
	}
	return !options.array && ids.length === 1 ? ids[0] : ids;
}
function merge(target, source) {
	if (!source) return target;
	for (const key in source) {
		if (!hasOwn$1(source, key) || key === "__proto__" || key === "constructor" || key === "prototype") continue;
		const value = source[key];
		if (value === void 0) continue;
		if (Array.isArray(target[key])) {
			if (Array.isArray(value)) {
				const merged = [...target[key], ...value];
				if (key === "@type") target[key] = [...new Set(merged)];
				else if (key === "itemListElement") {
					merged.sort((a, b) => (a.position || 0) - (b.position || 0));
					for (let i = 0; i < merged.length; i++) merged[i].position = i + 1;
					target[key] = merged;
				} else if (key === "potentialAction") {
					const byType = /* @__PURE__ */ Object.create(null);
					for (const action of merged) {
						const type = action["@type"];
						if (byType[type]) {
							if (action.target && byType[type].target) {
								const a = Array.isArray(byType[type].target) ? byType[type].target : [byType[type].target];
								const b = Array.isArray(action.target) ? action.target : [action.target];
								byType[type].target = [.../* @__PURE__ */ new Set([...a, ...b])];
							}
						} else byType[type] = { ...action };
					}
					target[key] = Object.values(byType);
				} else if (merged.length > 0 && merged.every((item) => item && typeof item === "object" && item["@type"])) {
					const byType = /* @__PURE__ */ Object.create(null);
					for (const item of merged) byType[item["@type"]] = item;
					target[key] = Object.values(byType);
				} else target[key] = merged;
			} else target[key] = merge(target[key], [value]);
		} else if (target[key] && typeof target[key] === "object" && typeof value === "object" && !Array.isArray(value)) target[key] = merge({ ...target[key] }, value);
		else target[key] = value;
	}
	return target;
}
var DOMAIN_RE = /(?:https?:)?\/\//;
function indexNode(index, node) {
	if (!node["@id"]) return;
	const nodeId = node["@id"];
	const fragmentKey = resolveAsGraphKey(nodeId);
	index.set(fragmentKey, node);
	index.set(nodeId, node);
	const domainKey = nodeId.replace(DOMAIN_RE, "").split("/")[0];
	index.set(domainKey, node);
}
function createSchemaOrgGraph() {
	let ctx;
	function find(id, guard) {
		const matchFragment = id[0] === "#";
		const matchDomain = id[0] === "/" && id[1] === "/";
		const key = matchFragment ? resolveAsGraphKey(id) : matchDomain ? id.replace(DOMAIN_RE, "").split("/")[0] : id;
		let node = ctx.nodeIndex.size > 0 ? ctx.nodeIndex.get(key) : void 0;
		if (!node) for (let i = 0; i < ctx.nodes.length; i++) {
			const candidate = ctx.nodes[i];
			const nodeId = candidate["@id"];
			if (!nodeId) continue;
			if ((matchFragment ? resolveAsGraphKey(nodeId) : matchDomain ? nodeId.replace(DOMAIN_RE, "").split("/")[0] : nodeId) === key) {
				node = candidate;
				break;
			}
		}
		if (!node || guard && !guard(node)) return null;
		return node;
	}
	ctx = {
		find,
		push(input) {
			if (Array.isArray(input)) for (let i = 0; i < input.length; i++) {
				const registeredNode = input[i];
				ctx.nodes.push(registeredNode);
				if (ctx.nodeIndex.size > 0) indexNode(ctx.nodeIndex, registeredNode);
			}
			else {
				const registeredNode = input;
				ctx.nodes.push(registeredNode);
				if (ctx.nodeIndex.size > 0) indexNode(ctx.nodeIndex, registeredNode);
			}
		},
		resolveGraph(meta) {
			for (const k in ctx.nodeIdCounters) delete ctx.nodeIdCounters[k];
			ctx.meta = resolveMeta({ ...meta });
			const len = ctx.nodes.length;
			for (let i = 0; i < len; i++) {
				let node = ctx.nodes[i];
				const resolver = node._resolver;
				node = resolveNode(node, ctx, resolver);
				node = resolveNodeId(node, ctx, resolver, true);
				ctx.nodes[i] = node;
			}
			const dedupedNodes = /* @__PURE__ */ Object.create(null);
			let hasDuplicates = false;
			ctx.nodeIndex.clear();
			for (let i = 0; i < ctx.nodes.length; i++) {
				const n = ctx.nodes[i];
				const nodeKey = resolveAsGraphKey(n["@id"]);
				if (dedupedNodes[nodeKey]) {
					hasDuplicates = true;
					if (n._dedupeStrategy !== "replace") dedupedNodes[nodeKey] = merge(dedupedNodes[nodeKey], n);
					else dedupedNodes[nodeKey] = n;
				} else dedupedNodes[nodeKey] = n;
			}
			if (hasDuplicates) ctx.nodes = Object.values(dedupedNodes);
			for (let i = 0; i < ctx.nodes.length; i++) indexNode(ctx.nodeIndex, ctx.nodes[i]);
			const countBeforeRelations = ctx.nodes.length;
			for (let i = 0; i < ctx.nodes.length; i++) {
				const node = ctx.nodes[i];
				if (node.image && typeof node.image === "string") node.image = resolveRelation(node.image, ctx, imageResolver, { root: true });
				node.translationOfWork = resolveRelation(node.translationOfWork, ctx);
				node.workTranslation = resolveRelation(node.workTranslation, ctx);
				const resolver = node._resolver;
				if (resolver?.resolveRootNode) resolver.resolveRootNode(node, ctx);
			}
			for (let i = 0; i < ctx.nodes.length; i++) delete ctx.nodes[i]._resolver;
			for (let i = 0; i < ctx.nodes.length; i++) stripNullProperties(ctx.nodes[i]);
			const needsDedupe = ctx.nodes.length > countBeforeRelations;
			const normalizedNodes = needsDedupe ? /* @__PURE__ */ Object.create(null) : null;
			const result = needsDedupe ? null : [];
			for (let i = 0; i < ctx.nodes.length; i++) {
				const n = ctx.nodes[i];
				const nodeKey = resolveAsGraphKey(n["@id"]);
				const keys = Object.keys(n);
				keys.sort();
				const newNode = {};
				let relationCount = 0;
				for (let j = 0; j < keys.length; j++) {
					const k = keys[j];
					if (k[0] === "_") continue;
					const v = n[k];
					if (v !== null && (Array.isArray(v) || typeof v === "object")) keys[relationCount++] = k;
					else newNode[k] = v;
				}
				for (let j = 0; j < relationCount; j++) {
					const k = keys[j];
					newNode[k] = n[k];
				}
				if (needsDedupe) normalizedNodes[nodeKey] = normalizedNodes[nodeKey] ? merge(normalizedNodes[nodeKey], newNode) : newNode;
				else result.push(newNode);
			}
			return needsDedupe ? Object.values(normalizedNodes) : result;
		},
		nodes: [],
		nodeIndex: /* @__PURE__ */ new Map(),
		nodeIdCounters: /* @__PURE__ */ Object.create(null),
		meta: resolveMeta({})
	};
	return ctx;
}
function resolveIdentityRelation(input, ctx, resolvers, options = {}) {
	if (!input) return input;
	const resolveIdentity = (identity) => {
		const types = typeof identity === "object" && identity ? asArray(identity["@type"]).filter((type) => typeof type === "string") : [];
		return resolveRelation(identity, ctx, types.length > 0 && !types.includes("Person") ? resolvers.organization : resolvers.person, options);
	};
	if (!Array.isArray(input)) return resolveIdentity(input);
	const resolved = input.map(resolveIdentity);
	return resolved.length === 1 ? resolved[0] : resolved;
}
var aggregateRatingResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "AggregateRating" },
	resolve(node, ctx) {
		node.itemReviewed = resolveRelation(node.itemReviewed, ctx);
		return node;
	}
});
var openingHoursResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: {
		"@type": "OpeningHoursSpecification",
		"opens": "00:00",
		"closes": "23:59"
	},
	resolve(node) {
		node.validFrom = resolvableDateToIso(node.validFrom);
		node.validThrough = resolvableDateToIso(node.validThrough);
		return node;
	}
});
var itemListResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "ItemList" },
	resolve(node, ctx) {
		if (node.itemListElement) {
			let index = 1;
			node.itemListElement = resolveRelation(node.itemListElement, ctx, listItemResolver, {
				array: true,
				afterResolve(node2) {
					setIfEmpty(node2, "position", index++);
				}
			});
		}
		return node;
	}
});
var ratingResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	cast(node) {
		if (typeof node === "number") return { ratingValue: node };
		return node;
	},
	defaults: {
		"@type": "Rating",
		"bestRating": 5,
		"worstRating": 1
	}
});
var reviewResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": "Review" },
	inheritMeta: ["inLanguage"],
	resolve(review, ctx) {
		review.reviewRating = resolveRelation(review.reviewRating, ctx, ratingResolver);
		review.author = resolveIdentityRelation(review.author, ctx, {
			organization: organizationResolver,
			person: personResolver
		});
		review.itemReviewed = resolveRelation(review.itemReviewed, ctx);
		review.negativeNotes = resolveRelation(review.negativeNotes, ctx, itemListResolver);
		review.positiveNotes = resolveRelation(review.positiveNotes, ctx, itemListResolver);
		review.contentReferenceTime = resolvableDateToIso(review.contentReferenceTime);
		review.datePublished = resolvableDateToIso(review.datePublished);
		return review;
	}
});
var geoCoordinatesResolver = /* @__PURE__ */ defineSchemaOrgResolver({ defaults: { "@type": "GeoCoordinates" } });
var localBusinessResolver = /* @__PURE__ */ defineSchemaOrgResolver({
	defaults: { "@type": ["Organization", "LocalBusiness"] },
	inheritMeta: [{
		key: "url",
		meta: "host"
	}, {
		key: "currenciesAccepted",
		meta: "currency"
	}],
	idPrefix: ["host", IdentityId],
	resolve(node, ctx) {
		resolveDefaultType(node, ["Organization", "LocalBusiness"]);
		node.address = resolveRelation(node.address, ctx, addressResolver);
		node.aggregateRating = resolveRelation(node.aggregateRating, ctx, aggregateRatingResolver);
		node.department = resolveRelation(node.department, ctx, localBusinessResolver);
		node.geo = resolveRelation(node.geo, ctx, geoCoordinatesResolver);
		node.openingHoursSpecification = resolveRelation(node.openingHoursSpecification, ctx, openingHoursResolver);
		node.review = resolveRelation(node.review, ctx, reviewResolver);
		if (node.menu) node.menu = resolveWithBase(ctx.meta.host, node.menu);
		node = resolveNode({ ...node }, ctx, organizationResolver);
		return node;
	},
	resolveRootNode(node, ctx) {
		organizationResolver.resolveRootNode(node, ctx);
		return node;
	}
});
function mergeObjects(target, source) {
	const result = { ...target };
	for (const key in source) {
		if (!hasOwn$1(source, key) || source[key] === void 0 || key === "__proto__" || key === "constructor" || key === "prototype") continue;
		if (result[key] && typeof result[key] === "object" && typeof source[key] === "object" && !Array.isArray(result[key]) && !Array.isArray(source[key])) result[key] = mergeObjects(result[key], source[key]);
		else if (!result[key]) result[key] = source[key];
	}
	return result;
}
function isSchemaOrgTag(tag) {
	return tag.tag === "script" && tag.props.type === "application/ld+json" && tag.props.nodes || tag.key === "schema-org-graph";
}
function UnheadSchemaOrg(config = {}, meta = () => ({}), options) {
	let graph;
	let resolvedMeta = {};
	let canonical;
	return defineHeadPlugin((head) => {
		head.use(TemplateParamsPlugin);
		function collectMeta(props) {
			if (typeof props.content !== "string") return;
			if (props.name === "description") resolvedMeta.description = props.content;
			else if (props.property === "og:image") resolvedMeta.image = props.content;
		}
		function collectTag(tag) {
			if (tag.tag === "script" && tag.props.type === "application/ld+json" && (tag.props.nodes || tag.key === "schema-org-graph")) {
				const nodes = tag.props.nodes;
				if (nodes) for (const node of Array.isArray(nodes) ? nodes : [nodes]) {
					if (typeof node !== "object" || node === null) continue;
					const newNode = {
						...node,
						_dedupeStrategy: tag.tagDuplicateStrategy
					};
					graph.push(newNode);
				}
				tag.tagPosition = tag.tagPosition || (config.tagPosition === "head" ? "head" : "bodyClose");
			}
			if (tag.tag === "meta") collectMeta(tag.props);
			else if (tag.tag === "_flatMeta") for (const props of unpackMeta(tag.props)) collectMeta(props);
			else if (tag.tag === "htmlAttrs" && typeof tag.props.lang === "string") resolvedMeta.inLanguage = tag.props.lang;
			else if (tag.tag === "title" && tag.textContent != null && typeof tag.textContent !== "function") resolvedMeta.title = String(tag.textContent);
			else if (tag.tag === "link" && tag.props.rel === "canonical" && typeof tag.props.href === "string") canonical = tag.props.href;
			else if (tag.tag === "templateParams" && tag.props.schemaOrg) resolvedMeta = {
				...resolvedMeta,
				...tag.props.schemaOrg
			};
		}
		return {
			key: "schema-org",
			hooks: {
				"entries:resolve": (ctx) => {
					graph = graph || createSchemaOrgGraph();
					graph.nodes = [];
					graph.nodeIndex.clear();
					resolvedMeta = {};
					canonical = void 0;
					for (const entry of ctx.entries) if (entry._tags) {
						if (entry._tags.some(isSchemaOrgTag)) {
							delete entry._tags;
							continue;
						}
						for (const tag of entry._tags) collectTag(tag);
					}
				},
				"entries:normalize": ({ tags }) => {
					for (const tag of tags) collectTag(tag);
				},
				"tags:resolve": (ctx) => {
					for (const k in ctx.tags) {
						const tag = ctx.tags[k];
						if (tag.tag === "script" && tag.props.type === "application/ld+json" && (tag.props.nodes || tag.key === "schema-org-graph")) {
							delete tag.props.nodes;
							const graphMeta = {
								...meta?.() || {},
								...config,
								...resolvedMeta
							};
							if (canonical && !graphMeta.url) graphMeta.url = processTemplateParams(canonical, head._templateParams, head._separator);
							const resolvedGraph = graph.resolveGraph(graphMeta);
							if (!resolvedGraph.length) {
								tag.props = {};
								return;
							}
							options?.minify || true;
							tag.innerHTML = JSON.stringify({
								"@context": "https://schema.org",
								"@graph": resolvedGraph
							}, (_, value) => {
								if (typeof value === "string") return processTemplateParams(value, head._templateParams, head._separator);
								return value;
							}, 0 );
							return;
						}
					}
				},
				"tags:afterResolve": (ctx) => {
					let firstNodeIdx;
					let toRemove;
					for (let i = 0; i < ctx.tags.length; i++) {
						const tag = ctx.tags[i];
						if (!tag?.props) continue;
						if (isSchemaOrgTag(tag)) {
							delete tag.props.nodes;
							if (typeof firstNodeIdx === "undefined") {
								firstNodeIdx = i;
								continue;
							}
							ctx.tags[firstNodeIdx].props = mergeObjects(ctx.tags[firstNodeIdx].props, tag.props);
							delete ctx.tags[firstNodeIdx].props.nodes;
							(toRemove ||= /* @__PURE__ */ new Set()).add(i);
						}
					}
					if (toRemove) ctx.tags = ctx.tags.filter((_, i) => !toRemove.has(i));
				}
			}
		};
	}, "schema-org");
}
// ../../node_modules/.pnpm/nuxt-schema-org@7.1.1_01626844176f246658be8c689ed43173/node_modules/nuxt-schema-org/dist/vendor/schema-org-v3/vue.mjs
function withResolver(input, resolver) {
	return {
		...input,
		_resolver: resolver
	};
}
function provideResolver(input, resolver) {
	const resolvedInput = input || {};
	if (isRef(resolvedInput)) return computed(() => {
		const value = resolvedInput.value;
		return value && typeof value === "object" ? withResolver(value, resolver) : value;
	});
	return withResolver(resolvedInput, resolver);
}
function defineLocalBusiness(input) {
	return provideResolver(input, localBusinessResolver);
}
function defineOrganization(input) {
	return provideResolver(input, organizationResolver);
}
function definePerson(input) {
	return provideResolver(input, personResolver);
}
function defineWebPage(input) {
	return provideResolver(input, webPageResolver);
}
function defineWebSite(input) {
	return provideResolver(input, webSiteResolver);
}
// ../../node_modules/.pnpm/nuxt-schema-org@7.1.1_01626844176f246658be8c689ed43173/node_modules/nuxt-schema-org/dist/runtime/app/utils/config.js
function useSchemaOrgConfig() {
	const runtimeConfig = useRuntimeConfig();
	return defu(runtimeConfig["nuxt-schema-org"], { scriptAttributes: {} });
}
// ../../node_modules/.pnpm/nuxt-schema-org@7.1.1_01626844176f246658be8c689ed43173/node_modules/nuxt-schema-org/dist/runtime/app/composables/useSchemaOrg.js
var localeWebsiteUrlKey = Symbol("schema-org:locale-website-url");
function localizeWebsiteNode(node, siteUrl) {
	if (isRef(node) || typeof node === "function") return () => localizeWebsiteNode(toValue(node), siteUrl);
	if (!node || typeof node !== "object" || !("_resolver" in node)) return node;
	const defaults = node._resolver?.defaults;
	if (typeof defaults !== "object" || defaults?.["@type"] !== "WebSite") return node;
	if ("@id" in node && node["@id"] != null) return node;
	const { url = siteUrl } = node;
	return {
		...node,
		"@id": () => `${siteUrl()}#website`,
		"url": url
	};
}
function useSchemaOrg(input) {
	const config = useSchemaOrgConfig();
	const nuxtApp = useNuxtApp();
	let nodes = input;
	if (isRef(input)) nodes = toValue(input);
	const localeWebsiteUrl = nuxtApp.vueApp.runWithContext(() => inject(localeWebsiteUrlKey, void 0));
	if (localeWebsiteUrl) {
		const sourceNodes = nodes;
		nodes = () => {
			const value = toValue(sourceNodes);
			return Array.isArray(value) ? value.map((node) => localizeWebsiteNode(node, localeWebsiteUrl)) : localizeWebsiteNode(value, localeWebsiteUrl);
		};
	}
	const script = {
		type: "application/ld+json",
		key: "schema-org-graph",
		nodes,
		tagPriority: "high",
		...config.scriptAttributes
	};
	return useHead({ script: [script] });
}
// ../../node_modules/.pnpm/nuxt-schema-org@7.1.1_01626844176f246658be8c689ed43173/node_modules/nuxt-schema-org/dist/runtime/app/utils/shared.js
function resolvePathDirect(siteConfig, path, options) {
	const nuxtBase = useRuntimeConfig().app.baseURL || "/";
	return resolveSitePath(path, {
		absolute: options.absolute,
		withBase: options.withBase,
		siteUrl: toValue(siteConfig.url),
		trailingSlash: toValue(siteConfig.trailingSlash),
		base: nuxtBase
	});
}
function resolveSiteConfigValue(value) {
	const resolved = toValue(value);
	if (Array.isArray(resolved)) return resolved.map(resolveSiteConfigValue);
	if (!resolved || typeof resolved !== "object") return resolved;
	const proto = Object.getPrototypeOf(resolved);
	if (proto !== Object.prototype && proto !== null) return resolved;
	const copy = {};
	for (const key in resolved) copy[key] = resolveSiteConfigValue(resolved[key]);
	return copy;
}
function withoutUrl(meta) {
	const { url: _url, ...rest } = meta;
	return rest;
}
function initSchemaOrgMeta(nuxtApp) {
	const head = injectHead(nuxtApp);
	const route = useRoute();
	const siteConfig = useSiteConfig();
	const resolveUrl = (path) => resolvePathDirect(siteConfig, path, {
		absolute: true,
		withBase: true
	});
	function resolveSchemaOrg() {
		const siteConfigResolved = {};
		for (const key in siteConfig) {
			if (key.startsWith("_")) continue;
			siteConfigResolved[key] = resolveSiteConfigValue(siteConfig[key]);
		}
		return {
			...route.meta?.schemaOrg || {},
			...siteConfigResolved,
			url: toValue(resolveUrl(route.path)),
			host: withTrailingSlash$1(toValue(resolveUrl("/"))),
			inLanguage: toValue(siteConfigResolved.currentLocale) || toValue(siteConfigResolved.defaultLocale),
			path: route.path
		};
	}
	async function resolveSchemaOrgWithHook() {
		const meta = resolveSchemaOrg();
		const url = meta.url;
		await nuxtApp.hooks.callHook("schema-org:meta", meta);
		if (meta.url === url) return withoutUrl(meta);
		if (URL.canParse(meta.url)) {
			const parsed = new URL(meta.url);
			meta.host = withTrailingSlash$1(parsed.origin);
			meta.path = parsed.pathname;
		}
		return meta;
	}
	const templateParamEntry = head.push({ templateParams: { schemaOrg: withoutUrl(resolveSchemaOrg()) } });
	nuxtApp.hooks.hookOnce("app:created", async () => {
		templateParamEntry.patch({ templateParams: { schemaOrg: await resolveSchemaOrgWithHook() } });
	});
}
function initSchemaOrgHead(nuxtApp) {
	const head = injectHead(nuxtApp);
	const config = useSchemaOrgConfig();
	const siteConfig = useSiteConfig();
	const schemaOrgPlugin = UnheadSchemaOrg;
	head.use(schemaOrgPlugin({}, void 0, {
		minify: config.minify,
		trailingSlash: siteConfig.trailingSlash
	}));
}
function maybeAddIdentitySchemaOrg() {
	const config = useSchemaOrgConfig();
	const siteConfig = useSiteConfig({ resolveRefs: true });
	if (config.identity || siteConfig.identity) {
		const identity = config.identity || siteConfig.identity;
		let identityPayload = {
			name: () => toValue(siteConfig.name),
			url: () => toValue(siteConfig.url)
		};
		let identityType;
		if (typeof identity !== "string") {
			identityPayload = {
				...identityPayload,
				...resolveSiteConfigValue(identity)
			};
			identityType = identity.type;
			delete identityPayload.type;
		} else identityType = identity;
		if (siteConfig.twitter) {
			const id = siteConfig.twitter.startsWith("@") ? siteConfig.twitter.slice(1) : siteConfig.twitter;
			const existing = [identityPayload.sameAs].flat().filter(Boolean);
			identityPayload.sameAs = [.../* @__PURE__ */ new Set([...existing, `https://twitter.com/${id}`])];
		}
		useSchemaOrg([({
			organization: defineOrganization,
			person: definePerson,
			localbusiness: defineLocalBusiness
		}[identityType?.toLowerCase()] || defineOrganization)(identityPayload)]);
	}
}
// ../../node_modules/.pnpm/nuxt-schema-org@7.1.1_01626844176f246658be8c689ed43173/node_modules/nuxt-schema-org/dist/runtime/app/plugins/i18n/init.js
var init_default = defineNuxtPlugin({
	name: "nuxt-schema-org:init",
	dependsOn: ["i18n:plugin"],
	setup(nuxtApp) {
		initSchemaOrgHead(nuxtApp);
	}
});
// ../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/plugins/switch-locale-path-ssr.js
var identifier = "nuxt-i18n-slp";
var switchLocalePathLinkWrapperExpr = new RegExp([
	`<!--${identifier}-\\[(\\w+)\\]-->`,
	`.+?`,
	`<!--/${identifier}-->`
].join(""), "g");
var switch_locale_path_ssr_default = defineNuxtPlugin({
	name: "i18n:plugin:switch-locale-path-ssr",
	dependsOn: ["i18n:plugin"],
	setup(nuxt) {
		const switchLocalePath = useSwitchLocalePath(nuxt);
		nuxt.hook("app:rendered", (ctx) => {
			if (ctx.renderResult?.html == null) return;
			ctx.renderResult.html = ctx.renderResult.html.replaceAll(switchLocalePathLinkWrapperExpr, (match, p1) => {
				const resolved = escapeHtmlAttr(switchLocalePath(p1 ?? ""));
				return match.replace(/href="([^"]+)"/, () => `href="${resolved || "#"}" `);
			});
		});
	}
});
// ../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/plugins/preload.js
var preload_default = defineNuxtPlugin({
	name: "i18n:plugin:preload",
	dependsOn: ["i18n:plugin"],
	async setup(nuxt) {}
});
// ../../node_modules/.pnpm/nuxt-schema-org@7.1.1_01626844176f246658be8c689ed43173/node_modules/nuxt-schema-org/dist/runtime/app/plugins/i18n/meta.js
var meta_default = defineNuxtPlugin({
	name: "nuxt-schema-org:meta",
	dependsOn: ["nuxt-schema-org:init", "nuxt-site-config:i18n"],
	setup(nuxtApp) {
		initSchemaOrgMeta(nuxtApp);
	}
});
// ../../node_modules/.pnpm/@nuxtjs+i18n@10.7.0_@nuxt+schema@4.7.0_@oxc-project+types@0.160.0_@vue+compiler-dom@3.5_5c0d59d010e6ed8ee9aa86929afa65bb/node_modules/@nuxtjs/i18n/dist/runtime/plugins/route-locale-detect.js
var route_locale_detect_default = defineNuxtPlugin({
	name: "i18n:plugin:route-locale-detect",
	dependsOn: ["i18n:plugin", "i18n:plugin:preload"],
	async setup(nuxt) {
		let __temp, __restore;
		const ctx = useNuxtI18nContext(nuxt);
		const serverRedirect = nuxt.ssrContext?.event.context.nuxtI18n?.redirect;
		if (serverRedirect) {
			[__temp, __restore] = executeAsync(() => nuxt.runWithContext(() => navigateTo(serverRedirect.location, {
				external: true,
				redirectCode: serverRedirect.status
			}))), await __temp, __restore();
			return;
		}
		const resolvedLocale = useResolvedLocale();
		[__temp, __restore] = executeAsync(() => nuxt.runWithContext(() => loadAndSetLocale(nuxt, ctx.initial && resolvedLocale.value || detectLocale(nuxt, nuxt.$router.currentRoute.value)))), await __temp, __restore();
	}
});
// ../../node_modules/.pnpm/nuxt-schema-org@7.1.1_01626844176f246658be8c689ed43173/node_modules/nuxt-schema-org/dist/runtime/app/plugins/i18n/defaults.js
var defaults_default = defineNuxtPlugin({
	name: "nuxt-schema-org:defaults",
	dependsOn: ["nuxt-schema-org:meta"],
	setup(nuxtApp) {
		if (useError().value?.error) return;
		const siteConfig = useSiteConfig();
		const schemaOrgConfig = useSchemaOrgConfig();
		const route = useRoute();
		const pathResolver = createSitePathResolver({
			canonical: true,
			absolute: true,
			withBase: true
		});
		if (!nuxtApp.$i18n) return;
		const localePath$2 = useLocalePath();
		const i18n = nuxtApp.$i18n;
		const locales = i18n.locales.value || [];
		const runtimeConfig = useRuntimeConfig();
		const globalDefault = runtimeConfig.public.i18n.defaultLocale || toValue(i18n.defaultLocale);
		const resolveDefaultLocale = () => {
			const defaultLocaleCode = globalDefault;
			const defaultSiteLocale = toValue(siteConfig.defaultLocale);
			return locales.find((locale) => locale.code === defaultLocaleCode) || locales.find((locale) => locale.code === defaultSiteLocale || locale.language === defaultSiteLocale || locale.iso === defaultSiteLocale) || (defaultLocaleCode || defaultSiteLocale ? { code: defaultLocaleCode || defaultSiteLocale } : void 0);
		};
		const siteUrl = () => resolveIdForLocale(i18n.localeProperties.value);
		const identityId = () => `${withTrailingSlash$1(pathResolver("/").value)}#identity`;
		const websiteId = () => `${siteUrl()}#website`;
		const website = defineWebSite({
			"@id": websiteId,
			"url": siteUrl,
			"name": () => toValue(siteConfig.name) || "",
			"inLanguage": () => toValue(i18n.localeProperties.value.language) || "",
			"description": () => toValue(siteConfig.description) || ""
		});
		const runtimeI18n = {
			defaultLocale: globalDefault,
			strategy: i18n.strategy,
			locales: locales.map((locale) => ({
				...locale,
				hreflang: locale.language || locale.iso || locale.code
			}))
		};
		const canonicalDefault = runtimeI18n.locales.find((locale) => locale.code === globalDefault);
		const resolveIdForLocale = (locale) => {
			const path = localePath$2("index", locale.code);
			const domain = resolveCanonicalLocaleDomain(runtimeI18n.locales.find((item) => item.code === locale.code), canonicalDefault);
			if (domain) {
				const prefixed = i18n.strategy === "prefix" || i18n.strategy !== "no_prefix" && locale.code !== toValue(i18n.defaultLocale);
				const prefix = `/${locale.code}`;
				return resolveSitePath(localePath(prefixed && (path === prefix || path.startsWith(`${prefix}/`)) ? path.slice(prefix.length) || "/" : path, locale.code, runtimeI18n, { host: domain }), {
					absolute: true,
					siteUrl: hasProtocol$1(domain, { acceptRelative: false }) ? domain : withHttps(domain),
					trailingSlash: siteConfig.trailingSlash,
					base: runtimeConfig.app.baseURL,
					withBase: true
				});
			}
			return pathResolver(path).value;
		};
		const isCurrentWebsite = (locale) => resolveIdForLocale(locale) === siteUrl();
		const defaultLocale = resolveDefaultLocale();
		if (defaultLocale) {
			if (i18n.localeProperties.value.code !== defaultLocale.code) {
				if (!isCurrentWebsite(defaultLocale)) website.translationOfWork = {
					"@type": "WebSite",
					"@id": () => `${resolveIdForLocale(defaultLocale)}#website`
				};
			} else {
				const workTranslations = locales.filter((locale) => locale.code !== defaultLocale.code && !isCurrentWebsite(locale)).filter((locale) => !schemaOrgConfig.excludeWorkTranslationLocales?.includes(locale.code)).map((locale) => {
					return {
						"@type": "WebSite",
						"@id": () => `${resolveIdForLocale(locale)}#website`
					};
				});
				if (workTranslations.length > 0) website.workTranslation = workTranslations;
			}
		}
		const about = () => {
			const hasIdentity = Boolean(schemaOrgConfig.identity || toValue(siteConfig.identity));
			const isHomepage = withoutTrailingSlash$1(route.path) === withoutTrailingSlash$1(localePath$2("index"));
			if (hasIdentity && isHomepage) return { "@id": identityId() };
			return null;
		};
		nuxtApp.vueApp.provide(localeWebsiteUrlKey, siteUrl);
		useSchemaOrg([website, defineWebPage({ about })]);
		maybeAddIdentitySchemaOrg();
	}
});
// app/stores/auth.ts
var useAuthStore = defineStore("auth", () => {
	const api = useApi();
	const user = ref(null);
	/** `true` quand on sait avec certitude si le visiteur est connecté ou non. */
	const ready = ref(false);
	const isLoggedIn = computed(() => user.value !== null);
	const isAdmin = computed(() => user.value?.role === "admin");
	/** Restaure la session depuis le cookie (appelé par le plugin d'authentification). */
	async function init() {
		try {
			user.value = await api.me();
		} catch {
			user.value = null;
		} finally {
			ready.value = true;
		}
	}
	async function login(input) {
		user.value = await api.login(input);
	}
	async function register(input) {
		user.value = await api.register(input);
	}
	async function logout() {
		try {
			await api.logout();
		} finally {
			user.value = null;
		}
	}
	return {
		user,
		ready,
		isLoggedIn,
		isAdmin,
		init,
		login,
		register,
		logout
	};
});
// app/plugins/auth.ts
var auth_default = defineNuxtPlugin(async () => {
	let __temp, __restore;
	const auth = useAuthStore();
	if (auth.ready) return;
	if (!!useRequestHeaders(["cookie"]).cookie?.includes("picross_session=")) [__temp, __restore] = executeAsync(() => auth.init()), __temp = await __temp, __restore();
	else auth.ready = true;
});
// ../../node_modules/.pnpm/nuxt-seo-utils@9.1.0_74f027baaee2fd75a18687f6c8d3b9ef/node_modules/nuxt-seo-utils/dist/runtime/app/plugins/1.absoluteImageUrls.server.js
var ABSOLUTE_URL_PROPERTIES = /* @__PURE__ */ new Set([
	"og:image",
	"og:image:url",
	"og:image:secure_url",
	"og:video",
	"og:video:url",
	"og:video:secure_url",
	"og:audio",
	"og:audio:url",
	"og:audio:secure_url"
]);
var ABSOLUTE_URL_NAMES = /* @__PURE__ */ new Set(["twitter:image", "twitter:image:src"]);
var _1_absoluteImageUrls_server_default = defineNuxtPlugin({
	enforce: "post",
	setup() {
		const head = injectHead();
		if (!head) return;
		const resolver = createSitePathResolver({
			withBase: true,
			absolute: true,
			canonical: true
		});
		head.use({
			key: "absoluteImageUrls",
			hooks: { "tags:resolve": ({ tags }) => {
				for (const tag of tags) {
					if (tag.tag !== "meta") continue;
					if (!ABSOLUTE_URL_PROPERTIES.has(tag.props.property) && !ABSOLUTE_URL_NAMES.has(tag.props.name)) continue;
					if (typeof tag.props.content !== "string" || !tag.props.content.trim() || tag.props.content.startsWith("http") || tag.props.content.startsWith("//")) continue;
					tag.props.content = unref(resolver(tag.props.content));
				}
			} }
		});
	}
});
// ../../node_modules/.pnpm/nuxt-seo-utils@9.1.0_74f027baaee2fd75a18687f6c8d3b9ef/node_modules/nuxt-seo-utils/dist/runtime/app/plugins/0.routeRules.js
function parseRouteRuleState(context) {
	const rules = context._nitro?.routeRules;
	return {
		head: rules?.head,
		seoMeta: rules?.seoMeta
	};
}
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fplugins.server.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fplugins_server_default = [
	payloadPlugin,
	_0_siteConfig_default,
	plugin$3,
	plugin$2,
	plugin$1,
	plugin,
	i18n_default$1,
	virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fcomponents_plugin_default,
	siteConfig_default,
	inferSeoMetaPlugin_default,
	titlesWaitI18n_default,
	defaultsWaitI18n_default,
	derivedTags_default,
	robot_meta_server_default,
	i18n_default,
	init_default,
	switch_locale_path_ssr_default,
	preload_default,
	meta_default,
	route_locale_detect_default,
	defaults_default,
	auth_default,
	_1_absoluteImageUrls_server_default,
	defineNuxtPlugin({
		enforce: "post",
		env: { islands: false },
		setup() {
			const routeRuleState = useState("nuxt-seo-utils:routeRules", () => null);
			routeRuleState.value = parseRouteRuleState(useRequestEvent()?.context);
			if (routeRuleState.value) {
				const { head: headInput, seoMeta } = routeRuleState.value;
				if (headInput) useHead(headInput);
				if (seoMeta) useSeoMeta(seoMeta);
			}
		}
	}),
	defineNuxtPlugin({
		name: "i18n:plugin:ssg-detect",
		dependsOn: [
			"i18n:plugin",
			"i18n:plugin:route-locale-detect",
			"i18n:plugin:preload"
		],
		enforce: "post",
		setup(nuxt) {}
	})
];
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Flayouts.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Flayouts_default = { default: defineAsyncComponent(() => import('../build/default-pQlgBQmW.mjs').then((m) => m.default || m)) };
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-layout.js
var LayoutLoader = defineComponent({
	name: "LayoutLoader",
	inheritAttrs: false,
	props: {
		name: String,
		layoutProps: Object
	},
	setup(props, context) {
		return () => h(virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Flayouts_default[props.name], props.layoutProps, context.slots);
	}
});
var nuxt_layout_default = defineComponent({
	name: "NuxtLayout",
	inheritAttrs: false,
	props: {
		name: {
			type: [
				String,
				Boolean,
				Object
			],
			default: null
		},
		fallback: {
			type: [String, Object],
			default: null
		}
	},
	setup(props, context) {
		const nuxtApp = useNuxtApp();
		const injectedRoute = inject(PageRouteSymbol);
		const route = !injectedRoute || injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
		const layout = computed(() => {
			let layout = resolveLayoutName(route, props.name);
			if (layout && !(layout in virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Flayouts_default)) {
				if (props.fallback) layout = unref(props.fallback);
			}
			return layout;
		});
		provide(LayoutSymbol, layout);
		const resolveRouteLayout = (routeToCheck) => resolveLayoutName(routeToCheck, props.name);
		const layoutRef = shallowRef();
		context.expose({ layoutRef });
		const done = nuxtApp.deferHydration();
		let lastLayout;
		return () => {
			const hasTransition = !!layout.value && layout.value in virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Flayouts_default && !!(route?.meta.layoutTransition ?? false);
			const transitionProps = hasTransition && _mergeTransitionProps([
				route?.meta.layoutTransition,
				false,
				{
					onBeforeLeave() {
						_startTransition(nuxtApp);
					},
					onAfterLeave() {
						_finishTransition(nuxtApp);
					}
				}
			]);
			const previouslyRenderedLayout = lastLayout;
			lastLayout = layout.value;
			return _wrapInTransition(transitionProps, { default: () => h(Suspense, {
				suspensible: true,
				onResolve: async () => {
					await nextTick(done);
				}
			}, { default: () => h(LayoutProvider, {
				layoutProps: mergeProps(context.attrs, route.meta.layoutProps ?? {}, { ref: layoutRef }),
				key: layout.value || void 0,
				name: layout.value,
				shouldProvide: !props.name,
				resolveRouteLayout,
				isRenderingNewLayout: (name) => {
					return name !== previouslyRenderedLayout && name === layout.value;
				},
				hasTransition
			}, context.slots) }) }).default();
		};
	}
});
var LayoutProvider = defineComponent({
	name: "NuxtLayoutProvider",
	inheritAttrs: false,
	props: {
		name: { type: [String, Boolean] },
		layoutProps: { type: Object },
		hasTransition: { type: Boolean },
		shouldProvide: { type: Boolean },
		isRenderingNewLayout: {
			type: Function,
			required: true
		},
		resolveRouteLayout: {
			type: Function,
			required: true
		}
	},
	setup(props, context) {
		const name = props.name;
		if (props.shouldProvide) provide(LayoutMetaSymbol, { isCurrent: (route) => name === false || name === props.resolveRouteLayout(route) });
		const injectedRoute = inject(PageRouteSymbol);
		const isNotWithinNuxtPage = injectedRoute && injectedRoute === useRoute();
		const enclosingLayout = inject(LayoutMetaSymbol, null);
		if (isNotWithinNuxtPage) {
			const vueRouterRoute = useRoute$1();
			const reactiveChildRoute = {};
			for (const _key in vueRouterRoute) {
				const key = _key;
				Object.defineProperty(reactiveChildRoute, key, {
					enumerable: true,
					get: () => {
						return props.isRenderingNewLayout(props.name) && (!enclosingLayout || enclosingLayout.isCurrent(vueRouterRoute)) ? vueRouterRoute[key] : injectedRoute[key];
					}
				});
			}
			provide(PageRouteSymbol, shallowReactive(reactiveChildRoute));
		}
		return () => {
			if (!name || typeof name === "string" && !(name in virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Flayouts_default)) return context.slots.default?.();
			return h(LayoutLoader, {
				key: name,
				layoutProps: props.layoutProps,
				name
			}, context.slots);
		};
	}
});
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/route-provider.js
var defineRouteProvider = (name = "RouteProvider") => defineComponent({
	name,
	props: {
		route: {
			type: Object,
			required: true
		},
		vnode: Object,
		vnodeRef: Object,
		renderKey: String,
		trackRootNodes: Boolean,
		routeRecord: Object
	},
	setup(props) {
		props.renderKey;
		const previousRoute = props.route;
		const route = {};
		for (const key in props.route) route[key] = previousRoute[key];
		provide(PageRouteSymbol, shallowReactive(route));
		return () => {
			if (!props.vnode) return props.vnode;
			return h(props.vnode, { ref: props.vnodeRef });
		};
	}
});
var RouteProvider = defineRouteProvider();
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/pages/runtime/page.js
var page_default = defineComponent({
	name: "NuxtPage",
	inheritAttrs: false,
	props: {
		name: { type: String },
		transition: {
			type: [Boolean, Object],
			default: void 0
		},
		keepalive: {
			type: [Boolean, Object],
			default: void 0
		},
		route: { type: Object },
		pageKey: {
			type: [Function, String],
			default: null
		}
	},
	setup(props, { attrs, slots, expose }) {
		const nuxtApp = useNuxtApp();
		const pageRef = ref();
		inject(PageRouteSymbol, null);
		expose({ pageRef });
		inject(LayoutMetaSymbol, null);
		nuxtApp.deferHydration();
		return () => {
			return h(RouterView, {
				name: props.name,
				route: props.route,
				...attrs
			}, { default: markStableSlot((routeProps) => {
				return h(Suspense, { suspensible: true }, { default() {
					return h(RouteProvider, {
						vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
						route: routeProps.route,
						vnodeRef: pageRef
					});
				} });
			}) });
		};
	}
});
function markStableSlot(fn) {
	const wrapped = ((routeProps) => {
		const result = fn(routeProps);
		if (Array.isArray(result)) return result;
		if (result == null || !isVNode(result)) return [createCommentVNode()];
		return [result];
	});
	wrapped._n = true;
	return wrapped;
}
function normalizeSlot(slot, data) {
	const slotContent = slot(data);
	return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
// ../../node_modules/.pnpm/@vueuse+core@15.1.0_vue@3.5.46_typescript@5.9.3_/node_modules/@vueuse/core/dist/index.js
var defaultWindow = void 0;
/**
* Get the dom element of a ref of element or Vue component instance
*
* @param elRef
*/
function unrefElement(elRef) {
	var _$el;
	const plain = toValue(elRef);
	return (_$el = plain === null || plain === void 0 ? void 0 : plain.$el) !== null && _$el !== void 0 ? _$el : plain;
}
function useEventListener(...args) {
	const register = (el, event, listener, options) => {
		el.addEventListener(event, listener, options);
		return () => el.removeEventListener(event, listener, options);
	};
	const firstParamTargets = computed(() => {
		const test = toArray(toValue(args[0])).filter((e) => e != null);
		return test.every((e) => typeof e !== "string") ? test : void 0;
	});
	return watchImmediate(() => {
		var _firstParamTargets$va, _firstParamTargets$va2;
		return [
			(_firstParamTargets$va = (_firstParamTargets$va2 = firstParamTargets.value) === null || _firstParamTargets$va2 === void 0 ? void 0 : _firstParamTargets$va2.map((e) => unrefElement(e))) !== null && _firstParamTargets$va !== void 0 ? _firstParamTargets$va : [defaultWindow].filter((e) => e != null),
			toArray(toValue(firstParamTargets.value ? args[1] : args[0])),
			toArray(unref(firstParamTargets.value ? args[2] : args[1])),
			toValue(firstParamTargets.value ? args[3] : args[2])
		];
	}, ([raw_targets, raw_events, raw_listeners, raw_options], _, onCleanup) => {
		if (!(raw_targets === null || raw_targets === void 0 ? void 0 : raw_targets.length) || !(raw_events === null || raw_events === void 0 ? void 0 : raw_events.length) || !(raw_listeners === null || raw_listeners === void 0 ? void 0 : raw_listeners.length)) return;
		const optionsClone = isObject$1(raw_options) ? { ...raw_options } : raw_options;
		const cleanups = raw_targets.flatMap((el) => raw_events.flatMap((event) => raw_listeners.map((listener) => register(el, event, listener, optionsClone))));
		onCleanup(() => {
			cleanups.forEach((fn) => fn());
		});
	}, { flush: "post" });
}
/**
* Mounted state in ref.
*
* @see https://vueuse.org/useMounted
*
* @__NO_SIDE_EFFECTS__
*/
function useMounted() {
	const isMounted = shallowRef(false);
	return isMounted;
}
/* @__NO_SIDE_EFFECTS__ */
function useSupported(callback) {
	const isMounted = useMounted();
	return computed(() => {
		isMounted.value;
		return Boolean(callback());
	});
}
var ssrWidthSymbol = Symbol("vueuse-ssr-width");
/* @__NO_SIDE_EFFECTS__ */
function useSSRWidth() {
	const ssrWidth = hasInjectionContext() ? injectLocal(ssrWidthSymbol, null) : null;
	return typeof ssrWidth === "number" ? ssrWidth : void 0;
}
/**
* Reactive Media Query.
*
* @see https://vueuse.org/useMediaQuery
* @param query
* @param options
*/
function useMediaQuery(query, options = {}) {
	const { window = defaultWindow, ssrWidth = /* @__PURE__ */ useSSRWidth() } = options;
	const isSupported = /* @__PURE__ */ useSupported(() => window && "matchMedia" in window && typeof window.matchMedia === "function");
	const ssrSupport = shallowRef(typeof ssrWidth === "number");
	const mediaQuery = shallowRef();
	const matches = shallowRef(false);
	const handler = (event) => {
		matches.value = event.matches;
	};
	watchEffect(() => {
		if (ssrSupport.value) {
			ssrSupport.value = !isSupported.value;
			const queryStrings = toValue(query).split(",");
			matches.value = queryStrings.some((queryString) => {
				const not = queryString.includes("not all");
				const minWidth = queryString.match(/\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
				const maxWidth = queryString.match(/\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
				let res = Boolean(minWidth || maxWidth);
				if (minWidth && res) res = ssrWidth >= pxValue(minWidth[1]);
				if (maxWidth && res) res = ssrWidth <= pxValue(maxWidth[1]);
				return not ? !res : res;
			});
			return;
		}
		if (!isSupported.value) return;
		mediaQuery.value = window.matchMedia(toValue(query));
		matches.value = mediaQuery.value.matches;
	});
	useEventListener(mediaQuery, "change", handler, { passive: true });
	return computed(() => matches.value);
}
/**
* Reactive dark theme preference.
*
* @see https://vueuse.org/usePreferredDark
* @param [options]
*
* @__NO_SIDE_EFFECTS__
*/
function usePreferredDark(options) {
	return useMediaQuery("(prefers-color-scheme: dark)", options);
}
// app/stores/settings.ts
var COOKIE = {
	maxAge: 31536e3,
	sameSite: "lax",
	path: "/"
};
/**
* Préférences stockées en cookies (et non en localStorage) : le serveur les lit pendant le SSR,
* donc le thème choisi est déjà appliqué dans le HTML reçu (pas de flash).
*/
var useSettingsStore = defineStore("settings", () => {
	const theme = useCookie("picross_theme", {
		...COOKIE,
		default: () => "system"
	});
	const sound = useCookie("picross_sound", {
		...COOKIE,
		default: () => true
	});
	const prefersDark = usePreferredDark();
	return {
		theme,
		sound,
		isDark: computed(() => theme.value === "dark" || theme.value === "system" && prefersDark.value)
	};
});
// app/app.vue?vue&type=script&setup=true&lang.ts
var THEME_INIT = "(function(){try{var m=document.cookie.match(/(?:^|; )picross_theme=([^;]*)/),t=m?decodeURIComponent(m[1]):'system';if(t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})()";
var app_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "app",
	__ssrInlineRender: true,
	setup(__props) {
		const settings = useSettingsStore();
		/**
		* Thème : avec un choix explicite (cookie), la classe `dark` est déjà dans le HTML rendu par le
		* serveur. En mode « système », ce petit script (exécuté avant le premier affichage) la pose
		* d'après les préférences de l'OS, ce qui évite tout flash blanc.
		*/
		const { locales } = useI18n();
		const switchLocalePath = useSwitchLocalePath();
		const siteConfig = useSiteConfig();
		const absolute = (path) => `${siteConfig.url.replace(/\/$/, "")}${path}`;
		const alternates = computed(() => {
			return [...locales.value.map((l) => ({
				rel: "alternate",
				hreflang: l.code,
				href: absolute(switchLocalePath(l.code))
			})), {
				rel: "alternate",
				hreflang: "x-default",
				href: absolute(switchLocalePath("fr"))
			}];
		});
		useHead(() => ({ link: alternates.value }));
		useHead({
			htmlAttrs: { class: computed(() => settings.theme === "dark" ? "dark" : "") },
			script: [{
				innerHTML: THEME_INIT,
				tagPosition: "head",
				tagPriority: "critical"
			}]
		});
		useSeoMeta({
			ogSiteName: "Picross",
			ogImage: () => `${siteConfig.url}/og.png`,
			ogImageWidth: 1200,
			ogImageHeight: 630,
			ogImageAlt: "Picross",
			twitterCard: "summary_large_image"
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(nuxt_layout_default, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(page_default, null, null, _parent, _scopeId));
					else return [createVNode(page_default)];
				}),
				_: 1
			}, _parent));
		};
	}
});
// app/app.vue
var _sfc_setup$2 = app_vue_vue_type_script_setup_true_lang_default.setup;
app_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var app_default = app_vue_vue_type_script_setup_true_lang_default;
// app/error.vue?vue&type=script&setup=true&lang.ts
var error_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "error",
	__ssrInlineRender: true,
	props: { error: {} },
	setup(__props) {
		const props = __props;
		const { t } = useI18n();
		const localePath = useLocalePath();
		const notFound = computed(() => props.error.statusCode === 404);
		useHead({
			title: () => notFound.value ? t("errors.notFoundPage") : t("errors.unknown"),
			meta: [{
				name: "robots",
				content: "noindex"
			}]
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(nuxt_layout_default, _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="mx-auto max-w-md p-8 py-20 text-center"${_scopeId}><p class="text-6xl font-bold text-slate-300 dark:text-slate-700"${_scopeId}>${ssrInterpolate(__props.error.statusCode)}</p><p class="mt-4"${_scopeId}>${ssrInterpolate(unref(notFound) ? unref(t)("errors.notFoundPage") : unref(t)("errors.unknown"))}</p>`);
						_push(ssrRenderNuxtLink(NuxtLink, {
							to: unref(localePath)("index"),
							class: "btn btn-primary mt-6",
							onClick: ($event) => ("clearError" in _ctx ? _ctx.clearError : unref(clearError))()
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(unref(t)("nav.play"))}`);
								else return [createTextVNode(toDisplayString(unref(t)("nav.play")), 1)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
					} else return [createVNode("div", { class: "mx-auto max-w-md p-8 py-20 text-center" }, [
						createVNode("p", { class: "text-6xl font-bold text-slate-300 dark:text-slate-700" }, toDisplayString(__props.error.statusCode), 1),
						createVNode("p", { class: "mt-4" }, toDisplayString(unref(notFound) ? unref(t)("errors.notFoundPage") : unref(t)("errors.unknown")), 1),
						createVNode(NuxtLink, {
							to: unref(localePath)("index"),
							class: "btn btn-primary mt-6",
							onClick: ($event) => ("clearError" in _ctx ? _ctx.clearError : unref(clearError))()
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("nav.play")), 1)]),
							_: 1
						}, 8, ["to", "onClick"])
					])];
				}),
				_: 1
			}, _parent));
		};
	}
});
// app/error.vue
var _sfc_setup$1 = error_vue_vue_type_script_setup_true_lang_default.setup;
error_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("error.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var error_default = error_vue_vue_type_script_setup_true_lang_default;
// virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fisland-renderer.mjs
var IslandRenderer = () => null;
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-root.vue
var _sfc_main = {
	__name: "nuxt-root",
	__ssrInlineRender: true,
	setup(__props) {
		const nuxtApp = useNuxtApp();
		nuxtApp.deferHydration();
		nuxtApp.ssrContext.url;
		const SingleRenderer = false;
		provide(PageRouteSymbol, useRoute());
		nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup", []);
		const error = useError();
		const abortRender = error.value && !nuxtApp.ssrContext.error;
		onErrorCaptured((err, target, info) => {
			nuxtApp.hooks.callHook("vue:error", err, target, info)?.catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
			{
				const p = nuxtApp.runWithContext(() => showError(createErrorFromThrown(err, {
					route: nuxtApp._route
				})));
				onServerPrefetch(() => p);
				_invokeAppErrorHandler(nuxtApp, err, target, info);
				return false;
			}
		});
		const islandContext = nuxtApp.ssrContext.islandContext;
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderSuspense(_push, {
				default: () => {
					if (unref(abortRender)) _push(`<div></div>`);
					else if (unref(error)) _push(ssrRenderComponent(unref(error_default), { error: unref(error) }, null, _parent));
					else if (unref(islandContext)) _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
					else if (unref(SingleRenderer)) renderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
					else _push(ssrRenderComponent(unref(app_default), null, null, _parent));
				}});
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/components/nuxt-root.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
// ../../node_modules/.pnpm/nuxt@4.7.0_@babel+plugin-syntax-jsx@7.29.7_@babel+core@7.29.13__@babel+plugin-syntax-ty_0e60b68396593fbe2e1b279b6c99ae7d/node_modules/nuxt/dist/app/entry.js
var entry$1 = async function createNuxtAppServer(ssrContext) {
	const vueApp = createApp(_sfc_main);
	const nuxt = createNuxtApp({
		vueApp,
		ssrContext
	});
	try {
		await applyPlugins(nuxt, virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fplugins_server_default);
		await nuxt.hooks.callHook("app:created", vueApp);
	} catch (error) {
		await nuxt.hooks.callHook("app:error", error);
		nuxt.payload.error ||= createErrorFromThrown(error, { route: nuxt._route });
	}
	if (ssrContext && (ssrContext["~renderResponse"] || ssrContext._renderResponse)) throw new Error("skipping render");
	return vueApp;
};
var entry_default = ((ssrContext) => entry$1(ssrContext));

const entry = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: entry_default
}, Symbol.toStringTag, { value: 'Module' }));

export { ApiError as A, br as B, qn as C, entry as D, NuxtLink as N, useLocalePath as a, useI18n as b, useApi as c, defineNuxtRouteMiddleware as d, useRoute as e, useHead as f, useIntervalFn as g, useSettingsStore as h, useNuxtApp as i, asyncDataDefaults as j, defineProdDiagnostics as k, docsBase as l, isUntrustedError as m, navigateTo as n, createError as o, prodReporters as p, useSiteConfig as q, refDebounced as r, ssrRenderNuxtLink as s, tryUseNuxtApp as t, useAuthStore as u, vforBound as v, useSchemaOrg as w, defineWebSite as x, defineWebPage as y, useSwitchLocalePath as z };
//# sourceMappingURL=entry.mjs.map
