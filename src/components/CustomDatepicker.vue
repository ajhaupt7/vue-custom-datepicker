<template>
  <div class="cd-wrapper" :style="wrapperStyles">
  {{ selectedDate.format('YYYY-MM-DD') }}
    <header :style="headerStyles">
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
      <div class="cd-weekdays" :style="weekdayStyles">
        <article v-for="weekday in weekdayLabels">
          {{ weekday }}
        </article>
      </div>
      <div class="cd-days" :style="bodyStyles">
        <button 
          v-for  = "day,i in daysTest" 
          :key   = "i" 
          :class = "{ disabled: day.disabled, 'active-date': activeDate(day), today: isToday(day) }"
          @click = "selectDate($event, day)"
        >
          <span>{{ day.format('D') }}</span>
          <figure></figure>
        </button>
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
import {shadeColor} from '../helpers'

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
    width: {
      type: Number,
      default() {
        return 350
      } 
    },
    headerStyles: {
      type: Object,
      default() {
        return {
          background: this.primaryColor,
          color: "white"
        }
      }
    },
    weekdayStyles: {
      type: Object,
      default() {
        return {
          background: shadeColor(this.primaryColor, 0.15),
          color: "white"
        }
      }
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
          disabled: dayMoment.month() !== this.displayDate.month()
        }
        
        const dayObj = Object.assign(dayMoment, properties)
        days.push(dayObj)
        currentDay.add(1, 'days')
      }
      return days
    },
    wrapperStyles() {
      return { width: `${this.width}px` }
    }
  },
  methods: {
    incrementMonth(e, num) {
      this.displayDate = moment(this.displayDate).add(num, 'months')
      const button = event.target.closest("button")
      button.classList.add('pulse')
      setTimeout(() => {
        button.classList.remove('pulse')
      }, 1200);
    },
    selectDate(e, day) {
      const button = event.target.closest("button")
      if (!day.disabled) {
        this.selectedDate = day
        button.classList.add('pulse')
        setTimeout(() => {
          button.classList.remove('pulse')
        }, 1200);
      }
    },
    activeDate(day) {
      return day.format('YYYY-MM-DD') === moment(this.selectedDate).format('YYYY-MM-DD')
    },
    isToday(day) {
      return day.format('YYYY-MM-DD') === this.today.format('YYYY-MM-DD')
    }
  }
}
</script>
<style lang="scss">
$primary-color: #ff5a5f;

.cd-wrapper {
  width: 350px;
  display: block;
  margin: auto;
  border-radius: 2px;
  font-family: inherit;
}

.cd-weekdays {
  text-transform: uppercase;
  background: lighten($primary-color, 5%);
  color: white;
}

header {
  background: $primary-color;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 1em;
  text-align: center;
  position: relative;
  > article {
    > span {
      &:first-child {
        font-weight: bold;
      }
    }
  }
  > button {      
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    margin: 0;
    height: 25px;
    width: 25px;
    > figure {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
    &:first-child {
      left: 15px;
    }
    &:last-child {
      right: 15px;
    }
  }
}

.cd-days, .cd-weekdays {
  padding: 5px 15px;
  display: flex;
  flex-wrap: wrap;
  > article, button {
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
}

.cd-weekdays {
  font-size: 0.9em;
  font-weight: bold;
}

.cd-days {
  font-size: 0.8em;
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
      background: $primary-color;
      border-radius: 100%;
      border:none;
      position: absolute;
      top:1.5px;
      left:47%;
      transform: translateX(-50%) scale(0.4);
      opacity: 0;
    }
    &.disabled {
      opacity: 0.4;
      cursor: default;
    }
    &.active-date {
      color: white;
      > figure {
        background: $primary-color;
        transform: translateX(-50%) scale(1);
        opacity: 1;
      }
    }
    &:hover:not(.active-date):not(.disabled) {
      color: white;
      > figure {
        background: rgba($primary-color, 0.6);
        transform: translateX(-50%) scale(1);
        opacity: 1;
      }
    }
    &.today:not(.active-date) {
      color: $primary-color;
    }
  }
}

.chevron::before {
  border-style: solid;
  border-width: 0.05em 0.05em 0 0;
  content: '';
  display: inline-block;
  height: 0.45em;
  left: 0;
  position: relative;
  top: 0;
  transform: rotate(-45deg);
  vertical-align: top;
  width: 0.45em;
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
  &:active, &:focus {
    outline: none;
  }
}

button {
  > figure {
    position: relative;
    &:after {
      background: rgba(0, 0, 0, 0.1);
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
  &.pulse {
    > figure:after {
      animation: pulse 400ms ease-in-out forwards;
    }
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
figure {
  margin: 0;
}
</style>
