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

::: warning
When loading Vue Formulate from the minified version or using a commonJS module
environment (think `require()`) it may be necessary to use `VueFormulate.default`
when registering with Vue:

```js
const VueFormulate = require('@braid/vue-formulate')
Vue.use(VueFormulate.default)
```
:::

## Configuration options

If you need custom configuration options, you can pass a second argument with
an object of configuration options.

```js
Vue.use(VueFormulate, options)
```

## IE11 Support

While Internet Explorer 11 is supported polyfills for ES2015 language features
are not included in Vue Formulate. For those who do require IE11 support we
recommend using [polyfill.io](https://polyfill.io/v3/) or similar service to shim
ES2015 features.

```html
<script src="https://polyfill.io/v3/polyfill.min.js?features=es2015"></script>
```
