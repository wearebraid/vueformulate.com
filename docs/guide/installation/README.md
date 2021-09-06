::: tip A note on Vue 3
Vue Formulate is compatible with Vue 2. The next major version of Vue Formulate will be called FormKit — checkout the announcement and signup for early access at [formkit.com](https://formkit.com).
:::

# Installation
The preferred way to use Vue Formulate is to install via your favorite JavaScript
package manager.

## NPM
```sh
npm install @braid/vue-formulate
```

## Yarn
```sh
yarn add @braid/vue-formulate
```

## Direct download
Alternatively, if your project doesn't have a build process, you can
download the repository and manually link to the minified version:

```html
<script src="/vue-formulate/dist/formulate.min.js"></script>
```
:::tip Note
Due to DOM limitations, when mounting Vue Formulate in DOM templates
(outside of single-file components) all the component names will need to be
[lower-cased, hyphen separated and with a closing tag](https://vuejs.org/v2/style-guide/#Component-name-casing-in-templates-strongly-recommended).

`<FormulateInput />` ⭢ `<formulate-input></formulate-input>`
:::

## CDN

Similar to a direct download, you can load Vue Formulate directly off of a
CDN like [JSDeliver](https://www.jsdelivr.com/package/npm/@braid/vue-formulate?path=dist).

## Add to Vue
Once Vue Formulate has been downloaded you need to install it with Vue.

```js
import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'

Vue.use(VueFormulate)
```

::: tip
When loading Vue Formulate as a commonJS module (think `require()`) it may be
necessary to use `VueFormulate.default` when registering with Vue:

```js
const VueFormulate = require('@braid/vue-formulate')
Vue.use(VueFormulate.default)
```
:::

### Configuration options

If you need custom configuration options, you can pass a second argument with
an object of configuration options.

```js
Vue.use(VueFormulate, options)
```

## Nuxt <Badge text="2.5.1" /> {data-new}
It's easy to use Vue Formulate on Nuxt too. The easiest way to get started with
Vue Formulate on a Nuxt project is to use the included Nuxt module.

```js
// nuxt.config.js
export default {
  buildModules: [
    '@braid/vue-formulate/nuxt'
  ]
}
```

### Nuxt module configuration file

To configure Vue Formulate with additional [plugins](/guide/plugins/),
[locales](/guide/internationalization/), [validation rules](/guide/validation/)
and more you can create a `formulate.config.js` file in the root of
your Nuxt project which will be imported and used by the Vue Formulate Nuxt module.
If you wish to place your configuration file somewhere besides the root of your Nuxt
project, just tell the Nuxt module where it can locate the configuration file using
the `configPath` argument of the `formulate` object in your `nuxt.config.js` file.

```js
// nuxt.config.js
export default {
  formulate: {
    configPath: '~/different/location/of/formulate.config.js'
  }
}
```

Your `formulate.config.js` file should export an object which will be passed to the
Vue Formulate registration via `Vue.use()`.

```js
// formulate.config.js
import { de } from '@braid/vue-formulate-i18n'

export default {
  plugins: [de],
  locale: 'de',
  rules: {
    foobar: ({ value }) => ['foo', 'bar'].includes(value)
  }
}
```

## Styling/theming

If you’d like to use the default theme (the one used in these docs), you can
[easily include that css on your page](/guide/theming/#default-theme). Vue
Formulate is also extremely easy to [theme on your own](/guide/theming/#custom-theme).

## IE11 support

While Internet Explorer 11 is supported polyfills for ES2015 language features
are not included in Vue Formulate. For those who do require IE11 support we
recommend using [polyfill.io](https://polyfill.io/v3/) or similar service to shim
ES2015 features.

```html
<script src="https://polyfill.io/v3/polyfill.min.js?features=es2015"></script>
```
