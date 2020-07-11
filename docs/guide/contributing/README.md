# Contributing

## Emotional support 😉
Vue Formulate is an open source effort and a way to give back to the
Vue community. Vue Formulate will always be **free** and **open source**. If you want to
support the project but don't have the time to contribute to the codebase — consider
throwing us a github star, following the core maintainers on Twitter, or otherwise helping
us build our platform to get the word out about Vue Formulate.

<github-button
  href="https://github.com/wearebraid/vue-formulate"
  data-icon="octicon-star"
  data-size="large"
  data-show-count="true"
  aria-label="Star wearebraid/vue-formulate on GitHub"
>
  <p>Star</p>
</github-button>

### Core Maintainers
**Justin Schroeder** - [@jpschroeder](https://twitter.com/jpschroeder)<br>
**Andrew Boyd** - [@BoydDotDev](https://twitter.com/BoydDotDev)

### Contributors

![Vue Formulate Contributors](https://opencollective.com/vue-formulate/contributors.svg?width=750&button=false)

Want to contribute Vue Formulate? You can join the [list of users](https://github.com/wearebraid/vue-formulate/graphs/contributors)
helping build Vue Formulate through in the following ways:

## Answer questions

This is a great way for people of any skill level to contribute. As Vue
Formulate continues to grow in usage, we're hoping to see people jump in
and help others out who might have questions. [Checkout the community page](/guide/community/)
to see some places where you can find people looking for help.

## Feature requests & bug reports

Head over to the [community page](/guide/community/#github-issues-bugs-and-features)
to review guidelines for submitting feature requests and bug reports.

## Pull requests

Pull requests to address bug fixes or feature requests are greatly appreciated.
If you're looking to add support for a new language or modify the available
languages, please [read the Internationalization](#Internationalization) section
below. Other core feature pull requests should be made to the primary repository.

## Documentation

Find a typo in our documentation? Or have a better way of explaining a
concept? Awesome! The documentation lives in a [separate repository](https://github.com/wearebraid/vueformulate.com).
You can easily submit pull requests to it by clicking the “Help improve this page”
button at the bottom of every page.

#### Language support

We’re looking for people to translate these documentation pages! It’s no small
task and would require a higher level of coordination, but if you are a native
speaker with a good grasp of technical english and are willing to contribute
your time to translate this documentation, please [get in touch](mailto:hello@wearebraid.com)!

## Internationalization

All of the locales for Vue Formulate (2.2.0 and later) are stored in the
`@braid/vue-formulate-i18n` package which can be found on [Github here](https://github.com/wearebraid/vue-formulate-i18n).
This is a separate repository to allow for better tree-shaking and bundler
support without needing to include all the locales in the core package.

#### New locales

Adding additional translations of Vue Formulate (currently this is
only validation messages) is a great way to contribute! To create a new locale,
fork the `@braid/vue-formulate-i18n` repository then follow these basic steps:

1. Copy the `src/locales/en.js` > `src/locales/xx.js` (these should be named
with the proper [ISO 639-1 tag](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)), and follow the instructions in that file.
2. Copy the `tests/unit/en.js` > `tests/unit/xx.js` and follow the instructions in that file.
3. Add your new locale to the `src/locales.js`.
3. Run `npm install` and then `npm test` to ensure nothing broke.
4. Push your fork back up and create a PR.

We don’t speak your language, so feel free to change and modify the messages to
be as human-friendly to your language and culture as possible. The structure,
grammar, and placement of arguments is allowed to change for each locale. If you
need to add some lightweight helper functions to the `libs/formats.js` file,
thats ok too.

#### Grammar and Typos

Updates to grammar and typos are more than welcome! The package maintainers are
only fluent in English and Italian, so occasionally we may request outside
reviewers to approve grammar changes in other languages before merging.
