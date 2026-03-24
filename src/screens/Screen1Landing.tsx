import { Check } from 'lucide-react';

interface Screen1LandingProps {
  goTo: (screen: string) => void;
}

export default function Screen1Landing({ goTo }: Screen1LandingProps) {
  const valueProps = [
    'Turn life experience into skills',
    'Find your best-fit roles',
    'Get your next step',
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 md:px-6">
      <div className="w-full max-w-[680px] flex flex-col items-center gap-6">
        <img
          src="/re-entry_logo.jpg"
          alt="re-entry"
          className="h-[36px] md:h-[44px] w-auto mb-4"
        />
        <h1 className="text-[48px] md:text-[56px] leading-tight text-center" style={{ color: 'var(--text)' }}>
          Your career break isn't a hole. It's a pivot.
        </h1>

        <p className="text-lg text-center" style={{ color: 'var(--muted)' }}>
          Use AI to translate your life experience into professional leverage — and find your way back to a career you love.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-4 my-4">
          {valueProps.map((prop, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: 'var(--brand-gradient)' }}
              >
                <Check size={14} color="white" strokeWidth={3} />
              </div>
              <span className="text-sm">{prop}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => goTo('pivotReason')}
          className="btn-primary mt-4"
        >
          Start my pivot
        </button>

        <p className="text-xs absolute bottom-6" style={{ color: 'var(--muted)' }}>
          No account needed. Your data stays on your device.
        </p>
      </div>
    </div>
  );
}
