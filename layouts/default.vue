<template>
  <div class="min-h-screen h-screen bg-[#03312E] flex relative overflow-hidden">
    <!-- Background pattern image with blend -->
    <img src="/fancy-cushion.webp" alt="background pattern" class="absolute inset-0 w-full h-full object-cover z-0" />
    <div class="absolute inset-0 w-full h-full bg-[#03312E] opacity-80 z-0"></div>
    <!-- Content -->
    <div class="relative z-10 min-h-screen h-screen flex w-full gap-x-8">
      <!-- Left Sidebar -->
      <aside class="w-80 p-4 border-r border-emerald-800 min-h-screen h-screen flex flex-col gap-6 z-10 relative">
        <IndexPerformance />
        <EconomicCalendar />
        <Leaderboard />
      </aside>
      <!-- Middle Feed (scrollable, much wider) -->
      <main class="flex-[2_1_0%] w-full flex flex-col items-center h-screen overflow-y-scroll z-10">
        <FeedList :open-create-post="() => showCreatePost = true" />
      </main>
      <!-- Right Sidebar -->
      <aside class="w-80 p-4 border-l border-emerald-800 min-h-screen h-screen flex flex-col gap-6 z-10">
        <div class="my-4 gap-6 min-h-screen h-screen flex flex-col gap-6 z-10">
          <ProfileCard />
          <Portfolios />
          <AIChatBox />
        </div>
      </aside>
    </div>
    <!-- Create Post Modal -->
    <div v-if="showCreatePost" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative">
        <button @click="showCreatePost = false" class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
        <CreatePost />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Portfolios from '~/components/Portfolios.vue'
import FeedList from '~/components/FeedList.vue'
import ProfileCard from '~/components/ProfileCard.vue'
import IndexPerformance from '~/components/IndexPerformance.vue'
import Leaderboard from '~/components/Leaderboard.vue'
import CreatePost from '~/components/CreatePost.vue'

const showCreatePost = ref(false)
</script> 