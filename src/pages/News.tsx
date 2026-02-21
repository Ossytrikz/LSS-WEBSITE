import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, Megaphone } from "lucide-react";
import { useAdminData } from "@/context/AdminDataContextSupabase";

const News = () => {
  const { newsItems, loading } = useAdminData();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Academic":
        return "bg-primary/10 text-primary";
      case "Event":
        return "bg-accent/10 text-accent";
      case "Opportunity":
        return "bg-secondary/10 text-secondary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const featuredArticle = newsItems[0];
  const otherArticles = newsItems.slice(1);

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <div className="p-2 md:p-3 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl shadow-lg">
              <Megaphone className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              News & Announcements
            </h1>
          </div>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto px-2">
            Stay updated with the latest news, events, and important announcements from LSS
          </p>
        </div>

        {featuredArticle && (
          /* Featured Post */
          <Card className="mb-8 md:mb-12 overflow-hidden shadow-elegant border-0 gradient-card">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-48 sm:h-64 lg:h-auto overflow-hidden">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 md:top-4 md:left-4">
                  <Badge className={getCategoryColor(featuredArticle.category)}>
                    {featuredArticle.category}
                  </Badge>
                </div>
              </div>
              <div className="p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                    {formatDate(featuredArticle.date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 md:h-4 md:w-4" />
                    5 min read
                  </div>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">
                  {featuredArticle.title}
                </h2>
                <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 leading-relaxed">
                  {featuredArticle.summary}
                </p>
                <Button variant="gold" asChild className="w-full sm:w-auto">
                  <Link to={`/news/${featuredArticle.id}`}>
                    Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        )}

        {otherArticles.length > 0 && (
          /* News Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {otherArticles.map((article) => (
              <Link key={article.id} to={`/news/${article.id}`}>
                <Card className="overflow-hidden shadow-elegant hover:shadow-gold transition-smooth border-0 gradient-card h-full">
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 md:top-4 md:left-4">
                      <Badge className={getCategoryColor(article.category)}>
                        {article.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4 md:p-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Calendar className="h-3 w-3" />
                      {formatDate(article.date)}
                    </div>

                    <h3 className="font-serif text-lg md:text-xl font-bold text-foreground mb-3 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {article.summary}
                    </p>

                    <Button variant="ghost" className="p-0 h-auto text-primary hover:bg-transparent group">
                      Read more 
                      <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {newsItems.length === 0 && (
          <div className="text-center py-8 md:py-12">
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4">No News Articles</h3>
            <p className="text-muted-foreground px-4">
              Check back later for the latest announcements and updates from LSS.
            </p>
          </div>
        )}

        {/* Newsletter CTA */}
        <Card className="mt-8 md:mt-16 p-6 md:p-8 lg:p-12 text-center gradient-hero text-primary-foreground shadow-elegant border-0">
          <h2 className="font-serif text-xl md:text-2xl lg:text-3xl font-bold mb-4">
            Never Miss an Update
          </h2>
          <p className="text-base md:text-lg mb-6 max-w-2xl mx-auto opacity-90 px-2">
            Stay connected with LSS by following us on social media for real-time updates
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4 px-4 sm:px-0">
            <Button variant="gold" size="lg" className="w-full sm:w-auto">
              Follow on Instagram
            </Button>
            <Button variant="outline" size="lg" className="bg-card/10 border-primary-foreground/20 hover:bg-card/20 w-full sm:w-auto">
              Follow on Twitter
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default News;
