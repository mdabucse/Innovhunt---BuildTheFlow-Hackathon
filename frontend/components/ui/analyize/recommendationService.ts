import axios from 'axios';

const apiUrl = 'http://127.0.0.1:5000/recommend';

export const getRecommendations = async (productName: string) => {
    console.log("Requesting recommendations for:", productName);
    try {
        const response = await axios.post(apiUrl, { name: productName });
        console.log("Response from API:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching recommendations', error);
        return [];
    }
};
