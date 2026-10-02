import React, { useState } from "react";
import { 
  FileCheck, CheckCircle2, Eye, Printer, Award, 
  HelpCircle, Check, X, Sparkles, ChevronRight, ChevronLeft, BookmarkCheck 
} from "lucide-react";
import confetti from "canvas-confetti";
import { CURRICULUM_WORKSHEETS, WorksheetItem, TEACHER_SOCIAL_LINKS } from "../../data/curriculumData";

export const WorksheetsSection: React.FC = () => {
  const [selectedSheetId, setSelectedSheetId] = useState<number>(1);
  const [mode, setMode] = useState<"interactive" | "modelAnswers">("interactive");
  
  // Student answers per question: { [questionId]: string }
  const [studentAnswers, setStudentAnswers] = useState<Record<string, string>>({});
  const [submittedSheets, setSubmittedSheets] = useState<Record<number, boolean>>({});

  const currentSheet: WorksheetItem = CURRICULUM_WORKSHEETS.find(w => w.id === selectedSheetId) || CURRICULUM_WORKSHEETS[0];

  const handleSelectAnswer = (qId: string, ans: string) => {
    setStudentAnswers(prev => ({ ...prev, [qId]: ans }));
  };

  const handleGradeSheet = () => {
    setSubmittedSheets(prev => ({ ...prev, [currentSheet.id]: true }));
    
    // Calculate score
    let totalQuestions = 0;
    let correctCount = 0;
    currentSheet.sections.forEach(sec => {
      sec.questions.forEach(q => {
        totalQuestions++;
        const studentAns = studentAnswers[q.id];
        if (studentAns && studentAns.trim().toLowerCase() === q.modelAnswer.trim().toLowerCase()) {
          correctCount++;
        }
      });
    });

    if (correctCount === totalQuestions) {
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Compute current sheet stats
  const allCurrentQuestions = currentSheet.sections.flatMap(s => s.questions);
  const isSheetSubmitted = submittedSheets[currentSheet.id];
  const correctCount = allCurrentQuestions.filter(q => {
    const a = studentAnswers[q.id];
    return a && a.trim().toLowerCase() === q.modelAnswer.trim().toLowerCase();
  }).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-bold mb-2">
              <FileCheck className="w-3.5 h-3.5" />
              <span>القسم السابع: أوراق عمل المنهاج والحلول النموذجية (7 Curriculum Worksheets)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              أوراق العمل الرسمية السبعة بإشراف المعلمة جيداء صقر
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              تطابق كامل وشامل مع أوراق عمل المنهاج المعتمدة، مع إمكانية الحل التفاعلي الفوري، والاطلاع على الحلول النموذجية، أو الطباعة للمذاكرة.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Mode switch */}
            <div className="bg-slate-950 p-1 rounded-2xl border border-slate-800 flex items-center gap-1">
              <button
                onClick={() => setMode("interactive")}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
                  mode === "interactive"
                    ? "bg-amber-500 text-slate-950 shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                حل تفاعلي للطالب
              </button>
              <button
                onClick={() => setMode("modelAnswers")}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  mode === "modelAnswers"
                    ? "bg-emerald-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <BookmarkCheck className="w-3.5 h-3.5" />
                <span>الحلول النموذجية المعتمدة</span>
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition"
              title="طباعة ورقة العمل"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 7 Worksheets Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mt-6 pt-5 border-t border-slate-800/80">
          {CURRICULUM_WORKSHEETS.map((ws) => (
            <button
              key={ws.id}
              onClick={() => setSelectedSheetId(ws.id)}
              className={`p-3 rounded-2xl text-right transition border flex flex-col justify-between ${
                selectedSheetId === ws.id
                  ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20"
                  : "bg-slate-950 hover:bg-slate-850 text-slate-300 border-slate-800"
              }`}
            >
              <div>
                <span className={`text-[10px] font-bold block ${selectedSheetId === ws.id ? "text-slate-900" : "text-amber-400"}`}>
                  ورقة عمل {ws.id}
                </span>
                <span className="text-xs font-extrabold line-clamp-1 block mt-0.5">
                  {ws.pageNumber}
                </span>
              </div>
              <span className={`text-[9px] mt-2 block opacity-80 ${selectedSheetId === ws.id ? "text-slate-900" : "text-slate-400"}`}>
                {ws.unit}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Worksheet Body (Print Optimized Container) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 relative overflow-hidden print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
        
        {/* Printable Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 print:border-black pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-full font-bold text-xs print:text-black print:border-black">
                {currentSheet.unit} • {currentSheet.pageNumber}
              </span>
              {mode === "modelAnswers" && (
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full font-bold text-xs print:text-black">
                  الحل النموذجي المعتمد من المعلمة جيداء صقر ✓
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white print:text-black mt-2">
              {currentSheet.titleAr}
            </h3>
            <p className="text-xs text-slate-400 print:text-gray-600 mt-1">
              {currentSheet.titleEn}
            </p>
          </div>

          <div className="text-left sm:text-right text-xs text-slate-400 print:text-black">
            <p className="font-bold text-amber-400 print:text-black">MORE ENGLISH MORE LOVE</p>
            <p>إشراف وتدريس: <strong>المعلمة جيداء صقر</strong></p>
            <p className="font-mono text-[11px] text-slate-500 print:text-gray-600">+963933036079</p>
          </div>
        </div>

        {/* Score banner if submitted */}
        {isSheetSubmitted && mode === "interactive" && (
          <div className="p-4 bg-gradient-to-r from-indigo-950 to-slate-950 border border-amber-500/40 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/20 text-amber-300 rounded-xl">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">نتيجة تقييم ورقة العمل:</h4>
                <p className="text-xs text-amber-300">
                  أجبت بشكل صحيح على <strong>{correctCount}</strong> من أصل <strong>{allCurrentQuestions.length}</strong> أسئلة
                </p>
              </div>
            </div>
            <button
              onClick={() => setMode("modelAnswers")}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition"
            >
              عرض الإجابات النموذجية المفصلة
            </button>
          </div>
        )}

        {/* Worksheet Sections */}
        <div className="space-y-10">
          {currentSheet.sections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-4">
              <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 print:bg-gray-100 print:border-black">
                <h4 className="font-bold text-amber-300 print:text-black text-sm sm:text-base">
                  {section.title}
                </h4>
                <p className="text-xs text-slate-400 print:text-gray-700">
                  {section.instructionsAr} ({section.instructionsEn})
                </p>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {section.questions.map((q, qIdx) => {
                  const studentAns = studentAnswers[q.id];
                  const isSubmitted = isSheetSubmitted || mode === "modelAnswers";
                  const isCorrect = studentAns?.trim().toLowerCase() === q.modelAnswer.trim().toLowerCase();

                  return (
                    <div
                      key={q.id}
                      className="bg-slate-950/50 border border-slate-800 print:border-gray-300 rounded-2xl p-5 space-y-3 print:bg-white"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-0.5">
                          <p className="font-sans font-bold text-sm text-white print:text-black">
                            {qIdx + 1}. {q.promptEn}
                          </p>
                          {q.promptAr && (
                            <p className="text-xs text-slate-400 print:text-gray-600">
                              {q.promptAr}
                            </p>
                          )}
                        </div>

                        {/* Status Icon */}
                        {isSubmitted && mode === "interactive" && (
                          <div className="shrink-0">
                            {isCorrect ? (
                              <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                                <Check className="w-3.5 h-3.5" /> صحيح
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-xs text-rose-400 font-bold bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
                                <X className="w-3.5 h-3.5" /> غير دقيق
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Options or Answer inputs */}
                      {q.options && q.options.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {q.options.map((opt, optIdx) => {
                            const isChosen = studentAns === opt;
                            const isTheModelAnswer = q.modelAnswer.toLowerCase() === opt.toLowerCase();

                            let optStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700";
                            
                            if (mode === "modelAnswers") {
                              if (isTheModelAnswer) {
                                optStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                              }
                            } else if (isSubmitted) {
                              if (isTheModelAnswer) {
                                optStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                              } else if (isChosen) {
                                optStyle = "bg-rose-500/20 border-rose-500 text-rose-300";
                              }
                            } else if (isChosen) {
                              optStyle = "bg-amber-500/20 border-amber-500 text-amber-300 font-bold";
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => mode === "interactive" && handleSelectAnswer(q.id, opt)}
                                disabled={mode === "modelAnswers"}
                                className={`p-3 rounded-xl border text-left font-sans text-xs transition flex items-center justify-between ${optStyle} print:border-gray-400 print:text-black`}
                              >
                                <span>{opt}</span>
                                {isTheModelAnswer && (mode === "modelAnswers" || (isSubmitted && isTheModelAnswer)) && (
                                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Model Answer box if in modelAnswers mode or submitted */}
                      {(mode === "modelAnswers" || isSubmitted) && (
                        <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-xs space-y-1 print:bg-gray-100 print:border-gray-400">
                          <div className="flex items-center gap-1.5 text-emerald-400 print:text-black font-bold">
                            <BookmarkCheck className="w-3.5 h-3.5" />
                            <span>الحل النموذجي المعتمد (Model Answer):</span>
                            <span className="font-sans font-bold text-white print:text-black">{q.modelAnswer}</span>
                          </div>
                          {q.modelAnswerAr && (
                            <p className="text-slate-300 print:text-gray-700">{q.modelAnswerAr}</p>
                          )}
                          {q.explanation && (
                            <p className="text-[11px] text-slate-400 print:text-gray-600">
                              <strong>الشرح: </strong> {q.explanation}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Bar (if in interactive mode) */}
        {mode === "interactive" && (
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
            <span className="text-xs text-slate-400">
              أجبت على {Object.keys(studentAnswers).filter(k => allCurrentQuestions.some(q => q.id === k)).length} من أصل {allCurrentQuestions.length} سؤال في هذه الورقة
            </span>

            <button
              onClick={handleGradeSheet}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-2xl shadow-lg shadow-amber-500/20 transition transform active:scale-95"
            >
              تصحيح إجاباتي وتقييم ورقة العمل
            </button>
          </div>
        )}

        {/* Printable Footer note */}
        <div className="border-t border-slate-800 print:border-black pt-4 text-center text-xs text-slate-500 print:text-black space-y-1">
          <p>
            MORE ENGLISH MORE LOVE • المنهاج التفاعلي والحلول النموذجية المعتمدة
          </p>
          <p>
            المعلمة: <strong>جيداء صقر</strong> • هاتف وواتساب: <strong>+963933036079</strong>
          </p>
        </div>

      </div>

    </div>
  );
};
