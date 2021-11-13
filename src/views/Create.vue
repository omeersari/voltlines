<template>
  <div class="container">
    <div class="flex-2">
      <div class="create-form">
        <h4>CREATE PASSENGER</h4>
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
        </div>
        <p class="warn">Please mark map to see Lat and Lng</p>
        <input
          type="number"
          placeholder="Pick Up Order"
          v-model="pickUpOrder"
        />
        <input
          type="text"
          placeholder="Trip Duration"
          disabled
          v-model="tripDuration.text"
        />
        <p class="warn">
          Trip duration will be automatically filled after marking the map.
        </p>
        <button class="primary" @click="create">Create Route</button>
        <p class="error" v-if="err">{{ err }}</p>
      </div>
      <div class="google-map">
        <GmapMap
          :center="{ lat: 41.11, lng: 29.02 }"
          :zoom="10"
          style="width: inherit; height: inherit"
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
        <div class="information">
          <p v-if="distance && duration">
            The distance between these locations is:
            <span class="red">{{ distance }}</span> The trip duration with
            driving is:
            <span class="red">{{ (duration / 60).toFixed(2) }}</span> mins.
          </p>
          <p v-if="averageTripDuration">
            Average of passengers trip duration is
            <span class="red">
              {{ (averageTripDuration / 60).toFixed(2) }}
            </span>

            mins.
          </p>
          <button class="secondary" @click="resetMap()">Reset Map</button>
        </div>
      </div>
    </div>
    <notifications group="create" position="bottom left" />
    <notifications group="reset" position="bottom right" />
  </div>
</template>

<script>
import DirectionsRenderer from "../components/DirectionsRenderer.vue";
import { gmapApi } from "vue2-google-maps";
import { mapState } from "vuex";
export default {
  components: {
    DirectionsRenderer,
  },
  data() {
    return {
      name: "",
      pickUpLocation: {
        lat: null,
        lng: null,
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
    ...mapState(["passengers", "averageTripDuration"]),
  },
  created() {
    this.$store.dispatch("averageTime");
  },
  methods: {
    create() {
      const data = {
        name: this.name,
        pickUpLocation: this.pickUpLocation,
        pickUpOrder: this.pickUpOrder,
        tripDuration: this.tripDuration,
        destination: this.destination,
      };
      if (!this.name || !this.pickUpOrder || !this.tripDuration) {
        this.err = "Please provide all fields";
        this.$notify({
          group: "create",
          title: "Warn",
          text: "Please provide all fields",
          type: "warn",
          duration: "3000",
        });
      } else {
        this.err = "";
        if (this.checkValidation()) {
          this.$store.dispatch("createPassenger", data);
          this.resetMap();
          this.$notify({
            group: "create",
            title: "Created",
            text: "Passenger is created",
            type: "success",
            duration: "3000",
          });
        }
      }
    },
    addMarker(event) {
      const marker = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      if (!this.position) {
        this.position = marker;
        this.locations.push(this.position);
        this.pickUpLocation.lat = this.position.lat;
        this.pickUpLocation.lng = this.position.lng;
      } else {
        this.destination = marker;
        this.locations.push(this.destination);
        this.calculateDistance();
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
        this.tripDuration = res.rows[0].elements[0].duration;
      }
      this.locations = [];
    },
    checkValidation() {
      if (this.duration / (60 * 60) > 2) {
        this.err = "Trip Duration is more than 2 hours.";
        this.$notify({
          group: "create",
          title: "Error",
          text: "Trip Duration is more than 2 hours.",
          type: "error",
          duration: "3000",
        });
        return false;
      }
      if (this.passengers.length >= 9) {
        this.err = "Total passenger maximum can be 9";
        this.$notify({
          group: "create",
          title: "Error",
          text: "Total passenger maximum can be 9",
          type: "error",
          duration: "3000",
        });
        return false;
      }
      if (this.pickUpOrder >= 10 || this.pickUpOrder < 1) {
        this.err = "Pick Up Order should be in the range of 1-9";
        this.$notify({
          group: "create",
          title: "Warn",
          text: "Pick Up Order should be in the range of 1-9",
          type: "warn",
          duration: "3000",
        });
      }
      if (!this.err) {
        return true;
      }
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
      this.name = "";
      this.pickUpOrder = "";
      this.$notify({
        group: "reset",
        title: "Success",
        text: "Map is resetted",
        type: "success",
        duration: "3000",
      });
    },
  },
};
</script>

<style></style>
