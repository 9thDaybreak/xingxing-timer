<!--
 * @Author: Daybreak
 * @Date: 2022-10-25 15:06:43
 * @LastEditTime: 2022-10-27 11:52:31
 * @LastEditors: Daybreak
 * @FilePath: \xingxing-timer\src\PageSetting.vue
 * @Description: 设置按钮
 * 
 * Copyright (c) 2022 by Daybreak 450552846@qq.com, All Rights Reserved. 
-->

<template>
    <div class="pageSetting">
        <n-list clickable :show-divider="false">
            <n-list-item>
                <n-space justify="center">
                    是否跟随系统主题
                    <n-switch size="small" />
                </n-space>
            </n-list-item>
            <n-list-item>
                <n-space justify="center">
                    <n-button @click="store.$reset()">恢复默认</n-button>
                </n-space>
            </n-list-item>
            <n-list-item>
                <n-space justify="center">
                    <n-button @click="store.showPageSetting = false">回到首页</n-button>
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
.pageSetting {
    position: absolute;
    top: 60px;
    bottom: 0;
    width: 100%;
}
</style>