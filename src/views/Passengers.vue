<template>
  <div class="container">
    <div class="table">
      <div class="filter">
        <input
          type="text"
          placeholder="Filter By Name"
          v-model="filterByName"
        />
      </div>
      <div class="head">
        <div class="name">
          <p>Name</p>
        </div>
        <div class="order">
          Pick Up Order
          <i class="fas fa-sort" @click="sortList('pickUpOrder')"></i>
        </div>
        <div class="duration" @click="sortList('tripDuration')">
          Trip Duration
          <i class="fas fa-sort"></i>
        </div>
        <div class="route">Trip Route</div>
      </div>
      <div class="row" v-for="item in filteredPassengers" :key="item.id">
        <div>
          {{ item.name }}
        </div>
        <div>
          {{ item.pickUpOrder }}
        </div>
        <div>
          {{ item.tripDuration }}
        </div>
        <div class="">
          <button class="secondary" @click="goToDetails(item.pickUpLocation)">
            Go To Details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      pickUpOrder: false,
      tripDuration: false,
      filterByName: "",
    };
  },
  created() {
    this.$store.dispatch("getPassengers");
  },
  computed: {
    ...mapState(["passengers"]),
    filteredPassengers() {
      if (this.filterByName) {
        const newList = this.passengers.filter(
          (item) => item.name == this.filterByName
        );
        return newList;
      } else {
        return this.passengers;
      }
    },
  },
  methods: {
    goToDetails(item) {
      this.$router.push({ path: "routedetail", params: { item: item } });
    },
    sortList(val) {
      if (val == "tripDuration") {
        if (!this.tripDuration) {
          this.passengers.sort((a, b) => {
            return a.tripDuration - b.tripDuration;
          });
        } else {
          this.passengers.sort((a, b) => {
            return b.tripDuration - a.tripDuration;
          });
        }
        this.tripDuration = !this.tripDuration;
      } else {
        if (!this.pickUpOrder) {
          this.passengers.sort((a, b) => {
            return a.pickUpOrder - b.pickUpOrder;
          });
        } else {
          this.passengers.sort((a, b) => {
            return b.pickUpOrder - a.pickUpOrder;
          });
        }
        this.pickUpOrder = !this.pickUpOrder;
      }
    },
  },
};
</script>
