import { useState, useMemo } from "react";
import { products, categories, Product } from "./data/products";

interface CartItem {
  product: Product;
  quantity: number;
}

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.flavorNotes.some((note) =>
          note.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory ||
        product.roast === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
    setIsCartOpen(false);
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setCart([]);
    setTimeout(() => {
      setIsCheckoutOpen(false);
      setOrderPlaced(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-amber-50 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-2xl sm:text-3xl">☕</span>
              <div>
                <h1 className="text-lg sm:text-xl font-bold tracking-wide">
                  Bean & Brew
                </h1>
                <p className="text-amber-200 text-xs hidden sm:block">
                  Specialty Coffee Roasters
                </p>
              </div>
            </div>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search coffee, origin, flavor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 rounded-full bg-amber-950/30 border border-amber-600/30 text-white placeholder-amber-200/60 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                />
                <svg
                  className="absolute left-3 top-2.5 w-4 h-4 text-amber-200/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 sm:p-3 rounded-full bg-amber-700/50 hover:bg-amber-700 transition-colors"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search coffee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-full bg-amber-950/30 border border-amber-600/30 text-white placeholder-amber-200/60 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
              />
              <svg
                className="absolute left-3 top-2.5 w-4 h-4 text-amber-200/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative py-16 sm:py-28 overflow-hidden"
        style={{
          backgroundImage: `url('https://image.qwenlm.ai/generated-images/885b574d-2e69-495a-9385-a2b8d565b691/_result.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 via-amber-800/70 to-amber-900/80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Crafted with Passion
          </h2>
          <p className="text-amber-100 text-lg sm:text-xl max-w-2xl mx-auto drop-shadow">
            Discover our curated selection of the world's finest specialty
            coffees, roasted to perfection and delivered fresh to your door.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => {
                document.querySelector("main")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 bg-white text-amber-900 rounded-full font-medium hover:bg-amber-50 transition-colors shadow-lg"
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-amber-800 text-white shadow-md"
                  : "bg-white text-amber-800 border border-amber-200 hover:bg-amber-100 hover:border-amber-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-amber-600 text-lg">
              No coffees found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-amber-100"
              >
                {/* Product Image Area */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 text-center relative">
                  <span className="text-6xl">{product.image}</span>
                  <div className="absolute top-3 right-3 bg-amber-800 text-white text-xs px-2 py-1 rounded-full">
                    {product.roast}
                  </div>
                  <div className="absolute top-3 left-3 bg-white/80 text-amber-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <span>⭐</span> {product.rating}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-amber-900 text-lg">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-amber-600 text-sm mb-3">
                    {product.origin} • {product.weight}
                  </p>

                  {/* Flavor Notes */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.flavorNotes.slice(0, 3).map((note) => (
                      <span
                        key={note}
                        className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-100"
                      >
                        {note}
                      </span>
                    ))}
                    {product.flavorNotes.length > 3 && (
                      <span className="text-xs text-amber-500">
                        +{product.flavorNotes.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-amber-900">
                      ${product.price.toFixed(2)}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="px-3 py-2 text-sm border border-amber-300 text-amber-800 rounded-lg hover:bg-amber-50 transition-colors"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => addToCart(product)}
                        className="px-4 py-2 text-sm bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition-colors font-medium"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-10 text-center relative">
              <span className="text-8xl">{selectedProduct.image}</span>
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                  {selectedProduct.roast}
                </span>
                <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                  {selectedProduct.category}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-amber-900 mb-1">
                {selectedProduct.name}
              </h2>
              <p className="text-amber-600 mb-4">
                {selectedProduct.origin} • {selectedProduct.weight}
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {selectedProduct.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-amber-50 rounded-lg p-3">
                  <p className="text-xs text-amber-600 mb-1">Altitude</p>
                  <p className="text-sm font-medium text-amber-900">
                    {selectedProduct.altitude}
                  </p>
                </div>
                <div className="bg-amber-50 rounded-lg p-3">
                  <p className="text-xs text-amber-600 mb-1">Process</p>
                  <p className="text-sm font-medium text-amber-900">
                    {selectedProduct.process}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm font-medium text-amber-800 mb-2">
                  Flavor Notes
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.flavorNotes.map((note) => (
                    <span
                      key={note}
                      className="bg-amber-100 text-amber-800 text-sm px-3 py-1 rounded-full"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-amber-100">
                <span className="text-3xl font-bold text-amber-900">
                  ${selectedProduct.price.toFixed(2)}
                </span>
                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="px-6 py-3 bg-amber-800 text-white rounded-xl hover:bg-amber-900 transition-colors font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-amber-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-amber-900">Your Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 bg-amber-50 rounded-full flex items-center justify-center hover:bg-amber-100 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <span className="text-5xl mb-4 block">🛒</span>
                  <p className="text-amber-600">Your cart is empty</p>
                  <p className="text-amber-400 text-sm mt-1">
                    Add some specialty coffee to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 bg-amber-50 rounded-xl p-4"
                    >
                      <div className="text-3xl">{item.product.image}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-amber-900 text-sm truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-amber-600 text-xs">
                          {item.product.weight}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="w-7 h-7 bg-white border border-amber-200 rounded-full flex items-center justify-center text-amber-800 hover:bg-amber-100 transition-colors text-sm"
                            >
                              −
                            </button>
                            <span className="text-sm font-medium w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="w-7 h-7 bg-white border border-amber-200 rounded-full flex items-center justify-center text-amber-800 hover:bg-amber-100 transition-colors text-sm"
                            >
                              +
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-amber-900 text-sm">
                              $
                              {(item.product.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-red-400 hover:text-red-600 transition-colors"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-amber-100 bg-amber-50/50">
                <div className="flex justify-between mb-4">
                  <span className="text-amber-700">Subtotal</span>
                  <span className="font-bold text-amber-900 text-lg">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-amber-800 text-white rounded-xl hover:bg-amber-900 transition-colors font-medium text-lg"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsCheckoutOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {orderPlaced ? (
              <div className="p-12 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-amber-900 mb-2">
                  Order Placed!
                </h2>
                <p className="text-amber-600">
                  Thank you for your order. Your specialty coffee is being
                  prepared with care.
                </p>
                <div className="mt-6 bg-amber-50 rounded-xl p-4">
                  <p className="text-sm text-amber-700">
                    Order #BB-{Math.floor(Math.random() * 90000 + 10000)}
                  </p>
                  <p className="text-xs text-amber-500 mt-1">
                    Estimated delivery: 3-5 business days
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-amber-900">
                    Checkout
                  </h2>
                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="w-8 h-8 bg-amber-50 rounded-full flex items-center justify-center hover:bg-amber-100 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Order Summary */}
                <div className="bg-amber-50 rounded-xl p-4 mb-6">
                  <h3 className="font-medium text-amber-900 mb-3">
                    Order Summary
                  </h3>
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex justify-between text-sm mb-2"
                    >
                      <span className="text-amber-700">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="text-amber-900 font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-amber-200 mt-3 pt-3 flex justify-between">
                    <span className="font-bold text-amber-900">Total</span>
                    <span className="font-bold text-amber-900 text-lg">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Shipping Form */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-medium text-amber-900">
                    Shipping Information
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Street Address"
                    className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="City"
                      className="px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      className="px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                    />
                  </div>
                </div>

                {/* Payment (simulated) */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-medium text-amber-900">
                    Payment Details
                  </h3>
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      className="px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                    />
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-3 bg-amber-800 text-white rounded-xl hover:bg-amber-900 transition-colors font-medium text-lg"
                >
                  Place Order — ${cartTotal.toFixed(2)}
                </button>
                <p className="text-center text-xs text-amber-500 mt-3">
                  This is a demo. No real payment will be processed.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">☕</span>
                <h3 className="font-bold text-white text-lg">Bean & Brew</h3>
              </div>
              <p className="text-sm text-amber-300">
                Specialty coffee roasters dedicated to bringing you the finest
                beans from around the world.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Brewing Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Subscription
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3">Stay Connected</h4>
              <p className="text-sm text-amber-300 mb-3">
                Subscribe for brewing tips and exclusive offers.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-amber-800/50 border border-amber-700 rounded-lg text-sm text-white placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button className="px-4 py-2 bg-amber-700 text-white rounded-lg text-sm hover:bg-amber-600 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-amber-800 mt-8 pt-6 text-center text-sm text-amber-400">
            © 2026 Bean & Brew. All rights reserved. Crafted with ❤️ and
            caffeine.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
