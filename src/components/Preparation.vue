<script setup lang="ts">
import p0 from '@/assets/capoo/p0.gif'
import p1 from '@/assets/capoo/p1.gif'
import p2 from '@/assets/capoo/p2.gif'
import p3 from '@/assets/capoo/p3.gif'
import p4 from '@/assets/capoo/p4.gif'
import p5 from '@/assets/capoo/p5.gif'
import p6 from '@/assets/capoo/p6.gif'
import p7 from '@/assets/capoo/p7.gif'
import p8 from '@/assets/capoo/p8.gif'
import p9 from '@/assets/capoo/p9.gif'
import p10 from '@/assets/capoo/p10.gif'

import s1 from '@/assets/star/s1.png'
import s2 from '@/assets/star/s2.png'
import s3 from '@/assets/star/s3.png'
import s0 from '@/assets/star/s0.png'

defineProps<{
  type: number,
  pos: number,
  level: number
}>()

function getPath(type: number): string {
  switch (type) {
    case 0: return p0;
    case 1: return p1;
    case 2: return p2;
    case 3: return p3;
    case 4: return p4;
    case 5: return p5;
    case 6: return p6;
    case 7: return p7;
    case 8: return p8;
    case 9: return p9;
    case 10: return p10;
    default: return p0;
  }
}

function getStarPath(level: number): string {
  switch (level) {
    case 0: return s0;
    case 1: return s1;
    case 2: return s2;
    case 3: return s3;
  }
  return s0;
}
</script>

<template>
  <img :class="`level-${level}`" :src="getPath(type)" alt="0" @click="$emit('sell', pos)">
  <img class="star" :src="getStarPath(level)" alt="0" @click="$emit('sell', pos)">
</template>

<style scoped>
.star {
  height: 20px;
}

.level-0 {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.level-1 {
  object-fit: cover;
  width: 60%;
  height: 60%;
}

.level-2 {
  object-fit: cover;
  width: 90%;
  height: 90%;
}

.level-3 {
  object-fit: cover;
  width: 110%;
  height: 110%;
}

</style>