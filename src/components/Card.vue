<!--
 * @Author: Daybreak
 * @Date: 2022-10-23 20:43:21
 * @LastEditTime: 2023-02-16 23:02:28
 * @LastEditors: error: git config user.name & please set dead value or install git
 * @FilePath: \xingxing-timer\src\components\Card.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by Daybreak 450552846@qq.com, All Rights Reserved. 
-->

<template>
    <n-card hoverable size="small">
        <template #header>
            <n-space item-style="font-size: 18px">{{ state.cardInfo.name }}</n-space>
        </template>
        <template #header-extra>
            <n-space :size="0">
                <OtherFunction></OtherFunction>
                <Start :timer="state.cardInfo"></Start>
                <Reset :timer="state.cardInfo"></Reset>
                <Delete :timer="state.cardInfo" :index="index"></Delete>
            </n-space>
        </template>
        <n-space justify="space-between" align="center">
            <div style="font-size: 16px;">{{ state.cardInfo.overTime }}</div>
            <n-space justify="space-between" vertical>
                <div>{{ state.cardInfo.totalTime }}</div>
                <div>{{ state.cardInfo.finalTime }}</div>
            </n-space>
        </n-space>
        <template #footer>
            <n-progress type="line" color="rgb(99, 226, 183)" :percentage="state.cardInfo.percentage" processing />
        </template>
    </n-card>
</template>

<script setup lang="ts">
import Delete from './Delete.vue'
import Start from './Start.vue'
import Reset from './Reset.vue'
import OtherFunction from './OtherFunction.vue'
import { reactive, watch } from 'vue'

const prop = defineProps<{ cardInfo: any, index: number }>()

let state = reactive({
    cardInfo: {} as any
})
watch(prop.cardInfo, () => {
    state.cardInfo = prop.cardInfo
}, { deep: true, immediate: true })
</script>