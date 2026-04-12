// -------------------------------------------------------------
// Component: NewCheckInModal
// Purpose: Modal for creating a new check-in.
//
// Features:
// - Note input
// - Photo capture (via CameraCapture component)
// - Large preview + retake
// - Send Check-In button
// - Cancel button
//
// Props:
// - isOpen: boolean → controls visibility
// - onClose: () => void → closes modal
// - onSubmit: (data: { note: string; photo: string | null }) => void
//
// Notes:
// - Updated to use getUserMedia() camera system
// - Removed double-close bug (modal now closes only in parent)
// - Matches styling of Contacts modal
// - Wider modal (max-w-lg) for large photo preview
// -------------------------------------------------------------

import { X } from "lucide-react";
import { useState } from "react";
import CameraCapture from "./CameraCapture";

interface NewCheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { note: string; photo: string | null }) => void;
}

export default function NewCheckInModal({
  isOpen,
  onClose,
  onSubmit,
}: NewCheckInModalProps) {
  const [note, setNote] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  // Modal closed → render nothing
  if (!isOpen) return null;

  // -------------------------------------------------------------
  // Handle form submission
  // - Sends note + photo to parent
  // - Clears local state
  // - Parent handles closing + animations
  // -------------------------------------------------------------
  const handleSubmit = () => {
    onSubmit({ note: note.trim(), photo });
    setNote("");
    setPhoto(null);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white rounded-lg p-6 w-full max-w-lg border border-cyan-500 shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
        >
          <X size={22} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4">New Check-In</h2>

        {/* Note Input */}
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note (optional)"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-cyan-500 focus:outline-none transition"
          maxLength={120}
        />

        {/* Camera Capture Component */}
        <CameraCapture
          photo={photo}
          onPhotoCaptured={(base64) => setPhoto(base64)}
          onClearPhoto={() => setPhoto(null)}
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-cyan-500 hover:bg-cyan-400 text-black py-3 rounded-lg font-medium transition"
        >
          Send Check-In
        </button>
      </div>
    </div>
  );
}
