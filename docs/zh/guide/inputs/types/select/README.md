# 下拉选择

下拉选择 [classification](/zh/guide/inputs/custom-inputs/#what-is-a-classification) 只能被用于:

- [下拉选择器](#select-2)

## 下拉选择器
<div id="select-2"></div>

```vue
<FormulateInput
  v-model="value"
  :options="{first: 'First', second: 'Second', third: 'Third', fourth: 'Fourth'}"
  type="select"
  placeholder="Select an option"
  label="Which of your children is your favorite?"
/>
```

<demo-input-select />

所述 `options` prop 可以是一个对象，对象的数组或字符串的数组。使用对象数组时，每个对象都必须包含 `label` 和 `value` 属性。

```vue
<FormulateInput
  type="select"
  :options="[
    { value: 'first', label: 'First name' },
    { value: 'last', label: 'Last name' },
    { value: 'initial', label: 'Middle Initial', id: 'name-initial' },
    { value: 'maiden', label: 'Maiden name', disabled: true },
  ]"
/>
```

:::tip
`label` 和 `value` 属性是使用对象的数组时必需的，
但是也可以通过 `id`，`disabled` 或者 `attrs` 将额外的属性绑定到每个选项的元素上。
:::

使用字符串数组时，提供的字符串既是值又是标签。

```vue
<FormulateInput
  type="select"
  :options="['Bologna', 'Rome', 'Florence']"
/>
```

:::tip
原生选择器没有占位符，但该 prop 可用，并将注入一个不可选中的选项作为最初选择的值。
:::

### 选项分组

当你需要 `<optgroup>` 时，可以使用 `optionGroups` prop

```vue
<FormulateInput
  label="Select an available meeting time"
  type="select"
  placeholder="Choose a time"
  :option-groups="{
    Morning: {
      10: '10am',
      11: '11am'
    },
    Afternoon: {
      15: '3pm',
      17: '5pm'
    }
  }"
/>
```

<demo-input-select-group />

:::warning 仅字符串值
尽管 Vue Formulate 支持非字符串值，但 HTML select 仅支持字符串值。
因此，当使用 `Number` 作为选项值时，该值将自动重新转换为字符串。
:::
