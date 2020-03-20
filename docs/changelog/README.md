---
sidebar: auto
---

# Changelog

## v2.2.5 - March 20, 2020

- Adds basic support for IE11.

:::warning Note
While the core features of Vue Formulate now work on IE11, the default snow
theme still needs a bit of work on more complex components like files.
:::

## v2.2.4 - March 18, 2020

- Adds support for third argument on `between` validation rule with `length` and `value` as supported options.

## v2.2.3 - March 16, 2020

- Adds support for Italian locale.
- Fixes a [small bug](https://github.com/wearebraid/vue-formulate/issues/35) with image previews on the `image` type.

## v2.2.2 - March 11, 2020

- Adds support for Japanese locale.
- Fixes French locale to include translations of all validation rules.

## v2.2.1 - March 9, 2020

- Fixes styling issues with file uploads and long filenames.
- Adds support for Portuguese locale

## v2.2.0 - March 7, 2020

- Adds a suite of tooling for form errors and back end [error handling](/guide/forms/error-handling).
- Improves the i18n architecture so contributors can add languages without adding to the package size.
- Added support for startsWith and endsWith field validation.
- Fixed a bug that caused validation rules to not be displayed on blur for the box classification.

## v2.1.1 - March 1, 2020

- Patches incorrect class name on `input` classifications.

## v2.1.0 - March 1, 2020

- Patched issue that caused `FormulateForm` to not properly hydrate a `box` classification when used with `:options`.
- Patched an issue that caused `radio` types to have an initial value when they should have been empty if used with `:options`.
- Fixed uploader handling when implemented with `Axios`.
- Added support for displaying initial values on on `file` classifications.
- Fixed "required" validation rule to failure when `file` upload occurred and then the file removed.

## v2.0.4 - February 29, 2020

- Patched `FormSubmission.js` to properly return upload results in submission payloads.
- Exposed new `values` prop to `FormulateForm`, an unbound way to set initial values.

## v2.0.3 - February 28, 2020

- Patched `max` validation rule message to output less than or equal to message.
- Re-factored rollup build for minified browser version (formulate.min.js)
