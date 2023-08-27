import { defineConfig } from '@twind/core'
// Using @twind/preset-tailwind/base to exclude the default tailwind colors
import presetTailwind from '@twind/preset-tailwind/base'
import presetAutoprefix from '@twind/preset-autoprefix'
import presetTailwindForms from '@twind/preset-tailwind-forms'
// import presetTailwind from '@twind/preset-tailwind/base'

// Selectively import colors
import {
    slate as gray,
    // red,
    // amber as yellow,
    // emerald as green,
    // indigo as blue,
    purple
  } from '@twind/preset-tailwind/colors'


export default defineConfig({
    presets: [
        presetAutoprefix(),
        presetTailwind({
            colors: { gray, purple }
        }),
        
        presetTailwindForms({
        strategy: 'base', // only generate global styles
        strategy: 'class', // only generate classes
    }),]
})


