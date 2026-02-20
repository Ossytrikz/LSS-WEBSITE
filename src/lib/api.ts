export const API_BASE_URL = import.meta.env.VITE_API_URL;

type FetchOptions = RequestInit & { parseJson?: boolean };

type StrapiCollectionEntry<T> = {
  id: number;
  attributes: T;
};

type StrapiCollectionResponse<T> = {
  data: StrapiCollectionEntry<T>[];
};

type StrapiSingleResponse<T> = {
  data: StrapiCollectionEntry<T> | null;
};

const generateLocalId = () => Date.now() + Math.floor(Math.random() * 1000);

const isStrapiCollectionResponse = <T>(value: unknown): value is StrapiCollectionResponse<T> => {
  return Boolean(value) && typeof value === "object" && Array.isArray((value as StrapiCollectionResponse<T>).data);
};

const isStrapiSingleResponse = <T>(value: unknown): value is StrapiSingleResponse<T> => {
  return (
    Boolean(value) &&
    typeof value === "object" &&
    (typeof (value as StrapiSingleResponse<T>).data === "object" || (value as StrapiSingleResponse<T>).data === null)
  );
};

const buildUrl = (path: string) => {
  const trimmedBase = (API_BASE_URL || "").replace(/\/$/, "");
  const trimmedPath = path.replace(/^\//, "");
  return `${trimmedBase}/${trimmedPath}`;
};

const request = async <T = unknown>(path: string, options: FetchOptions = {}): Promise<T> => {
  const { parseJson = true, headers, ...rest } = options;
  const response = await fetch(buildUrl(path), {
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    ...rest,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(
      `Request failed (${response.status} ${response.statusText}) for ${path}: ${message || "No response body"}`,
    );
  }

  if (!parseJson) {
    return undefined as T;
  }

  return (await response.json()) as T;
};

export const fetchCollection = async <T>(
  endpoint: string,
  mapper: (payload: any, id: number) => T,
): Promise<T[]> => {
  const data = await request(endpoint);

  if (Array.isArray(data)) {
    return data.map((item) => mapper(item, item.id ?? item?.attributes?.id ?? generateLocalId()));
  }

  if (isStrapiCollectionResponse(data)) {
    return data.data.map((entry) => mapper(entry.attributes, entry.id));
  }

  return [];
};

export const fetchSingle = async <T>(endpoint: string, mapper: (payload: any, id: number) => T): Promise<T | null> => {
  const data = await request(endpoint);

  if (Array.isArray(data)) {
    const first = data[0];
    return first ? mapper(first, first.id ?? first?.attributes?.id ?? generateLocalId()) : null;
  }

  if (isStrapiSingleResponse(data) && data.data) {
    return mapper(data.data.attributes, data.data.id);
  }

  return null;
};

export const createEntry = async <TPayload, TResult>(
  endpoint: string,
  payload: TPayload,
  mapper: (payload: any, id: number) => TResult,
): Promise<TResult> => {
  const data = await request(endpoint, {
    method: "POST",
    body: JSON.stringify({ data: payload }),
  });

  if (isStrapiSingleResponse(data) && data.data) {
    return mapper(data.data.attributes, data.data.id);
  }

  if (isStrapiCollectionResponse(data) && data.data.length > 0) {
    const entry = data.data[0];
    return mapper(entry.attributes, entry.id);
  }

  return mapper(data, (data as { id?: number })?.id ?? crypto.randomUUID());
};

export const updateEntry = async <TPayload, TResult>(
  endpoint: string,
  id: number,
  payload: TPayload,
  mapper: (payload: any, id: number) => TResult,
): Promise<TResult> => {
  const data = await request(`${endpoint}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ data: payload }),
  });

  if (isStrapiSingleResponse(data) && data.data) {
    return mapper(data.data.attributes, data.data.id);
  }

  return mapper(data, (data as { id?: number })?.id ?? id);
};

export const deleteEntry = async (endpoint: string, id: number): Promise<void> => {
  await request(`${endpoint}/${id}`, {
    method: "DELETE",
    parseJson: false,
  });
};

export const apiHelpers = {
  fetchCollection,
  fetchSingle,
  createEntry,
  updateEntry,
  deleteEntry,
};
