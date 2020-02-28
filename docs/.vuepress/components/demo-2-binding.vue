<template>
  <div>
    <FormulateInput
      type="text"
      label="Favorite car brand?"
      validation="not:Toyota"
      validation-name="car brand"
      error-behavior="live"
      v-model="brand"
      autocomplete="no"
    />
    <FormulateInput
      type="radio"
      v-model="brand"
      error-behavior="live"
      validation="in:Toyota,Honda"
      :options="{Toyota: 'I like Toyota', Honda: 'I like Honda' }"
      autocomplete="no"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      brand: 'Honda'
    }
  }
}
</script>
