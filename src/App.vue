<template>
  <div id="app">
    <form class="selector">
      <h1>Moon Phase Demonstration</h1>
      <select id="selector" v-model="phase">
        <option value="day">Day</option>
        <option value="phases">Phases</option>
        <option value="calendar">Calendar</option>
      </select>
    </form>
    <moon-phase-day v-if="phase == 'day'"></moon-phase-day>
    <div class="max-phases">
      <moon-phase-max v-if="phase == 'phases'"></moon-phase-max>
    </div>
    <moon-phase-month v-if="phase == 'calendar'"></moon-phase-month>
  </div>
</template>

<script>
import MoonPhaseDay from "./components/MoonPhaseDay";
import MoonPhaseMax from './components/MoonPhaseMax';
import MoonPhaseMonth from './components/MoonPhaseMonth';

export default {
  name: "App",
  components: {
    MoonPhaseDay,
    MoonPhaseMax,
    MoonPhaseMonth,
  },
  data() {
    return {
      phase: 'day'
    }
  }
};
</script>

<style lang="scss">
body {
  height: 100vh;
  background-color: navy;
  color: gray;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.selector {
  margin: 1rem 0;
}

.max-phases {
  width: 80%;
  margin: auto;
}

.max-phases div {
  margin: auto;
}
</style>
