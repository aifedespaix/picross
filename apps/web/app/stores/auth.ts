import type { LoginInput, RegisterInput, UserDto } from '@picross/shared';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const api = useApi();
  const user = ref<UserDto | null>(null);
  /** `true` quand on sait avec certitude si le visiteur est connecté ou non. */
  const ready = ref(false);

  const isLoggedIn = computed(() => user.value !== null);
  const isAdmin = computed(() => user.value?.role === 'admin');

  /** Restaure la session depuis le cookie (appelé par le plugin d'authentification). */
  async function init() {
    try {
      user.value = await api.me();
    } catch {
      user.value = null; // API injoignable : on reste simplement déconnecté
    } finally {
      ready.value = true;
    }
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
