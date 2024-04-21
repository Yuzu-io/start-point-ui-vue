import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(createPersistedState())

export * from './modules/user'
export * from './modules/tag'
export * from './modules/permission'
export * from './modules/loading'
export * from './modules/dict'

export default pinia
