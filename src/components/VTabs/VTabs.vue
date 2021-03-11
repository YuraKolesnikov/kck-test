<template>
  <ul class="v-tabs">
    <li
      v-for="tab in tabs"
      :key="`tabs_item_${tab.id}`"
      class="v-tabs__item"
      :class="{'v-tabs__item--active': activeTab === tab.id}"
      @click="$emit('tabupdate', tab.id)">
      <div class="v-tabs__item-content">
        {{ tab.label }}
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'VTabs',
  model: {
    prop: 'activeTab',
    event: 'tabupdate'
  },
  props: {
    tabs: Array,
    activeTab: String
  }
}
</script>

<style lang="scss" scoped>
@import "VTabs";
</style>
