# 文本

文本 [classification](/zh/guide/inputs/) 被赋予以下类型：

- [color](#color)
- [date](#date)
- [datetime-local](#datetime-local)
- [email](#email)
- [hidden](#hidden)
- [month](#month)
- [number](#number)
- [password](#password)
- [search](#search)
- [tel](#tel)
- [time](#time)
- [text](#text)
- [url](#url)
- [week](#week)

::: warning 重要提示
这些表单域都是标准的 HTML 表单域，虽然我们出于语义和可访问性的原因鼓励使用它们，
但 [并非](https://caniuse.com/#feat=input-datetime) 所有浏览器都支持它们中的一些。
你可以考虑在逐个类型的基础上使用 polyfill、[插件](/zh/guide/plugins/) 或 [自定义表单域](/zh/guide/inputs/custom-inputs/)。
:::


## color

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

## date

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

## datetime-local

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

:::warning
请注意，由于缺乏 Firefox 支持，当前日期时间本地 HTML 表单域的支持有问题。
:::

## email

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

## hidden

虽然技术上 Vue Formulate 确实支持隐藏的输入字段，
但用例非常少，因为您可以通过 [表单提交](/zh/guide/forms) 轻松地将自己的 “隐藏” 值注入到提交的数据中。

```vue
<FormulateInput
  type="hidden"
  name="sample"
  value="secret-code"
/>
```


## month

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

## number

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

## password

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
密码输入与 `FormulateForm` 和 [确认](/zh/guide/validation/#confirm) 验证规则配对时效果很好。
:::

## search

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

## tel

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

## time

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

## text

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

## url

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

## week

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

:::warning
请注意，由于缺乏 iOS 支持，目前 HTML 周表单域的支持特别差。
:::

