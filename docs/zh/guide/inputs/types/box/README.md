# box

box [体系](/zh/guide/inputs/custom-inputs/#what-is-a-classification) 给出了以下类型:

- [复选框](#checkbox)
- [单选框](#radio)

:::tip
就像原生复选框或单选框一样，box 分类使用 `checked` prop 而不是 `value` 设置它的初始状态。

这条规则的例外是当 `options` 指定了 prop 时，它的行为更像是一个选择列表。在这种情况下，使用 `value` 来设置初始状态。

你也可以在任何情况下使用 `v-model`。
:::

## 复选框
<div id="checkbox"></div>

### 简单的复选框

使用单个复选框，结果的值为一个 `boolean` 类型。

```vue
<FormulateInput
  v-model="value"
  type="checkbox"
  label="This is a single checkbox"
/>
```

<demo-input-checkbox />

:::tip
请注意，box 类型标签位与 `input` 元素之后。您可以通过添加 `label-position="before"` prop 来更改此行为。
:::

### 多个复选框选项

通常使用多个复选框来提供一系列可选选项。这可以通过单个 `FormulateInput` 和 `options` prop 来完成。这些可选项代表了一个数组。

```vue
<FormulateInput
  v-model="value"
  :options="{first: 'First', second: 'Second', third: 'Third', fourth: 'Fourth'}"
  type="checkbox"
  label="This is a label for all the options"
/>
```

<demo-input-checkbox-multi />

#### 数组选项的语法

除了将键/值对的对象作为 `option` prop 传递之外，您还可以传递具有 `value` 和 `label` 属性的对象数组。
使用此语法，您可以在每个 input 元素上可选的定义 `id`.

```js
[
  { value: 'first', label: 'First', id: 'my-first' },
  { value: 'second', label: 'Second' }
]
```

#### 数组字符串语法 <Badge text="2.5" /> {data-new}

您还可以使用简单的字符串数组。在这种情况下，复选框的 `value` 和 `label` 值都是这个字符串。

```vue
<FormulateInput
  v-model="value"
  :options="['First', 'Second', 'Third', 'Fourth']"
  type="checkbox"
  label="This is a label for all the options"
/>
```

## 单选框
<div id="radio"></div>

单选框的语法跟复选框相同

```vue
<FormulateInput
  v-model="value"
  :options="{first: 'First', second: 'Second', third: 'Third', fourth: 'Fourth'}"
  type="radio"
  label="This is a label for all the options"
/>
```

<demo-input-radio />

## box 表单域的样式

众所周知，复选框和单选框的默认样式令人沮丧。为了提供帮助，Vue Formulate 会在 `<input>` 标签之后
立即放置一个 `<label>` 标签。这允许使用 `:checked` 伪类选择器轻松实现同级选择器 css 的规则。
默认的 snow 主题使用这种技术来设置复选框的样式

```css
input ~ label {
  /* style the label to look like a checkbox */
}
input:checked ~ label {
  /* make the label look like a checked checkbox */
}
```

如果你不想在你的项目中使用这种 “装饰” 的标签, 你可以通过设置全局选项 `useInputDecorators` 为 `false` 来禁用它 :

```js
// 你注册 Vue Formulate 的地方
Vue.use(VueFormulate, {
  useInputDecorators: false
})
```

## 自定义 class 名

除了所有 [全局 class 名](/zh/guide/theming/#customizing-classes) 之外， 还可以使用以下方法：

名             | 默认值                          | 说明
----------------|----------------------------------|---------------------------------------------------
`decorator`     | `.formulate-input-decorator`     | 用于美化紧跟在 `<input>` 元素之后的 `<label>` 元素

:::warning 仅字符串值
尽管 Vue Formulate 支持非字符串值，但 HTML 的 radio 和 checkbox 表单域只支持字符串值，
使用整数或布尔值作为键会导致意外行为。此规则的唯一例外是单个复选框（无 options），Vue 会自动为您转换为布尔值。
:::
