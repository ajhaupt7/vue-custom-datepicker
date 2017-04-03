<template>
  <div class="cd-wrapper" :style="wrapperStyles">
    <div class="cd-body-wrapper">
      <header :style="allHeaderStyles">
        <button>
          <figure class="chevron left" @click="incrementMonth($event, -1)"></figure>
        </button>
        <article>
          <span>{{ displayDate.format('MMMM') }}</span> <span>{{ displayDate.format('Y') }}</span>
        </article>
        <button>
          <figure class="chevron right" @click="incrementMonth($event, 1)"></figure>
        </button>
      </header>
      <section>
        <div class="cd-weekdays" :style="allWeekdayStyles">
          <article v-for="weekday in weekdayLabels">
            {{ weekday }}
          </article>
        </div>
        <div class="cd-days" :style="bodyStyles">
          <button 
            v-for  = "day,i in daysTest" 
            :key   = "i" 
            :style = "dayStyle(day)"
            :class = "{ disabled: day.disabled, active: day.active }"
            @click = "selectDate($event, day)"
          >
            <span>{{ day.format('D') }}</span>
            <figure :style="{ background: activeDateBackgroundColor }"></figure>
          </button>
        </div>
      </section>
<!--  May add support for modals later     
      <footer>
        <button>
          <svg viewBox="0 0 800 800">
            <path d="M274.9 279l242 242m8.1-242L283 521" class="st0" style="stroke:#e00202"/>
          </svg>
          <figure></figure>
        </button>
        <button>
          <svg viewBox="0 0 800 800">
            <path d="M578.5 235.5l-237 302m-80-112l80 112" class="st0" style="stroke:#26c14a"/>
          </svg>
          <figure></figure>
        </button>
      </footer> -->
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import {shadeColor} from './helpers'

export default {
  name: 'custom-datepicker',
  props: {
    initialDate: {
      type: String,
      default() {
        return moment()
      }
    },
    primaryColor: {
      type: String,
      default() {
        return "#ff5a5f"
      }
    },
    primaryTextColor: {
      type: String,
      default() {
        return "white"
      }
    },
    wrapperStyles: {
      type: Object,
      default() {
        return {
          width: '350px'
        }
      } 
    },
    headerBackgroundColor: {
      type: String,
      default() {
        return this.primaryColor
      }
    },
    headerTextColor: {
      type: String,
      default() {
        return this.primaryTextColor
      }
    },
    headerStyles: {
      type: Object
    },
    weekdayBackgroundColor: {
      type: String,
      default() {
        return shadeColor(this.primaryColor, 0.15)
      }
    },
    weekdayTextColor: {
      type: String,
      default() {
        return this.primaryTextColor
      }
    },
    weekdayStyles: {
      type: Object
    },
    bodyStyles: {
      type: Object,
      default() {
        return {
          background: "white",
          color: "black"
        }
      }
    },
    activeDateBackgroundColor: {
      type: String,
      default() {
        return this.primaryColor
      }
    },
    activeDateTextColor: {
      type: String,
      default() {
        return this.primaryTextColor
      }
    },
    todayTextColor: {
      type: String,
      default() {
        return this.primaryColor
      }
    }
  },
  data() {
    return {
      displayDate: moment(this.initialDate),
      selectedDate: moment(this.initialDate),
      today: moment(),
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
          disabled: dayMoment.month() !== this.displayDate.month(),
          active: dayMoment.format('YYYY-MM-DD') === moment(this.selectedDate).format('YYYY-MM-DD'),
          today: dayMoment.format('YYYY-MM-DD') === this.today.format('YYYY-MM-DD')
        }
        
        const dayObj = Object.assign(dayMoment, properties)
        days.push(dayObj)
        currentDay.add(1, 'days')
      }
      return days
    },
    allHeaderStyles() {
      return Object.assign({
        background: this.headerBackgroundColor,
        color: this.headerTextColor,
      }, this.headerStyles)
    },
    allWeekdayStyles() {
      return Object.assign({
        background: this.weekdayBackgroundColor,
        color: this.weekdayTextColor,
      }, this.weekdayStyles)
    }
  },
  methods: {
    incrementMonth(e, num) {
      this.displayDate = moment(this.displayDate).add(num, 'months')
    },
    selectDate(e, day) {
      if (!day.disabled) this.selectedDate = day
      this.$emit('dateSelected', this.selectedDate.format('YYYY-MM-DD'))
    },
    dayStyle(day) {
      let styles = {}
      if (day.today) styles = { color: this.todayTextColor }
      if (day.active) styles = { color: this.activeDateTextColor }

      return styles
    }
  }
}
</script>
<style lang="css">
.cd-wrapper {
  width: 350px;
  display: block;
  margin: auto;
  font-family: inherit;
}

.cd-body-wrapper {
  overflow: hidden;
  border-radius: 2px;
}

.cd-weekdays {
  text-transform: uppercase;
  background: #ff7478;
  color: white;
}

header {
  background: #ff5a5f;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 1em;
  text-align: center;
  position: relative;
}
header > article > span:first-child {
  font-weight: bold;
}
header > button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  margin: 0;
  height: 25px;
  width: 25px;
}
header > button:first-child {
  left: 25px;
}
header > button:last-child {
  right: 25px;
}

.cd-days, .cd-weekdays {
  padding: 5px 15px;
  display: flex;
  flex-wrap: wrap;
}
.cd-days > article, .cd-days button, .cd-weekdays > article, .cd-weekdays button {
  flex-basis: 14.28571%;
  flex-grow: 1;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  height: 40px;
  padding: 0;
  line-height: 40px;
  vertical-align: middle;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  position: relative;
}

.cd-weekdays {
  font-size: 0.9em;
  font-weight: bold;
}
.cd-weekdays > article {
  cursor: default;
}

.cd-days {
  font-size: 0.8em;
}
.cd-days > button > span {
  position: relative;
  z-index: 10;
}
.cd-days > button > figure {
  transition: transform 300ms cubic-bezier(0.6, 0.18, 0.42, 1.25) 10ms, opacity 50ms cubic-bezier(0.23, 1, 0.32, 1);
  display: block;
  margin: auto;
  width: 35px;
  height: 35px;
  background: #ff5a5f;
  border-radius: 100%;
  border: none;
  position: absolute;
  top: 50%;
  left: 47.5%;
  transform: translate3d(-50%, -50%, 0) scale(0.4);
  opacity: 0;
}
.cd-days > button.disabled {
  opacity: 0.4;
  cursor: default;
}
.cd-days > button.active {
  color: white;
}
.cd-days > button.active > figure {
  background: #ff5a5f;
  transform: translate3d(-50%, -50%, 0) scale(1);
  opacity: 1;
}
.cd-days > button:hover:not(.active):not(.disabled) {
  color: white;
}
.cd-days > button:hover:not(.active):not(.disabled) > figure {
  transform: translate3d(-50%, -50%, 0) scale(1);
  opacity: 0.6;
}
.cd-days > button.today:not(.active) {
  color: #ff5a5f;
}

.chevron::before {
  border-style: solid;
  border-width: 0.05em 0.05em 0 0;
  content: '';
  display: inline-block;
  height: 0.5em;
  width: 0.5em;
  left: 0;
  position: relative;
  top: 0;
  transform: rotate(-45deg);
  vertical-align: top;
}

.chevron.right:before {
  transform: rotate(45deg);
}

.chevron.bottom:before {
  transform: rotate(135deg);
}

.chevron.left:before {
  transform: rotate(-135deg);
}

button {
  box-sizing: content-box;
  color: inherit;
  cursor: default;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  white-space: pre;
  background: none;
  border: 0;
  color: inherit;
  font: inherit;
  line-height: normal;
  overflow: visible;
  padding: 0;
}
button:active, button:focus {
  outline: none;
}

button > figure {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 100%;
}
button > figure:after {
  background: rgba(0, 0, 0, 0.15);
  content: "";
  width: 100%;
  height: 100%;
  display: block;
  border-radius: inherit;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  visibility: hidden;
}
button:focus > figure:after, button:active > figure:after {
  animation: pulse 500ms ease-in-out forwards;
}

@keyframes pulse {
  0% {
    visibility: visible;
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
  100% {
    visibility: visible;
    opacity: 0;
    transform: scale3d(1.4, 1.4, 1);
  }
}
figure {
  margin: 0;
}

footer button {
  position: relative;
  cursor: pointer;
}
footer figure {
  position: absolute;
  top: 0;
  left: 0;
}
footer svg, footer figure {
  width: 50px;
  height: 50px;
}
footer svg .st0, footer figure .st0 {
  fill: none;
  stroke: #000000;
  stroke-width: 35;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
}

</style>
