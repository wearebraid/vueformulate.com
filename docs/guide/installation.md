# Installation
The preferred way to use Vue Formulate is to install via your preferred JavaScript
package manager.

## NPM
```sh
npm install vue-formulate --save
```

## Yarn
```sh
yarn add vue-formulate
```

## Direct download
Alternatively, if you don’t have a build process on your application you can
download the repository and manually link to the minified version:

```html
<script src="/vue-formulate/dist/formulate.min.js"></script>
```

::: warning
While you can use Vue Formulate via direct download, it is not recommended.
The remainder of the documentation assumes that you are developing in a context
that supports ES2015. In the event you do not have a build process that provides
backwards support you will need to modify the syntax of the documentation to suit
the specifics of your environment.
:::

## Add to Vue
Once Vue Formulate has been downloaded you need to install it with Vue.

```js
import Vue from 'vue'
import VueFormulate from 'vue-formulate'

Vue.use(VueFormulate)
```

If you need custom configuration options, you can pass a second argument with
an object of [configuration options](/guide/configuration/).

```js
Vue.use(VueFormulate, options)
```
