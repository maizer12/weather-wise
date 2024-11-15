<template>
  <canvas id="myChart"></canvas>
</template>

<script>
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      chart: null,
      graph: {
        temp: [],
        time: [],
      },
      apiKeyWeather: 'd4b4f4b2c5a2a6b4a5b4a6b4a5b4a6b4',
    };
  },
  mounted() {
    this.getData(this.data.city);
  },
  methods: {
    renderChart() {
      const ctx = document.getElementById('myChart').getContext('2d');
      if (ctx) {
        this.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.graph.time,
            datasets: [
              {
                label: 'Temperature Chart',
                backgroundColor: '#4457a8',
                data: this.graph.temp,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Time',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Temperature (°C)',
                },
              },
            },
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
            },
          },
        });
      }
    },

    async getData(city) {
      try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + this.apiKeyWeather);
        const data = await response.json();

        const newGraph = {
          temp: [],
          time: [],
        };

        data.list.forEach((e) => {
          newGraph.temp.push(Number((e.main.temp - 273.15).toFixed(0)));
          const dateObject = new Date(e.dt_txt);
          const hours = dateObject.getHours();
          const amPm = hours >= 12 ? 'PM' : 'AM';
          const formattedHours = hours % 12 || 12;
          const formattedTime = `${formattedHours}:00 ${amPm}`;
          newGraph.time.push(formattedTime);
        });

        this.graph = newGraph;
        await this.destroyAndRenderChart();
      } catch (error) {
        console.error('Error:', error);
      }
    },

    async destroyAndRenderChart() {
      if (this.chart) {
        this.chart.destroy();
      }

      this.renderChart();
    },
  },
  watch: {
    data(newData) {
      this.getData(newData.city);
    },
  },
};
</script>
<style scoped>
#myChart {
  margin-top: 50px;
  max-height: 600px;
  background-color: #fff;
}
</style>
