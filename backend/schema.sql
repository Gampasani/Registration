DROP TABLE IF EXISTS company_profile CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  signup_type VARCHAR(1) NOT NULL DEFAULT 'e',
  gender CHAR(1) CHECK (gender IN ('m','f','o')), -- ✅ made optional (removed NOT NULL)
  mobile_no VARCHAR(20) UNIQUE, -- ✅ made optional
  is_mobile_verified BOOLEAN DEFAULT false,
  is_email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Company Profile Table
CREATE TABLE IF NOT EXISTS company_profile (
  id SERIAL PRIMARY KEY,
  owner_id INT NOT NULL REFERENCES users(id),
  company_name TEXT NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(50) NOT NULL,
  state VARCHAR(50) NOT NULL,
  country VARCHAR(50) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  website TEXT,
  logo_url TEXT,
  banner_url TEXT,
  industry TEXT NOT NULL,
  founded_date DATE,
  description TEXT,
  social_links JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- Insert sample users
INSERT INTO users (email, password, full_name, gender, mobile_no, is_email_verified)
VALUES
('test1@example.com', '$2a$10$J8xYQHoXQ2D9z0m7GZ9beOitkJz8wK7h4AEPiZLshwX8OQZ7JG1ie', 'Test User 1', 'm', '9999999999', true),
('test2@example.com', '$2a$10$J8xYQHoXQ2D9z0m7GZ9beOitkJz8wK7h4AEPiZLshwX8OQZ7JG1ie', 'Test User 2', 'f', '8888888888', true);

-- Insert a sample company owned by test1
INSERT INTO company_profile (owner_id, company_name, address, city, state, country, postal_code, website, industry, description)
VALUES
(1, 'BlueStock', 'Hyderabad', 'Hyderabad', 'Telangana', 'India', '500081', 'https://bluestock.in', 'IT Services', 'We provide IT consulting and software solutions.');
