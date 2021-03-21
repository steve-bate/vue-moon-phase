<template>
  <div id="ex3" class="calendar" v-if="moon">
    <div class="calendar__header">
      <button data-value="-1" class="calendar__button" @click="changeMonth">
        ❮
      </button>
      <div class="calendar__title">{{ moon.monthName }} {{ moon.year }}</div>
      <button data-value="1" class="calendar__button" @click="changeMonth">
        ❯
      </button>
    </div>
    <div class="calendar__daysofweek">
      <div v-for="n in 7" :key="'dayofweek'+n" class="calendar__dayofweek">
        {{ moon.nameDay[n - 1] }}
      </div>
    </div>
    <div class="calendar__daybox" v-for="b in empty_initial_boxes" :key="'leading'+b"></div>
    <div
      v-for="d in daysInMonth" :key="'day'+d"
      class="calendar__daybox" :class="isToday(d) ? 'calendar__today' : ''"
      >
      <div
        :style="{ backgroundImage: getBackgroundImage(d) }"
      >
        <span class="calendar__day">{{ d }}</span>
        <div class="calendar__dayimage" v-html="moon.phase[d].svg"></div>
      </div>
    </div>
    <div class="calendar__daybox" v-for="b in empty_trailing_boxes" :key="'trailing'+b"></div>
  </div>
</template>

<script>
import { queryMoonPhases } from './api'
import { moonProps } from './props'

export default {
  props: {
    ...moonProps
  },

  data() {
    return {
      moon: undefined,
    };
  },

  computed: {
    total_boxes() {
      return Math.ceil((this.empty_initial_boxes + this.daysInMonth) / 7) * 7;
    },

    empty_initial_boxes() {
      return Number(this.moon.phase[1].dayWeek);
    },
    
    empty_trailing_boxes() {
      return this.total_boxes - this.daysInMonth - this.empty_initial_boxes;
    },

    daysInMonth() {
        return Number(this.moon.daysMonth);
    }
  },

  methods: {
    isToday(day) {
      const today = new Date();
      return (
        this.moon.year == today.getFullYear() &&
        this.moon.month == today.getMonth() + 1 &&
        day == today.getDate()
      );
    },

    getBackgroundImage(day) {
      return this.moon.phase[day] && this.moon.phase[day].isPhaseLimit
        ? `url("data:image/svg+xml;utf8, ${this.moon.phase[day].svgMini}")`
        : undefined;
    },

    changeMonth(e) {
      const increment = e.target.dataset.value;
      this.date = new Date(
        this.date.getFullYear(),
        this.date.getMonth() + Number(increment),
        1
      );
    },

    isRendered(d) {
        const i = d - this.empty_initial_boxes
        console.log(d, i, this.moon.daysMonth)
        return i > 0 && i < this.moon.daysMonth
    },

    render() {
      const configMoon = {
        lang: "en",
        month: this.date.getMonth() + 1,
        year: this.date.getFullYear(),
        size: "100%",
        lightColor: "white",
        shadeColor: "black",
        texturize: true,
      };

      queryMoonPhases(configMoon)
        .then((data) => (this.moon = data))
        .catch((error) => console.error(error));
    }
  },

  watch: {
    date() {
      this.render();
    },
  },

  mounted() {
    this.render();
  }
};
</script>

<style scoped lang="scss">
.calendar {
  max-width: 700px;
  margin: 20px auto;
  background-color: #333333;
  padding: 1%;
  color: white;
  box-sizing: border-box;
  font-family: sans-serif;

  &__header {
    margin-bottom: 1rem;
  }

  &__daysofweek {
    margin-bottom: .5rem;
  }
  
  &__today {
    box-shadow: inset 0 0 0 1px darkgray;
  }

  &__daybox,
  &__dayofweek,
  &__title,
  &__button {
    width: calc(100% / 7);
    display: inline-block;
    vertical-align: top;
  }

  &__title {
    width: calc(100% / 7 * 5);
    font-size: 24px;
    text-align: center;
  }

  &__button {
    background-color: black;
    text-align: center;
    color: white;
    border: none;
    font-size: 18px;
    padding: 0;
    cursor: pointer;
    margin: 0;
  }

  &__dayofweek {
    overflow: hidden;
    font-size: 14px;
    padding: 1px;
    box-sizing: border-box;
    margin-top: 5px;
    text-align: center;
  }

  &__daybox {
    text-align: left !important;
    font-size: 14px;
    background-image: linear-gradient(black, #222222);
    background-size: 97% 97%;
    background-position: center center;
    background-repeat: no-repeat;

    & > div {
      margin: 1px;
      padding: 5%;
      background-repeat: no-repeat;
      background-size: 25%;
      background-position: 95% 95%;

      & > span {
        position: absolute;
        color: white;
        font-size: 1em;
        text-shadow: 
          -1px -1px 0 #000, 
          1px -1px 0 #000, 
          -1px 1px 0 #000,
          1px 1px 0 #000;
      }

      & > div {
        padding: 5% 15%;
      }
    }
  }
}
</style>