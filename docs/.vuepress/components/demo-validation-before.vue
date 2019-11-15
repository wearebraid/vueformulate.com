<template>
<FormulateInput
  type="date"
  label="Select a time before the new year."
  name="date"
  :validation="[['before', newyear]]"
/>
</template>

<script>
export default {
  data () {
    return {
      newyear: '01/01/' + ((new Date()).getFullYear() + 1)
    }
  }
}
</script>

<style>

</style>
