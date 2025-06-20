import React, { useState, createContext, useContext, useEffect } from 'react';

// Create a context for the shopping cart - DEFINED ONCE
const CartContext = createContext();

// Custom hook to use the cart context - DEFINED ONCE
const useCart = () => {
  return useContext(CartContext);
};

/**
 * Dummy product data for florist shop.
 * In a real application, this data would likely come from an API or database.
 */
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
   * Formats cart items into a string message for WhatsApp.
   * @param {Array} items - The array of cart items.
   * @param {number} total - The total price of items in the cart.
   * @returns {string} - The formatted message.
   */
  const formatCartItemsForWhatsApp = (items, total) => {
    if (items.length === 0) {
      return "Hello, I'd like to inquire about your eco-friendly products!";
    }
    let message = "Hello, I'd like to place an order for the following items:\n\n";
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (Quantity: ${item.quantity}) - KSh ${item.price.toFixed(2)} each\n`;
    });
    message += `\nTotal: KSh ${total.toFixed(2)}`;
    message += "\n\nPlease confirm availability and details.";
    return message;
  };

  /**
   * Handles the checkout process by sending cart details to WhatsApp.
   */
  const checkout = () => {
    if (cartItems.length === 0) {
      setModalMessage("Your cart is empty. Please add items before checking out.");
      setShowModal(true);
      setTimeout(() => setShowModal(false), 3000);
      return;
    }

    const whatsappPhoneNumber = '254796515157';
    const message = formatCartItemsForWhatsApp(cartItems, calculateTotal());
    const whatsappUrl = `https://wa.me/${whatsappPhoneNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    // Show success message and clear cart after initiating WhatsApp chat
    setModalMessage("Redirecting to WhatsApp to complete your order! Your cart has been cleared.");
    setShowModal(true);
    setCartItems([]); // Clear the cart after initiating checkout
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
const ProductCard = ({ product, onReadMoreClick }) => {
  const { addToCart } = useCart();

  const showReadMore = product.category === 'flowers' || product.category === 'trees';

  return (
    <div className="bg-white rounded-xl shadow-xl hover:shadow-2xl overflow-hidden transform transition-all duration-300 flex flex-col hover:ring-2 hover:ring-emerald-300">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.onerror = null;
          let placeholderText = '';
          if (product.category === 'flowers') placeholderText = 'Flower';
          else if (product.category === 'flower_pots') placeholderText = 'Pot';
          else if (product.category === 'trees') placeholderText = 'Tree';
          e.target.src = `https://placehold.co/300x200/047857/ffffff?text=${placeholderText}`;
        }}
      />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 font-inter">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow max-h-24 overflow-y-auto pr-2">
          {product.description}
          {showReadMore && (
            <span
              className="text-emerald-600 cursor-pointer hover:underline ml-1 font-medium"
              onClick={() => onReadMoreClick(product)}
            >
                <span>Get More Details from our Green AI</span>

                <span className="inline-flex items-center space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 text-emerald-700 inline-block align-middle ml-2"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  aria-label="AI"
                >
                  <circle cx="16" cy="16" r="16" fill="#059669" />
                  <text
                    x="16"
                    y="21"
                    textAnchor="middle"
                    fontSize="15"
                    fontWeight="bold"
                    fill="#fff"
                    fontFamily="Inter, Arial, sans-serif"
                    letterSpacing="2"
                  >
                    AI
                  </text>
                </svg>
                </span>
            </span>
          )}
        </p>
        <p className="text-gray-900 text-lg font-bold mb-4">KSh {product.price.toFixed(2)}</p>
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
const ProductList = ({ onReadMoreClick }) => {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredProducts = products.filter(product => {
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;

    let matchesType = true;
    if (categoryFilter === 'flowers' && typeFilter !== 'all') {
      matchesType = product.flowerType === typeFilter;
    } else if (categoryFilter === 'trees' && typeFilter !== 'all') {
      matchesType = product.treeType === typeFilter;
    }

    return matchesCategory && matchesType;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
    setTypeFilter('all');
  }, [categoryFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [typeFilter]);

  const uniqueFlowerTypes = [...new Set(products
    .filter(p => p.category === 'flowers')
    .map(p => p.flowerType)
  )];

  const uniqueTreeTypes = [...new Set(products
    .filter(p => p.category === 'trees')
    .map(p => p.treeType)
  )];

  return (
    <section className="p-6 sm:p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center font-inter">Our Eco-Friendly Collection</h2>

      <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mb-4 gap-y-2">
        <button
          onClick={() => setCategoryFilter('all')}
          className={`py-2 px-4 sm:px-6 rounded-full text-sm sm:text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
            categoryFilter === 'all' ? 'bg-emerald-700 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Items
        </button>
        <button
          onClick={() => setCategoryFilter('flowers')}
          className={`py-2 px-4 sm:px-6 rounded-full text-sm sm:text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
            categoryFilter === 'flowers' ? 'bg-emerald-700 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Flowers
        </button>
        <button
          onClick={() => setCategoryFilter('flower_pots')}
          className={`py-2 px-4 sm:px-6 rounded-full text-sm sm:text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
            categoryFilter === 'flower_pots' ? 'bg-emerald-700 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Flower Pots
        </button>
        <button
          onClick={() => setCategoryFilter('trees')}
          className={`py-2 px-4 sm:px-6 rounded-full text-sm sm:text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
            categoryFilter === 'trees' ? 'bg-emerald-700 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Trees
        </button>
      </div>

      {categoryFilter === 'flowers' && (
        <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mb-8 mt-4 gap-y-2">
          <button
            onClick={() => setTypeFilter('all')}
            className={`py-2 px-4 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-300 ${
              typeFilter === 'all' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
            }`}
          >
            All Flowers
          </button>
          {uniqueFlowerTypes.map(type => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`py-2 px-4 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-300 ${
                typeFilter === type ? 'bg-emerald-600 text-white shadow-sm' : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      )}

      {categoryFilter === 'trees' && (
        <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mb-8 mt-4 gap-y-2">
          <button
            onClick={() => setTypeFilter('all')}
            className={`py-2 px-4 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-300 ${
              typeFilter === 'all' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
            }`}
          >
            All Trees
          </button>
          {uniqueTreeTypes.map(type => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`py-2 px-4 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-300 ${
                typeFilter === type ? 'bg-emerald-600 text-white shadow-sm' : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} onReadMoreClick={onReadMoreClick} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-lg">No products found matching your filter.</p>
        )}
      </div>

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
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-4">
      <div className="flex items-center space-x-4 flex-grow">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-md flex-shrink-0"
          onError={(e) => {
            e.target.onerror = null;
            let placeholderText = '';
            if (item.category === 'flowers') placeholderText = 'Flower';
            else if (item.category === 'flower_pots') placeholderText = 'Pot';
            else if (item.category === 'trees') placeholderText = 'Tree';
            e.target.src = `https://placehold.co/80x80/047857/ffffff?text=${placeholderText}`;
          }}
        />
        <div className="flex-grow min-w-0">
          <h4 className="font-semibold text-lg text-gray-800 mb-1 truncate font-inter">{item.name}</h4>
          <p className="text-gray-600">KSh {item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3 flex-shrink-0 ml-4">
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
  const { cartItems, calculateTotal, checkout } = useCart();

  return (
    <section className="p-8 bg-white rounded-xl shadow-inner">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center font-inter">Your Eco-Basket</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your basket is empty. Start adding some beautiful items!</p>
      ) : (
        <>
          <div className="mb-6 max-h-96 overflow-y-auto pr-2">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-6 mt-6 gap-4">
            <h3 className="text-3xl font-extrabold text-emerald-800 font-inter text-center md:text-left w-full md:w-auto">
              Total: KSh {calculateTotal().toFixed(2)}
            </h3>
            <button
              onClick={checkout}
              className="w-full md:w-auto bg-emerald-700 text-white py-4 px-8 rounded-lg font-bold text-xl hover:bg-emerald-800 transition duration-200 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:ring-opacity-75"
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

// Navbar Component
const Navbar = () => {
  const whatsappPhoneNumber = '254746887291';
  const whatsappMessage = 'Hello, I have a question about your eco-friendly products!';
  const phoneNumber = '+25446887291';

  return (
    <nav className="bg-emerald-800 text-white p-4 sm:px-6 shadow-lg fixed w-full z-10 top-0">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold font-inter tracking-tight">
          Ecogreen Shop
        </h1>
        <div className="flex items-center space-x-4">
          <a
            href={`tel:${phoneNumber}`}
            className="text-white text-sm sm:text-base hover:text-emerald-200 transition-colors duration-200 flex items-center space-x-1"
            title="Call us"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="hidden md:inline">{phoneNumber}</span>
          </a>
          <a
            href={`https://wa.me/${whatsappPhoneNumber}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full flex items-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg"
            title="Contact us on WhatsApp"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M.999 23.003L2.73 17.65a8.97 8.97 0 01-1.34-4.887C1.39 6.84 6.84 1.39 13.007 1.39c3.08 0 5.96 1.2 8.16-3.393s3.39 5.08 3.39 8.16a8.97 8.97 0 01-1.34 4.887L23.003 23.003l-5.353-1.73a9.003 9.003 0 01-4.887 1.34c-6.16 0-11.61-5.45-11.61-11.61a8.97 8.97 0 011.34-4.887L.999 0 .999 23.003zM13.007 3.39c-5.06 0-9.21 4.15-9.21 9.21 0 1.95.6 3.76 1.63 5.25L3.447 21.55l3.227-1.047a7.22 7.22 0 004.887 1.34h.01c5.06 0 9.21-4.15 9.21-9.21s-4.15-9.21-9.21-9.21zM17.007 15.61c-.24 0-.48-.07-.69-.14l-1.92-1.22c-.14-.08-.3-.1-.45-.04l-1.12.35c-.24.08-.5.06-.72-.05-.23-.1-.4-.28-.5-.5l-.35-1.12c-.06-.15-.04-.31.04-.45l1.22-1.92c.07-.21.0-2.07-2.06-2.07-.24 0-.48-.07-.69-.14l-1.92-1.22c-.14-.08-.3-.1-.45-.04l-1.12.35c-.24.08-.5.06-.72-.05-.23-.1-.4-.28-.5-.5l-.35-1.12c-.06-.15-.04-.31.04-.45l1.22-1.92c.07-.21.0-2.07-2.06-2.07" />
            </svg>
            <span className="hidden sm:inline">WhatsApp Us</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

// Floating WhatsApp Button Component
const FloatingWhatsAppButton = () => {
  const whatsappPhoneNumber = '254796515157';
  const { cartItems, calculateTotal } = useCart();

  // Function to format cart items into a string message
  const formatCartItemsForWhatsApp = (items, total) => {
    if (items.length === 0) {
      return "Hello, I'd like to inquire about your eco-friendly products!";
    }
    let message = "Hello, I'd like to place an order for the following items:\n\n";
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (Quantity: ${item.quantity}) - KSh ${item.price.toFixed(2)} each\n`;
    });
    message += `\nTotal: KSh ${total.toFixed(2)}`;
    message += "\n\nPlease confirm availability and details.";
    return message;
  };

  const whatsappMessage = formatCartItemsForWhatsApp(cartItems, calculateTotal());

  return (
    <a
      href={`https://wa.me/${whatsappPhoneNumber}?text=${encodeURIComponent(whatsappMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed left-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-75"
      title="Chat with us on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-white"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M.999 23.003L2.73 17.65a8.97 8.97 0 01-1.34-4.887C1.39 6.84 6.84 1.39 13.007 1.39c3.08 0 5.96 1.2 8.16-3.393s3.39 5.08 3.39 8.16a8.97 8.97 0 01-1.34 4.887L23.003 23.003l-5.353-1.73a9.003 9.003 0 01-4.887 1.34c-6.16 0-11.61-5.45-11.61-11.61a8.97 8.97 0 011.34-4.887L.999 0 .999 23.003zM13.007 3.39c-5.06 0-9.21 4.15-9.21 9.21 0 1.95.6 3.76 1.63 5.25L3.447 21.55l3.227-1.047a7.22 7.22 0 004.887 1.34h.01c5.06 0 9.21-4.15 9.21-9.21s-4.15-9.21-9.21-9.21zM17.007 15.61c-.24 0-.48-.07-.69-.14l-1.92-1.22c-.14-.08-.3-.1-.45-.04l-1.12.35c-.24.08-.5.06-.72-.05-.23-.1-.4-.28-.5-.5l-.35-1.12c-.06-.15-.04-.31.04-.45l1.22-1.92c.07-.21.0-2.07-2.06-2.07-.24 0-.48-.07-.69-.14l-1.92-1.22c-.14-.08-.3-.1-.45-.04l-1.12.35c-.24.08-.5.06-.72-.05-.23-.1-.4-.28-.5-.5l-.35-1.12c-.06-.15-.04-.31.04-.45l1.22-1.92c.07-.21.0-2.07-2.06-2.07" />
      </svg>
    </a>
  );
};

// New ProductDetailModal Component
const ProductDetailModal = ({ product, detailedDescription, isLoading, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 font-inter"> {/* Changed opacity to 60 */}
      <style>
        {`
        @keyframes fadeInScaleUp {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in-up {
          animation: fadeInScaleUp 0.3s ease-out forwards;
        }
        /* Custom scrollbar for Webkit browsers */
        .modal-description-scrollable::-webkit-scrollbar {
          width: 8px;
        }

        .modal-description-scrollable::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .modal-description-scrollable::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }

        .modal-description-scrollable::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        `}
      </style>
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-lg lg:max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in-up">
        <div className="flex justify-between items-start mb-4 border-b pb-3 border-gray-200">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{product.name} Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-3xl font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-1"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <div className="mb-4 text-gray-700">
          <h3 className="font-semibold text-lg mb-2">Brief Description:</h3>
          <p>{product.description}</p>
        </div>

        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-48">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-500"></div>
            <p className="text-gray-600 text-lg mt-4">Fetching more details from the garden of knowledge...</p>
          </div>
        ) : (
          <div className="text-gray-800 leading-relaxed space-y-4 max-h-60 overflow-y-auto modal-description-scrollable pr-2">
            <h3 className="font-semibold text-lg mb-2">Extended Information:</h3>
            {detailedDescription ? (
              detailedDescription.split('\n').map((paragraph, index) => (
                paragraph.trim() !== '' && <p key={index} className="mb-2">{paragraph.trim()}</p>
              ))
            ) : (
              <p className="text-gray-600">No extended details available at the moment.</p>
            )}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-gray-200 text-right">
          <button
            onClick={onClose}
            className="bg-emerald-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-emerald-700 transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


// Footer Component
const Footer = () => {
  return (
    <footer className="bg-emerald-900 text-white py-10 px-4 sm:px-6 mt-12 shadow-inner">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Company Info */}
        <div className="mb-6 md:mb-0">
          <h4 className="text-xl font-bold mb-4 font-inter">Ecogreen Shop</h4>
          <p className="text-emerald-200 text-sm">
            Your trusted source for sustainable plants and gardening essentials.
            <br />
            Growing green, living serene.
          </p>
        </div>

        {/* Quick Links */}
        <div className="mb-6 md:mb-0">
          <h4 className="text-xl font-bold mb-4 font-inter">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-emerald-200 hover:text-emerald-50 transition-colors duration-200 text-sm">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-emerald-200 hover:text-emerald-50 transition-colors duration-200 text-sm">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="text-emerald-200 hover:text-emerald-50 transition-colors duration-200 text-sm">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-emerald-200 hover:text-emerald-50 transition-colors duration-200 text-sm">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media & Contact */}
        <div>
          <h4 className="text-xl font-bold mb-4 font-inter">Connect With Us</h4>
          <div className="flex justify-center md:justify-start space-x-4 mb-4">
            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-emerald-200 hover:text-emerald-50 transition-colors duration-200">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            {/* Twitter */}
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-emerald-200 hover:text-emerald-50 transition-colors duration-200">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-emerald-200 hover:text-emerald-50 transition-colors duration-200">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37a4 4 0 11-8 0 4 4 0 018 0z"></path>
                <path d="M17.5 6.5h.01"></path>
              </svg>
            </a>
          </div>
          <p className="text-emerald-200 text-sm">
            Email: info@ecogreenshop.com
          </p>
          <p className="text-emerald-200 text-sm mt-1">
            Phone: +25446887291
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-emerald-700 mt-8 pt-8 text-center">
        <p className="text-emerald-300 text-sm">
          &copy; {new Date().getFullYear()} Ecogreen Shop. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

// Main App component
function App() {
  const [selectedProductForDetails, setSelectedProductForDetails] = useState(null);
  const [detailedDescription, setDetailedDescription] = useState('');
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const fetchProductDetailsAndShowModal = async (product) => {
    setSelectedProductForDetails(product);
    setDetailedDescription('');
    setIsLoadingDetails(true);

    try {
      const prompt = `Give me more detailed information about this product: ${product.name} - ${product.description}. Focus on its characteristics, care instructions, ideal environment, and common uses. Provide about 3-4 paragraphs of text.`;
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = "AIzaSyC1q_KJysimHoEnfZgofyIrsahF7NLmP0c";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setDetailedDescription(text);
      } else {
        setDetailedDescription("Could not fetch more details at this moment. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching detailed description:", error);
      setDetailedDescription("Failed to load more details due to a network error.");
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const closeProductDetailModal = () => {
    setSelectedProductForDetails(null);
    setDetailedDescription('');
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 font-inter flex flex-col">
        <Navbar />
        <header className="relative bg-gradient-to-r from-emerald-700 to-emerald-900 text-white text-center py-16 sm:py-24 px-4 shadow-xl">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4 tracking-tight leading-tight">
              🌱 Your Eco-Friendly Oasis 🌱
            </h1>
            <p className="text-xl sm:text-2xl text-emerald-100 opacity-90 mt-4">
              Discover exquisite fresh flowers, elegant pots, and magnificent trees for a greener, happier home.
            </p>
          </div>
        </header>

        <main className="container mx-auto grid grid-cols-1 gap-8 sm:gap-10 px-4 py-8 flex-grow">
          <div className="col-span-1">
            <ProductList onReadMoreClick={fetchProductDetailsAndShowModal} />
          </div>
          <div className="col-span-1">
            <ShoppingCart />
          </div>
        </main>
        <GlobalModal />
        <FloatingWhatsAppButton />
        <Footer />
        {selectedProductForDetails && (
          <ProductDetailModal
            product={selectedProductForDetails}
            detailedDescription={detailedDescription}
            isLoading={isLoadingDetails}
            onClose={closeProductDetailModal}
          />
        )}
      </div>
    </CartProvider>
  );
}

export default App;
