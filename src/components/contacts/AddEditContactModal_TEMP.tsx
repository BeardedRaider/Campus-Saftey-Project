// -------------------------------------------------------------
// Component: AddEditContactModal
// Purpose: Modal wrapper for adding or editing a contact.
// Notes:
// - Reuses ContactForm
// - Controlled by parent Contacts page
// -------------------------------------------------------------

import ContactForm from "./ContactForm";
import type { Contact } from "../../types/contact";

interface Props {
  isOpen: boolean;
  mode: "add" | "edit";
  contact: Contact;
  onChange: (c: Contact) => void;
  onClose: () => void;
  onSave: () => void;
}

export default function AddEditContactModal({
  isOpen,
  mode,
  contact,
  onChange,
  onClose,
  onSave,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-5">
      <div className="bg-[#0d1226] border border-white/10 rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {mode === "add" ? "Add Contact" : "Edit Contact"}
        </h2>

        <ContactForm contact={contact} onChange={onChange} />

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
