import throttle from 'lodash.throttle'
import { SET_HOVERED_COMPONENT, SET_SELECTED_COMPONENT, SET_CONTEXT_MENU, SET_SLOT_MENU } from '@/store/mutation-types'

export default {
  methods: {
    handleMouseOver (e) {
      e.stopPropagation()
      this.$store.commit(SET_HOVERED_COMPONENT, this.$info)
    },
    handleMouseDown (e) {
      const {button, x, y} = e
      e.stopPropagation()
      this.$store.commit(SET_SELECTED_COMPONENT, this.$info)
      if (button === 0) return
      this.$store.commit(SET_CONTEXT_MENU, {
        visible: true,
        x,
        y
      })
    },
    handleDragOver: throttle(function ({x, y}) {
      this.$store.commit(SET_SLOT_MENU, {
        slots: this.$info.setting.config.Slots,
        visible: true,
        x,
        y
      })
    }, 150),
    handleDragLeave (e) {
    },
    registerEvents () {
      this.$el.addEventListener('mousedown', this.handleMouseDown)
      this.$el.addEventListener('mouseover', this.handleMouseOver)
      this.$el.addEventListener('dragover', this.handleDragOver)
      this.$el.addEventListener('dragleave', this.handleDragLeave)
    }
  },
  mounted () {
    this.$el.id = this._uid
    this.registerEvents()
  },
  destroyed () {
    this.$el.parentNode.removeChild(this.$el)
  }
}
