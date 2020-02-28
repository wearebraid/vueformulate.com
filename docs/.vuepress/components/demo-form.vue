<template>
  <div class="double-pane">
    <div class="pane">
    <FormulateForm
      v-model="formValues"
    >
      <FormulateInput
        :name="`name`"
        label="What is your name?"
        validation="required"
        autocomplete="no"
      />
      <FormulateInput
        type="submit"
        label="Sign up"
      />
    </FormulateForm>
    </div>
    <code
      class="pane code"
      v-text="formValues"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      formValues: {}
    }
  }
}
</script>

<style>

</style>
