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
.v-button {
  cursor: pointer;
  border: 0;
  outline: 0;
  user-select: none;
  text-decoration: none;
  display: inline-block;

  font-size: 16px;
  font-weight: 500;
  line-height: 24px;

  color: #fff;
  background-color: $accent;

  padding: 22px 46px;
  border-radius: 28px;

  transition: background-color 0.3s $timing-function;

  &:hover {
    background-color: $accent-hover;
  }

  &:active,
  &:focus {
    background-color: $accent-pressed;
  }
}

.v-button--disabled {
  cursor: default;
  pointer-events: none;
  color: $inactive-input-label;
  background-color: $inactive;
}
</style>
