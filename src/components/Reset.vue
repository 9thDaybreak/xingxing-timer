<!--
 * @Author: Daybreak
 * @Date: 2022-10-25 19:47:23
 * @LastEditTime: 2022-10-25 19:55:35
 * @LastEditors: Daybreak
 * @FilePath: \xingxing-timer\src\components\Reset.vue
 * @Description: 重置按钮
 * 
 * Copyright (c) 2022 by Daybreak 450552846@qq.com, All Rights Reserved. 
-->

<template>
    <n-tooltip placement="bottom" trigger="hover">
        <template #trigger>
            <n-button @click="resetTimer" strong round quaternary type="primary" size="small" circle :focusable="false">
                <template #icon>
                    <n-icon>
                        <LoopRound />
                    </n-icon>
                </template>
            </n-button>
        </template>
        重置
    </n-tooltip>
</template>

<script lang="ts" setup>
import { LoopRound } from '@vicons/material'
const prop = defineProps<{ timer: any }>()

const resetTimer = () => {
    prop.timer.resetTimer()
}
</script>