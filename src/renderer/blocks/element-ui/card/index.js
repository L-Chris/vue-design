import { props, setting } from './type'
export default { props, setting }

export const VdElCard = {
  name: 'vd-el-card',
  props,
  render (h) {
    return h(
      'el-card',
      {
        props: {
          header: this.header,
          'body-style': this['body-style']
        }
      },
      this.slots.map(_ => h(_.tag, {
        slot: _.slot,
        attrs: { id: _.id },
        props: _.props
      }))
    )
  }
}
