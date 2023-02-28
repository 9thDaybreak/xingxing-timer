<!--
 * @Author: Daybreak
 * @Date: 2022-10-20 22:15:25
 * @LastEditTime: 2023-02-16 23:04:28
 * @LastEditors: error: git config user.name & please set dead value or install git
 * @FilePath: \xingxing-timer\src\PageMain.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by Daybreak 450552846@qq.com, All Rights Reserved. 
-->

<template>
    <div class="pageMain">
        <template v-for="(cardInfo, index) in state.cardArr" :key="index">
            <Card :cardInfo="cardInfo" :index="index"></Card>
        </template>
    </div>
</template>

<script lang="ts" setup>
import Card from "./components/Card.vue";
// import Timer from "./timer";
import { useStore } from "../store";
import { useNow } from "@vueuse/core";
console.log()
const store = useStore();
const state = reactive({
    cardArr: [] as any[],
});
// onMounted(() => {
// 从缓存中获取数据渲染默认列表
//     store.timer.forEach((ele) => {
//         let timer = new Timer(ele.name, ele.time)
//         state.cardArr.push(timer);
//     });
// });

provide("cardArr", state.cardArr);
</script>

<style lang="scss" scoped>
.pageMain {
    position: absolute;
    top: 60px;
    bottom: 0;
    width: 100%;
}
</style>
