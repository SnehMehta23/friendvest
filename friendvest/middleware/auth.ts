export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser()
  
    // Special case for root/home page which is our login
    if (to.path === '/') {
      return
    }
  
    // If user is not logged in and trying to access any other page
    if (!user.value) {
      return navigateTo('/')
    }
  })