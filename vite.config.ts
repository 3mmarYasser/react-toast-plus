/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import {resolve} from "node:path";
import tsconfigPaths from "vite-tsconfig-paths";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react() ,dts({
    tsconfigPath: './tsconfig.app.json',
    rollupTypes: true
  }) ,tsconfigPaths() ],
  build: {
    lib:{
      entry: resolve(__dirname , 'src/index.ts'),
      name:'react-toast-plus',
      fileName:'react-toast-plus',
      // formats:['es']
    },
    rollupOptions: {
      external: ['react', 'react-dom' , 'react/jsx-runtime'],
        output: {
        globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
              'react/jsx-runtime': 'react/jsx-runtime',
        }
      }
    }
  }
})
