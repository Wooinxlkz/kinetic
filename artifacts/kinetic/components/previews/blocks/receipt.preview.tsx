"use client";

import { Receipt, type ReceiptLineItem } from "@/components/blocks/receipt";

const ITEMS: ReceiptLineItem[] = [
  { id: "1", label: "Pro plan",        description: "Monthly subscription",  qty: 1, unit: "mo",  amount: 49.00 },
  { id: "2", label: "Extra seats",     description: "5 additional members",  qty: 5, unit: "seat", amount: 25.00 },
  { id: "3", label: "Object storage",  description: "250 GB overage",        qty: 250, unit: "GB", amount: 12.50 },
];

export function ReceiptPreview() {
  return (
    <div className="mx-auto max-w-sm p-6">
      <Receipt
        title="Invoice"
        number="INV-2026-0042"
        date="Jul 1, 2026"
        dueDate="Jul 15, 2026"
        status="pending"
        from={{ name: "Kinetic Inc.", detail: "hello@kinetic.ui" }}
        to={{ name: "Acme Corp.", detail: "billing@acme.co" }}
        items={ITEMS}
        taxRate={0.08}
        note="Payment due within 14 days. Late payments may incur a 1.5% monthly interest charge."
      />
    </div>
  );
}
