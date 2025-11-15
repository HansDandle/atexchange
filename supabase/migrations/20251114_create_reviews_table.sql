-- Create the reviews table
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    venue_id UUID REFERENCES venue_profiles(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    rating NUMERIC(2, 1) NOT NULL CHECK (rating >= 0.5 AND rating <= 4.0),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);