import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, FileText, Download } from "lucide-react";
import { uploadFile } from "@/lib/supabase";

interface PDFUploadProps {
  value?: string;
  onChange: (url: string) => void;
  placeholder?: string;
  folder?: string;
}

export function PDFUpload({ value, onChange, placeholder = "Upload PDF file", folder = "resources" }: PDFUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      alert('Please select a PDF file');
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert('PDF size should be less than 10MB');
      return;
    }

    try {
      setIsUploading(true);
      const publicUrl = await uploadFile(file, folder);
      onChange(publicUrl);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload PDF. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleRemove = () => {
    onChange('');
  };

  const getFileName = (url: string) => {
    return url.split('/').pop() || 'document.pdf';
  };

  return (
    <div className="space-y-2">
      <Label>Resource File</Label>
      {value ? (
        <div className="relative">
          <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/50">
            <FileText className="h-8 w-8 text-red-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{getFileName(value)}</p>
              <p className="text-xs text-muted-foreground">PDF Document</p>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => window.open(value, '_blank')}
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-sm text-gray-600 mb-2">
            Drag and drop a PDF here, or click to select
          </p>
          <p className="text-xs text-gray-500 mb-4">
            PDF files only, up to 10MB
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Choose PDF'}
          </Button>
        </div>
      )}
      <Input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleFileInput}
        className="hidden"
      />
      {!value && (
        <div className="mt-2">
          <Label htmlFor="manual-url">Or enter PDF URL manually:</Label>
          <Input
            id="manual-url"
            type="url"
            placeholder={placeholder}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
