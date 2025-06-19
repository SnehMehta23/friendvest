<template>
    <div class="bg-[#FCF9EE] rounded-2xl shadow p-4 flex flex-col items-center w-full max-w-xs">
      <div class="font-semibold text-emerald-800 mb-2 text-center w-full">Ask AI</div>
      <form @submit.prevent="handleSend" class="flex w-full gap-2">
        <input
          v-model="input"
          type="text"
          placeholder="Ask a question..."
          class="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
          maxlength="200"
        />
        <button type="submit" class="bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg px-3 py-2 font-semibold text-sm transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7" /></svg>
        </button>
      </form>
      <div class="text-xs text-gray-400 mt-2 text-center">AI answers will appear in your feed</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  const input = ref('')
  function handleSend() {
    if (!input.value.trim()) return
    // In the future, send to feed as a post
    input.value = ''
  }
  </script>  