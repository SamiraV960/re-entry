interface Screen4LoadingProps {
  goTo: (screen: string) => void;
}

export default function Screen4Loading({ goTo }: Screen4LoadingProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8">
      <img
        src="/re-entry_logo.jpg"
        alt="re-entry"
        className="h-[36px] md:h-[44px] w-auto"
      />
      <h1 className="text-[32px] italic" style={{ color: 'var(--orange)' }}>
        Translating your experience...
      </h1>
      <div className="spinner"></div>
    </div>
  );
}
