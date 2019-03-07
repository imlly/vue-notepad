<template>
  <header class="note-header" :class="{ shadow: canClickHeader }" @click="handleClickHeader">
    <div class="header__icon left" v-if="showLeftIcon" @click.stop="handleClickLeft"></div>
    <div class="header__title">{{title}}</div>
    <div class="header__icon right" v-if="showRightIcon">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script>
import { throttle, getPlatform } from "@utils/index";

export default {
  props: {
    title: { type: String, isRequired: true },
    showLeftIcon: { type: Boolean, default: false },
    showRightIcon: { type: Boolean, default: false }
  },
  data() {
    return { canClickHeader: false };
  },
  methods: {
    handleClickLeft() {
      this.$emit("click-left");
    },
    handleClickHeader() {
      if (!this.canClickHeader) return;
      const el =
        getPlatform() === "ios"
          ? window.document.body
          : window.document.documentElement;
      // const el = window.document.documentElement;
      const startTime = Date.now();
      const time = 200;
      const offset = el.scrollTop;
      const toTop = () => {
        const timeNow = Date.now();
        const passed = timeNow - startTime;
        if (passed < time) {
          el.scrollTop = offset * (1 - passed / time);
          window.requestAnimationFrame(toTop);
        } else {
          el.scrollTop = 0;
          this.canClickHeader = false;
        }
      };
      window.requestAnimationFrame(toTop);
    }
  },
  mounted() {
    const el = window.document.body;
    window.addEventListener(
      "scroll",
      throttle(() => {
        const rect = el.getBoundingClientRect();
        const topFlag = rect.top;
        if (topFlag <= -47) {
          this.canClickHeader = true;
        } else {
          this.canClickHeader = false;
        }
      }, 100)
    );
  }
};
</script>

<style lang="less">
.note-header {
  position: fixed !important;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 47px;
  padding: 0 20px;
  z-index: 10;
  background-color: #fff;

  &.shadow {
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
  }

  .header__title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
  }
  .header__icon.left {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;

    &::before {
      content: "";
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%) rotate(-45deg);
      width: 12px;
      height: 12px;
      border: none;
      border-top: 2px solid #333;
      border-left: 2px solid #333;
    }
  }
  .header__icon.right {
    position: absolute;
    top: 50%;
    right: 14px;
    transform: translateY(-50%);
    min-width: 36px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
