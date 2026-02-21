import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Mail, Linkedin, Instagram } from "lucide-react";
import { useAdminData } from "@/context/AdminDataContextSupabase";
import { ExecutiveModal } from "@/components/ExecutiveModal";
import { LoadingSpinner, CardSkeleton } from "@/components/LoadingSpinner";

const Executives = () => {
  const { executives, loading, error } = useAdminData();
  const [selectedExecutive, setSelectedExecutive] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExecutiveClick = (executive) => {
    setSelectedExecutive(executive);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExecutive(null);
  };

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
            Our Executive Team
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            Meet the dedicated leaders working to make LSS a better community for all law students
          </p>
          <div className="mt-3 md:mt-4 text-sm text-accent font-medium">
            Academic Session 2024/2025
          </div>
        </div>

        {/* Executives Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {loading ? (
            // Show skeleton loaders while loading
            Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : error ? (
            // Show error state
            <div className="col-span-full text-center py-12">
              <p className="text-red-500 mb-4">Failed to load executives. Please try again.</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Retry
              </button>
            </div>
          ) : executives.length === 0 ? (
            // Show empty state
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No executives found.</p>
            </div>
          ) : (
            // Show actual executives
            executives.map((executive) => (
            <Card 
              key={executive.id} 
              className="overflow-hidden shadow-elegant hover:shadow-gold transition-smooth border-0 gradient-card cursor-pointer"
              onClick={() => handleExecutiveClick(executive)}
            >
              {/* Profile Image */}
              <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden bg-muted">
                <img
                  src={executive.image}
                  alt={executive.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  style={{ objectPosition: 'center 20%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4">
                  <h3 className="font-serif text-lg md:text-xl font-bold text-white mb-1">
                    {executive.name}
                  </h3>
                  <p className="text-accent font-semibold text-xs md:text-sm">
                    {executive.position}
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 md:p-6">
                <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-2 md:line-clamp-3">
                  {executive.bio || "Profile information will be updated soon."}
                </p>
                <p className="text-xs text-primary font-medium mb-3 md:mb-4">
                  Tap to view full profile
                </p>

                {/* Contact Links */}
                <div className="flex gap-2">
                  {executive.email && (
                    <a
                      href={`mailto:${executive.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth"
                      title="Email"
                    >
                      <Mail className="h-3 w-3 md:h-4 md:w-4" />
                    </a>
                  )}
                  {executive.linkedin && (
                    <a
                      href={executive.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth"
                      title="LinkedIn"
                    >
                      <Linkedin className="h-3 w-3 md:h-4 md:w-4" />
                    </a>
                  )}
                  {executive.instagram && (
                    <a
                      href={executive.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-smooth"
                      title="Instagram"
                    >
                      <Instagram className="h-3 w-3 md:h-4 md:w-4" />
                    </a>
                  )}
                </div>
              </div>
            </Card>
            ))
          )}
        </div>

        {/* Join CTA */}
        <Card className="mt-8 md:mt-16 p-6 md:p-8 lg:p-12 text-center gradient-hero text-primary-foreground shadow-elegant border-0">
          <h2 className="font-serif text-xl md:text-2xl lg:text-3xl font-bold mb-4">
            Interested in Joining the Executive Team?
          </h2>
          <p className="text-base md:text-lg mb-6 max-w-2xl mx-auto opacity-90 px-2">
            Elections are held annually. Stay tuned for announcements about the next election cycle.
          </p>
          <div className="text-xs md:text-sm opacity-75">
            For more information, contact the current executives or check our announcements page.
          </div>
        </Card>
      </div>
      
      {/* Executive Modal */}
      <ExecutiveModal
        executive={selectedExecutive}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      
      </div>
  );
};

export default Executives;
