<template>
  <div class="note-confirm">
    <transition name="note-fade">
      <div class="confrim__mask" @click="handleCloseConfirm" v-show="show"></div>
    </transition>
    <transition name="note-fade">
      <div class="confirm__main" v-show="show">
        <div class="confirm__header one-px-line-bottom" v-if="headerText">
          <div class="header__text ellipsis">{{headerText}}</div>
          <div class="icon-wrap" @click="handleCloseConfirm">
            <div class="cross-icon"></div>
          </div>
        </div>
        <div class="confirm__body one-px-line-bottom">
          <p class="body__text" v-if="bodyText">{{bodyText}}</p>
          <slot v-else></slot>
        </div>
        <div class="confirm__ops">
          <div
            class="op__item ops__cancel one-px-line-right"
            v-if="showCancel"
            @click="handleClickCancel"
          >{{cancelText}}</div>
          <div class="op__item ops__confirm" @click="handleClickConfirm">{{confirmText}}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Boolean, default: false },
    headerText: { type: String, default: "" },
    bodyText: { type: String, default: "" },
    showCancel: { type: Boolean, default: false },
    cancelText: { type: String, default: "取消" },
    confirmText: { type: String, default: "确认" }
  },
  data() {
    return { show: this.value };
  },
  watch: {
    value(v) {
      this.show = v;
    },
    show(v) {
      this.$emit("input", v);
    }
  },
  methods: {
    handleClickCancel() {
      this.$emit("cancel");
    },
    handleClickConfirm() {
      this.$emit("confirm");
    },
    handleCloseConfirm() {
      this.show = false;
      this.$emit("close");
    }
  }
};
</script>

<style lang="less">
.note-fade-enter-active,
.note-fade-leave-active {
  transition: opacity 0.2s;
}
.note-fade-enter,
.note-fade-leave-to {
  opacity: 0;
}

.note-confirm {
  position: relative;

  .confrim__mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }
  .confirm__main {
    position: fixed;
    z-index: 101;
    top: 120px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    background-color: #fff;
    border-radius: 4px;
    overflow: hidden;
    box-sizing: border-box;
  }
  .confirm__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 15px;
    .header__text {
      font-size: 16px;
      font-weight: 500;
      line-height: 36px;
    }
    .icon-wrap {
      transform: rotate(45deg);
    }
  }
  .confirm__body {
    padding: 10px 15px;
    .body__text {
      margin: 6px 0;
      line-height: 1.4;
    }
  }
  .confirm__ops {
    text-align: center;
    display: flex;
    .op__item {
      padding: 10px 15px;
      line-height: 1.4;
      font-weight: 500;
      flex: 1;
    }

    .ops__confirm {
      color: #5470fe;
    }
    .ops__cancel {
      color: #fe5848;
    }
  }
}
</style>

