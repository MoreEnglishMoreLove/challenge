import React, { useState } from "react";
import { Volume2, BookOpen, CheckCircle, HelpCircle, Eye, EyeOff, Sparkles, Check, X } from "lucide-react";
import { READING_TEXTS, ReadingText } from "../../data/curriculumData";
import { playEnglishSpeech } from "../../utils/speech";

export const ReadingSection: React.FC = () => {
  const [selectedTextId, setSelectedTextId] = useState<string>(READING_TEXTS[0].id);
  const [showTranslations, setShowTranslations] = useState<boolean>(true);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});
  const [userMcqAnswers, setUserMcqAnswers] = useState<Record<number, string>>({});
  const [activeSpeechText, setActiveSpeechText] = useState<string | null>(null);

  const currentText: ReadingText = READING_TEXTS.find(t => t.id === selectedTextId) || READING_TEXTS[0];

  const handleSpeak = (text: string) => {
    setActiveSpeechText(text);
    playEnglishSpeech(text);
    setTimeout(() => setActiveSpeechText(null), 4000);
  };

  const toggleRevealAnswer = (idx: number) => {
    setRevealedAnswers(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleSelectMcq = (qIdx: number, key: string) => {
    setUserMcqAnswers(prev => ({ ...prev, [qIdx]: key }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Section Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-bold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>القسم الأول: القراءة ونصوص الاستيعاب (Reading & Comprehension)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              نصوص المنهاج المعتمدة والترجمة التفاعلية
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              استمع إلى النطق الصحيح للنصوص، واقرأ الترجمة العربية المعتمدة، ثم أجب عن أسئلة الاستيعاب.
            </p>
          </div>

          {/* Translation visibility toggle */}
          <button
            onClick={() => setShowTranslations(!showTranslations)}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition"
          >
            {showTranslations ? <EyeOff className="w-4 h-4 text-amber-400" /> : <Eye className="w-4 h-4 text-amber-400" />}
            <span>{showTranslations ? "إخفاء الترجمة العربية" : "إظهار الترجمة العربية"}</span>
          </button>
        </div>

        {/* Text Switcher */}
        <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-slate-800/80">
          {READING_TEXTS.map((text) => (
            <button
              key={text.id}
              onClick={() => {
                setSelectedTextId(text.id);
                setRevealedAnswers({});
                setUserMcqAnswers({});
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 border ${
                selectedTextId === text.id
                  ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20"
                  : "bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-800"
              }`}
            >
              <span>{text.titleEn}</span>
              <span className="opacity-70">({text.titleAr})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Text Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Reading Passage (2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-amber-400 font-semibold">{currentText.unit}</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">{currentText.titleEn}</h3>
              </div>
              <button
                onClick={() => handleSpeak(currentText.paragraphs.map(p => p.en).join(" "))}
                className="flex items-center gap-2 px-3.5 py-2 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-semibold transition"
                title="استمع للنص بالكامل"
              >
                <Volume2 className="w-4 h-4 text-indigo-400" />
                <span>استماع للنص كاملاً</span>
              </button>
            </div>

            {/* Paragraphs with individual speech button */}
            <div className="space-y-4">
              {currentText.paragraphs.map((p, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm sm:text-base text-slate-100 font-sans leading-relaxed tracking-wide select-text">
                      {p.en}
                    </p>
                    <button
                      onClick={() => handleSpeak(p.en)}
                      className={`p-2 rounded-lg transition shrink-0 ${
                        activeSpeechText === p.en
                          ? "bg-amber-500 text-slate-950"
                          : "bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                      title="استماع لهذه الفقرة"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {showTranslations && (
                    <p className="text-xs sm:text-sm text-amber-300/90 leading-relaxed font-sans border-t border-slate-800/80 pt-2 text-right">
                      {p.ar}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Open Comprehension Questions */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-amber-400" />
              <span>أسئلة الفهم والاستيعاب (Comprehension Questions)</span>
            </h4>

            <div className="space-y-4">
              {currentText.questions.map((q, idx) => (
                <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-bold text-slate-200">{idx + 1}- {q.questionEn}</p>
                      <p className="text-xs text-slate-400">{q.questionAr}</p>
                    </div>
                    <button
                      onClick={() => toggleRevealAnswer(idx)}
                      className="text-xs font-semibold px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl transition border border-slate-700 shrink-0"
                    >
                      {revealedAnswers[idx] ? "إخفاء الحل" : "عرض الحل النموذجي"}
                    </button>
                  </div>

                  {revealedAnswers[idx] && (
                    <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs space-y-1 animate-in fade-in">
                      <p className="font-bold text-amber-300">Answer: {q.answerEn}</p>
                      <p className="text-slate-300">{q.answerAr}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Key Words & Interactive Quiz (1 Column) */}
        <div className="space-y-6">
          
          {/* Key Words Glossary */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h4 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>المفردات المفتاحية (Key Words)</span>
            </h4>

            <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
              {currentText.keyWords.map((kw, idx) => (
                <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300 text-sm font-sans flex items-center gap-1.5">
                      {kw.word}
                      <span className="text-[10px] text-slate-500 font-normal">({kw.type})</span>
                    </span>
                    <button
                      onClick={() => handleSpeak(kw.word)}
                      className="p-1 text-slate-400 hover:text-amber-400"
                      title="نطق"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-snug">{kw.enDef}</p>
                  <p className="text-emerald-400 font-semibold">{kw.arMeaning}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Multiple Choice Test */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h4 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <HelpCircle className="w-4 h-4 text-indigo-400" />
              <span>اختبار اختيار من متعدد (MCQ)</span>
            </h4>

            <div className="space-y-4">
              {currentText.mcqQuestions.map((q, qIdx) => {
                const selected = userMcqAnswers[qIdx];
                const isAnswered = selected !== undefined;
                const isCorrect = selected === q.correctKey;

                return (
                  <div key={qIdx} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 text-xs space-y-3">
                    <div>
                      <p className="font-bold text-white text-xs sm:text-sm">{qIdx + 1}- {q.questionEn}</p>
                      <p className="text-[11px] text-slate-400">{q.questionAr}</p>
                    </div>

                    <div className="space-y-1.5">
                      {q.options.map((opt) => {
                        const isChosen = selected === opt.key;
                        let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700";
                        if (isAnswered) {
                          if (opt.key === q.correctKey) {
                            btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                          } else if (isChosen) {
                            btnStyle = "bg-rose-500/20 border-rose-500 text-rose-300";
                          }
                        }

                        return (
                          <button
                            key={opt.key}
                            onClick={() => handleSelectMcq(qIdx, opt.key)}
                            disabled={isAnswered}
                            className={`w-full p-2.5 rounded-xl border text-right transition flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt.textEn} <span className="opacity-75">({opt.textAr})</span></span>
                            {isAnswered && opt.key === q.correctKey && (
                              <Check className="w-4 h-4 text-emerald-400" />
                            )}
                            {isAnswered && isChosen && opt.key !== q.correctKey && (
                              <X className="w-4 h-4 text-rose-400" />
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
                        <strong>{isCorrect ? "إجابة صحيحة! أحسنت." : "توضيح الإجابة النموذجية:"}</strong> {q.explanation}
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
