<template>
  <aside class="sidebar">
    <NavLinks />

    <slot name="top" />

    <client-only>
      <div :key="$route.path" class="carbon-area">
        <script
          async
          type="text/javascript"
          src="//cdn.carbonads.com/carbon.js?serve=CE7IEKQN&placement=vueformulatecom"
          id="_carbonads_js"
        />
      </div>
    </client-only>

    <SidebarLinks :depth="0" :items="items" />
    <slot name="bottom" />

    <footer class="footer">
      MIT Licensed | A product by:
      <a
        href="https://www.wearebraid.com/"
        target="_blank"
        rel="noopener"
        class="footer-card"
      >
        <img src="/assets/img/braid-logo.png" />
      </a>
    </footer>
  </aside>
</template>

<script>
import SidebarLinks from "@theme/components/SidebarLinks.vue";
import NavLinks from "@theme/components/NavLinks.vue";
import ClientOnly from "vue-client-only";

export default {
  name: "Sidebar",

  components: { SidebarLinks, NavLinks, ClientOnly },

  props: ["items"]
};
</script>

<style lang="stylus">
.sidebar
  ul
    padding 0
    margin 0
    list-style-type none
  a
    display inline-block
  .nav-links
    display none
    border-bottom 1px solid $borderColor
    padding 0.5rem 0 0.75rem 0
    a
      font-weight 600
    .nav-item, .repo-link
      display block
      line-height 1.25rem
      font-size 1.1em
      padding 0.5rem 0 0.5rem 1.5rem
  & > .sidebar-links
    padding 1.5rem 0
    & > li > a.sidebar-link
      font-size 1.1em
      line-height 1.7
      font-weight bold
    & > li:not(:first-child)
      margin-top .75rem

@media (max-width: $MQMobile)
  .sidebar
    .nav-links
      display block
      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after
        top calc(1rem - 2px)
    & > .sidebar-links
      padding 1rem 0
</style>

<style lang="scss" scoped>
.sidebar {
  overflow-x: hidden;
  display: flex;
  flex-direction: column;

  & ::v-deep .new-badge {
    &::after {
      display: inline-block;
      content: "NEW";
      padding: 0.2em 0.5em;
      margin-left: 0.66em;
      line-height: 1;
      color: #fff;
      background: #41b883;
      border: 1px solid #3eaf7c;
      border-radius: 5px;
      font-size: 0.7em;
      font-weight: bold;
    }
  }
  & ::v-deep [data-badge] {
    &::after {
      display: inline-block;
      content: attr(data-badge);
      padding: 0.2em 0.5em;
      margin-left: 0.66em;
      line-height: 1;
      color: #fff;
      background: #41b883;
      border: 1px solid #3eaf7c;
      border-radius: 5px;
      font-size: 0.7em;
      font-weight: bold;
    }
  }

  .footer {
    box-sizing: border-box;
    padding: 5em 1em 2em 2em;
    margin-top: auto;
    width: 100%;
    font-size: 0.8em;
    color: #647d96;

    * {
      box-sizing: inherit;
    }
  }

  .footer-card {
    display: block;
    max-width: 120px;
    width: 90%;
    margin-bottom: 1em;
    margin-top: 1em;
  }
}
</style>
