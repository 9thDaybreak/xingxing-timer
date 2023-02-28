<!--
 * @Author: Daybreak
 * @Date: 2022-10-25 20:03:05
 * @LastEditTime: 2022-10-25 21:09:50
 * @LastEditors: Daybreak
 * @FilePath: \xingxing-timer\src\components\OtherFunction.vue
 * @Description: 展开箭头
 * 
 * Copyright (c) 2022 by Daybreak 450552846@qq.com, All Rights Reserved. 
-->

<template>
    <n-popselect :options="popselectList" size="small" trigger="click" scrollable>
        <n-tooltip placement="bottom" trigger="hover">
            <template #trigger>
                <n-button strong round quaternary type="primary" size="small" circle :focusable="false">
                    <template #icon>
                        <n-icon>
                            <ShortTextRound />
                        </n-icon>
                    </template>
                </n-button>
            </template>
            其他功能
        </n-tooltip>
    </n-popselect>
</template>

<script lang="ts" setup>
import { ShortTextRound } from '@vicons/material'

interface PopselectList {
    label: string,
    value: number
}
const popselectList: PopselectList[] = [{
    label: '总时长×2',
    value: 0
},
{
    label: '总时长÷2',
    value: 1
},]
</script>