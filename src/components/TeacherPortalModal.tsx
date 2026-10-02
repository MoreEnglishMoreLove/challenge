import React, { useState } from "react";
import { 
  X, KeyRound, Sparkles, Copy, Check, MessageSquare, 
  Trash2, Search, Users, ShieldCheck, CheckCircle2, AlertCircle 
} from "lucide-react";
import { 
  ADMIN_PIN, 
  generateStudentCode, 
  verifyStudentCode, 
  saveCodeToHistory, 
  getSavedCodesHistory, 
  removeCodeFromHistory, 
  getTeacherSendCodeWhatsAppMessage, 
  getTeacherWhatsAppSendUrl, 
  GeneratedCodeRecord,
  TEACHER_PHONE
} from "../utils/security";

interface TeacherPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherPortalModal: React.FC<TeacherPortalModalProps> = ({ isOpen, onClose }) => {
  const [pinInput, setPinInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState("");

  // Single code generation state
  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  // Batch generation state
  const [batchNames, setBatchNames] = useState("");
  const [batchResults, setBatchResults] = useState<{ name: string; code: string }[]>([]);

  // Verifier tool state
  const [verifyName, setVerifyName] = useState("");
  const [verifyCodeInput, setVerifyCodeInput] = useState("");
  const [verifyResult, setVerifyResult] = useState<{ checked: boolean; isValid: boolean } | null>(null);

  // History state
  const [searchHistory, setSearchHistory] = useState("");
  const [history, setHistory] = useState<GeneratedCodeRecord[]>(() => getSavedCodesHistory());
  const [activeTab, setActiveTab] = useState<"generate" | "batch" | "verify" | "history">("generate");

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === ADMIN_PIN) {
      setIsAuthenticated(true);
      setPinError("");
      setHistory(getSavedCodesHistory());
    } else {
      setPinError("رمز الدخول السري غير صحيح! يرجى إدخال الرمز الدائم للمعلّمة.");
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || studentName.trim().length < 2) {
      alert("يرجى إدخال اسم الطالب الكامل (حرفين على الأقل)");
      return;
    }

    const code = generateStudentCode(studentName);
    setGeneratedCode(code);
    saveCodeToHistory(studentName, code, studentPhone ? `هاتف: ${studentPhone}` : undefined);
    setHistory(getSavedCodesHistory());
    setCopiedCode(false);
    setCopiedMessage(false);
  };

  const handleBatchGenerate = () => {
    const lines = batchNames.split("\n").map(l => l.trim()).filter(l => l.length >= 2);
    if (lines.length === 0) {
      alert("يرجى كتابة أسماء الطلاب، كل اسم في سطر مستقل.");
      return;
    }

    const results = lines.map(name => {
      const code = generateStudentCode(name);
      saveCodeToHistory(name, code, "توليد دفعة");
      return { name, code };
    });

    setBatchResults(results);
    setHistory(getSavedCodesHistory());
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyName.trim() || !verifyCodeInput.trim()) return;
    const isValid = verifyStudentCode(verifyName, verifyCodeInput);
    setVerifyResult({ checked: true, isValid });
  };

  const copyToClipboard = (text: string, isMsg = false) => {
    navigator.clipboard.writeText(text);
    if (isMsg) {
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2000);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleDeleteHistoryItem = (id: string) => {
    if (confirm("هل أنت متأكدة من حذف هذا الكود من السجل؟")) {
      removeCodeFromHistory(id);
      setHistory(getSavedCodesHistory());
    }
  };

  const filteredHistory = history.filter(item => 
    item.studentName.toLowerCase().includes(searchHistory.toLowerCase()) ||
    item.code.toLowerCase().includes(searchHistory.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl shadow-amber-500/10 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                لوحة تحكم المعلمة | جيداء صقر
                <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-normal">
                  Admin Portal
                </span>
              </h2>
              <p className="text-xs text-slate-400">نظام التوليد الرياضي المستقل لأكواد الطلاب (MEML)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!isAuthenticated ? (
          /* PIN Entry Screen */
          <div className="p-8 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/30 rounded-3xl flex items-center justify-center text-indigo-400 mb-4 shadow-lg shadow-indigo-500/10">
              <KeyRound className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">تسجيل الدخول إلى بوابة المعلمة</h3>
            <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
              هذه اللوحة مخصصة للأستاذة <strong className="text-amber-300">جيداء صقر</strong> لإدارة وتوليد أكواد التفعيل لطلابها. يرجى إدخال الرمز السري الدائم للمتابعة.
            </p>

            <form onSubmit={handlePinSubmit} className="w-full max-w-sm space-y-4">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="أدخل الرمز السري للمعلّمة (Admin PIN)..."
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-2xl text-white placeholder-slate-500 text-center font-mono text-lg focus:outline-none focus:border-amber-400 transition"
                  autoFocus
                />
              </div>

              {pinError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2 text-right">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{pinError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-2xl shadow-lg shadow-amber-500/20 transition transform active:scale-95"
              >
                دخول إلى لوحة التوليد
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 pt-3 gap-2">
              <button
                onClick={() => setActiveTab("generate")}
                className={`px-4 py-2.5 text-sm font-semibold rounded-t-xl transition flex items-center gap-2 border-b-2 ${
                  activeTab === "generate"
                    ? "bg-slate-900 border-amber-500 text-amber-400"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                توليد كود لطالب
              </button>
              <button
                onClick={() => setActiveTab("batch")}
                className={`px-4 py-2.5 text-sm font-semibold rounded-t-xl transition flex items-center gap-2 border-b-2 ${
                  activeTab === "batch"
                    ? "bg-slate-900 border-amber-500 text-amber-400"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Users className="w-4 h-4" />
                توليد قائمة طلاب (دفعة)
              </button>
              <button
                onClick={() => setActiveTab("verify")}
                className={`px-4 py-2.5 text-sm font-semibold rounded-t-xl transition flex items-center gap-2 border-b-2 ${
                  activeTab === "verify"
                    ? "bg-slate-900 border-amber-500 text-amber-400"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                فحص كود
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`px-4 py-2.5 text-sm font-semibold rounded-t-xl transition flex items-center gap-2 border-b-2 ${
                  activeTab === "history"
                    ? "bg-slate-900 border-amber-500 text-amber-400"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Search className="w-4 h-4" />
                سجل الأكواد ({history.length})
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === "generate" && (
                <div className="space-y-6 max-w-xl mx-auto">
                  <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5">
                    <h4 className="font-bold text-white mb-1 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      توليد كود تفعيل فوري باسم الطالب
                    </h4>
                    <p className="text-xs text-slate-400 mb-4">
                      المعادلة الرياضية تربط اسم الطالب الحقيقي بالكود المشفر حصرياً له. الكود صالح لمدة 6 أشهر من لحظة تفعيله.
                    </p>

                    <form onSubmit={handleGenerate} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          اسم الطالب الكامل *
                        </label>
                        <input
                          type="text"
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          placeholder="مثال: أحمد عبد الله الشامي / Sarah Miller"
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          رقم واتساب الطالب (اختياري للإرسال المباشر)
                        </label>
                        <input
                          type="text"
                          value={studentPhone}
                          onChange={(e) => setStudentPhone(e.target.value)}
                          placeholder="مثال: +963912345678"
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-5 h-5" />
                        توليد الكود المشفر الآن
                      </button>
                    </form>
                  </div>

                  {generatedCode && (
                    <div className="bg-gradient-to-br from-indigo-950/80 to-slate-900 border-2 border-amber-500/40 rounded-2xl p-5 shadow-xl animate-in fade-in duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-amber-300 bg-amber-500/20 px-2.5 py-1 rounded-full border border-amber-500/30">
                          تم التوليد بنجاح للطالب: {studentName}
                        </span>
                        <span className="text-xs text-slate-400">صلاحية 6 أشهر</span>
                      </div>

                      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center my-3">
                        <span className="font-mono text-2xl md:text-3xl font-extrabold tracking-widest text-amber-400 select-all">
                          {generatedCode}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                        <button
                          onClick={() => copyToClipboard(generatedCode, false)}
                          className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition flex items-center justify-center gap-2 border border-slate-700"
                        >
                          {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                          {copiedCode ? "تم نسخ الكود!" : "نسخ الكود فقط"}
                        </button>

                        <button
                          onClick={() => copyToClipboard(getTeacherSendCodeWhatsAppMessage(studentName, generatedCode), true)}
                          className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition flex items-center justify-center gap-2 border border-slate-700"
                        >
                          {copiedMessage ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                          {copiedMessage ? "تم نسخ الرسالة الترحيبية!" : "نسخ رسالة الترحيب والشرح"}
                        </button>
                      </div>

                      <div className="mt-3">
                        <a
                          href={getTeacherWhatsAppSendUrl(studentPhone, getTeacherSendCodeWhatsAppMessage(studentName, generatedCode))}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2"
                        >
                          <MessageSquare className="w-4 h-4" />
                          إرسال مباشرة للطالب عبر واتساب
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "batch" && (
                <div className="space-y-4 max-w-xl mx-auto">
                  <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5">
                    <h4 className="font-bold text-white mb-1 flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-400" />
                      توليد أكواد لمجموعة طلاب دفعة واحدة
                    </h4>
                    <p className="text-xs text-slate-400 mb-4">
                      اكتبي أسماء طلاب الشعبة أو الصف، كل اسم في سطر جديد، وسيتم توليد كود خاص بكل اسم فوراً.
                    </p>

                    <textarea
                      rows={5}
                      value={batchNames}
                      onChange={(e) => setBatchNames(e.target.value)}
                      placeholder={`محمد خالد العلي\nسارة أحمد الشام\nعمر فاروق حسن\nLina Mansour`}
                      className="w-full p-4 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-amber-400 leading-relaxed font-sans"
                    />

                    <button
                      onClick={handleBatchGenerate}
                      className="w-full mt-3 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      توليد جميع الأكواد
                    </button>
                  </div>

                  {batchResults.length > 0 && (
                    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-emerald-400">
                          تم توليد {batchResults.length} كود تفعيل
                        </span>
                        <button
                          onClick={() => {
                            const summary = batchResults.map(r => `${r.name}: ${r.code}`).join("\n");
                            navigator.clipboard.writeText(summary);
                            alert("تم نسخ القائمة بالكامل إلى الحافظة!");
                          }}
                          className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" /> نسخ الكل
                        </button>
                      </div>

                      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                        {batchResults.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs">
                            <span className="font-semibold text-slate-200">{item.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-amber-400 font-bold">{item.code}</span>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(item.code);
                                  alert(`تم نسخ كود ${item.name}`);
                                }}
                                className="p-1 hover:text-amber-400"
                                title="نسخ"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "verify" && (
                <div className="space-y-4 max-w-xl mx-auto">
                  <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5">
                    <h4 className="font-bold text-white mb-1 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      فحص واختبار صحة كود تفعيل
                    </h4>
                    <p className="text-xs text-slate-400 mb-4">
                      يمكنك التحقق فورياً ومحلياً هل الكود المعطى يطابق اسم الطالب المسجل وفق المعادلة المشفرة.
                    </p>

                    <form onSubmit={handleVerify} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          اسم الطالب المراد فحصه
                        </label>
                        <input
                          type="text"
                          value={verifyName}
                          onChange={(e) => {
                            setVerifyName(e.target.value);
                            setVerifyResult(null);
                          }}
                          placeholder="الاسم المسجل..."
                          className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          الكود المدخل (MEML-XXXX-XXXX)
                        </label>
                        <input
                          type="text"
                          value={verifyCodeInput}
                          onChange={(e) => {
                            setVerifyCodeInput(e.target.value);
                            setVerifyResult(null);
                          }}
                          placeholder="MEML-..."
                          className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm font-mono focus:outline-none focus:border-amber-400"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 transition"
                      >
                        التحقق من التطابق الآن
                      </button>
                    </form>

                    {verifyResult && (
                      <div className={`mt-4 p-4 rounded-xl border ${
                        verifyResult.isValid
                          ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300"
                          : "bg-rose-500/10 border-rose-500/40 text-rose-300"
                      }`}>
                        <div className="flex items-center gap-2 font-bold text-sm">
                          {verifyResult.isValid ? (
                            <>
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                              <span>الكود صحيح ومطابق تماماً لاسم الطالب!</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-5 h-5 text-rose-400" />
                              <span>الكود غير صحيح وغير مطابق لهذا الاسم!</span>
                            </>
                          )}
                        </div>
                        <p className="text-xs mt-1 text-slate-300">
                          الكود الصحيح لهذا الاسم هو: <strong className="font-mono text-amber-300">{generateStudentCode(verifyName)}</strong>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "history" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                      <input
                        type="text"
                        value={searchHistory}
                        onChange={(e) => setSearchHistory(e.target.value)}
                        placeholder="بحث بالاسم أو الكود..."
                        className="w-full pr-9 pl-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <span className="text-xs text-slate-400 shrink-0">
                      الإجمالي: {filteredHistory.length} كود
                    </span>
                  </div>

                  {filteredHistory.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 text-sm">
                      لا توجد أكواد مولدة مطابقة للبحث
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                      {filteredHistory.map((item) => (
                        <div
                          key={item.id}
                          className="bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-xl p-3 flex items-center justify-between gap-3 text-xs transition"
                        >
                          <div>
                            <div className="font-bold text-white text-sm mb-0.5">
                              {item.studentName}
                            </div>
                            <div className="flex items-center gap-2 text-slate-400">
                              <span className="font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                                {item.code}
                              </span>
                              <span>• {new Date(item.createdAt).toLocaleDateString("ar-EG")}</span>
                              {item.notes && <span className="text-slate-500">({item.notes})</span>}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(item.code);
                                alert("تم نسخ الكود");
                              }}
                              className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-800"
                              title="نسخ الكود"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <a
                              href={getTeacherWhatsAppSendUrl("", getTeacherSendCodeWhatsAppMessage(item.studentName, item.code))}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 rounded-lg border border-emerald-500/30"
                              title="إرسال عبر واتساب"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>
                            <button
                              onClick={() => handleDeleteHistoryItem(item.id)}
                              className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/20"
                              title="حذف"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer with Teacher direct phone badge */}
            <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>المعلمة المشرفة: <strong>جيداء صقر</strong> ({TEACHER_PHONE})</span>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-slate-400 hover:text-rose-400 transition"
              >
                قفل البوابة
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
