import { onCreatePost } from "../../ui/post/createPost.js";

const form = document.forms.createPost;

form.addEventListener("submit", onCreatePost);
