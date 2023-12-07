import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import HelloWorld from "@/components/HelloWorld";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      children: [
        // ------------------X6---------------------
        {
          path: "/X6Demo1",
          name: "X6Demo1",
          component: () => import("@/page/x6/demo1.vue")
        },
        {
          path: "/X6Demo2",
          name: "X6Demo2",
          component: () => import("@/page/x6/demo2.vue")
        },
        // ------------------X6---------------------

        // ------------------G6---------------------
        {
          path: "/G6Demo1",
          name: "G6Demo1",
          component: () => import("@/page/g6/demo1.vue")
        },
        {
          path: "/G6Demo2",
          name: "G6Demo2",
          component: () => import("@/page/g6/demo2.vue")
        },
        {
          path: "/G6Demo3",
          name: "G6Demo3",
          component: () => import("@/page/g6/demo3.vue")
        },
        {
          path: "/G6Demo4",
          name: "G6Demo4",
          component: () => import("@/page/g6/demo4.vue")
        },
        {
          path: "/G6Demo5",
          name: "G6Demo5",
          component: () => import("@/page/g6/demo5.vue")
        },
        {
          path: "/G6Demo6",
          name: "G6Demo6",
          component: () => import("@/page/g6/demo6.vue")
        },
        {
          path: "/G6Demo7",
          name: "G6Demo7",
          component: () => import("@/page/g6/demo7.vue")
        },
        {
          path: "/G6Demo8",
          name: "G6Demo8",
          component: () => import("@/page/g6/demo8.vue")
        },
        {
          path: "/G6Demo9",
          name: "G6Demo9",
          component: () => import("@/page/g6/demo9.vue")
        },
        {
          path: "/G6Demo10",
          name: "G6Demo10",
          component: () => import("@/page/g6/demo10.vue")
        },
        // ------------------G6---------------------

        // ------------------Graph---------------------
        {
          path: "/GraphDemo1",
          name: "GraphDemo1",
          component: () => import("@/page/graph/demo1.vue")
        },
        {
          path: "/GraphDemo2",
          name: "GraphDemo2",
          component: () => import("@/page/graph/demo2.vue")
        },
        {
          path: "/GraphDemo3",
          name: "GraphDemo3",
          component: () => import("@/page/graph/demo3.vue")
        },
        {
          path: "/GraphDemo4",
          name: "GraphDemo4",
          component: () => import("@/page/graph/demo4.vue")
        },
        {
          path: "/GraphDemo5",
          name: "GraphDemo5",
          component: () => import("@/page/graph/demo5.vue")
        },
        {
          path: "/GraphDemo6",
          name: "GraphDemo6",
          component: () => import("@/page/graph/demo6.vue")
        },
        {
          path: "/GraphDemo7",
          name: "GraphDemo7",
          component: () => import("@/page/graph/demo7.vue")
        },
        {
          path: "/GraphDemo8",
          name: "GraphDemo8",
          component: () => import("@/page/graph/demo8.vue")
        },
        {
          path: "/GraphDemo9",
          name: "GraphDemo9",
          component: () => import("@/page/graph/demo9.vue")
        },
        {
          path: "/GraphDemo10",
          name: "GraphDemo10",
          component: () => import("@/page/graph/demo10.vue")
        },
        // ------------------G6---------------------

        // ------------------Graph---------------------
        {
          path: "/JsPlumbDemo1",
          name: "JsPlumbDemo1",
          component: () => import("@/page/jsPlumb/demo1.vue")
        },
        {
          path: "/JsPlumbDemo2",
          name: "JsPlumbDemo2",
          component: () => import("@/page/jsPlumb/demo2.vue")
        },
        {
          path: "/JsPlumbDemo3",
          name: "JsPlumbDemo3",
          component: () => import("@/page/jsPlumb/demo3.vue")
        },
        {
          path: "/JsPlumbDemo4",
          name: "JsPlumbDemo4",
          component: () => import("@/page/jsPlumb/demo4.vue")
        },
        {
          path: "/JsPlumbDemo5",
          name: "JsPlumbDemo5",
          component: () => import("@/page/jsPlumb/demo5.vue")
        },
        // ------------------JsPlumb---------------------

        // ------------------Table---------------------
        {
          path: "/TableDemo1",
          name: "TableDemo1",
          component: () => import("@/page/table/demo1.vue")
        },
        {
          path: "/TableDemo2",
          name: "TableDemo2",
          component: () => import("@/page/table/demo2.vue")
        },
        {
          path: "/TableDemo3",
          name: "TableDemo3",
          component: () => import("@/page/table/demo3.vue")
        },
        {
          path: "/TableDemo4",
          name: "TableDemo4",
          component: () => import("@/page/table/demo4.vue")
        },
        {
          path: "/TableDemo5",
          name: "TableDemo5",
          component: () => import("@/page/table/demo5.vue")
        },
        // ------------------Table---------------------
        {
          path: "/empty",
          component: () => import("@/components/Empty.vue")
        }
      ]
    },
    {
      path: "/empty",
      component: () => import("@/components/Empty.vue")
    }
  ]
});

export default router;

router.beforeEach((to, from, next) => {
  if (to.name) {
    document.title = to.name;
  } else {
    document.title = "relation-graph-vue2";
  }

  if (to.matched.length === 0) {
    next("/empty");
  } else {
    next();
  }
});
