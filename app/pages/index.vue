<script setup lang="ts">
import BeBloody from "~/components/BeBloody.vue";
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 h-screen">
<!--    <h1 class="font-bold text-2xl text-(&#45;&#45;ui-primary)">-->
<!--      Nuxt UI - Starter-->
<!--    </h1>-->

<!--    <div class="flex items-center gap-2">-->
<!--      <UButton-->
<!--        label="Documentation"-->
<!--        icon="i-lucide-square-play"-->
<!--        to="https://ui.nuxt.com/getting-started/installation/nuxt"-->
<!--        target="_blank"-->
<!--      />-->

<!--      <UButton-->
<!--        label="GitHub"-->
<!--        color="neutral"-->
<!--        variant="outline"-->
<!--        icon="i-simple-icons-github"-->
<!--        to="https://github.com/nuxt/ui"-->
<!--        target="_blank"-->
<!--      />-->
<!--    </div>-->

    <UApp>
      <BeBloody />
    </UApp>
  </div>
</template>
