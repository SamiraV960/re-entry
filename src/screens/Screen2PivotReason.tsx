interface Screen2PivotReasonProps {
  goTo: (screen: string) => void;
  pivotReason: string | null;
  setPivotReason: (reason: string | null) => void;
}

type PivotReasonType = 'motherhood' | 'caregiving' | 'health' | 'relocation' | null;

export default function Screen2PivotReason({ goTo, pivotReason, setPivotReason }: Screen2PivotReasonProps) {

  const reasons = [
    {
      id: 'motherhood' as const,
      emoji: '👶',
      label: 'Motherhood',
      description: 'I took time out to raise my children',
    },
    {
      id: 'caregiving' as const,
      emoji: '🤝',
      label: 'Caregiving',
      description: 'I was caring for a family member',
    },
    {
      id: 'health' as const,
      emoji: '💙',
      label: 'Health',
      description: 'I needed time to focus on my wellbeing',
    },
    {
      id: 'relocation' as const,
      emoji: '🌍',
      label: 'Relocation or life change',
      description: 'A major life event changed my path',
    },
  ];

  const handleContinue = () => {
    goTo('brainDump');
  };

  const handleSkip = () => {
    setPivotReason(null);
    goTo('brainDump');
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 md:px-6 py-12">
      <div className="w-full max-w-[680px]">
        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mb-12">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: 'var(--orange)' }}
          ></div>
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: '#D1D1D1' }}
          ></div>
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: '#D1D1D1' }}
          ></div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl text-center mb-3" style={{ color: 'var(--text)' }}>
          What brought you here?
        </h1>

        {/* Subheadline */}
        <p className="text-base text-center mb-10" style={{ color: 'var(--muted)' }}>
          There's no wrong answer.
        </p>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {reasons.map((reason) => (
            <button
              key={reason.id}
              onClick={() => setPivotReason(reason.id)}
              className="text-left rounded-2xl p-5 cursor-pointer transition-all"
              style={{
                border: pivotReason === reason.id ? '2px solid var(--orange)' : '1px solid var(--border)',
                backgroundColor: pivotReason === reason.id ? '#FEF3F0' : 'var(--card)',
              }}
            >
              <div className="flex flex-col items-center text-center gap-2">
                <div className="text-[32px] mb-1">{reason.emoji}</div>
                <div className="font-semibold text-base" style={{ color: 'var(--text)' }}>
                  {reason.label}
                </div>
                <div className="text-[13px]" style={{ color: 'var(--muted)' }}>
                  {reason.description}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Continue button */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={handleContinue}
            disabled={!pivotReason}
            className="btn-primary"
          >
            Continue
          </button>

          {/* Skip link */}
          <button
            onClick={handleSkip}
            className="text-sm underline"
            style={{ color: 'var(--muted)' }}
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
