/**
 * App level enhancements. Read more here:
 * https://vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */
import VueFormulate from '@braid/vue-formulate'
import pageComponents from '@internal/page-components'
import Autocomplete from './Autocomplete'
import GithubButton from 'vue-github-button'
import '../../node_modules/@braid/vue-formulate/themes/snow/snow.scss'

export default ({ Vue }) => {
  Vue.use(VueFormulate, {
    plugins: [ Autocomplete ]
  })
  for (const [name, component] of Object.entries(pageComponents)) {
    Vue.component(name, component)
  }
  Vue.component('github-button', GithubButton)
}
