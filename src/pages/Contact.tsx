import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission - replace with actual backend call
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help. Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Cards */}
            <Card className="p-6 border-0 gradient-card shadow-elegant">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Our Location</h3>
                  <p className="text-sm text-muted-foreground">
                    Law Faculty Building<br />
                    Bowen University<br />
                    Iwo, Osun State, Nigeria
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-0 gradient-card shadow-elegant">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-accent/10">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email Us</h3>
                  <a 
                    href="mailto:lss@bowen.edu.ng" 
                    className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                  >
                    lss@bowen.edu.ng
                  </a>
                  <br />
                  <a 
                    href="mailto:info@lssbowen.edu.ng" 
                    className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                  >
                    info@lssbowen.edu.ng
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-0 gradient-card shadow-elegant">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-secondary/10">
                  <Phone className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Call Us</h3>
                  <a 
                    href="tel:+2341234567890" 
                    className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                  >
                    +234 123 456 7890
                  </a>
                  <p className="text-xs text-muted-foreground mt-1">
                    Mon - Fri: 9:00 AM - 5:00 PM
                  </p>
                </div>
              </div>
            </Card>

            {/* Social Media */}
            <Card className="p-6 border-0 gradient-card shadow-elegant">
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/lssbowen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-muted hover:bg-accent hover:text-accent-foreground transition-smooth"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com/lssbowen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-muted hover:bg-accent hover:text-accent-foreground transition-smooth"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/company/lssbowen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-muted hover:bg-accent hover:text-accent-foreground transition-smooth"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 shadow-elegant border-0 gradient-card">
              <h2 className="font-serif text-2xl font-bold mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">
                    Subject <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What is this regarding?"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">
                    Message <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Write your message here..."
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>

            {/* Quick Links */}
            <Card className="mt-6 p-6 border-0 gradient-card shadow-elegant">
              <h3 className="font-semibold mb-3">Looking for something specific?</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <a href="/resources" className="text-primary hover:underline">Academic Resources</a>
                <a href="/executives" className="text-primary hover:underline">Executive Team</a>
                <a href="/merch" className="text-primary hover:underline">Merchandise</a>
                <a href="/feedback" className="text-primary hover:underline">Send Feedback</a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
