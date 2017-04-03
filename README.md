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

## Usage

- Emits `dateSelected` event that returns the formatted date

```html
<template>
  <div id="app">
    <h2>{{ selectedDate }}</h2>
    <custom-datepicker 
      @dateSelected              = "setDate($event)"
      :initialDate               = "selectedDate" 
      :primaryColor              = "primaryColor"
      :primaryTextColor          = "primaryTextColor"
      :todayTextColor            = "todayTextColor"
      :activeDateTextColor       = "activeDateTextColor"
      :activeDateBackgroundColor = "activeDateBackgroundColor"
    />
  </div>
</template>

<script>
import vue from 'vue'
import CustomDatepicker from 'vue-custom-datepicker'

export default {
  name: 'app',
  components: {
    'custom-datepicker': CustomDatepicker
  },
  data () {
    return {
      selectedDate: "2017-04-15",
      wrapperStyles: { width: '325px' },
      primaryColor: "#fff",
      primaryTextColor: "black",
      todayTextColor: "#0918bc",
      activeDateTextColor: "#fff",
      activeDateBackgroundColor: "#0918bc"
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

```
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

```