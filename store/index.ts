/*
 * @Author: Daybreak
 * @Date: 2022-10-17 19:21:26
 * @LastEditTime: 2022-11-07 20:25:10
 * @LastEditors: error: git config user.name & please set dead value or install git
 * @FilePath: \xingxing-timer\store\index.ts
 * @Description: Pinia 的 Store
 *
 * Copyright (c) 2022 by Daybreak 450552846@qq.com, All Rights Reserved.
 */

import { defineStore } from "pinia";
import { ENUM_MINIMIZE, ENUM_TOP } from "../src/enum";

export const useStore = defineStore("Store", {
  state: () => ({
    minimize: ENUM_MINIMIZE.ISFIRST,
    pushpin: ENUM_TOP.NOTTOP,
    showPageSetting: false, // 是否展示设置页
    showPageQuestion: false, // 是否展示关于我们页
    showPageActive: false, // 是否展示激活页面
    timer: [] as { name: string; time: number }[], // 定时器
  }),
  // 类似 computed 修饰值属性
  getters: {
    showPageMain(): Boolean {
      return !(this.showPageSetting || this.showPageQuestion || this.showPageActive);
    },
  },
  // 类似 method 可以做同步、异步，提交state
  actions: {},
});
