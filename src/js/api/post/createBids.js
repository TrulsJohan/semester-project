import { API_AUCTION_LISTINGS, API_KEY } from "../constants";

export async function placeBid(requestBody, selectedPostId) {
    try {
        const token = localStorage.getItem("token");

        // Ensure the token is present
        if (!token) {
            throw new Error("Authorization token is missing. Please log in.");
        }

        // Construct the URL
        const url = `${API_AUCTION_LISTINGS}/${selectedPostId}/bids`;

        // Log request details
        console.log("Placing bid...");
        console.log("Request URL:", url);
        console.log("Request Body:", JSON.stringify(requestBody));
        console.log("Authorization Token:", token);

        // Make API call
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "X-Noroff-API-Key": API_KEY,
            },
            body: JSON.stringify(requestBody),
        });

        // Check if the response is OK
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Response Error Data:", errorData);
            throw new Error(errorData.message || `Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Bid placed successfully:", data);
        return data;

    } catch (error) {
        console.error("Error during placing a bid:", error.message);
        throw error;
    }
}
