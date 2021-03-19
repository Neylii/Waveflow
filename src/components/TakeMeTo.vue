<template>
  <div class="takeme">
    <div class="leftbox">
      <div class="lbtitle">
        Se vilka låtar som var mest <br />
        populära på en kanal vid <br />
        en viss tidpunkt.
      </div>

      <div class="weekyearday">
        <p>TAKE ME TO</p>
        <label for="takeme">År Vecka Dag<br></label>
        <input type="calendar" />
      </div>
    </div>

    <div class="rightbox">
      <div class="rbtitle">Dagens mix/låtar?</div>

      <div>
        <apexchart
          width="500"
          type="bar"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
export default {
  components: {
    apexchart: VueApexCharts,
  },
  name: "Take me to",
  data() {
    return {
      chartOptions: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 35, 50, 49, 60, 70, 91],
        },
      ],
    };
  },
  methods: {
    //metoder för att fetcha från api m.m
  },
};
</script>


<style scoped>
.takeme {
  display: grid;
  background-color: rgb(222, 233, 175);
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  margin-left: 7em;
  margin-right: 7em;
}

.lbtitle {
  background-color: rgb(213, 223, 83);
}

.weekyearday {
  display: flex;
  flex-direction: column;
  margin-left: 3em;
  margin-right: 3em;
  margin-top: 1em;
}

p {
  font-weight: bolder;
  font-size: xx-large;
  margin-top: 0em;
}
</style>