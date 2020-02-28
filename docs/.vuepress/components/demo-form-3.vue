<template>
  <FormulateForm
    @submit="submitHandler"
  >
    <FormulateInput
      label="What is your name?"
      name="name"
      help="Please enter your name"
      validation="required"
      autocomplete="no"
    />
    <FormulateInput
      type="submit"
      label="Submit this form"
    />
  </FormulateForm>
</template>

<script>
export default {
  methods: {
    submitHandler (data) {
      alert(`Thank you, ${data.name}`)
    }
  }
}
</script>
