<!--
 * @Author: Daybreak
 * @Date: 2022-07-29 16:38:21
 * @LastEditTime: 2022-11-08 18:45:18
 * @LastEditors: error: git config user.name & please set dead value or install git
 * @Description: 
 * 
 * Copyright (c) 2022 by Daybreak 450552846@qq.com, All Rights Reserved. 
-->

<template>
  <!-- 全局化配置 -->
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides" abstract inline-theme-disabled
    preflight-style-disabled>
    <!-- 全局样式 -->
    <n-global-style />
    <template v-if="store.showPageActive">
      <PageActive></PageActive>
    </template>
    <template v-else>
      <PageHeader></PageHeader>
      <PageMain v-show="store.showPageMain"></PageMain>
      <PageSetting v-show="store.showPageSetting"></PageSetting>
      <PageQuestion v-show="store.showPageQuestion"></PageQuestion>
    </template>
  </n-config-provider>
</template>


<script setup lang="ts">
import { useOsTheme, darkTheme, GlobalThemeOverrides } from 'naive-ui'
import { useStore } from '../store';
import PageHeader from './PageHeader.vue';
import PageMain from './PageMain.vue';
import PageSetting from './PageSetting.vue';
import PageQuestion from './PageQuestion.vue';
import PageActive from './PageActive.vue';

const OsTheme = useOsTheme();
let theme = computed(() => OsTheme.value === 'dark' ? darkTheme : null)

// 修改全局样式
const themeOverrides: GlobalThemeOverrides = {
  common: {
    fontFamily: 'v-mono, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontWeight: '400'
  }
}

const store = useStore();

// store 中的 state 有值发生改变的时候就会触发
store.$subscribe((args, state) => {
  const keys: string[] = ['showPageSetting', 'showPageQuestion', 'showPageActive'];
  type Keys = 'showPageSetting' | 'showPageQuestion' | 'showPageActive';
  const { key, newValue: value } = args.events as any
  // 修改的值为控制 Page 显隐的值，则将其他的值设为 false
  if (keys.indexOf(key) !== -1 && value) {
    keys.forEach((k: String) => {
      state[k as Keys] = k === key
    });
  }
})
</script>

<style>
body {
  /* 禁止刷蓝 */
  user-select: none;
  -webkit-user-select: none;
}
</style>