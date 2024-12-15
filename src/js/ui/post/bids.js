import { placeBid } from "../../api/post/bids";

export async function onPlaceBid(bidAmount) {
    try {
        // Validate bid amount
        if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
            alert("Please enter a valid bid amount.");
            return;
        }

        console.log(`Bid placed: ${bidAmount}`);

        // Retrieve post ID
        const selectedPostId = localStorage.getItem("selectedPostId");
        if (!selectedPostId) {
            throw new Error("Selected Post ID is missing from localStorage.");
        }

        // Construct request body
        const requestBody = { amount: parseFloat(bidAmount) };

        // Call API to place bid
        const response = await placeBid(requestBody, selectedPostId);

        if (!response) {
            throw new Error("No response received from server.");
        }

        console.log("Bid successfully placed:", response);
        alert("Your bid was successfully placed!");
    } catch (error) {
        console.error("Error during placing a bid:", error.message);
        alert("Failed to place a bid. Please try again.");
    }
}
