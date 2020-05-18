<template>
  <div class="double-pane">
    <div class="pane">
      <FormulateInput
        label="Create a new password (without modifier)"
        type="password"
        name="password"
        error-behavior="live"
        validation="required|min:4,length|matches:/[0-9]/"
        :validation-messages="{ matches: 'Passwords require at least one number.' }"
      />
    </div>
    <div class="pane">
      <FormulateInput
        label="Create a new password (with modifier)"
        type="password"
        name="password"
        error-behavior="live"
        validation="^required|min:4,length|matches:/[0-9]/"
        :validation-messages="{ matches: 'Passwords require at least one number.' }"
      />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
