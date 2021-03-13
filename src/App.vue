<template>
  <main class="v-main">
    <div class="v-container">
      <v-accordion :items="items" v-model="activeTab" v-if="isMobile">
        <template #delivery>
          <form @submit.prevent="onSubmit" action="post">
            <fieldset>
              <VInput id="full_name" name="full_name" label="Ф.И.О." v-model="formValues.full_name" />
            </fieldset>
          </form>
        </template>
        <template #pickup>
          Pickup
        </template>
      </v-accordion>
      <div v-else>
        <v-tabs :tabs="items" v-model="activeTab" />
        <form class="v-form" @submit.prevent="onSubmit" action="post" v-if="activeTab === 'delivery'">
          <fieldset class="v-fieldset">
            <VInput id="full_name" name="full_name" label="Ф.И.О." placeholder="Только кириллица" v-model="formValues.full_name" />
          </fieldset>
          <fieldset class="v-fieldset">
            <VInput id="phone" name="phone" label="Телефон" placeholder="+7 () ___-__-__" v-model="formValues.phone" />
          </fieldset>
          <fieldset class="v-fieldset v-fieldset--block">
            <VInput id="address" name="address" label="Адрес доставки" placeholder="Город, улица, дом" v-model="formValues.address" />
          </fieldset>
          <fieldset class="v-fieldset v-fieldset--block">
            <VInput id="comment" name="comment" label="Комментарий" v-model="formValues.comment" />
          </fieldset>
          <div class="v-fieldset v-fieldset--block v-form__button-wrapper">
            <VButton type="submit">Отправить</VButton>
          </div>
        </form>
        <form class="v-form" @submit.prevent="onSubmit" action="post" v-else-if="activeTab === 'pickup'">
          <fieldset class="v-fieldset v-fieldset--block v-fieldset__radio-wrapper">
            <VRadio id="first" value="first" v-model="formValues.pickup_point" label="Пункт Выдачи заказов Песчаная улица, дом 13" />
            <VRadio id="second" value="second" v-model="formValues.pickup_point" label="Пункт Выдачи заказов Подсосенский переулок, 11" />
          </fieldset>
          <input type="hidden" name="pickup_point" v-model="formValues.pickup_point">
          <div class="v-fieldset v-fieldset--block v-form__button-wrapper">
            <VButton type="submit">Отправить</VButton>
          </div>
        </form>
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
export default {
  components: {
    VAccordion,
    VButton,
    VInput,
    VRadio,
    VTabs
  },
  data() {
    return {
      activeTab: 'delivery',
      items: [
        { id: 'delivery', label: 'Доставка курьером' },
        { id: 'pickup', label: 'Самовывоз' }
      ],
      isMobile: false,
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
      this.isMobile = narrowViewportMatch().matches && touchDeviceMatch().matches
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
.v-form {
  padding: 32px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 16px;
  grid-row-gap: 38px;
  background-color: #fff;
}

.v-form__button-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.v-fieldset {
  border: 0;
  padding: 0;
  margin: 0;
}

.v-fieldset--block {
  grid-column: 1 / -1;
}

.v-fieldset__radio-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
