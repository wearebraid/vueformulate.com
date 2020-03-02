# Box

The box [classification](/inputs/) is given to the following types:

- [checkbox](#checkbox)
- [radio](#radio)

:::tip Note
Just like a native checkbox or radio, the `box` classification uses the `checked`
prop instead of `value` to set it’s initial state.

The exception to this rule is when the `options` prop is specified causing it to
act more like a select list. In this case, use `value` to set the initial state.

You can also use `v-model` in either case.
:::

## Checkbox

### Single checkbox

With a single checkbox, the value of the result is a `boolean`.

```vue
<FormulateInput
  v-model="value"
  type="checkbox"
  label="This is a single checkbox"
/>
```

<demo-input-checkbox />

:::tip Tip
Notice that the labels of `box` types come after the input element. You can
change this behavior by adding `label-position="before"` as a prop.
:::

### Multiple checkbox options

Often multiple checkboxes are used to offer a range of selectable options. This
can be done with a single `FormulateInput` and the `options` prop. The
selections are represented as an array.

```vue
<FormulateInput
  v-model="value"
  :options="{first: 'First', second: 'Second', third: 'Third', fourth: 'Fourth'}"
  type="checkbox"
  label="This is a label for all the options"
/>
```

<demo-input-checkbox-multi />

#### Array option syntax

In addition to passing an object of key/value pairs as the `option` prop, you
can alternatively pass an array of objects with `value` and `label` properties.
Using this syntax you can optionally define an `id` attribute to be applied to
each `input`.

```js
[
  { value: 'first', label: 'First', id: 'my-first' },
  { value: 'second', label: 'Second' }
]
```

## Radio

The syntax for radio inputs is identical to checkboxes.

```vue
<FormulateInput
  v-model="value"
  :options="{first: 'First', second: 'Second', third: 'Third', fourth: 'Fourth'}"
  type="checkbox"
  label="This is a label for all the options"
/>
```

<demo-input-radio />
