import React, { useState } from "react";
import { Headphones, Play, Pause, Volume2, Check, X, Gift, CheckCircle2, FileText } from "lucide-react";
import { LISTENING_LESSONS } from "../../data/curriculumData";
import { playEnglishSpeech } from "../../utils/speech";

export const ListeningSection: React.FC = () => {
  const lesson = LISTENING_LESSONS[0];
  const [playingTurnIdx, setPlayingTurnIdx] = useState<number | null>(null);
  const [userTfAnswers, setUserTfAnswers] = useState<Record<string, boolean>>({});
  const [selectedMatches, setSelectedMatches] = useState<Record<string, string>>({});

  const handlePlayLine = (idx: number, text: string) => {
    setPlayingTurnIdx(idx);
    playEnglishSpeech(text);
    setTimeout(() => {
      setPlayingTurnIdx(null);
    }, 4500);
  };

  const handlePlayEntireDialogue = () => {
    const fullScript = lesson.audioDialogue.map(d => `${d.speaker} says: ${d.textEn}`).join(". ");
    playEnglishSpeech(fullScript, 0.85);
  };

  const handleTfSelect = (qId: string, answer: boolean) => {
    setUserTfAnswers(prev => ({ ...prev, [qId]: answer }));
  };

  const giftOptions = [
    "twenty pounds (عشرون جنيهاً)",
    "two tickets to see a film (تذكرتان لمشاهدة فيلم)",
    "computer game (لعبة كمبيوتر)",
    "phone (هاتف)"
  ];

  const handleMatchSelect = (person: string, gift: string) => {
    setSelectedMatches(prev => ({ ...prev, [person]: gift }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-bold mb-2">
              <Headphones className="w-3.5 h-3.5" />
              <span>القسم الثالث: الاستماع التفاعلي (Listening Lab)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {lesson.titleAr}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              استمع للحوار المعتمد بين جيسيكا ومايك حول هدايا عيد الميلاد، ثم قم بحل التمارين التفاعلية ومطابقة الهدايا.
            </p>
          </div>

          <button
            onClick={handlePlayEntireDialogue}
            className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-indigo-600/30 transition transform active:scale-95 shrink-0"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>تشغيل الحوار الصوتي بالكامل</span>
          </button>
        </div>
      </div>

      {/* Dialogue Script & Speaker Cards */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>نص الحوار الصوتي (Listen to the dialogue)</span>
          </h3>
          <span className="text-xs text-slate-400">انقر على أي سطر للاستماع إليه منفرداً</span>
        </div>

        <div className="space-y-3">
          {lesson.audioDialogue.map((turn, idx) => {
            const isJessica = turn.speaker === "Jessica";
            const isPlaying = playingTurnIdx === idx;

            return (
              <div
                key={idx}
                onClick={() => handlePlayLine(idx, turn.textEn)}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-4 ${
                  isPlaying
                    ? "bg-amber-500/15 border-amber-500 shadow-md shadow-amber-500/10"
                    : isJessica
                    ? "bg-slate-950/80 border-slate-800 hover:border-slate-700"
                    : "bg-indigo-950/30 border-indigo-900/40 hover:border-indigo-700/50"
                }`}
              >
                {/* Speaker Avatar Badge */}
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs shrink-0 ${
                  isJessica
                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                    : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                }`}>
                  {isJessica ? "جيسيكا" : "مايك"}
                </div>

                {/* Speech text */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300">{turn.speaker}</span>
                    <button className="text-slate-500 hover:text-amber-400 transition">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm font-sans text-white leading-relaxed">{turn.textEn}</p>
                  <p className="text-xs text-amber-300/80 pt-1">{turn.textAr}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Exercises Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Exercise A: True or False */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <CheckCircle2 className="w-5 h-5 text-amber-400" />
            <h4 className="font-bold text-white text-base">
              A - حدد ما إذا كانت العبارات صحيحة أم خاطئة (True / False)
            </h4>
          </div>

          <div className="space-y-4">
            {lesson.trueFalseQuestions.map((q, idx) => {
              const userChoice = userTfAnswers[q.id];
              const isAnswered = userChoice !== undefined;
              const isCorrect = userChoice === q.isTrue;

              return (
                <div key={q.id} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <div>
                    <p className="text-sm font-bold text-white">{idx + 1}- {q.statementEn}</p>
                    <p className="text-xs text-slate-400">{q.statementAr}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleTfSelect(q.id, true)}
                      className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                        userChoice === true
                          ? q.isTrue
                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                            : "bg-rose-500/20 border-rose-500 text-rose-300"
                          : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>True (صحيح)</span>
                    </button>

                    <button
                      onClick={() => handleTfSelect(q.id, false)}
                      className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                        userChoice === false
                          ? !q.isTrue
                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                            : "bg-rose-500/20 border-rose-500 text-rose-300"
                          : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>False (خطأ)</span>
                    </button>
                  </div>

                  {isAnswered && (
                    <div className={`p-2.5 rounded-xl text-xs border ${
                      isCorrect
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                        : "bg-amber-500/10 border-amber-500/30 text-amber-300"
                    }`}>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Exercise B: Matching Gifts */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Gift className="w-5 h-5 text-amber-400" />
            <h4 className="font-bold text-white text-base">
              B - صل الشخص بالهدية التي أحضرها لمايك (Match Column A with B)
            </h4>
          </div>

          <div className="space-y-4">
            {lesson.matchingPairs.map((pair, idx) => {
              const selectedGift = selectedMatches[pair.person];
              const isMatched = selectedGift === pair.gift;

              return (
                <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300 text-sm">{pair.person}</span>
                    {selectedGift && (
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        isMatched
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                      }`}>
                        {isMatched ? "مطابقة صحيحة ✓" : "غير مطابقة ✗"}
                      </span>
                    )}
                  </div>

                  <select
                    value={selectedGift || ""}
                    onChange={(e) => handleMatchSelect(pair.person, e.target.value)}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="">-- اختر الهدية المقابلة --</option>
                    {giftOptions.map((opt, oIdx) => (
                      <option key={oIdx} value={opt}>{opt}</option>
                    ))}
                  </select>

                  {selectedGift && !isMatched && (
                    <p className="text-[11px] text-amber-400">
                      الحل النموذجي المعتمد: {pair.gift}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Writing Section Sample paragraph from the Listening worksheet */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <FileText className="w-5 h-5 text-indigo-400" />
          <h4 className="font-bold text-white text-base">
            فقرة الكتابة النموذجية: خصائص مدرستي المثالية (My Ideal School)
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400">Sample Paragraph (الفقرة النموذجية)</span>
              <button
                onClick={() => playEnglishSpeech("My ideal school is big, clean and full of activities. It has modern classrooms and a large library. The teachers are kind and helpful. Students respect each other and feel safe. There is a playground, a science lab and a computer room. We can learn and have fun at the same time. I would be happy to study in such a school.")}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" /> استماع للفقرة
              </button>
            </div>

            <p className="text-sm font-sans text-slate-100 leading-relaxed">
              "My ideal school is big, clean and full of activities. It has modern classrooms and a large library. The teachers are kind and helpful. Students respect each other and feel safe. There is a playground, a science lab and a computer room. We can learn and have fun at the same time. I would be happy to study in such a school."
            </p>

            <p className="text-xs text-slate-400 border-t border-slate-800 pt-3 leading-relaxed">
              مدرستي المثالية كبيرة، نظيفة ومليئة بالأنشطة. لديها صفوف حديثة ومكتبة كبيرة. المعلمون لطفاء ومتعاونون. الطلاب يحترمون بعضهم البعض ويشعرون بالأمان. يوجد ملعب، مخبر علوم وغرفة حاسوب. يمكننا التعلم والاستمتاع في نفس الوقت. سأكون سعيداً جداً بالدراسة في مثل هذه المدرسة.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-xs space-y-3">
            <span className="font-bold text-amber-400 block">نصائح الكتابة من المعلمة جيداء:</span>
            <ul className="space-y-2 text-slate-300 list-disc list-inside">
              <li>استخدم الصفات (Adjectives) لوصف الأسماء بدقة.</li>
              <li>اكتب جملاً تامة تبدأ بحرف كبير وتنتهي بنقطة.</li>
              <li>استخدم أدوات الربط (and, but, or) لتنسيق الأفكار.</li>
              <li>راجع الإملاء والقواعد قبل الانتهاء.</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};
