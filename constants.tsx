
import { Product, Order } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Master Series Telecaster - Arctic White',
    category: 'Guitars',
    brand: 'Fender',
    price: 1299.00,
    description: 'The pinnacle of craftsmanship with Arctic White finish.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwYp5l1mQemPgU7sNkkRWHh_tG7u8_ULZrwyNuE6L5zVL2cCgXQdOS2lJMBe98368gEt9c08jAwfzCnwevc5zCc0hTvgOSWYvhg5p1j3LdiLZRckxzKwlLQz4Lo09DzZcogAWlJxLpc9hmuravQ1_Z-AVk0WVi-zh0K32qS7F2e60noHQL3sMqNEcFViS8OqcfyuVU_9WYYflN6m4nT9TYbwjENlsNN-aZ2exQVwhxNlfIe0H9Qt9zI1jmKPB7eRod3781VXGPeqrW',
    rating: 5,
    reviewsCount: 42,
    status: 'In Stock'
  },
  {
    id: '2',
    name: 'Premium Braided Cable - 15ft',
    category: 'Accessories',
    brand: 'ProAudio',
    price: 45.00,
    description: 'High-quality braided audio cable for studio and stage.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoR-_dFaL_lHvgDUGC_e0AeO33bCu3HOTLylK2yeqjKSBbPywNYluMt2ncb-cE2J8370EqlUYXu6gU9SM8awtybV_KE601Rzo4PO-OLrk9JF963rIkY_T4vZGctsYv_Pb7KUJyCJfMB61ZLOEuWm3uK9yy8zHWYH-p6UFAm6W17d92s3hydxWWhGn5pT_4srqRa4lC4HFr7N6SjJIRhHa3Xd7MiMIWHxmU9Cl4RlV9sLFN1lvHaEWXrUIiXfafeHSHaR66VF653Yh5',
    rating: 4.5,
    reviewsCount: 156,
    status: 'In Stock'
  },
  {
    id: '3',
    name: 'Neumann KH 150 Pair',
    category: 'Studio & Recording',
    brand: 'Neumann',
    price: 2800.00,
    oldPrice: 3200.00,
    description: 'Bi-Amplified Studio Monitor with DSP and room correction.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC__89zTWgo7jrFLvCmdO52ks-IpLTZcsU354YO0yvBtyeARVvKrSq8cUoH6i4NLs2kB34O0ULzB4bm7fjpTiJhW6XUMj1-xtaXNH8O8KeXctlRntzNqxcCwjKG7FrAdp_YAWaeRYs2ywgM5uoGvGvilaIrLN09xeIOYLrcQpOxhpeZAOia7bn0kfXehGlOPjZ3JmAyoOYyxdWbnVrqmszhAhoj8gSMWP5qzB1J7TWNakK1zqNgpckQRuY077zQORZNTnpIUq3xHtA3',
    rating: 5,
    reviewsCount: 89,
    status: 'In Stock'
  },
  {
    id: '4',
    name: 'Matriarch Semi-Modular Analog Synthesizer',
    category: 'Synthesizers',
    brand: 'Moog',
    price: 1999.00,
    description: '4-note paraphonic semi-modular analog synthesizer with built-in sequencer.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHcV4mi4N7OB3vHlhmZJDbYucPyDFjivQ3--zc7zFwfQpChmTk5TyKcrwccK8v6dZ25ivBOCqrhgFiNXJPNr-lRk6KQo6R2SIZdRI8_WBEMmJVbCsf7iEUOjsVkYBGvqijOdwYqcKRtr3DSvqIsoJ_k2lZ4CzmR59lj1w749JWZRwAY-MJPTzwoIxfgba_ArBwTml0BajI3vGlnY6cQFmZg9WVeuX_NtyE67P0pckZnkbUL3lH5iIhq3KOBf2PnKvx8YoMBoWkNgO-',
    rating: 5,
    reviewsCount: 42,
    status: 'In Stock'
  },
  {
    id: '5',
    name: 'Aura-P90 Professional 88-Key Digital Piano',
    category: 'Keyboards',
    brand: 'Aura',
    price: 2499.00,
    oldPrice: 2999.00,
    description: 'German-engineered concert grand sound engine with fully weighted keys.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg_L7eEoipCgCeGhPrTmr3jryMwYPoRkGK9UU9_u3q2wWCPh-HQ9l8qK6lhk667lAiIxhpdbDXNdX1DhvXb-mZBMC5gA0FMQ-VJObwplmtd34RLaafJIxYODMSwl1Ly3o_AN9_WyEyMx8B7QiUMFCzxYv75NPbVLlzeccdDwtmV-7akHkJTP22p73f10PgriHOy1k27EgcjmSnhlfvPLw662VcMY6XK_ifeyoKULDiMg1e2VabumEvgGRsvE7g6Q4iHeWbmB7wZD-A',
    rating: 4.8,
    reviewsCount: 128,
    status: 'In Stock',
    specs: {
      "Keyboard": "88 keys, Aura-Hammer Responsive Action III",
      "Sound Engine": "Aura-Dynamic S-Series Grand Samples",
      "Polyphony": "256 notes",
      "Sounds": "45 high-fidelity instrument voices",
      "Connectivity": "USB to Host, MIDI In/Out, Stereo Out, Bluetooth 5.0",
      "Amplification": "2x 25W with custom designed wood cabinet speakers"
    }
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: '#49204',
    date: 'Oct 24, 2023',
    productName: "Gibson Les Paul Standard '50s",
    productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDy57ZV9kktc5P8mcXCduy10EgZGyXQrdEGEfxRUHM_okByEO43ER4T614MHHr93tK_oQYfVC6RG2KY7Ew_exH9I97xcvJVXt8UTTwhO7pHkS3O7UqtN1li-lqSLk82H9fXKrg21YgRE1C_ddbu33Tv38aaj2jHweTsbgos-KQNAGkrhlM723wyEQkns-0HLAljtQgMuXCEQzzvgqBekNGzSNEkD9vwJQvJa_JXiGfg4JXJzDK4JCfjVR6CNEDy5GtlpZw67i9m7nG6',
    status: 'Shipped',
    total: 2499.00
  },
  {
    id: '#49182',
    date: 'Oct 18, 2023',
    productName: 'Fender Mustang GTX100 Amp',
    productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCS3zfXFqbfwvYUF8eAb0dLHFzQySs9GB3WNBAXPA_lJvmHNnL54KcCK0SpyM7VUK7TkdZ93dzMhTTIq3Mrl-GgGrkZoWJdpIT8nCSD8h1ZYowXlLMTY6rVAC6n7zaK7YyALCdaT2pOMKu0Ok2O-dbyObLmKG3pRG_u5RfyCNd-3Hr2Hi3LzdSXZHcZJun8NAjYNB2Tl366tzXsV_qKpdJSfjhXKzTaAVN5MFa6rwE62FAqLDIpauHh4XpUg7MGuUCoHylXai5eN_r',
    status: 'Delivered',
    total: 499.00
  }
];
