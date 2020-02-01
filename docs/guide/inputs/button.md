# Button

The button [classification](/inputs/) is given to the following types:

- [button](#button)
- [submit](#button)

Formulate determines what becomes the text of the button in the following order:

1. The default slot passed in
2. The `value` prop
3. The `label` prop
4. The `name` prop

::: tip Note
Both types output the same markup except that `submit` includes `type="submit"`
on the button element itself which is necessary to trigger form submissions.
:::

## Button

```vue
<FormulateInput
  type="button"
  label="Buy it now"
/>
```

<demo-button />

You may also use the default slot to pass more complex content into the button.

```vue
<FormulateInput
  type="button"
  disabled
>
  Loading <span class="loader" />
</FormulateInput>
```
<demo-button-2 />

```html

```

::: warning Important
There is no model binding or label element for button input types.
:::
