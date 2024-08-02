/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'

// Types


export function registerPlugins (app) {
  loadFonts()
  app.use(vuetify)
}
