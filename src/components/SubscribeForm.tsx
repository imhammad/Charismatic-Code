"use client";

import { useState, FormEvent } from "react";
import type { PdfGuide } from "@/lib/pdfData";
import type { SubscribeResponse } from "@/types";

interface Props {
  guide: PdfGuide;
  accentColor: string;
}

const accentButtonMap: Record<string, string> = {
  rose: "bg-rose-400 hover:bg-rose-300 focus-visible:ring-rose-400",
  amber: "bg-amber-400 hover:bg-amber-300 focus-visible:ring-amber-400",
  sky: "bg-sky-400 hover:bg-sky-300 focus-visible:ring-sky-400",
  emerald: "bg-emerald-400 hover:bg-emerald-300 focus-visible:ring-emerald-400",
  violet: "bg-violet-400 hover:bg-violet-300 focus-visible:ring-violet-400",
};

const accentFocusMap: Record<string, string> = {
  rose: "focus:border-rose-400/50 focus:ring-rose-400/20",
  amber: "focus:border-amber-400/50 focus:ring-amber-400/20",
  sky: "focus:border-sky-400/50 focus:ring-sky-400/20",
  emerald: "focus:border-emerald-400/50 focus:ring-emerald-400/20",
  violet: "focus:border-violet-400/50 focus:ring-violet-400/20",
};

export default function SubscribeForm({ guide, accentColor }: Props) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const buttonClass = accentButtonMap[accentColor] ?? accentButtonMap.amber;
  const inputFocus = accentFocusMap[accentColor] ?? accentFocusMap.amber;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          email,
          tagId: guide.tagId,
          tagName: guide.tagName,
          slug: guide.slug,
        }),
      });

      const data: SubscribeResponse = await res.json();

      if (data.success) {
        setStatus("success");
        setMessage(data.message);
        setFirstName("");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message);
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-4 animate-fade-up opacity-0 animate-delay-100">
        <div className="text-4xl mb-4">🎉</div>
        <p className="font-body text-stone-200 text-lg font-medium">{message}</p>
        <p className="font-body text-stone-500 text-sm mt-2">
          Check your spam folder if you don&apos;t see it within a minute.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label
          htmlFor="firstName"
          className="block font-body text-xs uppercase tracking-widest text-stone-500 mb-2"
        >
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          autoComplete="given-name"
          required
          placeholder="Alex"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={status === "loading"}
          className={`w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-3 font-body text-stone-100 placeholder-stone-600 outline-none transition-all ring-2 ring-transparent focus:ring-2 ${inputFocus} disabled:opacity-50`}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block font-body text-xs uppercase tracking-widest text-stone-500 mb-2"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          placeholder="alex@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className={`w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-3 font-body text-stone-100 placeholder-stone-600 outline-none transition-all ring-2 ring-transparent focus:ring-2 ${inputFocus} disabled:opacity-50`}
        />
      </div>

      {status === "error" && (
        <p className="font-body text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className={`w-full ${buttonClass} text-stone-950 font-body font-semibold text-sm uppercase tracking-widest py-4 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending…
          </span>
        ) : (
          "Send me the guide →"
        )}
      </button>
    </form>
  );
}
