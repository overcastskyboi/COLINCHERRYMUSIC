import { useState } from 'react';
import PageTransition from '../components/PageTransition';
import { Helmet } from 'react-helmet-async';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  hasSizes?: boolean;
  themeColor: string;
  isComingSoon?: boolean;
}

const PRODUCTS: Product[] = [
  {
    id: 'garfield-vinyl',
    name: 'Garfield Park 12" Vinyl',
    price: 35.00,
    category: 'Vinyl',
    description: 'Limited edition 140g black vinyl. Features the full upcoming album "Garfield Park" in high-fidelity audio. Heavyweight gatefold matte packaging.',
    image: '/merch-vinyl.jpg',
    themeColor: '#4A90E2',
    isComingSoon: true
  },
  {
    id: 'garfield-cassette',
    name: 'Garfield Park Cassette',
    price: 15.00,
    category: 'Cassette',
    description: 'Translucent smoke grey cassette shell with minimalist white label. Includes full double-sided printed J-card. Limited edition of 100.',
    image: '/merch-cassette.jpg',
    themeColor: '#00f2ea',
    isComingSoon: true
  }
];

interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

const Store = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const addToCart = (product: Product, size?: string, qty: number = 1) => {
    if (product.isComingSoon) return; // Prevent adding coming soon items
    
    const existingIndex = cart.findIndex(
      item => item.product.id === product.id && (!product.hasSizes || item.size === size)
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += qty;
      setCart(updated);
    } else {
      setCart([...cart, { product, size: product.hasSizes ? size : undefined, quantity: qty }]);
    }
    
    setIsCartOpen(true);
    setQuantity(1);
    setSelectedProduct(null);
  };

  const updateCartQty = (index: number, newQty: number) => {
    if (newQty <= 0) {
      setCart(cart.filter((_, i) => i !== index));
    } else {
      const updated = [...cart];
      updated[index].quantity = newQty;
      setCart(updated);
    }
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <PageTransition>
      <Helmet>
        <title>Colin Cherry | Official Merchandise Store</title>
        <meta name="description" content="Official Colin Cherry store. Pre-order Garfield Park limited edition vinyl and cassette tapes. Music merchandise and physical releases." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 py-12 relative">
        <header className="mb-24 text-center max-w-2xl mx-auto flex flex-col items-center">
          <h1 className="text-6xl md:text-9xl font-display uppercase tracking-tighter mb-6 leading-none">Store</h1>
          <p className="text-[10px] uppercase tracking-[0.5em] font-black text-white/60">Official Artist Merchandise</p>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="mt-8 flex items-center gap-3 px-6 py-3 glass hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-widest text-white/80 hover:text-white"
          >
            <ShoppingBag size={14} /> Cart ({cartCount})
          </button>
        </header>

        {/* Product Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8 mb-32">
          {PRODUCTS.map((product) => (
            <div 
              key={product.id}
              onClick={() => {
                setSelectedProduct(product);
                setSelectedSize('M');
                setQuantity(1);
              }}
              className="group glass border border-white/5 hover:border-white/20 transition-all duration-500 cursor-pointer flex flex-col justify-between overflow-hidden rounded-2xl bg-black/20 relative"
              style={{
                boxShadow: `hover:0 0 30px ${product.themeColor}15`
              }}
            >
              {product.isComingSoon && (
                <span className="absolute top-4 left-4 bg-white/10 text-white border border-white/10 backdrop-blur-md px-3.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest z-10">
                  Coming Soon
                </span>
              )}
              
              <div className="aspect-square w-full overflow-hidden bg-neutral-900 relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.src = "/rose.jpg"; }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white px-6 py-3 glass">Quick View</span>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <span className="text-[8px] font-black uppercase tracking-widest text-white/60">{product.category}</span>
                  <h3 className="text-lg font-black uppercase tracking-tight truncate mt-1">{product.name}</h3>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                  <span className="text-base font-bold">${product.price.toFixed(2)}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">Select Options &rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Product Details Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl"
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="glass w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 md:p-12 relative"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors"
                >
                  <X size={28} />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="aspect-square glass rounded-xl overflow-hidden bg-neutral-900 border border-white/5">
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name} 
                      className="w-full h-full object-cover" 
                      onError={(e) => { e.currentTarget.src = "/rose.jpg"; }}
                    />
                  </div>
                  
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{selectedProduct.category}</span>
                        {selectedProduct.isComingSoon && (
                          <span className="bg-white/10 text-white border border-white/10 px-2.5 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest">Coming Soon</span>
                        )}
                      </div>
                      <h2 
                        className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mt-2"
                        style={{ color: selectedProduct.themeColor }}
                      >
                        {selectedProduct.name}
                      </h2>
                      <p className="text-2xl font-bold mt-4">${selectedProduct.price.toFixed(2)}</p>
                    </div>

                    <p className="text-white/80 text-sm leading-relaxed">{selectedProduct.description}</p>

                    {selectedProduct.isComingSoon ? (
                      <div className="space-y-4 pt-4 border-t border-white/5">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">
                          Pre-orders will launch officially with the rollout of the Garfield Park album.
                        </p>
                        <button
                          disabled
                          className="w-full bg-white/5 border border-white/10 text-white/50 py-4 rounded-lg font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-3 cursor-not-allowed"
                        >
                          Pre-Order Coming Soon
                        </button>
                      </div>
                    ) : (
                      <>
                        {selectedProduct.hasSizes && (
                          <div className="space-y-3">
                            <span className="text-[9px] font-black uppercase tracking-widest text-white/60">Select Size</span>
                            <div className="flex gap-3">
                              {['S', 'M', 'L', 'XL'].map((size) => (
                                <button
                                  key={size}
                                  onClick={() => setSelectedSize(size)}
                                  className={`w-12 h-12 flex items-center justify-center font-black rounded-lg text-xs transition-all ${
                                    selectedSize === size 
                                      ? 'bg-white text-black scale-105' 
                                      : 'glass hover:bg-white/5 text-white/60 hover:text-white'
                                  }`}
                                >
                                  {size}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="space-y-4 pt-4 border-t border-white/5">
                          <div className="flex items-center gap-6">
                            <div className="flex items-center border border-white/10 rounded-lg p-1.5 glass">
                              <button 
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="p-1 hover:text-white text-white/60 transition-colors"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-12 text-center font-black text-sm">{quantity}</span>
                              <button 
                                onClick={() => setQuantity(quantity + 1)}
                                className="p-1 hover:text-white text-white/60 transition-colors"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            <button
                              onClick={() => addToCart(selectedProduct, selectedProduct.hasSizes ? selectedSize : undefined, quantity)}
                              className="flex-grow bg-white text-black py-4 rounded-lg font-black uppercase tracking-widest text-[10px] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                            >
                              Add to Cart <ArrowRight size={14} />
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sliding Cart Drawer */}
        <AnimatePresence>
          {isCartOpen && (
            <div className="fixed inset-0 z-[100] flex justify-end">
              {/* Overlay backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              
              {/* Drawer Container */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative w-full max-w-md h-full bg-[#0a0a0a] border-l border-white/5 shadow-2xl flex flex-col justify-between z-10"
              >
                {/* Header */}
                <div className="p-8 border-b border-white/5 flex justify-between items-center">
                  <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                    <ShoppingBag size={20} /> Your Cart ({cartCount})
                  </h3>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Cart Items List */}
                <div className="flex-grow overflow-y-auto p-8 space-y-6">
                  {cart.length === 0 ? (
                    <div className="text-center py-20 text-white/60 space-y-4">
                      <ShoppingBag size={48} className="mx-auto text-white/20" />
                      <p className="text-[10px] font-black uppercase tracking-widest">Your cart is currently empty</p>
                    </div>
                  ) : (
                    cart.map((item, index) => (
                      <div 
                        key={`${item.product.id}-${item.size || ''}`} 
                        className="flex gap-4 p-4 glass border border-white/5 relative bg-black/20"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-900 border border-white/5">
                          <img 
                            src={item.product.image} 
                            alt="" 
                            className="w-full h-full object-cover" 
                            onError={(e) => { e.currentTarget.src = "/rose.jpg"; }}
                          />
                        </div>
                        <div className="flex-grow space-y-1 pr-6">
                          <h4 className="font-black text-sm uppercase tracking-tight truncate leading-none">{item.product.name}</h4>
                          <div className="flex gap-3 text-[9px] font-bold uppercase tracking-wider text-white/60">
                            {item.size && <span>Size: {item.size}</span>}
                            <span>${item.product.price.toFixed(2)}</span>
                          </div>
                          
                          <div className="flex items-center gap-3 mt-2">
                            <button 
                              onClick={() => updateCartQty(index, item.quantity - 1)}
                              className="text-white/60 hover:text-white p-0.5"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="font-bold text-xs">{item.quantity}</span>
                            <button 
                              onClick={() => updateCartQty(index, item.quantity + 1)}
                              className="text-white/60 hover:text-white p-0.5"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                        </div>

                        <button 
                          onClick={() => removeFromCart(index)}
                          className="absolute top-4 right-4 text-white/60 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer and subtotal */}
                <div className="p-8 border-t border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md space-y-6">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Subtotal</span>
                    <span className="text-2xl font-black">${cartSubtotal.toFixed(2)}</span>
                  </div>

                  <button
                    disabled={cart.length === 0}
                    onClick={() => setShowCheckoutModal(true)}
                    className="w-full bg-white text-black py-4 rounded-lg font-black uppercase tracking-widest text-[10px] hover:scale-[1.02] active:scale-95 disabled:opacity-30 disabled:scale-100 transition-all flex items-center justify-center gap-3"
                  >
                    Proceed to Checkout <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Mock Checkout Confirmation Dialog */}
        <AnimatePresence>
          {showCheckoutModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
              onClick={() => setShowCheckoutModal(false)}
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="glass w-full max-w-md p-8 md:p-12 text-center space-y-6 border border-white/10"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto text-white/60">
                  <ShoppingBag size={24} />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Checkout Coming Soon</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Physical pre-orders will launch officially alongside the rollout of the <span className="text-white">Garfield Park</span> album.
                  </p>
                </div>

                <button 
                  onClick={() => {
                    setShowCheckoutModal(false);
                    setIsCartOpen(false);
                  }}
                  className="bg-white text-black px-8 py-4 rounded-lg font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all w-full"
                >
                  Return to Store
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default Store;
