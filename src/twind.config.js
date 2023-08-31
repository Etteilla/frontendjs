import { defineConfig } from '@twind/core'
// Using @twind/preset-tailwind/base to exclude the default tailwind colors
import presetTailwind from '@twind/preset-tailwind/base'
import presetAutoprefix from '@twind/preset-autoprefix'
import presetTailwindForms from '@twind/preset-tailwind-forms'
// import presetTailwind from '@twind/preset-tailwind/base'

// Selectively import colors
import {
    stone as gray,
    purple
  } from '@twind/preset-tailwind/colors'

  const egray =  {
    50: "#f8f5ef",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
}

export default defineConfig({
    presets: [
        presetAutoprefix(),
        presetTailwind({
            colors: {
                gray,
                purple,
                egray
            }
        }),
        
        presetTailwindForms({
        strategy: 'base', // only generate global styles
        strategy: 'class', // only generate classes
    }),]
})


