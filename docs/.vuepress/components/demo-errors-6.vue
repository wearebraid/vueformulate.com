<template>
  <FormulateForm
    class="order-form"
    name="order"
    @submit="order"
  >
    <FormulateInput
      type="text"
      name="st_address"
      label="Street Address"
    />
    <FormulateInput
      type="text"
      name="city"
      label="City"
    />
    <FormulateErrors />
    <FormulateInput
      type="submit"
      label="Submit Order"
    />
  </FormulateForm>
</template>

<script>
export default {
  methods: {
    order () {
      this.$formulate.handle({
        inputErrors: { st_address: 'This address doesn’t appear valid' },
        formErrors: ['Also, this form isn’t hooked up yet']
      }, 'order')
    }
  }
}
</script>
