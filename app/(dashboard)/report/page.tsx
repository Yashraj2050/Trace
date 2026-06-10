"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Download,
  Loader2,
  Leaf,
  TrendingDown,
  Award,
  BarChart3,
  Star,
  CheckCircle2,
} from "lucide-react";
import { TraceLogoBase64 } from "@/lib/logoBase64";
import dynamic from "next/dynamic";

const ReportChart = dynamic(() => import("@/components/dashboard/report-chart"), {
  ssr: false,
  loading: () => <div className="w-full h-[200px] flex flex-col items-center justify-center text-white/50 bg-white/5 rounded-xl border border-white/10 animate-pulse"><Loader2 className="w-4 h-4 animate-spin mb-2" /><span className="text-xs uppercase tracking-widest font-mono">Loading telemetry...</span></div>
});
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const monthlyData = [
  { month: "Jul", carbon: 380 },
  { month: "Aug", carbon: 355 },
  { month: "Sep", carbon: 320 },
  { month: "Oct", carbon: 310 },
  { month: "Nov", carbon: 290 },
  { month: "Dec", carbon: 265 },
];

const recommendations = [
  { text: "Switch to an EV or use public transit more", impact: "Save 800 kg/year", done: false },
  { text: "Reduce meat consumption to 3x per week", impact: "Save 300 kg/year", done: true },
  { text: "Install LED lighting throughout your home", impact: "Save 50 kg/year", done: true },
  { text: "Use renewable energy provider", impact: "Save 400 kg/year", done: false },
  { text: "Buy secondhand clothing when possible", impact: "Save 200 kg/year", done: false },
];

export default function ReportPage() {
  const [generating, setGenerating] = useState(false);

  const handleDownload = async () => {
    setGenerating(true);
    try {
      // Dynamic import for jsPDF (client-side only)
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF("p", "mm", "a4");

      // Colors
      const darkBg = [10, 20, 15];
      const emeraldColor = [16, 185, 129];
      const textColor = [200, 220, 200];
      const mutedColor = [100, 130, 110];

      // Background
      doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
      doc.rect(0, 0, 210, 297, "F");

      // Header bar
      doc.setFillColor(emeraldColor[0], emeraldColor[1], emeraldColor[2]);
      doc.rect(0, 0, 210, 40, "F");

      doc.addImage(TraceLogoBase64, "PNG", 15, 12, 45, 15);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text("Sustainability Report — December 2024", 20, 28);
      doc.text("Generated: " + new Date().toLocaleDateString(), 20, 36);

      // Carbon saved highlight
      doc.setFillColor(20, 40, 25);
      doc.roundedRect(15, 50, 85, 35, 5, 5, "F");
      doc.setFillColor(30, 60, 35);
      doc.roundedRect(110, 50, 85, 35, 5, 5, "F");

      doc.setTextColor(emeraldColor[0], emeraldColor[1], emeraldColor[2]);
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("265 kg", 22, 67);
      doc.text("72/100", 117, 67);

      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text("Total CO2 This Month", 22, 74);
      doc.text("Sustainability Score", 117, 74);

      // Section: Monthly trend
      doc.setTextColor(emeraldColor[0], emeraldColor[1], emeraldColor[2]);
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.text("Monthly Carbon Trend", 15, 100);

      const trendY = 108;
      const barData = [380, 355, 320, 310, 290, 265];
      const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const maxVal = 400;
      const barWidth = 22;
      const barSpacing = 8;
      const maxHeight = 40;

      barData.forEach((val, i) => {
        const h = (val / maxVal) * maxHeight;
        const x = 15 + i * (barWidth + barSpacing);
        const y = trendY + maxHeight - h;
        const green = Math.floor(100 + (i / 5) * 85);
        doc.setFillColor(16, green, 80);
        doc.roundedRect(x, y, barWidth, h, 2, 2, "F");
        doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
        doc.setFontSize(8);
        doc.text(months[i], x + barWidth / 2 - 3, trendY + maxHeight + 6);
        doc.text(`${val}`, x + 2, y - 2);
      });

      // Section: Category breakdown
      doc.setTextColor(emeraldColor[0], emeraldColor[1], emeraldColor[2]);
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.text("Emissions by Category", 15, 175);

      const catColors: [number, number, number][] = [
        [59, 130, 246],
        [16, 185, 129],
        [245, 158, 11],
        [139, 92, 246],
      ];
      const catData = [
        { name: "Transport", pct: 38, kg: 101 },
        { name: "Energy", pct: 27, kg: 72 },
        { name: "Food", pct: 21, kg: 56 },
        { name: "Shopping", pct: 14, kg: 37 },
      ];

      catData.forEach((cat, i) => {
        const y = 183 + i * 12;
        doc.setFillColor(catColors[i][0], catColors[i][1], catColors[i][2]);
        doc.roundedRect(15, y, (cat.pct / 100) * 120, 7, 2, 2, "F");
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.setFontSize(9);
        doc.text(`${cat.name}: ${cat.pct}% (${cat.kg} kg)`, 140, y + 5.5);
      });

      // Section: Recommendations
      doc.setTextColor(emeraldColor[0], emeraldColor[1], emeraldColor[2]);
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.text("Top Recommendations", 15, 240);

      const recData = [
        "Switch to EV or public transit → saves 800 kg/yr",
        "Reduce meat to 3x/week → saves 300 kg/yr",
        "Use renewable energy → saves 400 kg/yr",
      ];
      recData.forEach((rec, i) => {
        const y = 248 + i * 10;
        doc.setFillColor(emeraldColor[0], emeraldColor[1], emeraldColor[2]);
        doc.circle(17, y - 1.5, 1.5, "F");
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.text(rec, 22, y);
      });

      // Footer
      doc.setFillColor(emeraldColor[0], emeraldColor[1], emeraldColor[2]);
      doc.rect(0, 287, 210, 10, "F");
      doc.setTextColor(10, 20, 15);
      doc.setFontSize(8);
      doc.text("Trace • trace.ai • Building a sustainable future", 105, 293, { align: "center" });

      doc.save(`Trace_Report_${new Date().toISOString().split("T")[0]}.pdf`);
      toast.success("PDF report downloaded! 🌿");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-400" />
            Sustainability Report
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            December 2024 — Monthly summary
          </p>
        </div>
        <Button
          onClick={handleDownload}
          disabled={generating}
          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl glow-green-sm"
        >
          {generating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </>
          )}
        </Button>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Monthly Footprint", value: "265 kg", sub: "CO₂ equivalent", icon: Leaf, color: "text-emerald-400" },
          { label: "Reduction vs Goal", value: "-12.4%", sub: "vs 300 kg target", icon: TrendingDown, color: "text-teal-400" },
          { label: "Sustainability Score", value: "72", sub: "/ 100 — Good", icon: Star, color: "text-yellow-400" },
          { label: "Achievements", value: "3", sub: "this month", icon: Award, color: "text-violet-400" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-dark rounded-2xl p-5 border border-white/5"
            >
              <Icon className={cn("w-5 h-5 mb-3", s.color)} />
              <p className={cn("text-2xl font-bold", s.color)}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              <p className="text-[10px] text-muted-foreground/60">{s.sub}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Monthly Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-dark rounded-2xl p-6 border border-white/5"
      >
        <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-emerald-400" />
          6-Month Carbon Trend
        </h2>
        <ReportChart data={monthlyData} />
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-dark rounded-2xl p-6 border border-white/5"
      >
        <h2 className="text-base font-semibold mb-4">AI Recommendations</h2>
        <div className="space-y-3">
          {recommendations.map((rec, i) => (
            <div key={i} className={cn(
              "flex items-start gap-3 p-3 rounded-xl transition-colors",
              rec.done ? "bg-emerald-500/5" : "bg-muted/30"
            )}>
              <div className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                rec.done ? "bg-emerald-500" : "border border-border"
              )}>
                {rec.done && <CheckCircle2 className="w-3 h-3 text-white" />}
              </div>
              <div className="flex-1">
                <p className={cn("text-sm", rec.done && "line-through text-muted-foreground")}>{rec.text}</p>
                <p className="text-xs text-emerald-400 mt-0.5">{rec.impact}</p>
              </div>
              {rec.done && <Badge className="text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Done ✓</Badge>}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
