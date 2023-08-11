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
defineProps<{
  type: number,
  pos: number
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
</script>

<template>
  <img class="fitImage" :src="getPath(type)" alt="0" @click="$emit('buy', pos)">
</template>

<style scoped>
.fitImage {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

</style>