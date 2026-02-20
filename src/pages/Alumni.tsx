import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Briefcase, Calendar } from "lucide-react";
import { useAdminData } from "@/context/AdminDataContextSupabase";

const Alumni = () => {
  const { alumni } = useAdminData();

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-accent/10">
              <Award className="h-8 w-8 text-accent" />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Alumni Hall of Fame
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Celebrating the remarkable achievements of our distinguished alumni who continue to make their mark in the legal profession
          </p>
        </div>

        {/* Alumni Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {alumni.map((alum) => (
            <Card key={alum.id} className="overflow-hidden shadow-elegant hover:shadow-gold transition-smooth border-0 gradient-card">
              {/* Profile Image */}
              <div className="relative h-72 overflow-hidden bg-muted">
                <img
                  src={alum.image}
                  alt={alum.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                
                {/* Year Badge */}
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-gold">
                  Class of {alum.graduation_year}
                </div>

                {/* Name Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-serif text-xl font-bold text-white mb-1">
                    {alum.name}
                  </h3>
                  <p className="text-accent font-medium text-sm">
                    {alum.specialization}
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-2">
                  <Briefcase className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {alum.current_position}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Award className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {alum.achievements}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Nomination Section */}
        <Card className="p-8 md:p-12 text-center gradient-hero text-primary-foreground shadow-elegant border-0">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
            Know an Outstanding Alumnus?
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
            Help us celebrate more success stories from our alumni community. Nominate a distinguished LSS alumnus for our Hall of Fame.
          </p>
          <Button variant="gold" size="lg">
            Nominate an Alumnus
          </Button>
        </Card>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="p-6 text-center border-0 gradient-card shadow-elegant">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <p className="text-muted-foreground">Alumni Worldwide</p>
          </Card>
          <Card className="p-6 text-center border-0 gradient-card shadow-elegant">
            <div className="text-3xl font-bold text-accent mb-2">50+</div>
            <p className="text-muted-foreground">Law Firms Represented</p>
          </Card>
          <Card className="p-6 text-center border-0 gradient-card shadow-elegant">
            <div className="text-3xl font-bold text-secondary mb-2">10+</div>
            <p className="text-muted-foreground">Years of Excellence</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Alumni;
