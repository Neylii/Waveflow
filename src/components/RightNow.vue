<template>
  <div class="rightnow">
    <div id="container" class="border">
      <div id="left" class="border">
        <info-text />
        <div id="leftbottom" class="border">
          <radio-station station="p1" id="132" />
          <radio-station station="p2" id="163" />
          <radio-station station="p3" id="164" :checked="true" />
          <radio-station station="p4" />
        </div>
      </div>
      <div id="right" class="border">
        <div id="righttop">
          <h3 class="textAlignLeft">Start</h3>
        </div>
        <div id="rightbottom">
          <program
            v-for="program in allPrograms"
            :key="program"
            :time="startTime(program.starttimeutc)"
            :title="program.title"
            :description="program.description"
            :imgSrc="program.channel.name + '.png'"
          >
            {{ program }}
          </program>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InfoText from "./InfoText";
import RadioStation from "./RadioStation";
import Program from "./Program";

export default {
  name: "RightNow",
  data() {
    return {
      allPrograms: [],
    };
  },
  components: {
    InfoText,
    RadioStation,
    Program,
  },
  methods: {
    checkTime(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    },

    startTime(dateString) {
      let timestamp = +dateString.replace(/\/Date\((.*?)\)\//g, "$1");
      let programStartTime = new Date(timestamp);
      let h = programStartTime.getHours();
      let m = programStartTime.getMinutes();
      // add a zero in front of numbers<10
      h = this.checkTime(h);
      m = this.checkTime(m);
      return h + ":" + m;
    },

    async getTablo(api) {
      let json = null;

      try {
        let response = await fetch(api);
        if (!response.ok) {
          throw new Error(response.status);
        }
        json = await response.json();
      } catch (err) {
        console.error(err);
      }

      json = json.schedule;

      let dateNow = new Date();

      for (let i = json.length - 1; i >= 0; i--) {
        let timestamp = +json[i].endtimeutc.replace(/\/Date\((.*?)\)\//g, "$1");
        let dateProgram = new Date(timestamp);
        if (dateNow > dateProgram) {
          json.splice(i, 1);
        }
      }

      Array.prototype.push.apply(this.allPrograms, json);

      this.allPrograms = this.allPrograms.sort(function (a, b) {
        if (a.starttimeutc > b.starttimeutc) {
          return 1;
        } else if (a.starttimeutc < b.starttimeutc) {
          return -1;
        }
        if (a.channel.name > b.channel.name) {
          return 1;
        } else if (a.channel.name < b.channel.name) {
          return -1;
        }
        return 0;
      });
    },

    removeProgramsFromList(id) {
      id = Number(id);
      for (let i = this.allPrograms.length - 1; i >= 0; i--) {
        if (this.allPrograms[i].channel.id === id) {
          this.allPrograms.splice(i, 1);
        }
      }
    },
  },
  mounted() {
    this.getTablo(
      "http://api.sr.se/api/v2/scheduledepisodes?channelid=164&size=500&format=json"
    );
    console.log(this.allPrograms);
  },
};
</script>


<style scoped>
.textAlignLeft {
  margin-left: 2em;
}

#container {
  display: flex;
}

#left {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

#lefttop {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#leftbottom {
  display: grid;
  margin: 1em;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1em;
}

#right {
  flex-grow: 1;
}

#righttop {
  margin-right: auto;
}

#rightbottom {
  max-height: 1000px;
  overflow-y: auto;
}
</style>