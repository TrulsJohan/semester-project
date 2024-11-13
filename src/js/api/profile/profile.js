import { API_AUCTION_PROFILE } from "../constants";
import { API_KEY } from "../constants";

const name = localStorage.getItem(`user`);

export async function getProfile(){
    try {
        const response = await fetch(`${API_AUCTION_PROFILE}/${name}`, {
          method: 'GET',
          headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              "X-Noroff-API-Key": API_KEY,
          },
        });
    
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