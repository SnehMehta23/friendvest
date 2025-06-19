<template>
  <div class="bg-[#FCF9EE] rounded-xl shadow p-4">
    <div class="font-semibold text-gray-700 mb-2">Leaderboard</div>
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead>
          <tr>
            <th class="text-left text-gray-500 font-medium">#</th>
            <th class="text-left text-gray-500 font-medium">Name</th>
            <th class="text-right text-gray-500 font-medium">% Gain</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 5" :key="i">
            <td class="py-1 text-gray-400">{{ i }}</td>
            <td>
              <div class="flex items-center space-x-2">
                <div class="w-6 h-6 bg-gray-300 rounded-full"></div>
                <div class="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            </td>
            <td class="text-right">
              <div class="h-4 bg-gray-200 rounded w-10 ml-auto"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template> 