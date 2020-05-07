# Text

The text [classification](/inputs/) is given to the following types:

- [text](#text)
- [email](#email)
- [number](#number)
- [color](#color)
- [date](#date)
- [hidden](#hidden)
- [month](#month)
- [password](#password)
- [search](#search)
- [tel](#tel)
- [time](#time)
- [url](#url)
- [week](#week)
- [datetime-local](#datetime-local)

::: warning Important
These inputs are all standard HTML inputs, and while we encourage their use for
semantic and accessibility reasons, some of them are [not supported in](https://caniuse.com/#feat=input-datetime)
all browsers. Consider using a polyfill, [plugin](/guide/plugins/), or [custom input](/guide/custom-inputs/)
on a type-by-type basis.
:::

## Text

```vue
<FormulateInput
  type="text"
  name="sample"
  label="Sample text input"
  placeholder="Sample placeholder"
  help="Sample help text"
  validation="required"
  error-behavior="live"
/>
```

<demo-input-text />

## Email

```vue
<FormulateInput
  type="email"
  name="sample"
  label="Sample email input"
  placeholder="Sample email placeholder"
  help="Sample email help text"
  validation="required|email"
  error-behavior="live"
/>
```

<demo-input-email />

## Number

```vue
<FormulateInput
  type="number"
  name="sample"
  label="Sample number input"
  placeholder="Sample number placeholder"
  help="Sample number help text"
  validation="required|number|between:10,20"
  min="0"
  max="100"
  error-behavior="live"
/>
```

<demo-input-number />

:::tip Accessibility tip
It [may be preferable](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/)
to use a `text` input rather than a number input for accessibility reasons. You
can use the `inputmode="numeric"` and `pattern="[0-9]*"` attributes to force a
number keypad for mobile users.
:::

## Color

```vue
<FormulateInput
  type="color"
  name="sample"
  label="Sample color input"
  placeholder="Sample color placeholder"
  help="Sample color help text"
  validation="required"
  value="#3eaf7c"
  error-behavior="live"
/>
```

<demo-input-color />

## Date

```vue
<FormulateInput
  type="date"
  name="sample"
  label="Sample date input"
  placeholder="Sample date placeholder"
  help="Sample date help text"
  validation="required|after:2019-01-01"
  min="2018-12-01"
  max="2021-01-01"
  error-behavior="live"
/>
```

<demo-input-date />

## Hidden

While technically Vue Formulate does support hidden input fields, the use case
is pretty minimal since you can easily inject your own "hidden" values into
submitted data with a [form submission](/guide/forms).

## Month


```vue
<FormulateInput
  type="month"
  name="sample"
  label="Sample month input"
  placeholder="Sample month placeholder"
  help="Sample month help text"
  validation="required|after:2019-01-01"
  min="2018-12"
  max="2021-01"
  error-behavior="live"
/>
```

<demo-input-month />

## Password

```vue
<FormulateInput
  type="password"
  name="sample"
  label="Sample password input"
  placeholder="Sample password placeholder"
  help="Sample password help text"
  validation="required|min:10,length"
  validation-name="Password"
  error-behavior="live"
/>
```

<demo-input-password />

:::tip Tip
Password inputs work well when paired with a `FormulateForm` and the [confirm](/guide/validation/#confirm)
validation rule.
:::

## Search

```vue
<FormulateInput
  type="search"
  name="sample"
  label="Sample search input"
  placeholder="Sample search placeholder"
  help="Sample search help text"
/>
```

<demo-input-search />

## Tel

```vue
<FormulateInput
  type="tel"
  name="phone"
  label="Sample tel input"
  placeholder="Sample tel placeholder"
  help="Sample tel help text"
  validation="required"
/>
```

<demo-input-tel />

## Time

```vue
<FormulateInput
  type="time"
  name="sample"
  label="Sample time input"
  placeholder="Sample time placeholder"
  help="Sample time help text"
  validation="required"
/>
```

<demo-input-time />

## Url

```vue
<FormulateInput
  type="url"
  name="sample"
  label="Sample url input"
  placeholder="Sample url placeholder"
  help="Sample url help text"
  validation="required"
/>
```

<demo-input-url />

## Week

```vue
<FormulateInput
  type="week"
  name="sample"
  label="Sample week input"
  placeholder="Sample week placeholder"
  help="Sample week help text"
  validation="required"
/>
```

<demo-input-week />

:::warning Warning
Please note that the week HTML input element has particularly poor support
at the moment due to the lack of iOS support.
:::


## Datetime-local

```vue
<FormulateInput
  type="datetime-local"
  name="sample"
  label="Sample datetime-local input"
  placeholder="Sample datetime-local placeholder"
  help="Sample datetime-local help text"
  validation="required"
/>
```

<demo-input-datetime-local />

:::warning Warning
Please note that the datetime-local HTML input element has questionable support
at the moment due to the lack of Firefox support.
:::
