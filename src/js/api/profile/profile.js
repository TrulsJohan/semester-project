import { API_AUCTION_PROFILE } from '../constants';
import { loggedIn } from '../headers';

const header = await loggedIn();

export async function getProfile(
    name,
    includeListings = false,
    includeWins = false
) {
    try {
        const queryParams = new URLSearchParams({
            _listings: includeListings,
            _wins: includeWins,
        });

        const response = await fetch(
            `${API_AUCTION_PROFILE}/${name}?${queryParams}`,
            {
                method: 'GET',
                headers: header,
            }
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
}

export async function getProfileBids() {
    try {
        const name = localStorage.getItem(`user`);
        const response = await fetch(
            `${API_AUCTION_PROFILE}/${name}/bids?_listings=true`,
            {
                method: 'GET',
                headers: header,
            }
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
}
