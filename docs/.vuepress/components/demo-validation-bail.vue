<template>
  <div class="double-pane">
    <div class="pane">
      <FormulateInput
        label="How many tacos do you want (without bailing)?"
        type="text"
        validation="required|number|between:1,10,value"
        validation-name="Taco quantity"
        error-behavior="live"
      />
    </div>
    <div class="pane">
      <FormulateInput
        label="How many tacos do you want (with bailing)?"
        type="text"
        validation="bail|required|number|between:1,10,value"
        validation-name="Taco quantity"
        error-behavior="live"
      />
    </div>
  </div>
</template>

<script>
export default {

}
</script>
