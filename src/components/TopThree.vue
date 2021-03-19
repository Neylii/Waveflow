<template>
  <div class="top3">
    <div class="leftbox">
      <div class="lbtitle">
        Se vilka tre artister som är <br>
        mest spelade på Sveriges radio <br>
        sorterat på år och vecka.
      </div>

      <div class="weekyear">
      <label for="week">År Vecka</label>
      <input type="week" name="week" id="week" />
      </div>
    </div>

    <div class="rightbox">
      <div class="rbtitle">TOPP 3</div>

      <div>
        <apexchart
          width="380"
          type="pie"
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
  name: "Top3",
  data() {
    return {
      series: [60, 30, 10],
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Artist 1", "Artist 2", "Artist 3"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
  methods: {
    //metoder för att fetcha från api m.m
  },
};
</script>


<style scoped>
.top3 {
  display: grid;
  background-color: rgb(178, 223, 223);
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  margin-left: 7em;
  margin-right: 7em;
}

.lbtitle {
  background-color: rgb(71, 182, 182);
}

.weekyear {
  display: flex;
  flex-direction: column;
  margin-left: 3em;
  margin-right: 3em;
}
</style>