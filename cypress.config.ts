import { clerkSetup } from '@clerk/testing/cypress'
import { defineConfig } from 'cypress'

export default defineConfig({
  env: {
    CLERK_FRONTEND_API: 'pk_test_c3BlY2lhbC1nb2xkZmlzaC03OS5jbGVyay5hY2NvdW50cy5kZXYk',
    "NEXT_PUBLIC_CLERK_FRONTEND_API": "pk_test_c3BlY2lhbC1nb2xkZmlzaC03OS5jbGVyay5hY2NvdW50cy5kZXYk"
  },
  e2e: {
    setupNodeEvents(on, config) {
      return clerkSetup({ config })
    },
    baseUrl: 'http://localhost:3000', // your app's URL
  },
  
})