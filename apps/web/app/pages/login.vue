<script setup lang="ts">
import AuthForm from '@/components/AuthForm.vue';

const { t } = useI18n();
definePageMeta({ middleware: 'guest' });
useSeoMeta({ title: () => t('nav.login'), robots: 'noindex, nofollow' });
</script>

<template><AuthForm mode="login" /></template>
