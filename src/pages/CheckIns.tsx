// -------------------------------------------------------------
// Page: CheckIns
// Purpose: Display recent check-ins + allow creating new ones.
//
// Features:
// - Floating + button (same as Contacts)
// - NewCheckInModal for note + photo
// - Uses useGeolocation + useCheckIns
// - Clean, modular layout
// -------------------------------------------------------------

import { useState } from "react";
import PageContainer from "../components/PageContainer";
// import { useGeolocation } from "../hooks/useGeolocation";
import { useCheckIns } from "../hooks/useCheckIns";
import type { CheckIn } from "../types/CheckIn";
import CheckInList from "../components/checkins/CheckInList";
import NewCheckInModal from "../components/checkins/NewCheckInModal";
import { Plus, Radar, Check, X } from "lucide-react";

export default function CheckIns() {
  // const { getCurrentLocation } = useGeolocation();
  const { checkIns, addCheckIn, deleteCheckIn } = useCheckIns();

  const [modalOpen, setModalOpen] = useState(false);

  // Animated button states
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // -------------------------------------------------------------
  // Handle creating a new check-in (called by modal)
  // -------------------------------------------------------------
  const handleCreateCheckIn = async (data: {
    note: string;
    photo: string | null;
  }) => {
    setIsLoading(true);

    // Delay to show animation + allow geolocation to resolve
    setTimeout(() => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (!pos?.coords) {
            setIsLoading(false);
            setError(true);
            return;
          }

          const newCheckIn: CheckIn = {
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
            note: data.note || undefined,
            photo: data.photo || undefined,
          };

          addCheckIn(newCheckIn);

          // Close modal
          setModalOpen(false);

          // Button animation
          setIsLoading(false);
          setSuccess(true);
          setTimeout(() => setSuccess(false), 2000);
        },
        () => {
          setIsLoading(false);
          setError(true);
          setTimeout(() => setError(false), 2000);
        },
      );
    }, 500);
  };

  // -------------------------------------------------------------
  // Render
  // -------------------------------------------------------------
  return (
    <PageContainer>
      <h1 className="text-2xl font-semibold mb-6">Check-Ins</h1>

      {/* Recent Check-Ins */}
      <CheckInList checkIns={checkIns} onDelete={deleteCheckIn} />

      {/* Floating Add Button */}
      <button
        onClick={() => setModalOpen(true)}
        className="fixed bottom-24 right-6 bg-cyan-500 text-black p-4 rounded-full shadow-lg"
      >
        <Plus size={24} />
      </button>

      {/* New Check-In Modal */}
      <NewCheckInModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateCheckIn}
      />

      {/* Animated status bubbles */}
      {isLoading && (
        <div className="fixed top-20 right-6 bg-cyan-700 text-black p-3 rounded-full shadow-lg flex items-center gap-2">
          <Radar className="animate-spin-slow" size={20} />
          Sending...
        </div>
      )}

      {success && (
        <div className="fixed top-20 right-6 bg-green-600 text-black p-3 rounded-full shadow-lg flex items-center gap-2">
          <Check size={20} />
          Sent!
        </div>
      )}

      {error && (
        <div className="fixed top-20 right-6 bg-red-600 text-black p-3 rounded-full shadow-lg flex items-center gap-2">
          <X size={20} />
          Failed
        </div>
      )}
    </PageContainer>
  );
}
