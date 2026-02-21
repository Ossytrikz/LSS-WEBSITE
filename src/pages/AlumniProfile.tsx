import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, MessageSquare, MapPin, Briefcase, Award, Calendar, Mail, Linkedin, Instagram } from "lucide-react";
import { useAdminData } from "@/context/AdminDataContextSupabase";
import { useState, useEffect } from "react";

const AlumniProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { alumni } = useAdminData();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (id && alumni.length > 0) {
      const foundPerson = alumni.find(person => person.id === parseInt(id));
      setPerson(foundPerson);
      setLoading(false);
      setShareUrl(window.location.href);
    }
  }, [id, alumni]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${person?.name} - LSS Alumni`,
          text: `Check out the achievements of ${person?.name}, ${person?.graduation_year} graduate from Bowen University Law School.`,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
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

  if (!person) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="p-6 md:p-8 text-center max-w-md">
          <h1 className="text-xl md:text-2xl font-bold text-foreground mb-4">Alumni Profile Not Found</h1>
          <p className="text-muted-foreground mb-6 text-sm md:text-base">
            The alumni profile you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild className="w-full sm:w-auto">
            <Link to="/alumni">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Alumni
            </Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <div className="mb-6 md:mb-8">
          <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground -ml-2 md:ml-0">
            <Link to="/alumni">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Alumni
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Profile Image and Basic Info */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden shadow-elegant border-0">
              <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="p-4 md:p-6">
                <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {person.name}
                </h1>
                <div className="flex items-center gap-2 mb-3 md:mb-4">
                  <Badge className="bg-primary/10 text-primary text-xs md:text-sm">
                    Class of {person.graduation_year}
                  </Badge>
                </div>
                <div className="space-y-2 md:space-y-3">
                  {person.current_position && (
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                      <span className="text-xs md:text-sm text-muted-foreground line-clamp-2">{person.current_position}</span>
                    </div>
                  )}
                  {person.specialization && (
                    <div className="flex items-center gap-2">
                      <Award className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                      <span className="text-xs md:text-sm text-muted-foreground">Specialization: {person.specialization}</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Achievements and Details */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Achievements */}
            <Card className="p-4 md:p-6 shadow-elegant border-0">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <Award className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground">Achievements</h2>
              </div>
              <div className="prose prose-sm md:prose-lg max-w-none">
                <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                  {person.achievements}
                </div>
              </div>
            </Card>

            {/* Contact Information */}
            <Card className="p-4 md:p-6 shadow-elegant border-0">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <Mail className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground">Contact Information</h2>
              </div>
              <div className="space-y-3 md:space-y-4">
                <div className="text-center">
                  <p className="text-xs md:text-sm text-muted-foreground mb-2">Connect with {person.name}</p>
                  <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                    {person.linkedin && (
                      <Button variant="outline" size="sm" asChild className="text-xs md:text-sm">
                        <Link to={person.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                          LinkedIn
                        </Link>
                      </Button>
                    )}
                    {person.instagram && (
                      <Button variant="outline" size="sm" asChild className="text-xs md:text-sm">
                        <Link to={person.instagram} target="_blank" rel="noopener noreferrer">
                          <Instagram className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                          Instagram
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Share and Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" size="lg" onClick={handleShare} className="w-full sm:w-auto">
                <Share2 className="mr-2 h-4 w-4" />
                Share Profile
              </Button>
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                <Link to="/feedback">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Related Alumni */}
        <div className="mt-8 md:mt-16">
          <h2 className="font-serif text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-6 md:mb-8">
            Fellow Alumni
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {alumni
              .filter(relatedPerson => relatedPerson.id !== person.id)
              .slice(0, 6)
              .map(relatedPerson => (
                <Link key={relatedPerson.id} to={`/alumni/${relatedPerson.id}`}>
                  <Card className="overflow-hidden shadow-elegant hover:shadow-gold transition-smooth border-0 h-full group">
                    <div className="relative h-36 sm:h-40 md:h-48 overflow-hidden">
                      <img
                        src={relatedPerson.image}
                        alt={relatedPerson.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute top-2 left-2 md:top-3 md:left-3">
                        <Badge className="bg-primary/10 text-primary text-xs">
                          {relatedPerson.graduation_year}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-3 md:p-4">
                      <h3 className="font-serif text-xs md:text-sm font-bold text-foreground mb-1 md:mb-2 line-clamp-2">
                        {relatedPerson.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-1 md:mb-2 line-clamp-1 md:line-clamp-2">
                        {relatedPerson.current_position}
                      </p>
                      <p className="text-xs text-primary font-medium line-clamp-1">
                        {relatedPerson.specialization}
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

export default AlumniProfile;
