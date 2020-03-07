/**
 * App level enhancements. Read more here:
 * https://vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */
import VueFormulate from '@braid/vue-formulate'
import { de } from '@braid/vue-formulate-i18n'
import pageComponents from '@internal/page-components'
import Autocomplete from './Autocomplete'
import '../../node_modules/@braid/vue-formulate/themes/snow/snow.scss'

export default ({ Vue }) => {
  Vue.use(VueFormulate, {
    plugins: [ Autocomplete, de ],
    locale: 'de'
  })
  for (const [name, component] of Object.entries(pageComponents)) {
    Vue.component(name, component)
  }
}
