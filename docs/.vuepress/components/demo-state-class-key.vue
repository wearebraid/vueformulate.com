<template>
  <FormulateInput
    label="Social Security Number"
    placeholder="xxx-xx-xxx"
    help="Please enter your social security number: XXX-XX-XXXX"
    value="332-22-9982"
    :validation="[
      ['required'],
      ['matches', /^\d{3}\-\d{2}\-\d{4}$/]
    ]"
    label-is-valid-class="my-valid-class"
  />
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.formulate-input {
  &::v-deep {
    label.my-valid-class {
      color: green;

      &::after {
        content: ' ✓'
      }
    }
  }
}
</style>
