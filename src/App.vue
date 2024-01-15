<template>
  <router-view/>
</template>

<script>
import { useAppStore } from "./store/app.js";
export default {
  name: "App",
  created() {
    this.$nextTick(() => {
        window.addEventListener('resize', this.onResize);
        this.onResize();
      });
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      this.appStore.isMobile = window.innerWidth < 600;
    }
  },
  setup() {
    const appStore = useAppStore();
    return {
      appStore
    };
  }
}
</script>

