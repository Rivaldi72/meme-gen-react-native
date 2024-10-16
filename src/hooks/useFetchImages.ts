import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, IMAGE_ENDPOINT } from '../constants/apiConstants';
import { ImageItem } from '../types/imageTypes';

const useFetchImages = () => {
    const [images, setImages] = useState<ImageItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchImages = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_BASE_URL}${IMAGE_ENDPOINT}`);
            setImages(response.data.data.memes);
        } catch (err) {
            setError('Failed to fetch images');
            console.error('Error fetching images', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    return { images, loading, fetchImages, error };
};

export default useFetchImages;
