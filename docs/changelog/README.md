---
sidebar: auto
---

# Changelog

## v.2.5.5 — @todo RELEASE DATE HERE

- New Features 🎉:
  - New `removePosition` prop allows the remove button of a `group` type to control location of the `remove` slot.
  - Each group’s `index` is now available to the `remove` slot of a `group` type.
  - New `ignored` prop to allow using a `FormulateInput` inside a `FormulateForm` without registering it with the form using.
  - New `form` class key allows class features on the `FormulateForm` component.
- Bug fixes 🐛:



## v.2.4.5 - October 4, 2020

- New features 🎉:
  - Adds support for Serbian 🇷🇸 and Thai 🇹🇭.
  - Adds a new slotProp `component` to allow custom props to be passed to custom inputs.

- Bug Fixes 🐛
  - Fixes bug that caused `file` inputs with hydrated values to not remove their files from the model when removed.
  - Fixes a `z-index` bug with hover states on `image` type inputs.
  - Fixes an issue that allowed multiple uploads of a `file` type when triggered by the `submit` button.

## v.2.4.4 - September 21, 2020

- New Features 🎉
  - Adds support for Chinese 🇨🇳, Lithuanian 🇱🇹, Norwegian 🇳🇴, and Swedish 🇸🇪.
  - Adds support for a `remove-label` prop on `group` inputs to support i18n language for the remove button.
  - Adds support for ARIA live regions on error messages
  - Adds stylistic support for the `size` attribute on a `multiple` select input.
  - Adds a `$formulate.setLocale` method to easily change the active locale manually.
  - Adds a `keep-model-data` prop to `FormulateForm` and `FormulateInput` to allow you to keep an input's model data even after it has been removed.
  - Adds attributes (`attrs`) to the [context object](/guide/theming/customizing-classes/#class-context) that is passed to class functions.

- Bug Fixes 🐛
  - Fixes styling issues for `select` type with `multiple` attribute.
  - Fixes an issue that could cause a select type with the `multiple` attribute to incorrectly select the first item in the list.
  - Fixes a styling issue in the snow theme that caused select lists items to appear grey when used with placeholders.
  - Fixed an issue that prevented the `file` type from removing files from the model after they had been uploaded on the same page session.
  - Fixes stylistic alignment of progress bar and file name on `file` type.
  - Fixes issue that caused incorrect id generation when using array syntax on inputs that accept `options` like `checkbox` inputs.
  - Fixes compatibility with IE11 for the `group` type which previously used a `Symbol` internally and now uses unique strings.
  - Fixes an issue that prevented an input's `context.model` from being accessible in some scoped slots.
  - Fixed the `class` attribute in schemas to support Vue's [special handling of classes](https://vuejs.org/v2/guide/class-and-style.html).
  - Fixed an issue that caused mutations to schemas to sometimes (incorrectly) re-use DOM nodes causing model cross contamination.

## v2.4.3 - July 11, 2020

- Adds support for Czech language 🇨🇿.
- Event listeners applied to `<FormulateInput>` are now forwarded to their internal input element.
- `select` inputs that have no model data and no placeholder now auto-select the first value.
- Adds a `minimum` prop to the input type `group`.
- Improves model reactivity for `<FormulateForm>` and `group` types.
- Fixes a bug that prevented `group` inputs from accessing `getFormValues` and `formValues` in custom validation rules.
- Fixes a bug in the `date` validation rule that incorrectly parsed some dates ending in zero.
- Fixes a bug that prevented models being initially set to `Number 0`.

## v2.4.2 - July 1, 2020

- Adds [new `optional` validation](/guide/validation/#optional) rule that allows allows fields to only run validation if they have a value.
- Fixes a bug where `context.hasValue` was `false` when forms seeded a `Number 0` to a `<FormulateInput>`.
- Fixes a bug where `<FormulateInput>` emitted the `@input` event before the form model was updated.
- Fixed a bug where an empty string was parsed as a validation rule.

## v2.4.1 - June 22, 2020

- Adds support for Polish language 🇵🇱.
- Updates Korean translation removing generic particles.

## v2.4.0 - June 17, 2020

Vue Formulate `2.4.0` is another significant update with some much-anticipated
features:

- Full [class customization](/guide/theming/customizing-classes/) 🎨
  - Includes a robust system for customizing classes on [every DOM element](/guide/theming/customizing-classes/#element-keys).
  - Customize classes based on the [state of an input](/guide/theming/customizing-classes/#class-keys) (ex `hasValue`).
  - Allows for easy customization globally or inline, making it compatible with utility frameworks like [tailwind css](https://tailwindcss.com/).
- Adds a robust [schema for form generation](/guide/forms/generating-forms/#generating-forms) 🤖
  - Supports any external components
  - Supports HTML elements
  - Supports element nesting
- Adds support for programmatic form submission using [named forms](/guide/forms/#named-forms).
- Adds support for custom [`slotProps`](/guide/inputs/slots/#declaring-slot-props), top-level props that can be passed into your custom slot components.

## v2.3.8 - June 9, 2020

- Fixes a bug that could cause two identical `@input` events to be fired from a `FormulateInput`.

## v2.3.7 - June 7, 2020

- Adds support for Hebrew language 🇮🇱.

## v2.3.6 - June 4, 2020

- Fixes a bug that caused `formValues` in custom validation messages to be corrupted.

## v2.3.5 - June 4, 2020

- Adds automatic dependency tracking to validation rules that access other form values.

**Example:** A validation rule that ensures `Field C` is equal to the sum of field `Field A` and `Field B`.

The above validation rule would sum values of `A` and `B` and compare equality to `C`. Previously this worked when editing `C`, but if you updated `A` or `B` without touching `C` it would not re-run the validation on `C`. This resulted in bug-like behavior in validation rules like [`confirm`](/guide/validation/#confirm). This version ensures the dependencies of the rule are automatically tracked and validation is re-triggered on any dependent fields.

## v2.3.4 - June 2, 2020

- Adds `rootEmit` to the context object to allow custom inputs to trigger events.
- Adds `data-has-value` attribute to root wrapper when inputs have values.
- Adds `hasValue` attribute to the context object.
- Fixes a css bug causing `box` inputs to have their internal box visible on super wide screens.
- Adds polish diacritic characters to `alpha` and `alphanumeric` rules.

## v2.3.3 - May 20, 2020

- Adds support for Spanish language 🇨🇺.

## v2.3.2 - May 20, 2020

- Adds support for Russian language 🇷🇺.

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
