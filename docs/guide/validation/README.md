# Validation
Front-end form validation is integral to providing a good user experience,
but it’s often skipped due to the pain involved in configuring it.
Vue Formulate vastly reduces the friction of front-end validation so
there's no good excuse not to use it.

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

## Declaring rules

Declaring what validation rules is as easy as adding a `validation` prop to
your `FormulateInput` field.


#### String syntax
The simplest way to declare which rules to use on a given input is by providing
a string of rules separated by pipes (`|`). Some rules may accept arguments,
these are defined after a colon `:`. You can use multiple arguments by comma
separating them.

```vue
<FormulateInput
  validation="required|max:10|min:5"
/>
```

#### Array syntax

An alternative to the string syntax is providing an array of rules. Sometimes
it’s necessary to use the array syntax in order to preserve typing or to escape
certain characters, for example when using regular expressions with the
[matches](#matches) rule. Each rule must be defined as an array with the rule
name followed by any arguments.

```vue
<FormulateInput
  :validation="[
    ['required'],
    ['max', 10],
    ['min', 5]
  ]"
/>
```

For the purposes of this documentation pipe-separated strings will be the preferred
method of setting validation rules for fields.

:::tip Note
When using the array syntax, make sure your prop is bound with
`v-bind:validation` or the shorthand `:validation`.
:::

## Showing validation

Validation errors are always computed in realtime, but they are displayed
based on `error-behavior` of the input. The default `error-behavior`
is `blur` — meaning a field with validation errors only shows its errors
when a user removes focus from the input. In most circumstances this
provides the best user experience since it prevents a user from being immediately
bombarded with error messages. Error messages are also always shown when a user
tries to submit a form that has failing validation messages.

In addition to the `blur` behavior, these additional `error-behavior` strategies are supported.

Error Behavior  | Description
----------|---------------------------------------------------------------------
`blur`    | **(Default)** Shown when a user removes focus from an input, and on `@submit`
`submit`  | Only shown on `@submit`
`live`    | Always displayed
`value`   | Shown as soon as the input has a value, on `@submit`, and on `blur`.

## Stopping validation

#### The `bail` rule

To stop validation after encountering an error (to prevent showing
several messages simultaneously) you can add the special rule: `bail`. When the validation
parser encounters the `bail` rule, it remembers to stop validating that input
after encountering any failures in any subsequent rules.

```vue
<FormulateInput
  label="How many tacos do you want?"
  type="text"
  validation="bail|required|number|between:1,10,value"
  validation-name="Taco quantity"
  error-behavior="live"
/>
```
<demo-validation-bail />

### Bail modifier

Often it is desirable to only bail if a specific rule fails. For example, you
may want to only show the `required` error message if a password field is empty,
but when it has a value you would like to show all the failing validation rules. To
do this we can use the `^` modifier on the rule name.

```vue
<FormulateInput
  label="Create a new password (with modifier)"
  type="password"
  name="password"
  error-behavior="live"
  validation="^required|min:4,length|matches:/[0-9]/"
  :validation-messages="{
    matches: 'Passwords require at least one number.'
  }"
/>
```

<demo-validation-modifier />

## Available rules
Vue Formulate ships with a library of frequently used validation rules. If
you don’t find one that meets your exact requirement you can always add your
own [custom rule](#custom-validation-rules) to suit your needs.

- [accepted](#accepted)
- [after](#after)
- [alpha](#alpha)
- [alphanumeric](#alphanumeric)
- [bail](#bail)
- [before](#before)
- [between](#between)
- [confirm](#confirm)
- [date](#date)
- [email](#email)
- [ends_with](#ends-with)
- [in](#in)
- [matches](#matches)
- [max](#max)
- [mime](#mime)
- [min](#min)
- [not](#not)
- [number](#number)
- [optional](#optional)
- [required](#required)
- [starts_with](#starts-with)
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
Checks if a date comes after another date. If no date argument is provided
the current time will be used. The value must be a `Date` object or a string
that can be evaluated by `Date.parse`.
[Read more about `Date.parse()` on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)

<!--
```vue
<FormulateInput
  type="date"
  label="Select a time after the new year."
  name="date"
  validation="after:01/01/2021"
/>
```
-->

<div class="language-vue extra-class"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>FormulateInput</span>
  <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>date<span class="token punctuation">"</span></span>
  <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>Select a time after the new year.<span class="token punctuation">"</span></span>
  <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>date<span class="token punctuation">"</span></span>
  <span class="token attr-name">validation</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>after:01/01/{{ ((new Date()).getFullYear() + 1) }}<span class="token punctuation">"</span></span>
<span class="token punctuation">/&gt;</span></span>
</code></pre></div>

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

### Bail

Used to logically stop validation on the first subsequent validation error.
More detailed documentation on the bail rule is under the [Stopping validation
section](#stopping-validation).

### Before
Checks if a date comes before another date. If no date argument is provided
the current time will be used. The value must be a `Date` object or a string
that can be evaluated by `Date.parse`.
[Read more about `Date.parse()` on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)

<!--
```vue
<FormulateInput
  type="date"
  label="Select a time before the new year."
  name="date"
  validation="before:01/01/2020"
/>
```
-->

<div class="language-vue extra-class"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>FormulateInput</span>
  <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>date<span class="token punctuation">"</span></span>
  <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>Select a time before the new year.<span class="token punctuation">"</span></span>
  <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>date<span class="token punctuation">"</span></span>
  <span class="token attr-name">validation</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>before:01/01/{{ ((new Date()).getFullYear() + 1) }}<span class="token punctuation">"</span></span>
<span class="token punctuation">/&gt;</span></span>
</code></pre></div>

<demo-validation-before />

### Between
Checks if a number or string length is between a minimum or maximum. Both the
maximum and minimum are exclusive. If the value being validated is a string
the string’s length is used for comparison. If a number is used, the numeric
value is used for comparison. In `v2.2.4+` you can force it to always check the
numeric value or string length by setting an optional third argument to `value` or `length`.

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
  validation="between:10,18,value"
  :show-value="true"
  :value="15"
  error-behavior="live"
/>
```
<demo-validation-between />

```vue
<FormulateInput
  type="password"
  name="password"
  label="Pick a new password?"
  validation="between:8,20,length"
  error-behavior="live"
/>
```
<demo-validation-between-length />

### Confirm

Checks if the field value matches the value of another field. Mostly used for
hidden fields - like password confirmations. By default, a `confirm` rule will
look for other fields in the same `FormulateForm` with the suffix `_confirm`.
If you’d like the rule to use a different field as the confirmation, simply pass
the other field name as an argument `confirm:other_field`.

:::tip Note
This rule only works inside the context of a `<FormulateForm>` or a `group` type.
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
Checks if the input is a valid date according to `Date.parse()`, or if a format
argument is provided, it will validate according to the given format. Format
variables are:

Variable  | Valid values
----------|---------------------------------
`MM`      | Two-digit month representation (01-12)
`M`       | Single-digit month representation (1-12) leading zero allowed
`DD`      | Two-digit day of the month (01-31)
`D`       | Single-digit day of the month (1-31), leading zero allowed
`YY`      | Two-digit year
`YYYY`    | Four-digit year

::: warning
Heads up! This validation rule will validate that your requested format is followed
but does not validate if a date exists (eg 02/31/2008).
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

### Ends With
Checks if the input ends with one of the provided options

```vue
<FormulateInput
  type="text"
  name="rhymes"
  label="What rhymes with toad?"
  validation="ends_with:oad,ode"
/>
```

<demo-validation-ends-with />

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

Arguments can also be regular expressions. When using the string syntax, start
and end your argument with a slash `/` (do not escape additional slashes).

```vue
<FormulateInput
  type="password"
  name="password"
  label="Choose a new password"
  validation="matches:/[0-9]/"
  error-behavior="live"
  :validation-messages="{ matches: 'Passwords must include a number.' }"
/>
```
<demo-validation-matches-3 />

When using the [string syntax](#string-syntax) you cannot escape characters used
to define the validation rules themselves (`|,:`). To use these characters in
your regular expressions you must use the alternative [array syntax](#array-syntax).

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

### Max
Checks that the value of a `Number`, or length of a `String` or `Array` is less than
a maximum length or value. The maximum value/length defaults to `10`.

You can force the validator to evaluate either length or value by passing a second
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

::: tip Note
When evaluating an `Array` the second argument (length/value) is ignored.
:::

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

### Optional

Use this rule to make a field optional. When used all validation rules pass
until the field is no longer empty. Its location in the list of validation
rules has no effect.

```vue
<FormulateInput
  label="A gmail address (optional)"
  help="Enter a gmail email address."
  validation="optional|^email|ends_with:gmail.com"
  :validation-messages="{
    ends_with: 'Please use a gmail address.'
  }"
  error-behavior="live"
/>
```
<demo-validation-optional />

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

:::tip A note on whitespace
By default, a whitespace only string (like ` `) is considered a valid input, however an argument can be used to alter this behavior eg:

```vue
<FormulateInput
  type="text"
  name="city"
  label="What city do you live in?"
  validation="required:trim"
  error-behavior="live"
/>
```

<demo-validation-required-trim />

The rule `required:trim` will trim any whitespace in the input before evaluating the validation, as a result, a whitespace only string would not pass the validation. Note: it does not modify the input value.
:::


### Starts With
Checks if the input starts with one of the provided options

```vue
<FormulateInput
  type="text"
  name="hashtag"
  label="What's your favorite hashtag on Twitter?"
  validation="starts_with:#"
/>
```

<demo-validation-starts-with />

### Url
Checks if the input value appears to be a properly formatted URL including
the protocol. This does not check if the URL actually resolves.

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

There are several ways to customize your validation message. The most basic
of which is to use the `validation-name` prop — allowing you to change the name
of the field as used in the pre-defined validation messages.

If you need to be more specific you have three options:

- Override the validation name strategy.
- Override a rule’s message function on an individual `FormulateInput`.
- Globally override a validation rule’s message function.

### Validation name strategy <Badge text="2.5" /> {data-new}

Validation messages frequently include the name of the failing input. For
example, the default `required` rule validation message is simply `${validationName} is required`.
How that `validationName` is determined is up to the global configuration option
`validationNameStrategy`. By default this strategy is:

```js
Vue.use(VueFormulate, {
  validationNameStrategy: ['validationName', 'name', 'label', 'type']
})
```

Meaning, validation messages first check the `validation-name` prop, then the
`name` prop, then the `label`, and finally they fall back to the input `type`.

You can change this validation name strategy by providing your own array in
order of priority. For example, if you'd like inputs to use the `label` instead
of the `name`, change the strategy to:

```js
Vue.use(VueFormulate, {
  validationNameStrategy: ['validationName', 'label', 'name', 'type']
})
```

Finally, if you want to write a more complex strategy, you can provide a
function to your `validationNameStrategy` key. In this case your function
will be passed the full instance of the component.

```js
Vue.use(VueFormulate, {
  validationNameStrategy: (vm) => vm.context.name || vm.id
})
```

### Custom field-level messages

#### Using strings
To override a validation message on a single `FormulateInput`, add the
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
Vue Formulate is international! Check if your [language/locale is supported](/guide/internationalization),
and if it isn’t, [consider contributing](/guide/contributing/).
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
getGroupValues | When the input is in the context of a `group` type you can retrieve an object of the input's local group values by using this function, if the input is not in a group, this function falls back to `getFormValues`.
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

:::tip Validation Rule Names
When using custom rules in your `<template>` tags you can use `snake_case` or `camelCase` for your rule names.
Internally, Vue Formulate will coerce `snake_case` validation rule names into `camelCase` validation function names.
Please ensure that your custom validation rule functions are written as `myCustomRule` not `my_custom_rule`
in your `.js` files.
:::

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

## Validation event

Occasionally it may be useful to know when the validation state of a field or
form changes — for these instances, the `@validation` event can be used on both
`FormulateInput` and `FormulateForm`. The event will fire every time there is a
change in the validation state of a field.

```vue
<template>
<FormulateInput
  @validation="validation = $event"
  name="breath"
  label="How many minutes can you hold your breath?"
  validation="required|number|between:1,10,value"
/>
{{ validation }}
</template>

<script>
export default {
  data () {
    return {
      validation: {}
    }
  }
}
</script>
```

<demo-validation-event />

The payload of the validation event is an object with three properties, the
field `name`, an array of `errors`, and a boolean `hasErrors`.

:::warning Important
The validation event does not fire when the _visibility_ of the
validation errors change, instead `validation` events are fired even if the
field errors are not currently visible due to the current `error-behavior`.
:::
