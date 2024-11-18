import React, { useEffect, useState } from 'react';

function UserDetails() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Placeholder for API request
        // Replace with your actual API call logic
        const fetchUserDetails = async () => {
            try {
                // Simulate API call with a timeout
                const response = await new Promise((resolve) =>
                    setTimeout(() => resolve({ 
                        name: 'John Doe', 
                        email: 'john.doe@example.com', 
                        username: 'johndoe123' 
                    }), 1000)
                );
                setUser(response);
            } catch (err) {
                setError('Failed to fetch user details.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    if (loading) {
        return <p>Loading user details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!user) {
        return <p>No user details available.</p>;
    }

    return (
        <div className="user-details-container">
            <h2>User Details</h2>
            <ul>
                <li><strong>Name:</strong> {user.name}</li>
                <li><strong>Email:</strong> {user.email}</li>
                <li><strong>Username:</strong> {user.username}</li>
                {/* Add more details as needed */}
            </ul>
        </div>
    );
}

export default UserDetails;
