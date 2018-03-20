import read from 'fs-readdir-recursive'
import parser from '@/plugins/parser'
const prefix = `${__static}/layouts`

let layouts = read(prefix).map(key => parser(`${prefix}/${key}`))

export default layouts
