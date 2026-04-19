// -------------------------------------------------------------
// Page: Settings
// Purpose: Configure tracking + retry intervals + default contact
//
// Uses:
// - SettingsSectionHeader
// - SettingsField
// - AnimatedButton
//
// -------------------------------------------------------------

import PageContainer from "../components/PageContainer";
import { useSettings } from "../hooks/useSettings";
import { useState, useEffect } from "react";
import SettingsField from "../components/settings/SettingsField";
import SettingsSectionHeader from "../components/settings/SettingsSectionHeader";
import AnimatedButton from "../components/ui/AnimatedButton";
import { Save } from "lucide-react";
import { useAuth } from "../context/AuthProvider"; // NEW

export default function Settings() {
  const { settings, saveSettings } = useSettings();
  const { user } = useAuth(); // NEW

  // -------------------------------------------------------------
  // Load contacts (per‑user)
  // -------------------------------------------------------------
  const [contacts, setContacts] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (!user) return;

    const key = `contacts_${user.id}`; // NEW per‑user key
    const stored = localStorage.getItem(key);

    if (stored) {
      try {
        setContacts(JSON.parse(stored));
      } catch {
        console.error("Failed to parse contacts for settings");
        setContacts([]);
      }
    } else {
      setContacts([]); // NEW user → no contacts
    }
  }, [user]);

  // -------------------------------------------------------------
  // Local state
  // -------------------------------------------------------------
  const [trackingInterval, setTrackingInterval] = useState(
    settings.trackingInterval,
  );
  const [retryInterval, setRetryInterval] = useState(settings.retryInterval);
  const [defaultContactId, setDefaultContactId] = useState(
    settings.defaultContactId,
  );

  // -------------------------------------------------------------
  // Sync when settings load
  // -------------------------------------------------------------
  useEffect(() => {
    setTrackingInterval(settings.trackingInterval);
    setRetryInterval(settings.retryInterval);
    setDefaultContactId(settings.defaultContactId);
  }, [settings]);

  // -------------------------------------------------------------
  // Dropdown options
  // -------------------------------------------------------------
  const trackingOptions = [
    { label: "10 Sec Test", value: 10 * 1000 },
    { label: "10 minutes", value: 10 * 60 * 1000 },
    { label: "15 minutes", value: 15 * 60 * 1000 },
    { label: "20 minutes", value: 20 * 60 * 1000 },
    { label: "Until stopped", value: 0 },
  ];

  const retryOptions = [
    { label: "10 seconds", value: 10 * 1000 },
    { label: "20 seconds", value: 20 * 1000 },
    { label: "30 seconds", value: 30 * 1000 },
    { label: "1 minute", value: 1 * 60 * 1000 },
    { label: "3 minutes", value: 3 * 60 * 1000 },
    { label: "5 minutes", value: 5 * 60 * 1000 },
  ];

  const contactOptions = [
    { label: "Select contact", value: "" },
    ...contacts.map((c) => ({ label: c.name, value: c.id })),
  ];

  // -------------------------------------------------------------
  // Save animation state
  // -------------------------------------------------------------
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error] = useState(false);

  // -------------------------------------------------------------
  // Save handler (animation-friendly)
  // -------------------------------------------------------------
  const handleSave = () => {
    setIsLoading(true);

    console.log("Saving settings:", {
      trackingInterval,
      retryInterval,
      defaultContactId,
    });
    // Save settings immediately (but remount is delayed inside hook)
    saveSettings({
      trackingInterval,
      retryInterval,
      defaultContactId,
    });

    // Allow AnimatedButton to show loading → success
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);

      // Reset success state after animation
      setTimeout(() => setSuccess(false), 1500);
    }, 600);
  };

  // -------------------------------------------------------------
  // Render
  // -------------------------------------------------------------
  return (
    <PageContainer>
      <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>

      <SettingsSectionHeader title="Tracking Behaviour" />

      <SettingsField
        label="Tracking Interval"
        value={trackingInterval}
        onChange={(v) => setTrackingInterval(Number(v))}
        options={trackingOptions}
        borderColor="border-cyan-400"
      />

      <SettingsField
        label="Retry Interval"
        value={retryInterval}
        onChange={(v) => setRetryInterval(Number(v))}
        options={retryOptions}
        borderColor="border-purple-400"
      />

      <SettingsSectionHeader title="Emergency Contact" />

      <SettingsField
        label="Default Emergency Contact"
        value={defaultContactId ?? ""}
        onChange={(v) => setDefaultContactId(v === "" ? "" : String(v))}
        options={contactOptions}
        borderColor="border-yellow-400"
      />

      <AnimatedButton
        onClick={handleSave}
        isLoading={isLoading}
        success={success}
        error={error}
        idleText="Save Settings"
        loadingText="Saving..."
        successText="Saved!"
        errorText="Failed"
        icon={<Save size={20} />}
      />
    </PageContainer>
  );
}
