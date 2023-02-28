<!--
 * @Author: Daybreak
 * @Date: 2022-10-25 15:34:50
 * @LastEditTime: 2022-10-25 16:10:47
 * @LastEditors: Daybreak
 * @FilePath: \xingxing-timer\src\components\Setting.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by Daybreak 450552846@qq.com, All Rights Reserved. 
-->

<template>
    <n-tooltip placement="bottom" trigger="hover">
        <template #trigger>
            <n-button strong round quaternary type="primary" size="small" circle
                @click="store.showPageSetting = !store.showPageSetting" :focusable="false">
                <template #icon>
                    <n-icon>
                        <!-- 未显示设置窗口 -->
                        <SettingsOutlined v-show="!store.showPageSetting" />
                        <!-- 显示设置窗口 -->
                        <SettingsRound v-show="store.showPageSetting" />
                    </n-icon>
                </template>
            </n-button>
        </template>
        设置
    </n-tooltip>
</template>

<script lang="ts" setup>
import { SettingsOutlined, SettingsRound } from '@vicons/material'
import { useStore } from '../../store'

const store = useStore()
</script>