<!--
 * @Author: Daybreak
 * @Date: 2022-10-25 16:00:09
 * @LastEditTime: 2022-10-25 16:09:08
 * @LastEditors: Daybreak
 * @FilePath: \xingxing-timer\src\PageQuestion.vue
 * @Description: 关于我们
 * 
 * Copyright (c) 2022 by Daybreak 450552846@qq.com, All Rights Reserved. 
-->

<template>
    <div class="setting">
        <n-list clickable :show-divider="false">
            <n-list-item>
                <n-space justify="center">
                    我们只是热爱游戏的玩家
                </n-space>
            </n-list-item>
            <n-list-item>
                <n-space justify="center">
                    作者：Mr. Wang，Daybreak
                </n-space>
            </n-list-item>
            <n-list-item>
                <n-space justify="center">
                    <n-button @click="store.showPageQuestion = false">回到首页</n-button>
                </n-space>
            </n-list-item>
        </n-list>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from '../store'

const store = useStore()
</script>

<style lang="scss" scoped>
.setting {
    position: absolute;
    top: 60px;
    bottom: 0;
    width: 100%;
}
</style>