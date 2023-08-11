<script setup lang="ts">
import Preparation from "@/components/Preparation.vue";
import Store from "@/components/Store.vue";
import {ref, watch} from "vue";
// region data

// 金钱
const money = ref(1000);

// 备战席
const preparations = ref([
  {pos:0, type: 0, level: 0},
  {pos:1, type: 0, level: 0},
  {pos:2, type: 0, level: 0},
  {pos:3, type: 0, level: 0},
  {pos:4, type: 0, level: 0},
  {pos:5, type: 0, level: 0},
  {pos:6, type: 0, level: 0},
  {pos:7, type: 0, level: 0},
  {pos:8, type: 0, level: 0},
  {pos:9, type: 0, level: 0}
]);
// 商店在售
const onSales = ref([
  {pos:0, type: 1},
  {pos:1, type: 2},
  {pos:2, type: 3},
  {pos:3, type: 4},
  {pos:4, type: 5}
]);

// 牌库
const bin = ref([
  {type: 1, num: 10},
  {type: 2, num: 10},
  {type: 3, num: 10},
  {type: 4, num: 10},
  {type: 5, num: 10},
  {type: 6, num: 10},
  {type: 7, num: 10},
  {type: 8, num: 10},
  {type: 9, num: 10},
  {type: 10, num: 10}
]);
// endregion

// region function

// 刷新商店
function refreshStore() {
  if (money.value - 2 < 0) {
    return;
  }

  money.value -= 2;
  onSales.value.forEach(a => a.type = getRandomType());
}

// 获得随机类型
function getRandomType(): number {
  let max = 0;
  for (let i = 0; i < bin.value.length; i++) {
    max += bin.value[i].num;
  }
  let idx = Math.random() * max;
  for (let i = bin.value.length - 1; i >= 0; i--) {
    idx -= bin.value[i].num;
    if (idx <= 0) {
      return bin.value[i].type;
    }
  }
  return 0;
}

function specialCheckAndUpgrade(pos: number) {
  let type = onSales.value[pos].type;
  let filter = preparations.value.filter(a => a.level === 1 && a.type === type);
  let filter1 = onSales.value.filter(a => a.type === type);

  if (filter.length + filter1.length >= 3) {
    if (filter.length === 2) {
      onSales.value[pos].type = 0;
      filter[0].level = 2;
      filter[1].level = 0;
      filter[1].type = 0;
    } else if(filter.length === 1) {

      if (money.value - 2 >= 0) {
        onSales.value[pos].type = 0;
        filter[0].level = 2;
        filter1 = onSales.value.filter(a => a.type === type);
        filter1[1].type = 0;
        money.value -= 2;
      }

    } else {

      if (money.value - 3 >= 0) {
        let filter2 = preparations.value.filter(a => a.level === 2 && a.type === type);
        if (filter2.length >=2) {
          filter2[0].level = 3;
          filter2[1].type = 0; filter2[1].level = 0;

          onSales.value[pos].type = 0;
          filter1 = onSales.value.filter(a => a.type === type);
          filter1[0].type = 0;
          filter1[1].type = 0;

          money.value -= 3;
        }
      }
    }

    let filter2 = preparations.value.filter(a => a.level === 2 && a.type === type);
    if (filter2.length >= 3) {
      filter2[0].level = 3;
      filter2[1].type = 0; filter2[1].level = 0;
      filter2[2].type = 0; filter2[2].level = 0;
    }

  }
}

// 买卡
function buyCard(pos: number) {
  // 找到第一个空位
  let i = 0;
  for (; i < preparations.value.length; i++) {
    if (preparations.value[i].type === 0) {
      break;
    }
  }

  if (onSales.value[pos].type === 0){
    return;
  }
  // 没有钱，直接返回
  if (money.value - 1 < 0) {
    return;
  }

  // 没有空位，直接返回
  if (i === preparations.value.length) {
    // 卡场也能购买的特殊逻辑
    specialCheckAndUpgrade(pos)
    return;
  }

  // 放到购买后的位置上
  preparations.value[i].type = onSales.value[pos].type;
  // 等级置为1
  preparations.value[i].level = 1;
  // 商店在售位置置为空
  onSales.value[pos].type = 0;
  // 检查并三连
  checkAndUpgrade(preparations.value[i].type);
  money.value -= 1;
}

// 检查是否能三联
function checkAndUpgrade(type: number) {
  let filter = preparations.value.filter(a => a.level === 1 && a.type === type);
  if (filter.length >= 3) {
    filter[0].level = 2;
    filter[1].type = 0; filter[1].level = 0;
    filter[2].type = 0; filter[2].level = 0;
  }

  let filter2 = preparations.value.filter(a => a.level === 2 && a.type === type);
  if (filter2.length >= 3) {
    filter2[0].level = 3;
    filter2[1].type = 0; filter2[1].level = 0;
    filter2[2].type = 0; filter2[2].level = 0;
  }
}

// 卖卡
function sellCard(pos: number) {
  if (preparations.value[pos].type === 0) {
    return;
  }
  money.value += Math.pow(3, preparations.value[pos].level - 1);
  preparations.value[pos].type = 0;
  preparations.value[pos].level = 0;
}

// endregion

// region
// 时间
const timeLeft = ref(30);

function startQuickThought() {
  preparations.value.forEach(a => {
    a.level = 0;
    a.type = 0;
  })

  let timer = setInterval(function () {

    timeLeft.value -= 1;
    if (timeLeft.value <= 0) {
      clearInterval(timer);

      alert("时间到 合成失败");
      timeLeft.value = 30;
    }

    let i = 0;
    for (; i < preparations.value.length; i++) {
      if (preparations.value[i].level === 3) {
        break;
      }
    }

    if (i != preparations.value.length) {
      alert("合成成功！")
      clearInterval(timer);
      timeLeft.value = 30;
    }

  }, 1000)
}

</script>

<template>
  <a-row style="height: 50px"></a-row>

  <a-row justify="center">
    <a-col :span="22">
      <a-typography>
        <a-typography-title>合成咖波</a-typography-title>
        <a-typography-paragraph>
          1. 点击商店中的咖波可以购买（每只一块）到备战席 <br>
          2. 备战席中三只小咖波可以合成一只大咖波 <br>
          3. 点击备战席中的咖波可以卖出 <br>
          4. 花2块钱可以刷新咖波商店 <br>
          5. 快速思考：在指定时间内合成三星咖波
        </a-typography-paragraph>
      </a-typography>
    </a-col>
  </a-row>
  <a-divider orientation="left">备战席</a-divider>
  <a-row justify="space-around">
    <a-col v-for="preparation in preparations" :span="2" class="preparation-box gutter-row" style="display: grid; align-items: center; justify-items: center">
      <Preparation @sell="sellCard" :type="preparation.type" :pos="preparation.pos" :level="preparation.level"/>
    </a-col>
  </a-row>

  <a-divider orientation="left">商店</a-divider>
  <a-row>
    <a-col :span="12">
      <a-row justify="space-around">
        <a-col v-for="onSale in onSales" :span="4" class="gutter-box gutter-row">
          <Store @buy="buyCard" :type="onSale.type" :pos="onSale.pos"/>
        </a-col>
      </a-row>
    </a-col>
  </a-row>

  <a-divider orientation="left"><a-button type="primary" @click="refreshStore">刷新</a-button></a-divider>
  <a-divider orientation="left">${{ money }}</a-divider>
  <a-divider orientation="left"><a-button type="dashed" @click="startQuickThought">开始快速思考</a-button>时间: {{ timeLeft }}</a-divider>

  <a-row style="height: 50px"></a-row>
</template>

<style scoped>
.gutter-box {
  height: 100px;
}

.preparation-box {
  height: 120px;
}
</style>
