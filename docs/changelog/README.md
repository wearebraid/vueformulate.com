---
sidebar: auto
---

# Changelog
## v2.3.1 — May 18, 2020

- Fixes an issue that caused labels to occasionally disconnect from their `box` input when used in SSR in conjunction with a `group` input.

## v2.3.0 — May 18, 2020

Vue Formulate `2.3.0` is a significant update that re-structures several internal
APIs and provides a slew of new features 🎉. There should be no breaking changes
with `2.2.x`.

- Adds [new input type](/guide/inputs/types/group/) `group`!
  - Structure groups of data in you form model.
  - Validate a set of fields as a single rule.
  - Repeat groups of fields.
- Improves accessibility by including `aria-describedby` attribute on inputs when help text is supplied.
- Adds [new named form methods](/guide/forms/#named-forms) `reset`, `resetValidation`, `setValues`.
- Adds support for [stopping validation](/guide/validation/#stopping-validation) rules when they fail.
  - The new `bail` rule will stop validation if any rules fail after it.
  - You can now apply a modifier `^` to any rule name `^required` to stop validation if that specific rule fails.
- The `matches` rule now supports regular expressions when using string validation syntax (some caveats).
- Fixes a bug where fields removed from a form did not take their data with them.
- Adds a new `error-behavior` type `submit` to only show errors when a form is submitted.
- Adds extensive support for [slots](/guide/inputs/slots/).
  - Adds `label`, `help`, `default`, `element`, and `errors` slots to every input type.
  - Adds the ability to override the default "slot components" for all available slots to make global changes.
- Adds new `@validation` and `@error-visibility` events to inputs.
- Adds new `@validation` event to forms.
- Adds Korean language 🇰🇷.
- Updates `vue-test-utils` to version 1, updating all deprecated tests methods.

## v2.2.13 - May 4, 2020

- Small fix for sliders on Mozilla (Firefox) browsers.

## v2.2.12 - May 4, 2020

- Allows `name` attribute to be passed through to internal input element.
- Adds support for deterministic auto-generated ids for better SSR hydration.

## v2.2.11 - April 29, 2020

- Bumps `@braid/vue-formulate-i18n` to 1.5.0 which adds Dutch support.

## v2.2.10 - April 29, 2020

- Removes node 11 as engine in `package.json` (should not have ever been there).

## v2.2.9 - April 28, 2020

- Fixes an issue that caused inputs to remain in the form even when they were removed (via `v-if`).

## v2.2.8 - April 13, 2020

- Fixes a bug with `select` and `box` when `options` prop is an empty array.
- Adds the form name as a second argument to the error handler.

## v2.2.7 - April 6, 2020

- Bumps `@braid/vue-formulate-i18n` adding Arabic support.

## v2.2.6 - March 27, 2020

- Bumps `@braid/vue-formulate-i18n` to 1.3.3 which fixes some `devDependencies` that were in `dependencies`.

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
