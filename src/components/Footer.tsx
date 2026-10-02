import React from "react";
import { MessageCircle, ExternalLink, Heart, Send, Youtube, Facebook, Instagram } from "lucide-react";
import { TEACHER_SOCIAL_LINKS } from "../data/curriculumData";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 py-10 px-4 mt-16">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Brand & Teacher Intro */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-8">
          <div className="text-center md:text-right">
            <h3 className="font-brand font-black text-2xl text-white tracking-wider flex items-center justify-center md:justify-start gap-2">
              MORE ENGLISH MORE LOVE
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            </h3>
            <p className="text-sm text-amber-400 font-semibold mt-1">
              إشراف وتدريس المعلمة: <span className="text-white underline">{TEACHER_SOCIAL_LINKS.teacherNameAr}</span> ({TEACHER_SOCIAL_LINKS.teacherName})
            </p>
            <p className="text-xs text-slate-500 mt-1 max-w-lg">
              المنهاج التفاعلي المعتمد لتعزيز مهارات القراءة، المحادثة، الاستماع، المفردات، القواعد والفيزياء باللغة الإنجليزية.
            </p>
          </div>

          {/* Direct WhatsApp Call to Action */}
          <div className="flex items-center gap-3">
            <a
              href={TEACHER_SOCIAL_LINKS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-emerald-600/20 transition transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>تواصل عبر واتساب: {TEACHER_SOCIAL_LINKS.whatsapp}</span>
            </a>
          </div>
        </div>

        {/* Official Social Channels as extracted from curriculum worksheets */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <a
            href={TEACHER_SOCIAL_LINKS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/40 rounded-2xl transition group"
          >
            <div className="p-2 bg-blue-600/10 text-blue-400 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition">
              <Facebook className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-200 group-hover:text-blue-400">Facebook Page</span>
              <span className="text-[10px] text-slate-500">MoreEnglishMoreLove</span>
            </div>
            <ExternalLink className="w-3 h-3 text-slate-600 mr-auto" />
          </a>

          <a
            href={TEACHER_SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-rose-500/40 rounded-2xl transition group"
          >
            <div className="p-2 bg-rose-600/10 text-rose-400 rounded-xl group-hover:bg-rose-600 group-hover:text-white transition">
              <Youtube className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-200 group-hover:text-rose-400">YouTube</span>
              <span className="text-[10px] text-slate-500">@MoreEnglishMoreLove</span>
            </div>
            <ExternalLink className="w-3 h-3 text-slate-600 mr-auto" />
          </a>

          <a
            href={TEACHER_SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-pink-500/40 rounded-2xl transition group"
          >
            <div className="p-2 bg-pink-600/10 text-pink-400 rounded-xl group-hover:bg-pink-600 group-hover:text-white transition">
              <Instagram className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-200 group-hover:text-pink-400">Instagram</span>
              <span className="text-[10px] text-slate-500">moreenglishmorelove</span>
            </div>
            <ExternalLink className="w-3 h-3 text-slate-600 mr-auto" />
          </a>

          <a
            href={TEACHER_SOCIAL_LINKS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/40 rounded-2xl transition group"
          >
            <div className="p-2 bg-sky-600/10 text-sky-400 rounded-xl group-hover:bg-sky-600 group-hover:text-white transition">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-200 group-hover:text-sky-400">Telegram</span>
              <span className="text-[10px] text-slate-500">moreenglishmorelove</span>
            </div>
            <ExternalLink className="w-3 h-3 text-slate-600 mr-auto" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-slate-500 pt-4">
          <p>© جميع الحقوق محفوظة لتطبيق MORE ENGLISH MORE LOVE • المعلمة جيداء صقر</p>
        </div>
      </div>
    </footer>
  );
};
