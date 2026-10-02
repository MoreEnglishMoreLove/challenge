import React, { useState } from "react";
import { Atom, Volume2, Sparkles, Check, ArrowRight, BookOpen, Layers, CheckCircle2 } from "lucide-react";
import { PHYSICS_CONTENT } from "../../data/curriculumData";
import { playEnglishSpeech } from "../../utils/speech";

export const PhysicsSection: React.FC = () => {
  const [matchAnswers, setMatchAnswers] = useState<Record<string, string>>({});
  const [showMatchAnswers, setShowMatchAnswers] = useState(false);

  const matchQuestions = [
    {
      id: "law1",
      law: "1- Newton's first law (قانون نيوتن الأول)",
      correctKey: "C",
      correctText: "An object will not change its motion unless a force acts on it. (Inertia)",
      hint: "The ball stays still until kicked."
    },
    {
      id: "law2",
      law: "2- Newton's second law (قانون نيوتن الثاني)",
      correctKey: "A",
      correctText: "Force = mass × acceleration (The more force... The more acceleration)",
      hint: "Smaller mass accelerates faster with same force."
    },
    {
      id: "law3",
      law: "3- Newton's third law (قانون نيوتن الثالث)",
      correctKey: "B",
      correctText: "For every action, there is an equal and opposite reaction.",
      hint: "Action & Reaction arrows."
    }
  ];

  const handleMatchSelect = (id: string, val: string) => {
    setMatchAnswers(prev => ({ ...prev, [id]: val }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-bold mb-2">
          <Atom className="w-3.5 h-3.5" />
          <span>القسم السادس: التركيز على الفيزياء (Focus on Physics)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          قوانين نيوتن للحركة وتطبيقاتها العلمية واللغوية
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          تعلم المصطلحات الفيزيائية باللغة الإنجليزية، واستكشف قوانين نيوتن الثلاثة واستخدام زمن الحاضر البسيط للحقائق العلمية.
        </p>
      </div>

      {/* Intro Warmup Questions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PHYSICS_CONTENT.introQuestions.map((iq, idx) => (
          <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400">سؤال تمهيدي {idx + 1}</span>
              <button
                onClick={() => playEnglishSpeech(`${iq.qEn}. ${iq.aEn}`)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" /> استماع
              </button>
            </div>
            <p className="font-bold text-white text-sm">{iq.qEn}</p>
            <p className="text-xs text-slate-400">{iq.qAr}</p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-xs text-emerald-300">
              <strong>Answer: </strong> {iq.aEn}
              <p className="text-slate-400 text-[11px] mt-0.5">{iq.aAr}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Newton's Three Laws Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-400" />
          <span>قوانين نيوتن للحركة (Newton's Laws of Motion)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PHYSICS_CONTENT.laws.map((law, idx) => (
            <div
              key={idx}
              className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-3xl p-6 flex flex-col justify-between transition space-y-4 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                  <span className="px-3 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-full font-bold text-xs">
                    {law.number}
                  </span>
                  <button
                    onClick={() => playEnglishSpeech(law.statementEn)}
                    className="p-1.5 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 rounded-lg transition"
                    title="استماع"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="font-sans font-bold text-sm sm:text-base text-white leading-relaxed">
                  "{law.statementEn}"
                </p>

                <p className="text-xs text-slate-300 leading-relaxed mt-2 pt-2 border-t border-slate-800/80">
                  {law.statementAr}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                  <span className="text-slate-500 block text-[10px]">المعادلة / المفهوم:</span>
                  <span className="font-mono text-emerald-400 font-bold text-sm">{law.formula}</span>
                </div>
                <p className="text-[11px] text-slate-400">{law.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Matching Activity from Page 'Focus on Physics' */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs text-amber-400 font-bold">تمرين المطابقة الرسمي (Match Column A with B)</span>
            <h4 className="text-xl font-bold text-white mt-1">
              طابق القانون مع التفسير الفيزيائي المناسب
            </h4>
          </div>
          <button
            onClick={() => setShowMatchAnswers(!showMatchAnswers)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold rounded-xl border border-slate-700 transition"
          >
            {showMatchAnswers ? "إخفاء الحل" : "عرض الحل النموذجي"}
          </button>
        </div>

        <div className="space-y-4">
          {matchQuestions.map((q) => {
            const selected = matchAnswers[q.id];
            const isCorrect = selected === q.correctKey;

            return (
              <div key={q.id} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="font-bold text-white text-sm">{q.law}</span>
                  <select
                    value={selected || ""}
                    onChange={(e) => handleMatchSelect(q.id, e.target.value)}
                    className="p-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="">-- اختر من العمود B --</option>
                    <option value="A">A - Force = mass × acceleration</option>
                    <option value="B">B - For every action, equal & opposite reaction</option>
                    <option value="C">C - Object keeps motion unless force acts on it</option>
                  </select>
                </div>

                {(showMatchAnswers || selected) && (
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs flex items-center justify-between">
                    <div>
                      <span className="text-slate-400">الحل النموذجي: </span>
                      <strong className="text-emerald-400">{q.correctText}</strong>
                    </div>
                    {selected && (
                      <span className={`font-bold ${isCorrect ? "text-emerald-400" : "text-rose-400"}`}>
                        {isCorrect ? "صحيح ✓" : "خاطئ ✗"}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Physics Vocabulary & Grammar Note */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Vocabulary */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h4 className="font-bold text-white text-base border-b border-slate-800 pb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>مفردات الفيزياء المعتمدة (Physics Vocabulary)</span>
          </h4>

          <div className="grid grid-cols-2 gap-2.5">
            {PHYSICS_CONTENT.vocabulary.map((voc, idx) => (
              <div
                key={idx}
                onClick={() => playEnglishSpeech(voc.en)}
                className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl cursor-pointer transition flex items-center justify-between group"
              >
                <div>
                  <span className="font-bold text-white font-sans text-sm block group-hover:text-amber-400">
                    {voc.en}
                  </span>
                  <span className="text-[11px] text-slate-400">{voc.ar}</span>
                </div>
                <Volume2 className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Grammar / Science Note */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h4 className="font-bold text-white text-base border-b border-slate-800 pb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>{PHYSICS_CONTENT.grammarScienceNote.titleAr}</span>
          </h4>

          <p className="text-xs text-slate-300 leading-relaxed">
            {PHYSICS_CONTENT.grammarScienceNote.noteAr}
          </p>

          <div className="space-y-2.5">
            {PHYSICS_CONTENT.grammarScienceNote.examples.map((ex, idx) => (
              <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-emerald-300 font-sans">{ex.en}</p>
                  <button
                    onClick={() => playEnglishSpeech(ex.en)}
                    className="text-slate-400 hover:text-white"
                  >
                    <Volume2 className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-slate-400">{ex.ar}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
