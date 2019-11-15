<template>
  <FormulateInput
    type="checkbox"
    name="toppings"
    :options="{
      pepperoni: 'Pepperoni',
      sausage: 'Sausage',
      olives: 'Olives',
      feta: 'Feta',
      mushrooms: 'Mushrooms',
    }"
    label="Select up to 3 pizza toppings"
    validation="max:3"
    error-behavior="live"
  />
</template>

<script>
export default {

}
</script>

<style>

</style>
