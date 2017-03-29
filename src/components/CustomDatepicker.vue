<template>
  <div class="cd-wrapper">
    <header>
      <svg width="30" height="30" viewBox="0 0 1792 1792" @click="incrementMonth(-1)">
        <path fill="#ffffff" d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z" />
      </svg>
      <div>{{ currentMoment.format('MMMM Y') }}</div>
      <svg width="30" height="30" viewBox="0 0 1792 1792" @click="incrementMonth(1)">
        <path fill="#ffffff" d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z" />
      </svg>
    </header>
    <section>
      <div class="cd-weekdays">
        <span v-for="weekday in weekdays">
          {{ weekday }}
        </span>
      </div>
<!--       <div class="day" v-for="day,index in dayList" :key="index" @click="checkDay(day)" :class="{'checked':day.checked,'unavailable':day.unavailable,'passive-day': !(day.inMonth)}" :style="day.checked ? (option.color && option.color.checkedDay ? { background: option.color.checkedDay } : { background: '#F50057' }) : {}">
        {{day.value}}
      </div> -->
    </section>
    <footer>
 <!--      <span @click="showInfo.check=false">{{option.buttons? option.buttons.cancel : 'Cancel' }}</span>
      <span @click="picked">{{option.buttons? option.buttons.ok : 'Ok'}}</span> -->
    </footer>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  name: 'custom-datepicker',
  props: {
    // date: {
    //   type: Object,
    //   required: true
    // },
    // settings: {
    //   type: Object,
    //   default() {
    //     return {
          
    //     }
    //   }
    // }
  },
  data() {
    return {
      currentMoment: moment(),
      weekdays: ['m', 't', 'w', 't', 'f', 's', 's']
    }
  },
  computed: {

  },
  methods: {
    incrementMonth(num) {
      this.currentMoment = moment(this.currentMoment).add(num, 'months')
    }
  }
}
</script>
<style lang="scss">
.cd-wrapper {
  width: 400px;
  display: block;
  margin: auto;
  border-radius: 2px;
}

.cd-weekdays {
  display: flex;
  justify-content: space-between;
  padding: 15px 25px;
  text-transform: uppercase;
  background: rgb(9, 24, 188);
  color: white;
}

header {
  background: #0012ee;
  color: white;
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > svg {
    cursor: pointer;
  }
}
</style>
