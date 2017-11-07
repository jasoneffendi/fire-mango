<template>
  <div>
    <h1>Fire-mango</h1>
    <button v-if="dead !== ''" id='start' @click="regrow">Grow another Mango</button>
    <h2>{{status}}</h2>
    <h3>{{dead}}</h3>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'mango',
  data () {
    return {
      status: '',
      dead: ''
    }
  },
  methods: {
    ...mapActions([
      'liveGrow'
    ]),
    getStatus () {
      this.$db.on('value', (mango) => {
        this.status = mango.val().status
        this.dead = mango.val().stopMessage
      })
    },
    regrow () {
      var button = document.getElementById('start')
      console.log(button)
      // button.style.display = 'none'
      this.$db.set({ status: '', dead: '' })
      this.liveGrow()
    }
  },
  mounted () {
    this.getStatus()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
</style>
