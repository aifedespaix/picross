declare module '#nuxtseo/nitro' {
  export {
    defineNitroPlugin,
    useNitroApp,
    useEvent,
    useRuntimeConfig,
    defineCachedFunction,
    defineCachedEventHandler,
    useStorage,
    defineTask,
    runTask,
  } from 'nitropack/runtime'
  export function localFetch(request: string | URL | Request, init?: RequestInit, context?: Record<string, unknown>): Promise<Response>
  export function fetchWithEvent<T>(event: import('h3').H3Event, request: import('ofetch').FetchRequest, options?: import('ofetch').FetchOptions): Promise<T>
  export function fetchRawWithEvent(event: import('h3').H3Event, request: RequestInfo | URL, init?: RequestInit): Promise<Response>
}

declare module '#nuxtseo/h3' {
  export * from 'h3'
}
