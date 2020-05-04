<template>
  <header class="navbar">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />

    <RouterLink
      :to="$localePath"
      class="home-link"
    >
      <img
        v-if="$site.themeConfig.logo"
        class="logo"
        :src="$withBase($site.themeConfig.logo)"
        :alt="$siteTitle"
      >
      <span
        v-if="$siteTitle"
        ref="siteName"
        class="site-name"
        :class="{ 'can-hide': $site.themeConfig.logo }"
      >{{ $siteTitle }}</span>
    </RouterLink>

    <div
      class="links"
      :style="linksWrapMaxWidth ? {
        'max-width': linksWrapMaxWidth + 'px'
      } : {}"
    >
      <AlgoliaSearchBox
        v-if="isAlgoliaSearch"
        :options="algolia"
      />
      <SearchBox v-else-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false" />
      <a
        class="subscribe-button"
        @click.prevent.stop="toggleShowSubscribeBox"
      >
        <span class="label">Subscribe</span>

        <transition name="slide-in">
          <SubscribeBox
            v-if="showSubscribeBox"
            @close="closeSubscribeBox"
            @click.native.stop="() => true"
            class="subscribe-box-container"
          />
        </transition>
      </a>
      <NavLinks class="can-hide" />
    </div>
  </header>
</template>

<script>
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import SidebarButton from '@theme/components/SidebarButton.vue'
import NavLinks from '@theme/components/NavLinks.vue'
import SubscribeBox from './SubscribeBox.vue'

export default {
  name: 'Navbar',

  components: {
    SidebarButton,
    NavLinks,
    SearchBox,
    AlgoliaSearchBox,
    SubscribeBox
  },

  data () {
    return {
      linksWrapMaxWidth: null,
      showSubscribeBox: false
    }
  },

  computed: {
    algolia () {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
    },

    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    }
  },

  methods: {
    toggleShowSubscribeBox () {
      this.showSubscribeBox = !this.showSubscribeBox
    },
    closeSubscribeBox () {
      console.log('close event')
      this.showSubscribeBox = false
    }
  },

  mounted () {
    const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
    const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'))
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth = this.$el.offsetWidth - NAVBAR_VERTICAL_PADDING
          - (this.$refs.siteName && this.$refs.siteName.offsetWidth || 0)
      }
    }
    handleLinksWrapWidth()
    window.addEventListener('resize', handleLinksWrapWidth, false)
  }
}

function css (el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="scss" scoped>
$accentColor: #3eaf7c;

.slide-in-enter-active, .slide-in-leave-active {
  transition: all 0.2s cubic-bezier(0.39, 0.575, 0.565, 1);
  margin-top: 0;
}
.slide-in-enter, .slide-in-leave-to {
  opacity: 0;
  margin-top: -5px;
}

.subscribe-button {
  cursor: pointer;
  position: relative;
  display: inline-block;
  font-size: 1.2rem;
  color: #fff;
  background-color: $accentColor;
  padding: 0.33rem 0.75rem;
  border-radius: 4px;
  font-weight: normal;
  line-height: 1.7;
  font-size: 0.9rem;
  margin-left: 1.5em;
  transition: background-color .1s ease;
  box-sizing: border-box;
  border-bottom: 1px solid darken($accentColor, 10%);
  z-index: 3;

  @media (min-width: 720px) {
    margin-left: -0.25em;
    margin-right: 1.5em;
  }

  &:hover {
    background-color: lighten($accentColor, 10%);
  }

  .subscribe-box-container {
    position: absolute;
    top: 100%;
    right: -1em;
    max-width: 300px;

    @media (min-width: 720px) {
      right: 50%;
      transform: translateX(50%);
    }
  }
}
</style>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem

.navbar
  padding $navbar-vertical-padding $navbar-horizontal-padding
  line-height $navbarHeight - 1.4rem
  a, span, img
    display inline-block
  .logo
    height $navbarHeight - 1.4rem
    min-width $navbarHeight - 1.4rem
    margin-right 0.8rem
    vertical-align top
  .site-name
    font-size 1.3rem
    font-weight 600
    color $textColor
    position relative
  .links
    padding-left 1.5rem
    box-sizing border-box
    background-color white
    white-space nowrap
    font-size 0.9rem
    position absolute
    right $navbar-horizontal-padding
    top $navbar-vertical-padding
    display flex
    .search-box
      flex: 0 0 auto
      vertical-align top

@media (max-width: $MQMobile)
  .navbar
    padding-left 4rem
    .can-hide
      display none
    .links
      padding-left 1.5rem
    .site-name
      width calc(100vw - 9.4rem)
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
</style>
