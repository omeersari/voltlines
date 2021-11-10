<template>
  <div>Route Detail</div>
</template>

<script>
export default {
  data() {
    return {
      item: "",
    };
  },
  created() {
    this.item = this.$route.params.item;
  },
};
</script>
