-- Migration: Add display_order column to tables for sorting/reordering
-- Run this in your Supabase SQL Editor

-- Add display_order to executives table
ALTER TABLE executives ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Add display_order to alumni table
ALTER TABLE alumni ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Add display_order to merch_items table
ALTER TABLE merch_items ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Add display_order to news_items table
ALTER TABLE news_items ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Initialize display_order for existing records (set to id to maintain current order)
UPDATE executives SET display_order = id WHERE display_order = 0;
UPDATE alumni SET display_order = id WHERE display_order = 0;
UPDATE merch_items SET display_order = id WHERE display_order = 0;
UPDATE news_items SET display_order = id WHERE display_order = 0;

-- Create indexes for faster sorting
CREATE INDEX IF NOT EXISTS idx_executives_display_order ON executives(display_order);
CREATE INDEX IF NOT EXISTS idx_alumni_display_order ON alumni(display_order);
CREATE INDEX IF NOT EXISTS idx_merch_items_display_order ON merch_items(display_order);
CREATE INDEX IF NOT EXISTS idx_news_items_display_order ON news_items(display_order);
