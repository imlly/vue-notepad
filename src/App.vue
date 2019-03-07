<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
    <toast v-model="isShowToast" :time="toastDuration" :text="toastTitle"></toast>
  </div>
</template>

<script>
import Toast from "@components/toast";
// import { getPlatform } from "@utils/index.js";

export default {
  name: "vue-notepad",
  components: { Toast },
  data() {
    return {
      transitionName: "slide-left",
      isShowToast: false,
      toastDuration: 1500,
      toastTitle: ""
    };
  },
  watch: {
    $route(to, from) {
      const getStep = path => {
        if (typeof this.getDepth === "function") return this.getDepth(path);
        const subLength = path.split("-").filter(it => it).length;
        return path.split("/").filter(it => it).length + subLength * 0.1;
      };
      const toStep = getStep(to.path);
      const fromStep = getStep(from.path);
      // const platform = getPlatform();
      const platform = "";
      if (toStep < fromStep) {
        this.transitionName = platform !== "ios" ? "slide-right" : "";
      } else {
        this.transitionName = "slide-left";
      }
    }
  },
  created() {
    if (this.$bus) {
      this.$bus.on("show-toast", this.showToast);
      this.$bus.on("hide-toast", this.hideToast);
    }
  },
  methods: {
    showToast(title, type, duration) {
      this.isShowToast = true;
      this.toastTitle = title;
      if (duration > 0) {
        this.toastDuration = duration;
      }
    },
    hideToast() {
      this.isShowToast = false;
    }
  }
};
</script>

<style lang="less">
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: #fff;
}
.slide-left-enter-active,
.slide-right-enter-active {
  transition: transform 0.4s ease, opacity 0.1s ease;
  z-index: 1;
}
.slide-right-enter-active {
  z-index: -1;
}
.slide-left-leave-active,
.slide-right-leave-active {
  z-index: -1;
  transition: transform 0.4s ease, opacity 0.3s ease-in;
}
.slide-right-leave-active {
  z-index: 1;
}
.slide-left-enter,
.slide-right-leave-to {
  transform: translateX(150px);
  opacity: 0;
  z-index: 1;
}
.slide-right-leave-to {
  transform: translateX(375px);
}
.slide-right-enter,
.slide-left-leave-to {
  transform: translateX(-50px);
  opacity: 0;
  z-index: -1;
}
</style>
