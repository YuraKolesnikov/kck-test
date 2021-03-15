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
      },
      landmarks: [
        { id: 'first', latitude: 55.692036355379175, longitude: 37.50739140640532 },
        { id: 'second', latitude: 55.802036355379175, longitude: 37.70739140640532 }
      ]
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

      this.landmarks.forEach(lm =>
          this.map.geoObjects.add(new ymaps.Placemark([ lm.latitude, lm.longitude ])))

      this.map.setBounds(this.map.geoObjects.getBounds(), { checkZoomRange: true, zoomMargin: 9 })
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
