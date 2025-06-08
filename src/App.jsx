import React, { useState, createContext, useContext, useEffect } from 'react';

// Create a context for the shopping cart - DEFINED ONCE
const CartContext = createContext();

// Custom hook to use the cart context - DEFINED ONCE
const useCart = () => {
  return useContext(CartContext);
};

// Dummy product data for florist shop
const products = [
  { id: 1, name: 'Red Roses Bouquet', price: 55.00, description: 'A timeless expression of deep affection and passion, our Red Roses Bouquet features a dozen premium, long-stemmed red roses carefully arranged with lush greenery. Each rose is hand-picked for its velvety petals and rich fragrance, making it an ideal gift for anniversaries, Valentine\'s Day, or any occasion where you want to convey profound love and admiration. Comes wrapped in eco-friendly paper.', category: 'flowers', flowerType: 'roses', imageUrl: 'https://placehold.co/300x200/B85042/ffffff?text=Red+Roses' },
  { id: 2, name: 'Mixed Spring Flowers', price: 42.50, description: 'Brighten any room with our enchanting Mixed Spring Flowers bouquet. This delightful arrangement features a vibrant medley of seasonal blooms such as cheerful tulips, fragrant hyacinths, and delicate daffodils. It\'s carefully crafted to bring the freshness and joy of spring indoors, perfect for celebrating new beginnings or simply adding a splash of natural beauty to your home. Each bouquet is unique, reflecting the best of what nature offers.', category: 'flowers', flowerType: 'mixed', imageUrl: 'https://placehold.co/300x200/A7D9B1/000000?text=Spring+Mix' },
  { id: 3, name: 'Elegant Orchid Pot', price: 68.00, description: 'Elevate your space with our Elegant Orchid Pot, featuring a stunning Phalaenopsis orchid known for its graceful arching stems and long-lasting blooms. This low-maintenance plant is presented in a chic ceramic pot that complements any modern or classic interior. It\'s an exquisite gift for housewarmings, corporate events, or as a sophisticated addition to your own collection, offering beauty that embraces for weeks.', category: 'flower_pots', imageUrl: 'https://placehold.co/300x200/5A6C5B/ffffff?text=Orchid+Pot' },
  { id: 4, name: 'Succulent Garden Pot', price: 35.00, description: 'Create your own desert oasis with our easy-care Succulent Garden Pot. This charming arrangement features a curated selection of various drought-tolerant succulents, including Echeveria, Haworthia, and Sedum, nestled in a contemporary concrete pot. Perfect for busy individuals or those new to plant care, this miniature garden requires minimal watering and brings a touch of natural artistry to desks, windowsills, or coffee tables. A unique gift for any plant enthusiast!', category: 'flower_pots', imageUrl: 'https://placehold.co/300x200/94A68F/000000?text=Succulent+Pot' },
  { id: 5, name: 'Sunflower Sunshine Bouquet', price: 48.00, description: 'Radiate happiness with our Sunflower Sunshine Bouquet. This vibrant arrangement showcases bold, golden sunflowers, known for their large, striking heads and cheerful disposition. Symbolizing adoration, loyalty, and longevity, sunflowers are perfect for brightening someone\'s day, celebrating friendships, or adding a burst of summer joy to any occasion. Hand-tied with seasonal greenery for a truly magnificent display.', category: 'flowers', flowerType: 'sunflowers', imageUrl: 'https://placehold.co/300x200/F0E68C/000000?text=Sunflowers' },
  { id: 6, name: 'Lavender & Herb Pot', price: 28.00, description: 'Bring the calming scents of nature into your home with our Lavender & Herb Pot. This delightful planter combines aromatic lavender with essential culinary herbs like rosemary and thyme, creating a fragrant and functional mini-garden. Ideal for sunny kitchen windows or outdoor patios, it provides fresh ingredients for cooking and a soothing aroma that promotes relaxation. A thoughtful gift for home chefs and garden lovers alike.', category: 'flower_pots', imageUrl: 'https://placehold.co/300x200/C4C7B8/000000?text=Lavender+Pot' },
  { id: 7, name: 'Lily Serenity Bouquet', price: 60.00, description: 'Experience tranquility with our exquisite Lily Serenity Bouquet. This elegant arrangement features pristine white lilies, symbolizing purity, rebirth, and peace. Their majestic blooms and subtle fragrance make them a profound choice for expressing sympathy, celebrating spiritual milestones, or simply bringing a sense of calm sophistication to any setting. Expertly arranged with complementary foliage.', category: 'flowers', flowerType: 'lilies', imageUrl: 'https://placehold.co/300x200/F5F5DC/000000?text=Lilies' },
  { id: 8, name: 'Terracotta Planter', price: 22.00, description: 'Embrace classic gardening with our breathable Terracotta Planter. Made from natural, porous clay, this pot allows for excellent air circulation and drainage, promoting healthier root growth for a wide variety of plants. Its timeless design and earthy tone blend seamlessly with any decor, making it a versatile choice for both indoor and outdoor gardening projects. Available in various sizes to suit your needs.', category: 'flower_pots', imageUrl: 'https://placehold.co/300x200/D2B48C/000000?text=Terracotta+Pot' },
  { id: 9, name: 'Carnation Cheer Bouquet', price: 38.00, description: 'Inject a burst of vibrant energy with our Carnation Cheer Bouquet. Featuring a lively mix of multi-colored carnations, known for their ruffled petals and impressive longevity, this bouquet is perfect for cheering up a friend, celebrating a birthday, or simply adding a festive touch to your day. Carnations are versatile and long-lasting, offering sustained beauty and a pleasant, mild fragrance.', category: 'flowers', flowerType: 'carnations', imageUrl: 'https://placehold.co/300x200/FFB6C1/000000?text=Carnations' },
  { id: 10, name: 'Ceramic Pot - Small', price: 15.00, description: 'Discover the perfect home for your mini plants with our Small Ceramic Pot. This compact, glazed ceramic pot boasts a smooth finish and a minimalist design, making it an ideal choice for succulents, cacti, or tiny floral arrangements. Its durable construction ensures longevity, while its small size makes it perfect for desks, windowsills, or as charming party favors. Available in various appealing colors.', category: 'flower_pots', imageUrl: 'https://placehold.co/300x200/C0C0C0/000000?text=Small+Pot' },
  { id: 11, name: 'Daisy Delight Bouquet', price: 30.00, description: 'Capture the essence of innocence and simple beauty with our Daisy Delight Bouquet. A charming collection of fresh, bright daisies, symbolizing purity and new beginnings. This light-hearted arrangement is perfect for sending a cheerful message, celebrating a casual gathering, or brightening someone\'s day without a specific occasion. A fresh and joyful addition to any space.', category: 'flowers', flowerType: 'daisies', imageUrl: 'https://placehold.co/300x200/E8D214/000000?text=Daisies' },
  { id: 12, name: 'Rosewood Planter - Large', price: 45.00, description: 'Make a grand statement with our Large Rosewood Planter. Crafted from rich, dark rosewood, this elegant planter exudes sophistication and natural beauty. Its spacious design is ideal for housing larger indoor plants or creating a striking outdoor floral display. The natural wood grain adds warmth and character, making it a luxurious addition to any home or garden setting. Built for durability and timeless appeal.', category: 'flower_pots', imageUrl: 'https://placehold.co/300x200/8B4513/ffffff?text=Rosewood+Pot' },
  { id: 13, name: 'Tulip Harmony Bouquet', price: 40.00, description: 'Celebrate the vibrancy of spring with our Tulip Harmony Bouquet. This lively arrangement features a harmonious blend of colorful tulips, renowned for their sleek, elegant form and wide array of cheerful hues. Symbolizing perfect love and new beginnings, tulips are a quintessential spring flower, perfect for Easter, Mother\'s Day, or simply to bring a burst of color and fresh energy into your home.', category: 'flowers', flowerType: 'tulips', imageUrl: 'https://placehold.co/300x200/FF7F50/ffffff?text=Tulips' },
  { id: 14, name: 'Modern Geometric Pot', price: 25.00, description: 'Infuse contemporary style into your plant collection with our Modern Geometric Pot. This unique planter features sharp lines and an abstract, multi-faceted design, making it a standout piece for any modern interior. Crafted from durable, lightweight materials, it\'s ideal for showcasing succulents, small cacti, or air plants, adding an poetic touch to your shelf or desk.', category: 'flower_pots', imageUrl: 'https://placehold.co/300x200/4682B4/ffffff?text=Geometric+Pot' },
  { id: 15, name: 'Peony Bloom Bouquet', price: 65.00, description: 'Indulge in the opulent beauty of our Peony Bloom Bouquet. Featuring lush, voluminous peonies in various delicate shades, this bouquet is a true symbol of romance, prosperity, and good fortune. Known for their exquisite fragrance and ruffled petals, peonies create a luxurious and unforgettable display, making them a perfect choice for weddings, anniversaries, or any grand celebration.', category: 'flowers', flowerType: 'peonies', imageUrl: 'https://placehold.co/300x200/FFC0CB/000000?text=Peonies' },
  // Additional flower data
  { id: 16, name: 'Hydrangea Charm', price: 58.00, description: 'Adorn your space with the captivating beauty of our Hydrangea Charm bouquet. These lush, full blooms come in delicate shades of blue, pink, and purple, symbolizing grace, beauty, and heartfelt emotions. Perfect for adding a touch of classic elegance to any room or as a thoughtful gift for appreciation and understanding. Their abundant petals create a truly magnificent display.', category: 'flowers', flowerType: 'hydrangeas', imageUrl: 'https://placehold.co/300x200/6A5ACD/ffffff?text=Hydrangea' },
  { id: 17, name: 'Gerbera Mix', price: 35.00, description: 'Brighten anyone\'s day with our lively Gerbera Mix. This vibrant bouquet features a kaleidoscope of colorful Gerbera daisies, known for their large, bold blooms and cheerful disposition. Symbolizing cheerfulness and innocence, these long-lasting flowers are perfect for birthdays, get-well wishes, or simply to spread joy and positive energy. A wonderful way to add a pop of color to any setting.', category: 'flowers', flowerType: 'gerberas', imageUrl: 'https://placehold.co/300x200/FFC107/000000?text=Gerbera' },
  { id: 18, name: 'Daffodil Sunshine', price: 28.00, description: 'Welcome spring with our cheerful Daffodil Sunshine bouquet. These iconic bright yellow blooms are the quintessential symbol of new beginnings, hope, and rejuvenation. Perfect for celebrating the changing seasons, sending warm wishes, or simply brightening a gray day. Their trumpet-shaped flowers and delightful fragrance make them a beloved classic, bringing an unmistakable feeling of fresh air and joy.', category: 'flowers', flowerType: 'daffodils', imageUrl: 'https://placehold.co/300x200/FFEA00/000000?text=Daffodils' },
  { id: 19, name: 'Iris Elegance', price: 40.00, description: 'Discover sophisticated beauty with our Iris Elegance bouquet. Featuring striking purple irises, known for their intricate petals and majestic appearance, these flowers symbolize royalty, faith, wisdom, and valor. Their unique form and deep hues make a dramatic statement, perfect for formal occasions, expressing admiration, or adding an artistic touch to your floral arrangements. A truly distinguished bloom.', category: 'flowers', flowerType: 'irises', imageUrl: 'https://placehold.co/300x200/8A2BE2/ffffff?text=Irises' },
  { id: 20, name: 'Freesia Fragrance', price: 32.00, description: 'Indulge your senses with our delicate Freesia Fragrance bouquet. These charming flowers are celebrated for their enchanting, sweet, and citrusy scent, as well as their vibrant array of colors. Symbolizing innocence, thoughtfulness, and lasting friendship, freesias are perfect for adding an aromatic and visually appealing touch to any bouquet or as a delightful gift for loved ones. Their elegant shape and delightful aroma make them a popular choice.', category: 'flowers', flowerType: 'freesias', imageUrl: 'https://placehold.co/300x200/FFDAB9/000000?text=Freesias' },
  // Additional flower pot data
  { id: 21, name: 'Glossy White Ceramic Pot', price: 18.00, description: 'Achieve a clean, contemporary look with our Glossy White Ceramic Pot. Its smooth, high-gloss finish and crisp white color make it an ideal choice for minimalist interiors, allowing your plants to truly stand out. Durable and easy to clean, this versatile pot is perfect for a variety of indoor plants, from vibrant green foliage to delicate flowering species, adding a touch of sleek sophistication to any space.', category: 'flower_pots', imageUrl: 'https://placehold.co/300x200/F8F8F8/000000?text=White+Pot' },
  { id: 22, name: 'Rustic Clay Planter', price: 28.00, description: 'Bring earthy charm to your garden with our Rustic Clay Planter. Hand-crafted from natural, unglazed clay, this planter boasts a charming, rugged texture and an authentic, timeworn appearance. Its porous material promotes healthy root aeration, making it an excellent choice for plants that prefer well-drained soil. Perfect for creating a cozy, natural aesthetic in your home or patio.', category: 'flower_pots', imageUrl: 'https://placehold.co/300x200/A0522D/ffffff?text=Clay+Planter' },
  { id: 23, name: 'Self-Watering Pot', price: 32.00, description: 'Simplify plant care with our innovative Self-Watering Pot. Designed with a clever reservoir system, this pot provides a consistent water supply to your plant\'s roots, reducing the frequency of watering and preventing over or under-watering. It\'s ideal for busy plant parents or those who travel frequently, ensuring your plants remain hydrated and healthy with minimal effort. Grow thriving plants with ease!', category: 'flower_pots', imageUrl: 'https://placehold.co/300x200/87CEEB/ffffff?text=Self-Watering+Pot' },
  { id: 24, name: 'Hanging Basket - Macrame', price: 20.00, description: 'Elevate your green decor with our stylish Macrame Hanging Basket. Hand-knotted from natural cotton, this bohemian-inspired hanger adds texture and visual interest to any room. It\'s perfect for showcasing trailing plants like Pothos, Ivy, or String of Pearls, creating a beautiful cascade of foliage. Easy to install and durable, it\'s an ideal solution for maximizing space and adding a touch of handmade artistry.', category: 'flower_pots', imageUrl: 'https://placehold.co/300x200/D2B48C/000000?text=Hanging+Basket' },
  { id: 25, name: 'Large Decorative Pot', price: 75.00, description: 'Make a bold statement with our Large Decorative Pot. This oversized, ornate planter features intricate detailing and a substantial presence, making it a focal point for any indoor or outdoor space. Ideal for large plants like Fiddle Leaf Figs or small trees, it provides ample room for root growth while adding an element of grand sophistication to your home, patio, or garden design. A truly impressive piece.', category: 'flower_pots', imageUrl: 'https://placehold.co/300x200/708090/ffffff?text=Large+Pot' },
  // New Tree Data
  { id: 26, name: 'Japanese Maple Sapling', price: 120.00, description: 'Cultivate elegance with our exquisite Japanese Maple Sapling. Renowned for its delicate, deeply lobed leaves and spectacular seasonal color changes, ranging from vibrant greens in spring to fiery reds and oranges in autumn. This young tree is perfect for adding a focal point to small gardens, patios, or as a stunning potted specimen, offering year-round beauty and a touch of serene Japanese aesthetic.', category: 'trees', treeType: 'maple', imageUrl: 'https://placehold.co/300x200/6A0DAD/ffffff?text=Japanese+Maple' },
  { id: 27, name: 'Dwarf Citrus Tree', price: 95.00, description: 'Enjoy the freshness of homegrown fruit with our delightful Dwarf Citrus Tree. This compact variety is specifically cultivated for smaller spaces, making it perfect for sunny patios, balconies, or even indoor growing near a bright window. It produces fragrant blossoms and delicious, full-sized fruits like lemons, limes, or oranges, allowing you to harvest fresh citrus right from your home. A rewarding addition for any fruit enthusiast!', category: 'trees', treeType: 'citrus', imageUrl: 'https://placehold.co/300x200/FFD700/000000?text=Dwarf+Citrus' },
  { id: 28, name: 'Weeping Willow Sapling', price: 80.00, description: 'Add a touch of timeless grace to your landscape with our Weeping Willow Sapling. Famous for its dramatic, cascading branches that sway elegantly in the breeze, creating a picturesque and serene atmosphere. This young tree thrives near water features or in open spaces where its unique form can be admired. It grows relatively quickly, establishing a beautiful, calming presence in your garden.', category: 'trees', treeType: 'willow', imageUrl: 'https://placehold.co/300x200/8FBC8F/000000?text=Weeping+Willow' },
  { id: 29, name: 'Bonsai Juniper', price: 150.00, description: 'Own a living sculpture with our meticulously cultivated Bonsai Juniper. This miniature tree is an art form, carefully pruned and shaped over years to create a stunning, aged appearance. Juniper bonsai are highly resilient and adaptable, making them an excellent choice for beginners and seasoned enthusiasts alike. It brings a sense of ancient wisdom and serene beauty to any indoor space or sheltered outdoor area.', category: 'trees', treeType: 'bonsai', imageUrl: 'https://placehold.co/300x200/8B4513/ffffff?text=Bonsai+Juniper' },
  { id: 30, name: 'Evergreen Pine', price: 70.00, description: 'Bring a touch of the forest indoors with our sturdy Evergreen Pine. This resilient tree maintains its vibrant green needles throughout the year, symbolizing longevity, resilience, and enduring life. Perfect for adding a natural, calming presence to your living space, it can be grown in a large pot on a patio or as a small garden feature. Requires minimal care and offers continuous greenery.', category: 'trees', treeType: 'pine', imageUrl: 'https://placehold.co/300x200/2F4F4F/ffffff?text=Evergreen+Pine' },
  { id: 31, name: 'Fruit-bearing Apple Tree', price: 110.00, description: 'Cultivate your own orchard with our robust Fruit-bearing Apple Tree. This young tree is grafted for optimal fruit production and is ready to establish itself in your garden, promising abundant harvests of crisp, sweet apples. Perfect for home growers, it offers the joy of fresh, organic fruit straight from your backyard and adds beautiful blossoms in spring.', category: 'trees', treeType: 'fruit_tree', imageUrl: 'https://placehold.co/300x200/CD5C5C/ffffff?text=Apple+Tree' },
  { id: 32, name: 'Oak Sapling', price: 60.00, description: 'Plant a legacy with our strong Oak Sapling. Oaks are renowned for their majestic size, long lifespan, and ecological importance, providing habitat and sustenance for diverse wildlife. This young tree will grow into a magnificent specimen, casting ample shade and adding significant value and beauty to your property for generations to come. A foundational choice for any landscape.', category: 'trees', treeType: 'oak', imageUrl: 'https://placehold.co/300x200/A0522D/ffffff?text=Oak+Sapling' },
  { id: 33, name: 'Palm Tree - Small', price: 90.00, description: 'Create a tropical oasis with our charming Small Palm Tree. Perfect for indoor decor or adding a touch of the exotic to your patio, this compact palm variety brings lush, vibrant greenery and a relaxed, resort-like atmosphere. Easy to care for and adaptable to various light conditions, it\'s an excellent choice for transforming any space into a serene, vacation-like retreat.', category: 'trees', treeType: 'palm', imageUrl: 'https://placehold.co/300x200/228B22/ffffff?text=Small+Palm' },
  { id: 34, name: 'Birch Tree Sapling', price: 75.00, description: 'Grace your garden with the delicate beauty of our Birch Tree Sapling. Distinguished by its striking white, peeling bark and airy, elegant canopy, the birch tree offers year-round visual interest. It grows rapidly and adds a touch of sophistication to any landscape, especially when planted in groves. Enjoy its shimmering leaves in summer and its stark, beautiful branches in winter.', category: 'trees', treeType: 'birch', imageUrl: 'https://placehold.co/300x200/E0FFFF/000000?text=Birch+Tree' },
  { id: 35, name: 'Olive Tree - Potted', price: 130.00, description: 'Embrace Mediterranean charm with our elegant Potted Olive Tree. A symbol of peace, longevity, and abundance, this beautiful tree features silvery-green leaves and a gnarled trunk, even at a young age. Ideal for sunny patios, balconies, or as a striking indoor plant, it adds a touch of classic elegance and can even produce olives in the right conditions. A truly timeless and rewarding plant.', category: 'trees', treeType: 'olive', imageUrl: 'https://placehold.co/300x200/9ACD32/000000?text=Olive+Tree' },
];

// Cart Provider component to manage cart state
const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // State for items in the cart
  const [showModal, setShowModal] = useState(false); // State to control the checkout modal
  const [modalMessage, setModalMessage] = useState(''); // Message for the modal

  /**
   * Adds a product to the cart or increments its quantity if already exists.
   * @param {object} product - The product to add.
   */
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    // Show a brief message when item is added
    setModalMessage(`${product.name} added to cart!`);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 2000); // Hide message after 2 seconds
  };

  /**
   * Removes an item from the cart.
   * @param {number} productId - The ID of the product to remove.
   */
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  /**
   * Updates the quantity of a specific item in the cart.
   * @param {number} productId - The ID of the product.
   * @param {number} quantity - The new quantity.
   */
  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => item.id !== productId);
      }
      return prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item
      );
    });
  };

  /**
   * Calculates the total price of all items in the cart.
   * @returns {number} - The total price.
   */
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  /**
   * Simulates the checkout process.
   */
  const checkout = () => {
    if (cartItems.length === 0) {
      setModalMessage("Your cart is empty. Please add items before checking out.");
      setShowModal(true);
      setTimeout(() => setShowModal(false), 3000);
      return;
    }
    setModalMessage("Checkout successful! Thank you for your purchase!");
    setShowModal(true);
    setCartItems([]); // Clear the cart after checkout
    setTimeout(() => setShowModal(false), 3000);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        calculateTotal,
        checkout,
        showModal,
        modalMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Product Card component
const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); // Use cart context

  return (
    <div className="bg-white rounded-xl shadow-xl hover:shadow-2xl overflow-hidden transform transition-all duration-300 flex flex-col hover:ring-2 hover:ring-emerald-300"> {/* Enhanced shadow and hover effect */}
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover" // Fixed height for image
        onError={(e) => {
          e.target.onerror = null;
          // Fallback to a category-specific placeholder if the image fails to load
          let placeholderText = '';
          if (product.category === 'flowers') placeholderText = 'Flower';
          else if (product.category === 'flower_pots') placeholderText = 'Pot';
          else if (product.category === 'trees') placeholderText = 'Tree';
          e.target.src = `https://placehold.co/300x200/047857/ffffff?text=${placeholderText}`; // Darker emerald for placeholder
        }}
      />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 font-inter">{product.name}</h3>
        {/* Adjusted description text size and added overflow handling for very long descriptions */}
        <p className="text-gray-600 text-sm mb-4 flex-grow overflow-hidden text-ellipsis max-h-24">
          {product.description}
        </p>
        <p className="text-gray-900 text-lg font-bold mb-4">KSh {product.price.toFixed(2)}</p> {/* Changed currency symbol */}
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-medium text-lg hover:bg-emerald-700 transition duration-200 shadow-md flex items-center justify-center space-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z"
            />
          </svg>
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

// Product List component
const ProductList = () => {
  const [categoryFilter, setCategoryFilter] = useState('all'); // State for main category filter (all, flowers, flower_pots, trees)
  const [typeFilter, setTypeFilter] = useState('all'); // State for specific type filter (flowerType or treeType)
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const itemsPerPage = 8; // Number of items to display per page

  // Filter products based on the selected category and specific type (flowerType or treeType)
  const filteredProducts = products.filter(product => {
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;

    let matchesType = true;
    if (categoryFilter === 'flowers' && typeFilter !== 'all') {
      matchesType = product.flowerType === typeFilter;
    } else if (categoryFilter === 'trees' && typeFilter !== 'all') {
      matchesType = product.treeType === typeFilter; // Filter by treeType
    }

    return matchesCategory && matchesType;
  });

  // Calculate total pages for pagination based on filtered products
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Get products for the current page
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page to 1 and typeFilter whenever category filter changes
  useEffect(() => {
    setCurrentPage(1);
    setTypeFilter('all');
  }, [categoryFilter]);

  // Reset page to 1 whenever specific type filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [typeFilter]);

  // Get unique flower types for filter buttons
  const uniqueFlowerTypes = [...new Set(products
    .filter(p => p.category === 'flowers')
    .map(p => p.flowerType)
  )];

  // Get unique tree types for filter buttons
  const uniqueTreeTypes = [...new Set(products
    .filter(p => p.category === 'trees')
    .map(p => p.treeType)
  )];

  return (
    <section className="p-8 bg-white rounded-xl shadow-inner mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center font-inter">Our Eco-Friendly Collection</h2>

      {/* Main Category Filter buttons */}
      <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mb-4">
        <button
          onClick={() => setCategoryFilter('all')}
          className={`py-2 px-6 rounded-full font-medium transition-colors duration-200 ${
            categoryFilter === 'all' ? 'bg-emerald-700 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Items
        </button>
        <button
          onClick={() => setCategoryFilter('flowers')}
          className={`py-2 px-6 rounded-full font-medium transition-colors duration-200 ${
            categoryFilter === 'flowers' ? 'bg-emerald-700 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Flowers
        </button>
        <button
          onClick={() => setCategoryFilter('flower_pots')}
          className={`py-2 px-6 rounded-full font-medium transition-colors duration-200 ${
            categoryFilter === 'flower_pots' ? 'bg-emerald-700 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Flower Pots
        </button>
        <button
          onClick={() => setCategoryFilter('trees')} // New button for Trees
          className={`py-2 px-6 rounded-full font-medium transition-colors duration-200 ${
            categoryFilter === 'trees' ? 'bg-emerald-700 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Trees
        </button>
      </div>

      {/* Specific Flower Type Filter buttons (only visible when 'Flowers' category is selected) */}
      {categoryFilter === 'flowers' && (
        <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mb-8 mt-4">
          <button
            onClick={() => setTypeFilter('all')}
            className={`py-2 px-4 rounded-full text-sm font-medium transition-colors duration-200 ${
              typeFilter === 'all' ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
            }`}
          >
            All Flowers
          </button>
          {uniqueFlowerTypes.map(type => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`py-2 px-4 rounded-full text-sm font-medium transition-colors duration-200 ${
                typeFilter === type ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} {/* Capitalize first letter */}
            </button>
          ))}
        </div>
      )}

      {/* Specific Tree Type Filter buttons (only visible when 'Trees' category is selected) */}
      {categoryFilter === 'trees' && (
        <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mb-8 mt-4">
          <button
            onClick={() => setTypeFilter('all')}
            className={`py-2 px-4 rounded-full text-sm font-medium transition-colors duration-200 ${
              typeFilter === 'all' ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
            }`}
          >
            All Trees
          </button>
          {uniqueTreeTypes.map(type => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`py-2 px-4 rounded-full text-sm font-medium transition-colors duration-200 ${
                typeFilter === type ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} {/* Capitalize first letter */}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-lg">No products found matching your filter.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                currentPage === page ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

// Cart Item component
const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart(); // Use cart context

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-4">
      <div className="flex items-center space-x-4 flex-grow"> {/* Added flex-grow */}
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-md flex-shrink-0" // Added flex-shrink-0
          onError={(e) => {
            e.target.onerror = null;
            let placeholderText = '';
            if (item.category === 'flowers') placeholderText = 'Flower';
            else if (item.category === 'flower_pots') placeholderText = 'Pot';
            else if (item.category === 'trees') placeholderText = 'Tree';
            e.target.src = `https://placehold.co/80x80/047857/ffffff?text=${placeholderText}`; // Darker emerald for placeholder
          }}
        />
        <div className="flex-grow min-w-0"> {/* Added min-w-0 to allow text to shrink */}
          <h4 className="font-semibold text-lg text-gray-800 mb-1 truncate font-inter">{item.name}</h4> {/* Added truncate */}
          <p className="text-gray-600">KSh {item.price.toFixed(2)}</p> {/* Changed currency symbol */}
        </div>
      </div>
      <div className="flex items-center space-x-3 flex-shrink-0 ml-4"> {/* Added flex-shrink-0 and ml-4 */}
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 transition duration-150 text-sm"
        >
          -
        </button>
        <span className="font-medium text-gray-800 text-sm">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 transition duration-150 text-sm"
        >
          +
        </button>
        <button
          onClick={() => removeFromCart(item.id)}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-150 text-sm"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

// Shopping Cart component
const ShoppingCart = () => {
  const { cartItems, calculateTotal, checkout } = useCart(); // Use cart context

  return (
    <section className="p-8 bg-white rounded-xl shadow-inner">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center font-inter">Your Eco-Basket</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your basket is empty. Start adding some beautiful items!</p>
      ) : (
        <>
          <div className="mb-6 max-h-96 overflow-y-auto pr-2"> {/* Added scroll for many items */}
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="flex justify-between items-center border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-2xl font-bold text-gray-800 font-inter">
              Total: KSh {calculateTotal().toFixed(2)}
            </h3> {/* Changed currency symbol */}
            <button
              onClick={checkout}
              className="bg-emerald-700 text-white py-3 px-6 rounded-lg font-bold text-xl hover:bg-emerald-800 transition duration-200 shadow-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
};

// Global Modal component for messages
const GlobalModal = () => {
  const { showModal, modalMessage } = useCart();

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl text-center font-inter animate-fade-in-up">
        <p className="text-lg font-semibold text-gray-800">{modalMessage}</p>
      </div>
    </div>
  );
};


// Main App component
function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 px-4 py-6 sm:p-8 font-inter"> {/* Adjusted padding */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-emerald-800 mb-4 tracking-tight"> {/* Responsive font size */}
            🌱 Ecogreen Shop 🌱
          </h1>
          <p className="text-lg sm:text-xl text-gray-700"> {/* Responsive font size */}
            Discover our exquisite collection of fresh flowers and elegant pots.
          </p>
        </header>

        <main className="container mx-auto grid grid-cols-1 gap-8 sm:gap-10"> {/* Removed lg:grid-cols-3 and lg:col-span-* */}
          <div className="col-span-1"> {/* Explicitly setting to col-span-1 for clarity, though it's the default */}
            <ProductList />
          </div>
          <div className="col-span-1"> {/* Explicitly setting to col-span-1 for clarity, though it's the default */}
            <ShoppingCart />
          </div>
        </main>
        <GlobalModal />
      </div>
    </CartProvider>
  );
}

export default App;
