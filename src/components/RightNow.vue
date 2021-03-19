<template>
  <div class="rightnow">
    <div class="leftbox">
      <div class="lbtitle">
        Här kan du visa vad som <br />
        sänds just nu i de olika <br />
        kanalerna.
      </div>

      <div class="channels">
        <!-- channels here -->
      </div>
    </div>

    <div class="rightbox">
      <div class="rbtitle">Start</div>

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
  name: "Right now",
  data() {
    return {
      chartOptions: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: ["P1", "P2"],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40],
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
.rightnow {
  display: grid;
  background-color: rgb(192, 181, 221);
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  margin-left: 7em;
  margin-right: 7em;
}

.lbtitle {
  background-color: rgb(148, 123, 155);
}

.channels {
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