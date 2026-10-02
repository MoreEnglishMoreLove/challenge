import React, { useState } from "react";
import { 
  Key, Sparkles, MessageCircle, AlertCircle, Shield, 
  HelpCircle, ArrowLeft, BookOpen, Award, CheckCircle2 
} from "lucide-react";
import confetti from "canvas-confetti";
import { 
  activateStudentAccount, 
  getStudentRequestWhatsAppUrl, 
  TEACHER_NAME, 
  TEACHER_PHONE,
  ActivationData
} from "../utils/security";

interface LockScreenProps {
  onActivated: (data: ActivationData) => void;
  onOpenTeacherPortal: () => void;
  expiredNotice?: boolean;
}

export const LockScreen: React.FC<LockScreenProps> = ({ 
  onActivated, 
  onOpenTeacherPortal,
  expiredNotice = false
}) => {
  const [studentName, setStudentName] = useState("");
  const [code, setCode] = useState("");
  const [errorMsg, setErrorMsg] = useState(
    expiredNotice ? "انتهت فترة صلاحية الاشتراك (6 أشهر). يرجى التواصل مع المعلمة جيداء صقر للحصول على كود تجديد جديد." : ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successCelebration, setSuccessCelebration] = useState(false);

  // Auto-format code as MEML-XXXX-XXXX
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, "");
    // Ensure MEML- prefix convenience
    setCode(val);
    setErrorMsg("");
  };

  const handleQuickPasteFormat = () => {
    navigator.clipboard.readText().then(text => {
      if (text) {
        setCode(text.trim().toUpperCase());
      }
    }).catch(() => {});
  };

  const handleActivation = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!studentName.trim() || studentName.trim().length < 2) {
      setErrorMsg("يرجى إدخال اسمك الكامل بشكل صحيح كما تم تسجيله لدى المعلمة جيداء صقر.");
      return;
    }

    if (!code.trim()) {
      setErrorMsg("يرجى إدخال كود التفعيل الممنوح لك من قبل المعلمة جيداء صقر بصيغة (MEML-XXXX-XXXX).");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const result = activateStudentAccount(studentName, code);
      setIsSubmitting(false);

      if (result.success && result.data) {
        setSuccessCelebration(true);
        // Confetti burst
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });

        setTimeout(() => {
          if (result.data) {
            onActivated(result.data);
          }
        }, 1200);
      } else {
        setErrorMsg(result.error || "كود التفعيل غير صحيح أو غير مطابق للاسم المكتوب!");
      }
    }, 400);
  };

  const whatsappRequestUrl = getStudentRequestWhatsAppUrl(studentName.trim());

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden selection:bg-amber-500/30">
      
      {/* Background ambient decorative glows */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar with Teacher Portal Access */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 font-brand">
            M
          </div>
          <div>
            <span className="font-brand font-black text-sm tracking-wider text-white">MORE ENGLISH</span>
            <span className="block text-[10px] text-amber-400 font-bold -mt-1">MORE LOVE</span>
          </div>
        </div>

        <button
          onClick={onOpenTeacherPortal}
          className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/40 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition shadow-sm"
        >
          <Shield className="w-3.5 h-3.5 text-amber-400" />
          <span>بوابة المعلمة (Teacher Portal)</span>
        </button>
      </header>

      {/* Main Lock Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 my-2">
        <div className="w-full max-w-lg bg-slate-900/90 border border-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-indigo-950/50 p-6 sm:p-8 relative overflow-hidden">
          
          {/* Top glowing accent border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-indigo-500 to-amber-500" />

          {/* Header & Teacher Attribution */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-700 text-white shadow-xl shadow-indigo-600/30 mb-3 border border-indigo-400/30">
              <Key className="w-7 h-7 text-amber-300" />
            </div>

            <h1 className="font-brand text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-1">
              MORE ENGLISH MORE LOVE
            </h1>
            <p className="text-sm font-semibold text-amber-400 flex items-center justify-center gap-1.5">
              <span>بإشراف وتدريس المعلمة</span>
              <strong className="text-white bg-amber-500/20 px-2 py-0.5 rounded-lg border border-amber-500/30">
                {TEACHER_NAME}
              </strong>
            </p>
            <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
              المنصة التفاعلية الخاصة بطلاب منهاج اللغة الإنجليزية. أدخل اسمك وكود التفعيل الحصري للوصول إلى المنهاج وأوراق العمل التفاعلية.
            </p>
          </div>

          {/* Success Animation Modal inside Card */}
          {successCelebration ? (
            <div className="py-8 text-center animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-emerald-500/20 border-2 border-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">تم التحقق والتفعيل بنجاح!</h3>
              <p className="text-sm text-emerald-400 mb-2 font-semibold">أهلاً بك يا {studentName}</p>
              <p className="text-xs text-slate-400">جاري فتح المنهاج الدراسي الكامل وصلاحية 6 أشهر...</p>
            </div>
          ) : (
            /* Student Input Form */
            <form onSubmit={handleActivation} className="space-y-4">
              
              {/* Student Name */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  اسم الطالب الكامل (كما سجلته لدى المعلمة جيداء) *
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => {
                    setStudentName(e.target.value);
                    setErrorMsg("");
                  }}
                  placeholder="مثال: ياسمين أحمد الشام / Omar Farooq"
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-700 hover:border-slate-600 focus:border-amber-400 rounded-2xl text-white placeholder-slate-500 text-sm focus:outline-none transition shadow-inner"
                  required
                  autoFocus
                />
              </div>

              {/* Activation Code */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    كود التفعيل السري المخصص لاسمك *
                  </label>
                  <button
                    type="button"
                    onClick={handleQuickPasteFormat}
                    className="text-[11px] text-amber-400 hover:text-amber-300 transition"
                  >
                    لصق من الحافظة
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={code}
                    onChange={handleCodeChange}
                    placeholder="MEML-XXXX-XXXX"
                    className="w-full px-4 py-3 bg-slate-950/80 border border-slate-700 hover:border-slate-600 focus:border-amber-400 rounded-2xl text-amber-300 placeholder-slate-600 text-base font-mono tracking-wider focus:outline-none transition shadow-inner text-center font-bold"
                    required
                  />
                  <div className="absolute left-3 top-3 text-slate-500">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  * كود رياضي مشفر بصيغة (MEML-XXXX-XXXX) مرتبط باسمك حصراً.
                </p>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                  <span className="leading-relaxed">{errorMsg}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm sm:text-base rounded-2xl shadow-xl shadow-amber-500/25 transition transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>جاري التحقق والمطابقة الرياضية...</span>
                ) : (
                  <>
                    <BookOpen className="w-5 h-5" />
                    <span>تفعيل الحساب والدخول للمنهاج</span>
                    <ArrowLeft className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-1">
                <span className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  صلاحية 6 أشهر (180 يوماً) كاملة مع حفظ الجلسة على جهازك
                </span>
              </div>
            </form>
          )}

          {/* WhatsApp Direct Help Section (Section 5 from prompt) */}
          <div className="mt-6 pt-5 border-t border-slate-800">
            <div className="bg-slate-950/60 border border-emerald-500/20 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1.5 text-emerald-400">
                <HelpCircle className="w-4 h-4 shrink-0" />
                <h4 className="text-xs font-bold text-white">كيف أحصل على كود تفعيل؟</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                تواصل مباشرة مع المعلمة <strong>جيداء صقر</strong> عبر واتساب ليتم توليد كود التفعيل المخصص لاسمك وإرساله لك فوراً:
              </p>

              <a
                href={whatsappRequestUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>طلب الكود من المعلمة جيداء عبر واتساب ({TEACHER_PHONE})</span>
              </a>
            </div>
          </div>

        </div>
      </main>

      {/* Footer Branding */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-4 py-4 text-center text-xs text-slate-500">
        <p>
          جميع الحقوق محفوظة لمنهاج <strong>MORE ENGLISH MORE LOVE</strong> • إشراف وتدريس المعلمة <strong>جيداء صقر</strong>
        </p>
      </footer>
    </div>
  );
};
