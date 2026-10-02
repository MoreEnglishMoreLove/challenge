import React, { useState, useEffect } from "react";
import { getCurrentActivation, logoutStudent, ActivationData } from "./utils/security";
import { LockScreen } from "./components/LockScreen";
import { Navbar, SectionType } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { TeacherPortalModal } from "./components/TeacherPortalModal";
import { ReadingSection } from "./components/sections/ReadingSection";
import { SpeakingSection } from "./components/sections/SpeakingSection";
import { ListeningSection } from "./components/sections/ListeningSection";
import { VocabularySection } from "./components/sections/VocabularySection";
import { GrammarSection } from "./components/sections/GrammarSection";
import { PhysicsSection } from "./components/sections/PhysicsSection";
import { WorksheetsSection } from "./components/sections/WorksheetsSection";

export default function App() {
  const [activationState, setActivationState] = useState<{
    isActive: boolean;
    isExpired: boolean;
    data: ActivationData | null;
    remainingDays: number;
    remainingHours: number;
  }>(() => getCurrentActivation());

  const [activeSection, setActiveSection] = useState<SectionType>("reading");
  const [isTeacherPortalOpen, setIsTeacherPortalOpen] = useState(false);

  // Periodically refresh expiration status (every 10 minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      const current = getCurrentActivation();
      setActivationState(current);
    }, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleActivated = (data: ActivationData) => {
    const current = getCurrentActivation();
    setActivationState(current);
  };

  const handleLogout = () => {
    if (confirm("هل تريد تسجيل الخروج والعودة لشاشة التفعيل؟")) {
      logoutStudent();
      setActivationState({
        isActive: false,
        isExpired: false,
        data: null,
        remainingDays: 0,
        remainingHours: 0
      });
    }
  };

  // If not activated or expired, render the secure Lock Screen
  if (!activationState.isActive || !activationState.data) {
    return (
      <div className="min-h-screen bg-slate-950 font-sans">
        <LockScreen
          onActivated={handleActivated}
          onOpenTeacherPortal={() => setIsTeacherPortalOpen(true)}
          expiredNotice={activationState.isExpired}
        />

        <TeacherPortalModal
          isOpen={isTeacherPortalOpen}
          onClose={() => setIsTeacherPortalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Sticky Top Navigation & Student Expiration Bar */}
      <Navbar
        activation={activationState.data}
        remainingDays={activationState.remainingDays}
        remainingHours={activationState.remainingHours}
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        onOpenTeacherPortal={() => setIsTeacherPortalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Interactive Curriculum Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {activeSection === "reading" && <ReadingSection />}
        {activeSection === "speaking" && <SpeakingSection />}
        {activeSection === "listening" && <ListeningSection />}
        {activeSection === "vocabulary" && <VocabularySection />}
        {activeSection === "grammar" && <GrammarSection />}
        {activeSection === "physics" && <PhysicsSection />}
        {activeSection === "worksheets" && <WorksheetsSection />}
      </main>

      {/* Footer with Teacher Social Channels & WhatsApp Support */}
      <Footer />

      {/* Teacher Portal Modal */}
      <TeacherPortalModal
        isOpen={isTeacherPortalOpen}
        onClose={() => setIsTeacherPortalOpen(false)}
      />
    </div>
  );
}
