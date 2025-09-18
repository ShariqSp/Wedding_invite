import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default {
  // ...other config
  server: {
    // Allow external host access
    allowedHosts: ['wedding.shariqsp.com', 'localhost', '18.208.21.144'],
    host: true  // also listen on all interfaces
  }
};
