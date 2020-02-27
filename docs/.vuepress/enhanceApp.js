/**
 * App level enhancements. Read more here:
 * https://vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */
import VueFormulate from '@braid/vue-formulate'
import pageComponents from '@internal/page-components'
import MyFormulateAutocomplete from './components/MyFormulateAutocomplete'
import '../../node_modules/@braid/vue-formulate/themes/snow/snow.scss'

export default ({ Vue }) => {
  Vue.use(MyFormulateAutocomplete)

  Vue.use(VueFormulate, {
    library: {
      autocomplete: {
        classification: 'text',
        component: 'MyFormulateAutocomplete'
      }
    }
  })
  for (const [name, component] of Object.entries(pageComponents)) {
    Vue.component(name, component)
  }
}
