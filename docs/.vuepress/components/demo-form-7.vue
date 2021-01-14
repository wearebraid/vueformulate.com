<template>
  <FormulateForm
    #default="{ hasErrors }"
  >
    <FormulateInput
      type="email"
      name="email"
      label="Please enter a superhero email address"
      validation="required|email"
      error-behavior="live"
    />
    <FormulateInput
      type="checkbox"
      label="Select some of your favorite superheros"
      name="superheros"
      validation="required|min:2"
      :options="{
        batman: 'Batman',
        blackpanther: 'Black Panther',
        captainamerica: 'Captain America',
        catwoman: 'Catwoman',
        hulk: 'Hulk',
        superman: 'Superman',
        wonderwoman: 'Wonder woman'

      }"
      error-behavior="live"
    />
    <FormulateInput
      type="submit"
      :disabled="hasErrors"
    />
  </FormulateForm>
</template>

<script>
export default {

}
</script>

<style>

</style>
