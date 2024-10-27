<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import CarbonAds from "../components/CarbonAds.vue";
</script>

<template>
  <ParentLayout>
    <template #sidebar-top>
      <slot name="sidebar-top" />
      <CarbonAds/>
    </template>
  </ParentLayout>
</template>
