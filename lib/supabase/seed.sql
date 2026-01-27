-- Seed data for Big Ideas Inc.
-- Run this after running schema.sql

-- Insert Categories
INSERT INTO categories (name, slug, description) VALUES
('Guitars & Bass', 'guitars-bass', 'Electric, acoustic, and bass guitars from top brands'),
('Synthesizers', 'synthesizers', 'Analog and digital synthesizers for all skill levels'),
('Studio & Recording', 'studio-recording', 'Professional studio equipment and recording gear'),
('Drums & Percussion', 'drums-percussion', 'Acoustic and electronic drums, percussion instruments'),
('Keys & Pianos', 'keys-pianos', 'Digital pianos, stage keyboards, and workstations'),
('Wind & Brass', 'wind-brass', 'Wind and brass instruments for all levels'),
('Speakers & Amplifiers', 'speakers-amplifiers', 'Guitar, bass, and keyboard amplifiers'),
('Accessories', 'accessories', 'Various musical accessories and gear'),
('Consumer Electronics', 'consumer-electronics', 'Audio accessories and consumer electronics')
ON CONFLICT (slug) DO NOTHING;

-- Insert Subcategories
WITH category_ids AS (
    SELECT id, slug FROM categories
)
INSERT INTO subcategories (category_id, name, slug, item_count) VALUES
-- Guitars & Bass subcategories
((SELECT id FROM category_ids WHERE slug = 'guitars-bass'), 'Electric Guitars', 'electric-guitars', 245),
((SELECT id FROM category_ids WHERE slug = 'guitars-bass'), 'Acoustic Guitars', 'acoustic-guitars', 189),
((SELECT id FROM category_ids WHERE slug = 'guitars-bass'), 'Bass Guitars', 'bass-guitars', 156),
((SELECT id FROM category_ids WHERE slug = 'guitars-bass'), 'Guitar Effects', 'guitar-effects', 432),

-- Synthesizers subcategories
((SELECT id FROM category_ids WHERE slug = 'synthesizers'), 'Analog Synths', 'analog-synths', 78),
((SELECT id FROM category_ids WHERE slug = 'synthesizers'), 'Digital Synths', 'digital-synths', 134),
((SELECT id FROM category_ids WHERE slug = 'synthesizers'), 'Modular Systems', 'modular-systems', 267),
((SELECT id FROM category_ids WHERE slug = 'synthesizers'), 'Grooveboxes', 'grooveboxes', 45),

-- Studio & Recording subcategories
((SELECT id FROM category_ids WHERE slug = 'studio-recording'), 'Studio Monitors', 'studio-monitors', 156),
((SELECT id FROM category_ids WHERE slug = 'studio-recording'), 'Audio Interfaces', 'audio-interfaces', 98),
((SELECT id FROM category_ids WHERE slug = 'studio-recording'), 'Microphones', 'microphones', 234),
((SELECT id FROM category_ids WHERE slug = 'studio-recording'), 'Cables & Connectors', 'cables-connectors', 567),

-- Drums & Percussion subcategories
((SELECT id FROM category_ids WHERE slug = 'drums-percussion'), 'Acoustic Drum Kits', 'acoustic-drum-kits', 89),
((SELECT id FROM category_ids WHERE slug = 'drums-percussion'), 'Electronic Drums', 'electronic-drums', 67),
((SELECT id FROM category_ids WHERE slug = 'drums-percussion'), 'Cymbals', 'cymbals', 234),
((SELECT id FROM category_ids WHERE slug = 'drums-percussion'), 'Percussion', 'percussion', 178),

-- Keys & Pianos subcategories
((SELECT id FROM category_ids WHERE slug = 'keys-pianos'), 'Digital Pianos', 'digital-pianos', 123),
((SELECT id FROM category_ids WHERE slug = 'keys-pianos'), 'Stage Keyboards', 'stage-keyboards', 89),
((SELECT id FROM category_ids WHERE slug = 'keys-pianos'), 'MIDI Controllers', 'midi-controllers', 156),
((SELECT id FROM category_ids WHERE slug = 'keys-pianos'), 'Workstations', 'workstations', 67),

-- Wind & Brass subcategories
((SELECT id FROM category_ids WHERE slug = 'wind-brass'), 'Saxophones', 'saxophones', 45),
((SELECT id FROM category_ids WHERE slug = 'wind-brass'), 'Trumpets', 'trumpets', 34),
((SELECT id FROM category_ids WHERE slug = 'wind-brass'), 'Trombones', 'trombones', 23),
((SELECT id FROM category_ids WHERE slug = 'wind-brass'), 'Flutes', 'flutes', 56),

-- Speakers & Amplifiers subcategories
((SELECT id FROM category_ids WHERE slug = 'speakers-amplifiers'), 'Guitar Amps', 'guitar-amps', 145),
((SELECT id FROM category_ids WHERE slug = 'speakers-amplifiers'), 'Bass Amps', 'bass-amps', 98),
((SELECT id FROM category_ids WHERE slug = 'speakers-amplifiers'), 'Keyboard Amps', 'keyboard-amps', 67),
((SELECT id FROM category_ids WHERE slug = 'speakers-amplifiers'), 'PA Systems', 'pa-systems', 123),

-- Accessories subcategories
((SELECT id FROM category_ids WHERE slug = 'accessories'), 'Guitar Picks', 'guitar-picks', 345),
((SELECT id FROM category_ids WHERE slug = 'accessories'), 'Straps & Cables', 'straps-cables', 289),
((SELECT id FROM category_ids WHERE slug = 'accessories'), 'Stands & Racks', 'stands-racks', 167),
((SELECT id FROM category_ids WHERE slug = 'accessories'), 'Cases & Gig Bags', 'cases-gig-bags', 213),

-- Consumer Electronics subcategories
((SELECT id FROM category_ids WHERE slug = 'consumer-electronics'), 'Headphones', 'headphones', 89),
((SELECT id FROM category_ids WHERE slug = 'consumer-electronics'), 'Mobile Phones', 'mobile-phones', 54),
((SELECT id FROM category_ids WHERE slug = 'consumer-electronics'), 'Laptops', 'laptops', 32),
((SELECT id FROM category_ids WHERE slug = 'consumer-electronics'), 'Consoles', 'consoles', 12)
ON CONFLICT (category_id, slug) DO NOTHING;

-- Insert sample products
WITH category_ids AS (
    SELECT id, slug FROM categories
),
subcategory_ids AS (
    SELECT id, slug, category_id FROM subcategories
)
INSERT INTO products (name, slug, category_id, subcategory_id, brand, price, old_price, description, image_url, rating, reviews_count, status, featured, stock_quantity) VALUES
(
    'Master Series Telecaster - Arctic White',
    'master-series-telecaster-arctic-white',
    (SELECT id FROM category_ids WHERE slug = 'guitars-bass'),
    (SELECT id FROM subcategory_ids WHERE slug = 'electric-guitars'),
    'Fender',
    1299.00,
    NULL,
    'The pinnacle of craftsmanship with Arctic White finish. Premium build quality and legendary Telecaster tone.',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAwYp5l1mQemPgU7sNkkRWHh_tG7u8_ULZrwyNuE6L5zVL2cCgXQdOS2lJMBe98368gEt9c08jAwfzCnwevc5zCc0hTvgOSWYvhg5p1j3LdiLZRckxzKwlLQz4Lo09DzZcogAWlJxLpc9hmuravQ1_Z-AVk0WVi-zh0K32qS7F2e60noHQL3sMqNEcFViS8OqcfyuVU_9WYYflN6m4nT9TYbwjENlsNN-aZ2exQVwhxNlfIe0H9Qt9zI1jmKPB7eRod3781VXGPeqrW',
    5.0,
    42,
    'In Stock',
    TRUE,
    15
),
(
    'Neumann KH 150 Pair',
    'neumann-kh-150-pair',
    (SELECT id FROM category_ids WHERE slug = 'studio-recording'),
    (SELECT id FROM subcategory_ids WHERE slug = 'studio-monitors'),
    'Neumann',
    2800.00,
    3200.00,
    'Bi-Amplified Studio Monitor with DSP and room correction. Professional-grade accuracy.',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC__89zTWgo7jrFLvCmdO52ks-IpLTZcsU354YO0yvBtyeARVvKrSq8cUoH6i4NLs2kB34O0ULzB4bm7fjpTiJhW6XUMj1-xtaXNH8O8KeXctlRntzNqxcCwjKG7FrAdp_YAWaeRYs2ywgM5uoGvGvilaIrLN09xeIOYLrcQpOxhpeZAOia7bn0kfXehGlOPjZ3JmAyoOYyxdWbnVrqmszhAhoj8gSMWP5qzB1J7TWNakK1zqNgpckQRuY077zQORZNTnpIUq3xHtA3',
    5.0,
    89,
    'In Stock',
    TRUE,
    8
),
(
    'Matriarch Semi-Modular Analog Synthesizer',
    'matriarch-semi-modular-analog-synthesizer',
    (SELECT id FROM category_ids WHERE slug = 'synthesizers'),
    (SELECT id FROM subcategory_ids WHERE slug = 'analog-synths'),
    'Moog',
    1999.00,
    NULL,
    '4-note paraphonic semi-modular analog synthesizer with built-in sequencer. Classic Moog sound.',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCHcV4mi4N7OB3vHlhmZJDbYucPyDFjivQ3--zc7zFwfQpChmTk5TyKcrwccK8v6dZ25ivBOCqrhgFiNXJPNr-lRk6KQo6R2SIZdRI8_WBEMmJVbCsf7iEUOjsVkYBGvqijOdwYqcKRtr3DSvqIsoJ_k2lZ4CzmR59lj1w749JWZRwAY-MJPTzwoIxfgba_ArBwTml0BajI3vGlnY6cQFmZg9WVeuX_NtyE67P0pckZnkbUL3lH5iIhq3KOBf2PnKvx8YoMBoWkNgO-',
    5.0,
    67,
    'In Stock',
    TRUE,
    5
),
(
    'Premium Braided Cable - 15ft',
    'premium-braided-cable-15ft',
    (SELECT id FROM category_ids WHERE slug = 'studio-recording'),
    (SELECT id FROM subcategory_ids WHERE slug = 'cables-connectors'),
    'ProAudio',
    45.00,
    NULL,
    'High-quality braided audio cable for studio and stage. Durable and reliable.',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAoR-_dFaL_lHvgDUGC_e0AeO33bCu3HOTLylK2yeqjKSBbPywNYluMt2ncb-cE2J8370EqlUYXu6gU9SM8awtybV_KE601Rzo4PO-OLrk9JF963rIkY_T4vZGctsYv_Pb7KUJyCJfMB61ZLOEuWm3uK9yy8zHWYH-p6UFAm6W17d92s3hydxWWhGn5pT_4srqRa4lC4HFr7N6SjJIRhHa3Xd7MiMIWHxmU9Cl4RlV9sLFN1lvHaEWXrUIiXfafeHSHaR66VF653Yh5',
    4.5,
    156,
    'In Stock',
    FALSE,
    50
)
ON CONFLICT (slug) DO NOTHING;
