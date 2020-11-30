<template>
  <main>
    <navbar />
    <router-view/>
  </main>
</template>

<script>
import Navbar from 'Components/Navbar'
export default {
  components: {
    Navbar
  },

  mounted() {
    console.log('App.vue mounted')
  }
}
</script>