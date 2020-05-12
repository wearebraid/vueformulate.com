<template>
  <main
    class="home"
    aria-labelledby="main-title"
  >
    <header class="hero">
      <img
        v-if="data.heroImage"
        :src="$withBase(data.heroImage)"
        :alt="data.heroAlt || 'hero'"
      >

      <div class="hero-meta">
        <h1
          v-if="data.heroText !== null"
          id="main-title"
        >
          {{ data.heroText || $title || 'Hello' }}
        </h1>

        <p
          v-if="data.tagline !== null"
          class="description"
        >
          {{ data.tagline || $description || 'Welcome to your VuePress site' }}
        </p>

        <p
          v-if="data.actionText && data.actionLink"
          class="action"
        >
          <NavLink
            class="action-button"
            :item="actionLink"
          />
        </p>
      </div>
    </header>

    <div
      v-if="data.features && data.features.length"
      class="features"
    >
      <div
        v-for="(feature, index) in data.features"
        :key="index"
        class="feature"
      >
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.details }}</p>
      </div>

    </div>

    <hr>

    <Content class="theme-default-content custom" />

    <div class="hero">
      <img
        v-if="data.heroImage"
        :src="$withBase(data.heroImage)"
        :alt="data.heroAlt || 'hero'"
      >

      <div class="hero-meta">
        <h1
          v-if="data.heroText !== null"
          id="main-title"
        >
          {{ data.heroText || $title || 'Hello' }}
        </h1>

        <p
          v-if="data.tagline !== null"
          class="description"
        >
          {{ data.tagline || $description || 'Welcome to your VuePress site' }}
        </p>

        <p
          v-if="data.actionText && data.actionLink"
          class="action"
        >
          <NavLink
            class="action-button"
            :item="actionLink"
          />
        </p>
      </div>
    </div>

    <footer class="footer">
      MIT Licensed | A product by <a href="https://www.wearebraid.com/" target="_blank" rel="noopener">Braid</a>
    </footer>
  </main>
</template>

<script>
import { VueLive } from 'vue-live'
import NavLink from '@theme/components/NavLink.vue'

export default {
  name: 'Home',
  components: {
    NavLink,
    VueLive
  },
  computed: {
    data () {
      return this.$page.frontmatter
    },
    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    }
  }
}
</script>

<style lang="stylus">
#app .home
  padding $navbarHeight 2rem 0
  max-width $homePageWidth
  margin 0px auto
  display block
  header.hero
    padding 8em 0 3em 0
  .hero
    display flex
    align-items center
    justify-content center
    text-align left
    padding 5em 0 0 0
    img
      width: 100%
      max-width: 130px
      display block
      margin 0.5em 5em 0 0
    .hero-meta
      margin 0
    h1
      font-size 3rem
      margin 0 0 0.15em 0
      line-height 1
    .description
      max-width 35rem
      font-size 1.6rem
      line-height 1.3
      margin 0 auto 2rem auto
      color lighten($textColor, 40%)
    .action
      margin: 0
      line-height 0
    .action-button
      display inline-block
      font-size 1.2rem
      color #fff
      background-color $accentColor
      padding 0.8rem 1.6rem
      border-radius 4px
      line-height 1.7
      transition background-color .1s ease
      box-sizing border-box
      border-bottom 1px solid darken($accentColor, 10%)
      &:hover
        background-color lighten($accentColor, 10%)
  h3
    color #3eaf7c
    margin-bottom 0
    & + p
      margin-top 0.25em
      color #687288
  .preview-code
    margin-bottom 4em
    &:last-child
      margin-bottom 0
    .token.class-name
      color inherit
    .preview
      background-color #fff
      text-align left
      pre
        background-color #d6dce6
  .theme-default-content
    margin-top 4em
  .features
    border-top 1px solid $borderColor
    padding 1.2rem 0
    margin-top 4.5rem
    display flex
    flex-wrap wrap
    align-items flex-start
    align-content stretch
    justify-content space-between
  .feature
    flex-grow 1
    flex-basis 30%
    max-width 30%
    h2
      font-size 1.4rem
      font-weight 500
      border-bottom none
      padding-bottom 0
      color lighten($textColor, 10%)
    p
      color lighten($textColor, 25%)
  .footer
    margin-top 3em
    padding 2.5rem
    text-align center
    color lighten($textColor, 25%)

@media (max-width: 419px)
  #app .home
    .preview-code
      border 1px solid #ccc
      border-radius: 5px
      margin: 0 -1em 4em -1em
      .editor
        margin: 0
        width: 100%
        overflow auto
      .preview
        width: 100%
        overflow auto

@media (max-width: 568px)
  #app .home
    header.hero
      padding 3em 0 2em 0
    .hero
      flex-direction column
      text-align center
      img
        margin-right 0
        margin-bottom 2em
    .preview-code
      display: flex
      flex-direction column
      .preview
        order: 2
        width: 100%
        overflow auto
      .editor
        order: 1
        width: 100%
        overflow auto

@media (max-width: $MQMobile)
  #app .home
    .features
      flex-direction column
    .feature
      max-width 100%
      padding 0 2.5rem

@media (max-width: $MQMobileNarrow)
  #app .home
    padding-left 1.5rem
    padding-right 1.5rem
    .hero
      img
        max-height 210px
        margin 2rem auto 1.2rem
      h1
        font-size 2rem
      h1, .description, .action
        margin 1.2rem auto
      .description
        font-size 1.2rem
      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem
    .feature
      h2
        font-size 1.25rem
</style>
