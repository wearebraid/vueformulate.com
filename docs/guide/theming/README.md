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

## Classes

There are 3 ways to change the classes applied throughout inputs:

1. Using props on each `FormulateInput`.
2. Globally updating the `classes` option.

In both cases, you can use a string to define what class(es) should be applied
or you can use a function to define additional logic for which classes should
be applied.

### Changing classes with props

Replacing classes on a given input is easy. Simply target the [class map key](#class-map)
you’d like to overwrite with a prop named `[key]-class`:

```vue
<FormulateInput
  label="The label is using it’s own class"
  label-class="my-custom-label-class"
/>
```

When using string values any default classes will be replaced. To append to the
existing classes, you can use a function. Existing classes are passed into the
function as an array.

```vue
<FormulateInput
  label="The label is adding it’s own class"
  :label-class="classes => classes.concat(['my-custom-label-class'])"
/>
```

### Class map

Classes are applied to internal DOM elements using a class map, where the key of
the map equates to a DOM element’s classes. These map keys are used to override
or extend the default classes on each element.

#### Global classes
Key             | Default                          | Description
----------------|----------------------------------|---------------------------------------------------
`outer`         | `.formulate-input`               | The outermost div wrapper.
`wrapper`       | `.formulate-input-wrapper`       | A wrapper around the label + interior element.
`label`         | `.formulate-input-label`<br>`.formulate-input-label--[position]` | The label wrapper and it's position (before/after).
`element`       | `.formulate-input-element`<br>`.formulate-input-label--[type]` | The wrapper around the actual `<input>` element(s).
`input`         | n/a                              | Applied directly to the input DOM element. Not used by default to allow for more flexible cascading.
`help`          | `.formulate-input-help`<br>`.formulate-input-help--[position]` | Wrapper around the help text.
`errors`        | `.formulate-input-errors`        | Wrapper around the list of errors.
`error`         | `.formulate-input-error`         | Wrapper around a single error message.

#### Box inputs
Key             | Default                          | Description
----------------|----------------------------------|---------------------------------------------------
`decorator`     | `.formulate-input-decorator`     | A secondary `<label>` element position immediately after the `<input>` element for styling “pretty” checkboxes.

#### Slider inputs
Key             | Default                          | Description
----------------|----------------------------------|---------------------------------------------------
`range`         | `.formulate-input-range-value`   | A element immediately after the `<input>` element containing the value of the range input. Only available when `show-value` is true.

#### File inputs
Key             | Default                          | Description
----------------|----------------------------------|---------------------------------------------------
`uploadArea`    | `.formulate-input-upload-area`   | The dropzone area wrapper for an upload.
`uploadAreaMask`| `.formulate-input-upload-area-mask` | An additional element position immediately after the `<input>` used for stylistic reasons.
`files`         | `.formulate-files`               | A wrapper around a list of files.
`file`          | `.formulate-file`                | A single input file.
`fileName`      | `.formulate-file-name`           | The element responsible for outputting the name of the file.
`fileRemove`    | `.formulate-file-remove`         | The element responsible for removing an existing file.
`fileImage`     | `.formulate-file-image-preview`  | For `image` types, the preview of the uploaded image.
`fileProgress`  | `.formulate-file-progress`       | The outer wrapper for the progress bar.
`fileProgressInner` | `.formulate-file-progress-inner` | The inner progress indicator. Width is automatically set as a percentage of upload completion.

#### Group inputs
Key             | Default                          | Description
----------------|----------------------------------|---------------------------------------------------
`group`         | `.formulate-input-group`         | A wrapper around the content of a group field.
`grouping`      | `.formulate-input-grouping`      | A wrapper around all repeatable fields (only exists when repeatable)
`repeatable`    | `.formulate-input-group-repeatable` | A wrapper around each set of grouped fields (exists even for non-repeatable groups).
`groupRemove`   | `.formulate-input-group-repeatable-remove` | The remove button for a field group.
`addMore`       | `.formulate-input-group-add-more` | The wrapper around the add more button for repeatable groups.

:::tip Note
The `class` prop will automatically append classes to the outer most wrapper as
you would expect from any Vue component.
:::
