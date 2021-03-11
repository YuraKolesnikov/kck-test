<template>
  <div
    class="v-input"
    :class="inputClassList">

    <label
      class="v-input__label"
      :for="id">
      {{ label }}
    </label>

    <input
      class="v-input__field"
      :value="localValue"
      v-bind="attrs"
      @input="onInput"
      v-if="type !== 'textarea'">

    <textarea
      class="v-input__field v-input__field--textarea"
      :value="localValue"
      v-bind="attrs"
      @input="onInput"
      v-else>
    </textarea>

    <p
      v-if="error"
      class="v-input__error-message">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
import InputPropMixin from 'Root/mixins/InputPropMixin'
export default {
  name: 'VInput',
  model: {
    prop: 'value',
    event: 'input'
  },
  mixins: [InputPropMixin],
  props: {
    error: Boolean,
    placeholder: String,
    errorMessage: String,
    type: {
      type: String,
      default: 'text'
    }
  },
  data() {
    return {
      val: ''
    }
  },
  computed: {
    localValue() {
      return this.value || this.val
    },
    attrs() {
      return {
        id: this.id,
        name: this.name,
        type: this.type,
        disabled: this.disabled,
        required: this.required,
        placeholder: this.placeholder
      }
    },
    inputClassList() {
      return {
        'v-input--disabled': this.disabled,
        'v-input--error': this.error
      }
    }
  },
  methods: {
    onInput({ target }) {
      const { value } = target
      if (!this.value) { this.val = value }
      this.$emit('input', value)

      if (this.type === 'textarea') {
        const { scrollHeight } = target
        target.style.height = `${scrollHeight}px`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./VInput";
</style>
