# Internationalization <Badge text="2.2.0+" />

Vue Formulate ships with the english language validation messages pre-installed,
but the Vue community is great, and new translations continue to be submitted.
These localizations are collected in the `@braid/vue-formulate-i18n` package.

## Supported languages

Vue Formulate currently supports these languages:

- 🇪🇬 Arabic (ar)
- 🇩🇰 Danish (da)
- 🇩🇪 German (de)
- 🇺🇸 English (en)
- 🇫🇷 French (fr)
- 🇮🇹 Italian (it)
- 🇯🇵 Japanese (ja)
- 🇧🇷 Portuguese (pt)

When using a right-to-left language like Arabic with the default [snow theme](/guide/theming/#default-theme)
it may be necessary to modify the `direction` css property in your project.

Thanks to all of the locale contributors!

::: tip 💪 Add your language
Vue Formulate needs your help! Help others who speak your language or
localization (`en-US`) by [contributing a new locale](/guide/contributing)!
:::

## Registering a locale

You can register translations just like you would any other Vue Formulate [plugin](/guide/plugins).

```js
import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'
import { de } from '@braid/vue-formulate-i18n'

Vue.use(VueFormulate,  {
  plugins: [ de ]
})
```

If your site needs to support many languages, you can register them all at the same
time.

```js
import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'
import { de, da, fr } from '@braid/vue-formulate-i18n'

Vue.use(VueFormulate,  {
  plugins: [ de, da, fr ]
})
```

### Setting the active locale

#### Explicitly setting the locale

You can explicitly set the `locale` in the options where you install Vue. Doing
this ensures this is the only locale that will be used on the site.

```js
Vue.use(VueFormulate,  {
  plugins: [ de ],
  locale: 'de'
})
```

#### `vue-i18n`

If your site already uses [`vue-i18n`](https://kazupon.github.io/vue-i18n/) you
can leave the `locale` option blank and it will attempt to use the locale that
is currently configured in `vue-i18n`.
