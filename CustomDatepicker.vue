<template>
  <div class="cd-wrapper" :style="wrapperStyles">
    <div class="cd-body-wrapper">
      <header :style="headerStyles">
        <button>
          <figure class="chevron left" @click="incrementMonth($event, -1)"></figure>
        </button> 
        <article data-transition="month-change">
          <span>{{ displayDate.format('MMMM') }}</span> <span>{{ displayDate.format('Y') }}</span>
        </article>
        <button>
          <figure class="chevron right" @click="incrementMonth($event, 1)"></figure>
        </button>
      </header>
      <section>
        <div class="cd-weekdays" id="cd-day-select" :style="weekdayStyles">
          <article v-for="weekday in weekdayLabels">
            {{ weekday }}
          </article>
        </div>
        <div class="cd-days" :style="bodyStyles" data-transition="month-change">
          <button 
            v-for  = "day,i in daysConstructor" 
            :key   = "i" 
            :style = "dayStyle(day)"
            :class = "calcDayClass(day)"
            @click = "handleSelectDate($event, day)"
          >
            <span>{{ day.format('D') }}</span>
            <figure :style="{ background: activeDateBackgroundColor || primaryColor }"></figure>
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

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function shadeColor(color, luminosity) {
  if (color[0] === 'r') {
    const rgbColor = color.substring(color.indexOf('(') + 1, color.length - 1).split(',');
    color = rgbToHex(parseInt(rgbColor[0]), parseInt(rgbColor[1]), parseInt(rgbColor[2]));
  }
  color = new String(color).replace(/[^0-9a-f]/gi, '');
  if (color.length < 6) {
    color = color[0]+ color[0]+ color[1]+ color[1]+ color[2]+ color[2];
  }
  luminosity = luminosity || 0;

  let newColor = "#", c, i, black = 0, white = 255;
  for (i = 0; i < 3; i++) {
    c = parseInt(color.substr(i*2,2), 16);
    c = Math.round(Math.min(Math.max(black, c + (luminosity * white)), white)).toString(16);
    newColor += ("00"+c).substr(c.length);
  }
  return newColor; 
}

export default {
  props: {
    date: {
      type: null
    },
    dateRangeStart: {
      type: null
    },
    dateRangeEnd: {
      type: null
    },
    dateRange: {
      type: Boolean,
      default() {
        return false
      }
    },
    limits: {
      type: Object,
      default() {
        return {
          start: null,
          end: null
        }
      }
    },
    dateFormat: {
      type: String,
      default() {
        return 'YYYY-MM-DD'
      }
    },
    primaryColor: {
      type: String,
      default() {
        return "#ff5a5f"
      }
    },
    wrapperStyles: {
      type: Object 
    },
    headerStyles: {
      type: Object
    },
    weekdayStyles: {
      type: Object
    },
    bodyStyles: {
      type: Object
    },
    activeDateBackgroundColor: {
      type: String
    },
    activeDateTextColor: {
      type: String,
      default() {
        return 'white'
      }
    },
    todayTextColor: {
      type: String
    }
  },
  data() {
    return {
      displayDate:       this.getInitialDate(this.date),
      selectedDate:      this.getInitialDate(this.date),
      selectedDateStart: this.dateRangeStart ? this.getInitialDateRange(this.dateRangeStart) : null,
      selectedDateEnd:   this.dateRangeEnd ? this.getInitialDateRange(this.dateRangeEnd) : null,
      today:             moment(),
      weekdayLabels:     ['m', 't', 'w', 't', 'f', 's', 's']
    }
  },
  computed: {
    daysConstructor() {
      let days = [],
          currentDay = moment(this.displayDate).startOf('month').day(1)

      for (let i = 0; i < 42; i++) {
        const dayMoment = moment(currentDay)
        const properties = {
          disabled          : this.isDisabled(dayMoment),
          active            : this.isActiveDay(dayMoment),
          activeRangeStart  : this.isActiveRangeDay(dayMoment, true),
          activeRangeEnd    : this.isActiveRangeDay(dayMoment, false),
          withinActiveRange : this.isWithinActiveRange(dayMoment),
          today             : dayMoment.format('MM-DD-YYYY') === this.today.format('MM-DD-YYYY')
        }
        const dayObj = Object.assign(dayMoment, properties)

        days.push(dayObj)
        currentDay.add(1, 'days')
      }
      return days
    }
  },
  methods: {
    getInitialDate(date) {
      return moment(date).isValid() ? moment(date) : moment()
    },
    getInitialDateRange(date, add) {
      const initialDate = moment(date).isValid() ? moment(date) : moment();
      return add ? initialDate.add(add, 'days') : initialDate;
    },
    isActiveDay(dayMoment) {
      const formattedDate = dayMoment.format('MM-DD-YYYY'),
            formattedSelectedDate = moment(this.selectedDate).format('MM-DD-YYYY');

      return formattedDate === formattedSelectedDate && !this.dateRange;
    },
    isActiveRangeDay(dayMoment, isStart) {
      const formattedDate = dayMoment.format('MM-DD-YYYY'),
            formattedDateStart = moment(this.selectedDateStart).format('MM-DD-YYYY'),
            formattedDateEnd = moment(this.selectedDateEnd).format('MM-DD-YYYY');

      const eqSelectedDateStart = formattedDate === formattedDateStart && this.dateRange,
            eqSelectedDateEnd = formattedDate === formattedDateEnd && this.dateRange;

      return isStart ? eqSelectedDateStart : eqSelectedDateEnd;
    },
    isWithinActiveRange(dayMoment) {
      const formattedDate = dayMoment.format('MM-DD-YYYY'),
            formattedDateStart = moment(this.selectedDateStart).format('MM-DD-YYYY'),
            formattedDateEnd = moment(this.selectedDateEnd).format('MM-DD-YYYY'); 

      return dayMoment.diff(moment(this.selectedDateStart), 'days') >= 0 
          && dayMoment.diff(moment(this.selectedDateEnd), 'days') <= 0 
          && this.dateRange
    }, 
    isDisabled(dayMoment) {
      const notWithinLimits = moment(this.limits.start).diff(dayMoment, 'days') > 0
          || moment(this.limits.end).diff(dayMoment, 'days') < 0
      const notCurrentMonth = dayMoment.month() !== this.displayDate.month()

      return notWithinLimits || notCurrentMonth
    },
    calcDayClass(day) {
      return {
        disabled: day.disabled, 
        active: day.active,
        'active-range -start': day.activeRangeStart,
        'active-range -end'  : day.activeRangeEnd,
        'within-active-range': day.withinActiveRange
      }
    },
    incrementMonth(e, num) {
      const transitions = document.querySelectorAll('[data-transition="month-change"]')
      const animation = num > 0 ? 'animate-next' : 'animate-prev'
      transitions.forEach((transition, i) => transition.classList.add(animation))
      setTimeout(() => {
        this.displayDate = moment(this.displayDate).add(num, 'months')
      }, 200);
      setTimeout(() => {
        transitions.forEach(transition => transition.classList.remove(animation))
      }, 400);
    },
    handleSelectDate(e, day) {
      this.dateRange ? this.selectDateRange(e, day) : this.selectDate(e, day);
    },  
    selectDate(e, day) {
      if (!day.disabled) this.selectedDate = day
      this.$emit('dateSelected', this.selectedDate.format(this.dateFormat))
    },
    selectDateRange(e, day) {
      if (day.disabled) { return };
      const dayDiff = day.diff(moment(this.selectedDateStart), 'days');
      if (!this.selectedDateEnd && dayDiff > 0) {
        this.selectedDateEnd = day;
      } else {
        this.selectedDateStart = day;
        this.selectedDateEnd = null;
      }
      const start = this.selectedDateStart ? this.selectedDateStart.format(this.dateFormat) : null,
            end   = this.selectedDateEnd ? this.selectedDateEnd.format(this.dateFormat) : null,
            range = { start: start, end: end };
      this.$emit('dateRangeSelected', range);
    },
    dayStyle(day) {
      let styles = {}
      if (day.today) styles = { color: this.todayTextColor || this.primaryColor }
      if (day.active || day.activeRangeStart || day.activeRangeEnd) styles = { color: this.activeDateTextColor || this.primaryColor }
      if (day.withinActiveRange) styles = { color: this.activeDateTextColor }

      return styles
    }
  }
}
</script>
<style lang="scss" scoped>
$primary_color: #ff5a5f;
$secondary_color: #ff7478;
$white: white;
$black: black;
$black_15: rgba(0, 0, 0, 0.15);

//@extend-elements
%day_styles {
  flex-basis: percentage(1/7);
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
  font-size: 0.9em;
  font-weight: bold;
  padding: 5px 15px;
  display: flex;
  flex-wrap: wrap;
  > article {
    @extend %day_styles;
    cursor: default;
  }
  button {
    @extend %day_styles;
  }
}
header {
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 1em;
  text-align: center;
  position: relative;
  > button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    margin: 0;
    height: 25px;
    width: 25px;
    &:first-child {
      left: 25px;
    }
    &:last-child {
      right: 25px;
    }
  }
  > article {
    > span:first-child {
      font-weight: bold;
    }
  }
}
.cd-days {
  padding: 5px 15px;
  display: flex;
  flex-wrap: wrap;
  font-size: 0.8em;
  > article {
    @extend %day_styles;
  }
  button {
    @extend %day_styles;
  }
  > button {
    > span {
      position: relative;
      z-index: 10;
    }
    > figure {
      transition: transform 300ms cubic-bezier(0.6, 0.18, 0.42, 1.25) 10ms, opacity 50ms cubic-bezier(0.23, 1, 0.32, 1);
      display: block;
      margin: auto;
      width: 35px;
      height: 35px;
      background: $primary_color;
      border-radius: 100%;
      border: none;
      position: absolute;
      top: 50%;
      left: 47.5%;
      transform: translate3d(-50%, -50%, 0) scale(0.4);
      opacity: 0;
    }
    &.disabled {
      opacity: 0.4;
      cursor: default;
    }
    &.active, &.active-range {
      color: $white;
      > figure {
        background: $primary_color;
        transform: translate3d(-50%, -50%, 0) scale(1);
        opacity: 1 !important;
      }
    }
    &.within-active-range:not(.active-range) {
      > figure {
        opacity: 0.6;
        transform: translate3d(-50%, -50%, 0) scale(1);
        border-radius: 2px;
      }
    }
    &.active-range {
      &.-start {
        > figure {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
      }
      &.-end {
        > figure {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
      }
    }
    &:hover:not(.active):not(.disabled) {
      color: $white;
      > figure {
        transform: translate3d(-50%, -50%, 0) scale(1);
        opacity: 0.6;
      }
    }
    &.today:not(.active) {
      color: $primary_color;
    }
  }
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
.chevron {
  &.right:before {
      transform: rotate(45deg);
  }
  &.bottom:before {
      transform: rotate(135deg);
  }
  &.left:before {
      transform: rotate(-135deg);
  }
}
button {
  box-sizing: content-box;
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
  &:active {
    outline: none;
    > figure:after {
      animation: pulse 500ms ease-in-out forwards;
    }
  }
  &:focus {
    outline: none;
    > figure:after {
      animation: pulse 500ms ease-in-out forwards;
    }
  }
  > figure {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    &:after {
      background: $black_15;
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
  }
}
figure {
  margin: 0;
}
footer {
  button {
    position: relative;
    cursor: pointer;
  }
  figure {
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    .st0 {
      fill: none;
      stroke: $black;
      stroke-width: 35;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-miterlimit: 10;
    }
  }
  svg {
    width: 50px;
    height: 50px;
    .st0 {
      fill: none;
      stroke: $black;
      stroke-width: 35;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-miterlimit: 10;
    }
  }
}
* {
  &.animate-next {
    animation: monthChange 400ms cubic-bezier(.66,-0.01,.69,1.23) normal forwards;
  }
  &.animate-prev {
    animation: monthChange 400ms cubic-bezier(.66,-0.01,.69,1.23) reverse forwards;
  }
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
@keyframes monthChange {
  0% {
    opacity: 1;
    transform: translate3d(0,0,0);
  }
  40% {
    opacity: 0;
    transform: translate3d(30%,0,0);
  }
  60% {
    opacity: 0;
    transform: translate3d(-30%,0,0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0,0,0);
  }
}
</style>
