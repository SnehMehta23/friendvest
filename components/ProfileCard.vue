<template>
  <div class="bg-[#FCF9EE] rounded-xl shadow p-4">
    <div class="flex items-center space-x-4 mb-4">
      <div class="w-12 h-12 bg-emerald-800 rounded-full"></div>
      <div>
        <div class="h-4 bg-emerald-800 rounded w-24 mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <div class="bg-white rounded-lg p-2 flex flex-col items-center">
        <div class="text-xs text-emerald-800 font-semibold">YTD</div>
        <div class="h-4 w-10 mt-1 rounded" style="background: #D3AF37;"></div>
      </div>
      <div class="bg-white rounded-lg p-2 flex flex-col items-center">
        <div class="text-xs text-emerald-800 font-semibold">QTD</div>
        <div class="h-4 w-10 mt-1 rounded" style="background: #D3AF37;"></div>
      </div>
      <div class="bg-white rounded-lg p-2 flex flex-col items-center">
        <div class="text-xs text-emerald-800 font-semibold">TTM</div>
        <div class="h-4 w-10 mt-1 rounded" style="background: #D3AF37;"></div>
      </div>
      <div class="bg-white rounded-lg p-2 flex flex-col items-center">
        <div class="text-xs text-emerald-800 font-semibold">Daily</div>
        <div class="h-4 w-10 mt-1 rounded" style="background: #D3AF37;"></div>
      </div>
    </div>
  </div>
</template> 