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
        login: resolve(__dirname, "./auth/login/login.html"),
        register: resolve(__dirname, "./auth/register/register.html"),
        create: resolve(__dirname, "./post/create/create.html"),
        profile: resolve(__dirname, "./profile/index.html"),
        post: resolve(__dirname, "./post/post/post.html"),
      },
    },
  },
});
