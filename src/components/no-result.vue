<template>
  <div class="note-empty">
    <img class="empty__image" src="../assets/empty.png">
    <div class="empty__message">{{message}}</div>
    <div class="empty__mock-btn" v-if="showMockBtn" @click="handleClickMockBtn">使用 Mock 数据</div>
  </div>
</template>

<script>
export default {
  props: {
    message: { type: String, default: "" },
    showMockBtn: { type: Boolean, default: true }
  },
  methods: {
    handleClickMockBtn() {
      this.$emit("click-mock-btn");
    }
  }
};
</script>

<style lang='less'>
.note-empty {
  position: relative;
  text-align: center;
  margin-top: 40px;
  color: #999;
  .empty__image {
    display: block;
    margin: 40px auto;
    width: 180px;
    height: 180px;
    opacity: 0.05;
  }
  .empty__message {
    margin-bottom: 20px;
  }
  .empty__mock-btn {
    display: inline-block;
    font-size: 14px;
    line-height: 1.4;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 4px 8px;
  }
}
</style>
