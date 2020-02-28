<template>
  <div>
    <FormulateInput
      label="Change an input type"
      type="radio"
      :options="types"
      v-model="type"
      autocomplete="no"
    />
    <FormulateInput
      label="Favorite B10 football team?"
      :type="type"
      name="team"
      :options="{nebraska: 'Nebraska', ohiost: 'Ohio St.', michigan: 'Michigan'}"
      value="nebraska"
      error-behavior="live"
      validation="required|matches:nebraska"
      validation-name="Team name"
      autocomplete="no"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      type: 'select',
      types: {
        select: 'Select list',
        radio: 'Radio list',
        text: 'Text field',
        textarea: 'Text area',
        checkbox: 'checkbox',
      }
    }
  }
}
</script>
