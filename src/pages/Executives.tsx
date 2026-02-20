import { Card } from "@/components/ui/card";
import { Mail, Linkedin, Instagram } from "lucide-react";
import { useAdminData } from "@/context/AdminDataContextSupabase";

const Executives = () => {
  const { executives } = useAdminData();

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Executive Team
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the dedicated leaders working to make LSS a better community for all law students
          </p>
          <div className="mt-4 text-sm text-accent font-medium">
            Academic Session 2024/2025
          </div>
        </div>

        {/* Executives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {executives.map((executive) => (
            <Card key={executive.id} className="overflow-hidden shadow-elegant hover:shadow-gold transition-smooth border-0 gradient-card">
              {/* Profile Image */}
              <div className="relative h-64 overflow-hidden bg-muted">
                <img
                  src={executive.image}
                  alt={executive.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-serif text-xl font-bold text-white mb-1">
                    {executive.name}
                  </h3>
                  <p className="text-accent font-semibold text-sm">
                    {executive.position}
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {executive.bio || "Profile information will be updated soon."}
                </p>

                {/* Contact Links */}
                <div className="flex gap-2">
                  {executive.email && (
                    <a
                      href={`mailto:${executive.email}`}
                      className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth"
                      title="Email"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  )}
                  {executive.linkedin && (
                    <a
                      href={executive.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth"
                      title="LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {executive.instagram && (
                    <a
                      href={executive.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth"
                      title="Instagram"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Join CTA */}
        <Card className="mt-16 p-8 md:p-12 text-center gradient-hero text-primary-foreground shadow-elegant border-0">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
            Interested in Joining the Executive Team?
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
            Elections are held annually. Stay tuned for announcements about the next election cycle.
          </p>
          <div className="text-sm opacity-75">
            For more information, contact the current executives or check our announcements page.
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Executives;
