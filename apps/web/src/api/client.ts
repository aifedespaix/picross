import type {
  ApiErrorBody,
  CreatePicrossInput,
  LoginInput,
  PicrossDetail,
  PicrossSummary,
  RegisterInput,
  UserDto,
} from '@picross/shared';

const BASE = import.meta.env.VITE_API_BASE ?? '/api';

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
    return this.status === 0;
  }
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${BASE}${path}`, {
      method,
      credentials: 'same-origin',
      headers: body === undefined ? undefined : { 'content-type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0, 'network');
  }
  if (response.status === 204) return undefined as T;

  const data: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const error = (data ?? {}) as Partial<ApiErrorBody>;
    throw new ApiError(response.status, error.error ?? 'unknown', error.fields);
  }
  return data as T;
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

function query(params: object): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') search.set(key, String(value));
  }
  const text = search.toString();
  return text ? `?${text}` : '';
}

export const api = {
  me: () => request<UserDto | null>('GET', '/auth/me'),
  login: (input: LoginInput) => request<UserDto>('POST', '/auth/login', input),
  register: (input: RegisterInput) => request<UserDto>('POST', '/auth/register', input),
  logout: () => request<void>('POST', '/auth/logout'),

  listPicrosses: (params: ListParams = {}) =>
    request<PicrossList>('GET', `/picrosses${query(params)}`),
  myPicrosses: () => request<PicrossList>('GET', '/picrosses/mine'),
  randomPicross: (exclude?: string) =>
    request<PicrossDetail>('GET', `/picrosses/random${query({ exclude })}`),
  getPicross: (id: string) => request<PicrossDetail>('GET', `/picrosses/${id}`),
  createPicross: (input: CreatePicrossInput) =>
    request<PicrossSummary>('POST', '/picrosses', input),
  deletePicross: (id: string) => request<void>('DELETE', `/picrosses/${id}`),
  likePicross: (id: string, liked: boolean) =>
    request<PicrossSummary>('PUT', `/picrosses/${id}/like`, { liked }),
  validatePicross: (id: string, validated: boolean) =>
    request<PicrossSummary>('PUT', `/picrosses/${id}/validation`, { validated }),
};
