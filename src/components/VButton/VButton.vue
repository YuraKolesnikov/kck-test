<template>
  <component
    :is="tag"
    class="v-button"
    :class="buttonClassList"
    v-bind="{
      href,
      target,
      type,
      disabled
    }"
    @click="onClick">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'VButton',
  props: {
    href: String,
    target: String,
    disabled: Boolean
  },
  methods: {
    onClick(e) {
      if (!this.disabled) { this.$emit('click', e) }
    }
  },
  computed: {
    tag() {
      return this.href ? 'a' : 'button'
    },
    buttonClassList() {
      return {
        'v-button--disabled': this.disabled
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./VButton";
</style>
