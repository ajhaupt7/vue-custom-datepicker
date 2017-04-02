<template>
  <div id="app">
    <h2>{{ selectedDate }}</h2>
    <custom-datepicker 
      @dateSelected     = "setDate($event)"
      :initialDate      = "selectedDate" 
      :primaryColor     = "primaryColor"
      :primaryTextColor = "primaryTextColor"
      :todayTextColor   = "todayTextColor"
      :activeDateTextColor   = "activeDateTextColor"
      :activeDateBackgroundColor = "activeDateBackgroundColor"
      :modal = "modal"
      :modalActive = "modalActive"
    />
  </div>
</template>

<script>
import CustomDatepicker from './components/CustomDatepicker.vue'
export default {
  name: 'app',
  components: { CustomDatepicker },
  data () {
    return {
      selectedDate: "2017-04-15",
      wrapperStyles: { width: '325px' },
      primaryColor: "#fff",
      primaryTextColor: "black",
      todayTextColor: "#0918bc",
      activeDateTextColor: "#fff",
      activeDateBackgroundColor: "#0918bc",
      modal: true,
      modalActive: false
    }
  },
  methods: {
    setDate(date) {
      this.selectedDate = date
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Cabin', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
