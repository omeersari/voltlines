<template>
  <div class="card">
    <div class="heading">
      <p>Name:</p>
      <p>Pick Up Order:</p>
      <p>Trip Duration:</p>
      <p>Trip Route:</p>
      <p>Delete:</p>
    </div>
    <div class="body">
      <div>{{ passenger.name }}</div>
      <div>{{ passenger.pickUpOrder }}</div>
      <div>{{ passenger.tripDuration.text }}</div>
      <div>
        <button class="secondary" @click="goToDetails(passenger)">
          Go To Details
        </button>
      </div>
      <div @click="deletePassenger(passenger)">
        <i class="fas fa-trash-alt"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    passenger: {
      type: Object,
      required: false,
    },
  },
  methods: {
    deletePassenger(item) {
      this.$emit("deletePassenger", item);
    },
    goToDetails(item) {
      this.$emit("goToDetails", item);
    },
  },
};
</script>
