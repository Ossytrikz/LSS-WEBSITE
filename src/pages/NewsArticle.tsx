import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, Share2, MessageSquare } from "lucide-react";
import { useAdminData } from "@/context/AdminDataContextSupabase";
import { useState, useEffect } from "react";

const NewsArticle = () => {
  const { id } = useParams<{ id: string }>();
  const { newsItems } = useAdminData();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (id && newsItems.length > 0) {
      const foundArticle = newsItems.find(item => item.id === parseInt(id));
      setArticle(foundArticle);
      setLoading(false);
      setShareUrl(window.location.href);
    }
  }, [id, newsItems]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article?.title,
          text: article?.summary,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="p-6 md:p-8 text-center max-w-md">
          <h1 className="text-xl md:text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6 text-sm md:text-base">
            The news article you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild className="w-full sm:w-auto">
            <Link to="/news">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to News
            </Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <div className="mb-6 md:mb-8">
          <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground -ml-2 md:ml-0">
            <Link to="/news">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to News
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <Card className="overflow-hidden shadow-elegant border-0 mb-6 md:mb-8">
          {/* Hero Image */}
          <div className="relative h-48 sm:h-64 md:h-96 overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
              <Badge className={getCategoryColor(article.category)}>
                {article.category}
              </Badge>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-4 md:p-6 lg:p-10">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground mb-4 md:mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                {formatDate(article.date)}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 md:h-4 md:w-4" />
                5 min read
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleShare}
                className="p-2 h-auto hover:bg-muted"
              >
                <Share2 className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </div>

            {/* Title */}
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Summary */}
            <div className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed border-l-4 border-primary/20 pl-4">
              {article.summary}
            </div>

            {/* Content */}
            <div className="prose prose-sm md:prose-lg max-w-none">
              <div className="text-foreground leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                {article.content}
              </div>
            </div>

            {/* Share Section */}
            <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Share this article</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Help spread the word about this announcement
                  </p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button variant="outline" size="sm" onClick={handleShare} className="flex-1 sm:flex-none">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" asChild className="flex-1 sm:flex-none">
                    <Link to="/feedback">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Feedback
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Related Articles */}
        <div className="mt-8 md:mt-12">
          <h2 className="font-serif text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-6 md:mb-8">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {newsItems
              .filter(item => item.id !== article.id)
              .slice(0, 3)
              .map(relatedArticle => (
                <Link key={relatedArticle.id} to={`/news/${relatedArticle.id}`}>
                  <Card className="overflow-hidden shadow-elegant hover:shadow-gold transition-smooth border-0 h-full">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className={getCategoryColor(relatedArticle.category)}>
                          {relatedArticle.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <Calendar className="h-3 w-3" />
                        {formatDate(relatedArticle.date)}
                      </div>
                      <h3 className="font-serif text-lg font-bold text-foreground mb-2 line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {relatedArticle.summary}
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

export default NewsArticle;
