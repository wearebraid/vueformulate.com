# Customizing classes

<ArticleCard
  href="https://dev.to/justinschroeder/tailwind-vue-formulate-24k1"
  badge="Article"
  headline="Using Tailwind with Vue Formulate 2.4"
  copy="Using the newly customizable classes in Vue Formulate, learn how to leverage the Tailwind CSS utility framework to quickly add custom styling to your forms."
  :sidebar="true"
/>

There are 4 ways to change the classes applied to DOM elements inside a
`FormulateInput`:

1. Use props on a `FormulateInput`.
2. Globally via the `classes` option.
3. Globally via the `baseClasses` option.
3. Manually override the DOM using [slots](/guide/inputs/slots/).

In the first two cases, you can use a `string`, `array`, or `function` to define
which classes should be applied to a given element (e.g., `label`) in a given
state (e.g., field has validation errors). Each element and state is identified
by [class key](#class-keys).

## Changing classes with props

Changing classes on a given input is easy. Simply target the [class key](#class-keys)
you’d like to change with a prop named `[element class key]-class`. To target a
state use `[element class key]-[state class key]-class`.

### Strings (to replace base classes)
Use `string` values in your class prop to **replace** any base classes.

```vue
<FormulateInput
  label="The label is using its own class"
  label-class="my-label-class"
/>
<!-- <label class="my-label-class"> -->
```

### Arrays (to append to base classes)
To **append** classes to the base classes, use an `array` in your class prop.

```vue
<FormulateInput
  label="The input wrapping div is using its own class"
  :wrapper-class="['my-wrapper-class']"
/>
<!-- <div class="formulate-input-wrapper my-wrapper-class" /> -->
```

### Functions
For fine grained control you can use a `function`. The function will
receive 2 arguments, a [class context object](#class-context) and an array
of base classes generated using the global options.

```vue
<FormulateInput
  label="The element div is using its own class"
  :element-class="(context, classes) => ['my-element-class'].concat(classes)"
/>
<!-- <div class="my-element-class formulate-input-element formulate-input-element--text" /> -->
```


## Changing classes globally

To globally update which classes are applied to _every_ `FormulateInput` by default
you can update the `classes` option with an `object` of [class keys](#class-keys).

Similar to modifying classes with props the values in the `classes` option can
be a `string`, `array`, or `function`. Strings _overwrite_ any base classes,
arrays _are appended_ to the base classes, and functions allow for fine grained
control and can accept a `context` and `baseClasses` arguments respectively.

### String
```js
import Vue from 'vue'
import VueFormulate from 'vue-formulate'

Vue.use(VueFormulate, {
  classes: {
    outer: 'mytheme-wrapper',
  }
})
// All <FormulateInput> will output:
// <div class="mytheme-wrapper">...
```

### Array
```js
...
Vue.use(VueFormulate, {
  classes: {
    outer: ['mytheme-wrapper'],
  }
})
// All <FormulateInput> will output:
// <div class="formulate-input mytheme-wrapper">...
```

### Function
```js
...
Vue.use(VueFormulate, {
  classes: {
    outer: (context, classes) => {
      return classes.concat([
        'mytheme-wrapper',
        `mytheme-wrapper--${context.type}`
      ])
    },
  }
})
// All <FormulateInput> will output:
// <div class="formulate-input mytheme-wrapper mytheme-wrapper--[type]">...
```

## A custom `baseClasses` function

For advanced use cases, you can also choose to override the base classes
by setting `options.baseClasses` to your own function. This function will be
applied to every [class key](#class-keys) on every `<FormulateInput>`. For
example, if you wanted to perform a reset of all classes in Vue Formulate you
could return an empty array:

```js
Vue.use(VueFormulate, {
  baseClasses: (baseClasses, context) => []
})
```

## Class keys

Manipulating classes on DOM elements requires targeting _which_ element you want
to add/remove classes on. To allow for precise class targeting, every DOM element
is assigned an “element key” which can be used to [customize classes](#customizing-classes).

In addition to “element keys”, Vue Formulate also includes
“state keys” that are used to describe a specific state of the input. For
example `hasErrors` is the state key for an input that is currently
displaying an error. Classes defined with “state keys” are _additive_,
they do not replace any base classes.

### Element keys

#### For inputs

Key             | Default                          | Description
----------------|----------------------------------|---------------------------------------------------
`outer`         | `.formulate-input`               | The outermost div wrapper.
`wrapper`       | `.formulate-input-wrapper`       | A wrapper around the label + interior element.
`label`         | `.formulate-input-label`<br>`.formulate-input-label--[position]` | The label wrapper and its position (before/after).
`element`       | `.formulate-input-element`<br>`.formulate-input-element--[type]` | The wrapper around the actual `<input>` element(s).
`input`         | n/a                              | Applied directly to the input DOM element. Not used by default to allow for more flexible cascading.
`help`          | `.formulate-input-help`<br>`.formulate-input-help--[position]` | Wrapper around the help text.
`errors`        | `.formulate-input-errors`        | Wrapper around the list of errors.
`error`         | `.formulate-input-error`         | Wrapper around a single error message.

![Chart of element class keys](./class-keys.svg)

Some input types have additional class keys that are detailed on their own
pages:

- [Boxes](/guide/inputs/types/box/#custom-class-keys)
- [Sliders](/guide/inputs/types/sliders/#custom-class-keys)
- [Files](/guide/inputs/types/file/#custom-class-keys)
- [Groups](/guide/inputs/types/group/#custom-class-keys)

#### For Forms

Key             | Default                          | Description
----------------|----------------------------------|---------------------------------------------------
`form`          | `.formulate-form`                | The `form` element of a `FormulateForm`.
`form-errors`   | `.formulate-form-errors`         | The list (`ul`) of the `FormulateErrors` component.
`form-error`    | `.formulate-form-error`          | A list item (`li`) of the `FormulateErrors` component.

:::warning Important
When using props to change classes for form errors, the props must be placed on the
`FormulateForm` component. Never use class keys directly on the `FormulateErrors`
component.
:::

#### Globally

To define a form key globally, be sure to use camel-case:

```js
Vue.use(VueFormulate, {
  classes: {
    formErrors: 'form-errors'
  }
})
```

### State keys

State keys make it easy to add a class for a given input state like when a field
has a value. **State keys must always be combined with an element key.**

Key             | Description
----------------|---------------------------------------------------------------
`hasErrors`     | For inputs, when the input is visibly _showing_ errors (if the `error-behavior` is not `live` this will be `false` until the errors are shown). For forms, `hasErrors` is true if any of it’s inputs are not valid irregardless of their visibility.
`hasValue`      | The input has a value.
`isValid`       | The input has _no errors_ regardless of the visibility.

:::tip Note
You can achieve the same result as a state key by using a function for an
element key and appending some values based on state provided in the `context`.
These state keys are a helpful shortcut to the same result.
:::

#### Globally

To define a state key globally, combine it camel-case style with an element key.

```js
Vue.use(VueFormulate, {
  classes: {
    labelHasValue: 'has-value'
  }
})
```

#### Via props

To use a state class key via props, you combine it with a element key (kebab
case) `[element key]-[state-key]-class`. For example, to add a check mark to the
label of a field that is valid:

```vue
<FormulateInput
  label="Social Security Number"
  placeholder="xxx-xx-xxx"
  help="Please enter your social security number: XXX-XX-XXXX"
  value="332-22-9982"
  :validation="[
    ['required'],
    ['matches', /^\d{3}\-\d{2}\-\d{4}$/]
  ]"
  label-is-valid-class="my-valid-class"
/>
```

<demo-state-class-key />

## Class context

Global class functions and prop class functions both receive a “class context”
with the following values:

#### For inputs

Property          | Description
------------------|----------------------------------------------------------------
`attrs`           | Attributes that are applied to the input (ex. `disabled`)
`classification`  | The classification of the input (`text`, `group`, `select`, etc.)
`hasErrors`       | `Boolean` indicating _visible_ errors.
`hasValue`        | `Boolean` whether or not the field has a value.
`helpPosition`    | `String` describing the position of the help text. `before` or `after`.
`isValid`         | `Boolean` indicating if the field is error free, regardless of error visibility.
`labelPosition`   | `String` describing the position of the label. `before` or `after`.
`type`            | The `type` of input.
`value`           | The value of the input.

#### For forms

Property          | Description
------------------|----------------------------------------------------------------
`attrs`           | Attributes that are applied to the form
`classification`  | Always `form`
`errors`          | Form errors from error handling or `invalid-message` prop.
`hasErrors`       | `Boolean` indicating not all fields are valid (does _not_ account for visibility like the input’s class context).
`isLoading`       | The loading state of the form (set with a `Promise` from the `@submit` handler)
`isValid`         | Inverse of `hasErrors`.
`type`            | Always `form`.
`value`           | The value of the form model
