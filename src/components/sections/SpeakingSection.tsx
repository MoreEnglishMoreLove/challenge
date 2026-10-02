import React, { useState } from "react";
import { Mic, Volume2, UserCheck, MessageSquare, Plus, CheckCircle, Sparkles } from "lucide-react";
import { SPEAKING_ACTIVITIES } from "../../data/curriculumData";
import { playEnglishSpeech } from "../../utils/speech";

export const SpeakingSection: React.FC = () => {
  const [partnerName, setPartnerName] = useState("");
  const [partnerFeeling, setPartnerFeeling] = useState("I feel excited");
  const [partnerDifficulty, setPartnerDifficulty] = useState("Too much homework");
  const [partnerSolution, setPartnerSolution] = useState("By making a study plan");
  const [partnerHelper, setPartnerHelper] = useState("My parents and my teacher");
  const [customSurveys, setCustomSurveys] = useState<{
    id: string;
    name: string;
    feeling: string;
    difficulty: string;
    solution: string;
    helper: string;
  }[]>([]);

  const handleAddSurvey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerName.trim()) return;

    setCustomSurveys(prev => [
      ...prev,
      {
        id: "surv-" + Date.now(),
        name: partnerName.trim(),
        feeling: partnerFeeling,
        difficulty: partnerDifficulty,
        solution: partnerSolution,
        helper: partnerHelper
      }
    ]);
    setPartnerName("");
  };

  const surveyActivity = SPEAKING_ACTIVITIES[0];
  const photoDiscussion = SPEAKING_ACTIVITIES[1];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-bold mb-2">
          <Mic className="w-3.5 h-3.5" />
          <span>القسم الثاني: المحادثة والاستبيان (Speaking & Classroom Survey)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          استبيان العودة إلى المدرسة والمحادثات التفاعلية
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          تعلم كيف تطرح الأسئلة وتجيب باللغة الإنجليزية، واستمع لنطق الإجابات النموذجية وأجرِ استبياناً حياً مع زملائك.
        </p>
      </div>

      {/* Activity 1: The Model Survey Table from Unit 2 Page 1 */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs text-amber-400 font-bold">نموذج ورقة العمل الرسمية (Unit 2 - Page 1)</span>
            <h3 className="text-xl font-bold text-white mt-1">
              جدول الاستبيان النموذجي مع الزميل "عمر (Omar)"
            </h3>
          </div>
          <span className="text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            Find someone new in your classroom
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-right border-collapse">
            <thead>
              <tr className="bg-slate-950 text-slate-300 border-b border-slate-800">
                <th className="p-3.5 font-bold text-amber-400">الاسم (Name)</th>
                <th className="p-3.5 font-bold text-white">السؤال (Questions)</th>
                <th className="p-3.5 font-bold text-emerald-400">الإجابة المعتمدة (Answers)</th>
                <th className="p-3.5 font-bold text-center">نطق</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {surveyActivity.samplePerson?.qa.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition">
                  <td className="p-3.5 font-bold text-amber-300 whitespace-nowrap align-top">
                    {idx === 0 ? surveyActivity.samplePerson.name : "—"}
                  </td>
                  <td className="p-3.5 space-y-1 align-top">
                    <p className="font-semibold text-slate-100">{item.qEn}</p>
                    <p className="text-slate-400 text-xs">{item.qAr}</p>
                  </td>
                  <td className="p-3.5 space-y-1 align-top">
                    <p className="font-bold text-emerald-300">{item.aEn}</p>
                    <p className="text-slate-400 text-xs">{item.aAr}</p>
                  </td>
                  <td className="p-3.5 text-center align-top">
                    <button
                      onClick={() => playEnglishSpeech(`${item.qEn}. ${item.aEn}`)}
                      className="p-2 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 rounded-xl transition"
                      title="استمع للسؤال والإجابة"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity 2: Interactive Survey Creator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Input Form */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Sparkles className="w-4 h-4" />
            <h4>قم بإنشاء استبيان لزميل جديد في صفك</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            اكتب اسم زميلك واختر إجاباته عن مشاعر العودة والمشاكل المدرسية للتدرب على المحادثة:
          </p>

          <form onSubmit={handleAddSurvey} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">اسم الزميل (Partner's Name)</label>
              <input
                type="text"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                placeholder="مثال: يوسف، سارة، زيد..."
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                1. What's your feeling when back to school? (الشعور)
              </label>
              <select
                value={partnerFeeling}
                onChange={(e) => setPartnerFeeling(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
              >
                <option value="I feel excited.">I feel excited. (أشعر بالحماس)</option>
                <option value="I feel happy to see friends.">I feel happy to see friends. (أشعر بالسعادة للقاء الأصدقاء)</option>
                <option value="I feel a bit nervous.">I feel a bit nervous. (أشعر ببعض التوتر)</option>
                <option value="I feel ready for challenges.">I feel ready for challenges. (جاهز للتحديات)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                2. What difficulties are you facing? (الصعوبات)
              </label>
              <select
                value={partnerDifficulty}
                onChange={(e) => setPartnerDifficulty(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
              >
                <option value="Too much homework.">Too much homework. (كثير من الواجبات)</option>
                <option value="Waking up early.">Waking up early. (الاستيقاظ مبكراً)</option>
                <option value="Noisy classrooms.">Noisy classrooms. (الفصول المزعجة)</option>
                <option value="Difficult subjects.">Difficult subjects. (المواد الصعبة)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                3. How can you overcome them? (الحل والتغلب)
              </label>
              <select
                value={partnerSolution}
                onChange={(e) => setPartnerSolution(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
              >
                <option value="By making a study plan.">By making a study plan. (بعمل خطة دراسية)</option>
                <option value="By managing my time better.">By managing my time better. (بتنظيم وقتي)</option>
                <option value="By asking for help.">By asking for help. (بطلب المساعدة)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                4. Who helps you overcome them? (من يساعدك)
              </label>
              <select
                value={partnerHelper}
                onChange={(e) => setPartnerHelper(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
              >
                <option value="My parents and my teacher.">My parents and my teacher. (والدي ومعلمي)</option>
                <option value="My classmates and friends.">My classmates and friends. (زملائي وأصدقائي)</option>
                <option value="The school social worker.">The school social worker. (المرشد الاجتماعي)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة الاستبيان إلى القائمة</span>
            </button>
          </form>
        </div>

        {/* Display generated partner surveys */}
        <div className="space-y-4">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>الاستبيانات المنجزة في الصف ({customSurveys.length + 1})</span>
          </h4>

          {/* Always show Omar's model card */}
          <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-amber-300 text-sm">عمر (Omar) - النموذج المعتمد</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/30">
                Official Model
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">الشعور (Feeling)</span>
                <span className="text-emerald-400 font-semibold">I feel excited.</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">الصعوبة (Difficulty)</span>
                <span className="text-rose-400 font-semibold">Too much homework.</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">الحل (Overcome)</span>
                <span className="text-blue-400 font-semibold">By making a study plan.</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">المساعد (Helper)</span>
                <span className="text-amber-400 font-semibold">My parents and teacher.</span>
              </div>
            </div>
          </div>

          {/* User added surveys */}
          {customSurveys.map((cs) => (
            <div key={cs.id} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-white text-sm">{cs.name}</span>
                <button
                  onClick={() => playEnglishSpeech(`Survey for ${cs.name}. Feeling: ${cs.feeling}. Difficulty: ${cs.difficulty}. Solution: ${cs.solution}`)}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" /> استماع
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Feeling</span>
                  <span className="text-emerald-300 font-semibold">{cs.feeling}</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Difficulty</span>
                  <span className="text-rose-300 font-semibold">{cs.difficulty}</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Solution</span>
                  <span className="text-blue-300 font-semibold">{cs.solution}</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Helper</span>
                  <span className="text-amber-300 font-semibold">{cs.helper}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity 3: Photo Discussion (Speaking on Bullying) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 bg-rose-500/10 text-rose-400 rounded-2xl border border-rose-500/20">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{photoDiscussion.titleAr}</h3>
            <p className="text-xs text-slate-400">{photoDiscussion.titleEn}</p>
          </div>
        </div>

        <div className="space-y-4">
          {photoDiscussion.questions?.map((item, idx) => (
            <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="font-bold text-white text-sm sm:text-base">{idx + 1}- {item.qEn}</p>
                  <p className="text-xs text-slate-400">{item.qAr}</p>
                </div>
                <button
                  onClick={() => playEnglishSpeech(`${item.qEn}. ${item.suggestedEn}`)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition shrink-0"
                  title="استماع للسؤال والإجابة المقترحة"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3.5 bg-indigo-950/50 border border-indigo-500/30 rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                  <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Suggested Answer (الإجابة المقترحة):</span>
                </div>
                <p className="text-sm font-semibold text-slate-100">{item.suggestedEn}</p>
                <p className="text-xs text-slate-400">{item.suggestedAr}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
