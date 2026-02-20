import { ReactNode, createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

export type Resource = {
  id: number;
  title: string;
  course: string;
  level: string;
  type: string;
  link: string;
  uploadDate: string;
};

export type Executive = {
  id: number;
  name: string;
  position: string;
  bio: string;
  email: string;
  phone?: string;
  image: string;
  linkedin?: string;
  instagram?: string;
  duration?: string;
};

export type Alumni = {
  id: number;
  name: string;
  graduationYear: string;
  image: string;
  currentPosition: string;
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
  inStock: boolean;
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

// API helper functions
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(`/api/admin${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

const initialResources: Resource[] = [];
const initialExecutives: Executive[] = [];
const initialAlumni: Alumni[] = [];
const initialMerch: MerchItem[] = [];
const initialNews: NewsItem[] = [];

const AdminDataContext = createContext<AdminDataContextValue | undefined>(undefined);

const createId = () => Date.now() + Math.floor(Math.random() * 1000);

export const AdminDataProvider = ({ children }: { children: ReactNode }) => {
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [executives, setExecutives] = useState<Executive[]>(initialExecutives);
  const [alumni, setAlumni] = useState<Alumni[]>(initialAlumni);
  const [merchItems, setMerchItems] = useState<MerchItem[]>(initialMerch);
  const [newsItems, setNewsItems] = useState<NewsItem[]>(initialNews);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load initial data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsRefreshing(true);
        const data = await apiCall('?type=all');
        setResources(data.resources || []);
        setExecutives(data.executives || []);
        setAlumni(data.alumni || []);
        setMerchItems(data.merch || []);
        setNewsItems(data.news || []);
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
      const newResource = await apiCall('?type=resources', {
        method: 'POST',
        body: JSON.stringify(resource),
      });
      setResources((prev) => [newResource, ...prev]);
      return newResource;
    },
    updateResource: async (resource) => {
      const updatedResource = await apiCall(`?type=resources&id=${resource.id}`, {
        method: 'PUT',
        body: JSON.stringify(resource),
      });
      setResources((prev) => prev.map((item) => (item.id === resource.id ? updatedResource : item)));
      return updatedResource;
    },
    deleteResource: async (id) => {
      await apiCall(`?type=resources&id=${id}`, {
        method: 'DELETE',
      });
      setResources((prev) => prev.filter((item) => item.id !== id));
    },

    executives,
    addExecutive: async (executive) => {
      const newExecutive = await apiCall('?type=executives', {
        method: 'POST',
        body: JSON.stringify(executive),
      });
      setExecutives((prev) => [newExecutive, ...prev]);
      return newExecutive;
    },
    updateExecutive: async (executive) => {
      const updatedExecutive = await apiCall(`?type=executives&id=${executive.id}`, {
        method: 'PUT',
        body: JSON.stringify(executive),
      });
      setExecutives((prev) => prev.map((item) => (item.id === executive.id ? updatedExecutive : item)));
      return updatedExecutive;
    },
    deleteExecutive: async (id) => {
      await apiCall(`?type=executives&id=${id}`, {
        method: 'DELETE',
      });
      setExecutives((prev) => prev.filter((item) => item.id !== id));
    },

    alumni,
    addAlumni: async (record) => {
      const newAlumni = await apiCall('?type=alumni', {
        method: 'POST',
        body: JSON.stringify(record),
      });
      setAlumni((prev) => [newAlumni, ...prev]);
      return newAlumni;
    },
    updateAlumni: async (record) => {
      const updatedAlumni = await apiCall(`?type=alumni&id=${record.id}`, {
        method: 'PUT',
        body: JSON.stringify(record),
      });
      setAlumni((prev) => prev.map((item) => (item.id === record.id ? updatedAlumni : item)));
      return updatedAlumni;
    },
    deleteAlumni: async (id) => {
      await apiCall(`?type=alumni&id=${id}`, {
        method: 'DELETE',
      });
      setAlumni((prev) => prev.filter((item) => item.id !== id));
    },

    merchItems,
    addMerchItem: async (item) => {
      const newMerchItem = await apiCall('?type=merch', {
        method: 'POST',
        body: JSON.stringify(item),
      });
      setMerchItems((prev) => [newMerchItem, ...prev]);
      return newMerchItem;
    },
    updateMerchItem: async (item) => {
      const updatedMerchItem = await apiCall(`?type=merch&id=${item.id}`, {
        method: 'PUT',
        body: JSON.stringify(item),
      });
      setMerchItems((prev) => prev.map((entry) => (entry.id === item.id ? updatedMerchItem : entry)));
      return updatedMerchItem;
    },
    deleteMerchItem: async (id) => {
      await apiCall(`?type=merch&id=${id}`, {
        method: 'DELETE',
      });
      setMerchItems((prev) => prev.filter((item) => item.id !== id));
    },

    newsItems,
    addNewsItem: async (item) => {
      const newNewsItem = await apiCall('?type=news', {
        method: 'POST',
        body: JSON.stringify(item),
      });
      setNewsItems((prev) => [newNewsItem, ...prev]);
      return newNewsItem;
    },
    updateNewsItem: async (item) => {
      const updatedNewsItem = await apiCall(`?type=news&id=${item.id}`, {
        method: 'PUT',
        body: JSON.stringify(item),
      });
      setNewsItems((prev) => prev.map((entry) => (entry.id === item.id ? updatedNewsItem : entry)));
      return updatedNewsItem;
    },
    deleteNewsItem: async (id) => {
      await apiCall(`?type=news&id=${id}`, {
        method: 'DELETE',
      });
      setNewsItems((prev) => prev.filter((item) => item.id !== id));
    },

    backendEnabled: true,
    isRefreshing,
    refreshAll: async () => {
      try {
        setIsRefreshing(true);
        const data = await apiCall('?type=all');
        setResources(data.resources || []);
        setExecutives(data.executives || []);
        setAlumni(data.alumni || []);
        setMerchItems(data.merch || []);
        setNewsItems(data.news || []);
      } catch (error) {
        console.error('Failed to refresh data:', error);
      } finally {
        setIsRefreshing(false);
      }
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
