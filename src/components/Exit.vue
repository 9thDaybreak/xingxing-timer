<!--
 * @Author: Daybreak
 * @Date: 2022-10-17 13:50:29
 * @LastEditTime: 2022-10-25 16:07:27
 * @LastEditors: Daybreak
 * @FilePath: \xingxing-timer\src\components\Exit.vue
 * @Description: 退出按钮
 * 
 * Copyright (c) 2022 by Daybreak 450552846@qq.com, All Rights Reserved. 
-->

<template>
    <n-tooltip placement="bottom" trigger="hover">
        <template #trigger>
            <n-button strong round quaternary type="primary" size="small" circle @click="close" :focusable="false">
                <template #icon>
                    <n-icon>
                        <CloseFilled />
                    </n-icon>
                </template>
            </n-button>
        </template>
        退出
    </n-tooltip>
</template>

<script lang="ts" setup>
import { CloseFilled } from '@vicons/material'
import { ipcRenderer } from 'electron'

/**
 * @description: 发送关闭命令
 * @return {*}
 */
const close = () => {
    ipcRenderer.send('window-close')
}
</script>