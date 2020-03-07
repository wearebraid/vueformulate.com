<template>
<FormulateForm
  class="order-form"
  :form-errors="[
    'Sorry, an unexpected error ocurred. Please try again soon.'
  ]"
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
  <FormulateInput
    type="submit"
    label="Submit Order"
  />
</FormulateForm>
</template>

<script>
export default {

}
</script>

<style>
.order-form {
  padding: 1em;
  border: 1px solid #cecece;
  border-radius: 10px;
}
</style>
