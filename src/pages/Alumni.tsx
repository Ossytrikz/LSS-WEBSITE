import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight, MapPin, Briefcase } from "lucide-react";
import { useAdminData } from "@/context/AdminDataContextSupabase";

const Alumni = () => {
  const { alumni, loading } = useAdminData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const featuredAlumni = alumni.slice(0, 3);
  const otherAlumni = alumni.slice(3);

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <div className="p-2 md:p-3 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl shadow-lg">
              <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Alumni Hall of Fame
            </h1>
          </div>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto px-2">
            Celebrating our distinguished graduates and their remarkable achievements in the legal profession
          </p>
        </div>

        {/* Featured Alumni */}
        {featuredAlumni.length > 0 && (
          <div className="mb-8 md:mb-12">
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6 md:mb-8 text-center">
              Featured Alumni
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {featuredAlumni.map((person) => (
                <Link key={person.id} to={`/alumni/${person.id}`}>
                  <Card className="overflow-hidden shadow-elegant hover:shadow-gold transition-smooth border-0 group h-full">
                    <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
                      <img
                        src={person.image}
                        alt={person.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 md:top-4 md:left-4">
                        <Badge className="bg-primary/10 text-primary text-xs md:text-sm">
                          Class of {person.graduation_year}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-4 md:p-6">
                      <h3 className="font-serif text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {person.name}
                      </h3>
                      
                      <div className="space-y-1 md:space-y-2 mb-3 md:mb-4">
                        {person.current_position && (
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                            <span className="text-xs md:text-sm text-muted-foreground line-clamp-1">{person.current_position}</span>
                          </div>
                        )}
                        {person.specialization && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                            <span className="text-xs md:text-sm text-muted-foreground line-clamp-1">{person.specialization}</span>
                          </div>
                        )}
                      </div>

                      <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-3 md:line-clamp-4">
                        {person.achievements}
                      </p>

                      <Button 
                        variant="ghost" 
                        className="p-0 h-auto text-primary hover:bg-transparent group text-sm md:text-base"
                      >
                        View Full Profile 
                        <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Alumni Grid */}
        {otherAlumni.length > 0 && (
          <div>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6 md:mb-8 text-center">
              All Alumni
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
              {otherAlumni.map((person) => (
                <Link key={person.id} to={`/alumni/${person.id}`}>
                  <Card className="overflow-hidden shadow-elegant hover:shadow-gold transition-smooth border-0 group h-full">
                    <div className="relative h-40 sm:h-48 md:h-64 overflow-hidden">
                      <img
                        src={person.image}
                        alt={person.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute top-2 left-2 md:top-3 md:left-3">
                        <Badge className="bg-primary/10 text-primary text-xs">
                          {person.graduation_year}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-3 md:p-4">
                      <h3 className="font-serif text-sm md:text-lg font-bold text-foreground mb-1 md:mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {person.name}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2 line-clamp-1 md:line-clamp-2">
                        {person.current_position}
                      </p>
                      <p className="text-xs text-primary font-medium line-clamp-1">
                        {person.specialization}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {alumni.length === 0 && (
          <div className="text-center py-8 md:py-12">
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4">No Alumni Profiles</h3>
            <p className="text-muted-foreground px-4">
              Check back later as we add more distinguished graduates to our hall of fame.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <Card className="mt-8 md:mt-16 p-6 md:p-8 lg:p-12 text-center gradient-hero text-primary-foreground shadow-elegant border-0">
          <h2 className="font-serif text-xl md:text-2xl lg:text-3xl font-bold mb-4">
            Join Our Alumni Network
          </h2>
          <p className="text-base md:text-lg mb-6 max-w-2xl mx-auto opacity-90 px-2">
            Are you a graduate of Bowen University Law School? Share your achievements and inspire current students.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4 px-4 sm:px-0">
            <Button variant="gold" size="lg" asChild className="w-full sm:w-auto">
              <Link to="/feedback">
                Submit Your Profile
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="bg-card/10 border-primary-foreground/20 hover:bg-card/20 w-full sm:w-auto">
              <Link to="/contact">
                Contact Alumni Committee
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Alumni;
