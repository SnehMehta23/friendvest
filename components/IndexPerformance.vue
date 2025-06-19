<template>
  <div class="bg-[#FCF9EE] rounded-xl shadow p-4">
    <div class="font-semibold text-emerald-800 mb-3">Index Performance</div>
    <div class="grid grid-cols-2 gap-3">
      <div v-for="(index, idx) in indexes" :key="index" class="flex items-center justify-between bg-white rounded-lg px-3 py-2">
        <div class="font-medium text-emerald-800">{{ index }}</div>
        <div class="flex items-center gap-3">
          <span :class="percentages[idx] >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'">
            {{ percentages[idx] > 0 ? '+' : '' }}{{ percentages[idx] }}%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const indexes = ['SPY', 'QQQ', 'IWM', 'DJI']
const percentages = [0.42, -0.18, 0.05, -0.31]
</script> 