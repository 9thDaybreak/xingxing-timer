/*
 * @Author: Daybreak
 * @Date: 2022-10-14 18:01:47
 * @LastEditTime: 2022-11-08 18:39:20
 * @LastEditors: error: git config user.name & please set dead value or install git
 * @FilePath: \xingxing-timer\src\main.ts
 * @Description: 入口文件
 *
 * Copyright (c) 2022 by Daybreak 450552846@qq.com, All Rights Reserved.
 */

import App from "./App.vue";
import "vfonts/FiraCode.css"; // 引入字体
import { PiniaPluginContext } from "pinia";
import mitt from "mitt";

// 实现 pinia 数据持久化
interface Options {
  key?: string;
}

const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getStorage = (key: string) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {};
};

const __piniaKey__ = "pinia";
// 接收一个对象，其中的 key 值为标记，默认为__piniaKey__
const piniaPlugin = (options: Options) => {
  return (context: PiniaPluginContext) => {
    const { store } = context;
    const data = getStorage(`${options?.key ?? __piniaKey__}-${store.$id}`);
    store.$subscribe(() => {
      setStorage(`${options?.key ?? __piniaKey__}-${store.$id}`, toRaw(store.$state));
    });
    return { ...data };
  };
};

const store = createPinia();
store.use(piniaPlugin({}));

const app = createApp(App);
app.config.globalProperties.$emitter = mitt();

app.use(store);
app.mount("#app");
