# Validation
Front-end validation is incredibly important to providing a good user experience
to your users, but it’s often skipped due to the pain involved in configuring it.
Vue Formulate reduces the friction of front-end validation to the point where it's
so simple to set up that there's really no good excuse not to.

```vue
<FormulateInput
  type="text"
  label="What ice cream flavor?"
  help="Note: We're fresh out of strawberries and bananas."
  name="flavor"
  validation="required|not:strawberry,banana"
/>
```

<demo-1-validation />

:::tip Note
By default, validation error messages are not 3wshown until the user’s focus
leaves (technically a `blur` event) the current field. You can change this
behavior by setting the `error-behavior` prop to `live`
:::

#### Syntax

Declaring what validation rules apply to your field is as easy as adding a
`validation` prop to your `FormulateInput` field. Rules can either be a series
of pipe (`|`) separated strings `required|max:10|min:5` or arrays:

```vue
<FormulateInput
  :validation="[
    ['required'],
    ['max', 10],
    ['min', 5]
  ]"
/>
```

## Available rules
Vue Formulate ships with a library of frequently used validation rules. If
you don’t find one that meets your exact requirement you can always add your
own [custom rule](#custom-validation-rules) to suit your needs.

- [accepted](#accepted)
- [after](#after)
- [alpha](#alpha)
- [alphanumeric](#alphanumeric)
- [before](#before)
- [between](#between)
- [confirm](#confirm)
- [date](#date)
- [email](#email)
- [in](#in)
- [matches](#matches)
- [max](#max)
- [mime](#mime)
- [min](#min)
- [not](#not)
- [number](#number)
- [required](#required)
- [url](#url)

### Accepted
The value must be `yes`, `on`, `1` or `true`. Useful for box inputs, often where
you need to validate if someone has accepted terms.

```vue
<FormulateInput
  type="checkbox"
  label="I accept the terms of service?"
  name="terms"
  validation="accepted"
/>
```
<demo-validation-accepted />

### After
Checks if a date comes after a another date. If no date argument is provided
the current time will be used. The value must be a `Date` object or a string
that can be evaluated by `Date.parse`.
[Read more about `Date.parse()` on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)

```vue
<FormulateInput
  type="date"
  label="Select a time after the new year."
  name="date"
  validation="after:01/01/2020"
/>
```
<demo-validation-after />

### Alpha
Checks if a value is only alphabetical characters. There are two character sets
`latin` and `default`. Latin characters are strictly `[a-zA-Z]` while the
`default` set includes most accented characters as well like: `ä`, `ù`, or `ś`.

```vue
<FormulateInput
  type="text"
  label="Enter your desired username"
  name="username"
  validation="alpha:latin"
/>
```
<demo-validation-alpha />

### Alphanumeric
Checks if a value is only made of alphabetical characters or numeric digits.
For the alphabetical portion you can pass `default` or `latin` - see
[alpha](#alpha)) above.

```vue
<FormulateInput
  type="text"
  label="Enter your desired username"
  name="username"
  validation="alphanumeric"
/>
```
<demo-validation-alphanumeric />

### Before
Checks if a date comes before a another date. If no date argument is provided
the current time will be used. The value must be a `Date` object or a string
that can be evaluated by `Date.parse`.
[Read more about `Date.parse()` on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)

```vue
<FormulateInput
  type="date"
  label="Select a time before the new year."
  name="date"
  validation="before:01/01/2020"
/>
```
<demo-validation-before />

### Between
Checks if a number or string length is between a minimum or maximum. Both the
maximum and minimum are exclusive. If the value being validated is a string
the string’s length is used for comparison. If a number is used, the numeric
value is used for comparison.

:::tip Tip
If you’re wanting to find if a date is between two other dates consider using
the [before](#before) and [after](#after) validation rules together.
:::

```vue
<FormulateInput
  type="range"
  min="5"
  max="35"
  name="Age"
  label="How old are you?"
  validation="between:10,18"
  error-behavior="live"
  v-model="age"
/>
{{ age }}
```
<demo-validation-between />

### Confirm

Checks if the field value matches the value of another field. Mostly used for
hidden fields - like password confirmations. By default a `confirm` rule will
look for other fields in the same `FormulateForm` with the suffix `_confirm`.

:::tip Note
This rule only works inside the context of a `<FormulateForm>`.
:::

```vue
<template>
  <FormulateForm
    @submit="submit"
  >
    <FormulateInput
      label="New password"
      type="password"
      name="password"
      validation="required"
    />
    <FormulateInput
      label="Confirm password"
      type="password"
      name="password_confirm"
      validation="required|confirm"
      validation-name="Password confirmation"
    />
    <FormulateInput
      type="submit"
      label="Change password"
    />
  </FormulateForm>
</template>

<script>
export default {
  methods: {
    submit () {
      alert('passed validation')
    }
  }
}
</script>
```

<demo-validation-confirm />

### Date
Checks if the input is a valid date according to `Date.parse()` or if a format
argument is provided it will validate according to the given format. Format
variables are:

Variable  | Valid values
----------|---------------------------------
`MM`      | Two digit month representation (01-12)
`M`       | Single digit month representation (1-12) leading zero allowed
`DD`      | Two digit day of the month (01-31)
`D`       | Single digit day of the month (1-31), leading zero allowed
`YY`      | Two digit year
`YYYY`    | Four digit year

::: warning
Heads up! This validation rule will validate that your requested format is followed
but does not validate if a date actually exists (eg 02/31/2008).
:::

```vue
<FormulateInput
  type="text"
  name="date"
  label="Enter your birthday"
  validation="date:MM/DD/YYYY"
/>
```
<demo-validation-date />

### Email
Checks if the input is a valid email address format.

```vue
<FormulateInput
  type="email"
  name="email"
  label="Enter your email address"
  validation="email"
/>
```
<demo-validation-email />

### In
Checks if the input is included in an array of options.

```vue
<FormulateInput
  type="select"
  :options="{chocolate: 'Chocolate', vanilla: 'Vanilla', strawberry: 'Strawberry'}"
  name="flavor"
  label="Favorite ice cream flavor?"
  placeholder="Select a flavor"
  validation="in:chocolate,vanilla"
  error-behavior="live"
/>
```
<demo-validation-in />

### Matches
Checks if the input matches a particular value or pattern. If you pass multiple
arguments, it checks each until a match is found.

::: warning
When matching against a regular expression you have to use the alternative
`array` style validation rule syntax `:validation="[['matches', /^(apple|banana)$/]]`
:::

```vue
<FormulateInput
  type="text"
  name="color"
  placeholder="#00ff00"
  label="Enter a hexidecimal color value"
  :validation="[['matches', /^#[a-fA-F0-9]{6}$/]]"
  error-behavior="live"
  v-model="color"
/>
<FormulateInput
  type="color"
  label="Or pick one"
  v-model="color"
/>
```
<demo-validation-matches />

```vue
<FormulateInput
  type="text"
  name="language"
  placeholder="node, php, java..."
  label="What is your favorite server side language?"
  validation="matches:node,php,java"
  error-behavior="live"
  v-model="color"
/>
```
<demo-validation-matches-2 />

### Max
Checks the value of a `Number`, or length of a `String` or `Array` is less than
a maximum length or value. The maximum value/length defaults to `10`.

You can force the validator to evaluate length or value by passing a second
argument of either `length` or `value`.

```vue
<FormulateInput
  type="text"
  name="coupon"
  label="Enter a coupon code"
  validation="max:5,length"
  error-behavior="live"
/>
```
<demo-validation-max />

```vue
<FormulateInput
  type="checkbox"
  name="toppings"
  :options="{
    pepperoni: 'Pepperoni',
    sausage: 'Sausage',
    olives: 'Olives',
    feta: 'Feta',
    mushrooms: 'Mushrooms',
  }"
  label="Select up to 3 pizza toppings"
  validation="max:3"
  error-behavior="live"
/>
```

::: tip Note
When evaluating an `Array` the 2nd argument (length/value) is ignored.
:::

<demo-validation-max-2 />

### Mime
Checks if the type of file selected is an allowed value. This validator uses the
file’s extension to determine the [mime type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types).
Back-end validation of the file’s content is still strongly encouraged as front-end
validation can be bypassed by savvy users.

```vue
<FormulateInput
  type="file"
  name="image"
  label="Please select an image"
  validation="mime:image/jpeg,image/png"
/>
```
<demo-validation-mime />

::: tip Note
When validating a field with the `multiple` attribute selected, validation will
fail if any of the selected files are not the proper mime.
:::

### Min
Checks the value of a `Number`, or length of a `String` or `Array` is more than
a maximum length or value. The minimum value/length defaults to `1`.

You can force the validator to evaluate length or value by passing a second
argument of either `length` or `value`.

```vue
<FormulateInput
  type="text"
  name="code"
  label="Enter your SSN"
  validation="min:9,length"
  validation-name="Social security code"
  error-behavior="live"
/>
```
<demo-validation-min />

### Not
Checks to ensure the input data does not match a set of predefined values.

```vue
<FormulateInput
  type="text"
  name="framework"
  label="What is your favorite javascript framework?"
  validation="not:jquery,ember,mootools"
  error-behavior="live"
/>
```
<demo-validation-not />

### Number
Checks if the input is a valid number as evaluated by `isNaN()`.

```vue
<FormulateInput
  type="text"
  name="age"
  label="How old are you?"
  validation="number"
  error-behavior="live"
/>
```
<demo-validation-number />

### Required
Checks if the input is empty.

```vue
<FormulateInput
  type="text"
  name="city"
  label="What city do you live in?"
  validation="required"
  error-behavior="live"
/>
```
<demo-validation-required />

::: warning Important
By default fields are not required meaning that all validation rules will all
pass with an empty value unless they include the `required` rule.
:::

### Url
Checks if the input value is appears to be a properly formatted url including
the protocol. This does not check if the URL is actually resolves.

```vue
<FormulateInput
  type="url"
  name="url"
  label="What is your website?"
  validation="url"
  error-behavior="live"
/>
```
<demo-validation-url />

## Customize validation messages

There are a number of ways to customize your validation message. The most basic
of which is to use the `validation-name` prop — allowing you to change the name
of the field as used in the pre-defined validation messages.

If you need to be more specific you have two options:

- Override a rule’s message function on an individual `FormulateInput`
- Globally override a validation rule’s message function

### Custom field-level messages

#### Using strings
To override a validation message on a single `FormualteInput`, add the
`validation-messages` prop with an object of rule names and a corresponding
message.

```vue
<FormulateInput
  type="select"
  label="What nationality’s food is the best?"
  name="food"
  :options="{
    french: 'French',
    italian: 'Italian',
    german: 'German',
    indian: 'Indian'
  }"
  placeholder="Select a food type"
  validation="required|in:italian,indian"
  error-behavior="live"
  :validation-messages="{
    required: 'Please pick your favorite food',
    in: 'Oh, that food isn’t very good...'
  }"
/>
```

<demo-custom-validation-field />

#### Using functions

If you need more power for your validation rules, you can use a function instead
of a string. The function is passed a context object.

#### Validation message context object:

Property   | Description
-----------|----------------------------------------
args       | An array of arguments from rule definition. For example `['italian', 'indian']` in the rule definition `in:italian,indian`
name       | The name of the field (cascades to `validation-name || name || label`)
value      | The current value of the field
formValues | If inside the context of a `FormulateForm` this object will contain the values of the other fields (by name)

Let’s re-write the above example using a function instead of a string.

```vue
<FormulateForm
  ...
  :validation-messages="{
    required: 'Please pick your favorite food',
    in: ({ value }) => `Oh, ${value} food isn’t very good...`
  }"
/>
```

<demo-custom-validation-field-2 />

### Globally add/edit validation rule message

If there are validation rule messages you'd like to override across your entire
project, you can define those message rules when registering Vue Formulate under
the language key you'd like to override.

```js
import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'

Vue.use(VueFormulate, {
  locales: {
    en: {
      required ({ name }) {
        return `Please fill out the ${name} field.`
      }
    }
  }
})
```

:::tip About localization
Currently Vue Formulate only supports the english language, but that’s only
because the maintainers only speak english. If you’re able translate to another
language, please [submit a pull request](https://github.com/wearebraid/vue-formulate)!
:::

## Custom validation rules

Like with validation messages, rules can be added globally or per-field. Rules
are just simple functions that are passed a context object and rule arguments
and expected to return or resolve a `boolean`.

#### Validation Rule Context Object:

Property      | Description
--------------|-----------------
value         | The value of the field
getFormValues | When the input is in the context of a `FormulateForm` you can retrieve an object of form values by using this function
name          | The name of the field being evaluated

In addition to the context object, any rule arguments are passed as additional
arguments. For example:

```vue
// Given this validation string
<FormulateInput
  validation="myRule:first,second,third"
/>
```
```js
// A rule named "myRule" will be called with the following:
function myRule (context, ...args) {
  // args now contains an array ['first', 'second', 'third']
}
```

### Field-level custom validation rules

```vue
<FormulateInput
  validation="required|foobar"
  :validation-rules="{
    foobar: ({ value }) => ['foo', 'bar'].includes(value)
  }"
  :validation-messages="{
    foobar: 'The value must be foo or bar'
  }"
/>
```

<demo-custom-validation />

:::tip Asynchronous validation
Asynchronous validation rules are completely valid, but [keep in mind](/guide/forms/#submitting-forms)
that forms will wait to trigger their `@submit` handler until all validation
rules have resolved `true`, so try to keep them as snappy as possible.

Internally, Vue Formulate does not debounce validation rules, so if you need to
perform an expensive asynchronous validation (like an http request) it is
recommended that you debounce your validation rule.
:::

### Global custom validation rules

Global validation rules can be added when Vue Formulate is registered with Vue.

```js
import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'

Vue.use(VueFormulate, {
  rules: {
    foobar: ({ value }) => ['foo', 'bar'].includes(value)
  }
})
```
