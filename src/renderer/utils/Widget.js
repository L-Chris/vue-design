import {guid} from '@/utils'

class Widget {
  constructor ({id}) {
    this.id = ''
    this.$el = null
    this.version = '0.0.0'
  }
  // create dom
  create (target, id = guid()) {
    let $el = document.createElement('div')
    $el.id = id
    target.appendChild($el)
    return $el
  }
  render () {}
}

Widget.config = Object.freeze({})