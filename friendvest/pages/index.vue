<script setup lang="ts">
definePageMeta({
    middleware: false  // disable middleware for login page
})
const client = useSupabaseClient()
const user = useSupabaseUser()
const { push } = useRouter()
import { onMounted } from 'vue'
import { TrendingUp } from 'lucide-vue-next'

const signInWithGoogle = async () => {
    try {
        const { data, error } = await client.auth.signInWithOAuth({
            provider: 'google',
            options: {
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                }
            }
        })

        if (error) throw error

    } catch (error) {
        console.error('Error signing in:', error)
    }
}

// With this:
onMounted(() => {
    if (user.value) {
        push('/dashboard')
    }
})
</script>

<template>
    <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div class="max-w-md w-full space-y-8">
            <!-- Logo/Header -->
            <div class="text-center">
                <h1 class="text-4xl font-bold flex items-center justify-center gap-2">
                    <TrendingUp class="h-8 w-8" />
                    Friendvest
                </h1>
                <p class="mt-2 text-gray-600">An Investment Social Club</p>
            </div>

            <!-- Auth Button -->
            <div class="mt-8">
                <UiButton class="w-full flex items-center justify-center gap-2" @click="signInWithGoogle">
                    <!-- Google Icon -->
                    <svg class="h-5 w-5" viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                </UiButton>
            </div>

            <!-- Features or Benefits -->
            <div class="mt-8 space-y-4">
                <div class="text-center">
                    <h2 class="text-xl font-semibold mb-4">Why Join Friendvest?</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="p-4 bg-white rounded-lg shadow-sm">
                            <h3 class="font-medium">Track Investments</h3>
                            <p class="text-sm text-gray-600">Monitor your portfolio performance</p>
                        </div>
                        <div class="p-4 bg-white rounded-lg shadow-sm">
                            <h3 class="font-medium">Compare with Friends</h3>
                            <p class="text-sm text-gray-600">See how you stack up</p>
                        </div>
                        <div class="p-4 bg-white rounded-lg shadow-sm">
                            <h3 class="font-medium">Learn Together</h3>
                            <p class="text-sm text-gray-600">Share insights and strategies</p>
                        </div>
                        <div class="p-4 bg-white rounded-lg shadow-sm">
                            <h3 class="font-medium">Stay Connected</h3>
                            <p class="text-sm text-gray-600">Join an investment community</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>