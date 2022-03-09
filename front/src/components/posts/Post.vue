<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col v-if="!post.thread" cols="10" sm="8" md="6">
        <v-card>
          <v-card-header>
            <v-card-header-text>{{ publicationInfos }}</v-card-header-text>
          </v-card-header>
          <v-card-text>{{ post.content }}</v-card-text>
          <v-img
            v-if="post?.image"
            :src="post.image"
            @click="toggleFullscreen($event)"
          />
          <v-card-actions>
            <v-btn
              v-if="isModerator || isOwner"
              :icon="mdiCloseCircle"
              @click="hidePost(post.id)"
            />
            <v-btn
              :icon="commentForm ? mdiCommentRemove : mdiCommentPlus"
              @click="commentForm = !commentForm"
            />
            <v-btn
              flat
              v-show="comments.length"
              @click="displayComments = !displayComments"
              >Commentaires ({{ comments.length }})</v-btn
            >
          </v-card-actions>
          <CommentForm
            v-show="commentForm"
            :thread="post.id"
            @send-comment="commentForm = false"
          />
          <Post
            v-if="displayComments"
            v-for="comment of comments"
            :key="comment.id"
            :post="comment"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { mdiCloseCircle, mdiCommentPlus, mdiCommentRemove } from "@mdi/js";
import { useStore } from "vuex";
import { computed, toRefs, ref, onMounted } from "vue";
import CommentForm from "./CommentForm.vue";

const commentForm = ref(false);
const displayComments = ref(false);

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

const publicationInfos = computed(() => {
  const pubDate = new Date(post.value.createdAt);
  return `Publié par ${post.value.user.firstname} ${
    post.value.user.lastname
  } le ${pubDate.toLocaleDateString("fr-FR")} à ${pubDate.toLocaleTimeString(
    "fr-FR"
  )}`;
});

const moderatePost = (id) => store.dispatch("posts/moderate", id);
const deletePost = (id) => store.dispatch("posts/remove", id);

const hidePost = (id) =>
  isModerator.value ? moderatePost(id) : deletePost(id);

const toggleFullscreen = ($event) => {
  const element = $event.target;
  if (document.fullscreenElement) {
    return document.exitFullscreen(); // exit fullscreen on next click
  }
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (this.element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen(); // Safari
  } else if (this.element.msRequestFullscreen) {
    element.msRequestFullscreen(); // IE11
  }
};

const comments = computed(() => store.state.posts[post.value.id] || []);

onMounted(() => {
  console.log("comments", comments.value);
  console.log("post.id", post.value);
});
</script>
