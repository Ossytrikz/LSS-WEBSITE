import React from "react";
import { useAdminData } from "@/context/AdminDataContextSupabase";

export function DebugInfo() {
  const { executives, loading, error } = useAdminData();

  return (
    <div className="fixed bottom-4 left-4 bg-black text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h4 className="font-bold mb-2">Debug Info:</h4>
      <div>Loading: {loading ? 'Yes' : 'No'}</div>
      <div>Error: {error || 'None'}</div>
      <div>Executives Count: {executives.length}</div>
      <div className="mt-2">
        <div>Supabase URL:</div>
        <div className="text-xs break-all">{import.meta.env.VITE_SUPABASE_URL}</div>
      </div>
      {executives.length > 0 && (
        <div className="mt-2">
          <div>First Executive:</div>
          <div>{executives[0]?.name}</div>
        </div>
      )}
    </div>
  );
}
