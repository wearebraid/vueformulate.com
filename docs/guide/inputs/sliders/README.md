# Slider

The sliders [classification](/inputs/) is given to the following types:

- [range](#range)

## Range

```vue
<FormulateInput
  label="How long do you think you’ll live?"
  type="range"
  name="range"
  min="0"
  max="100"
  value="45"
  validation="required|min:10|max:90"
  error-behavior="live"
/>
```

<demo-input-range />

Input ranges can create a poor user experience because the value of the range
is not displayed by default. By adding the prop `show-value`, Vue
Formulate will expose the value of the range input next to the slider.

<demo-input-range-value />
