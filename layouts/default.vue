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
      <!-- Middle Feed Area -->
      <main class="flex-[2_1_0%] w-full flex flex-col h-screen z-10">
        <!-- Fixed Navigation -->
        <nav class="flex-shrink-0 w-full p-4 border-b border-emerald-800 flex items-center justify-between bg-transparent">
          <!-- Left section - Logo/Brand -->
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                </svg>
              </div>
              <span class="text-white font-semibold text-lg">Friendvest</span>
            </div>
          </div>

          <!-- Center section - Navigation Links -->
          <div class="flex items-center gap-6 -ml-12">
            <a href="#" class="text-emerald-200 hover:text-white transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-emerald-800/30">
              Feed
            </a>
            <a href="#" class="text-emerald-200 hover:text-white transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-emerald-800/30">
              Charts
            </a>
            <a href="#" class="text-emerald-200 hover:text-white transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-emerald-800/30">
              Portfolio
            </a>
            <a href="#" class="text-emerald-200 hover:text-white transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-emerald-800/30">
              AI
            </a>
          </div>

          <!-- Right section - User Actions -->
          <div class="flex items-center gap-3">
            <!-- User Menu with Dropdown -->
            <div class="relative">
              <button 
                @click="showUserDropdown = !showUserDropdown"
                class="flex items-center gap-2 p-2 hover:bg-emerald-800/30 rounded-lg transition-colors duration-200"
              >
                <div class="relative">
                  <div class="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                    <span class="text-white font-medium text-sm">JD</span>
                  </div>
                  <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </div>
                <svg class="w-4 h-4 text-emerald-200 transition-transform duration-200" :class="{ 'rotate-180': showUserDropdown }" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <div v-if="showUserDropdown" class="absolute right-0 top-full mt-2 w-80 bg-emerald-900/95 border border-emerald-800 rounded-lg shadow-xl z-50">
                <!-- User Info Header -->
                <div class="p-4 border-b border-emerald-800">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                      <span class="text-white font-medium">JD</span>
                    </div>
                    <div>
                      <div class="text-white font-medium">John Doe</div>
                      <div class="text-emerald-300 text-sm">john.doe@example.com</div>
                    </div>
                  </div>
                </div>

                <!-- Notifications Section -->
                <div class="p-4 border-b border-emerald-800">
                  <div class="flex items-center justify-between mb-3">
                    <h3 class="text-white font-medium flex items-center gap-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5z"/>
                      </svg>
                      Notifications
                    </h3>
                    <span class="bg-red-500 text-white text-xs px-2 py-1 rounded-full">3</span>
                  </div>
                  <div class="space-y-2 max-h-40 overflow-y-auto">
                    <div class="p-2 bg-emerald-800/30 rounded text-sm text-emerald-100 hover:bg-emerald-800/50 cursor-pointer transition-colors">
                      <div class="font-medium">Portfolio Alert</div>
                      <div class="text-emerald-300 text-xs">AAPL position up 12% today</div>
                    </div>
                    <div class="p-2 bg-emerald-800/30 rounded text-sm text-emerald-100 hover:bg-emerald-800/50 cursor-pointer transition-colors">
                      <div class="font-medium">New Follow</div>
                      <div class="text-emerald-300 text-xs">@trader_mike started following you</div>
                    </div>
                    <div class="p-2 bg-emerald-800/30 rounded text-sm text-emerald-100 hover:bg-emerald-800/50 cursor-pointer transition-colors">
                      <div class="font-medium">Market Update</div>
                      <div class="text-emerald-300 text-xs">S&P 500 reaches new high</div>
                    </div>
                  </div>
                </div>

                <!-- Menu Items -->
                <div class="p-2">
                  <button class="w-full flex items-center gap-3 p-3 text-emerald-200 hover:text-white hover:bg-emerald-800/30 rounded-lg transition-colors duration-200">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    Settings
                  </button>
                  <button class="w-full flex items-center gap-3 p-3 text-emerald-200 hover:text-white hover:bg-emerald-800/30 rounded-lg transition-colors duration-200">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        
        <!-- Scrollable Feed Content -->
        <div class="flex-1 overflow-y-auto flex flex-col items-center">
          <FeedList :open-create-post="() => showCreatePost = true" />
        </div>
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
const showUserDropdown = ref(false)
</script>