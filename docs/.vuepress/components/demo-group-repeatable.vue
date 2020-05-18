<template>
  <div class="form-wrapper">
    <FormulateForm
      v-model="formData"
    >
      <FormulateInput
        type="group"
        name="attendees"
        :repeatable="true"
        label="Who is going to attend?"
        add-label="+ Add Attendee"
        validation="required"
      >
        <div class="attendee">
          <FormulateInput
            name="name"
            validation="required"
            label="Attendee’s name"
          />
          <FormulateInput
            type="email"
            name="email"
            validation="required|email"
            label="Attendee’s email"
          />
          <strong class="price" v-text="`$100`" />
        </div>
      </FormulateInput>
      <FormulateInput
        type="radio"
        label="Select your payment method"
        name="payment"
        :options="{paypal: 'PayPal', credit: 'Credit Card'}"
      />
      <strong>Total: {{ total }}</strong>
      <FormulateInput
        type="submit"
        label="Purchase tickets"
      />
    </FormulateForm>
    <code class="code code--block">{{ formData }}</code>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {}
    }
  },
  computed: {
    total () {
      const count = Array.isArray(this.formData.attendees) ? this.formData.attendees.length : 1
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(count * 100)
    }
  }
}
</script>

<style scoped>
.form-wrapper {
  padding: 2em;
  border: 1px solid #a8a8a8;
  border-radius: .5em;
  box-sizing: border-box;
}
@media (min-width: 650px) {
  .attendee {
    display: flex;
  }
}

@media (min-width: 720px) {
  .attendee {
    display: block;
  }
}

@media (min-width: 850px) {
  .attendee {
    display: flex;
  }
  .attendee .formulate-input {
    margin-right: 1.5em;
  }
}
.attendee .formulate-input {
  margin-right: 2em;
  margin-bottom: 0;
}

strong {
  display: block;
  margin: 1em 0;
}

strong.price {
  margin-top: 1.25em;
  margin-bottom: 0;
  height: 2.5em;
  display: inline-flex;
  align-items: center;
}

code {
  margin-top: 2em;
}

</style>
