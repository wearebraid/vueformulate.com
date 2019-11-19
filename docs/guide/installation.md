# Installation

## NPM
```sh
npm install vue-formulate --save
```

## Yarn

```sh
yarn add vue-formulate
```

## Direct download

Or if you don’t have a build process on your application you can download
the repository and manually link to the minified version:



```html
<script src="/vue-formulate/dist/formulate.min.js"></script>
```

::: warning
While you can use Vue Formulate via direct download, it is not recommended and
the rest of the documentation will assume you’re in a context that supports
ES2015.
:::

## Add to Vue

Once Vue Formulate has been downloaded you need to install it with Vue.

```js
import Vue from 'vue'
import VueFormulate from 'vue-formulate'

Vue.use(VueFormulate)
```

If you need custom configuration options, you can pass a second argument with
an object of [configuration options](/configuration).

```js
Vue.use(VueFormulate, options)
```
