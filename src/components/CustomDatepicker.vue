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
        <article v-for="weekday in weekdayLabels">
          {{ weekday }}
        </article>
      </div>
      <div class="cd-days">
        <article v-for="day,i in daysConstructor" :key="i" :class="{disabled:!day.currentMonth}">
          {{ day.num }}
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
      weekdayLabels: ['m', 't', 'w', 't', 'f', 's', 's']
    }
  },
  computed: {
    firstDayWeekday() {
      return moment(this.currentMoment).date(1).day() - 1
    },
    daysConstructor() {
      const firstDayOffset = moment(this.currentMoment).date(1).day() - 2,
            prevMonth = moment(this.currentMoment).add(-1, 'months'),
            daysInCurrentMonth = moment(this.currentMoment).endOf('month').date(),
            daysInPrevMonth = prevMonth.endOf('month').date()

            
      let days = [],
          currentDay = firstDayOffset >= 0 ? daysInPrevMonth - firstDayOffset : (firstDayOffset == -2 ? daysInPrevMonth - 5 : 1),
          prevMonthPassed = firstDayOffset < 0 && firstDayOffset !== -2,
          currentMonthPassed = false

      debugger;

      for (let i = 0; i < 42; i++) {
        const dayObj = { num:currentDay, currentMonth:(prevMonthPassed && !currentMonthPassed) }
        days.push(dayObj)
        if (prevMonthPassed) {
          if (currentDay >= daysInCurrentMonth) {
            currentDay = 1
            currentMonthPassed = true;
          } else {
            currentDay += 1
          }
        } else {  
          if (currentDay >= daysInPrevMonth) {
            currentDay = 1
            prevMonthPassed = true;
          } else {
            currentDay += 1
          }
        }
      }
      return days
    }
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
  }
}
</style>
