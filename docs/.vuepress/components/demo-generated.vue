<template>
  <FormulateForm>
    <FormulateInput
      v-for="input in inputs"
      :key="input.name"
      v-bind="input"
      autocomplete="new-password"
    />
  </FormulateForm>
</template>

<script>
export default {
  data () {
    return {
      inputs: [
        {
          type: 'text',
          name: 'name',
          label: 'What is your name?',
          placeholder: 'Your name...',
          validation: 'required'
        },
        {
          type: 'text',
          name: 'address',
          label: 'What is your street address?',
          placeholder: 'Your name...',
          help: 'Where would you like your product shipped?',
          validation: 'required'
        },
        {
          type: 'radio',
          name: 'method',
          label: 'What shipping method would you like?',
          options: [
            { value: 'fedex_overnight', id: 'fedex_overnight', label: 'FedEx overnight' },
            { value: 'fedex_ground', id: 'fedex_ground', label: 'FedEx ground' },
            { value: 'usps', id: 'usps', label: 'US Postal Service' }
          ],
          value: 'fedex_ground',
          'validation-name': 'Shipping method',
          validation: 'required'
        },
        {
          name: 'submit',
          type: 'submit',
          label: 'Submit order'
        }
      ]
    }
  }
}
</script>

<style>

</style>
