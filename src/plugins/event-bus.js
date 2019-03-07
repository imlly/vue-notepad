import Vue from "vue";

const bus = new Vue();
function VueEventBus() {
  Object.defineProperties(bus, {
    on: {
      get: function get() {
        return this.$on;
      }
    },
    once: {
      get: function get() {
        return this.$once;
      }
    },
    off: {
      get: function get() {
        return this.$off;
      }
    },
    emit: {
      get: function get() {
        return this.$emit;
      }
    }
  });
  if (Vue.prototype.$bus) {
    return;
  }
  Object.defineProperty(Vue.prototype, "$bus", {
    get: function get() {
      return bus;
    }
  });
}

export default VueEventBus;
