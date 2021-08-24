# Theming

Vue Formulate is completely agnostic about the styling you choose to apply to
your form inputs, but has been intentionally designed to be easy to write
styles for. Vue Formulate provides functionality for each of the major
ingredients in theming, including:

- [Customizing classes](/guide/theming/customizing-classes) (since 2.4)
- [Changing DOM structure](/guide/inputs/slots) (since 2.3)
- [Writing custom styles](/guide/theming/styling-tips)

## Default theme

By default, the package contains the SCSS and compiled CSS for a single theme
(named "snow"). It’s the one you see on this documentation site. You can import
the SCSS directly into your own SCSS, or just use the minified CSS directly.

#### Import the SCSS

```scss
// scss/main.scss
@import '../node_modules/@braid/vue-formulate/themes/snow/snow.scss';
```

#### Customize the theme
The theme's [SCSS variables](https://github.com/wearebraid/vue-formulate/blob/master/themes/snow/_variables.scss) can be configured like this:

```scss
@use '../node_modules/@braid/vue-formulate/themes/snow/snow.scss' with (
  $formulate-dark: #111111,
  $formulate-white: #eeeeee
)
```

::: warning Warning
Theme customization relies on [configuring modules](https://sass-lang.com/documentation/variables#configuring-modules), which is currently supported only by `Dart Sass`.
:::

#### CSS File

The distribution of the snow theme is available in the repository for download
and inclusion.

[View CSS on Github](https://github.com/wearebraid/vue-formulate/blob/master/dist/snow.min.css)

## Contributing themes

We would love to see community contributed themes for Vue Formulate! If you’ve
create a your own masterpiece — please share it by [opening an issue](https://github.com/wearebraid/vue-formulate/issues/new?assignees=&labels=feature+request&template=feature_request.md&title=I%E2%80%99d%20like%20to%20contribute%20a%20theme!) on github
to let us know about it and we may list it on this documentation page.

## Specimen page

Vue Formulate includes a specimen page of every input type for use in styling
and theming. To use it first clone Vue Formulate, install, and run dev:

```sh
git clone git@github.com:wearebraid/vue-formulate.git
npm install
npm run dev
```

Open the provided URL in the browser and you should see each input type broken
out by its classification.

![Screenshot of all inputs by classification](./specimen.png)
