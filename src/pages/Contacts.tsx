// -------------------------------------------------------------
// Page: Contacts
// Purpose: Manage emergency contacts (CRUD).
//
// Features:
// - List contacts
// - Add new contact
// - Edit existing contact
// - Delete contact
// - LocalStorage persistence (per user)
// - Floating add button
//
// Notes:
// - Uses modular components for clean structure
// - Now uses useContacts() hook for per‑user storage
// -------------------------------------------------------------

import { useState } from "react";
import PageContainer from "../components/PageContainer";
import ContactCard from "../components/contacts/ContactCard";
import AddEditContactModal from "../components/contacts/AddEditContactModal";
import type { Contact } from "../types/contact";
import { Plus } from "lucide-react";
import { useContacts } from "../hooks/useContacts";

export default function Contacts() {
  const { contacts, addContact, updateContact, deleteContact } = useContacts();

  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [activeContact, setActiveContact] = useState<Contact>({
    id: "",
    name: "",
    phone: "",
  });

  // -------------------------------------------------------------
  // Add Contact
  // -------------------------------------------------------------
  const openAdd = () => {
    setMode("add");
    setActiveContact({
      id: crypto.randomUUID(),
      name: "",
      phone: "",
    });
    setModalOpen(true);
  };

  // -------------------------------------------------------------
  // Edit Contact
  // -------------------------------------------------------------
  const openEdit = (contact: Contact) => {
    setMode("edit");
    setActiveContact(contact);
    setModalOpen(true);
  };

  // -------------------------------------------------------------
  // Save Contact (Add or Edit)
  // -------------------------------------------------------------
  const saveContact = () => {
    if (mode === "add") {
      addContact(activeContact);
    } else {
      updateContact(activeContact);
    }
    setModalOpen(false);
  };

  return (
    <PageContainer>
      <h1 className="text-2xl font-semibold mb-4">Emergency Contacts</h1>

      {/* Contact List */}
      <div className="flex flex-col gap-4">
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onEdit={openEdit}
            onDelete={deleteContact}
          />
        ))}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={openAdd}
        className="fixed bottom-24 right-6 bg-cyan-500 text-black p-4 rounded-full shadow-lg"
      >
        <Plus size={24} />
      </button>

      {/* Add/Edit Modal */}
      <AddEditContactModal
        isOpen={modalOpen}
        mode={mode}
        contact={activeContact}
        onChange={setActiveContact}
        onClose={() => setModalOpen(false)}
        onSave={saveContact}
      />
    </PageContainer>
  );
}
