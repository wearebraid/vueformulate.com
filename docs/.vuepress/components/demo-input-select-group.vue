<template>
  <FormulateInput
    label="Select an available meeting time"
    type="select"
    placeholder="Choose a time"
    :option-groups="{
      Morning: {
        10: '10am',
        11: '11am'
      },
      Afternoon: {
        15: '3pm',
        17: '5pm'
      }
    }"
  />
</template>

<script>
export default {

}
</script>
