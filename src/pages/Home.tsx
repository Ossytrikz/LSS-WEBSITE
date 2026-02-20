import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Users, GraduationCap, ShoppingBag, MessageSquare, Megaphone, ArrowRight } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const Home = () => {
  const quickLinks = [
    {
      icon: BookOpen,
      title: "Academic Resources",
      description: "Access notes and past questions",
      path: "/resources",
      color: "text-primary",
    },
    {
      icon: Users,
      title: "Our Executives",
      description: "Meet the LSS leadership team",
      path: "/executives",
      color: "text-secondary",
    },
    {
      icon: GraduationCap,
      title: "Alumni Hall of Fame",
      description: "Celebrating our distinguished alumni",
      path: "/alumni",
      color: "text-accent",
    },
    {
      icon: ShoppingBag,
      title: "LSS Merchandise",
      description: "Get official LSS merch",
      path: "/merch",
      color: "text-primary",
    },
    {
      icon: MessageSquare,
      title: "Feedback",
      description: "Share your thoughts with us",
      path: "/feedback",
      color: "text-secondary",
    },
    {
      icon: Megaphone,
      title: "News & Announcements",
      description: "Stay updated with latest info",
      path: "/news",
      color: "text-accent",
    },
  ];

  const announcements = [
    {
      title: "Examination Timetable Released",
      date: "March 15, 2025",
      excerpt: "The examination timetable for the current semester has been published. Check the academic resources section for details.",
    },
    {
      title: "LSS Week 2025 Announced",
      date: "March 10, 2025",
      excerpt: "Save the date! LSS Week is scheduled for April 2025. More details coming soon.",
    },
    {
      title: "New Study Materials Available",
      date: "March 5, 2025",
      excerpt: "Fresh lecture notes for Constitutional Law and Criminal Law have been uploaded to the resources section.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBanner} 
            alt="LSS Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-hero opacity-90" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary-foreground mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Welcome to the Law Students' Society
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700 delay-150">
            Bowen University's premier academic and community hub for aspiring legal professionals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
            <Button variant="gold" size="lg" asChild>
              <Link to="/resources">
                Explore Resources <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="bg-card/10 border-primary-foreground/20 text-primary-foreground hover:bg-card/20">
              <Link to="/executives">Meet Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Quick Access
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need as an LSS member, just a click away
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link, index) => (
            <Link key={index} to={link.path} className="group">
              <Card className="gradient-card p-6 h-full shadow-elegant hover:shadow-gold transition-smooth border-0">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-muted ${link.color}`}>
                    <link.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-smooth">
                      {link.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {link.description}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-smooth" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Announcements */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
                Latest Announcements
              </h2>
              <p className="text-muted-foreground">Stay informed about LSS updates</p>
            </div>
            <Button variant="ghost" asChild>
              <Link to="/news">
                View All <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {announcements.map((announcement, index) => (
              <Card key={index} className="p-6 gradient-card shadow-elegant hover:shadow-gold transition-smooth border-0">
                <div className="text-xs font-medium text-accent mb-2">{announcement.date}</div>
                <h3 className="font-semibold text-lg mb-3">{announcement.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{announcement.excerpt}</p>
                <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:bg-transparent">
                  Read more →
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="gradient-hero text-primary-foreground p-12 text-center shadow-elegant border-0">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Join the LSS Community
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Have questions, suggestions, or feedback? We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gold" size="lg" asChild>
              <Link to="/feedback">Share Your Feedback</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="bg-card/10 border-primary-foreground/20 hover:bg-card/20">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Home;
