<template>
  <div class="container">
    <div class="table">
      <div class="head">
        <div class="name">Name</div>
        <div class="order">
          Pick Up Order
          <i class="fas fa-sort"></i>
        </div>
        <div class="duration">
          Trip Duration
          <i class="fas fa-sort"></i>
        </div>
        <div class="route">Trip Route</div>
      </div>
      <div class="row" v-for="item in passengers" :key="item.id">
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
          {{ item.pickUpLocation }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  created() {
    this.$store.dispatch("getPassengers");
  },
  computed: {
    ...mapState(["passengers"]),
  },
};
</script>
