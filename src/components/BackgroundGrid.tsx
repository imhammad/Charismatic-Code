export default function BackgroundGrid() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 animate-grid-scroll" />
      
      {/* Optional: faint amber glow in the corner for warmth */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-amber-400/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-stone-500/5 rounded-full blur-[120px] -z-10" />
    </div>
  );
}