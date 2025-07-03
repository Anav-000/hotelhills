"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DetailModal({ isOpen, onClose, title, data, fields }) {
  const renderField = (field) => {
    const { name, label, type = "text", format } = field;
    let value = data[name];

    if (format && typeof format === "function") {
      value = format(value);
    } else if (type === "date" && value) {
      value = new Date(value).toLocaleDateString();
    } else if (type === "datetime" && value) {
      value = new Date(value).toLocaleString();
    } else if (type === "currency" && value) {
      value = `$${parseFloat(value).toFixed(2)}`;
    } else if (type === "boolean") {
      value = value ? "Yes" : "No";
    }

    return (
      <div
        key={name}
        className="flex justify-between py-2 border-b border-slate-100"
      >
        <span className="font-medium text-slate-600">{label}:</span>
        <span className="text-slate-900">{value || "N/A"}</span>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">{fields.map(renderField)}</div>
          <div className="flex justify-end pt-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
