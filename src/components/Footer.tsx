import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import lssLogo from "@/assets/lss-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={lssLogo} alt="LSS Logo" className="h-12 w-12" />
              <div>
                <h3 className="font-serif text-xl font-bold text-primary">LSS Bowen University</h3>
                <p className="text-sm text-muted-foreground">Law Students' Society</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              Empowering future legal minds through academic excellence, community engagement, and professional development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-primary transition-smooth">
                  Academic Resources
                </Link>
              </li>
              <li>
                <Link to="/executives" className="text-muted-foreground hover:text-primary transition-smooth">
                  Our Executives
                </Link>
              </li>
              <li>
                <Link to="/alumni" className="text-muted-foreground hover:text-primary transition-smooth">
                  Alumni Hall of Fame
                </Link>
              </li>
              <li>
                <Link to="/merch" className="text-muted-foreground hover:text-primary transition-smooth">
                  LSS Merchandise
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent" />
                <span>Bowen University, Iwo, Osun State</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0 text-accent" />
                <a href="mailto:lss@bowen.edu.ng" className="hover:text-primary transition-smooth">
                  lss@bowen.edu.ng
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0 text-accent" />
                <a href="tel:+2341234567890" className="hover:text-primary transition-smooth">
                  +234 123 456 7890
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex gap-3 mt-4">
              <a
                href="https://instagram.com/lssbowen"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-smooth"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/lssbowen"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-smooth"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com/company/lssbowen"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-smooth"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} Law Students' Society, Bowen University. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
