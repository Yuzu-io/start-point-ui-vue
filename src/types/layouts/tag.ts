import type { Ref } from 'vue'

export interface ProvideTag {
  collapsedWidth?: number
  width?: number
  collapsed?: Ref<boolean>
  refresh?: () => void
}
