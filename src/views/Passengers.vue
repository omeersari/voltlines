<template>
  <div class="container">
    <div class="actions">
      <div class="filter">
        <input
          type="text"
          placeholder="Filter By Name"
          v-model="filterByName"
        />
      </div>

      <div class="sortButtons">
        <button class="secondary" @click="sortList('pickUpOrder')">
          Sort By Order
        </button>
        <button class="secondary" @click="sortList('tripDuration')">
          Sort By Trip Duration
        </button>
      </div>
    </div>

    <div class="table">
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
        <div class="route">Actions</div>
      </div>
      <div class="row" v-for="item in filteredPassengers" :key="item.id">
        <div>
          {{ item.name }}
        </div>
        <div>
          {{ item.pickUpOrder }}
        </div>
        <div>
          {{ item.tripDuration.text }}
        </div>
        <div class="">
          <button class="secondary" @click="goToDetails(item)">
            Go To Details
          </button>
        </div>
        <div class="deletePassenger">
          <i
            style="margin-right: 5px"
            class="fas fa-edit"
            @click="editPassenger(item)"
          ></i>
          <i class="fas fa-trash-alt" @click="deletePassenger(item)"></i>
        </div>
      </div>
    </div>
    <div class="cards">
      <card
        v-for="passenger in filteredPassengers"
        :key="passenger.id"
        :passenger="passenger"
        @deletePassenger="deletePassenger(passenger)"
        @editPassenger="editPassenger(passenger)"
        @goToDetails="goToDetails(passenger)"
      />
    </div>
    <notifications group="delete" position="bottom right" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Card from "../components/Card.vue";
export default {
  components: {
    Card,
  },
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
      this.$router.push({ name: "RouteDetail", params: { item } });
    },
    deletePassenger(item) {
      this.$store.dispatch("deletePassenger", item);
      this.$notify({
        group: "delete",
        title: "Success",
        text: "Passenger is deleted",
        type: "success",
        duration: "3000",
      });
    },
    editPassenger(item) {
      this.$router.push({ name: "Create", params: { item } });
    },
    sortList(val) {
      if (val == "tripDuration") {
        if (!this.tripDuration) {
          this.passengers.sort((a, b) => {
            return a.tripDuration.value - b.tripDuration.value;
          });
        } else {
          this.passengers.sort((a, b) => {
            return b.tripDuration.value - a.tripDuration.value;
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
