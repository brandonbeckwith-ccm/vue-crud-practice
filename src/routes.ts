import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/TodoView.vue")
    },{
      path: "/edit",
      name: "edit",
      props: route => ({query: route.query.id}),
      component: () => import("./views/EditView.vue")
    },{
      path: "/add",
      name: "add",
      component: () => import("./views/AddView.vue")
    }
  ]
});