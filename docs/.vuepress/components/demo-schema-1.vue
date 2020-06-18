<template>
  <FormulateForm
    v-model="values"
    :schema="schema"
  />
</template>

<script>
export default {
  data () {
    return {
      values: {},
      schema: [
        {
          type: 'password',
          name: 'password',
          label: 'Enter a new password',
          validation: 'required'
        },
        {
          type: 'password',
          name: 'password_confirm',
          label: 'Confirm your password',
          validation: '^required|confirm:password',
          validationName: 'Password confirmation'
        },
        {
          type: 'submit',
          label: 'Change password'
        }
      ]
    }
  }
}
</script>
