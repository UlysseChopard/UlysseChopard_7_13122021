<template>
  <div>
    <div id="counter">Counter: {{ counter }}</div>
    <div id="bind-attr">
      <span :title="message"
        >Hover your mouse over me for a few seconds to see my dynamically bound
        title !
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Counter",
  data() {
    return {
      counter: 0,
      message: `You loaded this page on ${new Date().toLocaleString()}`,
    };
  },
  mounted() {
    setInterval(() => {
      this.counter++;
    }, 1000);
  },
};
</script>