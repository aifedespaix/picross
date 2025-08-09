/**
 * Minimal declaration for webpack's `require.context` used by the
 * internationalization loader. This removes the dependency on the
 * `webpack-env` type definitions, which are no longer maintained.
 */
interface WebpackRequire extends NodeRequire {
  context(path: string, deep?: boolean, filter?: RegExp): any;
}

declare const require: WebpackRequire;
