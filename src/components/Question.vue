<!--
 * @Author: Daybreak
 * @Date: 2022-10-25 15:57:33
 * @LastEditTime: 2022-10-25 16:08:15
 * @LastEditors: Daybreak
 * @FilePath: \xingxing-timer\src\components\Question.vue
 * @Description: 关于我们
 * 
 * Copyright (c) 2022 by Daybreak 450552846@qq.com, All Rights Reserved. 
-->

<template>
    <n-tooltip placement="bottom" trigger="hover">
        <template #trigger>
            <n-button strong round quaternary type="primary" size="small" circle
                @click="store.showPageQuestion = !store.showPageQuestion" :focusable="false">
                <template #icon>
                    <n-icon>
                        <QuestionMarkOutlined />
                    </n-icon>
                </template>
            </n-button>
        </template>
        关于我们
    </n-tooltip>
</template>

<script lang="ts" setup>
import { QuestionMarkOutlined } from '@vicons/material'
import { useStore } from '../../store'

const store = useStore()
</script>