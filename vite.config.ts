/*
 * @Author: Daybreak
 * @Date: 2022-10-14 18:01:47
 * @LastEditTime: 2022-11-08 18:50:55
 * @LastEditors: error: git config user.name & please set dead value or install git
 * @FilePath: \xingxing-timer\vite.config.ts
 * @Description:
 *
 * Copyright (c) 2022 by Daybreak 450552846@qq.com, All Rights Reserved.
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import electron from "vite-plugin-electron";
import electronRender from "vite-plugin-electron-renderer";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    electron({
      main: {
        entry: "electron/index.ts",
      },
    }),
    electronRender(),
    // 自动引入 vue，pinia 的部分主要依赖，不需要手动引入
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: [
        "vue",
        "pinia",
        {
          "naive-ui": ["useDialog", "useMessage", "useNotification", "useLoadingBar"],
        },
      ],
      dts: "src/auto-import.d.ts", // 生成 `auto-import.d.ts` 全局声明
    }),
    // 自动引入 nativeUI 的组件依赖，不需要手动引入
    Components({
      resolvers: [NaiveUiResolver()],
    }),
  ],
});
