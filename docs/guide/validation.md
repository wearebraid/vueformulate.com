# Validation

Front end validation is incredibly important to providing a good user experience
to end users, but it’s too often skipped due to the pain of configuring it.
Vue formulate attempts to reduce the friction to the point where it's so simple
to add there's really no excuse.

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

## Available rules

Vue formulate ships with a library of frequently used validation rules, and if
you don’t find one that meets your exact requirement you can always add a
own [custom rule](#custom-rules).

- [accepted](#accepted)
- [after](#after)
- [alpha](#alpha)
- [alphanumeric](#alphanumeric)
- [before](#before)
- [between](#between)
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
<demo-validation-max-2 />

::: tip Note
When evaluating an `Array` the 2nd argument (length/value) is ignored.
:::


### Mime

Checks if the type of file selected is an allowed value. This validator uses the
file’s extension to determine the [mime type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types).
Back end validation of the file’s content is still strongly encouraged. 

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
