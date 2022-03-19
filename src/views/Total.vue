<template>
  <div class="sections">
    <section class="mb-15">
      <h1 class="display-1 mb-5">World Summary Stats</h1>
      <v-row align="center" justify="center">
        <stat-card
          v-for="card in cards"
          :key="card.id"
          :cardTitle="card.title"
          :bgColor="card.bgColor"
          :cardAmountNew="card.amountNew"
          :cardAmount="card.amount"
          :cardIcon="card.icon"
        />
      </v-row>
    </section>
    <section>
      <h2 class="display-1 mb-5">Visuals</h2>
      <v-row align="center" justify="center">
        <v-col :class="'col-md-4'" v-for="visual in visuals" :key="visual.id">
          <line-chart
            :chart-data="visual.chartData"
            :option="visual.option"
          ></line-chart>
        </v-col>
      </v-row>
    </section>
  </div>
</template>

<script>
import StatCard from "@/components/StatCard";
import LineChart from "@/components/lineChart";
export default {
  name: "Total",

  data() {
    return {
      continents: null,
      allData: null,
      cards: [
        {
          id: 1,
          title: "Total cases",
          bgColor: "primary lighten-2",
          amountNew: 0,
          amount: 0,
          icon: "mdi-alert-box",
        },
        {
          id: 2,
          title: "Deaths",
          bgColor: "red accent-2",
          amountNew: 0,
          amount: 0,
          icon: "mdi-emoticon-dead",
        },
        {
          id: 3,
          title: "Recoveries",
          bgColor: "teal lighten-1",
          amountNew: 0,
          amount: 0,
          icon: "mdi-hospital-box",
        },
      ],

      visuals: [
        {
          id: 1,
          chartData: {
            labels: [],
            datasets: [
              {
                label: "",
                backgroundColor: "#6aaaff",
                data: [],
              },
            ],
          },
          option: { responsive: true, maintainAspectRatio: false },
        },
        {
          id: 2,
          chartData: {
            labels: [],
            datasets: [
              {
                label: "",
                backgroundColor: "#f87979",
                data: [],
              },
            ],
          },
          option: { responsive: true, maintainAspectRatio: false },
        },
        {
          id: 3,
          chartData: {
            labels: [],
            datasets: [
              {
                label: "",
                backgroundColor: "#f87979",
                data: [],
              },
            ],
          },
          option: { responsive: true, maintainAspectRatio: false },
        },
      ],
    };
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      try {
        const res = await this.axios.get(
          "https://corona.lmao.ninja/v2/continents?sort"
        );

        const resHistorical = await this.axios.get(
          "https://corona.lmao.ninja/v2/historical/all"
        );

        this.continents = res.data;
        this.allData = resHistorical.data;
        this.updateStats();
        this.updateVisuals();
      } catch (e) {
        console.error(e);
      }
    },

    updateStats() {
      let data = this.continents;

      let todayCases = 0;
      let todayDeaths = 0;
      let todayRecoveries = 0;
      let cases = 0;
      let deaths = 0;
      let recoveries = 0;

      for (let item of data) {
        cases += item.cases;
        todayCases += item.todayCases;
        deaths += item.deaths;
        todayDeaths += item.todayDeaths;
        recoveries += item.recovered;
        todayRecoveries += item.todayRecovered;
      }

      this.cards[0].amount += cases;
      this.cards[0].amountNew += todayCases;
      this.cards[1].amount += deaths;
      this.cards[1].amountNew += todayDeaths;
      this.cards[2].amount += recoveries;
      this.cards[2].amountNew += todayRecoveries;
    },

    updateVisuals() {
      let data = this.allData;

      console.log(data);

      let labels = [];
      let casesPerDay = [];
      let deathsPerDay = [];
      let recoveredPerDay = [];

      for (let key in data.cases) {
        labels.push(key);
        casesPerDay.push(data.cases[key]);
      }
      for (let key in data.deaths) {
        deathsPerDay.push(data.deaths[key]);
      }
      for (let key in data.recovered) {
        recoveredPerDay.push(data.recovered[key]);
      }

      this.visuals[0].chartData = {
        labels: labels,
        datasets: [
          {
            label: "Total cases",
            backgroundColor: "#6aaaff",
            data: casesPerDay,
          },
        ],
      };

      this.visuals[1].chartData = {
        labels: labels,
        datasets: [
          {
            label: "Total deaths",
            backgroundColor: "#FF5252",
            data: deathsPerDay,
          },
        ],
      };
      this.visuals[2].chartData = {
        labels: labels,
        datasets: [
          {
            label: "Total recovered",
            backgroundColor: "#26a69a",
            data: recoveredPerDay,
          },
        ],
      };
    },
  },

  components: {
    StatCard,
  },
};
</script>
