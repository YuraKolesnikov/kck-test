<template>
  <ul class="v-accordion">
    <li
      class="v-accordion__item"
      :class="{ 'v-accordion__item--open': activeTab === item.id }"
      v-for="item in items"
      :key="`accordion_item_${item.id}`">
      <button
        class="v-accordion__trigger"
        :class="{ 'v-accordion__trigger--active': activeTab === item.id }"
        @click="onClick(item.id)">
        <span>{{ item.label }}</span>
        <v-arrow-icon class="v-accordion__arrow" />
      </button>
      <transition
        name="accordion-item"
        @enter="startTransition"
        @after-enter="endTransition"
        @before-leave="startTransition"
        @after-leave="endTransition">
        <div class="v-accordion__content" v-if="activeTab === item.id">
          <slot :name="item.id" />
        </div>
      </transition>
    </li>
  </ul>
</template>

<script>
import VArrowIcon from './arrow.svg'
export default {
  name: 'VAccordion',
  model: {
    prop: 'activeTab',
    event: 'tabupdate'
  },
  components: {
    VArrowIcon
  },
  props: {
    items: Array,
    activeTab: String
  },
  methods: {
    onClick(id) {
      const nextId = this.activeTab === id ? '' : id
      this.$emit('tabupdate', nextId)
    },

    startTransition(el) {
      el.style.height = el.scrollHeight + 'px'
    },

    endTransition(el) {
      el.style.height = ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./VAccordion";
</style>
