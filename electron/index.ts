/*
 * @Author: Daybreak
 * @Date: 2022-10-07 22:14:28
 * @LastEditTime: 2022-11-03 17:07:06
 * @LastEditors: Daybreak
 * @FilePath: \xingxing-timer\electron\index.ts
 * @Description:
 *
 * Copyright (c) 2022 by Daybreak 450552846@qq.com, All Rights Reserved.
 */

import {
  app, // app 控制应用程序的事件生命周期
  BrowserWindow, // BrowserWindow 创建并控制浏览器窗口
  ipcMain,
  Menu,
  Tray,
  Notification,
  globalShortcut,
} from "electron";
import path from "path";
import { ENUM_MINIMIZE, ENUM_TOP } from "../src/enum";

let win: BrowserWindow | null;
let tray: Tray | null;

// 创建窗口
const createWindow = () => {
  win = new BrowserWindow({
    title: "醒醒计时器",
    icon: process.env.NODE_ENV === "development" ? "./icons/icon.ico" : path.join(__dirname, "../icon.png"),
    width: 800,
    height: 2000,
    frame: false, // 无边框窗口
    resizable: false, // 禁止用户调整窗口大小
    // 配置
    webPreferences: {
      nodeIntegration: true, // 可以在渲染进程调用 node
      contextIsolation: false,
      //允许 html 页面上的 javascipt 代码访问 nodejs 环境 api 代码的能力（与node集成的意思）
    },
  });

  // 右下角系统栏的图标
  tray = new Tray(
    process.env.NODE_ENV === "development" ? "./icons/icon.ico" : path.join(__dirname, "../../../icons/icon.ico")
  );

  // 托盘处右键显示的菜单列表
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "显示主面板",
      click: () => {
        if (win?.isMinimized()) win?.restore();
        if (!win?.isVisible()) win?.show();
        win?.focus();
      },
    },
    {
      label: "退出",
      click: () => {
        // win?.close();
        app.quit();
      },
    }, //我们需要在这里有一个真正的退出（这里直接强制退出）
  ]);
  tray.setToolTip("醒醒计时器"); // 鼠标移动到图标上显示的 ToolTip
  tray.setContextMenu(contextMenu); // 右键图标时的菜单
  tray.on("click", () => {
    // 模拟桌面程序点击通知区图标实现打开显示/隐藏应用的功能
    win!.isVisible() ? win!.hide() : win!.show();
    win!.isVisible() ? win!.setSkipTaskbar(false) : win!.setSkipTaskbar(true);
  });

  // 配置启动路径
  if (process.env.NODE_ENV !== "development") {
    // 生产环境
    win.loadFile(path.join(__dirname, "../index.html"));
  } else {
    // 开发环境
    win.loadURL(`http://${process.env["VITE_DEV_SERVER_HOSTNAME"]}:${process.env["VITE_DEV_SERVER_PORT"]}`);
    // 启动窗口位置
    win.setPosition(0, 0);
    // 打开调试工具
    win.webContents.openDevTools();
  }
  // isPackaged 属性有 BUG 尚未修复，如果修复可以用以下代码替换上面代码
  // if (app.isPackaged) {
  //   win.loadFile(path.join(__dirname, "../index.html"));
  // } else {
  //   win.loadURL(
  //     `http://${process.env["VITE_DEV_SERVER_HOSTNAME"]}:${process.env["VITE_DEV_SERVER_PORT"]}`
  //   );
  // }

  // 设置 appId
  app.setAppUserModelId("醒醒计时器");

  // 生产环境下禁用 F5、F11、Ctrl+R 事件
  if (process.env.NODE_ENV !== "development") {
    globalShortcut.register("F5", () => false);
    globalShortcut.register("F11", () => false);
    globalShortcut.register("CommandOrControl+R", () => false);
  }

  // 屏蔽右键菜单
  win.hookWindowMessage(278, function (e) {
    win?.setEnabled(false); //窗口禁用
    setTimeout(() => {
      win?.setEnabled(true);
    }, 100); // 延时太快会立刻启动，太慢会妨碍窗口其他操作，可自行测试最佳时间
    return true;
  });
};

// 主进程发送通信
//   win?.webContents.send("load", { message: "初始化成功" });

// 主进程接收渲染进程通信
/**
 * @description: 接收最小化命令
 * @param {String} window - 监听事件名
 * @param {Function} function - 事件函数
 * @return {*}
 */
ipcMain.on("window-minimize", (event: Electron.IpcMainEvent, res) => {
  win!.minimize();
  win!.hide();
  // 发送通知
  if (res === ENUM_MINIMIZE.ISFIRST) {
    let options = {
      title: "程序已最小化至右下角任务栏",
      body: "单击图标恢复程序窗口",
      icon: process.env.NODE_ENV === "development" ? "./icons/icon.ico" : path.join(__dirname, "../icon.png"),
    };
    let notification = new Notification(options);
    notification.show();
    notification.on("click", () => {
      win!.show();
      win!.setSkipTaskbar(true);
    });
  }
});

/**
 * @description: 接收关闭窗口命令
 * @param {String} window - 监听事件名
 * @param {Function} function - 事件函数
 * @return {*}
 */
ipcMain.on("window-close", function () {
  // win!.close();
  app.quit();
});

/**
 * @description: 监听窗口移动
 * @param {String} window - 监听事件名
 * @param {Function} function - 事件函数
 * @return {*}
 */
ipcMain.on("window-move", (event: Electron.IpcMainEvent, res) => {
  win!.setPosition(res.appX, res.appY);
});

/**
 * @description: 切换置顶状态
 * @param {String} window - 监听事件名
 * @param {Function} function - 事件函数
 * @return {*}
 */
ipcMain.on("window-alwaysoOnTop", (event: Electron.IpcMainEvent, res) => {
  win!.setAlwaysOnTop(res === ENUM_TOP.ISTOP);
});

// 在Electron完成初始化时被触发
app.whenReady().then(createWindow);

// 禁止程序多开，此处需要单例锁的打开注释即可
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  // 有人试图运行第二个实例，我们应该关注我们的窗口
  app.on("second-instance", () => {
    if (win?.isMinimized()) win?.restore();
    if (!win?.isVisible()) win?.show();
    win?.focus();
  });
}
