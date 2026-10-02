/**
 * Authentic Curriculum Data for "MORE ENGLISH MORE LOVE"
 * Supervised and taught by Teacher Jaidaa Saqer (المعلمة جيداء صقر)
 * Transcribed and structured directly from the official curriculum worksheets.
 */

export interface ReadingText {
  id: string;
  titleEn: string;
  titleAr: string;
  unit: string;
  paragraphs: {
    en: string;
    ar: string;
  }[];
  keyWords: {
    word: string;
    type: string;
    enDef: string;
    arMeaning: string;
  }[];
  questions: {
    questionEn: string;
    questionAr: string;
    answerEn: string;
    answerAr: string;
  }[];
  mcqQuestions: {
    questionEn: string;
    questionAr: string;
    options: { key: string; textEn: string; textAr: string }[];
    correctKey: string;
    explanation: string;
  }[];
}

export interface VocabularyItem {
  id: string;
  word: string;
  partOfSpeech: string;
  arMeaning: string;
  enDefinition?: string;
  exampleEn: string;
  exampleAr: string;
  unit: string;
}

export interface VerbNounPair {
  verb: string;
  verbAr: string;
  noun: string;
  nounAr: string;
}

export interface GrammarLesson {
  id: string;
  titleEn: string;
  titleAr: string;
  ruleExplanationAr: string[];
  rules: {
    patternEn: string;
    explanationAr: string;
    exampleEn: string;
    exampleAr: string;
  }[];
  signalWords?: { en: string; ar: string }[];
  quiz: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface WorksheetItem {
  id: number;
  titleEn: string;
  titleAr: string;
  pageNumber: string;
  unit: string;
  description: string;
  sections: {
    title: string;
    instructionsEn: string;
    instructionsAr: string;
    questions: {
      id: string;
      promptEn: string;
      promptAr?: string;
      type: "mcq" | "fill-blank" | "true-false" | "match" | "open";
      options?: string[];
      modelAnswer: string;
      modelAnswerAr?: string;
      explanation?: string;
    }[];
  }[];
}

// 1. READING TEXTS
export const READING_TEXTS: ReadingText[] = [
  {
    id: "worrying-time",
    titleEn: "A Worrying Time",
    titleAr: "أوقات مقلقة",
    unit: "Unit 2: A Challenge (تحدٍ)",
    paragraphs: [
      {
        en: "What about being back to school? Does thinking of being back to school worry you?",
        ar: "ماذا عن العودة إلى المدرسة؟ هل التفكير في العودة إلى المدرسة يقلقك؟"
      },
      {
        en: "Schools are good places for socializing, but everyone worries about things that happen at school from time to time.",
        ar: "المدارس أماكن جيدة للاختلاط وتكوين الصداقات، لكن الجميع يقلق بشأن الأشياء التي تحدث في المدرسة من وقت لآخر."
      },
      {
        en: "No single person passed through school without experiencing some problems or events.",
        ar: "لا يوجد شخص مرّ بالمدرسة دون أن يواجه بعض المشكلات أو الأحداث."
      },
      {
        en: "The stresses of school life that we are exposed to make us sometimes feel unhappy, depressed, out of control and have low self-esteem.",
        ar: "الضغوطات في الحياة المدرسية التي نتعرض لها تجعلنا أحياناً نشعر بالتعاسة والاكتئاب وفقدان السيطرة وانخفاض احترام الذات."
      },
      {
        en: "We may feel less motivated in our classrooms or careless about doing homework so that our marks may become low and we don't get good results.",
        ar: "قد نشعر بقلة الحافز في صفوفنا أو بالإهمال في أداء الواجبات، مما يجعل درجاتنا منخفضة ولا نحصل على نتائج جيدة."
      },
      {
        en: "Sometimes we find it hard to get up and get ready for school.",
        ar: "أحياناً نجد صعوبة في الاستيقاظ والاستعداد للمدرسة."
      }
    ],
    keyWords: [
      { word: "worry", type: "v.", enDef: "to feel anxious or troubled", arMeaning: "يقلق" },
      { word: "stress", type: "n.", enDef: "mental or emotional strain", arMeaning: "ضغط عصبي / توتر" },
      { word: "depressed", type: "adj.", enDef: "very sad and without hope", arMeaning: "مكتئب / حزين جداً" },
      { word: "self-esteem", type: "n.", enDef: "a feeling of being happy with your character and abilities", arMeaning: "احترام الذات والرضا عن النفس" },
      { word: "motivated", type: "adj.", enDef: "enthusiastic and determined to achieve something", arMeaning: "متحفز / ذو دافعية" },
      { word: "careless", type: "adj.", enDef: "not giving enough attention to avoid mistakes", arMeaning: "مهمل / غير مبالٍ" },
      { word: "exposed", type: "v.", enDef: "to be subjected to conditions or risks", arMeaning: "يتعرض لـ / مكشوف" },
      { word: "result", type: "n.", enDef: "an outcome or score", arMeaning: "نتيجة" }
    ],
    questions: [
      {
        questionEn: "Why are schools considered good places?",
        questionAr: "لماذا تعتبر المدارس أماكن جيدة؟",
        answerEn: "Schools are good places for socializing and meeting people.",
        answerAr: "المدارس أماكن جيدة للتواصل الاجتماعي ولقاء الناس."
      },
      {
        questionEn: "What effect do school stresses have on students?",
        questionAr: "ما هو تأثير الضغوط المدرسية على الطلاب؟",
        answerEn: "They make students feel unhappy, depressed, out of control, and have low self-esteem.",
        answerAr: "تجعلهم يشعرون بالتعاسة، الاكتئاب، فقدان السيطرة، وتدني احترام الذات."
      },
      {
        questionEn: "When may students' marks become low?",
        questionAr: "متى قد تنخفض درجات الطلاب؟",
        answerEn: "When students feel less motivated and careless about doing their homework.",
        answerAr: "عندما يشعر الطلاب بقلة الحافز ويهملون حل واجباتهم المدرسية."
      }
    ],
    mcqQuestions: [
      {
        questionEn: "Schools are good places for...",
        questionAr: "المدارس أماكن جيدة لـ...",
        options: [
          { key: "a", textEn: "wasting time", textAr: "إضاعة الوقت" },
          { key: "b", textEn: "meeting people / socializing", textAr: "لقاء الناس والتواصل" },
          { key: "c", textEn: "facing problems only", textAr: "مواجهة المشاكل فقط" }
        ],
        correctKey: "b",
        explanation: "ذكر في النص أن المدارس أماكن جيدة للتواصل والاختلاط (socializing / meeting people)."
      },
      {
        questionEn: "Stresses of school life may cause ... to students.",
        questionAr: "ضغوط الحياة المدرسية قد تسبب ... للطلاب.",
        options: [
          { key: "a", textEn: "enjoyment", textAr: "استمتاع" },
          { key: "b", textEn: "motivation", textAr: "تحفيز" },
          { key: "c", textEn: "depression", textAr: "اكتئاب" }
        ],
        correctKey: "c",
        explanation: "الضغوط المدرسية تسبب أحياناً الاكتئاب والشعور بالحزن وفق النص (depressed)."
      }
    ]
  },
  {
    id: "bullying-text",
    titleEn: "Bullying at School",
    titleAr: "ظاهرة التنمر في المدرسة",
    unit: "Unit 2: A Challenge (تحدٍ) - Page 7 & 13",
    paragraphs: [
      {
        en: "People bully by many ways like name-calling, saying or writing unpleasant things about other people, keeping them apart from activities on purpose to harm them and hurt their feelings, leaving them alone and not talking to them, making them feel uncomfortable or scared, taking or damaging their belongings, and obliging them to do something they really don't want to do.",
        ar: "يتنمر الناس بطرق كثيرة مثل إطلاق الألقاب، أو قول أو كتابة أشياء غير لطيفة عن الآخرين، وإبعادهم عن الأنشطة عمداً لإيذائهم وجرح مشاعرهم، وتركهم وحدهم وعدم التحدث معهم، وجعلهم يشعرون بعدم الراحة أو الخوف، وأخذ أو إتلاف ممتلكاتهم، وإجبارهم على فعل شيء لا يريدون فعله."
      },
      {
        en: "Hitting, kicking, knocking things out of their hands, pushing, etc. are also bullying.",
        ar: "الضرب، والركل، وإسقاط الأشياء من أيديهم، والدفع، إلخ، هي أيضاً تنمر."
      },
      {
        en: "In fact, some bullies don't even know that they're bullying or how the person they bully actually feels. People bully for many reasons. Some of these reasons are because they may feel it makes them popular, or they think it's not just for an entertainment.",
        ar: "في الواقع، بعض المتنمرين لا يعرفون حتى أنهم يتنمرون أو كيف يشعر الشخص الذي يتنمرون عليه حقاً. يتنمر الناس لأسباب كثيرة؛ يعتقد بعضهم أن ذلك يجعلهم محبوبين ومشهورين، أو يظنون أن ذلك مجرد ترفيه وتسلية."
      },
      {
        en: "Sometimes people bully because that's the only way they can be the centre of attention or because they are jealous of the person they're bullying.",
        ar: "أحياناً يتنمر الناس لأن هذا هو السبيل الوحيد ليكونوا مركز الانتباه والاهتمام، أو لأنهم يشعرون بالغيرة والحسد من الشخص الذي يتنمرون عليه."
      },
      {
        en: "Therefore, we need to be strong and self-confident. We should always keep in mind, if we don't have anything nice to say to someone, it's better to keep silent. And remember the golden rule: 'Treat others the way you would want them to treat you'.",
        ar: "لذلك، نحتاج إلى أن نكون أقوياء وواثقين بأنفسنا. ويجب أن نتذكر دائماً: إذا لم يكن لدينا شيء لطيف نقوله لشخص ما، فالأفضل أن نصمت. وتذكر القاعدة الذهبية: 'عامل الآخرين كما تحب أن يعاملوك'."
      }
    ],
    keyWords: [
      { word: "bully", type: "v./n.", enDef: "to frighten or hurt a weaker person", arMeaning: "يتنمر / شخص متنمّر" },
      { word: "on purpose", type: "adv.", enDef: "not by accident / deliberately", arMeaning: "عن قصد / عمداً" },
      { word: "damaging", type: "adj./v.", enDef: "having a bad effect or causing harm", arMeaning: "مُضِر / إتلاف" },
      { word: "belongings", type: "n.", enDef: "the things that you own", arMeaning: "ممتلكات / أغراض شخصية" },
      { word: "oblige", type: "v.", enDef: "to force somebody to do something", arMeaning: "يُجبِر / يفرض على" },
      { word: "popular", type: "adj.", enDef: "liked or enjoyed by a large number of people", arMeaning: "محبوب / واسع الانتشار" },
      { word: "entertainment", type: "n.", enDef: "things that interest and amuse people", arMeaning: "تسلية / ترفيه" },
      { word: "jealous", type: "adj.", enDef: "feeling unhappy because somebody has something you wish you had", arMeaning: "غيور / حسود" }
    ],
    questions: [
      {
        questionEn: "What is the golden rule mentioned in the text?",
        questionAr: "ما هي القاعدة الذهبية المذكورة في النص؟",
        answerEn: "Treat others the way you would want them to treat you.",
        answerAr: "عامل الآخرين بالطريقة التي تحب أن يعاملوك بها."
      },
      {
        questionEn: "Why do some people bully others?",
        questionAr: "لماذا يتنمر بعض الناس على الآخرين؟",
        answerEn: "To draw attention, feel popular, for entertainment, or because they are jealous.",
        answerAr: "لجذب الانتباه، أو ليشعروا أنهم مشهورون، أو للتسلية، أو بسبب الغيرة."
      }
    ],
    mcqQuestions: [
      {
        questionEn: "Bullies misbehave in order to...",
        questionAr: "يتصرف المتنمرون بشكل سيئ بهدف...",
        options: [
          { key: "a", textEn: "help teachers", textAr: "مساعدة المعلمين" },
          { key: "b", textEn: "draw other people's attention", textAr: "لفت انتباه الآخرين" },
          { key: "c", textEn: "study better", textAr: "الدراسة بشكل أفضل" }
        ],
        correctKey: "b",
        explanation: "المتنمرون يحاولون أن يكونوا مركز الاهتمام ولفت الأنظار (draw other people's attention)."
      },
      {
        questionEn: "Self-confidence helps people to ... bullying.",
        questionAr: "الثقة بالنفس تساعد الأشخاص على ... التنمر.",
        options: [
          { key: "a", textEn: "live with", textAr: "العيش معه" },
          { key: "b", textEn: "get accustomed to", textAr: "التأقلم معه" },
          { key: "c", textEn: "overcome", textAr: "التغلب عليه" }
        ],
        correctKey: "c",
        explanation: "الثقة بالنفس تمنح الشخص القوة للتغلب على التنمر (overcome)."
      }
    ]
  }
];

// 2. SPEAKING & SURVEYS
export const SPEAKING_ACTIVITIES = [
  {
    id: "unit2-survey",
    titleEn: "Make a Classroom Survey",
    titleAr: "استبيان الزميل في الصف - العودة إلى المدرسة",
    descriptionAr: "تدريب عملي على التحدث وطرح الأسئلة والإجابة عنها حول مشاعر العودة إلى المدرسة والتحديات وكيفية التغلب عليها.",
    samplePerson: {
      name: "Omar (عمر)",
      qa: [
        {
          qEn: "What's your feeling when you are back to school?",
          qAr: "ما هو شعورك عندما تعود إلى المدرسة؟",
          aEn: "I feel excited.",
          aAr: "أنا أشعر بالحماس."
        },
        {
          qEn: "What difficulties are you facing?",
          qAr: "ما هي الصعوبات التي تواجهها؟",
          aEn: "Too much homework.",
          aAr: "الكثير من الواجبات المنزلية."
        },
        {
          qEn: "How can you overcome these difficulties?",
          qAr: "كيف يمكنك التغلب على هذه الصعوبات؟",
          aEn: "By making a study plan.",
          aAr: "من خلال وضع خطة دراسية منظمة."
        },
        {
          qEn: "Who helps you to overcome them?",
          qAr: "من يساعدك على التغلب عليها؟",
          aEn: "My parents and my teacher.",
          aAr: "والدي ومعلمي."
        }
      ]
    }
  },
  {
    id: "bullying-photo-discussion",
    titleEn: "Photo Discussion: Dealing with Bullying",
    titleAr: "مناقشة الصورة: التعامل مع التنمر المدرسي",
    descriptionAr: "التعبير الشفهي عن مشهد طالبة تبكي بسبب سخرية زملائها، واقتراح حلول مناسبة.",
    questions: [
      {
        qEn: "What can you see in the photo?",
        qAr: "ماذا تستطيع أن ترى في الصورة؟",
        suggestedEn: "I can see a girl crying and some students laughing at her.",
        suggestedAr: "أرى فتاة تبكي وبعض الطلاب يضحكون عليها ويسخرون منها."
      },
      {
        qEn: "Why do you think the girl is standing like that?",
        qAr: "لماذا تعتقد أن الفتاة تقف هكذا وتغطي وجهها؟",
        suggestedEn: "I think she is upset because other students are laughing at her.",
        suggestedAr: "أعتقد أنها منزعجة وحزينة لأن الطلاب الآخرين يسخرون منها."
      },
      {
        qEn: "Speak about a problem you or your friend faced at school and how it was solved.",
        qAr: "تحدث عن مشكلة واجهتها أنت أو صديقك في المدرسة وكيف تم حلها.",
        suggestedEn: "I had a problem with a classmate who was bullying me. I told my teacher and my teacher talked to him, and the problem was solved.",
        suggestedAr: "واجهت مشكلة مع زميل كان يتنمر عليّ. أخبرت معلمي وتحدث معه، وتم حل المشكلة بسلام."
      }
    ]
  }
];

// 3. LISTENING LAB
export const LISTENING_LESSONS = [
  {
    id: "jessica-mike-dialogue",
    titleEn: "Mike's Birthday Presents Dialogue",
    titleAr: "حوار هدايا عيد ميلاد مايك (بين جيسيكا ومايك)",
    unit: "Module 1 Unit 2 Listening",
    audioDialogue: [
      { speaker: "Jessica", textEn: "Hi Nick. What's that you're reading?", textAr: "مرحباً نيك. ماذا تقرأ هناك؟" },
      { speaker: "Mike", textEn: "It's a book my cousin got me for my birthday. It's really interesting Jessica.", textAr: "إنه كتاب أحضره لي ابن عمي في عيد ميلادي، إنه ممتع حقاً يا جيسيكا." },
      { speaker: "Jessica", textEn: "Oh yes, I forgot it was your birthday. What did you get from your mum?", textAr: "أوه نعم، لقد نسيت أنه كان عيد ميلادك! ماذا حصلت من والدتك؟" },
      { speaker: "Mike", textEn: "Well, I asked for a new bike, but she bought me this phone instead. I can listen to music on it and take pictures!", textAr: "حسناً، طلبت دراجة جديدة، لكنها اشترت لي هذا الهاتف الذكي بدلاً منها. أستطيع الاستماع للموسيقى والتقاط الصور!" },
      { speaker: "Jessica", textEn: "Oh! And what did your brother get you? A computer game?", textAr: "رائع! وماذا أحضر لك أخوك؟ لعبة كمبيوتر؟" },
      { speaker: "Mike", textEn: "He bought me this jacket. Do you like it?", textAr: "اشترى لي هذه السترة الجميلة. هل تعجبك؟" },
      { speaker: "Jessica", textEn: "It's great. Did your aunt buy you anything?", textAr: "إنها ممتازة جداً! هل اشترت لك خالتك أي شيء؟" },
      { speaker: "Mike", textEn: "Well, she usually gives me money. But this year she got me two tickets to see a film.", textAr: "حسناً، هي عادة تعطيني نقوداً، لكنها أحضرت لي هذا العام تذكرتين لمشاهدة فيلم بالسينما." },
      { speaker: "Jessica", textEn: "And what about your uncle? He knows a lot about music, doesn't he?", textAr: "وماذا عن عمك؟ إنه يعرف الكثير عن الموسيقى، أليس كذلك؟" },
      { speaker: "Mike", textEn: "Yes, he usually buys me a CD. But this time he gave me twenty pounds and told me to choose something myself.", textAr: "نعم، عادة يشتري لي أسطوانة موسيقية، لكن هذه المرة أعطاني 20 جنيهاً وطلب مني أن أختار بنفسي." },
      { speaker: "Jessica", textEn: "And did your grandmother give you anything?", textAr: "وهل أعطتك جدتك أي شيء؟" },
      { speaker: "Mike", textEn: "Well, I often get clothes from her, but this year she gave me a computer game. My brother helped her choose it!", textAr: "حسناً، غالباً ما أحصل على ملابس منها، لكنها أهدتني هذا العام لعبة كمبيوتر بمساعدة أخي!" }
    ],
    trueFalseQuestions: [
      {
        id: "tf1",
        statementEn: "The book Mike was reading is from his father.",
        statementAr: "الكتاب الذي كان يقرؤه مايك كان من والده.",
        isTrue: false,
        explanation: "خطأ (False): الكتاب كان هدية من ابن عمه (cousin) وليس والده."
      },
      {
        id: "tf2",
        statementEn: "Jessica came to attend Mike's birthday.",
        statementAr: "جيسيكا حضرت حفل عيد ميلاد مايك.",
        isTrue: false,
        explanation: "خطأ (False): جيسيكا نسيت موعد عيد ميلاده ولم تحضر الحفل."
      },
      {
        id: "tf3",
        statementEn: "Mike's brother bought him a jacket.",
        statementAr: "أخو مايك اشترى له سترة.",
        isTrue: true,
        explanation: "صحيح (True): اشترى له سترة جميلة (He bought me this jacket)."
      },
      {
        id: "tf4",
        statementEn: "His grandmother brought him some clothes.",
        statementAr: "جدته أحضرت له بعض الملابس هذا العام.",
        isTrue: false,
        explanation: "خطأ (False): بالرغم من أنها عادة تعطيه ملابس، إلا أنها هذا العام أهدته لعبة كمبيوتر (computer game)."
      }
    ],
    matchingPairs: [
      { person: "Uncle (العم)", gift: "twenty pounds (عشرون جنيهاً)" },
      { person: "Aunt (الخالة)", gift: "two tickets to see a film (تذكرتان لمشاهدة فيلم)" },
      { person: "Grandmother (الجدة)", gift: "computer game (لعبة كمبيوتر)" },
      { person: "Mum (الأم)", gift: "phone (هاتف)" }
    ]
  }
];

// 4. VOCABULARY & FLASHCARDS
export const VOCABULARY_LIST: VocabularyItem[] = [
  {
    id: "v1",
    word: "self-esteem",
    partOfSpeech: "n.",
    arMeaning: "احترام الذات / الشعور بالرضا عن النفس",
    enDefinition: "a feeling of being happy with your character and abilities",
    exampleEn: "We need to build our self-esteem to succeed in life.",
    exampleAr: "نحتاج إلى بناء احترامنا لذاتنا للنجاح في الحياة.",
    unit: "Unit 2"
  },
  {
    id: "v2",
    word: "hesitate",
    partOfSpeech: "v.",
    arMeaning: "يتردد / يتباطأ في اتخاذ القرار",
    enDefinition: "to be slow to act because you feel uncertain",
    exampleEn: "John didn't hesitate for a moment about taking the job.",
    exampleAr: "لم يتردد جون للحظة في قبول الوظيفة.",
    unit: "Unit 2"
  },
  {
    id: "v3",
    word: "possible",
    partOfSpeech: "adj.",
    arMeaning: "ممكن / قابل للتحقق",
    enDefinition: "able to be done or achieved",
    exampleEn: "With hard work, everything is possible.",
    exampleAr: "بالعمل الجاد، كل شيء ممكن.",
    unit: "Unit 2"
  },
  {
    id: "v4",
    word: "complicated",
    partOfSpeech: "adj.",
    arMeaning: "معقد / صعب الفهم",
    enDefinition: "difficult to understand or explain",
    exampleEn: "The story I've read last night is complicated.",
    exampleAr: "القصة التي قرأتها الليلة الماضية معقدة.",
    unit: "Unit 2"
  },
  {
    id: "v5",
    word: "Bullying",
    partOfSpeech: "n.",
    arMeaning: "التنمر / سلوك عدواني لإيذاء الآخرين",
    enDefinition: "aggressive behavior intended to harm or frighten someone",
    exampleEn: "Bullying is a serious problem in many schools.",
    exampleAr: "التنمر مشكلة خطيرة في العديد من المدارس.",
    unit: "Unit 2"
  },
  {
    id: "v6",
    word: "depressed",
    partOfSpeech: "adj.",
    arMeaning: "مكتئب / يشعر بالحزن الشديد وفقدان الأمل",
    enDefinition: "very sad and without hope",
    exampleEn: "Nada felt lonely and depressed after moving to a new city.",
    exampleAr: "شعرت ندى بالوحدة والاكتئاب بعد الانتقال لمدينة جديدة.",
    unit: "Unit 2"
  },
  {
    id: "v7",
    word: "exposed",
    partOfSpeech: "v./adj.",
    arMeaning: "معرض لـ / مكشوف لشيء ما",
    enDefinition: "not protected from something dangerous or unpleasant",
    exampleEn: "Potatoes turn green when exposed to light.",
    exampleAr: "تتحول البطاطا للون الأخضر عند تعرضها للضوء.",
    unit: "Unit 2"
  },
  {
    id: "v8",
    word: "belongings",
    partOfSpeech: "n.",
    arMeaning: "ممتلكات / أغراض شخصية",
    enDefinition: "the things that you own",
    exampleEn: "Never damage or take other people's belongings.",
    exampleAr: "إياك وإتلاف أو أخذ ممتلكات الآخرين.",
    unit: "Unit 2"
  },
  {
    id: "v9",
    word: "on purpose",
    partOfSpeech: "adv.",
    arMeaning: "عمداً / عن قصد",
    enDefinition: "deliberately, not by accident",
    exampleEn: "He knocked the glass on purpose.",
    exampleAr: "أسقط الكأس عن قصد.",
    unit: "Unit 2"
  },
  {
    id: "v10",
    word: "jealous",
    partOfSpeech: "adj.",
    arMeaning: "غيور / حسود",
    enDefinition: "feeling unhappy because someone has something you want",
    exampleEn: "Bullies are often jealous of their victims.",
    exampleAr: "المتنمرون غالباً ما يغارون من ضحاياهم.",
    unit: "Unit 2"
  }
];

export const VERB_NOUN_PAIRS: VerbNounPair[] = [
  { verb: "bully", verbAr: "يتنمر", noun: "bullying", nounAr: "التنمر" },
  { verb: "push", verbAr: "يدفع", noun: "pushing", nounAr: "الدفع" },
  { verb: "kick", verbAr: "يركل", noun: "kicking", nounAr: "الركل" },
  { verb: "knock", verbAr: "يطرق / يسقط", noun: "knocking", nounAr: "الطرق / الإسقاط" },
  { verb: "hit", verbAr: "يضرب", noun: "hitting", nounAr: "الضرب" },
  { verb: "belong", verbAr: "ينتمي / يمتلك", noun: "belonging", nounAr: "الانتماء / الممتلكات" }
];

export const SILENT_LETTERS_DATA = {
  hSilent: [
    { word: "hour", ar: "ساعة (زمنية)" },
    { word: "honest", ar: "صادق / أمين" },
    { word: "honour", ar: "شرف / تكريم" },
    { word: "when", ar: "متى / عندما" },
    { word: "where", ar: "أين / حيث" },
    { word: "ghost", ar: "شبح" },
    { word: "chaos", ar: "فوضى" },
    { word: "rhyme", ar: "قافية" },
    { word: "school", ar: "مدرسة" },
    { word: "while", ar: "بينما" },
    { word: "why", ar: "لماذا" },
    { word: "which", ar: "أي / التي" },
    { word: "what", ar: "ماذا" }
  ],
  ghSilent: [
    { word: "night", ar: "ليل" },
    { word: "high", ar: "عالٍ / مرتفع" },
    { word: "thought", ar: "فكر / فكرة" },
    { word: "neighbour", ar: "جار" },
    { word: "straight", ar: "مستقيم" },
    { word: "might", ar: "قد / ربما" },
    { word: "weight", ar: "وزن" },
    { word: "daughter", ar: "ابنة" },
    { word: "right", ar: "يمين / صحيح" },
    { word: "bright", ar: "مضيء / لامع" },
    { word: "brought", ar: "أحضر" },
    { word: "tough", ar: "قاسٍ / صلب (تلفظ ف)" }
  ]
};

// 5. GRAMMAR MASTERCLASS
export const GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    id: "past-simple-vs-continuous",
    titleEn: "Past Simple vs. Past Continuous (Progressive)",
    titleAr: "الماضي البسيط مقابل الماضي المستمر وقاعدة When و While",
    ruleExplanationAr: [
      "الماضي البسيط (Past Simple): يُستخدم لوصف حدث وقع وانتهى في الماضي في وقت محدد (مدّة الحدث ليست مهمة).",
      "الماضي المستمر (Past Continuous): يُستخدم لوصف حدث كان مستمراً في وقت معين في الماضي صياغته: (was/were + verb-ing).",
      "الربط بأداة (When): تستخدم لربط حدث كان مستمراً (Past Continuous) مع حدث مفاجئ قطعه في نفس الوقت (Past Simple).",
      "الربط بأداة (While): يأتي بعدها عادة ماضٍ مستمر (Past Continuous) لأنها تدل على الاستمرارية."
    ],
    rules: [
      {
        patternEn: "Past Continuous + when + Past Simple",
        explanationAr: "حدث طويل مستمر قاطعه حدث قصير مفاجئ",
        exampleEn: "Ahmad was watching T.V. when his friend came to visit him.",
        exampleAr: "كان أحمد يشاهد التلفاز عندما جاء صديقه لزيارته."
      },
      {
        patternEn: "While + Past Continuous, Past Simple",
        explanationAr: "بينما كان الحدث مستمراً، حدث أمر آخر",
        exampleEn: "While we were eating the cake, John came.",
        exampleAr: "بينما كنا نأكل الكعكة، أتى جون."
      },
      {
        patternEn: "Negative: wasn't / weren't + verb-ing",
        explanationAr: "نفي الماضي المستمر",
        exampleEn: "Ahmad wasn't watching T.V. when his friend came.",
        exampleAr: "لم يكن أحمد يشاهد التلفاز عندما جاء صديقه."
      },
      {
        patternEn: "Interrogative: Was/Were + Subject + verb-ing?",
        explanationAr: "سؤال الماضي المستمر",
        exampleEn: "Was Ahmad watching T.V. when his friend came to visit him?",
        exampleAr: "هل كان أحمد يشاهد التلفاز عندما جاء صديقه لزيارته؟"
      }
    ],
    signalWords: [
      { en: "yesterday", ar: "أمس (ماضٍ بسيط)" },
      { en: "last week / month", ar: "الأسبوع / الشهر الماضي (ماضٍ بسيط)" },
      { en: "ago (ten years ago)", ar: "منذ (ماضٍ بسيط)" },
      { en: "in 2010", ar: "في عام ماضٍ (ماضٍ بسيط)" },
      { en: "when", ar: "عندما (يأتي بعدها ماضٍ بسيط)" },
      { en: "while / as", ar: "بينما (يأتي بعدها ماضٍ مستمر)" }
    ],
    quiz: [
      {
        id: "gq1",
        question: "She __________ a book when the phone rang.",
        options: ["read", "was reading", "is reading", "reads"],
        correctIndex: 1,
        explanation: "حدث مستمر في الماضي قطعه رنين الهاتف، نستخدم الماضي المستمر: was reading."
      },
      {
        id: "gq2",
        question: "When they __________, we were waiting for the bus.",
        options: ["were arriving", "arrived", "arrive", "have arrived"],
        correctIndex: 1,
        explanation: "بعد أداة when للحدث المفاجئ نستخدم الماضي البسيط: arrived."
      },
      {
        id: "gq3",
        question: "My stereo __________ working last night.",
        options: ["stops", "stopped", "was stopping", "has stopped"],
        correctIndex: 1,
        explanation: "مع الدلالة الزمنية last night نستخدم الماضي البسيط: stopped."
      },
      {
        id: "gq4",
        question: "Samer __________ a shower when the telephone rang.",
        options: ["is taking", "was taking", "took", "takes"],
        correctIndex: 1,
        explanation: "كان في حالة استحمام مستمرة عندما رن الهاتف: was taking."
      },
      {
        id: "gq5",
        question: "John was playing tennis when he __________ his leg.",
        options: ["hurts", "hurt", "was hurting", "is hurting"],
        correctIndex: 1,
        explanation: "فعل الإصابة حدث قاطع في الماضي البسيط: hurt (التصريف الثاني هو hurt نفسه)."
      }
    ]
  },
  {
    id: "conjunctions-rules",
    titleEn: "Conjunctions: and, but, or, so",
    titleAr: "أدوات الربط: and (و) / but (لكن) / or (أو) / so (لذلك)",
    ruleExplanationAr: [
      "and (و): تُستخدم لربط الأفكار المتشابهة والإضافة (Used to add similar ideas).",
      "but (لكن): تُستخدم لربط فكرتين مختلفتين أو إظهار التناقض (Used to show contrast).",
      "or (أو): تُستخدم للاختيار بين أمرين أو شيئين (Used to give a choice).",
      "so (لذلك): تُستخدم للتعبير عن النتيجة المنطقية لسبب معين (Shows result)."
    ],
    rules: [
      {
        patternEn: "and (إضافة)",
        explanationAr: "I like reading and writing.",
        exampleEn: "I like English and Math.",
        exampleAr: "أحب القراءة والكتابة / أحب الإنجليزية والرياضيات."
      },
      {
        patternEn: "but (تناقض)",
        explanationAr: "I was tired, but I went to school.",
        exampleEn: "I like Math, but I don't like Physics.",
        exampleAr: "كنت متعباً، لكني ذهبت إلى المدرسة."
      },
      {
        patternEn: "or (خيارات)",
        explanationAr: "Do you want tea or coffee?",
        exampleEn: "You can walk or take the bus.",
        exampleAr: "هل تريد شاياً أم قهوة؟"
      },
      {
        patternEn: "so (نتيجة)",
        explanationAr: "I studied hard, so I got good marks.",
        exampleEn: "It was raining, so we stayed at home.",
        exampleAr: "درست بجد، لذلك حصلت على درجات ممتازة."
      }
    ],
    quiz: [
      {
        id: "cq1",
        question: "I was tired, __________ I studied for the exam.",
        options: ["and", "but", "or", "so"],
        correctIndex: 1,
        explanation: "هناك تناقض بين التعب والدراسة، لذلك نستخدم but."
      },
      {
        id: "cq2",
        question: "Do you want tea __________ coffee?",
        options: ["and", "or", "but", "so"],
        correctIndex: 1,
        explanation: "سؤال للتخيير بين مشروبين، نستخدم or."
      },
      {
        id: "cq3",
        question: "I studied hard, __________ I got full marks.",
        options: ["so", "but", "or", "because"],
        correctIndex: 0,
        explanation: "الحصول على الدرجات التامة كان نتيجة للدراسة بجد، فنستخدم so."
      }
    ]
  },
  {
    id: "modal-may-and-gerunds",
    titleEn: "Modal Verb 'May' & Gerunds as Subjects",
    titleAr: "استخدام الفعل المساعد May للاحتمالية + تحويل الفعل إلى اسم (-ing)",
    ruleExplanationAr: [
      "نستخدم May للتحدث عن الاحتمالية وإمكانية حدوث الشيء (possibility).",
      "يأتي بعد May دائماً الفعل بالمصدر المجرد: base form of the verb (may + inf).",
      "لتحويل الفعل إلى اسم (Gerund)، نضيف عادة -ing إلى نهاية الفعل.",
      "يمكن استخدام الاسم المضاف له -ing كفاعل في بداية الجملة للتحدث عن حقائق عامة (Bullying is wrong)."
    ],
    rules: [
      {
        patternEn: "Subject + may + Verb (infinitive)",
        explanationAr: "التعبير عن الاحتمال",
        exampleEn: "I may go to the park today. / You may study harder.",
        exampleAr: "قد أذهب إلى الحديقة اليوم / قد تدرس باجتهاد أكبر."
      },
      {
        patternEn: "Verb + -ing = Noun / Subject",
        explanationAr: "استخدام اسم الفاعل في بداية الجملة",
        exampleEn: "Bullying hurts people. / Pushing others is not kind.",
        exampleAr: "التنمر يؤذي الناس / دفع الآخرين ليس من اللطف."
      }
    ],
    quiz: [
      {
        id: "mq1",
        question: "Our marks may __________ low if we don't study.",
        options: ["became", "become", "becoming", "becomes"],
        correctIndex: 1,
        explanation: "بعد الفعل المساعد may يجب أن يكون الفعل بالمصدر المجرد: become."
      },
      {
        id: "mq2",
        question: "__________ others can hurt people physically.",
        options: ["Hit", "Hitting", "Hits", "Hitted"],
        correctIndex: 1,
        explanation: "نحتاج اسم في موضع الفاعل، فنضيف ing للفعل: Hitting."
      }
    ]
  }
];

// 6. FOCUS ON PHYSICS (NEWTON'S LAWS)
export const PHYSICS_CONTENT = {
  titleEn: "Focus on Physics: Newton's Laws of Motion",
  titleAr: "التركيز على الفيزياء: قوانين نيوتن للحركة",
  introQuestions: [
    { qEn: "Do you love physics? Why?", qAr: "هل تحب الفيزياء؟ ولماذا؟", aEn: "Yes, because it explains how our world works.", aAr: "نعم، لأنها تشرح كيف يعمل عالمنا والكون من حولنا." },
    { qEn: "How do we use physics in our daily life?", qAr: "كيف نستخدم الفيزياء في حياتنا اليومية؟", aEn: "In driving cars, using electricity, playing sports, and walking.", aAr: "في قيادة السيارات، واستخدام الكهرباء، وممارسة الرياضة، والمشي." }
  ],
  laws: [
    {
      number: "1st Law (القانون الأول)",
      statementEn: "An object will not change its motion unless a force acts on it.",
      statementAr: "يبقى الجسم ساكناً أو يستمر في حركته في خط مستقيم ما لم تؤثر عليه قوة خارجية تغير حالته.",
      explanation: "قانون القصور الذاتي (Inertia): الأجسام تميل للبقاء على حالتها الحركية.",
      formula: "V = constant if Net Force = 0",
      diagramConcept: "Car and passenger / ball at rest"
    },
    {
      number: "2nd Law (القانون الثاني)",
      statementEn: "The acceleration of an object depends on two things, force and mass.",
      statementAr: "تسارع الجسم يعتمد على شيئين: القوة المؤثرة عليه وكتلته.",
      explanation: "القوة = الكتلة × التسارع (Force = mass × acceleration). كلما زادت القوة زاد التسارع، وكلما كبرت الكتلة قل التسارع.",
      formula: "F = m × a",
      diagramConcept: "The more force... The more acceleration (Small mass = large acceleration)"
    },
    {
      number: "3rd Law (القانون الثالث)",
      statementEn: "For every action, there is an equal and opposite reaction.",
      statementAr: "لكل فعل رد فعل، مساوٍ له في المقدار ومعاكس له في الاتجاه.",
      explanation: "عندما يدفع جسم ما جسماً آخر، يدفع الجسم الثاني بقوة مساوية ومعاكسة.",
      formula: "F_action = - F_reaction",
      diagramConcept: "Action & Reaction arrows / pushing off a skateboard"
    }
  ],
  vocabulary: [
    { en: "motion", type: "n.", ar: "حركة" },
    { en: "force", type: "n.", ar: "قوة" },
    { en: "law", type: "n.", ar: "قانون" },
    { en: "acceleration", type: "n.", ar: "تسارع (معدل ازدياد السرعة)" },
    { en: "mass", type: "n.", ar: "كتلة" },
    { en: "object", type: "n.", ar: "جسم / كائن" },
    { en: "equal", type: "adj.", ar: "متساوٍ" },
    { en: "opposite", type: "adj.", ar: "معاكس / مضاد" }
  ],
  grammarScienceNote: {
    titleEn: "Grammar & Science Note",
    titleAr: "ملاحظة لغوية وعلمية: زمن الحاضر البسيط للحقائق العلمية",
    noteAr: "نستخدم زمن الحاضر البسيط (Present Simple) لذكر الحقائق العلمية والقوانين الطبيعية الثابتة لأنها دائمة الصدق.",
    examples: [
      { en: "Water boils at 100°C.", ar: "يغلي الماء عند درجة 100 مئوية." },
      { en: "The earth goes around the sun.", ar: "تدور الأرض حول الشمس." },
      { en: "Newton's laws describe how objects move.", ar: "تصف قوانين نيوتن كيف تتحرك الأجسام." }
    ]
  }
};

// 7. THE 7 CURRICULUM WORKSHEETS (WITH FULL MODEL ANSWERS BY T. JAIDAA SAQER)
export const CURRICULUM_WORKSHEETS: WorksheetItem[] = [
  {
    id: 1,
    titleEn: "Worksheet 1: Unit 2 'A Challenge' - Speaking & Reading",
    titleAr: "ورقة عمل 1: الوحدة الثانية (تحدٍ) - التحدث وقراءة أوقات مقلقة",
    pageNumber: "Unit 2 Overview",
    unit: "Unit 2",
    description: "استبيان العودة إلى المدرسة، نص أوقات مقلقة، ومراجعة الأزمنة والحروف الصامتة.",
    sections: [
      {
        title: "A - Speaking Survey (Omar's Answers)",
        instructionsEn: "Review the answers in Omar's survey table and answer the following questions:",
        instructionsAr: "راجع إجابات عمر في جدول الاستبيان وأجب عما يلي:",
        questions: [
          {
            id: "ws1-q1",
            promptEn: "What is Omar's feeling when he is back to school?",
            promptAr: "ما هو شعور عمر عند العودة للمدرسة؟",
            type: "mcq",
            options: ["I feel depressed", "I feel excited", "I feel bored", "I feel scared"],
            modelAnswer: "I feel excited",
            modelAnswerAr: "يشعر بالحماس (I feel excited).",
            explanation: "وفق جدول استبيان التحدث في ورقة العمل."
          },
          {
            id: "ws1-q2",
            promptEn: "What difficulty is Omar facing at school?",
            promptAr: "ما الصعوبة التي يواجهها عمر؟",
            type: "mcq",
            options: ["No friends", "Too much homework", "Difficult exams", "No computers"],
            modelAnswer: "Too much homework",
            modelAnswerAr: "كثير من الواجبات المنزلية (Too much homework).",
            explanation: "ذكر عمر أن الواجبات كثيرة."
          },
          {
            id: "ws1-q3",
            promptEn: "How can Omar overcome his difficulties?",
            promptAr: "كيف يمكن لعمر التغلب على صعوباته؟",
            type: "mcq",
            options: ["By playing games", "By making a study plan", "By leaving school", "By sleeping early"],
            modelAnswer: "By making a study plan",
            modelAnswerAr: "بوضع خطة دراسية (By making a study plan).",
            explanation: "الحل النموذجي في الورقة هو وضع خطة دراسية."
          }
        ]
      },
      {
        title: "B - Reading: A Worrying Time Comprehension",
        instructionsEn: "Based on the text 'A Worrying Time', decide whether the statement is True or False:",
        instructionsAr: "بناءً على نص 'أوقات مقلقة'، حدد ما إذا كانت العبارة صحيحة أم خاطئة:",
        questions: [
          {
            id: "ws1-q4",
            promptEn: "Schools are good places for socializing.",
            promptAr: "المدارس أماكن جيدة للتواصل الاجتماعي.",
            type: "true-false",
            options: ["True (صحيح)", "False (خطأ)"],
            modelAnswer: "True (صحيح)",
            modelAnswerAr: "صحيح (True).",
            explanation: "ورد في السطر الثاني: Schools are good places for socializing."
          },
          {
            id: "ws1-q5",
            promptEn: "Some people passed through school without experiencing any problems.",
            promptAr: "بعض الناس مروا بالمدرسة دون مواجهة أي مشكلات على الإطلاق.",
            type: "true-false",
            options: ["True (صحيح)", "False (خطأ)"],
            modelAnswer: "False (خطأ)",
            modelAnswerAr: "خطأ (False).",
            explanation: "النص يذكر: No single person passed through school without experiencing some problems."
          }
        ]
      }
    ]
  },
  {
    id: 2,
    titleEn: "Worksheet 2: Vocabulary & Tenses in Context (Page 14)",
    titleAr: "ورقة عمل 2: المفردات وسياق الأزمنة وقاعدة When (صفحة 14)",
    pageNumber: "Page 14",
    unit: "Unit 2",
    description: "إكمال الجمل بالمفردات الصحيحة، ملء فراغات قصة الأزمنة، واختيار الزمن الصحيح.",
    sections: [
      {
        title: "A - Complete sentences using vocabulary box",
        instructionsEn: "Complete the sentences using: [Bullying, complicated, depressed, exposed, hesitate, self-esteem, possible]",
        instructionsAr: "أكمل الجمل التالية باستخدام المفردات الصحيحة:",
        questions: [
          {
            id: "ws2-q1",
            promptEn: "1- __________ is a problem in many schools.",
            promptAr: "1- ... هو مشكلة في العديد من المدارس.",
            type: "fill-blank",
            options: ["Bullying", "hesitate", "possible", "exposed"],
            modelAnswer: "Bullying",
            modelAnswerAr: "Bullying (التنمر)",
            explanation: "التنمر مشكلة منتشرة في العديد من المدارس."
          },
          {
            id: "ws2-q2",
            promptEn: "2- The story I've read last night is __________. I'll try and explain it.",
            promptAr: "2- القصة التي قرأتها الليلة الماضية ... سأحاول شرحها.",
            type: "fill-blank",
            options: ["complicated", "depressed", "possible", "self-esteem"],
            modelAnswer: "complicated",
            modelAnswerAr: "complicated (معقدة)",
            explanation: "القصة معقدة لذلك تحتاج إلى شرح."
          },
          {
            id: "ws2-q3",
            promptEn: "3- Nada felt lonely and __________.",
            promptAr: "3- شعرت ندى بالوحدة و...",
            type: "fill-blank",
            options: ["depressed", "hesitate", "exposed", "complicated"],
            modelAnswer: "depressed",
            modelAnswerAr: "depressed (مكتئبة)",
            explanation: "شعرت بالوحدة والاكتئاب."
          },
          {
            id: "ws2-q4",
            promptEn: "4- Potatoes turn green when __________ to light.",
            promptAr: "4- تتحول البطاطا للون الأخضر عند ... للضوء.",
            type: "fill-blank",
            options: ["exposed", "hesitate", "possible", "complicated"],
            modelAnswer: "exposed",
            modelAnswerAr: "exposed (تعرضها للضوء)",
            explanation: "عند التعرض للضوء: exposed to light."
          },
          {
            id: "ws2-q5",
            promptEn: "5- John didn't __________ for a moment about taking the job.",
            promptAr: "5- جون لم ... للحظة واحدة بشأن قبول الوظيفة.",
            type: "fill-blank",
            options: ["hesitate", "depressed", "Bullying", "exposed"],
            modelAnswer: "hesitate",
            modelAnswerAr: "hesitate (يتردد)",
            explanation: "didn't hesitate: لم يتردد."
          },
          {
            id: "ws2-q6",
            promptEn: "6- We need to be more satisfied with ourselves to build our __________.",
            promptAr: "6- يجب أن نكون أكثر رضا عن أنفسنا لنبني ...",
            type: "fill-blank",
            options: ["self-esteem", "possible", "complicated", "Bullying"],
            modelAnswer: "self-esteem",
            modelAnswerAr: "self-esteem (احترام الذات)",
            explanation: "بناء احترام الذات: build our self-esteem."
          }
        ]
      },
      {
        title: "B - Select the correct tense between brackets",
        instructionsEn: "Choose the correct past tense form:",
        instructionsAr: "اختر صيغة الزمن الصحيحة بين القوسين:",
        questions: [
          {
            id: "ws2-q7",
            promptEn: "My stereo (stops - stopped) working last night.",
            type: "mcq",
            options: ["stops", "stopped"],
            modelAnswer: "stopped",
            explanation: "ماضٍ بسيط بسبب وجود last night."
          },
          {
            id: "ws2-q8",
            promptEn: "The weather (is - was) dreadful at the weekend.",
            type: "mcq",
            options: ["is", "was"],
            modelAnswer: "was",
            explanation: "عطلة نهاية الأسبوع الماضية: was."
          },
          {
            id: "ws2-q9",
            promptEn: "Samer (was taking - is taking) a shower when the telephone rang.",
            type: "mcq",
            options: ["was taking", "is taking"],
            modelAnswer: "was taking",
            explanation: "حدث مستمر في الماضي قطعه رنين الهاتف."
          },
          {
            id: "ws2-q10",
            promptEn: "John was playing tennis when he (hurts - hurt) his leg.",
            type: "mcq",
            options: ["hurts", "hurt"],
            modelAnswer: "hurt",
            explanation: "التصريف الثاني للفعل هو hurt."
          },
          {
            id: "ws2-q11",
            promptEn: "I (was going - went) home when I met my friend.",
            type: "mcq",
            options: ["was going", "went"],
            modelAnswer: "was going",
            explanation: "كنت ذاهباً في طريقي (مستمر) عندما التقيت بصديقي."
          }
        ]
      }
    ]
  },
  {
    id: 3,
    titleEn: "Worksheet 3: Silent Letters & Writing 'My Ideal School' (Page 15)",
    titleAr: "ورقة عمل 3: الحروف الصامتة (h, gh) وكتابة المدرسة المثالية (صفحة 15)",
    pageNumber: "Page 15",
    unit: "Unit 2",
    description: "تصنيف الكلمات ذات الحرف الصامت وكتابة فقرة متماسكة باستخدام الروابط.",
    sections: [
      {
        title: "A - Silent Letters Classification",
        instructionsEn: "Identify whether the silent letter in each word is 'h' or 'gh':",
        instructionsAr: "حدد الحرف الصامت في الكلمات التالية هل هو 'h' أم 'gh':",
        questions: [
          {
            id: "ws3-q1",
            promptEn: "Word: 'hour' (ساعة)",
            type: "mcq",
            options: ["Silent 'h'", "Silent 'gh'"],
            modelAnswer: "Silent 'h'",
            explanation: "حرف h لا يلفظ: /aʊər/"
          },
          {
            id: "ws3-q2",
            promptEn: "Word: 'thought' (فكر)",
            type: "mcq",
            options: ["Silent 'h'", "Silent 'gh'"],
            modelAnswer: "Silent 'gh'",
            explanation: "حرف gh صامت تماماً: /θɔːt/"
          },
          {
            id: "ws3-q3",
            promptEn: "Word: 'honest' (صادق)",
            type: "mcq",
            options: ["Silent 'h'", "Silent 'gh'"],
            modelAnswer: "Silent 'h'",
            explanation: "حرف h صامت: /ˈɒnɪst/"
          },
          {
            id: "ws3-q4",
            promptEn: "Word: 'daughter' (ابنة)",
            type: "mcq",
            options: ["Silent 'h'", "Silent 'gh'"],
            modelAnswer: "Silent 'gh'",
            explanation: "حرف gh صامت: /ˈdɔːtə/"
          },
          {
            id: "ws3-q5",
            promptEn: "Word: 'straight' (مستقيم)",
            type: "mcq",
            options: ["Silent 'h'", "Silent 'gh'"],
            modelAnswer: "Silent 'gh'",
            explanation: "حرف gh صامت: /streɪt/"
          }
        ]
      },
      {
        title: "B - Writing Tips & Conjunctions (and, but, or)",
        instructionsEn: "Choose the suitable conjunction to connect the sentences:",
        instructionsAr: "اختر أداة الربط المناسبة لربط الجمل:",
        questions: [
          {
            id: "ws3-q6",
            promptEn: "I would like my school to be clean __________ safe.",
            type: "mcq",
            options: ["and", "but", "or"],
            modelAnswer: "and",
            explanation: "ربط صفتين إيجابيتين متشابهتين (and)."
          },
          {
            id: "ws3-q7",
            promptEn: "My current school is good, __________ it can be better in some ways.",
            type: "mcq",
            options: ["and", "but", "or"],
            modelAnswer: "but",
            explanation: "هناك استدراك وتناقض، نستخدم (but)."
          }
        ]
      }
    ]
  },
  {
    id: 4,
    titleEn: "Worksheet 4: Focus on Physics - Newton's Laws",
    titleAr: "ورقة عمل 4: التركيز على الفيزياء - قوانين نيوتن للحركة",
    pageNumber: "Focus on Physics",
    unit: "Unit 2",
    description: "مطابقة قوانين نيوتن الثلاثة وتفسيراتها العلمية والمفردات التخصصية.",
    sections: [
      {
        title: "A - Match Column A (Laws) with Column B (Scientific Meaning)",
        instructionsEn: "Match each of Newton's laws with its correct description:",
        instructionsAr: "طابق كل قانون من قوانين نيوتن بالوصف الصحيح:",
        questions: [
          {
            id: "ws4-q1",
            promptEn: "Newton's First Law (قانون نيوتن الأول)",
            type: "mcq",
            options: [
              "An object will not change its motion unless a force acts on it",
              "Force = mass × acceleration",
              "For every action, there is an equal and opposite reaction"
            ],
            modelAnswer: "An object will not change its motion unless a force acts on it",
            modelAnswerAr: "يبقى الجسم على حالته الحركية ما لم تؤثر عليه قوة خارجية تغيرها.",
            explanation: "القانون الأول يختص بالقصور الذاتي وثبات الحركة."
          },
          {
            id: "ws4-q2",
            promptEn: "Newton's Second Law (قانون نيوتن الثاني)",
            type: "mcq",
            options: [
              "For every action there is a reaction",
              "The acceleration depends on force and mass (The more force, the more acceleration)",
              "Objects stay at rest forever"
            ],
            modelAnswer: "The acceleration depends on force and mass (The more force, the more acceleration)",
            modelAnswerAr: "التسارع يعتمد على القوة والكتلة (كلما زادت القوة زاد التسارع).",
            explanation: "قانون القوة والتسارع: F = m × a."
          },
          {
            id: "ws4-q3",
            promptEn: "Newton's Third Law (قانون نيوتن الثالث)",
            type: "mcq",
            options: [
              "Action and reaction: For every action, there is an equal and opposite reaction",
              "Mass cannot be changed",
              "Water boils at 100 degrees"
            ],
            modelAnswer: "Action and reaction: For every action, there is an equal and opposite reaction",
            modelAnswerAr: "لكل فعل رد فعل مساوٍ له في المقدار ومعاكس له في الاتجاه.",
            explanation: "قانون الفعل ورد الفعل."
          }
        ]
      },
      {
        title: "B - Science & Grammar Check",
        instructionsEn: "Why do we use Present Simple in scientific laws?",
        instructionsAr: "لماذا نستخدم زمن الحاضر البسيط في القوانين العلمية؟",
        questions: [
          {
            id: "ws4-q4",
            promptEn: "We use the Present Simple tense in Newton's laws to...",
            type: "mcq",
            options: [
              "state general scientific facts and permanent truths",
              "talk about yesterday's events",
              "express imaginary dreams"
            ],
            modelAnswer: "state general scientific facts and permanent truths",
            modelAnswerAr: "للتعبير عن الحقائق العلمية العامة والثوابت الطبيعية.",
            explanation: "قاعدة الحاضر البسيط للحقائق الدائمة."
          }
        ]
      }
    ]
  },
  {
    id: 5,
    titleEn: "Worksheet 5: School Problems, Bullying & Modal 'May' (Page 13)",
    titleAr: "ورقة عمل 5: مشكلات المدرسة والتنمر واستخدام أداة May (صفحة 13)",
    pageNumber: "Page 13",
    unit: "Unit 2",
    description: "أسئلة الاستيعاب لنص مشكلات المدرسة، واختيار الإجابة الصحيحة a أو b أو c، وقاعدة may.",
    sections: [
      {
        title: "A - Multiple Choice Comprehension (a, b or c)",
        instructionsEn: "Choose the correct answer according to the text:",
        instructionsAr: "اختر الإجابة الصحيحة (a أو b أو c) وفق النص المعتمد:",
        questions: [
          {
            id: "ws5-q1",
            promptEn: "1- Schools are good places for __________.",
            promptAr: "1- المدارس أماكن جيدة لـ ...",
            type: "mcq",
            options: ["a- wasting time", "b- meeting people", "c- facing problems"],
            modelAnswer: "b- meeting people",
            modelAnswerAr: "b- meeting people (لقاء الناس وتكوين الصداقات)",
            explanation: "الخيار النموذجي المعتمد في ورقة المعلمة جيداء صقر."
          },
          {
            id: "ws5-q2",
            promptEn: "2- Stresses of school life may cause __________ to students.",
            promptAr: "2- ضغوطات الحياة المدرسية قد تسبب ... للطلاب.",
            type: "mcq",
            options: ["a- enjoyment", "b- motivation", "c- depression"],
            modelAnswer: "c- depression",
            modelAnswerAr: "c- depression (الاكتئاب والحزن)",
            explanation: "الضغوط النفسية تؤدي للاكتئاب."
          },
          {
            id: "ws5-q3",
            promptEn: "3- Bullying is a __________ problem.",
            promptAr: "3- التنمر مشكلة ...",
            type: "mcq",
            options: ["a- complex", "b- easy", "c- simple"],
            modelAnswer: "a- complex",
            modelAnswerAr: "a- complex (معقدة وصعبة)",
            explanation: "التنمر مشكلة معقدة (complex problem)."
          },
          {
            id: "ws5-q4",
            promptEn: "4- When students are careless of studying and doing homework, they will __________.",
            promptAr: "4- عندما يهمل الطلاب الدراسة والواجبات، فإنهم سوف ...",
            type: "mcq",
            options: ["a- be rewarded", "b- graduate early", "c- have bad results"],
            modelAnswer: "c- have bad results",
            modelAnswerAr: "c- have bad results (يحصلون على نتائج وعلامات سيئة)",
            explanation: "الإهمال يؤدي لنتائج سيئة وتدني الدرجات."
          }
        ]
      },
      {
        title: "B - Grammar: Modal 'May'",
        instructionsEn: "Choose the correct form of the verb after 'may':",
        instructionsAr: "اختر الصيغة الصحيحة للفعل بعد 'may':",
        questions: [
          {
            id: "ws5-q5",
            promptEn: "Our teachers may (helps - help - helped) us overcome our difficulties.",
            type: "mcq",
            options: ["helps", "help", "helped"],
            modelAnswer: "help",
            explanation: "نستخدم صيغة المصدر المجرد (base form) بعد may."
          }
        ]
      }
    ]
  },
  {
    id: 6,
    titleEn: "Worksheet 6: Listening - Birthday Presents & Writing Tips",
    titleAr: "ورقة عمل 6: الاستماع - هدايا عيد الميلاد ونموذج فقرة المدرسة",
    pageNumber: "Module 1 Unit 2 Listening",
    unit: "Unit 2",
    description: "حوار جيسيكا ومايك، مطابقة الهدايا بأصحابها، ونصائح كتابة فقرة متميزة.",
    sections: [
      {
        title: "A - True or False (Birthday Dialogue)",
        instructionsEn: "Decide if the statement is True or False according to the listening text:",
        instructionsAr: "حدد ما إذا كانت العبارة صحيحة أم خاطئة وفق حوار الاستماع:",
        questions: [
          {
            id: "ws6-q1",
            promptEn: "1- The book Mike was reading is from his father.",
            promptAr: "1- الكتاب الذي كان يقرؤه مايك كان من والده.",
            type: "true-false",
            options: ["True", "False"],
            modelAnswer: "False",
            modelAnswerAr: "خطأ (False) - الكتاب كان من ابن عمه (cousin).",
            explanation: "ورد في الحوار: It's a book my cousin got me."
          },
          {
            id: "ws6-q2",
            promptEn: "2- Jessica came to attend Mike's birthday.",
            promptAr: "2- جيسيكا حضرت حفل عيد ميلاد مايك.",
            type: "true-false",
            options: ["True", "False"],
            modelAnswer: "False",
            modelAnswerAr: "خطأ (False) - نسيت موعد الحفل.",
            explanation: "قالت جيسيكا: I forgot it was your birthday."
          },
          {
            id: "ws6-q3",
            promptEn: "3- Mike's brother bought him a jacket.",
            promptAr: "3- أخو مايك اشترى له سترة.",
            type: "true-false",
            options: ["True", "False"],
            modelAnswer: "True",
            modelAnswerAr: "صحيح (True).",
            explanation: "قال مايك: He bought me this jacket."
          },
          {
            id: "ws6-q4",
            promptEn: "4- His grandmother brought him some clothes.",
            promptAr: "4- جدته أحضرت له ملابس هذا العام.",
            type: "true-false",
            options: ["True", "False"],
            modelAnswer: "False",
            modelAnswerAr: "خطأ (False) - أهدته لعبة كمبيوتر (computer game).",
            explanation: "عادة ملابس، ولكن هذا العام لعبة كمبيوتر."
          }
        ]
      },
      {
        title: "B - Match Column A with Column B",
        instructionsEn: "Match the relative with the gift they gave Mike:",
        instructionsAr: "طابق القريب مع الهدية التي أهداها لمايك:",
        questions: [
          {
            id: "ws6-q5",
            promptEn: "What did the Uncle give Mike?",
            promptAr: "ماذا أهدى العم لمايك؟",
            type: "mcq",
            options: ["a- phone", "b- twenty pounds", "c- two tickets to a film", "d- computer game"],
            modelAnswer: "b- twenty pounds",
            modelAnswerAr: "b- twenty pounds (عشرون جنيهاً)",
            explanation: "أعطاه 20 جنيهاً ليختار بنفسه."
          },
          {
            id: "ws6-q6",
            promptEn: "What did the Aunt give Mike?",
            promptAr: "ماذا أهدت الخالة لمايك؟",
            type: "mcq",
            options: ["a- phone", "b- twenty pounds", "c- two tickets to a film", "d- computer game"],
            modelAnswer: "c- two tickets to a film",
            modelAnswerAr: "c- two tickets to a film (تذكرتان للسينما)",
            explanation: "تذكرتان لمشاهدة فيلم."
          },
          {
            id: "ws6-q7",
            promptEn: "What did the Grandmother give Mike?",
            promptAr: "ماذا أهدت الجدة لمايك؟",
            type: "mcq",
            options: ["a- phone", "b- twenty pounds", "c- two tickets to a film", "d- computer game"],
            modelAnswer: "d- computer game",
            modelAnswerAr: "d- computer game (لعبة كمبيوتر بمساعدة أخيه)",
            explanation: "لعبة كمبيوتر."
          },
          {
            id: "ws6-q8",
            promptEn: "What did Mum buy Mike?",
            promptAr: "ماذا اشترت والدة مايك له؟",
            type: "mcq",
            options: ["a- phone", "b- twenty pounds", "c- two tickets to a film", "d- computer game"],
            modelAnswer: "a- phone",
            modelAnswerAr: "a- phone (هاتف ذكي بدلاً من الدراجة)",
            explanation: "اشترت له هاتفاً حديثاً."
          }
        ]
      }
    ]
  },
  {
    id: 7,
    titleEn: "Worksheet 7: Bullying Text, Verb-Noun Table & Gerunds (Page 7)",
    titleAr: "ورقة عمل 7: نص التنمر، جدول الأفعال والأسماء وقاعدة -ing (صفحة 7)",
    pageNumber: "Page 7",
    unit: "Unit 2",
    description: "صح وخطأ عن سلوك المتنمرين، جدول تحويل الأفعال لأسماء، واستخدام اسم الفعل في بداية الجملة.",
    sections: [
      {
        title: "A - True or False (Bullying Behavior)",
        instructionsEn: "Decide if the statement is True or False according to the text on Page 7:",
        instructionsAr: "حدد ما إذا كانت العبارة صحيحة أم خاطئة وفق النص في صفحة 7:",
        questions: [
          {
            id: "ws7-q1",
            promptEn: "1- All bullies know that they are bullying.",
            promptAr: "1- جميع المتنمرين يعرفون أنهم يتنمرون.",
            type: "true-false",
            options: ["True", "False"],
            modelAnswer: "False",
            modelAnswerAr: "خطأ (False) - بعض المتنمرين لا يدركون ذلك.",
            explanation: "ذكر النص: some bullies don't even know that they're bullying."
          },
          {
            id: "ws7-q2",
            promptEn: "2- Bullies misbehave in order to draw other people's attention.",
            promptAr: "2- يتصرف المتنمرون بشكل سيئ للفت انتباه الآخرين.",
            type: "true-false",
            options: ["True", "False"],
            modelAnswer: "True",
            modelAnswerAr: "صحيح (True).",
            explanation: "يتنمرون ليكونوا مركز الانتباه (centre of attention)."
          },
          {
            id: "ws7-q3",
            promptEn: "3- People feel happy when we keep them away from activities.",
            promptAr: "3- يشعر الناس بالسعادة عندما نبعدهم عن الأنشطة.",
            type: "true-false",
            options: ["True", "False"],
            modelAnswer: "False",
            modelAnswerAr: "خطأ (False) - بل يشعرون بالحزن والإقصاء.",
            explanation: "إبعادهم يسبب لهم الأذى والحزن الشديد."
          },
          {
            id: "ws7-q4",
            promptEn: "4- Knocking things out of others' hands is fun.",
            promptAr: "4- إسقاط الأشياء من أيدي الآخرين أمر ممتع.",
            type: "true-false",
            options: ["True", "False"],
            modelAnswer: "False",
            modelAnswerAr: "خطأ (False) - إنه نوع من أنواع التنمر المرفوض.",
            explanation: "هذا سلوك تنمر غير مقبول."
          }
        ]
      },
      {
        title: "B - Verb to Noun Formation (-ing)",
        instructionsEn: "Choose the correct noun formed from the verb:",
        instructionsAr: "اختر الاسم الصحيح المشتق من الفعل بإضافة -ing:",
        questions: [
          {
            id: "ws7-q5",
            promptEn: "Verb: 'push' (يدفع) -> Noun is:",
            type: "mcq",
            options: ["pusher", "pushing", "pushed"],
            modelAnswer: "pushing",
            explanation: "push + ing = pushing (الدفع)."
          },
          {
            id: "ws7-q6",
            promptEn: "Verb: 'kick' (يركل) -> Noun is:",
            type: "mcq",
            options: ["kicking", "kicked", "kicker"],
            modelAnswer: "kicking",
            explanation: "kick + ing = kicking (الركل)."
          },
          {
            id: "ws7-q7",
            promptEn: "Verb: 'hit' (يضرب) -> Noun is:",
            type: "mcq",
            options: ["hiting", "hitting", "hited"],
            modelAnswer: "hitting",
            explanation: "نضاعف الحرف t: hitting (الضرب)."
          },
          {
            id: "ws7-q8",
            promptEn: "Verb: 'belong' (ينتمي) -> Noun is:",
            type: "mcq",
            options: ["belonged", "belonging", "belongment"],
            modelAnswer: "belonging",
            explanation: "belong + ing = belonging (الانتماء / الممتلكات)."
          }
        ]
      }
    ]
  }
];

// Teacher Social Links from bottom footer of all worksheets
export const TEACHER_SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/MoreEnglishMoreLove/",
  youtube: "https://www.youtube.com/@MoreEnglishMoreLove",
  instagram: "https://www.instagram.com/moreenglishmorelove/",
  telegram: "https://t.me/moreenglishmorelove",
  whatsapp: "+963933036079",
  whatsappUrl: "https://wa.me/963933036079",
  teacherName: "T. Jaidaa Saqer",
  teacherNameAr: "المعلمة جيداء صقر",
  brandTitle: "MORE ENGLISH MORE LOVE"
};
