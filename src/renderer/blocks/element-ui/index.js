import button, {VdElButton} from './button'
// import select, {VdElSelect} from './select'
import card, {VdElCard} from './card'

export default [
  {id: 0, label: 'ElButton', tag: 'vd-el-button', category: 'form', ...button},
  // {id: 1, label: 'ElRow', tag: 'ElRow', category: 'layout'},
  // {id: 2, label: 'ElSelect', tag: 'ElSelect', category: 'form', ...select},
  // {id: 3, label: 'ElOption', tag: 'ElOption', category: 'form'},
  // {id: 4, label: 'ElInput', tagtag: 'ElInput', category: 'form'},
  // {id: 5, label: 'ElTag', tag: 'ElTag', category: 'data'},
  {id: 6, label: 'ElCard', tag: 'vd-el-card', category: 'layout', ...card}
]

export const ElComponents = [
  VdElButton,
  VdElCard
]
