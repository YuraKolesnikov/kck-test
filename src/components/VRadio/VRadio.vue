<template>
  <label
    class="v-radio"
    :class="radioClassList"
    :for="id">

    <input
      class="v-radio__input"
      type="radio"
      v-bind="{
        id,
        name,
        disabled,
        required,
        checked: isChecked
      }"
      @change="$emit('change', id)">

    <span class="v-radio__label">{{ label }}</span>
  </label>
</template>

<script>
import InputPropMixin from 'Root/mixins/InputPropMixin'
export default {
  name: 'VRadio',
  model: {
    prop: 'value',
    event: 'change'
  },
  mixins: [InputPropMixin],
  computed: {
    isChecked() {
      return this.id === this.value
    },
    radioClassList() {
      return {
        'v-radio--checked': this.isChecked,
        'v-radio--disabled': this.disabled
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./VRadio";
</style>
