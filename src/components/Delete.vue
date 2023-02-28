<!--
 * @Author: Daybreak
 * @Date: 2022-10-25 19:41:06
 * @LastEditTime: 2023-02-13 23:33:35
 * @LastEditors: error: git config user.name & please set dead value or install git
 * @FilePath: \xingxing-timer\src\components\Delete.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by Daybreak 450552846@qq.com, All Rights Reserved. 
-->

<template>
    <n-tooltip placement="bottom" trigger="hover">
        <template #trigger>
            <n-button @click="clearTimer" strong round quaternary type="primary" size="small" circle :focusable="false">
                <template #icon>
                    <n-icon>
                        <DeleteOutlineRound />
                    </n-icon>
                </template>
            </n-button>
        </template>
        删除
    </n-tooltip>
</template>

<script lang="ts" setup>
import { DeleteOutlineRound } from '@vicons/material'
const prop = defineProps<{ timer: any, index: number }>()

const clearTimer = () => {
    prop.timer.clearTimer()
    cardArr.splice(prop.index, 1)
}
const cardArr = inject('cardArr') as any
</script>