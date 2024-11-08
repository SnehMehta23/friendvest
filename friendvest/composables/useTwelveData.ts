// composables/useTwelveData.ts
const TWELVE_DATA_API_KEY = '39a6ff3679a94b2793f7d5405b5a63a1'
const BASE_URL = 'https://api.twelvedata.com'

export function useTwelveData() {
  const getStockPrice = async (symbol: string) => {
    try {
      const response = await fetch(
        `${BASE_URL}/price?symbol=${symbol}&apikey=${TWELVE_DATA_API_KEY}`
      )
      const data = await response.json()
      if (data.price) {
        return parseFloat(data.price)
      }
      throw new Error(data.message || 'Failed to fetch price')
    } catch (error) {
      console.error(`Error fetching price for ${symbol}:`, error)
      throw error
    }
  }

  const validateSymbol = async (symbol: string) => {
    try {
      const response = await fetch(
        `${BASE_URL}/symbol_search?symbol=${symbol}&apikey=${TWELVE_DATA_API_KEY}`
      )
      const data = await response.json()
      return data.data?.some((result: any) => 
        result.symbol.toUpperCase() === symbol.toUpperCase()
      ) || false
    } catch (error) {
      console.error(`Error validating symbol ${symbol}:`, error)
      return false
    }
  }

  return {
    getStockPrice,
    validateSymbol
  }
}