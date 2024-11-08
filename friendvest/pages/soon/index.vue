<!-- pages/soon/index.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { TrendingUp } from 'lucide-vue-next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://clmuewkwnaeddhvydneu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsbXVld2t3bmFlZGRodnlkbmV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwMzQ4MzgsImV4cCI6MjA0NjYxMDgzOH0.R7cas7RqNgMAPOW9UW3vXQF9cd0YXQRZTGWx-w5mqd0'
)

const email = ref('')
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const message = ref('')

const handleSubmit = async () => {
  if (!email.value || !email.value.includes('@')) {
    message.value = 'Please enter a valid email'
    status.value = 'error'
    return
  }

  try {
    status.value = 'loading'
    
    const { error } = await supabase
      .from('waitlist')
      .insert([{ email: email.value }])

    if (error) {
      if (error.code === '23505') { // Unique constraint error
        message.value = "You're already on the waitlist!" // Fixed quote
        status.value = 'error'
      } else {
        throw error
      }
    } else {
      message.value = "You're on the list! We'll be in touch soon." // Fixed quote
      status.value = 'success'
      email.value = ''
    }
  } catch (error) {
    console.error('Error:', error)
    message.value = 'Something went wrong. Please try again.'
    status.value = 'error'
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
    <div class="animate-fade-in flex flex-col items-center max-w-md w-full">
      <!-- Icon -->
      <img src="/images/friendvest-icon.jpeg" class="h-16 w-16 mb-8" alt="Friendvest Icon"  />
      
      <!-- Logo -->
      <img 
        src="/images/friendvest-logo.jpeg" 
        alt="Friendvest Logo" 
        class="w-64 md:w-80 mb-6 rounded-lg shadow-2xl"
        loading="eager"
      />
      
      <!-- Coming Soon Text -->
      <div class="text-center mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-slate-100 mb-2">
          Friendvest
        </h1>
        <p class="text-xl md:text-2xl text-slate-300 font-light">
          Coming Soon
        </p>
        <p class="mt-6 text-slate-400">
          Track and compare investments with your friends in a fun, social way!
        </p>
      </div>

      <!-- Waitlist Form -->
      <div class="w-full max-w-md">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="relative">
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              :disabled="status === 'loading'"
              class="w-full px-4 py-3 rounded-full bg-slate-800 text-slate-100 placeholder-slate-400 border border-slate-700 focus:outline-none focus:border-slate-500 transition-colors"
            />
            <button
              type="submit"
              :disabled="status === 'loading'"
              class="absolute right-1.5 top-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="status === 'loading'">
                <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              <span v-else>Join Waitlist</span>
            </button>
          </div>
          
          <!-- Status Message -->
          <div 
            v-if="message" 
            class="text-center text-sm py-2 rounded-lg"
            :class="{
              'text-green-400': status === 'success',
              'text-red-400': status === 'error'
            }"
          >
            {{ message }}
          </div>
        </form>
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