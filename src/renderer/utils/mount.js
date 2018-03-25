import Vue from 'vue'
import widgetWrapper from '@/mixins/widgetWrapper'

export const mount = (el, component, store) => {
  let vm = new Vue({
    extends: component,
    mixins: [widgetWrapper],
    store
  })
  return vm.$mount(el)
}

export const mountSlot = (parent, component, store, slotName) => {
  let vm = {
    extends: component,
    mixins: [widgetWrapper],
    store
  }
  let child = parent.$createElement(vm)
  if (Array.isArray(parent.$slots[slotName])) {
    parent.$slots[slotName].push(child)
  } else {
    parent.$slots[slotName] = [child]
  }
  parent.$forceUpdate()
  return child
}
