<template>
  <div class="double-pane">
    <div class="pane">
    <FormulateForm
      v-model="formValues"
      @submit="sendData"
    >
      <FormulateInput
        type="text"
        name="name"
        label="Your name"
        autocomplete="new-password"
      />
      <FormulateInput
        type="image"
        name="avatar"
        upload-url="/your/upload/directory"
        label="Your avatar"
        upload-behavior="delayed"
      />
      <FormulateInput
        type="submit"
        label="Save profile"
      />
    </FormulateForm>
    </div>
    <code
      class="pane code"
      v-text="values"
    />
  </div>
</template>

<script>
import { FileUpload } from '@braid/vue-formulate'

export default {
  data () {
    return {
      formValues: {}
    }
  },
  computed: {
    values () {
      const values = {}
      for (const key in this.formValues) {
        if (typeof this.formValues[key] === 'object' && this.formValues[key] instanceof FileUpload) {
          values[key] = this.formValues[key].toString()
        } else {
          values[key] = this.formValues[key]
        }
      }
      return values
    }
  },
  methods: {
    sendData (data) {
    }
  }
}
</script>

<style>

</style>
