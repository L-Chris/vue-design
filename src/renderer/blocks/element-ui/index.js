import header, {VdElHeader} from './header'
import container, {VdElContainer} from './container'
import main, {VdElMain} from './main'
import footer, {VdElFooter} from './footer'
import aside, {VdElAside} from './aside'
import input, {VdElInput} from './input'
import radio, {VdElRadio} from './radio'
import button, {VdElButton} from './button'
import card, {VdElCard} from './card'

export default [
  {id: 0, label: 'ElHeader', tag: 'vd-el-header', category: 'layout', ...header},
  {id: 1, label: 'ElContainer', tag: 'vd-el-container', category: 'layout', ...container},
  {id: 2, label: 'ElMain', tag: 'vd-el-main', category: 'layout', ...main},
  {id: 3, label: 'ElFooter', tag: 'vd-el-footer', category: 'layout', ...footer},
  {id: 4, label: 'ElAside', tag: 'vd-el-aside', category: 'layout', ...aside},
  {id: 5, label: 'ElInput', tag: 'vd-el-input', category: 'form', ...input},
  {id: 6, label: 'ElRadio', tag: 'vd-el-radio', category: 'form', ...radio},
  {id: 7, label: 'ElButton', tag: 'vd-el-button', category: 'form', ...button},
  {id: 8, label: 'ElCard', tag: 'vd-el-card', category: 'layout', ...card}
]

export const ElComponents = [
  VdElHeader,
  VdElContainer,
  VdElMain,
  VdElFooter,
  VdElAside,
  VdElInput,
  VdElRadio,
  VdElButton,
  VdElCard
]
