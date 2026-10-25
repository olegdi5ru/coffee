export interface Product {
  id: number;
  name: string;
  origin: string;
  category: string;
  roast: string;
  price: number;
  weight: string;
  description: string;
  flavorNotes: string[];
  altitude: string;
  process: string;
  image: string;
  rating: number;
}

export const categories = [
  "All",
  "Light Roast",
  "Medium Roast",
  "Dark Roast",
  "Single Origin",
  "Blend",
];

export const products: Product[] = [
  {
    id: 1,
    name: "Ethiopia Yirgacheffe",
    origin: "Ethiopia",
    category: "Single Origin",
    roast: "Light Roast",
    price: 24.99,
    weight: "250g",
    description:
      "A stunning single-origin coffee from the birthplace of coffee. This Yirgacheffe lot features bright acidity with complex floral and citrus notes that dance on the palate. Grown at high altitude by smallholder farmers in the Gedeo Zone.",
    flavorNotes: ["Jasmine", "Bergamot", "Lemon Zest", "Honey"],
    altitude: "1,900 - 2,200m",
    process: "Washed",
    image: "🫘",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Colombia Huila",
    origin: "Colombia",
    category: "Single Origin",
    roast: "Medium Roast",
    price: 21.99,
    weight: "250g",
    description:
      "From the lush mountains of Huila, this coffee delivers a perfectly balanced cup with rich caramel sweetness and a velvety body. Grown by third-generation farmers who have perfected their craft over decades.",
    flavorNotes: ["Caramel", "Milk Chocolate", "Red Apple", "Brown Sugar"],
    altitude: "1,600 - 1,900m",
    process: "Washed",
    image: "☕",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Kenya AA Nyeri",
    origin: "Kenya",
    category: "Single Origin",
    roast: "Light Roast",
    price: 28.99,
    weight: "250g",
    description:
      "An exceptional AA-grade coffee from Nyeri county, known for its intense fruit-forward profile. The double-washed process enhances its sparkling acidity and wine-like complexity. A true connoisseur's choice.",
    flavorNotes: ["Blackcurrant", "Grapefruit", "Tomato", "Raw Honey"],
    altitude: "1,700 - 2,000m",
    process: "Double Washed",
    image: "🍇",
    rating: 4.8,
  },
  {
    id: 4,
    name: "Brazil Santos Natural",
    origin: "Brazil",
    category: "Single Origin",
    roast: "Dark Roast",
    price: 18.99,
    weight: "250g",
    description:
      "A classic Brazilian coffee with a full body and low acidity. Natural processing gives this coffee its characteristic nutty sweetness and chocolate finish. Perfect for espresso or those who prefer a bold cup.",
    flavorNotes: ["Hazelnut", "Dark Chocolate", "Toffee", "Dried Fig"],
    altitude: "1,000 - 1,300m",
    process: "Natural",
    image: "🌰",
    rating: 4.5,
  },
  {
    id: 5,
    name: "Artisan Morning Blend",
    origin: "Multi-origin",
    category: "Blend",
    roast: "Medium Roast",
    price: 19.99,
    weight: "250g",
    description:
      "Our signature house blend combines the best of South American and African beans for a harmonious, everyday cup. Smooth and approachable with layers of complexity that reveal themselves as the coffee cools.",
    flavorNotes: ["Cocoa", "Almond", "Orange Peel", "Vanilla"],
    altitude: "Various",
    process: "Mixed",
    image: "✨",
    rating: 4.6,
  },
  {
    id: 6,
    name: "Sumatra Mandheling",
    origin: "Indonesia",
    category: "Single Origin",
    roast: "Dark Roast",
    price: 22.99,
    weight: "250g",
    description:
      "A bold and earthy coffee from the volcanic highlands of Sumatra. The wet-hulled processing method unique to Indonesia creates its signature full body with low acidity and deep, complex flavors.",
    flavorNotes: ["Cedar", "Dark Cocoa", "Tobacco", "Black Pepper"],
    altitude: "1,200 - 1,500m",
    process: "Wet-Hulled (Giling Basah)",
    image: "🌋",
    rating: 4.6,
  },
];
