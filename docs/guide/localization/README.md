# Localization

Show validation messages in your language by installing translations for one of
Vue Formulate's supported languages. You can register translations just like you
would any other Vue Formulate [plugin](/guide/plugins).

```js
import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'
import de from '@braid/vue-formulate/locales/de'

Vue.use(VueFormulate,  {
  plugins: [ de ]
})
```

You can explicitly set the `locale` in the options where you install Vue. Or, if
you have [Vue I18n](https://kazupon.github.io/vue-i18n/) installed on your
project, Formulate will try to set the locale for you.

```js
Vue.use(VueFormulate,  {
  plugins: [ de ],
  locale: "de"
})
```


## Supported languages

Vue Formulate currently supports 3 languages.

- 🇺🇸 English (en)
- 🇫🇷 French (fr)
- 🇩🇪 German (de)

::: tip 💪 Add your language
Vue Formulate needs your help! Help others around the world utilize this package
by creating other translations and submitting a [pull request](https://github.com/wearebraid/vue-formulate/tree/master/src/locales).
:::
