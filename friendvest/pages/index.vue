<!-- pages/index.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TrendingUp, Trophy, Wallet, Plus, X, Users } from 'lucide-vue-next'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://clmuewkwnaeddhvydneu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsbXVld2t3bmFlZGRodnlkbmV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwMzQ4MzgsImV4cCI6MjA0NjYxMDgzOH0.R7cas7RqNgMAPOW9UW3vXQF9cd0YXQRZTGWx-w5mqd0'
const supabase = createClient(supabaseUrl, supabaseKey)

// Types
interface Holding {
  symbol: string
  value: number
  returns: number
}

interface Portfolio {
  id: number
  name: string
  avatar_initials: string
  portfolio_value: number
  returns: number
  holdings: Holding[]
}

interface NewPortfolio {
  name: string
  holdings: Array<{
    symbol: string
    value: string | number
    returns: string | number
  }>
}

// State
const users = ref<Portfolio[]>([])
const selectedUser = ref<Portfolio | null>(null)
const showOnboarding = ref(true)
const loading = ref(true)
const newPortfolio = ref<NewPortfolio>({
  name: "",
  holdings: [{ symbol: "", value: "", returns: "" }]
})

// Methods
const fetchUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .order('returns', { ascending: false })
    
    if (error) throw error
    
    users.value = data
    if (data.length > 0) {
      selectedUser.value = data[0]
    }
  } catch (error) {
    console.error('Error fetching users:', error)
  } finally {
    loading.value = false
  }
}

const addHolding = () => {
  newPortfolio.value.holdings.push({ symbol: "", value: "", returns: "" })
}

const removeHolding = (index: number) => {
  newPortfolio.value.holdings = newPortfolio.value.holdings.filter((_, i) => i !== index)
}

const handleNewPortfolioSubmit = async () => {
  try {
    loading.value = true
    
    const portfolioValue = newPortfolio.value.holdings.reduce((sum, holding) => 
      sum + parseFloat(holding.value as string || '0'), 0
    )
    
    const avgReturns = newPortfolio.value.holdings.reduce((sum, holding) => 
      sum + parseFloat(holding.returns as string || '0'), 0) / newPortfolio.value.holdings.length

    const newUser = {
      name: newPortfolio.value.name,
      avatar_initials: newPortfolio.value.name.split(' ').map(n => n[0]).join(''),
      portfolio_value: portfolioValue,
      returns: avgReturns,
      holdings: newPortfolio.value.holdings.map(h => ({
        symbol: h.symbol,
        value: parseFloat(h.value as string),
        returns: parseFloat(h.returns as string)
      }))
    }

    const { data, error } = await supabase
      .from('portfolios')
      .insert([newUser])
      .select()

    if (error) throw error

    if (data) {
      users.value = [...users.value, data[0]]
      selectedUser.value = data[0]
      newPortfolio.value = {
        name: "",
        holdings: [{ symbol: "", value: "", returns: "" }]
      }
    }
  } catch (error) {
    console.error('Error adding portfolio:', error)
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <div class="w-full max-w-4xl mx-auto p-4 space-y-4">
    <!-- Onboarding Dialog -->
    <UiDialog :open="showOnboarding" @update:open="showOnboarding = $event">
      <UiDialogContent class="sm:max-w-[425px]">
        <UiDialogHeader>
          <UiDialogTitle class="text-2xl">Welcome to Friendvest! 👋</UiDialogTitle>
        </UiDialogHeader>
        <div class="space-y-4">
          <p>Track and compare investments with your friends in a fun, social way!</p>
          
          <div class="space-y-2">
            <h3 class="font-semibold">How it works:</h3>
            <ul class="list-disc pl-4 space-y-1">
              <li>Add your investment portfolio</li>
              <li>See how you stack up against friends</li>
              <li>Track returns and performance</li>
              <li>Learn from each other's strategies</li>
            </ul>
          </div>

          <div class="space-y-2">
            <h3 class="font-semibold">Getting Started:</h3>
            <ul class="list-disc pl-4 space-y-1">
              <li>Click the + button to add your portfolio</li>
              <li>Enter your holdings and their details</li>
              <li>Share this link with friends to join</li>
            </ul>
          </div>

          <UiButton class="w-full" @click="showOnboarding = false">
            Let's Get Started!
          </UiButton>
        </div>
      </UiDialogContent>
    </UiDialog>

    <!-- Main Header -->
    <UiCard>
      <UiCardHeader>
        <UiCardTitle class="flex items-center gap-2 text-2xl">
          <TrendingUp class="h-8 w-8" />
          Friendvest
          <span class="text-sm text-gray-500 ml-2">An Investment Social Club</span>
        </UiCardTitle>
      </UiCardHeader>
    </UiCard>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Leaderboard -->
      <UiCard class="md:col-span-1">
        <UiCardHeader>
          <div class="flex items-center justify-between">
            <UiCardTitle class="flex items-center gap-2">
              <Trophy class="h-5 w-5" />
              Leaderboard
            </UiCardTitle>
            <UiDialog>
              <UiDialogTrigger>
                <UiButton variant="outline" size="icon">
                  <Plus class="h-4 w-4" />
                </UiButton>
              </UiDialogTrigger>
              <UiDialogContent class="sm:max-w-[425px]">
                <UiDialogHeader>
                  <UiDialogTitle>Add Your Portfolio</UiDialogTitle>
                </UiDialogHeader>
                <div class="space-y-4">
                  <div>
                    <UiLabel for="name">Name</UiLabel>
                    <UiInput
                      id="name"
                      v-model="newPortfolio.name"
                    />
                  </div>
                  <div v-for="(holding, index) in newPortfolio.holdings" :key="index" class="space-y-2 p-2 bg-gray-50 rounded-lg">
                    <div class="flex justify-between items-center">
                      <UiLabel>Holding {{ index + 1 }}</UiLabel>
                      <UiButton 
                        v-if="index > 0"
                        variant="ghost" 
                        size="icon"
                        @click="removeHolding(index)"
                      >
                        <X class="h-4 w-4" />
                      </UiButton>
                    </div>
                    <UiInput
                      v-model="holding.symbol"
                      placeholder="Symbol (e.g., AAPL)"
                    />
                    <UiInput
                      v-model="holding.value"
                      type="number"
                      placeholder="Value ($)"
                    />
                    <UiInput
                      v-model="holding.returns"
                      type="number"
                      placeholder="Returns (%)"
                    />
                  </div>
                  <UiButton variant="outline" @click="addHolding">
                    Add Another Holding
                  </UiButton>
                  <UiButton 
                    class="w-full" 
                    @click="handleNewPortfolioSubmit"
                    :disabled="!newPortfolio.name || newPortfolio.holdings.some(h => !h.symbol || !h.value || !h.returns)"
                  >
                    Add Portfolio
                  </UiButton>
                </div>
              </UiDialogContent>
            </UiDialog>
          </div>
        </UiCardHeader>
        <UiCardContent>
          <div v-if="loading" class="p-4 text-center">
            Loading...
          </div>
          <div v-else class="space-y-2">
            <div 
              v-for="(user, index) in users" 
              :key="user.id"
              class="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors"
              :class="selectedUser?.id === user.id ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'"
              @click="selectedUser = user"
            >
              <div class="flex items-center gap-3">
                <UiAvatar class="h-8 w-8">
                  <UiAvatarFallback>{{ user.avatar_initials }}</UiAvatarFallback>
                </UiAvatar>
                <div>
                  <div class="font-medium">{{ user.name }}</div>
                  <div class="text-sm opacity-90">Rank #{{ index + 1 }}</div>
                </div>
              </div>
              <span class="font-bold">+{{ user.returns.toFixed(1) }}%</span>
            </div>
          </div>
        </UiCardContent>
      </UiCard>

      <!-- Portfolio Details -->
      <UiCard class="md:col-span-2">
        <UiCardHeader v-if="selectedUser">
          <div class="flex items-center gap-4">
            <UiAvatar class="h-12 w-12">
              <UiAvatarFallback>{{ selectedUser.avatar_initials }}</UiAvatarFallback>
            </UiAvatar>
            <div>
              <UiCardTitle>{{ selectedUser.name }}'s Portfolio</UiCardTitle>
              <p class="text-sm text-gray-500">Last updated {{ new Date(selectedUser.created_at).toLocaleDateString() }}</p>
            </div>
          </div>
        </UiCardHeader>
        <UiCardContent v-if="selectedUser" class="space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <UiCard>
              <UiCardContent class="pt-6">
                <div class="text-sm text-gray-500">Portfolio Value</div>
                <div class="text-2xl font-bold">${{ selectedUser.portfolio_value.toLocaleString() }}</div>
              </UiCardContent>
            </UiCard>
            <UiCard>
              <UiCardContent class="pt-6">
                <div class="text-sm text-gray-500">Total Returns</div>
                <div class="text-2xl font-bold text-green-600">+{{ selectedUser.returns.toFixed(1) }}%</div>
              </UiCardContent>
            </UiCard>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-4">Holdings</h3>
            <div class="space-y-3">
              <div 
                v-for="(holding, index) in selectedUser.holdings" 
                :key="index"
                class="flex items-center justify-between p-4 bg-accent rounded-lg"
              >
                <div class="flex items-center gap-3">
                  <Wallet class="h-4 w-4" />
                  <span class="font-medium">{{ holding.symbol }}</span>
                </div>
                <div class="text-right">
                  <div class="font-medium">${{ holding.value.toLocaleString() }}</div>
                  <div class="text-sm text-green-600">+{{ holding.returns.toFixed(1) }}%</div>
                </div>
              </div>
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>