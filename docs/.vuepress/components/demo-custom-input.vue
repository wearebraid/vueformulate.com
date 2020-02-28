<template>
  <FormulateInput
    type="autocomplete"
    name="user"
    label="Who is going to the party?"
    placeholder="Jane, Bob..."
    autocomplete="new-password"
    :options="[
      { value: 1, label: 'Jon Doe'},
      { value: 2, label: 'Jane Roe'},
      { value: 3, label: 'Bob Foe'},
      { value: 4, label: 'Ben Cho'}
    ]"
  />
</template>

<script>
export default {

}
</script>

<style>

</style>
