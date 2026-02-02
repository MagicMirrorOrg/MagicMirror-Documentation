// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";

import BackToTopButton from "@miletorix/vitepress-back-to-top-button";
import "@miletorix/vitepress-back-to-top-button/style.css";

function rewrite(path: string): string | null {
  // Example: VuePress legacy prefix
  if (path.startsWith("/development/"))
    return path.replace("/development/", "/module-development/");

  return null;
}

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    BackToTopButton(app);
    router.onBeforeRouteChange = (to) => {
      const next = rewrite(to);
      if (next && next !== to) {
        // Replace instead of push: avoids back-button loops
        router.go(next);
        return false; // cancel original navigation
      }
    };
  },
} satisfies Theme;
