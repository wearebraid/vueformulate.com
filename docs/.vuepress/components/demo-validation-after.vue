<template>
<FormulateInput
  type="date"
  label="Select a time after the new year."
  name="date"
  :validation="[['after', newyear]]"
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
