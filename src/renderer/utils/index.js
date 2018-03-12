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

export const getDefaultByType = type => {
  switch (type) {
    case 'String':
      return ''
    case 'Number':
      return 0
    case 'Boolean':
      return false
    default:
      return ''
  }
}

export const toProps = ({config}) => {
  if (!config || !Array.isArray(config)) return {}
  let style = config.find(_ => _.name === 'Style')
  if (!style) return {}
  return style.children.reduce((pre, {key, type, default: defaultValue}) => {
    pre[key] = {
      type,
      default: defaultValue
    }
    return pre
  }, {})
}

export const getOwnProperty = obj => {
  return Object.keys(obj).reduce((pre, _) => {
    pre[_] = obj[_]
    return pre
  }, {})
}

export function convertToProject (pages) {
}
