import List from "@pages/list.vue";
import Edit from "@pages/edit.vue";

const routes = [
  {
    path: "/note",
    component: List,
    name: "note-list"
  },
  {
    path: "/note/:id",
    component: Edit,
    name: "note-edit"
  },
  {
    path: "*",
    redirect: "/note"
  }
];

export default routes;
