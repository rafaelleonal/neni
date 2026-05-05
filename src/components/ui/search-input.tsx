"use client";

import { SearchIcon } from "@/components/neni-icons";

export type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
};

export function SearchInput({
  value,
  onChange,
  placeholder,
  ariaLabel,
}: SearchInputProps) {
  return (
    <div className="border-td-line flex items-center gap-2 rounded-xl border bg-white px-3 py-2.5">
      <SearchIcon size={16} stroke="var(--td-mute)" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        className="text-td-ink placeholder:text-td-mute flex-1 bg-transparent text-sm outline-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Limpiar búsqueda"
          className="text-td-mute hover:text-td-ink text-lg leading-none"
        >
          ×
        </button>
      )}
    </div>
  );
}
