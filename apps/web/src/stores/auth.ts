import type { LoginInput, RegisterInput, UserDto } from '@picross/shared';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { api, ApiError } from '@/api/client';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserDto | null>(null);
  const ready = ref(false);
  let loading: Promise<void> | null = null;

  const isLoggedIn = computed(() => user.value !== null);
  const isAdmin = computed(() => user.value?.role === 'admin');

  /** Restaure la session depuis le cookie ; appelé une seule fois au démarrage. */
  function init(): Promise<void> {
    loading ??= api
      .me()
      .then((me) => {
        user.value = me;
      })
      .catch((error: unknown) => {
        // Une panne réseau ne doit pas bloquer l'application : on reste simplement déconnecté.
        if (!(error instanceof ApiError)) throw error;
        user.value = null;
      })
      .finally(() => {
        ready.value = true;
      });
    return loading;
  }

  async function login(input: LoginInput) {
    user.value = await api.login(input);
  }

  async function register(input: RegisterInput) {
    user.value = await api.register(input);
  }

  async function logout() {
    try {
      await api.logout();
    } finally {
      user.value = null;
    }
  }

  return { user, ready, isLoggedIn, isAdmin, init, login, register, logout };
});
