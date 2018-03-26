// api sources digitale delta
import {
  apisources
} from './apisources.js'

// app instance
export default {
  data () {
    return {
      selected: ''
    }
  },
  computed: {
    selection: function () {
      var ids = []
      apisources.forEach((src) => {
        ids.push(src.id)
      })
      return ids
    }
  },
  name: 'App',
  components: {
  }
}
