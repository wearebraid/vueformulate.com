<template>
<FormulateForm
  @submit="showAlert"
>
  <FormulateInput
    type="submit"
    name="Submit this form!"
  />
</FormulateForm>
</template>

<script>
export default {
  methods: {
    showAlert () {
      alert('Form was submitted!')
    }
  }
}
</script>

<style>

</style>
