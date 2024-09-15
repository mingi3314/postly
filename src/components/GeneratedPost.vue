<template>
  <div class="instagram-post">
    <div class="post-header">
      <div class="profile-picture"></div>
      <div class="username">username</div>
      <div class="more-options">...</div>
    </div>
    <div class="post-image"></div>
    <div class="post-actions">
      <span class="action-icon">♥</span>
      <span class="action-icon">💬</span>
      <span class="action-icon">▶</span>
      <span class="action-icon save-icon">🏷</span>
    </div>
    <div class="likes">1,234 likes</div>
    <div class="caption">
      <span class="username">username</span> {{ content }}
    </div>
    <div class="comments">View all 123 comments</div>
    <div class="timestamp">2 HOURS AGO</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "GeneratedPost",
  props: {
    content: {
      type: String as PropType<string>,
      required: true,
    },
  },
});
</script>

<style scoped>
.instagram-post {
  max-width: 600px;
  width: 100%;
  border: 1px solid var(--border-color);
  border-radius: 3px;
  margin: 0 auto;
  background-color: var(--background-color);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
}

.post-header {
  display: flex;
  align-items: center;
  padding: 14px 16px;
}

.profile-picture {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #efefef;
  margin-right: 10px;
}

.username {
  font-weight: 600;
  font-size: 14px;
}

.more-options {
  margin-left: auto;
  font-weight: bold;
}

.post-image {
  width: 100%;
  height: 375px;
  background-color: #efefef;
}

.post-actions {
  padding: 8px 16px;
  font-size: 24px;
}

.action-icon {
  margin-right: 16px;
}

.save-icon {
  float: right;
}

.likes {
  padding: 0 16px;
  font-weight: 600;
  font-size: 14px;
}

.caption {
  padding: 8px 16px;
  font-size: 14px;
  line-height: 1.4;
}

.comments,
.timestamp {
  padding: 8px 16px;
  font-size: 14px;
  color: #8e8e8e;
}

@media (max-width: 600px) {
  .instagram-post {
    max-width: 100%;
    width: 100%;
    margin: 0;
    border: none;
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
  }
}
</style>
