import { getPostId } from "../../api/post/read";

async function renderPostId() {
    const postId = localStorage.getItem("selectedPostId");
    const data = await getPostId(postId);
    console.log(data);
}

renderPostId()
