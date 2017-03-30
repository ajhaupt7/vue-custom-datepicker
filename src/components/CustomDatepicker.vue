<template>
  <div class="cd-wrapper">
  {{ selectedDate.format('YYYY-MM-DD') }}
    <header :style={}>
      <svg width="30" height="30" viewBox="0 0 1792 1792" @click="incrementMonth(-1)">
        <path fill="#ffffff" d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z" />
      </svg>
      <div>{{ displayDate.format('MMMM Y') }}</div>
      <svg width="30" height="30" viewBox="0 0 1792 1792" @click="incrementMonth(1)">
        <path fill="#ffffff" d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z" />
      </svg>
    </header>
    <section>
      <div class="cd-weekdays">
        <article v-for="weekday in weekdayLabels">
          {{ weekday }}
        </article>
      </div>
      <div class="cd-days">
        <article 
          v-for  = "day,i in daysTest" 
          :key   = "i" 
          :class = "{ disabled: day.disabled, 'active-date': activeDate(day) }"
          @click = "selectDate(day)"
        >
          {{ day.format('D') }}
        </article>
      </div>
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
    initialDate: {
      type: String,
      default() {
        return moment()
      }
    },
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
      displayDate: moment(this.initialDate),
      selectedDate: moment(this.initialDate),
      weekdayLabels: ['m', 't', 'w', 't', 'f', 's', 's']
    }
  },
  computed: {
    daysTest() {
      let days = [],
          currentDay = moment(this.displayDate).startOf('month').day(1)

      for (let i = 0; i < 42; i++) {
        const dayMoment = moment(currentDay)
        const properties = {
          disabled: dayMoment.month() !== this.displayDate.month()
        }
        
        const dayObj = Object.assign(dayMoment, properties)
        days.push(dayObj)
        currentDay.add(1, 'days')
      }
      return days
    }
  },
  methods: {
    incrementMonth(num) {
      this.displayDate = moment(this.displayDate).add(num, 'months')
    },
    selectDate(day) {
      this.selectedDate = day
    },
    activeDate(day) {
      return day.format('YYYY-MM-DD') === moment(this.selectedDate).format('YYYY-MM-DD')
    }
  }
}
</script>
<style lang="scss">
.cd-wrapper {
  width: 350px;
  display: block;
  margin: auto;
  border-radius: 2px;
}

.cd-weekdays {
  text-transform: uppercase;
  background: rgb(9, 24, 188);
  color: white;
}

header {
  background: #0012ee;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > svg {
    cursor: pointer;
  }
}

.cd-days, .cd-weekdays {
  padding: 5px 25px;
  > article {
    width: 14.2857143%;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    height: 40px;
    padding: 0;
    line-height: 40px;
    vertical-align: middle;
    &.disabled {
      opacity: 0.4;
      cursor: default;
    }
    &.active-date {
      background: blue;
      border-radius: 100%;
    }
  }
}
</style>
