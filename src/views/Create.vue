<template>
  <div class="container">
    <div class="flex-2">
      <div class="create-form">
        <h4>Please fill the following inputs</h4>
        <input type="text" placeholder="Name" v-model="name" />
        <div class="lat-lng">
          <input
            type="number"
            disabled
            placeholder="Lat:"
            v-model="pickUpLocation.lat"
          />
          <input
            type="number"
            disabled
            placeholder="Lat:"
            v-model="pickUpLocation.lng"
          />
          <p class="warn">Please mark map to see Lat and Lng</p>
        </div>
        <input
          type="number"
          placeholder="Pick Up Order"
          v-model="pickUpOrder"
        />
        <input
          type="text"
          placeholder="Trip Duration"
          disabled
          v-model="tripDuration"
        />
        <p class="warn">
          Trip duration will be automatically filled after marking the map.
        </p>
        <button class="primary" @click="create">Create Route</button>
      </div>
      <div class="map">
        <GmapMap
          :center="{ lat: 41.11, lng: 29.02 }"
          :zoom="10"
          style="width: 700px; height: 500px"
          @click="addMarker"
        >
          <gmap-marker
            :key="index"
            v-for="(gmp, index) in locations"
            :position="gmp"
            @click="center = gmp"
          ></gmap-marker>
          <DirectionsRenderer
            :origin="position"
            :destination="destination"
            travelMode="DRIVING"
          />
        </GmapMap>
        <button class="secondary" @click="resetMap()">Reset Map</button>
        <div class="information" v-if="distance && duration">
          The distance between these locations is: {{ distance }} The trip
          duration with driving is:
          {{ (duration / (60 * 60)).toFixed(2) }} hours.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DirectionsRenderer from "../components/DirectionsRenderer.vue";
import { gmapApi } from "vue2-google-maps";
export default {
  components: {
    DirectionsRenderer,
  },
  data() {
    return {
      name: "",
      pickUpLocation: {
        lat: "",
        lng: "",
      },
      pickUpOrder: "",
      tripDuration: "",
      locations: [],
      position: null,
      destination: null,
      distance: "",
      duration: "",
      err: "",
    };
  },
  computed: {
    google: gmapApi,
  },
  methods: {
    create() {
      const data = {
        name: this.name,
        pickUpLocation: this.pickUpLocation,
        pickUpOrder: this.pickUpOrder,
        tripDuration: this.tripDuration,
      };
      if (!this.name || !this.pickUpOrder) {
        this.err = "Please provide all fields";
      }
      this.$store.dispatch("createPassenger", data);
      this.resetMap();
    },
    addMarker(event) {
      const marker = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      if (!this.position) {
        this.position = marker;
        this.locations.push(this.position);
        this.pickUpLocation.lat = this.position.lat.toFixed(2);
        this.pickUpLocation.lng = this.position.lng.toFixed(2);
        console.log("pos", this.position);
      } else {
        this.destination = marker;
        this.locations.push(this.destination);
        this.calculateDistance();
        console.log("dest", this.destination);
      }
    },
    async calculateDistance() {
      const service = new this.google.maps.DistanceMatrixService();
      const res = await service.getDistanceMatrix({
        origins: [this.position],
        destinations: [this.destination],
        travelMode: "DRIVING",
      });
      if (res.rows[0].elements[0].distance) {
        this.distance = res.rows[0].elements[0].distance["text"];
        this.duration = res.rows[0].elements[0].duration["value"];
        this.tripDuration = res.rows[0].elements[0].duration["text"];
      }
      this.locations = [];
    },
    resetMap() {
      this.position = null;
      this.destination = null;
      this.locations = [];
      this.distance = "";
      this.duration = "";
      this.tripDuration = "";
      this.pickUpLocation = {
        lat: "",
        lng: "",
      };
    },
  },
};
</script>

<style></style>
