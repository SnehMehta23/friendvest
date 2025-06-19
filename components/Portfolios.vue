<template>
  <div class="bg-[#FCF9EE] rounded-xl shadow p-4">
    <div class="font-semibold text-emerald-800 mb-3">Your Portfolios</div>
    <div v-for="i in 2" :key="i" class="bg-white rounded-lg shadow mb-3 p-3 flex flex-col">
      <div class="h-1 w-full rounded mb-2" style="background: #D3AF37;"></div>
      <div class="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div class="h-4 bg-gray-200 rounded w-1/3 mb-1"></div>
      <div class="h-4 bg-gray-100 rounded w-1/4"></div>
    </div>
  </div>
</template> 