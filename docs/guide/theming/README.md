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

There are 3 ways to change the classes applied throughout inputs:

1. Globally change the `classes` or `getClasses` options.
2. Use props on a `FormulateInput`.
3. Override the DOM using [slots](/guide/inputs/slots/).

In the first two cases, you can use a string to define what class(es) should be
applied or you can use a function to define additional logic for which classes
should be applied.


### Changing classes globally

To easily update which classes are applied to every `FormulateInput` by default
you can update the `classes` option with an object of [class keys](#class-map)

```js
import Vue from 'vue'
import VueFormulate from 'vue-formulate'

Vue.use(VueFormulate, {
  classes: {
    outer: 'mytheme-outer-wrapper',
    label: 'mytheme-label'
  }
})
```

For even more power, you can override the `getClasses` option with you own
function. This function is responsible for providing all the default classes
for every class key. It allows you to tease out additional nuance.

### Changing classes on inputs

Replacing classes on a given input is easy. Simply target the [class key](#class-map)
you’d like to overwrite with a prop named `[class key]-class`:

```vue
<FormulateInput
  label="The label is using it’s own class"
  label-class="my-custom-label-class"
/>
```

When using string values any default classes will be replaced. To append to the
existing classes (or resort, remove prepend, etc) you can use a function.
Existing classes are passed into the function as an array.

```vue
<FormulateInput
  label="The label is adding it’s own class"
  :label-class="classes => classes.concat(['my-custom-label-class'])"
/>
```

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
