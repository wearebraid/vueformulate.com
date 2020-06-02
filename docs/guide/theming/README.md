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

## Creating your own theme

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
    <label for="oX5F-N4TS" class="formulate-input-label formulate-input-label--before">
      Sample text input
    </label>
    <!-- Interior element wrapper -->
    <div data-type="text" class="formulate-input-element formulate-input-element--text">
      <!-- Actual input element -->
      <input type="text" placeholder="Sample placeholder" id="oX5F-N4TS">
    </div>
  </div>

  <!-- Help message -->
  <div class="formulate-input-help">
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
