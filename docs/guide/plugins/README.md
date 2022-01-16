# Plugins

Plugins are just simple functions that are given access to the Vue Formulate
instance and can extend it. This is most helpful if you want to codify your own
[custom validation rules](/guide/validation/#custom-validation-rules),
[messages](/guide/validation/#customize-validation-messages) or
[inputs](/guide/inputs/custom-inputs/).

## Community plugins

This is a short list of community created plugins, add your
own to this list by [editing this page](https://github.com/wearebraid/vueformulate.com/edit/master/docs/guide/plugins/README.md):

- [`vue-formulate-datetime`](https://www.npmjs.com/package/@cone2875/vue-formulate-datetime) — Vue Formulate support for [vue-datetime](https://github.com/mariomka/vue-datetime)
- [`vue-formulate-select`](https://www.npmjs.com/package/@cone2875/vue-formulate-select) — Vue Formulate support for [vue-select](https://vue-select.org/)
- [`vue-formulate-extended`](https://www.npmjs.com/package/vue-formulate-extended) — Extend and adds various features to Vue Formulate.
- [`vue-formulate-star-rating`](https://www.npmjs.com/package/vue-formulate-star-rating) — Vue Formulate support for [vue-star-rating](https://www.npmjs.com/package/vue-star-rating)
- [`vue-formulate-datepicker`](https://www.npmjs.com/package/vue-formulate-datepicker) — Vue Formulate support for [@sum.cumo/vue-datepicker](https://www.npmjs.com/package/@sum.cumo/vue-datepicker)
- [`vue-formulate-currency`](https://www.npmjs.com/package/vue-formulate-currency) — Vue Formulate support for [vue-numeric](https://www.npmjs.com/package/vue-numeric)

## Creating a new plugin

Plugins are just functions that are passed to Vue Formulate when registering and
are then called upon instantiation.

### Simple example

```js
import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'

// Our first plugin
function myFirstPlugin (instance) {
  // Add a new validation rule
  instance.extend({
    rules: {
      foobar: ({ value }) => ['foo', 'bar'].includes(value)
    }
  })
}

Vue.use(VueFormulate, {
  plugins: [ myFirstPlugin ]
})

```

#### The `extend` method

The instance of Vue Formulate passed to your plugin contains an `extend` method
that recursively extends the instance configuration options. This can be used
to overwrite and add any configuration options.

#### Example autocomplete plugin

A common use case for a plugin is to re-use custom inputs, so as an example lets
create a plugin that exposes the autocomplete input from the [custom inputs
documentation page](/guide/inputs/custom-inputs/#custom-types).

```js
// file: Autocomplete.js
import MyFormulateAutocomplete from './components/MyFormulateAutocomplete'

export default function (formulateInstance) {
  formulateInstance.extend({
    components: {
      MyFormulateAutocomplete
    },
    library: {
      autocomplete: {
        classification: 'text',
        component: 'MyFormulateAutocomplete'
      }
    }
  })
}
```

:::tip Note
In the above code, we use Vue Formulate to register our component by adding it to
the `components` object. This is a convenience, but you are not required to
register the component with Vue Formulate as long as it’s been globally
registered.
:::

```js
// index.js (or where you add your vue plugins)
import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'
import Autocomplete from './Autocomplete'

Vue.use(VueFormulate, {
  plugins: [ Autocomplete ]
})

```

Of course, the above code could also be bundled up into a tidy `npm` package
and published for public consumption.

