<template>
  <div class="container">
    <div class="flex-2">
      <div class="create-form">
        <h4>Please fill the following inputs</h4>
        <input type="text" placeholder="Name" />
        <div class="lat-lng">
          <input type="number" disabled placeholder="Lat:" />
          <input type="number" disabled placeholder="Lat:" />
          <p class="warn">Please mark map to see Lat and Lng</p>
        </div>
        <input type="number" placeholder="Pick Up Order" />
        <input type="text" placeholder="Trip Duration" disabled />
        <button class="primary">Create Route</button>
      </div>
      <div class="map">
        <GmapMap
          :center="{ lat: 41, lng: 29 }"
          :zoom="10"
          map-type-id="terrain"
          style="width: 500px; height: 300px"
        >
        </GmapMap>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
