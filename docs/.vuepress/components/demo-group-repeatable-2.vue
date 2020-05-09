<template>
  <FormulateForm>
    <FormulateInput
      type="group"
      label="Add your social media pages"
      :repeatable="true"
      validation-name="social media links"
      validation="min:2,length"
      add-label="+ Social link"
      :value="[{}]"
    >
      <FormulateInput
        label="Social media link"
        validation="required|url"
      />
    </FormulateInput>
    <FormulateInput
      type="submit"
    />
  </FormulateForm>
</template>

<script>
export default {

}
</script>

<style>

</style>
