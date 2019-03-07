<template>
  <div class="note-toast">
    <div class="note_mask_transparent" v-show="isShowMask && show"></div>
    <div class="note_toast" v-show="show">
      <div class="note_toast_main">
        <p class="note_toast_content" v-if="text" v-html="text"></p>
        <p class="note_toast_content" v-if="!text">
          <slot></slot>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean,
    time: { type: Number, default: 1000 },
    width: { type: String, default: "7.6em" },
    isShowMask: { type: Boolean, default: false },
    text: { type: String }
  },
  data() {
    return { show: false };
  },
  created() {
    if (this.value) this.show = true;
  },
  watch: {
    show(val) {
      if (val) {
        this.$emit("input", true);
        this.$emit("on-show");
      }
      if (val) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.show = false;
          this.$emit("input", false);
          this.$emit("on-hide");
        }, this.time);
      }
    },
    value(val) {
      this.show = val;
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
.note_mask_transparent {
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.note_toast {
  position: fixed;
  z-index: 101;
  min-height: 7.6em;
  top: 120px;
  text-align: center;
  left: 0;
  right: 0;
  color: #ffffff;
  .note_toast_main {
    background: rgba(40, 40, 40, 0.75);
    padding: 0 10px;
    border-radius: 5px;
    display: inline-block;
    max-width: 80%;
    min-width: 7.6em;
    font-size: 14px;
    line-height: 1.4;
  }
  .note_toast_content {
    margin: 10px 0;
  }
}
</style>
