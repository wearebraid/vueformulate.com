/**
 * App level enhancements. Read more here:
 * https://vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */
import VueFormulate from 'vue-formulate'
import '../../node_modules/vue-formulate/themes/snow/snow.scss'

export default ({ Vue }) => {
  Vue.use(VueFormulate)
}
