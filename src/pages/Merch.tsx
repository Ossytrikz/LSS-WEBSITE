import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star } from "lucide-react";

const Merch = () => {
  // Sample data - will be replaced with backend
  const products = [
    {
      id: 1,
      name: "LSS Official T-Shirt",
      price: "₦5,000",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
      sizes: ["S", "M", "L", "XL", "XXL"],
      description: "Premium quality cotton t-shirt with LSS logo",
      inStock: true,
    },
    {
      id: 2,
      name: "LSS Hoodie",
      price: "₦12,000",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop",
      sizes: ["M", "L", "XL"],
      description: "Warm and comfortable hoodie for all seasons",
      inStock: true,
    },
    {
      id: 3,
      name: "LSS Cap",
      price: "₦3,500",
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=500&fit=crop",
      sizes: ["One Size"],
      description: "Stylish cap with embroidered LSS logo",
      inStock: true,
    },
    {
      id: 4,
      name: "LSS Polo Shirt",
      price: "₦7,500",
      image: "https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=500&h=500&fit=crop",
      sizes: ["S", "M", "L", "XL"],
      description: "Professional polo shirt perfect for formal events",
      inStock: true,
    },
    {
      id: 5,
      name: "LSS Notebook & Pen Set",
      price: "₦4,000",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&h=500&fit=crop",
      sizes: ["Standard"],
      description: "Quality stationery set for your law studies",
      inStock: false,
    },
    {
      id: 6,
      name: "LSS Water Bottle",
      price: "₦2,500",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop",
      sizes: ["500ml"],
      description: "Eco-friendly water bottle with LSS branding",
      inStock: true,
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-accent/10">
              <ShoppingBag className="h-8 w-8 text-accent" />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            LSS Official Merchandise
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Show your LSS pride with our exclusive collection of high-quality merchandise
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden shadow-elegant hover:shadow-gold transition-smooth border-0 gradient-card">
              {/* Product Image */}
              <div className="relative h-72 overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
                    <span className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg font-semibold">
                      Out of Stock
                    </span>
                  </div>
                )}
                {product.inStock && (
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-gold">
                    <Star className="h-3 w-3 fill-current" />
                    New
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Price:</span>
                    <span className="text-xl font-bold text-accent">{product.price}</span>
                  </div>
                  
                  <div className="flex items-start justify-between">
                    <span className="text-sm text-muted-foreground">Sizes:</span>
                    <div className="flex flex-wrap gap-1 justify-end">
                      {product.sizes.map((size) => (
                        <span key={size} className="px-2 py-1 bg-muted rounded text-xs font-medium">
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  variant={product.inStock ? "default" : "outline"}
                  disabled={!product.inStock}
                >
                  {product.inStock ? "Reserve Now" : "Notify When Available"}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <Card className="p-6 border-0 gradient-card shadow-elegant">
            <h3 className="font-serif text-xl font-bold mb-3">How to Order</h3>
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>Click "Reserve Now" on your desired item(s)</li>
              <li>Fill in your details and preferred size</li>
              <li>Make payment via the provided options</li>
              <li>Collect your order from the LSS office</li>
            </ol>
          </Card>

          <Card className="p-6 border-0 gradient-card shadow-elegant">
            <h3 className="font-serif text-xl font-bold mb-3">Payment Options</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Bank Transfer to LSS Account</li>
              <li>• Payment on Collection (Cash)</li>
              <li>• Online Payment (Coming Soon)</li>
            </ul>
            <p className="text-xs text-muted-foreground mt-4">
              For bulk orders or custom designs, contact us at merch@lssbowen.edu.ng
            </p>
          </Card>
        </div>

        {/* CTA */}
        <Card className="mt-12 p-8 md:p-12 text-center gradient-hero text-primary-foreground shadow-elegant border-0">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
            Want to Suggest New Merch?
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
            We'd love to hear your ideas for new merchandise items!
          </p>
          <Button variant="gold" size="lg">
            Share Your Ideas
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Merch;
