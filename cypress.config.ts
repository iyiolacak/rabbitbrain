import { clerkSetup } from '@clerk/testing/cypress'
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return clerkSetup({ config })
    },
    baseUrl: 'http://localhost:3000', // your app's URL
  },
})