<template>
  <FormulateForm
    @submit="submitHandler"
    #default="{ isLoading }"
  >
    <FormulateInput
      label="What is your name?"
      name="name"
      help="Please enter your name"
      validation="required"
    />
    <FormulateInput
      type="submit"
      :disabled="isLoading"
      :label="isLoading ? 'Loading...' : 'Submit this form'"
    />
  </FormulateForm>
</template>

<script>
export default {
  methods: {
    submitHandler (data) {
      // Do your long-running backend stuff here...
      return new Promise(resolve => {
        setTimeout(() => {
          alert(`Thank you, ${data.name}`)
          resolve()
        }, 2000)
      })
    }
  }
}
</script>
