# Forms

While you’re free to use `FormulateInput` elements as stand-alone elements, it’s
often useful to group them into more traditional forms. Doing this is
as simple as wrapping your `FormulateInput` fields in a `FormulateForm`
component.

The `FormulateForm` will actively collect all the values from the
`FormulateInput` fields it is wrapping, and use the `name` prop of each as the
property name in the object. You can read and write to form values using
`v-model` just as you would on an input. Let’s make a registration form as an
example:

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

## Setting initial values

To re-populate an entire form of data, you can simply set the `v-model`
attribute of the form. This makes it trivial to create update forms.

```vue
<template>
  <FormulateForm
    v-model="formValues"
  >
    <FormulateInput
      type="text"
      name="name"
      label="Your name"
    />
    <FormulateInput
      type="email"
      name="email"
      label="Your email"
    />
    <FormulateInput
      type="submit"
      label="Save account"
    />
  </FormulateForm>
</template>

<script>
export default {
  data () {
    return {
      formValues: {
        name: 'Jenny Taylor',
        email: 'jenny.taylor@example.com'
      }
    }
  }
}
</script>
```

<demo-form-repopulate />

## Submitting forms

While it’s easy to use `v-model` to get and set form values, the `@submit` event
is the preferred way to retrieve the final values from a form for processing or
submitting to a backend. There are a number of reasons for this:

- The `@submit` event will not fire until all validation rules (including async validation rules) are passing.
- Data emitted in the `@submit` event is deeply cloned and can be safely mutated without side effects.
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

Notice how the above form does not trigger the alert dialog until the fields it
contains pass validation. Neat-o.

:::tip Note
Because validation rules are asynchronous, and [file uploads](/guide/inputs/file),
will wait to resolve the `@submit` event is also asynchronous relative to when
the form was submitted.
:::

## Advanced uses

There are times where you may not want to opt-in to the default behavior of the
`@submit` event, and would rather be notified synchronously on every attempt to
submit a form. For these edge cases, you can bind to the `@submit-raw` event.

This event is triggered on all submission attempts, and it’s up to you to
determine how you want to handle it. The payload of the event is a
[`FormSubmission` instance](https://github.com/wearebraid/vue-formulate/blob/master/src/FormSubmission.js).

## Generating Forms

Because Vue Formulate uses a single input component, you can easily generate
an entire form from a JSON string.

```js
[
  {
    type: 'text',
    name: 'name',
    label: 'What is your name?',
    placeholder: 'Your name...',
    validation: 'required'
  },
  {
    type: 'text',
    name: 'address',
    label: 'What is your street address?',
    placeholder: 'Your name...',
    help: 'Where would you like your product shipped?',
    validation: 'required'
  },
  {
    type: 'radio',
    name: 'method',
    label: 'What shipping method would you like?',
    options: [
      { value: 'fedex_overnight', id: 'fedex_overnight', label: 'FedEx overnight' },
      { value: 'fedex_ground', id: 'fedex_ground', label: 'FedEx ground' },
      { value: 'usps', id: 'usps', label: 'US Postal Service' }
    ],
    value: 'fedex_ground',
    'validation-name': 'Shipping method',
    validation: 'required'
  },
  {
    name: 'submit',
    type: 'submit',
    label: 'Submit order'
  }
]
```

The above JSON can then be fed into a `<FormulateInput>` using a `v-for` and
`v-bind` to generate a form.

```vue
<FormulateForm>
  <FormulateInput
    v-for="input in inputs"
    :key="input.name"
    v-bind="input"
  />
</FormulateForm>
```

**Outputs**

<demo-generated />

:::warning Warning
When generating forms with `options` each option must include it’s own `id`.
:::
