<template>
  <main class="v-main">
    <div class="v-container" v-if="!isSuccess">
      <v-accordion :items="items" v-model="activeTab" v-if="isMobile">
        <template #delivery>
          <v-form :fields="formFields.delivery" :current-field-group="activeTab" @submit="onSubmit" />
        </template>
        <template #pickup>
          <v-form :fields="formFields.pickup" :current-field-group="activeTab" @submit="onSubmit" />
        </template>
      </v-accordion>
      <div v-else>
        <v-tabs :tabs="items" v-model="activeTab" />
        <v-form :fields="formFields" :current-field-group="activeTab" @submit="onSubmit" />
      </div>
    </div>
    <div class="v-container" v-else>
      <div class="v-success-banner">
        <h4>Поздравляем!</h4>
        <p>Ваш заказ принят и скоро будет на месте!</p>
        <p>Переход на страницу через... {{ countdown }}</p>
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
import { NAME_REGEX, PHONE_REGEX } from 'Helpers/regex'
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
      isSuccess: false,
      activeTab: 'delivery',
      countdown: 5,
      items: [
        { id: 'delivery', label: 'Доставка курьером' },
        { id: 'pickup', label: 'Самовывоз' }
      ],
      isMobile: false,
      formFields: {
        delivery: [
          { id: 'full_name', type: 'text', label: 'Ф.И.О.', placeholder: 'Только кириллица', regex: NAME_REGEX },
          { id: 'phone', type: 'text', label: 'Телефон', placeholder: '+7 (___) ___-__-__', mask: '+7(###)-###-##-##', regex: PHONE_REGEX },
          { id: 'address', type: 'text', label: 'Адрес доставки', placeholder: 'Город, улица, дом', block: true },
          { id: 'comment', type: 'textarea', label: 'Комментарий', block: true }
        ],
        pickup: [
          {
            id: 'pickup_point',
            type: 'radio',
            options: [
              { id: 'first', type: 'radio', label: 'Пункт Выдачи заказов Песчаная улица, дом 13' },
              { id: 'second', type: 'radio', label: 'Пункт Выдачи заказов Подсосенский переулок, 11' },
              { id: 'third', type: 'radio', label: 'Пункт Выдачи заказов улица Строителей, дом 13' },
              { id: 'fourth', type: 'radio', label: 'Пункт Выдачи заказов улица Судостроительная, дом 90' }
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
    onSubmit (isSuccess) {
      this.isSuccess = isSuccess
      this.activeTab = 'delivery'
      const countdownFunc = setInterval(() => {
        if (this.countdown === 0) {
          clearInterval(countdownFunc)
        }
        this.countdown -= 1
      }, 1000)
      setTimeout(() => {
        this.isSuccess = false
      }, 6000)
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

.v-success-banner {
  max-width: 600px;
  margin: auto;
  padding: 15px;
  background-color: $bg-success;
  border: 1px solid $border-success;
  border-radius: 4px;
}
</style>
