import fs from 'fs'
import pretty from 'pretty'
import {stringifyTemplate} from '@/utils/component'

class Project {
  // constructor () {}

  load (path, {encoding = 'utf8', flag} = {}) {
    let project = JSON.parse(fs.readFileSync(path, {encoding, flag}))
    return {
      pages: project.map(_ => ({
        id: _.id,
        label: _.label,
        children: _.children
      })),
      modules: project.reduce((pre, {id, components}) => {
        pre[id] = {
          namespaced: true,
          state () {
            return {
              components,
              selectedLayout: null,
              selectedBlock: null,
              selectedWidget: null,
              selectedComponent: null
            }
          }
        }
        return pre
      }, {})
    }
  }

  save ({name, path}, data, cb) {
    /* eslint-disable */
    let template, styles, code
    const scripts = `<script>export default {}<\/script>`
    const fullPath = `${path}/${name}`
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath)
    }
    for (let page of data) {
      let {id, components} = page
      styles = components.find(_ => _.setting.label === 'style')
      styles = `<style>${styles ? styles.props.domProps.innerText : ''}</style>`
      template = `<template>${stringifyTemplate(components)}</template>`
      code = pretty(`${template}${scripts}${styles}`)
      fs.writeFile(`${fullPath}/${id}.vue`, code, err => {
        if (err) console.log(err)
      })
    }
    fs.writeFile(`${fullPath}/${name}.vd-project`, JSON.stringify(data), cb)
  }
}

export default new Project()
