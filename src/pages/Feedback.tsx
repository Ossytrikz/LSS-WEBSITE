import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Feedback = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission - replace with actual backend call
    setTimeout(() => {
      toast({
        title: "Feedback Submitted!",
        description: "Thank you for your feedback. We'll review it carefully.",
      });
      setFormData({ name: "", email: "", message: "" });
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
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-primary/10">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Share Your Feedback
          </h1>
          <p className="text-lg text-muted-foreground">
            Your voice matters! Help us improve LSS by sharing your thoughts, suggestions, or concerns
          </p>
        </div>

        {/* Feedback Form */}
        <Card className="p-8 shadow-elegant border-0 gradient-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name (Optional)</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">
                Your Message <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Share your thoughts, suggestions, or concerns..."
                rows={8}
                required
                value={formData.message}
                onChange={handleChange}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                All feedback is anonymous unless you choose to provide your contact information
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={isSubmitting || !formData.message.trim()}
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Feedback
                </>
              )}
            </Button>
          </form>
        </Card>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="p-6 border-0 gradient-card shadow-elegant">
            <h3 className="font-serif text-lg font-bold mb-3">We Value Your Input</h3>
            <p className="text-sm text-muted-foreground">
              Every piece of feedback helps us create a better experience for all LSS members. We review all submissions carefully.
            </p>
          </Card>

          <Card className="p-6 border-0 gradient-card shadow-elegant">
            <h3 className="font-serif text-lg font-bold mb-3">What to Share</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Suggestions for improvements</li>
              <li>• Issues you've encountered</li>
              <li>• Ideas for new features or events</li>
              <li>• General comments about LSS</li>
            </ul>
          </Card>
        </div>

        {/* Alternative Contact */}
        <Card className="mt-8 p-6 text-center border-0 gradient-card shadow-elegant">
          <p className="text-sm text-muted-foreground mb-2">
            Need immediate assistance or have a specific inquiry?
          </p>
          <Button variant="link" className="text-primary" asChild>
            <a href="/contact">Visit our Contact page</a>
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Feedback;
