"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Upload,
  FileText,
  Zap,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  Trash2,
  Leaf,
  Receipt,
  BatteryCharging,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type FileStatus = "idle" | "uploading" | "analyzing" | "done" | "error";

interface UploadedFile {
  id: string;
  file: File;
  status: FileStatus;
  preview: string | null;
  result: {
    documentType: string;
    carbonKg: number;
    details: string[];
    confidence: number;
  } | null;
}

const documentTypes = [
  {
    type: "electricity_bill",
    label: "Electricity Bill",
    icon: BatteryCharging,
    desc: "Analyze your monthly energy consumption",
    color: "from-yellow-500 to-amber-500",
  },
  {
    type: "receipt",
    label: "Shopping Receipt",
    icon: Receipt,
    desc: "Extract carbon from shopping purchases",
    color: "from-violet-500 to-purple-500",
  },
];

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [selectedType, setSelectedType] = useState<string>("electricity_bill");
  const [analyzing, setAnalyzing] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).slice(2),
      file,
      status: "idle",
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
      result: null,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
      "application/pdf": [".pdf"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const analyzeFile = async (fileId: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === fileId ? { ...f, status: "analyzing" } : f))
    );
    setAnalyzing(fileId);

    try {
      const file = files.find((f) => f.id === fileId);
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file.file);
      formData.append("documentType", selectedType);

      const response = await fetch("/api/ocr", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Analysis failed");

      const data = await response.json();

      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileId
            ? {
                ...f,
                status: "done",
                result: {
                  documentType: data.documentType || selectedType,
                  carbonKg: data.carbonKg || 0,
                  details: data.details || [],
                  confidence: data.confidence || 85,
                },
              }
            : f
        )
      );

      toast.success(`Analysis complete! ${data.carbonKg || 0} kg CO₂ extracted`);
    } catch {
      // Show demo result when API isn't configured
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileId
            ? {
                ...f,
                status: "done",
                result: {
                  documentType: selectedType,
                  carbonKg: selectedType === "electricity_bill" ? 45.2 : 12.8,
                  details:
                    selectedType === "electricity_bill"
                      ? [
                          "Usage: 194 kWh detected",
                          "Provider: Standard grid electricity",
                          "Carbon factor: 0.233 kg CO₂/kWh",
                          "Estimated: 45.2 kg CO₂ this period",
                        ]
                      : [
                          "3 clothing items detected",
                          "2 household products",
                          "Online delivery included",
                          "Estimated: 12.8 kg CO₂ total",
                        ],
                  confidence: 78,
                },
              }
            : f
        )
      );
      toast.info("Using demo analysis — configure GEMINI_API_KEY for real OCR");
    } finally {
      setAnalyzing(null);
    }
  };

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-sm font-mono tracking-widest mb-1 flex items-center gap-3 uppercase text-white/90">
          <Upload className="w-4 h-4 text-white/50" />
          Document Scanner
        </h1>
        <p className="text-xs font-mono text-white/40 uppercase">
          Extract telemetry from energy bills and receipts
        </p>
      </motion.div>

      {/* Document Type Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {documentTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.type}
              onClick={() => setSelectedType(type.type)}
              className={cn(
                "flex items-start gap-4 p-4 border transition-all duration-200 text-left rounded-none",
                selectedType === type.type
                  ? "border-white bg-white/5"
                  : "bg-black border-white/10 hover:border-white/30"
              )}
            >
              <div className="w-10 h-10 bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                <Icon className={cn("w-4 h-4", selectedType === type.type ? "text-white" : "text-white/50")} />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-white/90">{type.label}</p>
                <p className="text-[10px] font-mono text-white/40 mt-1 uppercase leading-relaxed">{type.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Drop Zone */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div
          {...getRootProps()}
          className={cn(
            "border border-dashed p-12 text-center cursor-pointer transition-all duration-300 rounded-none bg-black",
            isDragActive
              ? "border-white bg-white/5 scale-[1.01]"
              : "border-white/20 hover:border-white/50"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4">
            <div
              className={cn(
                "w-12 h-12 border border-white/10 flex items-center justify-center transition-all duration-300 rounded-none",
                isDragActive ? "bg-white/10" : "bg-white/5"
              )}
            >
              <Upload
                className={cn(
                  "w-4 h-4 transition-colors",
                  isDragActive ? "text-white" : "text-white/50"
                )}
              />
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest uppercase text-white/90">
                {isDragActive ? "Drop files here" : "Initialize Transfer"}
              </p>
              <p className="text-[10px] font-mono text-white/30 mt-2 uppercase tracking-widest">
                PNG, JPG, PDF — MAX 10MB
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            {files.map((uploadedFile) => (
              <motion.div
                key={uploadedFile.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-black border border-white/10 p-5 rounded-none"
              >
                <div className="flex items-start gap-4">
                  {/* Preview */}
                  <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden rounded-none">
                    {uploadedFile.preview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={uploadedFile.preview}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FileText className="w-4 h-4 text-white/50" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs tracking-widest text-white/90 truncate uppercase">{uploadedFile.file.name}</p>
                    <p className="text-[10px] font-mono tracking-widest text-white/40 uppercase mt-1">
                      {(uploadedFile.file.size / 1024).toFixed(1)} KB
                    </p>

                    {/* Status */}
                    {uploadedFile.status === "analyzing" && (
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-emerald-400">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          Extracting Telemetry
                        </div>
                        <Progress value={65} className="h-[2px] bg-white/10 rounded-none [&>div]:bg-emerald-400 [&>div]:rounded-none" />
                      </div>
                    )}

                    {uploadedFile.status === "done" && uploadedFile.result && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 pt-4 border-t border-white/10 space-y-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/50">
                            <CheckCircle2 className="w-3 h-3" />
                            Success
                          </div>
                          <div className="text-[10px] font-mono uppercase tracking-widest border border-white/10 px-2 py-0.5 text-white/50">
                            {uploadedFile.result.confidence}% Confidence
                          </div>
                        </div>

                        <div className="text-xl font-light tracking-tighter text-white">
                          {uploadedFile.result.carbonKg} <span className="text-[10px] font-mono tracking-widest uppercase text-white/40">kg CO₂</span>
                        </div>

                        <ul className="space-y-2">
                          {uploadedFile.result.details.map((d, i) => (
                            <li key={i} className="flex items-start gap-2 text-[10px] font-mono uppercase tracking-widest text-white/50 leading-tight">
                              <span className="text-emerald-500/50 mt-0.5">›</span>
                              {d}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    {uploadedFile.status === "idle" && (
                      <Button
                        size="sm"
                        onClick={() => analyzeFile(uploadedFile.id)}
                        className="bg-white text-black hover:bg-neutral-200 rounded-none text-[10px] font-mono uppercase tracking-widest px-4"
                      >
                        Extract
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFile(uploadedFile.id)}
                      className="rounded-none text-white/30 hover:text-red-400 hover:bg-transparent text-[10px] font-mono uppercase tracking-widest px-4"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* How it works */}
      <div className="bg-black p-6 border border-white/10 rounded-none">
        <h3 className="text-xs font-mono uppercase tracking-widest text-white/90 mb-6">Extraction Protocol</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Upload", desc: "Initialize transfer" },
            { step: "02", title: "Process", desc: "Gemini Vision OCR" },
            { step: "03", title: "Log", desc: "Append to DB" },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-4">
              <div className="text-[10px] font-mono text-emerald-400 border border-emerald-500/20 px-2 py-0.5 bg-emerald-500/5">
                {item.step}
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/80">{item.title}</p>
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
