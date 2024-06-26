import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/home/HomeView.vue";
import Cookies from "js-cookie";
const getToken = () => Cookies.get("token");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () =>
        import(/* webpackChunkName: "home" */ "../views/home/HomeView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        import(
          /* webpackChunkName: "index" */ "../views/auth/RegisterView.vue"
        ),
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "create" */ "../views/auth/LoginView.vue"),
    },
    {
      path: "/admin/dashboard",
      name: "dashboard",
      component: () =>
        import(/* webpackChunkName: "home" */ "../views/admin/dashboard.vue"),
      meta: { requiresAuth: true }, // <-- Add meta field
    },
    {
      path: "/admin/users",
      name: "admin.users.index",
      component: () =>
        import(/* webpackChunkName: "home" */ "../views/admin/users/index.vue"),
      meta: { requiresAuth: true }, // <-- Add meta field
    },
    {
      path: "/admin/users/create",
      name: "admin.users.create",
      component: () =>
        import(
          /* webpackChunkName: "home" */ "../views/admin/users/create.vue"
        ),
      meta: { requiresAuth: true }, // <-- Add meta field
    },
    {
      path: "/admin/users/:id",
      name: "admin.users.edit",
      component: () =>
        import(/* webpackChunkName: "home" */ "../views/admin/users/edit.vue"),
      meta: { requiresAuth: true }, // <-- Add meta field
    },
  ],
});

// Global navigation guard
router.beforeEach((to, from, next) => {
  // Ambil token otentikasi pengguna
  const token = getToken();

  // Jika rute tujuan membutuhkan otentikasi dan pengguna tidak memiliki token
  if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
    // Alihkan pengguna ke halaman login
    next({ name: "login" });
  }
  // Jika rute tujuan adalah halaman login atau register dan pengguna sudah login
  else if ((to.name === "login" || to.name === "register") && token) {
    // Alihkan pengguna ke halaman dashboard
    next({ name: "dashboard" });
  }
  // Jika tidak ada kondisi khusus, izinkan navigasi ke rute tujuan
  else {
    next();
  }
});

export default router;
