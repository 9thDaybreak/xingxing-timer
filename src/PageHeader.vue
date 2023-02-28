<!--
 * @Author: Daybreak
 * @Date: 2022-10-15 16:26:01
 * @LastEditTime: 2022-10-25 19:38:35
 * @LastEditors: Daybreak
 * @FilePath: \xingxing-timer\src\PageHeader.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by Daybreak 450552846@qq.com, All Rights Reserved. 
-->

<template>
    <div class="pageHeader" @mousedown="mousedown" @mousemove="onmousemove" @mouseup="onmouseup">
        <n-button strong round ghost type="primary">
            <template #icon>
                <n-icon>
                    <add-alarm-round />
                </n-icon>
            </template>
            新增计时器
        </n-button>
        <n-space :size="0">
            <Pushpin></Pushpin>
            <Setting></Setting>
            <Question></Question>
            <Minimum></Minimum>
            <Exit></Exit>
        </n-space>
    </div>
</template>

<script lang="ts" setup>
import { ipcRenderer } from 'electron';
import Exit from './components/Exit.vue';
import Minimum from './components/Minimum.vue';
import Pushpin from './components/Pushpin.vue';
import Setting from './components/Setting.vue';
import Question from './components/Question.vue';
import { AddAlarmRound } from '@vicons/material';

// 以下代码实现鼠标按住 PageHeader 后可拖拽移动窗口，完美无延迟
let isKeyDown: Boolean = false;
let dinatesX: number = 0;
let dinatesY: number = 0;

/**
 * @description: 鼠标按下-记录当前坐标，同时修改标记位
 * @param {*} e
 * @return {*}
 */
const mousedown = (e: MouseEvent) => {
    isKeyDown = true
    dinatesX = e.x
    dinatesY = e.y
}

/**
 * @description: 鼠标移动中-持续给主进程更新坐标
 * @return {*}
 */
const onmousemove = (e: MouseEvent) => {
    if (isKeyDown) {
        const x = e.screenX - dinatesX
        const y = e.screenY - dinatesY
        ipcRenderer.send('window-move', {
            appX: x,
            appY: y
        })
    }
};

/**
 * @description: 鼠标松开-修改标记位
 * @return {*}
 */
const onmouseup = () => {
    isKeyDown = false
};
</script>

<style lang="scss" scoped>
.pageHeader {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 18px 0 20px;
}
</style>