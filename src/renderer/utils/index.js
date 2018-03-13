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
  }, {
    slots: {
      type: Array,
      default: []
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
// 递归查询
export function recursiveFindBy (collection, condition, childrenKey = 'children') {
  let children
  for (let _ of collection) {
    if (condition(_)) return _
    children = parsePath(childrenKey)(_)
    if (children && children.length) {
      return recursiveFindBy(children, condition, childrenKey)
    } else {
      continue
    }
  }
}
// 递归删除
export function recursiveSpliceBy (collection, condition, childrenKey = 'children') {
  let children
  for (let i = 0, len = collection.length; i < len; i++) {
    let _ = collection[i]
    if (condition(_)) {
      return collection.splice(i, 1)
    }
    children = parsePath(childrenKey)(_)
    if (children && children.length) {
      return recursiveSpliceBy(children, condition, childrenKey)
    } else {
      continue
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
