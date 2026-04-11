// -------------------------------------------------------------
// Hook: useContacts (Per‑User Storage)
// Purpose: Manage emergency contacts (CRUD) with localStorage.
//
// Features:
// - Load contacts for the current user
// - Save contacts whenever they change
// - Add new contact
// - Edit existing contact
// - Delete contact
//
// Notes:
// - Uses per‑user storage: contacts_<userId>
// -------------------------------------------------------------

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import type { Contact } from "../types/contact";

export function useContacts() {
  const { user } = useAuth();

  // Per‑user storage key
  const STORAGE_KEY = `contacts_${user?.id}`;

  // Local state
  const [contacts, setContacts] = useState<Contact[]>([]);

  // -------------------------------------------------------------
  // Load contacts from localStorage on mount (per user)
  // -------------------------------------------------------------
  useEffect(() => {
    if (!user) return;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setContacts(JSON.parse(saved));
      } catch {
        console.error("Failed to parse contacts");
      }
    } else {
      setContacts([]); // New user → empty list
    }
  }, [user]);

  // -------------------------------------------------------------
  // Save contacts to localStorage whenever they change
  // -------------------------------------------------------------
  useEffect(() => {
    if (!user) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts, user]);

  // -------------------------------------------------------------
  // Add Contact
  // -------------------------------------------------------------
  const addContact = (contact: Contact) => {
    setContacts((prev) => [...prev, contact]);
  };

  // -------------------------------------------------------------
  // Edit Contact
  // -------------------------------------------------------------
  const updateContact = (contact: Contact) => {
    setContacts((prev) => prev.map((c) => (c.id === contact.id ? contact : c)));
  };

  // -------------------------------------------------------------
  // Delete Contact
  // -------------------------------------------------------------
  const deleteContact = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return {
    contacts,
    addContact,
    updateContact,
    deleteContact,
  };
}
