"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogUploader } from "@/components/upload/LogUploader";
import { CheckCircle2 } from "lucide-react";

export default function UploadPage() {
  const router = useRouter();
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadData, setUploadData] = useState<{
    fileId: string;
    logsCount: number;
  } | null>(null);

  const handleUploadSuccess = (fileId: string, logsCount: number) => {
    setUploadData({ fileId, logsCount });
    setUploadSuccess(true);

    // Redirect to timeline after 2 seconds
    setTimeout(() => {
      router.push("/timeline");
    }, 2000);
  };

  const handleUploadError = (error: string) => {
    console.error("Upload error:", error);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Upload de Logs</h1>
        <p className="text-muted-foreground mb-8">
          Faça upload de arquivos de log VMware (.log ou .txt) para análise
        </p>

        {uploadSuccess && uploadData ? (
          <div className="p-6 border rounded-lg bg-green-50 dark:bg-green-900/20">
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
              <h2 className="text-xl font-semibold text-green-900 dark:text-green-100">
                Upload realizado com sucesso!
              </h2>
            </div>
            <p className="text-green-800 dark:text-green-200">
              {uploadData.logsCount} logs processados. Redirecionando para a
              timeline...
            </p>
          </div>
        ) : (
          <LogUploader
            onUploadSuccess={handleUploadSuccess}
            onUploadError={handleUploadError}
          />
        )}
      </div>
    </div>
  );
}
