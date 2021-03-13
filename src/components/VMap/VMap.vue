<template>
  <div id="map" class="v-map"></div>
</template>

<script>
export default {
  name: 'VMap',
  data() {
    return {
      map: null,
      currentLandmark: null,
      landmarkData: {
        longitude: null,
        latitude: null
      }
    }
  },
  created() {
    this.landmarkData.latitude = 55.75318063815829
    this.landmarkData.longitude = 37.619351368735494
    ymaps.ready(this.init)
  },
  methods: {
    init() {
      this.map = new ymaps.Map('map', {
        center: [this.landmarkData.latitude, this.landmarkData.longitude],
        zoom: 12,
        controls: ['zoomControl']
      })

      const firstPlacemark = new ymaps.Placemark(
        [55.752036355379175, 37.61739140640532]
      )

      const secondPlacemark = new ymaps.Placemark(
        [55.715726897873786, 37.67884480152205]
      )

      this.map.geoObjects.add(firstPlacemark)
      this.map.geoObjects.add(secondPlacemark)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-map {
  height: 500px;
  width: 100%;
  margin: auto;
}
</style>
