<!--
 * @Author: Daybreak
 * @Date: 2022-10-17 15:10:04
 * @LastEditTime: 2022-10-25 16:07:52
 * @LastEditors: Daybreak
 * @FilePath: \xingxing-timer\src\components\Minimum.vue
 * @Description: 最小化按钮
 * 
 * Copyright (c) 2022 by Daybreak 450552846@qq.com, All Rights Reserved. 
-->

<template>
    <n-tooltip placement="bottom" trigger="hover">
        <template #trigger>
            <n-button quaternary type="primary" size="small" circle @click="minimize" :focusable="false">
                <template #icon>
                    <n-icon>
                        <MinimizeRound />
                    </n-icon>
                </template>
            </n-button>
        </template>
        最小化
    </n-tooltip>
</template>

<script lang="ts" setup>
import { MinimizeRound } from '@vicons/material'
import { ipcRenderer } from 'electron'
import { useStore } from '../../store'
import { ENUM_MINIMIZE } from '../enum'

const store = useStore()

/**
 * @description: 发送最小化命令
 * @return {*}
 */
const minimize = () => {
    ipcRenderer.send('window-minimize', store.minimize)
    if (store.minimize === ENUM_MINIMIZE.ISFIRST) store.minimize = ENUM_MINIMIZE.NOTFIRST
}
</script>