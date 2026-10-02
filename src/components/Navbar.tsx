import React from "react";
import { 
  BookOpen, Mic, Headphones, BookMarked, Scale, Atom, 
  FileCheck, Shield, Clock, LogOut, UserCheck
} from "lucide-react";
import { ActivationData, TEACHER_NAME } from "../utils/security";

export type SectionType = 
  | "reading"
  | "speaking"
  | "listening"
  | "vocabulary"
  | "grammar"
  | "physics"
  | "worksheets";

interface NavbarProps {
  activation: ActivationData;
  remainingDays: number;
  remainingHours: number;
  activeSection: SectionType;
  onSelectSection: (sec: SectionType) => void;
  onOpenTeacherPortal: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activation,
  remainingDays,
  remainingHours,
  activeSection,
  onSelectSection,
  onOpenTeacherPortal,
  onLogout
}) => {
  const navItems: { id: SectionType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: "reading", label: "1. القراءة والاستيعاب", icon: <BookOpen className="w-4 h-4" /> },
    { id: "speaking", label: "2. المحادثة والاستبيان", icon: <Mic className="w-4 h-4" /> },
    { id: "listening", label: "3. الاستماع التفاعلي", icon: <Headphones className="w-4 h-4" /> },
    { id: "vocabulary", label: "4. بنك المفردات", icon: <BookMarked className="w-4 h-4" /> },
    { id: "grammar", label: "5. القواعد والأزمنة", icon: <Scale className="w-4 h-4" /> },
    { id: "physics", label: "6. علوم الفيزياء", icon: <Atom className="w-4 h-4" /> },
    { id: "worksheets", label: "7. أوراق العمل والحلول", icon: <FileCheck className="w-4 h-4" />, badge: "7 أوراق" }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      {/* Top Banner: Student Status & Expiration Countdown */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 px-4 py-2 border-b border-slate-800/80 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Student Info */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2.5 py-1 rounded-full font-semibold">
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>الطالب: <strong>{activation.studentName}</strong></span>
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-400 font-mono text-[11px]">
              الكود: {activation.code}
            </span>
          </div>

          {/* 6-Month Expiration Countdown Badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full font-bold">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>
                الصلاحية المتبقية: {remainingDays} يوماً و {remainingHours} ساعة
              </span>
            </div>

            <button
              onClick={onOpenTeacherPortal}
              className="hidden md:flex items-center gap-1 text-slate-400 hover:text-amber-400 transition"
              title="بوابة المعلمة"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>بوابة المعلمة</span>
            </button>

            <button
              onClick={onLogout}
              className="flex items-center gap-1 text-slate-400 hover:text-rose-400 transition"
              title="تسجيل خروج / تغيير الحساب"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">خروج</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header with Logo & Teacher Branding */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 font-brand text-lg">
            M
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-brand font-black text-lg md:text-xl tracking-wider text-white">
                MORE ENGLISH MORE LOVE
              </h1>
            </div>
            <p className="text-xs text-amber-400 font-semibold flex items-center gap-1">
              <span>إشراف وتدريس:</span>
              <span className="text-white font-bold">{TEACHER_NAME}</span>
            </p>
          </div>
        </div>

        {/* Quick Teacher Portal Button on Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenTeacherPortal}
            className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-amber-400"
            title="بوابة المعلمة"
          >
            <Shield className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 7 Section Navigation Tabs */}
      <nav className="max-w-7xl mx-auto px-4 overflow-x-auto scrollbar-none pb-2">
        <div className="flex items-center gap-1.5 min-w-max">
          {navItems.map((item) => {
            const isSelected = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectSection(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap border ${
                  isSelected
                    ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20"
                    : "bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-md font-bold ${
                      isSelected
                        ? "bg-slate-950 text-amber-300"
                        : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
