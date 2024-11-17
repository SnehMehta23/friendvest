<!-- pages/index.vue -->
<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
import { ref, onMounted, computed, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { TrendingUp, Trophy, Wallet, Plus, X, Users } from 'lucide-vue-next'
import { createClient } from '@supabase/supabase-js'

const client = useSupabaseClient()
const user = useSupabaseUser()
const showOnboarding = ref(true)
const router = useRouter()

const handleSignOut = async () => {
  await client.auth.signOut()
  router.push('/')
}

const checkOnboardingStatus = async () => {
  if (!user.value) {
    console.log('No user found')
    return
  }

  try {
    console.log('Checking for existing preferences...')
    // Get the most recent preference for this user
    let { data, error } = await client
      .from('user_preferences')
      .select('has_seen_onboarding')
      .eq('user_id', user.value.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    console.log('Initial query result:', { data, error })

    // If no data exists, create new preferences
    if (!data) {
      console.log('No existing preferences, creating new...')
      const { data: newData, error: insertError } = await client
        .from('user_preferences')
        .insert([{
          user_id: user.value.id,
          has_seen_onboarding: false
        }])
        .select('has_seen_onboarding')
        .single()

      console.log('Insert result:', { newData, insertError })

      if (insertError) throw insertError
      data = newData
    }

    console.log('Final data:', data)
    showOnboarding.value = !data?.has_seen_onboarding
  } catch (error) {
    console.error('Error managing onboarding status:', error)
    showOnboarding.value = true
  }
}

const handleOnboardingClose = async () => {
  console.log('Closing onboarding...')
  showOnboarding.value = false

  if (!user.value) {
    console.log('No user found during close')
    return
  }

  try {
    console.log('Updating preferences...')
    const { error } = await client
      .from('user_preferences')
      .upsert({
        user_id: user.value.id,
        has_seen_onboarding: true
      })

    if (error) throw error
    console.log('Preferences updated successfully')
  } catch (error) {
    console.error('Error updating onboarding preference:', error)
  }
}

// Types

interface SymbolValidation {
  isValid: boolean
  isChecking: boolean
  error?: string
}

interface Holding {
  symbol: string
  shares: number
  avgCost: number
  currentPrice?: number
  value?: number
  returns?: number
}

interface Portfolio {
  id: number
  name: string
  avatar_initials: string
  holdings: Holding[]
  created_at: string
  portfolio_value: number     // Matches your table
  returns: number            // Matches your table (not total_returns)
}

interface NewPortfolio {
  name: string
  holdings: Array<{
    symbol: string
    shares: string | number
    avgCost: string | number
  }>
}

// State
const users = ref<Portfolio[]>([])
const selectedUser = ref<Portfolio | null>(null)
const loading = ref(true)
const symbolValidations = ref<Record<number, SymbolValidation>>({})
const { getStockPrice, validateSymbol } = useTwelveData()
const newPortfolio = ref<NewPortfolio>({
  name: "",
  holdings: [{ symbol: "", shares: "", avgCost: "" }] // New structure
})

const isFormValid = computed(() => {
  if (!newPortfolio.value.name) return false

  return newPortfolio.value.holdings.every((h, index) =>
    h.symbol.trim() !== '' &&
    symbolValidations.value[index]?.isValid &&
    h.shares !== '' &&
    !isNaN(Number(h.shares)) &&
    Number(h.shares) > 0 &&
    h.avgCost !== '' &&
    !isNaN(Number(h.avgCost)) &&
    Number(h.avgCost) > 0
  )
})

// Methods
const fetchUsers = async () => {
  try {
    const { data, error } = await client
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

const validateHoldingSymbol = useDebounceFn(async (symbol: string, index: number) => {
  if (!symbol.trim()) {
    symbolValidations.value[index] = { isValid: false, isChecking: false }
    return
  }

  symbolValidations.value[index] = { isValid: false, isChecking: true }

  try {
    const isValid = await validateSymbol(symbol)
    symbolValidations.value[index] = {
      isValid,
      isChecking: false,
      error: isValid ? undefined : 'Invalid symbol'
    }
  } catch (error) {
    symbolValidations.value[index] = {
      isValid: false,
      isChecking: false,
      error: 'Error checking symbol'
    }
  }
}, 500)

const addHolding = () => {
  newPortfolio.value.holdings.push({ symbol: "", value: "", returns: "" })
}

const removeHolding = (index: number) => {
  newPortfolio.value.holdings = newPortfolio.value.holdings.filter((_, i) => i !== index)
}

const calculatePortfolioTotals = (holdings: Holding[]) => {
  const totalCost = holdings.reduce((sum, h) => sum + (h.shares * h.avgCost), 0)
  const currentValue = holdings.reduce((sum, h) => sum + (h.shares * (h.currentPrice || h.avgCost)), 0)
  const totalReturns = totalCost > 0 ? ((currentValue - totalCost) / totalCost) * 100 : 0

  return {
    portfolio_value: currentValue,
    returns: totalReturns
  }
}

const handleNewPortfolioSubmit = async () => {
  try {
    loading.value = true

    // Fetch current prices for all holdings
    const holdingsWithPrices = await Promise.all(
      newPortfolio.value.holdings.map(async h => {
        const currentPrice = await getStockPrice(h.symbol)
        const shares = parseFloat(String(h.shares))
        const avgCost = parseFloat(String(h.avgCost))
        const value = shares * currentPrice
        const returns = ((currentPrice - avgCost) / avgCost) * 100

        return {
          symbol: h.symbol.toUpperCase(),
          shares,
          avgCost,
          currentPrice,
          value,
          returns
        }
      })
    )

    const { portfolio_value, returns } = calculatePortfolioTotals(holdingsWithPrices)

    const newUser = {
      name: newPortfolio.value.name,
      avatar_initials: newPortfolio.value.name.split(' ').map(n => n[0]).join(''),
      holdings: holdingsWithPrices,
      portfolio_value,
      returns
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
        holdings: [{ symbol: "", shares: "", avgCost: "" }]
      }
      symbolValidations.value = {}
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
  checkOnboardingStatus()
})
</script>

<template>
  <div class="w-full max-w-4xl mx-auto p-4 space-y-4">
    <!-- Onboarding Dialog -->
    <UiDialog :open="showOnboarding" @update:open="handleOnboardingClose">
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

          <UiButton class="w-full" @click="handleOnboardingClose">
            Let's Get Started!
          </UiButton>
        </div>
      </UiDialogContent>
    </UiDialog>

    <!-- Main Header -->
    <UiCard>
      <UiCardHeader>
        <UiCardTitle class="flex items-center justify-between text-2xl">
          <div class="flex items-center gap-2">
            <TrendingUp class="h-8 w-8" />
            Friendvest
            <span class="text-sm text-gray-500 ml-2">An Investment Social Club</span>
          </div>
          <UiButton variant="outline" size="sm" @click="handleSignOut">
            Sign Out
          </UiButton>
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
              <UiDialogContent class="sm:max-w-[425px] max-h-[80vh] flex flex-col">
                <UiDialogHeader class="flex-shrink-0">
                  <UiDialogTitle>Add Your Portfolio</UiDialogTitle>
                </UiDialogHeader>

                <!-- Scrollable content -->
                <div class="flex-1 overflow-y-auto pr-2">
                  <div class="space-y-4">
                    <div>
                      <UiLabel for="name">Name</UiLabel>
                      <UiInput id="name" v-model="newPortfolio.name" />
                    </div>
                    <div v-for="(holding, index) in newPortfolio.holdings" :key="index"
                      class="space-y-2 p-2 bg-gray-50 rounded-lg">
                      <div class="flex justify-between items-center">
                        <UiLabel>Position {{ index + 1 }}</UiLabel>
                        <UiButton v-if="index > 0" variant="ghost" size="icon" @click="removeHolding(index)">
                          <X class="h-4 w-4" />
                        </UiButton>
                      </div>

                      <!-- Symbol Input -->
                      <div class="space-y-1">
                        <UiLabel>Symbol</UiLabel>
                        <div class="relative">
                          <UiInput v-model="holding.symbol" placeholder="AAPL" class="uppercase" :class="{
                            'pr-8': symbolValidations[index]?.isChecking,
                            'border-red-500': symbolValidations[index]?.error
                          }" @input="() => validateHoldingSymbol(holding.symbol, index)" />
                          <div v-if="symbolValidations[index]?.isChecking"
                            class="absolute right-2 top-1/2 -translate-y-1/2">
                            <div
                              class="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                          </div>
                        </div>
                        <p v-if="symbolValidations[index]?.error" class="text-sm text-red-500">
                          {{ symbolValidations[index].error }}
                        </p>
                      </div>

                      <!-- Shares Input -->
                      <div class="space-y-1">
                        <UiLabel>Number of Shares</UiLabel>
                        <UiInput v-model="holding.shares" type="text" inputmode="decimal" placeholder="100" />
                      </div>

                      <!-- Average Cost Input -->
                      <div class="space-y-1">
                        <UiLabel>Average Cost per Share</UiLabel>
                        <UiInput v-model="holding.avgCost" type="text" inputmode="decimal" placeholder="150.00" />
                      </div>
                    </div>
                    <UiButton variant="outline" @click="addHolding">
                      Add Another Holding
                    </UiButton>
                  </div>
                </div>

                <!-- Footer with submit button -->
                <div class="flex-shrink-0 pt-4 mt-4 border-t">
                  <UiButton class="w-full" @click="handleNewPortfolioSubmit" :disabled="!isFormValid">
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
            <div v-for="(user, index) in users" :key="user.id"
              class="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors"
              :class="selectedUser?.id === user.id ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'"
              @click="selectedUser = user">
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
              <p class="text-sm text-gray-500">Last updated {{ new Date(selectedUser.created_at).toLocaleDateString() }}
              </p>
            </div>
          </div>
        </UiCardHeader>
        <UiCardContent v-if="selectedUser" class="space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <UiCard>
              <UiCardContent class="pt-6">
                <div class="text-sm text-gray-500">Portfolio Value</div>
                <div class="text-2xl font-bold">
                  ${{ selectedUser.portfolio_value?.toLocaleString() ?? '0' }}
                </div>
              </UiCardContent>
            </UiCard>
            <UiCard>
              <UiCardContent class="pt-6">
                <div class="text-sm text-gray-500">Total Returns</div>
                <div class="text-2xl font-bold"
                  :class="(selectedUser.returns ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ (selectedUser.returns ?? 0) >= 0 ? '+' : '' }}{{ (selectedUser.returns ?? 0).toFixed(1)
                  }}%
                </div>
              </UiCardContent>
            </UiCard>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-4">Holdings</h3>
            <div v-if="selectedUser" class="space-y-3">
              <div v-for="(holding, index) in selectedUser.holdings" :key="index"
                class="flex items-center justify-between p-4 bg-accent rounded-lg">
                <div class="flex items-center gap-3">
                  <Wallet class="h-4 w-4" />
                  <div>
                    <span class="font-medium">{{ holding.symbol }}</span>
                    <div class="text-sm text-gray-500">
                      {{ holding.shares }} shares @ ${{ (holding.avgCost ?? 0).toFixed(2) }}
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="font-medium">${{ (holding.value ?? 0).toLocaleString() }}</div>
                  <div class="text-sm" :class="(holding.returns ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'">
                    {{ (holding.returns ?? 0) >= 0 ? '+' : '' }}{{ (holding.returns ?? 0).toFixed(2) }}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>