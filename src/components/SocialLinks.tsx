import Link from "next/link";

const socials = [
  {
    name: "Instagram",
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
    placeholder: true,
  },
  {
    name: "YouTube",
    href: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
      </svg>
    ),
    placeholder: true,
  },
  {
    name: "Substack",
    href: process.env.NEXT_PUBLIC_SUBSTACK_URL ?? "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
      </svg>
    ),
    placeholder: true,
  },
];

export default function SocialLinks() {
  return (
    <div className="flex items-center justify-center gap-4 flex-wrap">
      {socials.map((social) => (
        <Link
          key={social.name}
          href={social.href}
          target={social.href !== "#" ? "_blank" : undefined}
          rel="noopener noreferrer"
          aria-label={social.name}
          className="group flex items-center gap-2 px-4 py-2.5 rounded-full border border-stone-700 text-stone-400 hover:text-stone-100 hover:border-stone-500 transition-all duration-200 font-body text-sm"
        >
          <span className="group-hover:scale-110 transition-transform">{social.icon}</span>
          <span>{social.name}</span>
          {social.placeholder && social.href === "#" && (
            <span className="text-[10px] text-stone-600 uppercase tracking-wider">Soon</span>
          )}
        </Link>
      ))}
    </div>

    
  );
}
