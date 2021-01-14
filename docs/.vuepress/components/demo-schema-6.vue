<template>
  <FormulateForm
    :schema='schema'
  />
</template>

<script>
export default {
  data () {
    return {
      schema: [
        {
          label: 'Where would you prefer to live?',
          type: 'select',
          name: 'location',
          options: ['Cleveland', 'Fiji', 'San Francisco',],
          '@change': (e) => e.target.value === 'Fiji' ? alert('🏝') : alert('🤔')
        }
      ]
    }
  }
}
</script>
