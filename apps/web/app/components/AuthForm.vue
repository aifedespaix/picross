<script setup lang="ts">
import { loginSchema, PASSWORD_MIN, registerSchema } from '@picross/shared';
import { computed, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Icon from '@/components/Icon.vue';
import { useFormErrors } from '@/composables/useFormErrors';
import { safeRedirect } from '@/utils/redirect';
import { useAuthStore } from '@/stores/auth';

const props = defineProps<{ mode: 'login' | 'register' }>();
const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const auth = useAuthStore();
const { fields, formError, validate, handleApiError } = useFormErrors();

const form = reactive({ name: '', email: '', password: '' });
const showPassword = ref(false);
const submitting = ref(false);
const isRegister = computed(() => props.mode === 'register');

async function submit() {
  submitting.value = true;
  try {
    if (isRegister.value) {
      const input = validate(registerSchema, form);
      if (!input) return;
      await auth.register(input);
    } else {
      const input = validate(loginSchema, { email: form.email, password: form.password });
      if (!input) return;
      await auth.login(input);
    }
    await navigateTo(safeRedirect(route.query.redirect) ?? localePath('index'), { replace: true });
  } catch (error) {
    handleApiError(error);
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div class="mx-auto max-w-sm p-4 pt-8">
    <h1 class="mb-6 text-2xl font-bold">
      {{ isRegister ? t('auth.registerTitle') : t('auth.loginTitle') }}
    </h1>

    <form class="card space-y-4" novalidate @submit.prevent="submit">
      <div v-if="isRegister">
        <label for="name" class="field-label">{{ t('auth.name') }}</label>
        <input
          id="name"
          v-model="form.name"
          class="field-input"
          type="text"
          autocomplete="username"
          :aria-invalid="!!fields.name"
          :aria-describedby="fields.name ? 'name-error' : undefined"
        />
        <p v-if="fields.name" id="name-error" class="field-error">{{ fields.name }}</p>
      </div>

      <div>
        <label for="email" class="field-label">{{ t('auth.email') }}</label>
        <input
          id="email"
          v-model="form.email"
          class="field-input"
          type="email"
          inputmode="email"
          autocomplete="email"
          :aria-invalid="!!fields.email"
          :aria-describedby="fields.email ? 'email-error' : undefined"
        />
        <p v-if="fields.email" id="email-error" class="field-error">{{ fields.email }}</p>
      </div>

      <div>
        <label for="password" class="field-label">{{ t('auth.password') }}</label>
        <div class="relative">
          <input
            id="password"
            v-model="form.password"
            class="field-input pr-12"
            :type="showPassword ? 'text' : 'password'"
            :autocomplete="isRegister ? 'new-password' : 'current-password'"
            :aria-invalid="!!fields.password"
            :aria-describedby="
              fields.password ? 'password-error' : isRegister ? 'password-hint' : undefined
            "
          />
          <button
            type="button"
            class="absolute inset-y-0 right-0 grid w-11 place-items-center text-slate-500"
            :aria-label="showPassword ? t('auth.hide') : t('auth.show')"
            :aria-pressed="showPassword"
            @click="showPassword = !showPassword"
          >
            <Icon :name="showPassword ? 'eyeOff' : 'eye'" />
          </button>
        </div>
        <p v-if="fields.password" id="password-error" class="field-error">{{ fields.password }}</p>
        <p v-else-if="isRegister" id="password-hint" class="mt-1 text-sm text-slate-500">
          {{ t('auth.passwordHint', { min: PASSWORD_MIN }) }}
        </p>
      </div>

      <p v-if="formError" class="field-error" role="alert">{{ formError }}</p>

      <button type="submit" class="btn btn-primary w-full" :disabled="submitting">
        {{ isRegister ? t('auth.submitRegister') : t('auth.submitLogin') }}
      </button>
    </form>

    <p class="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
      {{ isRegister ? t('auth.haveAccount') : t('auth.noAccount') }}
      <NuxtLink
        :to="{ path: localePath(isRegister ? 'login' : 'register'), query: route.query }"
        class="font-medium text-ink underline decoration-demon underline-offset-4 dark:text-pearl"
      >
        {{ isRegister ? t('nav.login') : t('nav.register') }}
      </NuxtLink>
    </p>
  </div>
</template>
