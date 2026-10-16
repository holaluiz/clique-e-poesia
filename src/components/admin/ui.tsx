import React from "react";

export const inputClass =
  "w-full rounded-[8px] border border-[#171713]/15 bg-white px-3.5 py-2.5 text-[15px] text-[#171713] placeholder:text-[#171713]/35 focus:outline-none focus:border-[#384936] focus:ring-2 focus:ring-[#384936]/20 transition";

export const AdminCard: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = "", children }) => (
  <div className={`rounded-[8px] bg-white border border-[#171713]/8 shadow-[0_1px_2px_rgba(23,23,19,0.05)] ${className}`}>{children}</div>
);

export const Field: React.FC<{ label: string; hint?: React.ReactNode; children: React.ReactNode }> = ({ label, hint, children }) => (
  <label className="block space-y-1.5">
    <span className="block text-[13px] font-medium text-[#171713]/80">{label}</span>
    {children}
    {hint && <span className="block text-[12px] text-[#171713]/50">{hint}</span>}
  </label>
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const PrimaryButton: React.FC<ButtonProps> = ({ className = "", ...props }) => (
  <button
    {...props}
    className={`inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#384936] px-5 py-2.5 text-[14px] font-medium text-[#FAF7F2] hover:bg-[#2C3A2B] disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
  />
);

export const SecondaryButton: React.FC<ButtonProps> = ({ className = "", ...props }) => (
  <button
    {...props}
    className={`inline-flex items-center justify-center gap-2 rounded-[8px] border border-[#171713]/15 bg-white px-4 py-2.5 text-[14px] font-medium text-[#171713] hover:bg-[#171713]/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
  />
);
