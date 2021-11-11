<template>
  <div class="container">
    <select v-model="passenger" name="" id="">
      <option disabled selected value="">Please select a passenger</option>
      <option v-for="pass in passengers" :key="pass.id" :value="pass.id">
        {{ pass.name }}
      </option>
    </select>
    <div class="flex-2 detail" v-if="item || passenger">
      <GmapMap
        class="google-map"
        :center="{ lat: 41.11, lng: 29.02 }"
        :zoom="10"
        style="width: 700px; height: 500px"
      >
        <DirectionsRenderer
          :origin="position"
          :destination="destination"
          travelMode="DRIVING"
        />
      </GmapMap>
      <div class="info">
        <p>Name: {{ item.name }}</p>
        <p>Pick up Order : {{ item.pickUpOrder }}</p>
        <p>Trip Duration: {{ item.tripDuration }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import DirectionsRenderer from "../components/DirectionsRenderer.vue";
import { mapState } from "vuex";
export default {
  components: {
    DirectionsRenderer,
  },
  data() {
    return {
      item: "",
      passenger: "",
      position: null,
      destination: null,
    };
  },
  mounted() {
    if (this.$route.params.item) {
      this.item = this.$route.params.item;
      setTimeout(() => {
        this.position = this.item.pickUpLocation;
        this.destination = this.item.destination;
        console.log(this.position, this.destination);
      }, 500);
      this.passenger = this.item;
    }
  },
  computed: {
    ...mapState(["passengers"]),
  },
  watch: {
    passenger: function (val) {
      const passenger = this.passengers.filter((item) => item.id === val);
      setTimeout(() => {
        this.position = passenger[0].pickUpLocation;
        this.destination = passenger[0].destination;
      }, 500);
      this.item = this.passenger;
    },
  },
};
</script>
