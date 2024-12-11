import { placeBid } from "../../api/post/createBids";

export async function onPlaceBid(bidAmount) {
    try {
        if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
            alert("Please enter a valid bid amount.");
            return;
        }

        console.log(`Bid placed: ${bidAmount}`);

        const requestBody = { amount: Number(bidAmount) };
        const selectedPostId = localStorage.getItem("selectedPostId");

        if (!selectedPostId) {
            throw new Error("Selected Post ID is missing from localStorage.");
        }

        const response = await placeBid(requestBody, selectedPostId);

        if (!response) {
            throw new Error("No response received from server.");
        }

        console.log("Bid successfully placed:", response);
    } catch (error) {
        console.error('Error during placing a bid:', error);
        throw error;
    }
}
