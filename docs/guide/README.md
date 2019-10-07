---
title: Introduction
---

## Introduction

VueFormulate is to be the easiest way to build forms using [Vue](https://vuejs.org/),
but that doesn't mean you have to sacrifice power. Web based forms seem easy to
build at first blush, but as any front end engineer knows they can be get
complicated and are always tedious.

Consider some of the things a single input "field" needs to account for: Markup
for each type (text, textarea, select etc), a label, an initial value when
empty, initial state when pre-populated (like an edit form), help text, field
validation (required, valid email, password confirmation etc), error messages
from front end validation or the backend, data bindings (v-model or events), and
more. Vue Formulate is built to increase developer happiness by making all of
these features as easy as possible.

## Installation

First add Vue Formulate to your project by using `npm` or `yarn`.

### NPM
```sh
npm install vue-formulate --save
```

### Yarn

```sh
yarn add vue-formulate
```

### Direct download

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

### Add to Vue

Once Vue Formulate has been downloaded you need to install it with Vue.

```js
import Vue from 'vue'
import VueFormulate from 'vue-formulate'

Vue.use(VueFormualte)
```

If you need custom configuration options, you can pass a second argument with
an object of [configuration options](/configuration).

```js
Vue.use(VueFormualte, {
  vuex: true,
  vuexNamespace: 'forms',
  theme: 'snow'
})
```

## How it works

Once Vue Formualte is installed, you can start composing your forms, but first
let’s take a look at how Vue Formulate works.

### The `<FormulateInput>` component

Every type of input in Vue Formulate is an instance of the `FormulateInput`
component. This component is used whether you need a text input, password,
select list, checkbox, or date picker — this makes it much easier to remember.

In fact the simplest implementation of Vue Formulate is just out putting a
single `FormulateInput`:

```vue
<FormulateInput
  type="text"
/>
<FormulateInput
  type="textarea"
/>
<FormulateInput
  type="select"
  :options="{value1: 'First Option', value2: 'Second Option'}"
/>
```

<demo-1-inputs />

So creating inputs of any variety is as simple as choosing the value of the
`type` prop. 

::: danger
[TK] Add examples of labels, placeholders, and help text.
:::

### Data bindings

Vue Formulate offers three mechanisms for binding the state of your forms:

1. `v-model` on a `FormualteInput`
2. `v-model` on a `FormulateForm`
3. Using [vuex](https://vuex.vuejs.org/installation.html)


