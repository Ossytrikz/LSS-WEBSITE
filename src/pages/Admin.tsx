import { FormEvent, useMemo, useState } from "react";
import { ShieldCheck, LogOut, Plus, Edit, Trash } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { ImageUpload } from "@/components/ImageUpload";
import { PDFUpload } from "@/components/PDFUpload";
import {
  useAdminData,
  Resource,
  Executive,
  Alumni as AlumniRecord,
  MerchItem,
  NewsItem,
} from "@/context/AdminDataContextSupabase";

const ADMIN_CREDENTIALS = {
  email: "admin@lssbowen.com",
  password: "Admin123!",
};

type ResourceFormState = Omit<Resource, "id"> & { id: number | null };
type ExecutiveFormState = Omit<Executive, "id"> & { id: number | null };
type AlumniFormState = Omit<AlumniRecord, "id"> & { id: number | null };
type MerchFormState = Omit<MerchItem, "id" | "sizes"> & { id: number | null; sizes: string };
type NewsFormState = Omit<NewsItem, "id"> & { id: number | null };

const createResourceFormState = (): ResourceFormState => ({
  id: null,
  title: "",
  course: "",
  level: "",
  type: "PDF",
  link: "",
  upload_date: "",
});

const createExecutiveFormState = (): ExecutiveFormState => ({
  id: null,
  name: "",
  position: "",
  bio: "",
  email: "",
  phone: "",
  image: "",
  linkedin: "",
  instagram: "",
  duration: "",
});

const createAlumniFormState = (): AlumniFormState => ({
  id: null,
  name: "",
  graduation_year: "",
  current_position: "",
  achievements: "",
  specialization: "",
  image: "",
});

const createMerchFormState = (): MerchFormState => ({
  id: null,
  name: "",
  price: "",
  image: "",
  description: "",
  sizes: "",
  inStock: true,
});

const createNewsFormState = (): NewsFormState => ({
  id: null,
  title: "",
  summary: "",
  date: "",
  category: "",
  image: "",
  content: "",
});

const Admin = () => {
  const { toast } = useToast();
  const {
    resources,
    addResource,
    updateResource,
    deleteResource,
    executives,
    addExecutive,
    updateExecutive,
    deleteExecutive,
    alumni,
    addAlumni,
    updateAlumni,
    deleteAlumni,
    merchItems,
    addMerchItem,
    updateMerchItem,
    deleteMerchItem,
    newsItems,
    addNewsItem,
    updateNewsItem,
    deleteNewsItem,
  } = useAdminData();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const [resourceForm, setResourceForm] = useState<ResourceFormState>(() => createResourceFormState());
  const [executiveForm, setExecutiveForm] = useState<ExecutiveFormState>(() => createExecutiveFormState());
  const [alumniForm, setAlumniForm] = useState<AlumniFormState>(() => createAlumniFormState());
  const [merchForm, setMerchForm] = useState<MerchFormState>(() => createMerchFormState());
  const [newsForm, setNewsForm] = useState<NewsFormState>(() => createNewsFormState());

  const totals = useMemo(
    () => ({
      resources: resources.length,
      executives: executives.length,
      alumni: alumni.length,
      merch: merchItems.length,
      news: newsItems.length,
    }),
    [resources.length, executives.length, alumni.length, merchItems.length, newsItems.length],
  );

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = credentials.email.trim().toLowerCase();
    const password = credentials.password.trim();

    if (!email || !password) {
      toast({
        title: "Missing details",
        description: "Please enter your email and password.",
        variant: "destructive",
      });
      return;
    }

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      toast({
        title: "Welcome back",
        description: "You are now logged in to the admin portal.",
      });
    } else {
      toast({
        title: "Invalid credentials",
        description: "The email or password you entered is incorrect.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCredentials({ email: "", password: "" });
    toast({ title: "Signed out", description: "You have been logged out of the admin portal." });
  };

  const resetResourceForm = () => setResourceForm(createResourceFormState());
  const handleResourceSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      title: resourceForm.title.trim(),
      course: resourceForm.course.trim(),
      level: resourceForm.level.trim(),
      type: resourceForm.type.trim(),
      link: resourceForm.link.trim(),
      upload_date: resourceForm.upload_date,
    };

    if (!payload.title || !payload.course || !payload.level || !payload.type || !payload.upload_date) {
      toast({
        title: "Incomplete resource",
        description: "Please fill in all required resource fields.",
        variant: "destructive",
      });
      return;
    }

    if (resourceForm.id !== null) {
      updateResource({ id: resourceForm.id, ...payload });
      toast({ title: "Resource updated", description: `${payload.title} has been updated.` });
    } else {
      addResource(payload);
      toast({ title: "Resource added", description: `${payload.title} is now available.` });
    }

    resetResourceForm();
  };

  const handleEditResource = (resource: Resource) => {
    setResourceForm({
      id: resource.id,
      title: resource.title,
      course: resource.course,
      level: resource.level,
      type: resource.type,
      link: resource.link,
      uploadDate: resource.uploadDate,
    });
  };

  const handleDeleteResource = (id: number) => {
    deleteResource(id);
    if (resourceForm.id === id) {
      resetResourceForm();
    }
    toast({ title: "Resource removed", description: "The selected resource has been deleted." });
  };

  const resetExecutiveForm = () => setExecutiveForm(createExecutiveFormState());
  const handleExecutiveSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      name: executiveForm.name.trim(),
      position: executiveForm.position.trim(),
      bio: executiveForm.bio.trim(),
      email: executiveForm.email.trim(),
      phone: executiveForm.phone.trim(),
      image: executiveForm.image.trim(),
      linkedin: executiveForm.linkedin.trim(),
      instagram: executiveForm.instagram.trim(),
      duration: executiveForm.duration.trim(),
    };

    if (!payload.name || !payload.position || !payload.email || !payload.image) {
      toast({
        title: "Incomplete executive",
        description: "Name, position, email, and image URL are required.",
        variant: "destructive",
      });
      return;
    }

    if (executiveForm.id !== null) {
      updateExecutive({ id: executiveForm.id, ...payload });
      toast({ title: "Executive updated", description: `${payload.name} has been updated.` });
    } else {
      addExecutive(payload);
      toast({ title: "Executive added", description: `${payload.name} has been added to the team.` });
    }

    resetExecutiveForm();
  };

  const handleEditExecutive = (executive: Executive) =>
    setExecutiveForm({
      id: executive.id,
      name: executive.name,
      position: executive.position,
      bio: executive.bio || "",
      email: executive.email,
      phone: executive.phone || "",
      image: executive.image,
      linkedin: executive.linkedin || "",
      instagram: executive.instagram || "",
      duration: executive.duration || "",
    });

  const handleDeleteExecutive = (id: number) => {
    deleteExecutive(id);
    if (executiveForm.id === id) {
      resetExecutiveForm();
    }
    toast({ title: "Executive removed", description: "The selected profile has been deleted." });
  };

  const resetAlumniForm = () => setAlumniForm(createAlumniFormState());
  const handleAlumniSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      name: alumniForm.name.trim(),
      graduation_year: alumniForm.graduation_year.trim(),
      current_position: alumniForm.current_position.trim(),
      achievements: alumniForm.achievements.trim(),
      specialization: alumniForm.specialization.trim(),
      image: alumniForm.image.trim(),
    };

    if (!payload.name || !payload.graduation_year || !payload.current_position || !payload.image) {
      toast({
        title: "Incomplete alumni record",
        description: "Please provide a name, graduation year, current position, and image URL.",
        variant: "destructive",
      });
      return;
    }

    if (alumniForm.id !== null) {
      updateAlumni({ id: alumniForm.id, ...payload });
      toast({ title: "Alumni updated", description: `${payload.name}'s record has been updated.` });
    } else {
      addAlumni(payload);
      toast({ title: "Alumni added", description: `${payload.name} has been added to alumni records.` });
    }

    resetAlumniForm();
  };

  const handleEditAlumni = (record: AlumniRecord) =>
    setAlumniForm({
      id: record.id,
      name: record.name,
      graduation_year: record.graduation_year,
      current_position: record.current_position,
      achievements: record.achievements,
      specialization: record.specialization,
      image: record.image,
    });

  const handleDeleteAlumni = (id: number) => {
    deleteAlumni(id);
    if (alumniForm.id === id) {
      resetAlumniForm();
    }
    toast({ title: "Alumni removed", description: "The alumni record has been deleted." });
  };

  const resetNewsForm = () => setNewsForm(createNewsFormState());
  const handleNewsSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      title: newsForm.title.trim(),
      summary: newsForm.summary.trim(),
      content: newsForm.content.trim(),
      date: newsForm.date,
      category: newsForm.category.trim(),
      image: newsForm.image.trim(),
    };

    if (!payload.title || !payload.summary || !payload.date || !payload.category || !payload.image) {
      toast({
        title: "Incomplete news post",
        description: "Please enter a title, category, summary, image URL, and published date.",
        variant: "destructive",
      });
      return;
    }

    if (newsForm.id !== null) {
      updateNewsItem({ id: newsForm.id, ...payload });
      toast({ title: "News updated", description: `${payload.title} has been updated.` });
    } else {
      addNewsItem(payload);
      toast({ title: "News published", description: `${payload.title} has been added to the news feed.` });
    }

    resetNewsForm();
  };

  const handleEditNews = (item: NewsItem) =>
    setNewsForm({
      id: item.id,
      title: item.title,
      summary: item.summary,
      content: item.content,
      date: item.date,
      category: item.category,
      image: item.image,
    });

  const handleDeleteNews = (id: number) => {
    deleteNewsItem(id);
    if (newsForm.id === id) {
      resetNewsForm();
    }
    toast({ title: "News removed", description: "The news post has been deleted." });
  };

  const resetMerchForm = () => setMerchForm(createMerchFormState());
  const handleMerchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const sizes = merchForm.sizes
      .split(",")
      .map((size) => size.trim())
      .filter(Boolean);

    const payload = {
      name: merchForm.name.trim(),
      price: merchForm.price.trim(),
      image: merchForm.image.trim(),
      description: merchForm.description.trim(),
      sizes,
      inStock: merchForm.inStock,
    };

    if (!payload.name || !payload.price || !payload.image) {
      toast({
        title: "Incomplete merch item",
        description: "Please provide name, price, and image URL.",
        variant: "destructive",
      });
      return;
    }

    if (merchForm.id !== null) {
      updateMerchItem({ id: merchForm.id, ...payload });
      toast({ title: "Merch updated", description: `${payload.name} has been updated.` });
    } else {
      addMerchItem(payload);
      toast({ title: "Merch added", description: `${payload.name} has been added to the catalogue.` });
    }

    resetMerchForm();
  };

  const handleEditMerch = (item: MerchItem) =>
    setMerchForm({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description,
      sizes: item.sizes.join(", "),
      inStock: item.inStock,
    });

  const handleDeleteMerch = (id: number) => {
    deleteMerchItem(id);
    if (merchForm.id === id) {
      resetMerchForm();
    }
    toast({ title: "Merch removed", description: "The merch item has been deleted." });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="shadow-elegant border-0">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-serif text-3xl">Admin Portal</CardTitle>
                <CardDescription>
                  Sign in with your administrator credentials to manage website content.
                  <br />
                  <span className="font-medium text-muted-foreground">Default credentials:</span> {ADMIN_CREDENTIALS.email} /
                  {" "}
                  {ADMIN_CREDENTIALS.password}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleLogin}>
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Email address</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      value={credentials.email}
                      onChange={(event) => setCredentials((prev) => ({ ...prev, email: event.target.value }))}
                      placeholder="admin@lssbowen.com"
                      autoComplete="username"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      value={credentials.password}
                      onChange={(event) => setCredentials((prev) => ({ ...prev, password: event.target.value }))}
                      placeholder="Enter password"
                      autoComplete="current-password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Access dashboard
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4 space-y-8">
        <Card className="border-0 shadow-gold">
          <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle className="font-serif text-3xl">Website Administration</CardTitle>
              <CardDescription>
                Manage academic resources, executives, alumni, merch catalogue, and news updates from a single
                control centre. You are managing {totals.resources} resources, {totals.executives} executives,
                {totals.alumni} alumni records, {totals.merch} merch items, and {totals.news} news posts.
              </CardDescription>
            </div>
            <Button variant="outline" onClick={handleLogout} className="w-full gap-2 lg:w-auto">
              <LogOut className="h-4 w-4" /> Sign out
            </Button>
          </CardHeader>
        </Card>

        <Tabs defaultValue="resources" className="space-y-8">
          <TabsList className="grid w-full grid-cols-1 gap-2 bg-card p-1 text-sm md:grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="resources">Academic Resources</TabsTrigger>
            <TabsTrigger value="executives">Executives</TabsTrigger>
            <TabsTrigger value="alumni">Alumni</TabsTrigger>
            <TabsTrigger value="merch">Merch</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
          </TabsList>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_1.8fr]">
              <Card className="border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Plus className="h-5 w-5 text-primary" /> {resourceForm.id ? "Update Resource" : "Add Resource"}
                  </CardTitle>
                  <CardDescription>
                    Capture lecture notes, past questions, and other academic materials accessible to students.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handleResourceSubmit}>
                    <div className="space-y-2">
                      <Label htmlFor="resource-title">Title</Label>
                      <Input
                        id="resource-title"
                        value={resourceForm.title}
                        onChange={(event) => setResourceForm((prev) => ({ ...prev, title: event.target.value }))}
                        placeholder="e.g. Constitutional Law - Lecture Notes"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="resource-course">Course code</Label>
                        <Input
                          id="resource-course"
                          value={resourceForm.course}
                          onChange={(event) => setResourceForm((prev) => ({ ...prev, course: event.target.value }))}
                          placeholder="LAW 201"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="resource-level">Level</Label>
                        <Input
                          id="resource-level"
                          value={resourceForm.level}
                          onChange={(event) => setResourceForm((prev) => ({ ...prev, level: event.target.value }))}
                          placeholder="200L"
                          list="resource-level-options"
                          required
                        />
                        <datalist id="resource-level-options">
                          {[...new Set(resources.map((item) => item.level))]
                            .concat(["100L", "200L", "300L", "400L", "500L"])
                            .filter((value, index, array) => array.indexOf(value) === index)
                            .map((level) => (
                              <option value={level} key={level} />
                            ))}
                        </datalist>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="resource-type">Format</Label>
                        <Input
                          id="resource-type"
                          value={resourceForm.type}
                          onChange={(event) => setResourceForm((prev) => ({ ...prev, type: event.target.value }))}
                          placeholder="PDF"
                          list="resource-type-options"
                          required
                        />
                        <datalist id="resource-type-options">
                          {[...new Set(resources.map((item) => item.type))]
                            .concat(["PDF", "DOC", "Presentation", "Link"])
                            .filter((value, index, array) => array.indexOf(value) === index)
                            .map((type) => (
                              <option value={type} key={type} />
                            ))}
                        </datalist>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="resource-date">Upload date</Label>
                        <Input
                          id="resource-date"
                          type="date"
                          value={resourceForm.upload_date}
                          onChange={(event) => setResourceForm((prev) => ({ ...prev, upload_date: event.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <PDFUpload
                        value={resourceForm.link}
                        onChange={(url) => setResourceForm((prev) => ({ ...prev, link: url }))}
                        placeholder="https://drive.google.com/..."
                        folder="resources"
                      />
                    </div>
                    <div className="flex items-center justify-end gap-3">
                      {resourceForm.id !== null && (
                        <Button type="button" variant="ghost" onClick={resetResourceForm}>
                          Cancel edit
                        </Button>
                      )}
                      <Button type="submit" className="gap-2">
                        <Plus className="h-4 w-4" />
                        {resourceForm.id !== null ? "Save changes" : "Add resource"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-2xl">Resource library</CardTitle>
                  <CardDescription>Currently managing {resources.length} resource entries.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Course</TableHead>
                          <TableHead>Level</TableHead>
                          <TableHead>Format</TableHead>
                          <TableHead>Uploaded</TableHead>
                          <TableHead>Link</TableHead>
                          <TableHead className="w-[120px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {resources.map((resource) => (
                          <TableRow key={resource.id}>
                            <TableCell className="font-medium">{resource.title}</TableCell>
                            <TableCell>{resource.course}</TableCell>
                            <TableCell>{resource.level}</TableCell>
                            <TableCell>{resource.type}</TableCell>
                            <TableCell>{new Date(resource.uploadDate).toLocaleDateString()}</TableCell>
                            <TableCell>
                              {resource.link ? (
                                <a
                                  href={resource.link}
                                  className="text-primary underline"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Open
                                </a>
                              ) : (
                                <span className="text-muted-foreground">Not set</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" onClick={() => handleEditResource(resource)}>
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Edit resource</span>
                                </Button>
                                <Button variant="destructive" size="icon" onClick={() => handleDeleteResource(resource.id)}>
                                  <Trash className="h-4 w-4" />
                                  <span className="sr-only">Delete resource</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                        {resources.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center text-muted-foreground">
                              No academic resources yet. Add your first resource using the form.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="executives" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_1.8fr]">
              <Card className="border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Plus className="h-5 w-5 text-primary" /> {executiveForm.id ? "Update Executive" : "Add Executive"}
                  </CardTitle>
                  <CardDescription>Maintain up-to-date executive committee profiles.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handleExecutiveSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="executive-name">Full name</Label>
                        <Input
                          id="executive-name"
                          value={executiveForm.name}
                          onChange={(event) => setExecutiveForm((prev) => ({ ...prev, name: event.target.value }))}
                          placeholder="e.g. Oluwatobi Adeoye"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="executive-position">Position</Label>
                        <Input
                          id="executive-position"
                          value={executiveForm.position}
                          onChange={(event) => setExecutiveForm((prev) => ({ ...prev, position: event.target.value }))}
                          placeholder="President"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="executive-email">Email</Label>
                        <Input
                          id="executive-email"
                          type="email"
                          value={executiveForm.email}
                          onChange={(event) => setExecutiveForm((prev) => ({ ...prev, email: event.target.value }))}
                          placeholder="president@lssbowen.com"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="executive-phone">Phone</Label>
                        <Input
                          id="executive-phone"
                          value={executiveForm.phone}
                          onChange={(event) => setExecutiveForm((prev) => ({ ...prev, phone: event.target.value }))}
                          placeholder="+234 80 0000 0000"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <ImageUpload
                          value={executiveForm.image}
                          onChange={(url) => setExecutiveForm((prev) => ({ ...prev, image: url }))}
                          placeholder="https://example.com/executive-photo.jpg"
                          folder="executives"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="executive-bio">Bio</Label>
                        <Textarea
                          id="executive-bio"
                          value={executiveForm.bio}
                          onChange={(event) => setExecutiveForm((prev) => ({ ...prev, bio: event.target.value }))}
                          placeholder="Brief description of role and responsibilities"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="executive-linkedin">LinkedIn</Label>
                        <Input
                          id="executive-linkedin"
                          value={executiveForm.linkedin}
                          onChange={(event) => setExecutiveForm((prev) => ({ ...prev, linkedin: event.target.value }))}
                          placeholder="https://linkedin.com/in/username"
                        />
                      </div>
                      <div>
                        <Label htmlFor="executive-instagram">Instagram</Label>
                        <Input
                          id="executive-instagram"
                          value={executiveForm.instagram}
                          onChange={(event) => setExecutiveForm((prev) => ({ ...prev, instagram: event.target.value }))}
                          placeholder="https://instagram.com/username"
                        />
                      </div>
                      <div>
                        <Label htmlFor="executive-duration">Duration</Label>
                        <Input
                          id="executive-duration"
                          value={executiveForm.duration}
                          onChange={(event) => setExecutiveForm((prev) => ({ ...prev, duration: event.target.value }))}
                          placeholder="2024/2025"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-3">
                      {executiveForm.id !== null && (
                        <Button type="button" variant="ghost" onClick={resetExecutiveForm}>
                          Cancel edit
                        </Button>
                      )}
                      <Button type="submit" className="gap-2">
                        <Plus className="h-4 w-4" />
                        {executiveForm.id !== null ? "Save changes" : "Add executive"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-2xl">Executive directory</CardTitle>
                  <CardDescription>Currently managing {executives.length} executive profiles.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Position</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead className="w-[120px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {executives.map((executive) => (
                          <TableRow key={executive.id}>
                            <TableCell className="font-medium">{executive.name}</TableCell>
                            <TableCell>{executive.position}</TableCell>
                            <TableCell>
                              <a className="text-primary underline" href={`mailto:${executive.email}`}>
                                {executive.email}
                              </a>
                            </TableCell>
                            <TableCell>{executive.phone || <span className="text-muted-foreground">Not set</span>}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" onClick={() => handleEditExecutive(executive)}>
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Edit executive</span>
                                </Button>
                                <Button variant="destructive" size="icon" onClick={() => handleDeleteExecutive(executive.id)}>
                                  <Trash className="h-4 w-4" />
                                  <span className="sr-only">Delete executive</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                        {executives.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-muted-foreground">
                              No executive profiles yet. Add the first profile using the form.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alumni" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_1.8fr]">
              <Card className="border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Plus className="h-5 w-5 text-primary" /> {alumniForm.id ? "Update Alumni" : "Add Alumni"}
                  </CardTitle>
                  <CardDescription>Showcase the achievements of LSS Bowen alumni.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handleAlumniSubmit}>
                    <div className="space-y-2">
                      <Label htmlFor="alumni-name">Full name</Label>
                      <Input
                        id="alumni-name"
                        value={alumniForm.name}
                        onChange={(event) => setAlumniForm((prev) => ({ ...prev, name: event.target.value }))}
                        placeholder="e.g. Ibrahim Musa"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="alumni-year">Graduation year</Label>
                        <Input
                          id="alumni-year"
                          value={alumniForm.graduation_year}
                          onChange={(event) => setAlumniForm((prev) => ({ ...prev, graduation_year: event.target.value }))}
                          placeholder="2021"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="alumni-location">Location</Label>
                        <Input
                          id="alumni-location"
                          value={alumniForm.location}
                          onChange={(event) => setAlumniForm((prev) => ({ ...prev, location: event.target.value }))}
                          placeholder="Lagos, Nigeria"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="alumni-role">Current role</Label>
                      <Input
                        id="alumni-role"
                        value={alumniForm.currentRole}
                        onChange={(event) => setAlumniForm((prev) => ({ ...prev, currentRole: event.target.value }))}
                        placeholder="Associate, Lagos Law Chambers"
                      />
                    </div>
                    <div className="flex items-center justify-end gap-3">
                      {alumniForm.id !== null && (
                        <Button type="button" variant="ghost" onClick={resetAlumniForm}>
                          Cancel edit
                        </Button>
                      )}
                      <Button type="submit" className="gap-2">
                        <Plus className="h-4 w-4" />
                        {alumniForm.id !== null ? "Save changes" : "Add alumni"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-2xl">Alumni spotlight</CardTitle>
                  <CardDescription>Currently managing {alumni.length} alumni records.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Graduation year</TableHead>
                          <TableHead>Current position</TableHead>
                          <TableHead>Specialization</TableHead>
                          <TableHead className="w-[120px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {alumni.map((record) => (
                          <TableRow key={record.id}>
                            <TableCell className="font-medium">{record.name}</TableCell>
                            <TableCell>{record.graduation_year}</TableCell>
                            <TableCell className="max-w-[220px] truncate" title={record.current_position}>
                              {record.current_position || <span className="text-muted-foreground">Not set</span>}
                            </TableCell>
                            <TableCell>{record.specialization || <span className="text-muted-foreground">Not set</span>}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" onClick={() => handleEditAlumni(record)}>
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Edit alumni</span>
                                </Button>
                                <Button variant="destructive" size="icon" onClick={() => handleDeleteAlumni(record.id)}>
                                  <Trash className="h-4 w-4" />
                                  <span className="sr-only">Delete alumni</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                        {alumni.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-muted-foreground">
                              No alumni profiles yet. Add a record using the form.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="news" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_1.8fr]">
              <Card className="border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Plus className="h-5 w-5 text-primary" /> {newsForm.id ? "Update News" : "Publish News"}
                  </CardTitle>
                  <CardDescription>Keep the community informed about the latest developments.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handleNewsSubmit}>
                    <div className="space-y-2">
                      <Label htmlFor="news-title">Title</Label>
                      <Input
                        id="news-title"
                        value={newsForm.title}
                        onChange={(event) => setNewsForm((prev) => ({ ...prev, title: event.target.value }))}
                        placeholder="e.g. LSS Moot Court Team Wins Regional Competition"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="news-summary">Summary</Label>
                      <Textarea
                        id="news-summary"
                        value={newsForm.summary}
                        onChange={(event) => setNewsForm((prev) => ({ ...prev, summary: event.target.value }))}
                        placeholder="Write a short highlight..."
                        rows={4}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="news-date">Published date</Label>
                        <Input
                          id="news-date"
                          type="date"
                          value={newsForm.publishedOn}
                          onChange={(event) => setNewsForm((prev) => ({ ...prev, publishedOn: event.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="news-link">External link</Label>
                        <Input
                          id="news-link"
                          value={newsForm.link}
                          onChange={(event) => setNewsForm((prev) => ({ ...prev, link: event.target.value }))}
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-3">
                      {newsForm.id !== null && (
                        <Button type="button" variant="ghost" onClick={resetNewsForm}>
                          Cancel edit
                        </Button>
                      )}
                      <Button type="submit" className="gap-2">
                        <Plus className="h-4 w-4" />
                        {newsForm.id !== null ? "Save changes" : "Publish news"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-2xl">News feed</CardTitle>
                  <CardDescription>Currently managing {newsItems.length} news posts.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Published</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Summary</TableHead>
                          <TableHead className="w-[120px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {newsItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.title}</TableCell>
                            <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell className="max-w-[260px] truncate" title={item.summary}>
                              {item.summary}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" onClick={() => handleEditNews(item)}>
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Edit news</span>
                                </Button>
                                <Button variant="destructive" size="icon" onClick={() => handleDeleteNews(item.id)}>
                                  <Trash className="h-4 w-4" />
                                  <span className="sr-only">Delete news</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                        {newsItems.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-muted-foreground">
                              No news posts yet. Publish a news update using the form.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="merch" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_1.8fr]">
              <Card className="border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Plus className="h-5 w-5 text-primary" /> {merchForm.id ? "Update Merch" : "Add Merch"}
                  </CardTitle>
                  <CardDescription>Maintain the official merchandise catalogue available to members.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handleMerchSubmit}>
                    <div className="space-y-2">
                      <Label htmlFor="merch-name">Item name</Label>
                      <Input
                        id="merch-name"
                        value={merchForm.name}
                        onChange={(event) => setMerchForm((prev) => ({ ...prev, name: event.target.value }))}
                        placeholder="e.g. LSS Official T-Shirt"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="merch-price">Price</Label>
                        <Input
                          id="merch-price"
                          value={merchForm.price}
                          onChange={(event) => setMerchForm((prev) => ({ ...prev, price: event.target.value }))}
                          placeholder="₦5,000"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="merch-sizes">Available sizes (comma separated)</Label>
                        <Input
                          id="merch-sizes"
                          value={merchForm.sizes}
                          onChange={(event) => setMerchForm((prev) => ({ ...prev, sizes: event.target.value }))}
                          placeholder="S, M, L, XL"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="merch-image">Image URL</Label>
                      <Input
                        id="merch-image"
                        value={merchForm.image}
                        onChange={(event) => setMerchForm((prev) => ({ ...prev, image: event.target.value }))}
                        placeholder="https://..."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="merch-description">Description</Label>
                      <Textarea
                        id="merch-description"
                        value={merchForm.description}
                        onChange={(event) => setMerchForm((prev) => ({ ...prev, description: event.target.value }))}
                        placeholder="Describe the merch item..."
                        rows={4}
                      />
                    </div>
                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div>
                        <Label htmlFor="merch-stock" className="text-sm font-medium">
                          In stock
                        </Label>
                        <p className="text-xs text-muted-foreground">Toggle availability in the storefront.</p>
                      </div>
                      <Switch
                        id="merch-stock"
                        checked={merchForm.inStock}
                        onCheckedChange={(checked) => setMerchForm((prev) => ({ ...prev, inStock: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-end gap-3">
                      {merchForm.id !== null && (
                        <Button type="button" variant="ghost" onClick={resetMerchForm}>
                          Cancel edit
                        </Button>
                      )}
                      <Button type="submit" className="gap-2">
                        <Plus className="h-4 w-4" />
                        {merchForm.id !== null ? "Save changes" : "Add merch"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-2xl">Merch catalogue</CardTitle>
                  <CardDescription>Currently managing {merchItems.length} merch items.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Stock status</TableHead>
                          <TableHead>Sizes</TableHead>
                          <TableHead className="w-[120px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {merchItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>
                              {item.inStock ? (
                                <span className="text-sm font-medium text-green-600">In stock</span>
                              ) : (
                                <span className="text-sm font-medium text-destructive">Out of stock</span>
                              )}
                            </TableCell>
                            <TableCell className="max-w-[200px]">
                              {item.sizes.length > 0 ? item.sizes.join(", ") : <span className="text-muted-foreground">Not set</span>}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" onClick={() => handleEditMerch(item)}>
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Edit merch</span>
                                </Button>
                                <Button variant="destructive" size="icon" onClick={() => handleDeleteMerch(item.id)}>
                                  <Trash className="h-4 w-4" />
                                  <span className="sr-only">Delete merch</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                        {merchItems.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-muted-foreground">
                              No merch items yet. Add merchandise using the form.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
