import { profile } from "console";
import { register } from "module";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  appType: "mpa",
  base: "",
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
        login: resolve(__dirname, "./auth/login.html"),
        register: resolve(__dirname, "./auth/register.html"),
        createPost: resolve(__dirname, "./post/createPost.html"),
        profile: resolve(__dirname, "./profile/profile.html"),
      },
    },
  },
});
