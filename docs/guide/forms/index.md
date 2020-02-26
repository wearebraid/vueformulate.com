# Forms

While you’re free to use `FormulateInput` elements as stand alone elements, it’s
often useful to group them together into more traditional forms. Doing this is
as simple as wrapping your `FormulateInput` fields in a `FormulateForm`
component.

The `FormulateForm` will actively collect all the values from the
`FormulateInput` fields it is wrapping, and use the `name` prop of each as the
property name in the object. Let’s make a registration form as an example:

<demo-form-2 />

::: details View source code
```vue
<template>
  <FormulateForm
    class="login-form"
    v-model="formValues"
  >
    <h2 class="form-title">Register</h2>
    <p>
      You can place any elements you want inside a form. The inputs themselves
      can even be deeply nested.
    </p>
    <FormulateInput
      name="name"
      type="text"
      label="Your name"
      placeholder="Your name"
      validation="required"
    />
    <FormulateInput
      name="email"
      type="email"
      label="Email address"
      placeholder="Email address"
      validation="required|email"
    />
    <div class="double-wide">
      <FormulateInput
        name="password"
        type="password"
        label="Password"
        placeholder="Your password"
        validation="required"
      />
      <FormulateInput
        name="password_confirm"
        type="password"
        label="Confirm your password"
        placeholder="Confirm password"
        validation="required|confirm"
        validation-name="Confirmation"
      />
    </div>
    <FormulateInput
      type="submit"
      label="Register"
    />
    </div>
    <pre
      class="code"
      v-text="formValues"
    />
  </FormulateForm>
</template>

<script>
export default {
  data () {
    return {
      formValues: {}
    }
  }
}
</script>

<style scoped>
.login-form {
  padding: 2em;
  border: 1px solid #a8a8a8;
  border-radius: .5em;
  max-width: 500px;
  box-sizing: border-box;
}
.form-title {
  margin-top: 0;
}
.login-form::v-deep .formulate-input .formulate-input-element {
  max-width: none;
}
@media (min-width: 420px) {
  .double-wide {
    display: flex;
  }
  .double-wide .formulate-input {
    flex-grow: 1;
    width: calc(50% - .5em);
  }
  .double-wide .formulate-input:first-child {
    margin-right: .5em;
  }
  .double-wide .formulate-input:last-child {
    margin-left: .5em;
  }
}
</style>
```
:::

## Submitting forms

While it’s easy to use `v-bind` to get and set form values the `@submit` event
is the preferred way to retrieve the final values from a form for processing or
submitting to a backend. There are a number of reasons for this:

- The `@submit` event will not fire until all validation rules (including async validation rules) are passing.
- Data emitted in the `@submit` event is deeply cloned and can be safely mutated without side effect.
- The `@submit` event ensures all form uploads are finished before completing.

You can listen for the `@submit` event just as you would on a standard `<form>`
element:

```vue
<template>
  <FormulateForm
    @submit="submitHandler"
  >
    <FormulateInput
      label="What is your name?"
      name="name"
      help="Please enter your name"
      validation="required"
    />
    <FormulateInput
      type="submit"
      label="Submit this form"
    />
  </FormulateForm>
</template>

<script>
export default {
  methods: {
    submitHandler (data) {
      alert(`Thank you, ${data.name}`)
    }
  }
}
</script>
```

**Outputs:**

<demo-form-3 />
