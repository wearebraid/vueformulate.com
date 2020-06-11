# Theming

Vue Formulate is completely agnostic about the styling you choose to apply to
your form inputs, but has been intentionally designed to be easy to write
styles for.

## Default theme
By default, the package contains the SCSS and compiled CSS for a single theme
(named "snow"). It’s the one you see on this documentation site. You can import
the SCSS directly into your own SCSS, or just use the minified CSS directly.

#### Import the SCSS

```scss
// scss/main.scss
@import '../node_modules/@braid/vue-formulate/themes/snow/snow.scss';
```

#### CSS File

The distribution of the snow theme is available in the repository for download
and inclusion.

[View CSS on Github](https://github.com/wearebraid/vue-formulate/blob/master/dist/snow.min.css)


## Customizing Classes

There are 4 ways to change the classes applied to DOM elements inside a
`FormulateInput`:

1. Use props on a `FormulateInput`.
2. Globally via the `classes` option.
3. Globally via the `baseClasses` option.
3. Manually override the DOM using [slots](/guide/inputs/slots/).

In the first two cases, you can use a string to define what class(es) should be
applied or you can use a function to define additional logic for which classes
should be applied.

### Changing classes with props.

Replacing classes on a given input is easy. Simply target the [class key](#class-map)
you’d like to replace with a prop named `[class key]-class`:

#### Strings
When using string values any base classes will be replaced.

```vue
<FormulateInput
  label="The label is using it’s own class"
  label-class="my-label-class"
/>
<!-- <label class="my-label-class"> -->
```
#### Arrays
To append your custom class to the base classes use an array.

```vue
<FormulateInput
  label="The label is using it’s own class"
  :label-class="[my-label-class]"
/>
<!-- <label class="formulate-input-label formulate-input-label--before my-label-class" /> -->
```

#### Functions
For the most fine grained control you can pass in a function. The function will
receive 2 arguments, a [class context object](#class-context) and an array
of base classes generated using the global options.

```vue
<FormulateInput
  label="The label is adding it’s own class"
  :label-class="(context, classes) => ['my-custom-label-class'].concat(classes)"
/>
<!-- <label class="my-label-class formulate-input-label formulate-input-label--before" /> -->
```


### Changing classes globally

To easily update which classes are applied to every `FormulateInput` by default
you can update the `classes` option with an object of [class keys](#class-map).

Similar to modifying classes with props the values in the `classes` option can
be a `string`, `array`, or `function`. Strings overwrite any base classes,
arrays are appended to the base classes, and functions allow for fine grained
control and can accept a `context` and `baseClasses` arguments respectively.

### String
```js
import Vue from 'vue'
import VueFormulate from 'vue-formulate'

Vue.use(VueFormulate, {
  classes: {
    outer: 'mytheme-wrapper',
  }
})
// All <FormulateInput> will output:
// <div class="mytheme-wrapper">...
```

### Array
```js
...
Vue.use(VueFormulate, {
  classes: {
    outer: ['mytheme-wrapper'],
  }
})
// All <FormulateInput> will output:
// <div class="formulate-input mytheme-wrapper">...
```

### Function
```js
...
Vue.use(VueFormulate, {
  classes: {
    outer: (context, classes) => {
      return classes.concat([
        'mytheme-wrapper',
        `mytheme-wrapper--${context.type}`
      ])
    },
  }
})
// All <FormulateInput> will output:
// <div class="formulate-input mytheme-wrapper mytheme-wrapper--[type]">...
```

For even more power, you can override the `baseClasses` option with you own
function. This function is responsible for providing an object with all of the
class keys and their base classes.

### Class keys

Classes are applied to internal DOM elements using a class map, where the “class
key” equates to a DOM element’s classes. These map keys are used to override
or extend the default classes on each element.

#### Global classes

Key             | Default                          | Description
----------------|----------------------------------|---------------------------------------------------
`outer`         | `.formulate-input`               | The outermost div wrapper.
`wrapper`       | `.formulate-input-wrapper`       | A wrapper around the label + interior element.
`label`         | `.formulate-input-label`<br>`.formulate-input-label--[position]` | The label wrapper and it's position (before/after).
`element`       | `.formulate-input-element`<br>`.formulate-input-element--[type]` | The wrapper around the actual `<input>` element(s).
`input`         | n/a                              | Applied directly to the input DOM element. Not used by default to allow for more flexible cascading.
`help`          | `.formulate-input-help`<br>`.formulate-input-help--[position]` | Wrapper around the help text.
`errors`        | `.formulate-input-errors`        | Wrapper around the list of errors.
`error`         | `.formulate-input-error`         | Wrapper around a single error message.

Some input types have additional class keys that are detailed on their own
pages:

- [Boxes](/guide/inputs/types/box/#custom-class-keys)
- [Sliders](/guide/inputs/types/slider/#custom-class-keys)
- [Files](/guide/inputs/types/file/#custom-class-keys)
- [Groups](/guide/inputs/types/group/#custom-class-keys)

## Class context

Global class functions and prop class functions both receive a “class context”
with the following values:

Property          | Description
------------------|----------------------------------------------------------------
`classification`  | The classification of the input (`text`, `group`, `select` etc)
`hasValue`        | `Boolean` whether or not the field has a value.
`hasValidationErrors` | `Boolean` whether or not the field has validation errors (.
`helpPosition`    | `String` describing the position of the help text. `before` or `after`.
`labelPosition`   | `String` describing the position of the label. `before` or `after`.
`type`            | The `type` of input
`value`           | The value of the input
`visibleValidationErrors` | All visible validation errors

## Custom theme

Consistent markup and like-field grouping with classifications help considerably
with keeping the necessary CSS to a minimum. The package includes a boilerplate SCSS
file.

[Download a SCSS boilerplate](https://github.com/wearebraid/vue-formulate-next/tree/master/themes/boilerplate/boilerplate.scss)

#### Sample markup

```html
<!-- Outer Wrapper -->
<div class="formulate-input"  data-classification="text" data-type="text" data-has-errors="true" data-is-showing-errors="true">

  <!-- Outer Wrapper -->
  <div class="formulate-input-wrapper">
    <!-- Label -->
    <label for="my-id" class="formulate-input-label formulate-input-label--before">
      Sample text input
    </label>
    <!-- Interior element wrapper -->
    <div data-type="text" class="formulate-input-element formulate-input-element--text">
      <!-- Actual input element -->
      <input type="text" placeholder="Sample placeholder" id="my-id">
    </div>
  </div>

  <!-- Help message -->
  <div class="formulate-input-help formulate-input-help--after">
    Sample help text
  </div>

  <!-- List of error messages -->
  <ul class="formulate-input-errors">
    <li class="formulate-input-error">
      Sample is required.
    </li>
  </ul>
</div>
```

Once the above output has been themed styles will largely transfer too all
formulate inputs. The only variance is some classifications use
different internal inputs.

### Using classifications

The outermost wrapper always has a `data-classification` attribute which can be
used to group styles. For example the `[data-classification="text"]` selector
can be used to style all text-based inputs at the same time:

```scss
.formulate-input {
  [data-classification="text"] {
    input {
      // style all text-like inputs here
    }
  }
}
```

### Data attributes

To make dynamic styling a bit easier, there are several utility data attributes
that are applied to the outermost wrapper.

Attribute                 | Description
--------------------------|----------------------------------------------------------------
`data-classification`     | Always available. Set to the classification of the input (`box`, `text`, `group` etc)
`data-has-errors`         | Added when the field has any validation errors or explicit errors (passed in via prop or form) *regardless of whether or not the errors are being displayed*.
`data-has-value`          | Added when the field is not empty.
`data-is-showing-errors`  | Added when the field has errors and is showing them (based on `error-behavior`)
`data-type`               | Always available. Set to the value of the `type` prop.
