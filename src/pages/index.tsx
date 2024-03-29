"use client";

import { Contact, useContacts } from "../lib/contacts";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon, Pencil1Icon } from "@radix-ui/react-icons";
import { FormEvent, useState } from "react";
import { Spinner } from "./spinner";
export default function Page() {
  let { contacts } = useContacts();

  return (
    <div className="py-10 bg-slate-300">
      <div className="mx-auto max-w-sm space-y-4 rounded-lg bg-gray-200 p-4">
        {contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
}

function ContactCard({ contact }: { contact: Contact }) {
  let [open, setOpen] = useState(false);
  return (
    <div
      className="flex justify-between rounded-lg bg-white px-4 py-4 text-gray-900 shadow"
      key={contact.id}
    >
      <div>
        <p>{contact.name}</p>
        <p className="text-sm text-gray-500">{contact.role}</p>
        <p className="text-sm text-gray-500">{contact.email}</p>
      </div>
      <div>
        <Dialog.Root
          open={open}
          onOpenChange={() => {
            setOpen(!open);
          }}
        >
          <Dialog.Trigger className="rounded p-2 hover:bg-gray-200">
            <Pencil1Icon />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=closed]:animate-[dialog-overlay-hide_200ms] data-[state=open]:animate-[dialog-overlay-show_200ms]" />
            <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-8 text-gray-900 shadow data-[state=closed]:animate-[dialog-content-hide_200ms] data-[state=open]:animate-[dialog-content-show_200ms]">
              <div className="flex items-center justify-between">
                <Dialog.Title className="text-xl">Edit contact</Dialog.Title>
                <Dialog.Close className="text-gray-400 hover:text-gray-500">
                  <Cross1Icon />
                </Dialog.Close>
              </div>

              <ContactForm contact={contact} afterSave={() => setOpen(false)} />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
}

function ContactForm({
  contact,
  afterSave,
}: {
  contact: Contact;
  afterSave: () => void;
}) {
  let [saving, setSaving] = useState(false);
  let { updateContact } = useContacts();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);

    let data = Object.fromEntries(new FormData(event.currentTarget));

    await updateContact(contact.id, data);
    afterSave();
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={saving} className="group">
        <div className="mt-8 group-disabled:opacity-50">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-900">Name</label>
              <input
                autoFocus
                className="mt-2 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm sm:leading-6"
                type="text"
                defaultValue={contact.name}
                name="name"
              />
            </div>

            <div>
              <label className="text-sm font-medium leading-6 text-gray-900">
                Role
              </label>
              <input
                className="mt-2 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm sm:leading-6"
                type="text"
                defaultValue={contact.role}
                name="role"
              />
            </div>
            <div>
              <label className="text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <input
                className="mt-2 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm sm:leading-6"
                type="text"
                defaultValue={contact.email}
                name="email"
              />
            </div>
          </div>
        </div>
        <div className="mt-8 space-x-6 text-right">
          <Dialog.Close className="rounded px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-600">
            Cancel
          </Dialog.Close>
          <button className="inline-flex items-center justify-center rounded bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 group-disabled:pointer-events-none">
            {/* <Spinner className="absolute h-4 group-enabled:opacity-0" /> */}
            <span className="group-disabled:opacity-0">Save</span>
          </button>
        </div>
      </fieldset>
    </form>
  );
}
