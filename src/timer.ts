/*
 * @Author: Daybreak
 * @Date: 2022-11-03 17:09:19
 * @LastEditTime: 2023-02-15 22:16:54
 * @LastEditors: error: git config user.name & please set dead value or install git
 * @FilePath: \xingxing-timer\src\timer.ts
 * @Description: 核心计时器类
 *
 * Copyright (c) 2022 by Daybreak 450552846@qq.com, All Rights Reserved.
 */

import { useNow, useDateFormat } from "@vueuse/core";

/**
 * @description: 精确乘法
 * @param {number} arg1
 * @param {number} arg2
 * @return {*}
 */
const accMul = (arg1: number, arg2: number) => {
  let m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) / Math.pow(10, m);
};

/**
 * @description: 精确除法
 * @param {number} arg1
 * @param {number} arg2
 * @return {*}
 */
const accDiv = (arg1: number, arg2: number) => {
  let t1 = 0,
    t2 = 0,
    r1,
    r2;
  try {
    t1 = arg1.toString().split(".")[1].length;
  } catch (e) {}
  try {
    t2 = arg2.toString().split(".")[1].length;
  } catch (e) {}
  r1 = Number(arg1.toString().replace(".", ""));
  r2 = Number(arg2.toString().replace(".", ""));
  return accMul(r1 / r2, Math.pow(10, t2 - t1));
};

class TimerPublic {
  name: string;
  time: number;
  // 用于显示
  overTime: string;
  totalTime: string;
  finalTime: string;
  percentage: number;
  overTitle: string;
  pauseTitle: string;
  isPause: boolean;
  isOver: boolean;
  constructor(name: string, time: number) {
    // 初始化数据
    // 用户传入
    this.name = name; // 计时器名称
    this.time = time; // 时长,单位分钟（m）
    // 用于显示
    this.overTime = "0 秒"; // 已经完成
    const finalTime = new Date().getTime() + accMul(accMul(time, 60), 1000); // 到期时间
    const hour = time > 60 ? Math.floor(accDiv(time, 60)) : 0;
    const min = time > 60 ? time % 60 : time;
    this.totalTime = `${hour ? hour + " 小时 " : ""}${min} 分钟`; // 总时长
    this.finalTime = formatTime(finalTime, "hh:mm:ss"); // 到期时间
    this.percentage = 0; // 百分比
    this.overTitle = "(结束)";
    this.pauseTitle = "(暂停)";
    this.isOver = true;
    this.isPause = false;
  }
}

class Timer111 extends TimerPublic {
  // 用于计算
  timer: any; // 计时器标记
  computTotalTime: number = accMul(this.time, 60); // 总时长，用于标记，单位秒（s）
  computTime: number = 0; // 已经经过的时长，单位秒（s）
  constructor(name: string, time: number) {
    super(name, time);
  }

  /**
   * @description: 启动定时器
   * @return {*}
   */
  createTimer() {
    console.log(this);
    // 如果已结束
    if (this.isOver) {
      this.isOver = false;
      this.computTime = 0;
      this.percentage = 0;
      this.overTime = "0 秒";
    }
    if (this.isPause) this.isPause = false;

    this.name = this.name.replace(this.overTitle, "");
    this.name = this.name.replace(this.pauseTitle, "");
    this.timer = setInterval(() => {
      this.computTime++;
      this.percentage = Math.ceil(accDiv(this.computTime, this.computTotalTime) * 100); // 百分比
      this.overTime = formatSeconds(this.computTime);
      // 到时间，则清空定时器
      if (this.computTime >= this.computTotalTime) {
        this.clearTimer();
        this.name = this.name + this.overTitle;
        this.isOver = true;
        this.overTime = this.totalTime;
        this.percentage = 100;
      }
    }, 1000);
  }

  /**
   * @description: 重置定时器
   * @return {*}
   */
  resetTimer() {
    this.clearTimer();
    this.overTime = "0 秒"; // 归零已经完成时间
    this.percentage = 0; // 归零百分比
    this.computTime = 0; // 归零计时器
    // 重新计算到期时间
    const finalTime = new Date().getTime() + accMul(accMul(this.time, 60), 1000);
    this.finalTime = formatTime(finalTime, "hh:mm:ss"); // 到期时间
    this.computTotalTime = accMul(this.time, 60); // 总时长，用于标记，单位秒（s）
    this.computTime = 0; // 已经经过的时长，单位秒（s）
    this.createTimer();
  }

  /**
   * @description: 清除定时器
   * @return {*}
   */
  clearTimer(): any {
    clearInterval(this.timer);
  }

  /**
   * @description: 暂停定时器
   * @return {*}
   */
  pauseTimer() {
    this.clearTimer();
    this.isPause = true;
    this.name = this.name + this.pauseTitle;
  }
}

export default Timer;
