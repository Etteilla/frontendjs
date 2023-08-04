import { defineConfig } from '@twind/core'
import presetTailwind from '@twind/preset-tailwind'
import presetAutoprefix from '@twind/preset-autoprefix'
import presetTailwindForms from '@twind/preset-tailwind-forms'

export default defineConfig({
    presets: [presetAutoprefix(), presetTailwind(), presetTailwindForms({
        strategy: 'base', // only generate global styles
        strategy: 'class', // only generate classes
    }),]
})


