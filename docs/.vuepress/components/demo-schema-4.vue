<template>
  <FormulateForm
    :schema="schema"
    @blur="handleBlur"
  />
</template>

<script>
export default {
  data () {
    return {
      schema: [
        {
          "type": "text",
          "name": "username",
          "placeholder": "Blur me!",
          "@blur": true
        }
      ]
    }
  },
  methods: {
    handleBlur () {
      alert('Blur event was detected!')
    }
  }
}
</script>
