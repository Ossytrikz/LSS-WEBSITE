import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Share2, MessageSquare, Package, Tag } from "lucide-react";
import { useAdminData } from "@/context/AdminDataContextSupabase";
import { useState, useEffect } from "react";

const MerchItemPage = () => {
  const { id } = useParams<{ id: string }>();
  const { merchItems } = useAdminData();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (id && merchItems.length > 0) {
      const foundItem = merchItems.find(item => item.id === parseInt(id));
      setItem(foundItem);
      setLoading(false);
      setShareUrl(window.location.href);
    }
  }, [id, merchItems]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item?.name,
          text: `Check out this ${item?.name} from LSS Merch!`,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    // In a real implementation, this would add to cart
    alert(`Added ${quantity} x ${item.name} (${selectedSize}) to cart!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="p-6 md:p-8 text-center max-w-md">
          <h1 className="text-xl md:text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6 text-sm md:text-base">
            The merchandise item you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild className="w-full sm:w-auto">
            <Link to="/merch">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Merch
            </Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <div className="mb-6 md:mb-8">
          <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground -ml-2 md:ml-0">
            <Link to="/merch">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Merch
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <Card className="overflow-hidden shadow-elegant border-0">
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {!item.in_stock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-center">
                      <Package className="h-12 w-12 md:h-16 md:w-16 text-white mx-auto mb-4" />
                      <p className="text-white text-lg md:text-xl font-bold">Out of Stock</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Product Details */}
          <div className="space-y-4 md:space-y-6">
            {/* Header */}
            <div>
              <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-3">
                <div className="flex-1">
                  <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {item.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 md:gap-4">
                    <Badge className={item.in_stock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {item.in_stock ? "In Stock" : "Out of Stock"}
                    </Badge>
                    <div className="text-xl md:text-2xl font-bold text-primary">
                      ₦{item.price}
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleShare}
                  className="p-2 h-auto hover:bg-muted self-start"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Description */}
            <Card className="p-4 md:p-6 shadow-elegant border-0">
              <h3 className="font-semibold text-base md:text-lg text-foreground mb-3 md:mb-4">Description</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </Card>

            {/* Size Selection */}
            {item.sizes && item.sizes.length > 0 && (
              <Card className="p-4 md:p-6 shadow-elegant border-0">
                <h3 className="font-semibold text-base md:text-lg text-foreground mb-3 md:mb-4">Available Sizes</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 gap-2 md:gap-3">
                  {item.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      onClick={() => setSelectedSize(size)}
                      className="h-10 md:h-12 text-sm"
                      disabled={!item.in_stock}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </Card>
            )}

            {/* Quantity and Actions */}
            <Card className="p-4 md:p-6 shadow-elegant border-0">
              <h3 className="font-semibold text-base md:text-lg text-foreground mb-3 md:mb-4">Purchase Options</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Quantity</label>
                  <div className="flex items-center gap-3 md:gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={!item.in_stock}
                      className="h-10 w-10"
                    >
                      -
                    </Button>
                    <div className="w-14 md:w-16 text-center">
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full text-center border border-border rounded-md p-2 text-sm"
                        disabled={!item.in_stock}
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={!item.in_stock}
                      className="h-10 w-10"
                    >
                      +
                    </Button>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={handleAddToCart}
                  disabled={!item.in_stock || !selectedSize}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {item.in_stock ? `Add to Cart - ₦${(parseFloat(item.price) * quantity).toFixed(2)}` : "Out of Stock"}
                </Button>
              </div>
            </Card>

            {/* Additional Info */}
            <Card className="p-4 md:p-6 shadow-elegant border-0">
              <h3 className="font-semibold text-base md:text-lg text-foreground mb-3 md:mb-4">Product Information</h3>
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center gap-2">
                  <Tag className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                  <span className="text-xs md:text-sm text-muted-foreground">Product ID: {item.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                  <span className="text-xs md:text-sm text-muted-foreground">Category: LSS Merchandise</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                  <span className="text-xs md:text-sm text-muted-foreground">
                    {item.in_stock ? "Ready to ship" : "Currently out of stock"}
                  </span>
                </div>
              </div>
            </Card>

            {/* Share and Feedback */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" size="lg" onClick={handleShare} className="w-full sm:w-auto">
                <Share2 className="mr-2 h-4 w-4" />
                Share Product
              </Button>
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                <Link to="/feedback">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Ask About This Item
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-8 md:mt-16">
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6 md:mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {merchItems
              .filter(relatedItem => relatedItem.id !== item.id)
              .slice(0, 4)
              .map(relatedItem => (
                <Link key={relatedItem.id} to={`/merch/${relatedItem.id}`}>
                  <Card className="overflow-hidden shadow-elegant hover:shadow-gold transition-smooth border-0 h-full group">
                    <div className="relative h-36 sm:h-40 md:h-48 overflow-hidden">
                      <img
                        src={relatedItem.image}
                        alt={relatedItem.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      {!relatedItem.in_stock && (
                        <div className="absolute top-2 right-2 md:top-3 md:right-3">
                          <Badge className="bg-red-100 text-red-800 text-xs">Out of Stock</Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-3 md:p-4">
                      <h3 className="font-serif text-xs md:text-sm font-bold text-foreground mb-1 md:mb-2 line-clamp-2">
                        {relatedItem.name}
                      </h3>
                      <p className="text-xs text-primary font-bold mb-1 md:mb-2">
                        ₦{relatedItem.price}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1 md:line-clamp-2">
                        {relatedItem.description}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchItemPage;
