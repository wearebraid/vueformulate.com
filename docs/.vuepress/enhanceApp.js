/**
 * App level enhancements. Read more here:
 * https://vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */
import VueFormulate from '@braid/vue-formulate'
import pageComponents from '@internal/page-components'
import '../../node_modules/@braid/vue-formulate/themes/snow/snow.scss'

export default ({ Vue }) => {
  Vue.use(VueFormulate)
  for (const [name, component] of Object.entries(pageComponents)) {
    Vue.component(name, component)
  }
}
