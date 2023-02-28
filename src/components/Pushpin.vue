<!--
 * @Author: Daybreak
 * @Date: 2022-10-25 13:48:49
 * @LastEditTime: 2022-10-25 16:12:33
 * @LastEditors: Daybreak
 * @FilePath: \xingxing-timer\src\components\Pushpin.vue
 * @Description: 置顶按钮
 * 
 * Copyright (c) 2022 by Daybreak 450552846@qq.com, All Rights Reserved. 
-->

<template>
    <n-tooltip placement="bottom" trigger="hover">
        <template #trigger>
            <n-button strong round quaternary type="primary" size="small" circle @click="changeOnTop"
                :focusable="false">
                <template #icon>
                    <n-icon>
                        <!-- 置顶 Icon -->
                        <PushPinFilled v-show="store.pushpin === ENUM_TOP.ISTOP" />
                        <!-- 未置顶 Icon -->
                        <PushPinOutlined v-show="store.pushpin === ENUM_TOP.NOTTOP" />
                    </n-icon>
                </template>
            </n-button>
        </template>
        {{ store.pushpin === ENUM_TOP.ISTOP ? "置顶ing" : "置顶" }}
    </n-tooltip>
</template>

<script lang="ts" setup>
import { PushPinFilled, PushPinOutlined } from '@vicons/material'
import { ipcRenderer } from 'electron'
import { ENUM_TOP } from '../enum'
import { useStore } from '../../store'

const store = useStore()

/**
 * @description: 切换置顶状态
 * @return {*}
 */
const changeOnTop = () => {
    store.pushpin = store.pushpin === ENUM_TOP.ISTOP ? ENUM_TOP.NOTTOP : ENUM_TOP.ISTOP;
    ipcRenderer.send('window-alwaysoOnTop', store.pushpin)
}
</script>