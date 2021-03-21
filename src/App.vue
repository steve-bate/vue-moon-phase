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
      <moon-phases v-if="phase == 'phases'"></moon-phases>
    </div>
    <moon-phase-calendar v-if="phase == 'calendar'"></moon-phase-calendar>
  </div>
</template>

<script>
import MoonPhaseDay from "./components/MoonPhase/Day";
import MoonPhases from './components/MoonPhase/PrimaryPhases';
import MoonPhaseCalendar from './components/MoonPhase/Calendar';

export default {
  name: "App",
  components: {
    MoonPhaseDay,
    MoonPhases,
    MoonPhaseCalendar,
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
