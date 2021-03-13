<template>
  <form
    class="v-form"
    @submit.prevent="onSubmit">
    <template v-for="field in visibleFields">
      <fieldset
        v-if="field.type === 'text' || field.type === 'textarea'"
        class="v-fieldset"
        :class="{
          'v-fieldset--block': field.block
        }"
        :key="`form_field_${field.id}`">
        <VInput
          :type="field.type"
          :id="field.id"
          :name="field.id"
          :label="field.label"
          :placeholder="field.placeholder"
          :error-message="field.errorMessage"
          :error="invalidFields.includes(field.id)"
          v-model="formValues[field.id]"
        />
      </fieldset>
      <fieldset
        v-else
        class="v-fieldset v-fieldset__radio-wrapper">
        <VRadio
          class="v-form__radio"
          v-for="radio in field.options"
          :key="`radio_${field.id}_${radio.id}`"
          :id="radio.id"
          :name="field.id"
          :value="radio.value"
          :label="radio.label"
          v-model="formValues[field.id]"
        />
        <VMap class="v-form__map" />
        <!-- Hack for formData -->
        <input
          :name="field.id"
          type="hidden"
          v-model="formValues[field.id]">
        <p
          v-if="invalidFields.includes(field.id)"
          class="v-form__error-message">
          {{ field.errorMessage }}
        </p>
      </fieldset>
    </template>
    <fieldset class="v-fieldset v-fieldset--block v-form__button-wrapper">
      <v-button type="submit">
        Отправить
      </v-button>
    </fieldset>
  </form>
</template>

<script>
import VButton from 'Components/VButton'
import VInput from 'Components/VInput'
import VRadio from 'Components/VRadio'
import VMap from 'Components/VMap'
import { getTypeOf } from 'Helpers/typeof'

export default {
  name: 'VForm',
  props: {
    fields: Object,
    currentFieldGroup: String
  },
  components: {
    VButton,
    VInput,
    VRadio,
    VMap
  },
  data() {
    return {
      invalidFields: [],
      formValues: {},
      currentLandmark: null,
      landmarkData: {
        longitude: null,
        latitude: null
      }
    }
  },
  methods: {
    onSubmit ({ target }) {
      this.invalidFields = []
      const formData = new FormData(target)
      for (const entry of formData.entries()) {
        const [ field, value ] = entry
        if (!value) {
          this.invalidFields.push(field)
        }
      }
    }
  },
  computed: {
    visibleFields() {
      return getTypeOf(this.fields) === 'array' ? this.fields : this.fields[this.currentFieldGroup]
    }
  },
  mounted() {
    if (getTypeOf(this.fields) === 'object') {
      Object.keys(this.fields).forEach(fieldGroupId => {
        this.fields[fieldGroupId].forEach(field => {
          this.$set(this.formValues, field.id, '')
        })
      })
    } else {
      /* Respectively, array */
      this.fields.forEach(field => {
        this.$set(this.formValues, field.id, '')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./VForm";
</style>
