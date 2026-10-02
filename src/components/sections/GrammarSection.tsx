import React, { useState } from "react";
import { Scale, Check, X, HelpCircle, CheckCircle2, ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { GRAMMAR_LESSONS, GrammarLesson } from "../../data/curriculumData";
import { playEnglishSpeech } from "../../utils/speech";

export const GrammarSection: React.FC = () => {
  const [selectedLessonId, setSelectedLessonId] = useState<string>(GRAMMAR_LESSONS[0].id);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showAllExplanations, setShowAllExplanations] = useState(false);

  const currentLesson: GrammarLesson = GRAMMAR_LESSONS.find(l => l.id === selectedLessonId) || GRAMMAR_LESSONS[0];

  const handleSelectOption = (quizId: string, optionIdx: number) => {
    setQuizAnswers(prev => ({ ...prev, [quizId]: optionIdx }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-bold mb-2">
          <Scale className="w-3.5 h-3.5" />
          <span>القسم الخامس: القواعد والأزمنة (Grammar Masterclass)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          شروحات القواعد المعتمدة والتمارين التفاعلية
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          مقارنة الأزمنة، أدوات الربط، واستخدامات الأفعال المساعدة وفق المنهاج الرسمي للأستاذة جيداء صقر.
        </p>

        {/* Lesson Switcher */}
        <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-slate-800/80">
          {GRAMMAR_LESSONS.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => {
                setSelectedLessonId(lesson.id);
                setQuizAnswers({});
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 border ${
                selectedLessonId === lesson.id
                  ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20"
                  : "bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-800"
              }`}
            >
              <span>{lesson.titleAr}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Lesson Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Explanation & Rules (2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Rule Overview */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs text-amber-400 font-bold font-sans">{currentLesson.titleEn}</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                {currentLesson.titleAr}
              </h3>
            </div>

            {/* Bullet Explanations */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-slate-400">شرح القاعدة بالعربية:</h4>
              {currentLesson.ruleExplanationAr.map((expl, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <span>{expl}</span>
                </div>
              ))}
            </div>

            {/* Pattern & Examples Table */}
            <div className="space-y-3 pt-4">
              <h4 className="text-xs font-bold text-slate-400">الصيغ والأمثلة التوضيحية (Patterns & Examples):</h4>
              <div className="space-y-3">
                {currentLesson.rules.map((rule, idx) => (
                  <div key={idx} className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                        {rule.patternEn}
                      </span>
                      <span className="text-xs text-slate-400">{rule.explanationAr}</span>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-sans font-semibold text-emerald-300">{rule.exampleEn}</p>
                        <button
                          onClick={() => playEnglishSpeech(rule.exampleEn)}
                          className="text-xs text-slate-400 hover:text-amber-400 transition"
                          title="استماع للمثال"
                        >
                          نطق
                        </button>
                      </div>
                      <p className="text-xs text-slate-400 text-right">{rule.exampleAr}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Signal words badge if available */}
            {currentLesson.signalWords && currentLesson.signalWords.length > 0 && (
              <div className="pt-4 border-t border-slate-800">
                <h4 className="text-xs font-bold text-slate-400 mb-2">الكلمات الدالة والمفتاحية (Signal Words):</h4>
                <div className="flex flex-wrap gap-2">
                  {currentLesson.signalWords.map((sw, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-indigo-950/50 border border-indigo-500/30 rounded-xl text-xs text-indigo-300 font-sans font-semibold"
                    >
                      {sw.en} <span className="opacity-70 font-arabic font-normal">({sw.ar})</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Grammar Quiz (1 Column) */}
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-bold text-white text-base flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <span>اختبار القواعد الفوري</span>
              </h4>
              <span className="text-xs text-slate-400">
                {Object.keys(quizAnswers).length} / {currentLesson.quiz.length}
              </span>
            </div>

            <div className="space-y-4">
              {currentLesson.quiz.map((q, qIdx) => {
                const userChoice = quizAnswers[q.id];
                const isAnswered = userChoice !== undefined;
                const isCorrect = userChoice === q.correctIndex;

                return (
                  <div key={q.id} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-3">
                    <p className="text-xs sm:text-sm font-bold text-white font-sans">
                      {qIdx + 1}- {q.question}
                    </p>

                    <div className="space-y-1.5">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = userChoice === optIdx;
                        let btnClass = "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700";

                        if (isAnswered) {
                          if (optIdx === q.correctIndex) {
                            btnClass = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                          } else if (isChosen) {
                            btnClass = "bg-rose-500/20 border-rose-500 text-rose-300";
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            disabled={isAnswered}
                            className={`w-full p-2.5 rounded-xl border text-left font-sans text-xs transition flex items-center justify-between ${btnClass}`}
                          >
                            <span>{opt}</span>
                            {isAnswered && optIdx === q.correctIndex && (
                              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            )}
                            {isAnswered && isChosen && optIdx !== q.correctIndex && (
                              <X className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <div className={`p-2.5 rounded-xl text-[11px] leading-relaxed border ${
                        isCorrect
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                          : "bg-amber-500/10 border-amber-500/30 text-amber-300"
                      }`}>
                        <strong>{isCorrect ? "صحيح! " : "الإجابة الصحيحة: "}</strong>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
