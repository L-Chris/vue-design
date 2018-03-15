import { props, setting } from './type'
export default { props, setting }

export const VdElInput = {
  name: 'vd-el-input',
  props,
  render (h) {
    return h(
      'el-input',
      {
        props: {
          type: this.type,
          value: this.value,
          maxlength: this.maxlength,
          minlength: this.minlength,
          placeholder: this.placeholder,
          clearable: this.clearable,
          disabled: this.disabled,
          size: this.size,
          'prefix-icon': this['prefix-icon'],
          'suffix-icon': this['suffix-icon'],
          rows: this.rows,
          autosize: this.autosize,
          'auto-complete': this['auto-complete'],
          name: this.name,
          readonly: this.readonly,
          max: this.max,
          min: this.min,
          step: this.step,
          resize: this.resize,
          autofocus: this.autofocus,
          form: this.form,
          label: this.label,
          tabindex: this.tabindex
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
