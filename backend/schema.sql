-- =========================================================================
-- Aaruthra Studio - SQL Database Schema & Seed Data (PostgreSQL / SQLite)
-- South Indian Wedding & Heritage Photography Atelier
-- =========================================================================

-- 1. Bookings Table
CREATE TABLE IF NOT EXISTS backend_booking (
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    email VARCHAR(254) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    event_date DATE NOT NULL,
    event_type VARCHAR(128) NOT NULL,
    package_name VARCHAR(128) NOT NULL,
    venue_location VARCHAR(255) NOT NULL,
    guest_count VARCHAR(64),
    notes TEXT,
    status VARCHAR(32) DEFAULT 'pending',
    estimated_amount VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Contact Messages Table (WhatsApp, Email, Direct Call Inquiries)
CREATE TABLE IF NOT EXISTS backend_contactmessage (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(254) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    preferred_contact VARCHAR(32) DEFAULT 'whatsapp',
    replied BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Gallery Photos Table (Cloudinary storage backed)
CREATE TABLE IF NOT EXISTS backend_galleryphoto (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(64) DEFAULT 'all',
    category_label VARCHAR(128) NOT NULL,
    location VARCHAR(128) NOT NULL,
    image_url VARCHAR(1000) NOT NULL,
    cloudinary_public_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Packages Table
CREATE TABLE IF NOT EXISTS backend_package (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    badge VARCHAR(128),
    description TEXT NOT NULL,
    price VARCHAR(64) NOT NULL,
    price_raw INTEGER NOT NULL,
    duration VARCHAR(128) NOT NULL,
    photographers VARCHAR(255) NOT NULL,
    is_popular BOOLEAN DEFAULT FALSE
);

-- 5. Seed Initial Packages
INSERT INTO backend_package (name, badge, description, price, price_raw, duration, photographers, is_popular) VALUES
('The Heritage Archive', 'Most Coveted', 'Comprehensive heirloom coverage spanning sacred rituals, Muhurtham, candid moments, and aerial cinematography.', '₹3,50,000', 350000, '3 Full Days', '4 Lead Photographers + 2 Cinematographers + Drone Pilot', true),
('The Sacred Muhurtham', 'Traditional Essential', 'Intimate focus on core Vedic ceremony, Oonjal, Kanyadaanam, and family portraiture.', '₹2,25,000', 225000, '2 Days (Muhurtham & Reception)', '3 Lead Masters + 1 Cinematographer', false),
('The Legacy Chronicle', 'Ultra-Luxury Bespoke', 'Multi-day global destination celebration with luxury hand-bound Italian leather albums and private teaser showcase.', '₹5,75,000', 575000, '4+ Days (Unlimited)', 'Complete 7-Artist Master Team + Fine Art Director', false);
