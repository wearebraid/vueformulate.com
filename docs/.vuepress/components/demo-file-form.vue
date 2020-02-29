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
        autocomplete="no"
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
export default {
  data () {
    return {
      formValues: {},
      submittedValues: false
    }
  },
  computed: {
    values () {
      if (this.submittedValues) {
        return this.submittedValues
      }
      const values = {}
      for (const key in this.formValues) {
        if (typeof this.formValues[key] === 'object') {
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
      this.submittedValues = data
    }
  }
}
</script>

<style>

</style>
