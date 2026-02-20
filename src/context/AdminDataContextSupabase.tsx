import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

export type Resource = {
  id: number;
  title: string;
  course: string;
  level: string;
  type: string;
  link: string;
  upload_date: string;
};

export type Executive = {
  id: number;
  name: string;
  position: string;
  bio: string | null;
  email: string;
  phone: string | null;
  image: string;
  linkedin: string | null;
  instagram: string | null;
  duration: string | null;
};

export type Alumni = {
  id: number;
  name: string;
  graduation_year: string;
  image: string;
  current_position: string;
  achievements: string;
  specialization: string;
};

export type MerchItem = {
  id: number;
  name: string;
  price: string;
  image: string;
  sizes: string[];
  description: string;
  in_stock: boolean;
};

export type NewsItem = {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
  summary: string;
  content: string;
};

export type ResourceInput = Omit<Resource, "id">;
export type ExecutiveInput = Omit<Executive, "id">;
export type AlumniInput = Omit<Alumni, "id">;
export type MerchInput = Omit<MerchItem, "id">;
export type NewsInput = Omit<NewsItem, "id">;

type AdminDataContextValue = {
  resources: Resource[];
  executives: Executive[];
  alumni: Alumni[];
  merchItems: MerchItem[];
  newsItems: NewsItem[];
  backendEnabled: boolean;
  isRefreshing: boolean;
  refreshAll: () => Promise<void>;

  addResource: (resource: ResourceInput) => Promise<Resource>;
  updateResource: (resource: Resource) => Promise<Resource>;
  deleteResource: (id: number) => Promise<void>;

  addExecutive: (executive: ExecutiveInput) => Promise<Executive>;
  updateExecutive: (executive: Executive) => Promise<Executive>;
  deleteExecutive: (id: number) => Promise<void>;

  addAlumni: (alumni: AlumniInput) => Promise<Alumni>;
  updateAlumni: (alumni: Alumni) => Promise<Alumni>;
  deleteAlumni: (id: number) => Promise<void>;

  addMerchItem: (item: MerchInput) => Promise<MerchItem>;
  updateMerchItem: (item: MerchItem) => Promise<MerchItem>;
  deleteMerchItem: (id: number) => Promise<void>;

  addNewsItem: (item: NewsInput) => Promise<NewsItem>;
  updateNewsItem: (item: NewsItem) => Promise<NewsItem>;
  deleteNewsItem: (id: number) => Promise<void>;
};

const AdminDataContext = createContext<AdminDataContextValue | undefined>(undefined);

export const AdminDataProvider = ({ children }: { children: ReactNode }) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [executives, setExecutives] = useState<Executive[]>([]);
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [merchItems, setMerchItems] = useState<MerchItem[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load initial data from Supabase
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsRefreshing(true);
        
        const [resourcesRes, executivesRes, alumniRes, merchRes, newsRes] = await Promise.all([
          supabase.from('resources').select('*').order('id'),
          supabase.from('executives').select('*').order('id'),
          supabase.from('alumni').select('*').order('id'),
          supabase.from('merch_items').select('*').order('id'),
          supabase.from('news_items').select('*').order('id')
        ]);

        if (resourcesRes.error) throw resourcesRes.error;
        if (executivesRes.error) throw executivesRes.error;
        if (alumniRes.error) throw alumniRes.error;
        if (merchRes.error) throw merchRes.error;
        if (newsRes.error) throw newsRes.error;

        setResources(resourcesRes.data || []);
        setExecutives(executivesRes.data || []);
        setAlumni(alumniRes.data || []);
        setMerchItems(merchRes.data || []);
        setNewsItems(newsRes.data || []);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsRefreshing(false);
      }
    };

    loadData();
  }, []);

  const value = useMemo<AdminDataContextValue>(() => ({
    resources,
    addResource: async (resource) => {
      const { data, error } = await supabase
        .from('resources')
        .insert(resource)
        .select()
        .single();
      
      if (error) throw error;
      setResources((prev) => [data, ...prev]);
      return data;
    },
    updateResource: async (resource) => {
      const { data, error } = await supabase
        .from('resources')
        .update(resource)
        .eq('id', resource.id)
        .select()
        .single();
      
      if (error) throw error;
      setResources((prev) => prev.map((item) => (item.id === resource.id ? data : item)));
      return data;
    },
    deleteResource: async (id) => {
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setResources((prev) => prev.filter((item) => item.id !== id));
    },

    executives,
    addExecutive: async (executive) => {
      const { data, error } = await supabase
        .from('executives')
        .insert(executive)
        .select()
        .single();
      
      if (error) throw error;
      setExecutives((prev) => [data, ...prev]);
      return data;
    },
    updateExecutive: async (executive) => {
      const { data, error } = await supabase
        .from('executives')
        .update(executive)
        .eq('id', executive.id)
        .select()
        .single();
      
      if (error) throw error;
      setExecutives((prev) => prev.map((item) => (item.id === executive.id ? data : item)));
      return data;
    },
    deleteExecutive: async (id) => {
      const { error } = await supabase
        .from('executives')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setExecutives((prev) => prev.filter((item) => item.id !== id));
    },

    alumni,
    addAlumni: async (record) => {
      const { data, error } = await supabase
        .from('alumni')
        .insert(record)
        .select()
        .single();
      
      if (error) throw error;
      setAlumni((prev) => [data, ...prev]);
      return data;
    },
    updateAlumni: async (record) => {
      const { data, error } = await supabase
        .from('alumni')
        .update(record)
        .eq('id', record.id)
        .select()
        .single();
      
      if (error) throw error;
      setAlumni((prev) => prev.map((item) => (item.id === record.id ? data : item)));
      return data;
    },
    deleteAlumni: async (id) => {
      const { error } = await supabase
        .from('alumni')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setAlumni((prev) => prev.filter((item) => item.id !== id));
    },

    merchItems,
    addMerchItem: async (item) => {
      const { data, error } = await supabase
        .from('merch_items')
        .insert(item)
        .select()
        .single();
      
      if (error) throw error;
      setMerchItems((prev) => [data, ...prev]);
      return data;
    },
    updateMerchItem: async (item) => {
      const { data, error } = await supabase
        .from('merch_items')
        .update(item)
        .eq('id', item.id)
        .select()
        .single();
      
      if (error) throw error;
      setMerchItems((prev) => prev.map((entry) => (entry.id === item.id ? data : entry)));
      return data;
    },
    deleteMerchItem: async (id) => {
      const { error } = await supabase
        .from('merch_items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setMerchItems((prev) => prev.filter((item) => item.id !== id));
    },

    newsItems,
    addNewsItem: async (item) => {
      const { data, error } = await supabase
        .from('news_items')
        .insert(item)
        .select()
        .single();
      
      if (error) throw error;
      setNewsItems((prev) => [data, ...prev]);
      return data;
    },
    updateNewsItem: async (item) => {
      const { data, error } = await supabase
        .from('news_items')
        .update(item)
        .eq('id', item.id)
        .select()
        .single();
      
      if (error) throw error;
      setNewsItems((prev) => prev.map((entry) => (entry.id === item.id ? data : entry)));
      return data;
    },
    deleteNewsItem: async (id) => {
      const { error } = await supabase
        .from('news_items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setNewsItems((prev) => prev.filter((item) => item.id !== id));
    },

    backendEnabled: true,
    isRefreshing,
    refreshAll: async () => {
      // This will trigger the useEffect to reload data
      setIsRefreshing(true);
      setTimeout(() => setIsRefreshing(false), 1000);
    },
  }), [resources, executives, alumni, merchItems, newsItems, isRefreshing]);

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error("useAdminData must be used within an AdminDataProvider");
  }
  return context;
};
