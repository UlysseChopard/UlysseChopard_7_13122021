<template>
  <div id="register">
    <form>
      <ul>
        <li>
          <label for="pseudo">Pseudo :</label>
          <input type="text" id="pseudo" required v-model="user.pseudo" />
        </li>
        <li>
          <label for="mail">Mail :</label>
          <input type="mail" id="mail" required v-model="user.mail" />
        </li>
        <li>
          <label for="password">Password</label>
          <input
            type="password"
            minlenght="6"
            maxlenght="9"
            required
            v-model="user.password"
          />
        </li>
        <li>
          <button type="button" @click="registerUser(user)">
            Register now !
          </button>
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
import { registerUser } from "../services/auth.js";

export default {
  name: "RegisterForm",
  data() {
    return {
      user: {
        pseudo: "",
        mail: "",
        password: "",
      },
    };
  },
  methods: { registerUser },
};
</script>
