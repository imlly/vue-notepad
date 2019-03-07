import DataSource from "@data-source/index.js";

export default function install(vue) {
  const ds = new DataSource();
  Object.defineProperty(vue.prototype, "$dataSource", {
    get: function get() {
      return ds;
    }
  });
}
