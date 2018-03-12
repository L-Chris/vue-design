import button from './button'
import select from './select'

export default [
  {id: 0, label: 'ElButton', tag: 'ElButton', category: 'layout', ...button},
  // {id: 1, label: 'ElRow', tag: 'ElRow', category: 'layout'},
  {id: 2, label: 'ElSelect', tag: 'ElSelect', category: 'form', ...select}
  // {id: 3, label: 'ElOption', tag: 'ElOption', category: 'form'},
  // {id: 4, label: 'ElInput', tag: 'ElInput', category: 'form'},
  // {id: 5, label: 'ElTag', tag: 'ElTag', category: 'data'}
]
