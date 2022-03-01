<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="10" sm="8" md="6">
        <v-card>
          <v-card-actions>
            <v-menu v-if="isModerator || isOwner">
              <template #activator="{ props }">
                <v-btn v-bind="props" :icon="mdiDotsVertical" />
              </template>
              <v-btn flat @click="hidePost(post.id)"
                ><v-icon :icon="mdiCloseCircle"
              /></v-btn>
            </v-menu>
          </v-card-actions>
          <v-card-header>
            <v-card-header-text
              >{{ post.user.firstname }} {{ post.user.lastname }} le
              {{ new Date(post.createdAt).toLocaleDateString("fr-FR") }} à
              {{
                new Date(post.createdAt).toLocaleTimeString("fr-FR")
              }}</v-card-header-text
            >
          </v-card-header>
          <v-card-title>{{ post.title }}</v-card-title>
          <v-card-text>{{ post.content }}</v-card-text>
        </v-card>
        <v-img v-if="post?.image" :src="post.image" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { mdiCloseCircle, mdiDotsVertical } from "@mdi/js";
import { useStore } from "vuex";
import { computed, toRefs } from "vue";

const store = useStore();

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const { post } = toRefs(props);

const isModerator = computed(() => store.state.user.isModerator);
const isOwner = computed(
  () => post.value.user.email === store.state.user.email
);

const moderatePost = (id) => store.dispatch("posts/moderate", id);
const deletePost = (id) => store.dispatch("posts/remove", id);

const hidePost = (id) =>
  isModerator.value ? moderatePost(id) : deletePost(id);
</script>
