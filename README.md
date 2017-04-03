# vue-custom-datepicker

> Highly customizable datepicker for Vue.js

## Requirements

- [Vue.js](https://github.com/yyx990803/vue) `^2.0.0`
- [moment](https://github.com/moment/moment) `^2.18.1`

## Installation

#### npm

```shell
$ npm install vue-custom-datepicker
```

![Screenshot](screenshot.png)

## Usage

- Emits `dateSelected` event that returns the formatted date

```html
<template>
  <div id="app">
    <h2>{{ selectedDate }}</h2>
    <custom-datepicker 
      @dateSelected  = "setDate($event)"
      :date          = "selectedDate" 
      :primaryColor  = "primaryColor"
      :wrapperStyles = "wrapperStyles"
      :limits        = "limits"
    />
  </div>
</template>

<script>
import vue from 'vue'
import CustomDatepicker from 'vue-custom-datepicker'
import moment from 'moment'

export default {
  name: 'app',
  components: {
    'custom-datepicker': CustomDatepicker
  },
  data () {
    return {
      selectedDate: moment().format('YYYY-MM-DD'),
      wrapperStyles: { width: '325px' },
      primaryColor: "#0918bc",
      limits: {
        start: '2017-04-02',
        end: '2017-05-22'
      }
    }
  },
  methods: {
    setDate(date) {
      this.selectedDate = date
    }
  }
}
</script>
```

## API 

```javascript
date: {
  type: String,
  default() {
    return moment()
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
  type: String,
  default() {
    return this.primaryColor
  }
},
activeDateTextColor: {
  type: String,
  default() {
    return 'white'
  }
},
todayTextColor: {
  type: String,
  default() {
    return this.primaryColor
  }
}

```