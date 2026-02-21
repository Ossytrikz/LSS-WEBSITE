import React from "react";
import { X, Mail, Linkedin, Instagram, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Executive } from "@/context/AdminDataContextSupabase";

interface ExecutiveModalProps {
  executive: Executive | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ExecutiveModal({ executive, isOpen, onClose }: ExecutiveModalProps) {
  if (!isOpen || !executive) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Profile Picture */}
          <div className="w-full md:w-1/2 relative">
            <img
              src={executive.image}
              alt={executive.name}
              className="w-full h-full min-h-[400px] object-cover"
              style={{ objectPosition: 'center 20%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30"
              onClick={onClose}
            >
              <X className="h-4 w-4 text-white" />
            </Button>
            
            {/* Name overlay on image */}
            <div className="absolute bottom-4 left-6 right-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                {executive.name}
              </h2>
              <p className="text-lg text-white/90">
                {executive.position}
              </p>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="w-full md:w-1/2 p-6 space-y-6">
            {/* Bio */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Biography</h3>
              <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                {executive.bio || 'No biography available.'}
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Contact Information</h3>
              <div className="space-y-3">
                {executive.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-primary" />
                    <a
                      href={`mailto:${executive.email}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {executive.email}
                    </a>
                  </div>
                )}
                
                {executive.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-primary" />
                    <a
                      href={`tel:${executive.phone}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {executive.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Connect</h3>
              <div className="flex gap-3">
                {executive.linkedin && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(executive.linkedin, '_blank')}
                    className="gap-2"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </Button>
                )}
                
                {executive.instagram && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(executive.instagram, '_blank')}
                    className="gap-2"
                  >
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </Button>
                )}
              </div>
            </div>

            {/* Duration */}
            {executive.duration && (
              <div>
                <h3 className="font-semibold text-lg mb-3">Term Duration</h3>
                <p className="text-gray-700">{executive.duration}</p>
              </div>
            )}

            {/* Close Button */}
            <div className="pt-4 border-t">
              <Button onClick={onClose} className="w-full">
                Close Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
