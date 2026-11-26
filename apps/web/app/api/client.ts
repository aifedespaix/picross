import type {
  ApiErrorBody,
  CreatePicrossInput,
  LoginInput,
  PicrossDetail,
  PicrossSummary,
  RegisterInput,
  UserDto,
} from '@picross/shared';

export class ApiError extends Error {
  constructor(
    readonly status: number,
    /** Code machine renvoyé par l'API (`invalid_credentials`, `validation`, …). */
    readonly code: string,
    readonly fields: Record<string, string> = {},
  ) {
    super(code);
  }
  /** `true` pour une panne réseau / serveur injoignable. */
  get isNetwork() {
    return this.status === 0 || this.status >= 502;
  }
}

/** Fonction de requête compatible `$fetch` (côté serveur : `useRequestFetch()`, qui relaie les cookies). */
export type Fetcher = <T>(
  url: string,
  options?: { method?: string; body?: unknown; query?: object },
) => Promise<T>;

async function request<T>(
  fetcher: Fetcher,
  method: string,
  path: string,
  body?: unknown,
  query?: object,
): Promise<T> {
  try {
    return await fetcher<T>(`/api${path}`, { method, body, query });
  } catch (error) {
    const e = error as { status?: number; statusCode?: number; data?: Partial<ApiErrorBody> };
    const status = e.status ?? e.statusCode ?? 0;
    throw new ApiError(status, e.data?.error ?? (status ? 'unknown' : 'network'), e.data?.fields);
  }
}

export interface PicrossList {
  items: PicrossSummary[];
  total: number;
}

export interface ListParams {
  search?: string;
  sort?: 'recent' | 'popular';
  status?: 'validated' | 'pending' | 'all';
  limit?: number;
  offset?: number;
}

const clean = (params: object) =>
  Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  );

export function createApi(fetcher: Fetcher) {
  return {
    me: () => request<UserDto | null>(fetcher, 'GET', '/auth/me'),
    login: (input: LoginInput) => request<UserDto>(fetcher, 'POST', '/auth/login', input),
    register: (input: RegisterInput) => request<UserDto>(fetcher, 'POST', '/auth/register', input),
    logout: () => request<void>(fetcher, 'POST', '/auth/logout'),

    listPicrosses: (params: ListParams = {}) =>
      request<PicrossList>(fetcher, 'GET', '/picrosses', undefined, clean(params)),
    myPicrosses: () => request<PicrossList>(fetcher, 'GET', '/picrosses/mine'),
    randomPicross: (exclude?: string) =>
      request<PicrossDetail>(fetcher, 'GET', '/picrosses/random', undefined, clean({ exclude })),
    getPicross: (id: string) => request<PicrossDetail>(fetcher, 'GET', `/picrosses/${id}`),
    createPicross: (input: CreatePicrossInput) =>
      request<PicrossSummary>(fetcher, 'POST', '/picrosses', input),
    deletePicross: (id: string) => request<void>(fetcher, 'DELETE', `/picrosses/${id}`),
    likePicross: (id: string, liked: boolean) =>
      request<PicrossSummary>(fetcher, 'PUT', `/picrosses/${id}/like`, { liked }),
    validatePicross: (id: string, validated: boolean) =>
      request<PicrossSummary>(fetcher, 'PUT', `/picrosses/${id}/validation`, { validated }),
  };
}

export type Api = ReturnType<typeof createApi>;
