"use client";

import { useState, useCallback } from "react";
import { Upload, X, FileText, Loader2 } from "lucide-react";
import { validateFile } from "@/lib/utils/validation";

interface LogUploaderProps {
  onUploadSuccess?: (fileId: string, logsCount: number) => void;
  onUploadError?: (error: string) => void;
}

export function LogUploader({
  onUploadSuccess,
  onUploadError,
}: LogUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);

      // Validate file
      const validation = validateFile(file);
      if (!validation.valid) {
        const errorMsg = validation.error || "Invalid file";
        setError(errorMsg);
        onUploadError?.(errorMsg);
        return;
      }

      setUploadedFile(file);
      setIsUploading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Upload failed");
        }

        onUploadSuccess?.(data.fileId, data.logsCount);
        setUploadedFile(null);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Upload failed";
        setError(errorMsg);
        onUploadError?.(errorMsg);
      } finally {
        setIsUploading(false);
      }
    },
    [onUploadSuccess, onUploadError]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const removeFile = useCallback(() => {
    setUploadedFile(null);
    setError(null);
  }, []);

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${isDragging ? "border-primary bg-accent" : "border-muted"}
          ${isUploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <input
          type="file"
          id="file-upload"
          accept=".log,.txt"
          onChange={handleFileInput}
          disabled={isUploading}
          className="hidden"
        />
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-12 h-12 mb-4 animate-spin text-primary" />
              <p className="text-lg font-medium">Processando arquivo...</p>
            </>
          ) : (
            <>
              <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">
                Arraste e solte um arquivo aqui
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                ou clique para selecionar
              </p>
              <p className="text-xs text-muted-foreground">
                Formatos aceitos: .log, .txt (máx. 10MB)
              </p>
            </>
          )}
        </label>
      </div>

      {uploadedFile && !isUploading && (
        <div className="mt-4 p-4 border rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">{uploadedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(uploadedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          <button
            onClick={removeFile}
            className="p-2 hover:bg-accent rounded"
            aria-label="Remove file"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-destructive/10 border border-destructive rounded-lg">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
    </div>
  );
}
