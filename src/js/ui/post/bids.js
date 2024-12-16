import { placeBid } from '../../api/post/bids';

export async function onPlaceBid(bidAmount) {
    try {
        if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
            alert('Please enter a valid bid amount.');
            return;
        }

        const selectedPostId = localStorage.getItem('selectedPostId');
        if (!selectedPostId) {
            throw new Error('Selected Post ID is missing from localStorage.');
        }

        const requestBody = { amount: parseFloat(bidAmount) };
        const response = await placeBid(requestBody, selectedPostId);

        if (!response) {
            throw new Error('No response received from server.');
        }

        alert('Your bid was successfully placed!');
    } catch (error) {
        alert('Failed to place bid: ' + error.message);
    }
}
