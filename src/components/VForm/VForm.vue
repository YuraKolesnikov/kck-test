<template>
  <form
    class="v-form"
    @submit.prevent="onSubmit">
    <fieldset
      class="v-fieldset"
      :class="{
        'v-fieldset--block': field.block
      }"
      v-for="field in visibleFields"
      :key="`form_field_${field.id}`">
      <template v-if="field.type === 'text' || field.type === 'textarea'">
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
      </template>
      <template v-else>
        <VRadio
          v-for="radio in field.options"
          :key="`radio_${field.id}_${radio.id}`"
          :id="radio.id"
          :name="field.id"
          :value="radio.value"
          :label="radio.label"
          v-model="formValues[field.id]"
        />
      </template>
    </fieldset>
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
    VRadio
  },
  data() {
    return {
      invalidFields: [],
      formValues: {}
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
