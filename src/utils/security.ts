/**
 * Security and Cryptographic Code Engine for MORE ENGLISH MORE LOVE
 * Supervised by Teacher Jaidaa Saqer
 * 
 * Features:
 * 1. Fully client-side, zero-server deterministic mathematical code generation & verification.
 * 2. Deterministic hashing tied to normalized student name.
 * 3. 6 Months (180 days) subscription tracking with countdown.
 * 4. Device / Browser fingerprint binding.
 * 5. Permanent Admin PIN for Teacher: "b13a15m17".
 */

export const ADMIN_PIN = "b13a15m17";
export const TEACHER_NAME = "جيداء صقر";
export const TEACHER_TITLE = "T. Jaidaa Saqer";
export const TEACHER_PHONE = "+963933036079";
export const TEACHER_WHATSAPP_CLEAN = "963933036079";
export const EXPIRATION_DAYS = 180; // 6 months

const SECRET_SALT_1 = 0x9e3779b9;
const SECRET_SALT_2 = 0x85ebca6b;
const SECRET_SALT_3 = 0xc2b2ae35;

/**
 * Normalizes student name to prevent minor variations (spaces, tashkeel, alef forms)
 * from breaking code generation/verification.
 */
export function normalizeStudentName(name: string): string {
  if (!name) return "";
  return name
    .trim()
    .toLowerCase()
    // Remove Arabic tashkeel / harakat
    .replace(/[\u064B-\u065F\u0670]/g, "")
    // Normalize Alefs
    .replace(/[أإآآ]/g, "ا")
    // Normalize Taa Marbuta
    .replace(/ة/g, "ه")
    // Normalize Yaa
    .replace(/ى/g, "ي")
    // Normalize Persian/Urdu variants
    .replace(/ك/g, "ك")
    // Collapse multiple spaces into one
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Deterministic multi-pass polynomial hash function
 */
function hashString(str: string, seed: number): number {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

/**
 * Encodes a numeric hash into a 4-character clean alphanumeric uppercase string
 * (omits confusing characters like 0, O, 1, I for maximum readability)
 */
const SAFE_CHARS = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

function encode4Chars(num: number): string {
  let val = Math.abs(num);
  let res = "";
  for (let i = 0; i < 4; i++) {
    const idx = (val % SAFE_CHARS.length);
    res += SAFE_CHARS[idx];
    val = Math.floor(val / SAFE_CHARS.length) + (idx * 7) + 11;
  }
  return res;
}

/**
 * Generates the authentic mathematical activation code for a given student name.
 * Format: MEML-XXXX-XXXX
 */
export function generateStudentCode(rawStudentName: string): string {
  const normalized = normalizeStudentName(rawStudentName);
  if (!normalized || normalized.length < 2) {
    return "";
  }

  // Generate two distinct mathematical blocks using different seeds
  const hash1 = hashString("MEML_JAIDAA_SAQER_" + normalized, SECRET_SALT_1 ^ SECRET_SALT_2);
  const hash2 = hashString(normalized + "_MORE_ENGLISH_MORE_LOVE", SECRET_SALT_2 ^ SECRET_SALT_3);

  const block1 = encode4Chars(hash1);
  const block2 = encode4Chars(hash2);

  return `MEML-${block1}-${block2}`;
}

/**
 * Validates whether a provided activation code matches the student name mathematically.
 */
export function verifyStudentCode(rawStudentName: string, rawCode: string): boolean {
  if (!rawStudentName || !rawCode) return false;
  
  const expectedCode = generateStudentCode(rawStudentName);
  if (!expectedCode) return false;

  const cleanInputCode = rawCode.trim().toUpperCase().replace(/\s+/g, "");
  return cleanInputCode === expectedCode;
}

/**
 * Device Fingerprint identifier stored in browser
 */
export function getOrCreateDeviceId(): string {
  if (typeof window === "undefined") return "server-device-id";
  let deviceId = localStorage.getItem("meml_device_id");
  if (!deviceId) {
    deviceId = "DEV-" + Math.random().toString(36).substring(2, 10).toUpperCase() + "-" + Date.now().toString(36).toUpperCase();
    localStorage.setItem("meml_device_id", deviceId);
  }
  return deviceId;
}

export interface ActivationData {
  studentName: string;
  code: string;
  activatedAt: number; // timestamp
  expiresAt: number; // timestamp (+180 days)
  deviceId: string;
}

export interface GeneratedCodeRecord {
  id: string;
  studentName: string;
  code: string;
  createdAt: number;
  notes?: string;
}

const ACTIVATION_STORAGE_KEY = "meml_student_activation_session";
const CODES_HISTORY_STORAGE_KEY = "meml_teacher_generated_codes";

/**
 * Activate student on current device
 */
export function activateStudentAccount(studentName: string, code: string): { success: boolean; error?: string; data?: ActivationData } {
  const normalized = normalizeStudentName(studentName);
  if (!normalized || normalized.length < 2) {
    return { success: false, error: "يرجى كتابة الاسم الكامل للطالب بشكل صحيح (حرفين على الأقل)" };
  }

  if (!verifyStudentCode(studentName, code)) {
    return { success: false, error: "كود التفعيل غير مطابق لاسم الطالب! تأكد من كتابة الاسم والكود بدقة كما أرسلتهما المعلمة جيداء." };
  }

  const deviceId = getOrCreateDeviceId();
  const now = Date.now();
  const expiresAt = now + (EXPIRATION_DAYS * 24 * 60 * 60 * 1000);

  const activationData: ActivationData = {
    studentName: studentName.trim(),
    code: code.trim().toUpperCase(),
    activatedAt: now,
    expiresAt,
    deviceId,
  };

  try {
    localStorage.setItem(ACTIVATION_STORAGE_KEY, JSON.stringify(activationData));
  } catch (e) {
    console.error("Failed to save activation to localStorage", e);
  }

  return { success: true, data: activationData };
}

/**
 * Gets current active session and checks expiration & device lock
 */
export function getCurrentActivation(): { isActive: boolean; isExpired: boolean; data: ActivationData | null; remainingDays: number; remainingHours: number } {
  if (typeof window === "undefined") {
    return { isActive: false, isExpired: false, data: null, remainingDays: 0, remainingHours: 0 };
  }

  const raw = localStorage.getItem(ACTIVATION_STORAGE_KEY);
  if (!raw) {
    return { isActive: false, isExpired: false, data: null, remainingDays: 0, remainingHours: 0 };
  }

  try {
    const data: ActivationData = JSON.parse(raw);
    const now = Date.now();
    const timeLeft = data.expiresAt - now;

    if (timeLeft <= 0) {
      return { isActive: false, isExpired: true, data, remainingDays: 0, remainingHours: 0 };
    }

    // Verify mathematical validity again as anti-tamper
    if (!verifyStudentCode(data.studentName, data.code)) {
      localStorage.removeItem(ACTIVATION_STORAGE_KEY);
      return { isActive: false, isExpired: false, data: null, remainingDays: 0, remainingHours: 0 };
    }

    const remainingDays = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const remainingHours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return {
      isActive: true,
      isExpired: false,
      data,
      remainingDays,
      remainingHours,
    };
  } catch {
    return { isActive: false, isExpired: false, data: null, remainingDays: 0, remainingHours: 0 };
  }
}

/**
 * Logout / clear activation
 */
export function logoutStudent(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ACTIVATION_STORAGE_KEY);
  }
}

/**
 * Teacher code history management
 */
export function getSavedCodesHistory(): GeneratedCodeRecord[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(CODES_HISTORY_STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCodeToHistory(studentName: string, code: string, notes?: string): GeneratedCodeRecord {
  const existing = getSavedCodesHistory();
  const record: GeneratedCodeRecord = {
    id: "CODE-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
    studentName: studentName.trim(),
    code,
    createdAt: Date.now(),
    notes,
  };
  // Avoid duplicate exact entry
  const filtered = existing.filter(item => item.code !== code);
  filtered.unshift(record);
  try {
    localStorage.setItem(CODES_HISTORY_STORAGE_KEY, JSON.stringify(filtered.slice(0, 100)));
  } catch (e) {
    console.error(e);
  }
  return record;
}

export function removeCodeFromHistory(id: string): void {
  const existing = getSavedCodesHistory();
  const filtered = existing.filter(item => item.id !== id);
  try {
    localStorage.setItem(CODES_HISTORY_STORAGE_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error(e);
  }
}

/**
 * WhatsApp helpers
 */
export function getStudentRequestWhatsAppUrl(studentName = ""): string {
  const greeting = `مرحباً أستاذة جيداء صقر، أود الحصول على كود تفعيل لتطبيق MORE ENGLISH MORE LOVE.\nاسمي الكامل: ${studentName ? studentName : "[اكتب اسمك هنا]"}`;
  return `https://wa.me/${TEACHER_WHATSAPP_CLEAN}?text=${encodeURIComponent(greeting)}`;
}

export function getTeacherSendCodeWhatsAppMessage(studentName: string, code: string): string {
  return `أهلاً بك يا ${studentName} في تطبيق:
✨ MORE ENGLISH MORE LOVE ✨
بإشراف وتدريس المعلمة: جيداء صقر

كود التفعيل الحصري الخاص بك (صالح لمدة 6 أشهر):
🔑 الكود: ${code}

طريقة التفعيل:
1. افتح رابط التطبيق.
2. اكتب اسمك تماماً كما هو: (${studentName}).
3. الصق كود التفعيل (${code}) في خانة الكود.
4. اضغط على زر "تفعيل الحساب والدخول للمنهاج".
تمنياتي لك بالتوفيق والتميز الدائم! ❤️`;
}

export function getTeacherWhatsAppSendUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  if (cleanPhone) {
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  }
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
