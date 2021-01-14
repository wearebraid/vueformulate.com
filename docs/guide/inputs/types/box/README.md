# Box

The box [classification](/guide/inputs/custom-inputs/#what-is-a-classification) is given to the following types:

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

#### Array string syntax <Badge text="2.5" /> {data-new}

You can also use a simple array of strings. In this case both the `value` and
the `label` of the checkboxes will be the string value.

```vue
<FormulateInput
  v-model="value"
  :options="['First', 'Second', 'Third', 'Fourth']"
  type="checkbox"
  label="This is a label for all the options"
/>
```

## Radio

The syntax for radio inputs is identical to checkboxes.

```vue
<FormulateInput
  v-model="value"
  :options="{first: 'First', second: 'Second', third: 'Third', fourth: 'Fourth'}"
  type="radio"
  label="This is a label for all the options"
/>
```

<demo-input-radio />

## Styling box inputs

Checkboxes and radio boxes are notoriously frustrating to style. To assist,
Vue Formulate places a `<label>` element immediately after the `<input>` tag.
This allows for easy sibling selector css rules using the `:checked` psuedo-class
selector. The default snow theme using this technique to style checkboxes and
inputs.

```css
input ~ label {
  /* style the label to look like a checkbox */
}
input:checked ~ label {
  /* make the label look like a checked checkbox */
}
```

If you don't want to use this "decorator" label on your project, you can disbale
it by setting the global option `useInputDecorators` to `false`:

```js
// Wherever you register Vue Formulate
Vue.use(VueFormulate, {
  useInputDecorators: false
})
```

## Custom class keys

In addition to all [global class keys](/guide/theming/#customizing-classes)
following are available:

Key             | Default                          | Description
----------------|----------------------------------|---------------------------------------------------
`decorator`     | `.formulate-input-decorator`     | A secondary `<label>` element position immediately after the `<input>` element for styling “pretty” checkboxes.

:::warning String values only
Although Vue Formulate supports non-string values, HTML `radio` and `checkbox`
inputs only support string values, using integers or booleans as keys will
result in unexpected behavior. The only exception to this rule is single
checkboxes (no `options`), which Vue will cast to booleans for you automatically.
:::
