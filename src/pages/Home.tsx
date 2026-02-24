import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Scale, BookOpen, Users, GraduationCap, ShoppingBag, MessageSquare, Megaphone, ArrowRight, Award, Gavel, Sparkles, Star, Zap, Trophy, Briefcase, Heart } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const Home = () => {
  const quickLinks = [
    {
      icon: Scale,
      title: "Academic Resources",
      description: "Access lecture notes, past questions, and study materials",
      path: "/resources",
      color: "text-primary",
      bgGradient: "from-blue-500/20 to-cyan-500/20",
      floatDelay: "animation-delay-0",
    },
    {
      icon: Users,
      title: "Our Executives",
      description: "Meet LSS leadership team and committee members",
      path: "/executives",
      color: "text-secondary",
      bgGradient: "from-purple-500/20 to-pink-500/20",
      floatDelay: "animation-delay-200",
    },
    {
      icon: Award,
      title: "Alumni Hall of Fame",
      description: "Celebrating our distinguished legal professionals",
      path: "/alumni",
      color: "text-accent",
      bgGradient: "from-yellow-500/20 to-orange-500/20",
      floatDelay: "animation-delay-400",
    },
    {
      icon: ShoppingBag,
      title: "LSS Merchandise",
      description: "Get official LSS branded items and accessories",
      path: "/merch",
      color: "text-primary",
      bgGradient: "from-green-500/20 to-emerald-500/20",
      floatDelay: "animation-delay-600",
    },
    {
      icon: MessageSquare,
      title: "Feedback Portal",
      description: "Share your thoughts and help us improve",
      path: "/feedback",
      color: "text-secondary",
      bgGradient: "from-indigo-500/20 to-blue-500/20",
      floatDelay: "animation-delay-800",
    },
    {
      icon: Gavel,
      title: "Legal News & Updates",
      description: "Stay informed with latest legal developments",
      path: "/news",
      color: "text-accent",
      bgGradient: "from-red-500/20 to-rose-500/20",
      floatDelay: "animation-delay-1000",
    },
  ];

  const announcements = [
    {
      title: "Examination Timetable Released",
      date: "March 15, 2025",
      excerpt: "The examination timetable for current semester has been published. Check academic resources section for details.",
      icon: "📅",
    },
    {
      title: "LSS Week 2025 Announced",
      date: "March 10, 2025",
      excerpt: "Save the date! LSS Week is scheduled for April 2025. More details coming soon.",
      icon: "🎉",
    },
    {
      title: "New Study Materials Available",
      date: "March 5, 2025",
      excerpt: "Fresh lecture notes for Constitutional Law and Criminal Law have been uploaded to resources section.",
      icon: "📚",
    },
  ];

  const floatingElements = [
    { icon: Scale, position: "top-20 left-4 md:left-10", delay: "animation-delay-0", size: "h-6 w-6 md:h-8 md:w-8" },
    { icon: Star, position: "top-32 right-4 md:right-20", delay: "animation-delay-500", size: "h-4 w-4 md:h-6 md:w-6" },
    { icon: Zap, position: "top-60 left-8 md:left-32", delay: "animation-delay-1000", size: "h-5 w-5 md:h-7 md:w-7" },
    { icon: Trophy, position: "top-40 right-8 md:right-40 hidden sm:block", delay: "animation-delay-1500", size: "h-7 w-7 md:h-9 md:w-9" },
    { icon: Briefcase, position: "top-80 left-4 md:left-20 hidden sm:block", delay: "animation-delay-2000", size: "h-5 w-5 md:h-6 md:w-6" },
    { icon: Heart, position: "top-16 right-4 md:right-32", delay: "animation-delay-2500", size: "h-6 w-6 md:h-8 md:w-8" },
  ];

  const floatingTextElements = [
    { text: "New Era", position: "top-1/3 left-1/4 md:left-1/3", delay: "animation-delay-3000", size: "text-2xl md:text-3xl" },
    { text: "Excellence", position: "top-1/2 right-1/4 md:right-1/3", delay: "animation-delay-3500", size: "text-xl md:text-2xl" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl animate-float animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-float animation-delay-1000" />
        
        {/* Floating law icons */}
        {floatingElements.map((element, index) => {
          const Icon = element.icon;
          return (
            <div
              key={index}
              className={`absolute ${element.position} ${element.delay} animate-float-slow`}
            >
              <div className={`${element.size} text-primary/20 animate-pulse`}>
                <Icon />
              </div>
            </div>
          );
        })}
        
        {/* Floating text elements */}
        {floatingTextElements.map((element, index) => (
          <div
            key={`text-${index}`}
            className={`absolute ${element.position} ${element.delay} animate-float-slow`}
          >
            <div className={`${element.size} font-bold bg-gradient-to-r from-yellow-300/15 to-orange-300/15 bg-clip-text text-transparent animate-pulse`}>
              {element.text}
            </div>
          </div>
        ))}
        
        {/* Sparkle effects */}
        <div className="absolute top-1/4 left-1/4 animate-sparkle">
          <Sparkles className="h-4 w-4 text-yellow-400/40" />
        </div>
        <div className="absolute top-3/4 right-1/4 animate-sparkle animation-delay-1000">
          <Sparkles className="h-6 w-6 text-blue-400/40" />
        </div>
        <div className="absolute top-1/2 left-3/4 animate-sparkle animation-delay-2000">
          <Sparkles className="h-5 w-5 text-purple-400/40" />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBanner} 
            alt="LSS Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-blue-900/90 to-indigo-900/95" />
        </div>
        
        {/* Animated particles overlay */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center pt-20 pb-32">
          {/* Floating main icon */}
          <div className="mb-6 md:mb-8 animate-float-bounce">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-xl opacity-60 animate-pulse" />
              <Scale className="relative h-16 w-16 md:h-20 md:w-20 text-yellow-300 drop-shadow-2xl" />
            </div>
          </div>
          
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Law Students' Society
          </h1>
          <div className="relative mb-6 md:mb-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl text-yellow-300 font-semibold animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
              Bowen University
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-yellow-300 to-transparent animate-pulse" />
          </div>
          
          {/* New Era Badge */}
          <div className="mb-6 md:mb-8 animate-in fade-in slide-in-from-bottom-7 duration-1000 delay-300">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30 rounded-full backdrop-blur-sm">
              <div className="relative">
                <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
                <div className="absolute inset-0 bg-yellow-300/20 blur-md animate-pulse" />
              </div>
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                #NewEra
              </span>
              <div className="relative">
                <Sparkles className="h-5 w-5 text-orange-300 animate-pulse" />
                <div className="absolute inset-0 bg-orange-300/20 blur-md animate-pulse" />
              </div>
            </div>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 md:mb-12 max-w-4xl mx-auto px-2 sm:px-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-400 leading-relaxed">
            Empowering future legal professionals through academic excellence, community service, and professional development
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4 sm:px-0 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600">
            <Button 
              variant="gold" 
              size="lg" 
              asChild 
              className="group relative overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              <Link to="/resources">
                <span className="relative z-10 flex items-center justify-center">
                  Explore Resources 
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              <Link to="/executives">Meet Our Team</Link>
            </Button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="relative py-12 md:py-24 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <div className="inline-flex items-center gap-2 mb-4 md:mb-6">
              <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-yellow-500 animate-pulse" />
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-navy-600 to-blue-600 bg-clip-text text-transparent">
                Quick Access
              </h2>
              <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-yellow-500 animate-pulse" />
            </div>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Everything you need as an LSS member, just a click away
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Link 
                  key={index} 
                  to={link.path} 
                  className={`group ${link.floatDelay}`}
                >
                  <Card className={`relative overflow-hidden h-full p-4 md:p-8 bg-gradient-to-br ${link.bgGradient} border-0 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-500`}>
                    {/* Floating icon background */}
                    <div className="absolute top-2 right-2 md:top-4 md:right-4 opacity-10">
                      <Icon className="h-10 w-10 md:h-16 md:w-16" />
                    </div>
                    
                    <div className="relative z-10">
                      <div className={`inline-flex p-3 md:p-4 rounded-xl md:rounded-2xl bg-white shadow-lg mb-3 md:mb-6 ${link.color} transform group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-6 w-6 md:h-8 md:w-8" />
                      </div>
                      
                      <h3 className="font-bold text-lg md:text-xl mb-2 md:mb-3 text-gray-800 group-hover:text-navy-600 transition-colors duration-300">
                        {link.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 leading-relaxed">
                        {link.description}
                      </p>
                      
                      <div className="flex items-center text-navy-600 font-medium text-sm md:text-base group-hover:text-navy-700 transition-colors duration-300">
                        Explore
                        <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                    
                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Announcements */}
      <section className="relative py-12 md:py-24 bg-gradient-to-br from-navy-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-16 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 md:p-3 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl shadow-lg">
                  <Megaphone className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
                  Latest Announcements
                </h2>
              </div>
              <p className="text-base md:text-xl text-gray-600">Stay informed about LSS updates</p>
            </div>
            <Button 
              variant="ghost" 
              asChild 
              className="text-navy-600 hover:text-navy-700 hover:bg-navy-50 font-medium w-full sm:w-auto"
            >
              <Link to="/news">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {announcements.map((announcement, index) => (
              <Card 
                key={index} 
                className="p-8 bg-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border-0"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{announcement.icon}</div>
                  <div className="text-sm font-medium text-navy-600 bg-navy-50 px-3 py-1 rounded-full">
                    {announcement.date}
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-4 text-gray-800">
                  {announcement.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {announcement.excerpt}
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 h-auto text-navy-600 hover:text-navy-700 font-medium group"
                >
                  Read more 
                  <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-12 md:py-24 bg-gradient-to-br from-navy-600 via-blue-600 to-indigo-600 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-black/20" />
          <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl animate-float" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl animate-float animation-delay-2000" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6 md:mb-8">
              <div className="inline-flex p-3 md:p-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl md:rounded-2xl shadow-2xl animate-float-bounce">
                <Heart className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
            </div>
            
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
              Join LSS Community
            </h2>
            <p className="text-base md:text-xl text-white/90 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
              Have questions, suggestions, or feedback? We'd love to hear from you and make your LSS experience even better.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center px-4 sm:px-0">
              <Button 
                variant="gold" 
                size="lg" 
                asChild 
                className="group relative overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                <Link to="/feedback">
                  <span className="relative z-10">Share Your Feedback</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
