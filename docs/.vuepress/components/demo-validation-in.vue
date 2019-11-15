<template>
  <FormulateInput
    type="select"
    :options="{chocolate: 'Chocolate', vanilla: 'Vanilla', strawberry: 'Strawberry'}"
    name="flavor"
    label="Favorite ice cream flavor?"
    placeholder="Select a flavor"
    validation="in:chocolate,vanilla"
    error-behavior="live"
  />
</template>

<script>
export default {

}
</script>

<style>

</style>
