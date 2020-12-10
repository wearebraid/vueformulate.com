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

To re-populate an entire form of data, you can set the `values` prop of the
form. This makes it easy to create “update” forms like account pages:

```vue
<template>
  <FormulateForm
    values="formValues"
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

## Model binding

In the above example, `formValues` is used to initially set the field values,
but then it is never changed after that. Often it’s helpful to use the values of
the form reactively. To do this use `v-model` instead of `values` to
bi-directionally bind to the form values — if you change the values of that
object, the form fields will update and if you type into one of the text fields
the object will update!

```vue
  <FormulateForm
    v-model="formValues"
  >
    ...
  </FormulateForm>
```

## Conditional fields

To make fields conditional use simple Vue directives such as `v-if`.

```vue
<FormulateForm v-model="values">
  <FormulateInput
    type="select"
    name="planet"
    label="What is your favorite rocky planet?"
    :options="{ mercury: 'Mercury', venus: 'Venus', earth: 'Earth', mars: 'Mars' }"
  />
  <FormulateInput
    v-if="values.planet === 'earth'"
    key="earth"
    name="earth_moon"
    label="What is the name of earth’s moon?"
  />
  <FormulateInput
    v-if="values.planet === 'mars'"
    key="mars"
    name="mars_sunset"
    label="What color is the Martian sunset?"
  />
</FormulateForm>
```
<demo-form-4 />

:::warning Conditional fields and keys
Due to the way Vue patches the DOM, it is generally a best practice to put
a `key` on each `FormulateInput` that can be dynamically swapped out. This ensures that
Vue does not re-use the DOM element when patching. For more information read the
about [reusing elements in the Vue Docs](https://vuejs.org/v2/guide/conditional.html#Controlling-Reusable-Elements-with-key).
:::

#### Preserving conditional values

Did you notice in the example above that values were removed from the form's
data when the corresponding `FormulateInput` was removed? If you need to keep
those values in the form data set the `keep-model-data` prop to `true`. If you
only want one or two fields to keep their data you can set the `keep-model-data`
prop directly on `<FormulateInput>` as well.

```vue
<FormulateForm
  v-model="values"
  :keep-model-data="true"
>
  <FormulateInput
    type="select"
    name="planet"
    label="What is your favorite rocky planet?"
    :options="{ mercury: 'Mercury', venus: 'Venus', earth: 'Earth', mars: 'Mars' }"
  />
  <FormulateInput
    v-if="values.planet === 'earth'"
    key="earth"
    name="earth_moon"
    label="What is the name of earth’s moon?"
  />
  <FormulateInput
    v-if="values.planet === 'mars'"
    key="mars"
    name="mars_sunset"
    label="What color is the Martian sunset?"
  />
</FormulateForm>
```
<demo-form-5 />

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
Because validation rules are asynchronous, and [file uploads](/guide/inputs/types/file), will wait to resolve the `@submit` event is also asynchronous relative to when the form was submitted.
:::

### Advanced form submission

There are times where you may not want to opt-in to the default behavior of the
`@submit` event, and would rather be notified synchronously on every attempt to
submit a form. For these edge cases, you can bind to the `@submit-raw` event.

This event is triggered on all submission attempts, and it’s up to you to
determine how you want to handle it. The payload of the event is a
[`FormSubmission` instance](https://github.com/wearebraid/vue-formulate/blob/master/src/FormSubmission.js).

## Named forms

Vue Formulate introduces the concept of "named forms" as a mechanism for
_globally_ accessing and manipulating your forms through the `$formulate` plugin.
To leverage named forms, simply supply a unique `name` prop to any
`<FormulateForm>` component. The names should be unique among any currently
mounted forms. After naming a form, you can easily call a number of named form
methods.

Method                         | Description
-------------------------------|------------------------------------------------
`handle(err, formName)`        | Used to set error messages on a form, typically from a backend server. Read more about [error handling](/guide/forms/error-handling/).
`reset(formName, values)`      | Reset the form's values, validation messages, and error messages.
`resetValidation(formName)`    | Reset all validation and error messages.
`setValues(formName)`          | Set the value of the form's model (even if no `v-model` is defined).
`submit(formName)`             | Used to submit a form programmatically.

:::details View source code
```vue
<template>
  <FormulateForm
    name="login"
    @submit="setSomeErrors"
    v-model="formData"
    class="login-form"
  >
    <h2 class="form-title">Login</h2>
    <FormulateInput
      name="email"
      label="Email"
      validation="required|email"
    />
    <FormulateInput
      name="password"
      label="Password"
      validation="required"
    />
    <FormulateErrors />
    <div class="actions">
      <FormulateInput
        type="submit"
      />
      <FormulateInput
        type="button"
        label="Reset"
        data-ghost
        @click="reset"
      />
    </div>
    <code class="code code--block">{{ formData }}</code>
  </FormulateForm>
</template>

<script>
export default {
  data () {
    return {
      formData: {}
    }
  },
  methods: {
    setSomeErrors () {
      // do some processing...
      const errors = {
        fieldErrors: { username: 'Sorry, no such username exists!' },
        formErrors: ['Incorrect login, please try again.']
      }
      this.$formulate.handle(errors, 'login')
    },
    reset () {
      this.$formulate.reset('login')
    }
  }
}
</script>

<style>
.actions {
  display: flex;
  margin-bottom: 1em;
}
.actions .formulate-input {
  margin-right: 1em;
  margin-bottom: 0;
}
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
</style>
```
:::
<demo-named-form />

