<template>
  <div class="moonphase" v-if="moon">
    <div class="moonphase__header">
        {{ moon.monthName }} {{ moon.year }}
    </div>
    <div class="moonphase__phases">
        <div v-for="(phase, day) in phaseLimits" :key="day" class="moonphase__phase">
          <span class="moonphase__day">{{ day }}</span>
          <div class="moonphase__image" v-html="phase.svg"></div>
          <div class="moonphase__name">{{ phase.phaseName }}</div>
        </div>    
    </div>  
    <div class="moonphase__footer">
    </div>
  </div>
</template>

<script>
import { queryMoonPhases } from './api'
import { moonProps } from './props'

export default {
  props: {
    ...moonProps,
  },

  data() {
    return {
      moon: undefined,
    };
  },

  computed: {
    phaseLimits() {
      const value = Object.entries(this.moon.phase)
        .filter(entry => entry[1].isPhaseLimit)
        .reduce((obj, entry) => { obj[entry[0]] = entry[1]; return obj; }, {})
        console.log(value)
      return value;
    }
  },

  watch: {
    date () {
      this.render();
    }
  },

  methods: {
    render () {
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
    this.render();
  },
};
</script>

<style scoped lang="scss">

$color-text: lightblue;
$color-day: rgba(255, 255, 255, 0.5);
$color-background: black;
$color-moon-dark: rgb(125, 125, 110);
$color-moon-light: rgb(255, 255, 230);

.moonphase {
  color: $color-text;
  background-color: $color-background;

  &__header {
    font-size: 1.5rem;
    padding-top: 1rem;
  }

  &__phases {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding:  1rem;
      padding-bottom: 1rem;
      margin: 1rem .4rem;
  }
  
  &__phase {
    padding: 1rem;
  }
  
  &__day {
    display: block;
    text-align: left;
    font-size: 1.6rem;
    font-weight: bold;
    color: $color-day;
  }

  &__name {
    padding: 0.2rem 0;
    font-size: 1.2rem;
  }

  &__image {   
    // Light part of moon
    & path {
      display: inline;
      fill: $color-moon-light;
    }

    // Dark part of moon
    & g > circle {
      display: inline;
      fill: $color-moon-dark;
    }
  }
}
</style>