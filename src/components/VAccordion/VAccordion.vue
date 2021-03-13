<template>
  <ul class="v-accordion">
    <li class="v-accordion__item" v-for="item in items" :key="`accordion_item_${item.id}`">
      <div class="v-accordion__trigger" @click="onClick(item.id)">{{ item.label }}</div>
      <div class="v-accodion__content" v-if="activeTab === item.id">
        <slot :name="item.id" />
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'VAccordion',
  model: {
    prop: 'activeTab',
    event: 'tabupdate'
  },
  props: {
    items: Array,
    activeTab: String
  },
  methods: {
    onClick(id) {
      console.log(id)
      this.$emit('tabupdate', id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./VAccordion";
</style>
