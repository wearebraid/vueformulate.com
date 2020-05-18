<template>
  <FormulateForm
    class="form-wrapper"
    @submit="handle"
  >
    <FormulateInput
      name="name"
      label="Your name"
      placeholder="Your name"
      validation="required"
    />
    <FormulateInput
      label="Your shipping address"
      type="group"
      validation="address"
      :validation-rules="{ address: addressRule }"
      :validation-messages="{ address: addressMessage }"
    >
      <FormulateInput
        name="street"
        placeholder="Street address"
      />
      <div class="triple">
        <FormulateInput
          name="city"
          placeholder="City"
        />
        <FormulateInput
          type="select"
          name="state"
          :options="{VA: 'VA', PA: 'PA', WA: 'WA'}"
          placeholder="State"
        />
        <FormulateInput
          name="zip"
          placeholder="Zip"
        />
      </div>
    </FormulateInput>
    <FormulateInput
      type="submit"
    />
  </FormulateForm>
</template>

<script>
export default {
  methods: {
    addressRule ({ value }) {
      if (Array.isArray(value)) {
        const [address] = value
        return address.street && address.city && address.state && address.zip
      }
      return false
    },
    addressMessage ({ value }) {
      if (Array.isArray(value)) {
        const [address] = value
        const missing = ['street', 'city', 'state', 'zip'].reduce((missing, field) => {
          if (!address[field]) {
            missing.push(field)
          }
          return missing
        }, [])
        return `Your shipping address still requires: ${missing.join(', ')}.`
      }
      return 'Please fill out your shipping address.'
    },
    handle () {
      alert('All validation complete, form submitted.')
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
  max-width: 450px;
}


.form-wrapper::v-deep .formulate-input-element {
  max-width: none;
}

@media (min-width: 650px) {
  .triple {
    display: flex;
  }

  .triple .formulate-input {
    margin-bottom: .25em;
    margin-right: 1em;
    flex-grow: 1;
  }

  .triple .formulate-input[data-classification="select"] {
    flex: 0 0 5em;
  }

  .triple .formulate-input:last-child {
    margin-right: 0;
  }
}

@media (min-width: 720px) {
  .triple {
    display: block;
  }

  .triple .formulate-input {
    margin-bottom: 1.5em;
    margin-right: 0;
  }
}

@media (min-width: 850px) {
  .triple {
    display: flex;
  }
  .triple .formulate-input {
    margin-bottom: .25em;
    margin-right: 1em;
  }

  .triple .formulate-input:last-child {
    margin-right: 0;
  }
}

</style>
