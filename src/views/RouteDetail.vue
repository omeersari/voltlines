<template>
  <div class="container">
    <select v-model="passenger" name="" id="">
      <option disabled selected>Please select a passenger</option>
      <option v-for="pass in passengers" :key="pass.id" :value="pass">
        {{ pass.name }}
      </option>
    </select>
    <div class="flex-2 detail" v-if="item">
      <div class="google-map">
        <GmapMap
          class="google-map"
          :center="{ lat: 41.11, lng: 29.02 }"
          :zoom="10"
          style="width: inherit; height: inherit"
        >
          <DirectionsRenderer
            :origin="position"
            :destination="destination"
            travelMode="DRIVING"
          />
        </GmapMap>
      </div>
      <div class="info">
        <p>Name: {{ item.name }}</p>
        <p>Pick up Order : {{ item.pickUpOrder }}</p>
        <p>Trip Duration: {{ item.tripDuration.text }}</p>
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
      passenger: "Please select a passenger",
      position: null,
      destination: null,
    };
  },
  mounted() {
    if (this.$route.params.item) {
      this.passenger = this.$route.params.item;
    }
  },
  computed: {
    ...mapState(["passengers"]),
  },
  watch: {
    passenger: function () {
      const passenger = this.passengers.filter(
        (item) => item.id === this.passenger.id
      );
      setTimeout(() => {
        this.position = passenger[0].pickUpLocation;
        this.destination = passenger[0].destination;
      }, 500);
      this.item = passenger[0];
    },
  },
};
</script>
