"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/utils/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";


import Link from "next/link";

import { Fira_Code } from 'next/font/google'

const firacode = Fira_Code({
  subsets: ['latin'],
  weight: ['400'],  // bold
});




export default function FilesPage() {
  const { user } = useUser();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      if (!user?.emailAddresses?.[0]?.emailAddress) return;

      const { data, error } = await supabase
        .from("filoinfo")
        .select("file_name, file_type, file_size, short_url")
        .eq("user_email", user.emailAddresses[0].emailAddress);

      if (error) {
        toast.error("Failed to fetch files");
        return;
      }

      setFiles(data);
      setLoading(false);
    };

    fetchFiles();
  }, [user]);

  return (
    <div className={`p-8 min-h-screen bg-neutral-900 text-gray-300 `}>
      <h1 className={`text-3xl ${firacode.className} font-bold text-green-400 mb-6`}>Your Uploaded Files</h1>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl bg-neutral-800" />
          ))}
        </div>
      ) : files.length === 0 ? (
        <p className="text-gray-500">No files uploaded yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((file, index) => (
            <Card key={index} className="bg-neutral-900 border border-neutral-700 text-gray-200">
              <CardContent className="p-4 space-y-2">
                <div className="text-lg font-semibold truncate">📄 {file.file_name}</div>
                <div className="flex justify-between text-sm">
                  <Badge variant="outline" className="text-xs text-green-400 border-green-600">
                    {file.file_type}
                  </Badge>
                  <span>{(file.file_size / (1024 * 1024)).toFixed(2)} MB</span>
                </div>
                <div className="text-sm mt-2 truncate text-blue-400">
                  <Link href={`${file.short_url}`} className="hover:underline">
                    {`${file.short_url}`}
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}