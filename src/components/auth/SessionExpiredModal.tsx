// -------------------------------------------------------------
// SessionExpiredModal
// Purpose: Neon-themed modal shown when auto-logout triggers.
// -------------------------------------------------------------


export default function SessionExpiredModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#0a0f1c] border border-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.4)] rounded-xl p-6 w-[90%] max-w-sm text-center">
        <h2 className="text-xl font-semibold text-cyan-400 mb-3">
          Session Expired
        </h2>
        <p className="text-gray-300 mb-6">
          You were logged out due to inactivity. Please log in again.
        </p>

        <button
          onClick={onClose}
          className="w-full py-2 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
}
