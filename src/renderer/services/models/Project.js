import fs from 'fs'
import pretty from 'pretty'
import {parseTemplate} from '@/utils/component'

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
              selectedComponent: null,
              selectedBlock: null,
              selectedWidget: null
            }
          }
        }
        return pre
      }, {})
    }
  }

  save ({name, path}, data, cb) {
    /* eslint-disable */
    const scripts = `<script>export default {}<\/script>`
    const styles = `<style>.view {}</style>`
    const fullPath = `${path}/${name}`
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath)
    }
    for (let page of data) {
      let {id, components} = page
      let code = `<template><section>${parseTemplate(components)}</section></template>${scripts}${styles}`
      code = pretty(code)
      fs.writeFile(`${fullPath}/${id}.vue`, code, err => {
        if (err) console.log(err)
      })
    }
    fs.writeFile(`${fullPath}/${name}.vd-project`, JSON.stringify(data), cb)
  }
}

export default new Project()
