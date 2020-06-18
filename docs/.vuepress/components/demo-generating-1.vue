<template>
  <FormulateForm>
    <FormulateInput
      v-for="item in items"
      :key="item.name"
      v-bind="item"
    />
  </FormulateForm>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          name: 'email',
          label: 'Your email',
          validation: 'required|email'
        }
      ]
    }
  }
}
</script>
