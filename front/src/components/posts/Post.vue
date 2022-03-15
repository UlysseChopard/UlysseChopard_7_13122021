<template>
  <v-card :elevation="post?.thread ? 2 : 8">
    <v-card-header>
      <v-card-header-text>{{ publicationInfos }}</v-card-header-text>
    </v-card-header>
    <v-card-title>{{ post.content }}</v-card-title>
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
        v-show="comments && comments.length > 2"
        @click="displayComments = !displayComments"
        >Commentaires ({{ comments.length }})</v-btn
      >
    </v-card-actions>
    <v-row justify="end">
      <v-col cols="11">
        <CommentForm
          v-show="commentForm"
          :thread="post.id"
          @send-comment="commentForm = false"
        />
        <Post
          v-if="displayComments || (comments?.length && comments.length <= 2)"
          v-for="comment of comments"
          :key="comment.id"
          :post="comment"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { mdiCloseCircle, mdiCommentPlus, mdiCommentRemove } from "@mdi/js";
import { useStore } from "vuex";
import { computed, toRefs, ref } from "vue";
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
  return `${post.value.user.firstname} ${
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
</script>
