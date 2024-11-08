<!-- pages/soon/index.vue -->
<script setup lang="ts">
import { TrendingUp } from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
    <div class="animate-fade-in flex flex-col items-center">
      <!-- Icon -->
      <img class="h-16 w-16 mb-8 animate-pulse" src="/images/friendvest-icon.jpeg" alt="">
      <!-- Logo -->
      <img 
        src="/images/friendvest-logo.jpeg" 
        alt="Friendvest Logo" 
        class="w-64 md:w-80 mb-6 rounded-lg shadow-2xl"
        loading="eager"
      />
      
      <!-- Coming Soon Text -->
      <div class="text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-slate-100 mb-2">
          Friendvest
        </h1>
        <p class="text-xl md:text-2xl text-slate-300 font-light">
          Coming Soon
        </p>
        <p class="mt-6 text-slate-400 max-w-md mx-auto">
          Track and compare investments with your friends in a fun, social way!
        </p>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}
</style>