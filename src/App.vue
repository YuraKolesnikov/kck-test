<template>
  <main class="v-main">
    <div class="v-container">
      <v-accordion :items="items" v-model="activeTab" v-if="isMobile">
        <template #delivery>
          <v-form :fields="formFields.delivery" :current-field-group="activeTab" />
        </template>
        <template #pickup>
          <v-form :fields="formFields.pickup" :current-field-group="activeTab" />
        </template>
      </v-accordion>
      <div v-else>
        <v-tabs :tabs="items" v-model="activeTab" />
        <v-form :fields="formFields" :current-field-group="activeTab" />
      </div>
    </div>
  </main>
</template>

<script>
import { narrowViewportMatch, touchDeviceMatch } from 'Root/utils/env'
import VAccordion from 'Components/VAccordion'
import VButton from 'Components/VButton'
import VInput from 'Components/VInput'
import VRadio from 'Components/VRadio'
import VTabs from 'Components/VTabs'
import VForm from 'Components/VForm'
export default {
  components: {
    VAccordion,
    VButton,
    VInput,
    VRadio,
    VTabs,
    VForm
  },
  data() {
    return {
      activeTab: 'delivery',
      items: [
        { id: 'delivery', label: 'Доставка курьером' },
        { id: 'pickup', label: 'Самовывоз' }
      ],
      isMobile: false,
      formFields: {
        delivery: [
          { id: 'full_name', type: 'text', label: 'Ф.И.О.', placeholder: 'Только кириллица', errorMessage: 'Пожалуйста, введите Ф.И.О.!' },
          { id: 'phone', type: 'text', label: 'Телефон', placeholder: '+7 (___) ___-__-__', errorMessage: 'Пожалуйста, введите номер телефона!' },
          { id: 'address', type: 'text', label: 'Адрес доставки', placeholder: 'Город, улица, дом', errorMessage: 'Пожалуйста, введите адрес!', block: true },
          { id: 'comment', type: 'textarea', label: 'Комментарий', errorMessage: 'Пожалуйста, оставьте комментарий!', block: true }
        ],
        pickup: [
          {
            id: 'pickup_point',
            type: 'radio',
            options: [
              { id: 'first', type: 'radio', label: 'Пункт Выдачи заказов Песчаная улица, дом 13' },
              { id: 'second', type: 'radio', label: 'Пункт Выдачи заказов Подсосенский переулок, 11' }
            ],
            errorMessage: 'Пожалуйста, выберите пункт выдачи заказов!'
          }
        ]
      },
      formValues: {
        full_name: '',
        phone: '',
        address: '',
        comment: '',
        pickup_point: ''
      }
    }
  },
  beforeMount() {
    this.setDeviceType()
    narrowViewportMatch().addListener(this.setDeviceType)
    touchDeviceMatch().addListener(this.setDeviceType)
  },
  methods: {
    onSubmit ({ target }) {
      const formData = new FormData(target)
      for (const field of formData.entries()) {
        console.log(field)
      }
    },
    setDeviceType() {
      this.isMobile = narrowViewportMatch().matches || touchDeviceMatch().matches
    }
  },
  beforeDestroy () {
    narrowViewportMatch().removeListener(this.setDeviceType)
    touchDeviceMatch().removeListener(this.setDeviceType)
  }
}
</script>

<style lang="scss" scoped>
.v-main {
  background-color: $bg-color;
  min-height: 100vh;
}

.v-container {
  max-width: 1200px;
  padding: 20px;
  margin: auto;
}
</style>
