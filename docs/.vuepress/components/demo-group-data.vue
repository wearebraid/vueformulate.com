<template>
  <div class="double-pane">
    <div class="pane">
      <FormulateForm
        v-model="fields"
      >
        <FormulateInput
          type="text"
          name="name"
          label="Your name"
        />
        <FormulateInput
          type="group"
          name="address"
        >
          <FormulateInput
            type="text"
            name="address"
            label="Street address"
          />
          <FormulateInput
            type="text"
            name="city"
            label="City"
          />
          <FormulateInput
            type="select"
            name="state"
            label="State"
            :options="{VA: 'Virginia', CA: 'California', NY: 'New York'}"
          />
        </FormulateInput>
      </FormulateForm>
    </div>
    <code class="code pane">{{ fields }}</code>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fields: {}
    }
  }
}
</script>

<style>

</style>
