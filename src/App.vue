<template>
  <div>
    <div class="header">
      <img src="./assets/wave.png" alt="Wave" />
      <Waveflow msg="Waveflow" />
      <p>
        Big company announcement or simple sub-header taking two or more lines. <br>
        Big company announcement or simple sub-header taking two or more lines. <br>
        Big company announcement or simple sub-header taking two or more lines. <br>
        Big company announcement or simple sub-header taking two or more lines. <br>
      </p>
    </div>

    <top-three />
    <take-me-to />
    <right-now />
  </div>
</template>

<script>
import Waveflow from "./components/Waveflow.vue";
import TopThree from "./components/TopThree.vue";
import TakeMeTo from "./components/TakeMeTo.vue";
import RightNow from './components/RightNow.vue';

export default {
  name: "App",
  components: {
    Waveflow,
    TopThree,
    TakeMeTo,
    RightNow,
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  align-items: center;
  color: #2c3e50;
  margin-top: 60px;
}

.header {
  font-size: xx-large;
  margin-bottom: 2em;
}

.header > p {
 font-size: small;
}

.leftbox {
  grid-column: 1;
  grid-row: 1;
}
.lbtitle {
  display: flex;
  flex-direction: column;
  margin-top: 1em;
  margin-bottom: 3em;
  margin-left: 7em;
  margin-right: 7em;
  border-radius: 0.8em;
}

.rightbox {
  grid-column: 2;
  grid-row: 1;
}

.rbtitle {
  display: flex;
  flex-direction: column;
  font-weight: bolder;
  font-size: xx-large;
}
</style>
