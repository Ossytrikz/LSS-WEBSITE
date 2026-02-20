import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const News = () => {
  // Sample data - will be replaced with backend
  const announcements = [
    {
      id: 1,
      title: "LSS Week 2025: Save the Date!",
      date: "2025-03-15",
      category: "Event",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
      summary: "Get ready for the most exciting week of the year! LSS Week 2025 is scheduled for April with amazing activities, guest speakers, and networking opportunities.",
      content: "Mark your calendars! LSS Week 2025 promises to be bigger and better than ever...",
    },
    {
      id: 2,
      title: "Examination Timetable Now Available",
      date: "2025-03-14",
      category: "Academic",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
      summary: "The official examination timetable for the current semester has been released. Students are advised to check the academic resources section.",
      content: "The examination timetable for all law courses has been published...",
    },
    {
      id: 3,
      title: "Guest Lecture: Introduction to Corporate Law Practice",
      date: "2025-03-12",
      category: "Event",
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=400&fit=crop",
      summary: "Join us for an enlightening session with Barr. Chinedu Okafor, Senior Partner at a leading law firm in Lagos.",
      content: "We are excited to announce a special guest lecture...",
    },
    {
      id: 4,
      title: "New Study Materials for Constitutional Law",
      date: "2025-03-10",
      category: "Academic",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=400&fit=crop",
      summary: "Fresh lecture notes and comprehensive study guides for Constitutional Law are now available in the resources section.",
      content: "Students studying Constitutional Law will be pleased to know...",
    },
    {
      id: 5,
      title: "Moot Court Competition Registration Open",
      date: "2025-03-08",
      category: "Opportunity",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop",
      summary: "Registration is now open for the annual LSS Moot Court Competition. Sharpen your advocacy skills and compete for exciting prizes!",
      content: "The LSS Moot Court Competition is back! This year's theme focuses on...",
    },
    {
      id: 6,
      title: "LSS General Meeting Highlights",
      date: "2025-03-05",
      category: "Event",
      image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&h=400&fit=crop",
      summary: "Key decisions and announcements from the latest LSS general meeting held on March 5th.",
      content: "The LSS general meeting was held successfully with high student turnout...",
    },
  ];

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

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            News & Announcements
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest news, events, and important announcements from LSS
          </p>
        </div>

        {/* Featured Post */}
        <Card className="mb-12 overflow-hidden shadow-elegant border-0 gradient-card">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-auto overflow-hidden">
              <img
                src={announcements[0].image}
                alt={announcements[0].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className={getCategoryColor(announcements[0].category)}>
                  {announcements[0].category}
                </Badge>
              </div>
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(announcements[0].date)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  5 min read
                </div>
              </div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
                {announcements[0].title}
              </h2>
              <p className="text-muted-foreground mb-6">
                {announcements[0].summary}
              </p>
              <Button variant="gold">
                Read Full Article <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </Card>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.slice(1).map((announcement) => (
            <Card key={announcement.id} className="overflow-hidden shadow-elegant hover:shadow-gold transition-smooth border-0 gradient-card">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={announcement.image}
                  alt={announcement.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getCategoryColor(announcement.category)}>
                    {announcement.category}
                  </Badge>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar className="h-3 w-3" />
                  {formatDate(announcement.date)}
                </div>

                <h3 className="font-serif text-xl font-bold text-foreground mb-3 line-clamp-2">
                  {announcement.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {announcement.summary}
                </p>

                <Button variant="ghost" className="p-0 h-auto text-primary hover:bg-transparent">
                  Read more →
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>

        {/* Newsletter CTA */}
        <Card className="mt-16 p-8 md:p-12 text-center gradient-hero text-primary-foreground shadow-elegant border-0">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
            Never Miss an Update
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
            Stay connected with LSS by following us on social media for real-time updates
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="gold" size="lg">
              Follow on Instagram
            </Button>
            <Button variant="outline" size="lg" className="bg-card/10 border-primary-foreground/20 hover:bg-card/20">
              Follow on Twitter
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default News;
