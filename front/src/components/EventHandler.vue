<template>
  <div>
    <div id="event-handling">
      <p>{{ message }}</p>
      <input v-model="message" />
      <button @click="reverseMsg">Reverse Message</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventHandler",
  data() {
    return {
      message: "Coucou Romée !",
    };
  },
  methods: {
    reverseMsg() {
      this.message = this.message.split("").reverse().join("");
    },
  },
};
</script>