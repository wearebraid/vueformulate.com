<template>
  <div class="playground">
    <FormulateForm
      v-model="formValues"
    >
      <FormulateInput
        type="text"
        name="first_name"
        placeholder="Your First Name"
        label="What is first your name?"
        help="What is your first name?"
        v-model="inputValue"
      />
      <button
        @click="formValues.first_name = 'set from button'"
        v-text="`Click me`"
      />
      <button
        @click="inputValue = 'set from other button'"
        v-text="`Click me`"
      />
      <FormulateInput
        type="text"
        placeholder="What is your last name?"
        label="Last Name?"
        help="This is help text"
        name="last_name"
      />
    </FormulateForm>
    {{ formValues }}
  </div>
</template>

<script>
export default {
  name: 'playground',
  data () {
    return {
      formValues: {
        first_name: "Justin",
        last_name: "Schroeder"
      },
      inputValue: 'Initial value'
    }
  }
}
</script>

<style>

</style>
