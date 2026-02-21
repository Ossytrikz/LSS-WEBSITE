import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, FileText, BookOpen } from "lucide-react";
import { useAdminData } from "@/context/AdminDataContextSupabase";

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const { resources } = useAdminData();

  const levels = ["all", "100L", "200L", "300L", "400L", "500L"];
  const courses = ["all", "LAW 101", "LAW 201", "LAW 202", "LAW 301", "LAW 302", "LAW 401"];

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === "all" || resource.level === selectedLevel;
    const matchesCourse = selectedCourse === "all" || resource.course === selectedCourse;
    
    return matchesSearch && matchesLevel && matchesCourse;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-primary/10">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Academic Resources
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access comprehensive lecture notes, past questions, and study materials for all law courses
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8 shadow-elegant border-0 gradient-card">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by course name or code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Level" />
              </SelectTrigger>
              <SelectContent>
                {levels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level === "all" ? "All Levels" : level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course === "all" ? "All Courses" : course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredResources.length} of {resources.length} resources
          </div>
        </Card>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="p-6 shadow-elegant hover:shadow-gold transition-smooth border-0 gradient-card">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                    {resource.level}
                  </span>
                </div>

                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {resource.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Course:</span>
                    <span className="font-medium">{resource.course}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium">{resource.type}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Uploaded:</span>
                    <span className="font-medium">
                      {new Date(resource.upload_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  variant="default"
                  onClick={() => window.open(resource.link, '_blank')}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center border-0 gradient-card shadow-elegant">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">No resources found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Resources;
