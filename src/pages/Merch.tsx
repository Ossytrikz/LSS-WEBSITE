import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, ArrowRight } from "lucide-react";
import { useAdminData } from "@/context/AdminDataContextSupabase";

const Merch = () => {
  const { merchItems, loading } = useAdminData();

  const formatPrice = (price: string) => {
    return `₦${price}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const featuredItems = merchItems.slice(0, 3);
  const otherItems = merchItems.slice(3);

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <div className="p-2 md:p-3 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl shadow-lg">
              <ShoppingBag className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              LSS Merchandise
            </h1>
          </div>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto px-2">
            Get your official LSS branded items and support our community
          </p>
        </div>

        {/* Featured Products */}
        {featuredItems.length > 0 && (
          <div className="mb-8 md:mb-12">
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6 md:mb-8 text-center">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {featuredItems.map((item) => (
                <Link key={item.id} to={`/merch/${item.id}`}>
                  <Card className="overflow-hidden shadow-elegant hover:shadow-gold transition-smooth border-0 group h-full">
                    <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      {!item.in_stock && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <div className="text-center">
                            <ShoppingBag className="h-10 w-10 md:h-12 md:w-12 text-white mx-auto mb-2" />
                            <p className="text-white text-lg md:text-xl font-bold">Out of Stock</p>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 md:top-4 md:right-4">
                        <Badge className={item.in_stock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                          {item.in_stock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-4 md:p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-serif text-lg md:text-xl font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                        <div className="text-right">
                          <div className="text-xl md:text-2xl font-bold text-primary">
                            {formatPrice(item.price)}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 md:h-4 md:w-4 ${
                                  i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">
                          {item.sizes && item.sizes.length > 0 && `Available sizes: ${item.sizes.join(", ")}`}
                        </div>
                        <Button 
                          variant="ghost" 
                          className="p-0 h-auto text-primary hover:bg-transparent group"
                        >
                          View Details 
                          <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Products Grid */}
        {otherItems.length > 0 && (
          <div>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6 md:mb-8 text-center">
              All Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {otherItems.map((item) => (
                <Link key={item.id} to={`/merch/${item.id}`}>
                  <Card className="overflow-hidden shadow-elegant hover:shadow-gold transition-smooth border-0 group h-full">
                    <div className="relative h-36 sm:h-40 md:h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      {!item.in_stock && (
                        <div className="absolute top-2 right-2 md:top-3 md:right-3">
                          <Badge className="bg-red-100 text-red-800 text-xs">Out of Stock</Badge>
                        </div>
                      )}
                    </div>

                    <div className="p-3 md:p-4">
                      <h3 className="font-serif text-sm md:text-lg font-bold text-foreground mb-1 md:mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-base md:text-xl font-bold text-primary mb-1 md:mb-2">
                        {formatPrice(item.price)}
                      </p>
                      <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 md:line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {merchItems.length === 0 && (
          <div className="text-center py-8 md:py-12">
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4">No Merchandise Available</h3>
            <p className="text-muted-foreground px-4">
              Check back later for new LSS branded items and accessories.
            </p>
          </div>
        )}

        {/* Newsletter CTA */}
        <Card className="mt-8 md:mt-16 p-6 md:p-8 lg:p-12 text-center gradient-hero text-primary-foreground shadow-elegant border-0">
          <h2 className="font-serif text-xl md:text-2xl lg:text-3xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-base md:text-lg mb-6 max-w-2xl mx-auto opacity-90 px-2">
            Be the first to know about new merchandise drops and exclusive LSS items
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4 px-4 sm:px-0">
            <Button variant="gold" size="lg" className="w-full sm:w-auto">
              Notify Me of New Items
            </Button>
            <Button variant="outline" size="lg" className="bg-card/10 border-primary-foreground/20 hover:bg-card/20 w-full sm:w-auto">
              View Size Guide
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Merch;
