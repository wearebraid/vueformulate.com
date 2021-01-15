# Button

The button [classification](/guide/inputs/custom-inputs/#what-is-a-classification) is given to the following types:

- [button](#button)
- [submit](#submit)

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

::: warning Important
There is no model binding or label element for button input types.
:::

## Submit

Submit elements have the same syntax as buttons, but they are able to submit
forms (including `FormulateForm` wrappers).

```vue
<FormulateForm
  @submit="showAlert"
>
  <FormulateInput
    type="submit"
    name="Submit this form!"
  />
</FormulateForm>
```

<demo-input-submit />


## Slot Component <Badge text="2.5" /> {data-new}

The button input has one slot (`#default`) with a single [Slot Component](/guide/inputs/slots/#slot-components):

Slot component name | Description
---------------|----------------------------------------------------------------
`buttonContent`| This slot component renders in the `#default` slot and is passed the input context object.
