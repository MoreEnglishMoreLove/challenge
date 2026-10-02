import React, { useState } from "react";
import { BookMarked, Volume2, Sparkles, ArrowRightLeft, Check, CheckCircle2, RotateCw } from "lucide-react";
import { VOCABULARY_LIST, VERB_NOUN_PAIRS, SILENT_LETTERS_DATA } from "../../data/curriculumData";
import { playEnglishSpeech } from "../../utils/speech";

export const VocabularySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"flashcards" | "fillblanks" | "verbnoun" | "silent">("flashcards");
  
  // Flashcard state
  const [cardIdx, setCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Fill in blanks practice (from Page 14)
  const fillQuestions = [
    {
      id: "fb1",
      sentence: "1- __________ is a problem in many schools.",
      answer: "Bullying",
      ar: "التنمر مشكلة في العديد من المدارس."
    },
    {
      id: "fb2",
      sentence: "2- The story I've read last night is __________. I'll try and explain it.",
      answer: "complicated",
      ar: "القصة التي قرأتها الليلة الماضية معقدة. سأحاول شرحها."
    },
    {
      id: "fb3",
      sentence: "3- Nada felt lonely and __________.",
      answer: "depressed",
      ar: "شعرت ندى بالوحدة والاكتئاب."
    },
    {
      id: "fb4",
      sentence: "4- Potatoes turn green when __________ to light.",
      answer: "exposed",
      ar: "تتحول البطاطا للون الأخضر عند تعرضها للضوء."
    },
    {
      id: "fb5",
      sentence: "5- John didn't __________ for a moment about taking the job.",
      answer: "hesitate",
      ar: "لم يتردد جون للحظة في قبول الوظيفة."
    },
    {
      id: "fb6",
      sentence: "6- We need to be more satisfied with ourselves to build our __________.",
      answer: "self-esteem",
      ar: "يجب أن نكون أكثر رضا عن أنفسنا لبناء احترامنا لذاتنا."
    }
  ];

  const wordBank = ["Bullying", "complicated", "depressed", "exposed", "hesitate", "self-esteem", "possible"];
  const [userFillAnswers, setUserFillAnswers] = useState<Record<string, string>>({});
  const [showFillAnswers, setShowFillAnswers] = useState(false);

  const currentCard = VOCABULARY_LIST[cardIdx];

  const nextCard = () => {
    setIsFlipped(false);
    setCardIdx((prev) => (prev + 1) % VOCABULARY_LIST.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCardIdx((prev) => (prev - 1 + VOCABULARY_LIST.length) % VOCABULARY_LIST.length);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-bold mb-2">
          <BookMarked className="w-3.5 h-3.5" />
          <span>القسم الرابع: بنك المفردات والمصطلحات (Vocabulary Bank)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          المفردات، البطاقات التعليمية وقواعد الاشتقاق
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          إتقان مفردات الوحدة الثانية، تدريبات الفراغات المعتمدة، تحويل الأفعال لأسماء، ومخارج الحروف الصامتة.
        </p>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-slate-800/80">
          <button
            onClick={() => setActiveTab("flashcards")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === "flashcards"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800"
            }`}
          >
            بطاقات الكلمات التفاعلية (Flashcards)
          </button>
          <button
            onClick={() => setActiveTab("fillblanks")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === "fillblanks"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800"
            }`}
          >
            تمرين إكمال الفراغات (صفحة 14)
          </button>
          <button
            onClick={() => setActiveTab("verbnoun")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === "verbnoun"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800"
            }`}
          >
            جدول تحويل الفعل إلى اسم (-ing)
          </button>
          <button
            onClick={() => setActiveTab("silent")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === "silent"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800"
            }`}
          >
            الحروف الصامتة (Silent h & gh)
          </button>
        </div>
      </div>

      {/* Tab 1: Interactive Flashcards */}
      {activeTab === "flashcards" && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="text-center text-xs text-slate-400">
            بطاقة {cardIdx + 1} من {VOCABULARY_LIST.length} (انقر على البطاقة لقلبها واكتشاف المعنى بالعربي)
          </div>

          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-80 bg-gradient-to-br from-slate-900 to-indigo-950 border-2 border-amber-500/30 rounded-3xl p-8 flex flex-col justify-between cursor-pointer shadow-2xl shadow-indigo-950/50 hover:border-amber-400 transition transform duration-300 relative group"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full font-bold">
                {currentCard.partOfSpeech}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playEnglishSpeech(`${currentCard.word}. ${currentCard.exampleEn}`);
                }}
                className="p-2 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 rounded-xl transition"
                title="استمع للنطق والمثال"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Front or Back View */}
            {!isFlipped ? (
              <div className="text-center space-y-3 my-auto">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide font-sans">
                  {currentCard.word}
                </h3>
                {currentCard.enDefinition && (
                  <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                    "{currentCard.enDefinition}"
                  </p>
                )}
                <div className="text-[11px] text-amber-400/80 flex items-center justify-center gap-1 pt-2">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>انقر لعرض المعنى العربي والمثال</span>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-3 my-auto animate-in zoom-in-95">
                <span className="text-xs text-amber-400 font-bold">المعنى بالعربية</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-300">
                  {currentCard.arMeaning}
                </h3>
                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl text-right text-xs space-y-1 mt-2">
                  <p className="font-semibold text-slate-200">{currentCard.exampleEn}</p>
                  <p className="text-slate-400">{currentCard.exampleAr}</p>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="text-center text-[10px] text-slate-500">
              MORE ENGLISH MORE LOVE • T. Jaidaa Saqer
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={prevCard}
              className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs rounded-xl transition"
            >
              البطاقة السابقة
            </button>
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-4 py-3 bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 text-indigo-300 text-xs font-bold rounded-xl transition flex items-center gap-1"
            >
              <RotateCw className="w-4 h-4" /> قلب
            </button>
            <button
              onClick={nextCard}
              className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition"
            >
              البطاقة التالية
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Fill in the Blanks (from Page 14) */}
      {activeTab === "fillblanks" && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs text-amber-400 font-bold">تمرين الكتاب الرسمي (Unit 2 - Page 14)</span>
              <h3 className="text-xl font-bold text-white mt-1">
                Complete the sentences using the words below
              </h3>
            </div>
            <button
              onClick={() => setShowFillAnswers(!showFillAnswers)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold rounded-xl border border-slate-700 transition"
            >
              {showFillAnswers ? "إخفاء الحلول" : "إظهار الحلول النموذجية"}
            </button>
          </div>

          {/* Word Bank Box */}
          <div className="p-4 bg-slate-950 border border-amber-500/30 rounded-2xl flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs font-bold text-slate-400">بنك الكلمات:</span>
            {wordBank.map((word, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-slate-900 border border-slate-700 text-amber-300 text-xs font-bold rounded-lg font-sans"
              >
                {word}
              </span>
            ))}
          </div>

          {/* Sentences */}
          <div className="space-y-4">
            {fillQuestions.map((q) => {
              const selected = userFillAnswers[q.id] || "";
              const isCorrect = selected.toLowerCase() === q.answer.toLowerCase();

              return (
                <div key={q.id} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <p className="text-sm font-sans font-semibold text-slate-100">{q.sentence}</p>
                    
                    <select
                      value={selected}
                      onChange={(e) => setUserFillAnswers({ ...userFillAnswers, [q.id]: e.target.value })}
                      className="p-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-sans"
                    >
                      <option value="">-- اختر الكلمة --</option>
                      {wordBank.map((w, wIdx) => (
                        <option key={wIdx} value={w}>{w}</option>
                      ))}
                    </select>
                  </div>

                  <p className="text-xs text-slate-400 text-right">{q.ar}</p>

                  {(showFillAnswers || selected) && (
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-400">
                        الحل النموذجي: <strong className="text-amber-400 font-sans">{q.answer}</strong>
                      </span>
                      {selected && (
                        <span className={`font-bold flex items-center gap-1 ${isCorrect ? "text-emerald-400" : "text-rose-400"}`}>
                          {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
                          {isCorrect ? "إجابة صحيحة!" : "حاول مجدداً"}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Verb to Noun formation table */}
      {activeTab === "verbnoun" && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 max-w-3xl mx-auto">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs text-amber-400 font-bold">قاعدة الاشتقاق (Unit 2 - Page 7)</span>
            <h3 className="text-xl font-bold text-white mt-1">
              تحويل الفعل إلى اسم بإضافة (-ing)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              To make a noun from a verb, we usually add "-ing". Example: bully → bullying
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-right border-collapse">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-slate-300">
                  <th className="p-3 font-bold text-amber-400">الفعل (Verb)</th>
                  <th className="p-3 font-bold text-slate-400">المعنى بالعربي</th>
                  <th className="p-3 font-bold text-emerald-400">الاسم المشتق (Noun)</th>
                  <th className="p-3 font-bold text-slate-400">المعنى بالعربي</th>
                  <th className="p-3 font-bold text-center">نطق</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {VERB_NOUN_PAIRS.map((pair, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition">
                    <td className="p-3 font-bold text-amber-300 font-sans text-base">{pair.verb}</td>
                    <td className="p-3 text-slate-300">{pair.verbAr}</td>
                    <td className="p-3 font-bold text-emerald-300 font-sans text-base">{pair.noun}</td>
                    <td className="p-3 text-slate-300">{pair.nounAr}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => playEnglishSpeech(`${pair.verb}, ${pair.noun}`)}
                        className="p-1.5 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 rounded-lg transition"
                        title="استماع"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Grammar note */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs space-y-2">
            <span className="font-bold text-amber-400">ملاحظة القواعد من المعلمة جيداء صقر:</span>
            <p className="text-slate-300 leading-relaxed">
              • يُستخدم الاسم المضاف له -ing في بداية الجملة كفاعل (Subject) للتعبير عن حقائق عامة، مثل:
              <br />
              <strong className="text-white font-sans">"Bullying is wrong."</strong> (التنمر سلوك خاطئ)
              <br />
              <strong className="text-white font-sans">"Pushing others is not kind."</strong> (دفع الآخرين ليس لطيفاً)
            </p>
          </div>
        </div>
      )}

      {/* Tab 4: Silent Letters Trainer */}
      {activeTab === "silent" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Silent 'h' */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">Silent 'h' (حرف h صامت لا يُنطق)</h3>
                <p className="text-xs text-amber-400">كلمات وردت بالمنهاج الرسمي (صفحة 15)</p>
              </div>
              <span className="p-2 bg-amber-500/10 text-amber-300 rounded-xl font-bold text-xs font-mono">
                'h'
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {SILENT_LETTERS_DATA.hSilent.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => playEnglishSpeech(item.word)}
                  className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 rounded-xl cursor-pointer transition flex items-center justify-between group"
                >
                  <div>
                    <span className="font-bold text-white text-sm font-sans block group-hover:text-amber-400">
                      {item.word}
                    </span>
                    <span className="text-[11px] text-slate-400">{item.ar}</span>
                  </div>
                  <Volume2 className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Silent 'gh' */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">Silent 'gh' (حرفا gh صامتان)</h3>
                <p className="text-xs text-emerald-400">كلمات وردت بالمنهاج الرسمي (صفحة 15)</p>
              </div>
              <span className="p-2 bg-emerald-500/10 text-emerald-300 rounded-xl font-bold text-xs font-mono">
                'gh'
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {SILENT_LETTERS_DATA.ghSilent.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => playEnglishSpeech(item.word)}
                  className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 rounded-xl cursor-pointer transition flex items-center justify-between group"
                >
                  <div>
                    <span className="font-bold text-white text-sm font-sans block group-hover:text-emerald-400">
                      {item.word}
                    </span>
                    <span className="text-[11px] text-slate-400">{item.ar}</span>
                  </div>
                  <Volume2 className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400" />
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
