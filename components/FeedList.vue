<template>
  <div class="w-full max-w-3xl h-full flex flex-col">
    <!-- Filter Pills (top, centered, same width as cards) -->
    <div class="w-full flex flex-col items-center mt-8 mb-4">
      <div class="flex space-x-2 w-full max-w-md justify-center">
        <button v-for="filter in filters" :key="filter" :class="[
          'px-4 py-2 rounded-full border text-sm font-medium transition cursor-pointer',
          selectedFilterIndex === filters.indexOf(filter)
            ? 'bg-emerald-800 text-white border-emerald-800 shadow'
            : 'bg-[#FCF9EE] text-emerald-800 border-emerald-800 hover:bg-emerald-50']"
          @click="selectFilter(filters.indexOf(filter))">
          {{ filter }}
        </button>
      </div>
    </div>
    <!-- Create Post Prompt (centered, same width as cards) -->
    <div class="w-full flex justify-center mb-8">
      <button @click="openCreatePost()" class="w-full max-w-md bg-[#FCF9EE] hover:bg-emerald-50 text-gray-600 rounded-xl px-6 py-4 shadow-sm text-left font-medium transition flex items-center gap-3 text-lg cursor-pointer">
        <span class="text-emerald-800 text-2xl font-bold">+</span>
        <span>Share your latest thesis or research idea...</span>
      </button>
    </div>
    <!-- Scrollable Feed Cards (no visible scrollbar) -->
    <div class="flex-1 overflow-y-scroll no-scrollbar h-0 min-h-0">
      <div v-for="(pitch, i) in examplePitches" :key="i" class="bg-[#FCF9EE] rounded-3xl shadow-2xl px-6 py-8 mb-10 flex flex-col min-h-[340px] max-w-md mx-auto">
        <!-- Large rounded rectangle (image/chart placeholder) -->
        <div class="w-full h-36 bg-gray-200 rounded-2xl mb-6"></div>
        <!-- Example stock pitch text -->
        <div class="text-gray-800 text-lg leading-relaxed mb-6">
          {{ pitch }}
        </div>
        <!-- Bottom row: profile, username, bull/bear emojis with counts -->
        <div class="flex items-center mt-auto pt-6 gap-6">
          <!-- Profile circle -->
          <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg font-bold text-white">A</div>
          <!-- Username -->
          <div class="h-8 flex items-center text-gray-700 font-semibold text-base">alex_invests</div>
          <div class="flex-1 flex justify-end gap-6 items-center">
            <!-- Bull -->
            <div class="flex items-center gap-2">
              <span class="text-2xl">🐂</span>
              <span class="text-gray-700 font-semibold text-base">{{ 12 + i % 5 }}</span>
            </div>
            <!-- Bear -->
            <div class="flex items-center gap-2">
              <span class="text-2xl">🐻</span>
              <span class="text-gray-700 font-semibold text-base">{{ 3 + i % 4 }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

<script setup lang="ts">
import { ref, defineProps, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{ openCreatePost: () => void }>()

const filters = [
  'All',
  'Fundamental',
  'Technical',
  'Buys',
  'Sells',
  'Research',
]
const selectedFilterIndex = ref(0)
const showFilter = ref(false)
const filterDropdownRef = ref<HTMLElement | null>(null)

function selectFilter(idx: number) {
  selectedFilterIndex.value = idx
  showFilter.value = false
}

function handleClickOutside(event: MouseEvent) {
  if (showFilter.value && filterDropdownRef.value && !filterDropdownRef.value.contains(event.target as Node)) {
    showFilter.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

const examplePitches = [
  'Apple (AAPL) is positioned to benefit from continued growth in services and wearables. Strong brand loyalty and a robust ecosystem make it a long-term winner.',
  'Tesla (TSLA) is leading the EV revolution. With expanding production capacity and new models, I expect significant upside over the next 3 years.',
  'Nvidia (NVDA) dominates the AI and GPU space. Their technology is critical for data centers, gaming, and autonomous vehicles.',
  'Amazon (AMZN) continues to innovate in e-commerce and cloud computing. Their scale and logistics network are unmatched.',
  'Microsoft (MSFT) is a cloud powerhouse. Azure growth and strong enterprise demand make it a core holding.',
  'Meta (META) is undervalued given its user base and ad platform. Watch for growth in VR and the metaverse.',
  'Google (GOOGL) remains the leader in search and digital ads. Cloud and AI investments will drive future growth.',
  'Netflix (NFLX) is expanding globally with original content. Subscriber growth and pricing power are key drivers.',
  'JPMorgan (JPM) is the best-in-class bank with a fortress balance sheet. Rising rates will boost net interest income.',
  'Procter & Gamble (PG) offers defensive growth and a reliable dividend. Strong brands and pricing power.',
  'Visa (V) benefits from the global shift to digital payments. High margins and network effects.',
  'Coca-Cola (KO) is a classic defensive play with global reach and strong cash flow.',
  'Costco (COST) has a loyal membership base and strong sales growth. Their business model is recession-resistant.',
  'UnitedHealth (UNH) is a leader in managed care. Consistent earnings growth and scale advantage.',
  'Berkshire Hathaway (BRK.B) is a diversified holding with a world-class management team.'
]
</script> 