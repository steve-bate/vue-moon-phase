<template>
  <div class="moonphase" v-if="moon">
    <div class="moonphase__header">
      <div class="moonphase__dayofweek">
        {{ moon.nameDay[dayWeek] }}
      </div>
      <div>
        <span class="moonphase__day">{{ day }}</span>
        <span class="moonphase__month">{{ moon.monthName }}</span>
        <span class="moonphase__year">{{ moon.year }}</span>        
      </div>
    </div>
    <div shadow v-html="moon.phase[day].svg"></div>
    <div class="moonphase__footer">
      {{ moon.phase[day].phaseName }} {{ phasePercent }}
    </div>
  </div>
</template>

<script>
import { queryMoonPhases } from './api'
import { moonProps } from './props'

console.log(moonProps)

export default {
  props: {
    ...moonProps,
  },

  data() {
    return {
      moon: undefined
    }
  },

  computed: {
    day() {
      return this.date.getDate()
    },

    dayWeek() {
      return this.moon.phase[this.day].dayWeek;
    }
  },

  methods: {
    queryMoonPhases() {
      var configMoon = {
        lang: this.lang,
        month: this.date.getMonth() + 1,
        year: this.date.getFullYear(),
        size: this.moonSize,
        lightColor: this.lightColor,
        shadeColor: this.shadeColor,
        texturize: this.texturize,
      };
      queryMoonPhases(configMoon)
        .then(data => (this.moon = data))
        .catch(error => console.error(error));
    }
  },

  async mounted() {
    this.queryMoonPhases()
  },
};
</script>

<style scoped lang="scss">
.moonphase {
  display: table;
  margin: 20px auto;
  text-align: center;
  color: orange;
  background-color: black;
  border-radius: 8px;
  border: 1px solid black;
  box-shadow: 4px 4px 16px #888;
  padding: 5px 30px;

  &__dayofweek {
    margin-bottom: .2rem;
    font-size: 1.2rem;
  }
  
  &__day {
    display: inline-block;
    margin-right: 0.2rem;
  }

  &__month {
    display: inline-block;
    margin-right: 0.2rem;
    font-weight: bold;
  }

  & [shadow] {
    filter: drop-shadow(0 0 25px darkgray);
    padding: 15px 0;
  }
}
</style>