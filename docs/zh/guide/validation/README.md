# 验证器

前端表单验证对于提供良好的用户体验是不可或缺的，但由于配置它所涉及的痛苦，
它经常被忽略。Vue Formulate 极大地减少了前端验证的弯路，因此没有理由不使用它。

```vue
<FormulateInput
  type="text"
  label="What ice cream flavor?"
  help="注意：我们的草莓和香蕉刚卖完。"
  name="flavor"
  validation="required|not:strawberry,banana"
/>
```

<demo-1-validation />

## 声明规则

声明什么验证规则就像 `validation` 在你的 `FormulateInput` 字段中添加一个 `prop` 一样简单。

#### 字符串语法
<div id="string-syntax"></div>
声明在给定表单域上使用哪些规则的最简单方法是提供由管道 ( |)分隔的规则字符串。一些规则可能接受参数，这些是在冒号之后定义的:。您可以使用逗号分隔多个参数。

```vue
<FormulateInput
  :validation="required|max:10|min:5"
/>
```

#### 数组语法
<div id="array-syntax"></div>

字符串语法的替代方法是提供一组规则。有时需要使用数组语法来保留输入或转义某些字符，例如在使用带有匹配规则的正则表达式时 。
每个规则都必须定义为一个数组，其中规则名称后跟任何参数。

```vue
<FormulateInput
  :validation="[
    ['required'],
    ['max', 10],
    ['min', 5]
  ]"
/>
```

就本文档而言，管道分隔字符串将是为字段设置验证规则的首选方法。

:::tip 笔记
使用数组语法时，请确保您的 prop 使用 `v-bind:validation` 或 `:validation`。
:::

## 显示验证

验证错误总是实时计算的，但它们是根据 `error-behavior` 输入显示的。
默认 `error-behavior` 为 `blur` -- 意味着具有验证错误的字段仅在用户从输入中移除焦点时才显示其错误。
在大多数情况下，这提供了最佳的用户体验，因为它可以防止用户立即收到错误消息的轰炸。当用户尝试提交验证消息失败的表单时，也会始终显示错误消息。

除了 `blur` 行为之外，`error-behavior` 还支持这些附加策略。

报错行为  | 说明
----------|---------------------------------------------------------------------
`blur`    | **(默认)** 当用户从输入中移除焦点时显示，也会在 `@submit` 时显示
`submit`  | 只在 `@submit` 时显示
`live`    | 总是显示
`value`   | 只要输入具有值，就在 `@submit` 和 `blur` 时显示

## 停止验证
<div id="stopping-validation"></div>

#### `bail` 规则

要在遇到错误后停止验证（以防止同时显示多条消息），
您可以添加特殊规则：`bail`。当验证解析器遇到 `bail` 规则时，它会记住在遇到任何后续规则中的任何失败后停止验证该表单域。

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

### Bail 修饰符

通常只在特定规则失败时才中断验证是可取的。例如，如果密码字段为空，您可能只想显示 `required` 错误消息，
但当它有一个值时，您希望显示所有失败的验证规则。为此，我们可以 `^` 在规则名称上使用修饰符。

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

## 可用的验证规则
Vue Formulate 附带了一个常用的验证规则库。如果您找不到完全符合您要求的规则，您可以随时添加自己的 [自定义规则](#custom-validation-rules) 以满足您的需要。

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

### accepted

该规则要求输入的值必须是 `yes`, `on`, `1` 或 `true`. 对于复选框很有用，通常需要验证某人是否接受了条款。

```vue
<FormulateInput
  type="checkbox"
  label="I accept the terms of service?"
  name="terms"
  validation="accepted"
/>
```
<demo-validation-accepted />

### after
检查日期是否在另一个日期之后。如果未提供日期参数，则将使用当前时间。该值必须是 `Date` 对象或可被 `Date.parse` 求值的字符串。
[在 MDN 上阅读更多 `Date.parse` 信息](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)

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

### alpha
检查值是否仅为字母字符。有两个字符集 `latin` 和 `default`. 前者是严格 `[a-zA-Z]` 规则，而 `default` 集包括最重音符号，如: `ä`, `ù`, 或 `ś`.

```vue
<FormulateInput
  type="text"
  label="Enter your desired username"
  name="username"
  validation="alpha:latin"
/>
```
<demo-validation-alpha />

### alphanumeric
检查输入的值是否仅由字母字符或数字组成。对于字母部分，您可以通过 `default` 或 `latin` - 请参阅 上面的 [alpha](#alpha) 。

```vue
<FormulateInput
  type="text"
  label="Enter your desired username"
  name="username"
  validation="alphanumeric"
/>
```
<demo-validation-alphanumeric />

### bail

用于在第一个后续验证错误时在逻辑上停止验证。有关保释规则的更多详细文档位于 [停止验证部分](#stopping-validation).

### before
检查日期是否在另一个日期之前。如果未提供日期参数，则将使用当前时间。该值必须是 `Date` 对象或可被 `Date.parse` 求值的字符串。
[在 MDN 上阅读更多 `Date.parse` 信息](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)

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

### between
检查数字或字符串长度是否介于最小值或最大值之间。最大值和最小值都是互斥的。如果要验证的值是字符串，则使用字符串的长度进行比较。如果使用数字，则使用数值进行比较。在 `v2.2.4+` 版本中你可以强制它总是通过一个可选的第三个参数设置检查数值或字符串长度 `value` 或 `length` 。

:::tip
如果你希望日期是两个日期之间，请考虑一起使用其他两个日期的 [before](#before) 和 [after](#after) 的验证规则。
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

### confirm

检查字段值是否与另一个字段的值匹配。主要用于隐藏字段 - 如密码确认。
默认情况下，`confirm` 规则将在同一 `FormulateForm` 中查找后缀为 `_confirm` 的其他字段。
如果你希望规则使用不同的字段作为密码确认，只需像这样 `confirm:other_field` 将另一个字段名称作为参数传递给规则即可。

:::tip
此规则仅适用于一个 `<FormulateForm>` 或一个 `group` 类型的上下文中。
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
根据 `Date.parse()` 来检查输入是否为有效日期 ，或者如果提供了格式参数，它将根据给定的格式进行验证。格式变量是：

变量  | 有效值
----------|---------------------------------
`MM`      | 两位数月份表示 (01-12)
`M`       | 允许单数月份表示 (1-12) 无导零
`DD`      | 月份中的两位数日期 (01-31)
`D`       | 一个月中的一位日期数 (1-31)，无前导零
`YY`      | 两位数的年份
`YYYY`    | 四位数年份

:::tip 警告
小心！此验证规则将验证是否遵循您请求的格式，但不会验证日期是否存在（例如 `02/31/2008`）。
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

### email
检查输入的值是否为有效的电子邮件地址格式。

```vue
<FormulateInput
  type="email"
  name="email"
  label="Enter your email address"
  validation="email"
/>
```
<demo-validation-email />

### ends_with
检查输入的值是否以提供的选项之一结束

```vue
<FormulateInput
  type="text"
  name="rhymes"
  label="What rhymes with toad?"
  validation="ends_with:oad,ode"
/>
```

<demo-validation-ends-with />

### in
检查输入的值是否包含在选项数组中。

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

### matches
检查输入的值是否与特定值或模式匹配。如果您传递多个参数，它会检查每个参数，直到找到匹配项。

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

参数也可以是正则表达式。使用字符串语法时，以斜杠开始和结束参数 `/`（不要转义额外的斜杠）。

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

使用 [字符串语法](#string-syntax) 时，您不能转义用于定义验证规则本身的字符 (`|,:`). 要在正则表达式中使用这些字符，
您必须使用备用的 [数组语法](#array-syntax) 。

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

### max
检查一个 `Number` 的值, 或一个 `String` 或 `Array` 的长度是否小于某个值。默认值是 `10`.

可以使用第二个参数来强制验证器验证长度或值 `length` or `value`。

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
评估 `Array` 时第二个参数（长度/值）时将被忽略。
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

### mime
检查所选文件的类型是否为允许值。此验证器使用文件的扩展名来确定 [mime 类型](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)。
我们仍然强烈鼓励对文件内容进行后端验证，因为精明的用户可以绕过前端验证。

```vue
<FormulateInput
  type="file"
  name="image"
  label="Please select an image"
  validation="mime:image/jpeg,image/png"
/>
```
<demo-validation-mime />

::: tip
使用 `multiple` 选项的属性验证字段时，如果任何选定的文件不是正确的 `mime`，验证将失败。
:::

### min
检查一个 `Number` 的值, 或一个 `String` 或 `Array` 的长度是否大于某个值。默认值是 `1`.

可以使用第二个参数来强制验证器验证长度或值 `length` or `value`。

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

### not
要求输入的数据与一组预定义的任意的值都不匹配。

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

### number
检查输入是否为由 `isNaN()` 评估的有效数字。

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

### optional

使用此规则可将字段设为可选。使用时，如果值为空，则所有验证规则都会通过。它在验证规则列表中的位置没有影响。

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

### required
检查输入值是否为空。

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

:::tip 关于空格的注释
默认情况下，只有空格的字符串（如 ` `）被视为有效输入，但是可以使用参数来改变此行为，例如：

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

该规则 `required:trim` 将在评估验证之前修剪输入中的任何空格，因此，只有空格的字符串将无法通过验证。注意：它不会修改输入值。
:::


### starts_with
检查输入的值是否以提供的选项之一开头

```vue
<FormulateInput
  type="text"
  name="hashtag"
  label="What's your favorite hashtag on Twitter?"
  validation="starts_with:#"
/>
```

<demo-validation-starts-with />

### url
检查输入值是否显示为包含协议的格式正确的 URL。这不会检查 URL 是否实际解析。

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

## 自定义验证消息
<div id="customize-validation-messages"></div>

有多种方法可以自定义验证消息。其中最基本的是使用 `validation-name` prop — 允许您更改预定义验证消息中使用的字段名称。

如果您需要更具体，您有三个选择：

- 覆盖验证名称策略。
- 在单个 `FormulateInput` 覆盖规则的消息功能
- 全局覆盖验证规则的消息功能。

### 验证名称策略 <Badge text="2.5" /> {data-new}

验证消息经常包含失败输入的名称。例如，默认 `required` 规则验证消息只是 `${validationName} is required`。
`validationName` 的值是什么取决于全局配置选项 `validationNameStrategy`。默认情况下，此策略为：

```js
Vue.use(VueFormulate, {
  validationNameStrategy: ['validationName', 'name', 'label', 'type']
})
```

意思是，验证消息首先检查 `validation-name` prop，然后是 `name` prop，然后是 `label`，最后返回到 input `type`。

您可以通过按优先级顺序提供自己的数组来更改此验证名称策略。例如，如果您希望输入使用 `label` 代替 `name`，请将策略更改为：

```js
Vue.use(VueFormulate, {
  validationNameStrategy: ['validationName', 'label', 'name', 'type']
})
```

最后，如果你想写一个更复杂的策略，你可以为你的 `validationNameStrategy` 参数提供一个函数。在这种情况下，您的函数将传递组件的完整实例。

```js
Vue.use(VueFormulate, {
  validationNameStrategy: (vm) => vm.context.name || vm.id
})
```

### 自定义字段级别的消息

#### 使用字符串
要覆盖单个 `FormulateInput` 上的验证消息，请添加 `validation-messages` 带有规则名称对象和相应消息的 prop 。



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

#### 使用函数

如果您需要更强大的验证规则，您可以使用函数而不是字符串。该函数以一个上下文对象作为参数。

#### 验证消息的上下文对象:

Property   | 说明
-----------|----------------------------------------
args       | 来自规则定义的参数数组。例如，在规则中这样定义 `in:italian,indian`，这个值为 `['italian', 'indian']`
name       | 字段名称（级联到 `validation-name || name || label` ）
value      | 字段的当前值
formValues | 在 `FormulateForm` 对象的上下文中将包含其他字段的值（按名称）

让我们使用函数而不是字符串来重写上面的例子。

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

### 全局添加 / 编辑验证规则消息

如果您想在整个项目中覆盖验证规则消息，您可以在您想要覆盖的语言键下注册 Vue Formulate 时定义这些消息规则。

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

:::tip 关于本地化
Vue Formulate 是支持国际化的! 检查您的 [语言 / 区域设置是否受支持](/zh/guide/internationalization)，
如果不支持, 请 [考虑贡献](/zh/guide/contributing/).
:::

<div id="custom-validation-rules"></div>

## 自定义验证规则

与验证消息一样，可以全局或按字段添加规则。规则只是简单的函数，它们传递上下文对象和规则参数并返回 `boolean` 或 Promise 的 `resolve`

#### 验证规则的上下文对象:

Property      | 说明
--------------|-----------------
value         | 这个字段的值
getFormValues | 当这个表单域在一个 `FormulateForm` 的上下文中时，您可以使用此函数返回整个表单值的对象
getGroupValues | 当输入在 `group` 类型的上下文中时，您可以使用此函数返回表单域的所在组的值的对象，如果输入不在组中，则此函数回退到 `getFormValues`。
name          | 正在计算的字段的名称

除了上下文对象之外，任何规则参数都作为附加参数传递。例如：

```vue
// Given this validation string
<FormulateInput
  validation="myRule:first,second,third"
/>
```
```js
// 一个名为 “myRule” 的规则将被调用：
function myRule (context, ...args) {
  // args 现在会返回一个内容为 ['first', 'second', 'third'] 的数组
}
```

:::tip 验证规则名称
在 `<template>` 标签中使用自定义规则时，您可以使用 `snake_case` 或 `camelCase` 作为规则名称。
在内部，Vue Formulate 会将 `snake_case` 验证规则名称强制转换为 `camelCase` 验证函数名称。
请确保您的自定义的验证规则函数编写为 `myCustomRule` 而不是 `my_custom_rule` 。
:::

### 字段级自定义验证规则

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

:::tip 异步验证
异步验证规则是完全有效的，但 [请记住](/zh/guide/forms/#submitting-forms)，表单在触发 `@submit` 事件时，
等待所有的验证规则都返回 `true` 时才会执行，因此请尽量使它们保持快速

在内部，Vue Formulate 不会对验证规则进行去抖动，因此如果您需要执行昂贵的异步验证（如 http 请求），建议您对验证规则进行去抖动。
:::

### 全局自定义验证规则

在 Vue Formulate 注册到 Vue 时，可以添加全局验证规则。

```js
import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'

Vue.use(VueFormulate, {
  rules: {
    foobar: ({ value }) => ['foo', 'bar'].includes(value)
  }
})
```

## 验证器事件

有时，了解字段或表单的验证状态何时更改可能很有用 - 对于这些实例，
该 `@validation` 事件可用于 `FormulateInput` 和 `FormulateForm`。每次字段的验证状态发生变化时都会触发该事件。

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

验证事件的有效负载是一个具有三个属性的对象，即表单域 `name`、一个数组类型的 `errors` 和一个布尔类型的 `hasErrors`。

:::warning 重要的
The validation event does not fire when the _visibility_ of the
validation errors change, instead `validation` events are fired even if the
field errors are not currently visible due to the current `error-behavior`.

-- 译者注：未能理解其意思，所以暂时不翻译
:::

## 报错行为

默认情况下，直到用户的焦点离开（技术上是一个 `blur` 事件）当前字段时，才会显示验证错误消息。
可以在 `FormulateInput` 的 `error-behavior` prop 上设置 3 种报错行为模式：

- `blur` （默认）：当用户的焦点离开字段时显示适用的错误消息。
- `submit`: 提交表单时显示适用的错误消息。
- `live`: 始终显示适用的错误消息。
