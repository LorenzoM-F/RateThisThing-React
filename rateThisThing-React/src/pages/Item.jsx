import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/Item.css';
import Back from '../components/Back';

function Item() {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`http://localhost:3001/items/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch item details');
                }
                const data = await response.json();
                setItem(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await fetch(`http://localhost:3001/items/${id}/reviews`);
                if (!response.ok) {
                    throw new Error('Failed to fetch item reviews');
                }
                const data = await response.json();
                setReviews(data);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchRatings = async () => {
            try {
                const response = await fetch(`http://localhost:3001/items/${id}/ratings`);
                if (!response.ok) {
                    throw new Error('Failed to fetch item ratings');
                }
                const data = await response.json();
                setRatings(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchItem();
        fetchReviews();
        fetchRatings();
    }, [id]);

    if (loading) {
        return <p className="loading-text">Loading item details...</p>;
    }

    if (error) {
        return <p className="error-text">Error: {error}</p>;
    }

    if (!item) {
        return <p className="not-found-text">Item not found</p>;
    }

    // Helper function to get the rating for a specific user
    const getUserRating = (userId) => {
        const rating = ratings.find(r => r.userId === userId);
        return rating ? rating.rating : 0; // Default to 0 stars if no rating found
    };

    return (
        <>
            <div className="item-container">
                <h2 className="item-title">{item.name}</h2>
                <p className="item-description"><strong>Description:</strong> {item.description}</p>
                <p className="item-category"><strong>Category:</strong> {item.categoryName}</p>

                <h3 className="reviews-title">Reviews</h3>
                {reviews.length > 0 ? (
                    <div className="reviews-container">
                        {reviews.map((review, index) => (
                            <div key={index} className="review-card">
                                <div className="review-rating">
                                    {[...Array(getUserRating(review.userId))].map((_, starIndex) => (
                                        <span key={starIndex} className="stars" style={{ color: 'gold' }}>
                                            &#9733;
                                        </span>
                                    ))}
                                </div>
                                <p className="review-text">{review.reviewText}</p>
                                <p className="review-date">{new Date(review.reviewDate).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-reviews-text">No reviews available for this item.</p>
                )}
            </div>
            <Back />
        </>
    );
}

export default Item;
