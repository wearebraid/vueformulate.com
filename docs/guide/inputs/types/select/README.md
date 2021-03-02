# Select

The select [classification](/guide/inputs/custom-inputs/#what-is-a-classification) is only given to:

- [select](#select-2)

## Select

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

The `options` prop can be an object, an array of objects, or array of strings. When using an array
of objects each object must include a `label` and `value` property.

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

:::tip Note
The `label` and `value` properties are required when using an array of objects,
however you can also pass `id`, `disabled`, or an `attrs` sub-object with
additional attributes to bind to each option.
:::

When using an array of strings, the provided string will be both the value
and the label.

```vue
<FormulateInput
  type="select"
  :options="['Bologna', 'Rome', 'Florence']"
/>
```

:::tip Note
Native select elements don’t have placeholders, but that prop is available
and will inject a non-selectable option item as the initially selected value.
:::

### Option grouping

Use the `optionGroups` prop when you need to use `<optgroup>`.

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

:::warning String values only
Although Vue Formulate supports non-string values, HTML `select` inputs only
support string values. As such when using a `Number` as an option value the
value will automatically be re-cast as a string.
:::
