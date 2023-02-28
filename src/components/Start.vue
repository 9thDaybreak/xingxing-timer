<!--
 * @Author: Daybreak
 * @Date: 2022-10-25 19:33:17
 * @LastEditTime: 2023-02-13 22:47:59
 * @LastEditors: error: git config user.name & please set dead value or install git
 * @FilePath: \xingxing-timer\src\components\Start.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by Daybreak 450552846@qq.com, All Rights Reserved. 
-->

<template>
    <n-tooltip placement="bottom" trigger="hover">
        <template #trigger>
            <n-button strong round quaternary type="primary" size="small" circle :focusable="false">
                <template #icon>
                    <n-icon>
                        <!-- 暂停 -->
                        <PauseRound v-if="!prop.timer.isPause && !prop.timer.isOver" @click="pauseTimer" />
                        <!-- 开始 -->
                        <PlayArrowRound v-else @click="continueTimer" />
                    </n-icon>
                </template>
            </n-button>
        </template>
        暂停
    </n-tooltip>
</template>

<script lang="ts" setup>
import { PauseRound, PlayArrowRound } from '@vicons/material'
const prop = defineProps<{ timer: any }>()
const pauseTimer = () => {
    prop.timer.pauseTimer()
}
const continueTimer = () => {
    prop.timer.createTimer()
}
</script>