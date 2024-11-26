import { makeBids } from "../../api/post/createBids";

export async function onMakeBids () {
    try {
        if (!localStorage.token) {
            return error
        } 
        const bidsInput = document.getElementById("bidsInput").value;
        const postId = localStorage.getItem("selectedPostId");
        const requestBody = {"amount": bidsInput};

        const data = await makeBids(postId, requestBody);
        console.log(data);
    } catch (error) {
        throw new Error(`Error: ${response.status}`);
    }
}
