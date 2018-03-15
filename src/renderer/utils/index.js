export const spliceIf = (collection, fn) => {
  let index = collection.findIndex(_ => fn(_))
  if (index >= 0) collection.splice(index, 1)
  return collection
}

// 对对象解析路径下的属性
const bailRE = /[^\w.$]/
export const parsePath = path => {
  if (bailRE.test(path)) return
  const segments = path.split('.')
  return obj => {
    for (let segment of segments) {
      if (!obj) return
      obj = obj[segment]
    }
    return obj
  }
}

let id = 1000
export const guid = () => id++

export const getTypeConstructor = type => {
  switch (type) {
    case 'Number':
      return Number
    case 'Boolean':
      return Boolean
    case 'Array':
      return Array
    case 'Object':
      return Object
    default:
      return String
  }
}

export const toProps = ({config}) => {
  if (!config || !Array.isArray(config)) return {}
  let style = config.find(_ => _.name === 'Style')
  if (!style) return {}
  return style.children.reduce((pre, {key, type, default: defaultValue}) => {
    pre[key] = {
      type: getTypeConstructor(type),
      default: defaultValue
    }
    return pre
  },
  {
    slots: {
      type: Array,
      default: []
    }
  },
  {
    domProps: {
      type: Object,
      default: {}
    }
  })
}

export const getOwnProperty = obj => {
  return Object.keys(obj).reduce((pre, _) => {
    pre[_] = obj[_]
    return pre
  }, {})
}

export function convertToProject (pages) {
}

// 递归map
export function recursiveMap (collection, childrenKey) {
  let children
  for (let _ of collection) {
    children = parsePath(childrenKey)(_)
    if (children && children.length) {
      _.children = recursiveMap(children, childrenKey)
    } else {
      _.children = []
    }
  }
  return collection
}

// 递归查询
export function recursiveFindBy (collection, condition, childrenKey = 'children') {
  let children, result
  for (let _ of collection) {
    if (condition(_)) return _
    children = parsePath(childrenKey)(_)
    if (children && children.length) {
      result = recursiveFindBy(children, condition, childrenKey)
      if (result) return result
    }
  }
}
// 递归删除
export function recursiveSpliceBy (collection, condition, childrenKey = 'children') {
  let children, result
  for (let i = 0, len = collection.length; i < len; i++) {
    let _ = collection[i]
    if (condition(_)) return collection.splice(i, 1)
    children = parsePath(childrenKey)(_)
    if (children && children.length) {
      result = recursiveSpliceBy(children, condition, childrenKey)
      if (result) return result
    }
  }
}

// 创建挂载点
export function createElement (target, id = guid()) {
  let element = document.createElement('div')
  element.id = id
  target.appendChild(element)
  return element
}

// 拼接组件属性
export function parseAttrs ({props, setting: { config }}) {
  function parseAttr (key, val, type) {
    return `${type !== 'String' ? ':' : ''}${key}="${val}"`
  }
  let propsModel = config[1].children
  return propsModel.reduce((pre, {key, type, default: defaultValue}) =>
    defaultValue === props[key] ? pre : `${pre} ${parseAttr(key, props[key], type)}`
    , '')
}

// 组件转换为模板字符串
export function parseTemplate (components) {
  return components.reduce((pre, {props: {slots, ...props}, setting, label}) => {
    return `${pre}<${label} ${parseAttrs({props, setting})}>${slots.length ? parseTemplate(slots) : ''}</${label}>`
  }, '')
}
