import { ArrowLeft, X } from 'lucide-react';
import { useState } from 'react';

interface Screen3BrainDumpProps {
  goTo: (screen: string) => void;
  brainDump: string;
  setBrainDump: (text: string) => void;
  linkedinUrl: string;
  setLinkedinUrl: (url: string) => void;
  targetRole: string;
  setTargetRole: (role: string) => void;
  analyzeWithAI: () => void;
  errorMessage: string | null;
  setErrorMessage: (message: string | null) => void;
}

export default function Screen3BrainDump({
  goTo,
  brainDump,
  setBrainDump,
  linkedinUrl,
  setLinkedinUrl,
  targetRole,
  setTargetRole,
  analyzeWithAI,
  errorMessage,
  setErrorMessage,
}: Screen3BrainDumpProps) {
  const MIN_CHARS = 50;
  const charCount = brainDump.length;
  const isValid = charCount >= MIN_CHARS;
  const [linkedinError, setLinkedinError] = useState(false);

  const handleAnalyze = () => {
    if (isValid) {
      analyzeWithAI();
    }
  };

  const validateLinkedInUrl = (url: string) => {
    if (!url) {
      setLinkedinError(false);
      return;
    }
    const isValid = url.includes('linkedin.com/in/') || url.startsWith('https://www.linkedin.com/in/');
    setLinkedinError(!isValid);
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 md:px-6 py-12">
      <div className="w-full max-w-[680px]">
        {/* Back link */}
        <button
          onClick={() => goTo('pivotReason')}
          className="flex items-center gap-1 text-sm mb-8"
          style={{ color: 'var(--muted)' }}
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mb-12">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: '#E8E4F5' }}
          ></div>
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: 'var(--brand-gradient)' }}
          ></div>
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: '#E8E4F5' }}
          ></div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl text-center mb-3" style={{ color: 'var(--text)' }}>
          Tell me about yourself
        </h1>

        {/* Subheadline */}
        <p className="text-base text-center mb-8" style={{ color: 'var(--muted)' }}>
          Your last role, how long you've been away, anything you've done during your break. No CV
          needed — just talk to me.
        </p>

        {/* Error message banner */}
        {errorMessage && (
          <div
            className="rounded-xl p-4 mb-6 flex items-start gap-3"
            style={{ backgroundColor: '#F5F0FF', border: '1px solid var(--purple)' }}
          >
            <p className="flex-1 text-sm" style={{ color: 'var(--text)' }}>
              {errorMessage}
            </p>
            <button onClick={() => setErrorMessage(null)} className="flex-shrink-0">
              <X size={18} style={{ color: 'var(--purple)' }} />
            </button>
          </div>
        )}

        {/* Brain dump textarea */}
        <textarea
          value={brainDump}
          onChange={(e) => setBrainDump(e.target.value)}
          placeholder="For example: I was a Senior Marketing Manager for 8 years before taking 4 years out to raise my children. During that time I organised a large community fundraiser, managed our household budget and did some volunteer comms work for my daughter's school..."
          className="w-full min-h-[180px] rounded-xl p-4 text-base resize-y mb-2"
          style={{
            border: '1px solid var(--border)',
            color: 'var(--text)',
            fontFamily: 'DM Sans, sans-serif',
          }}
        />

        {/* Character counter */}
        <div
          className="text-xs text-right mb-6"
          style={{ color: isValid ? 'var(--purple)' : 'var(--muted)' }}
        >
          {charCount} / {MIN_CHARS} minimum
        </div>

        {/* LinkedIn URL input */}
        <div className="mb-6">
          <label
            className="block text-[14px] mb-1.5"
            style={{ color: 'var(--text)', fontFamily: 'DM Sans, sans-serif' }}
            htmlFor="linkedinUrl"
          >
            Your LinkedIn profile URL (optional)
          </label>
          <p
            className="text-[12px] mb-2"
            style={{ color: 'var(--muted)', fontFamily: 'DM Sans, sans-serif' }}
          >
            Adding this helps us give you a richer skills analysis
          </p>
          <input
            id="linkedinUrl"
            type="url"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            onBlur={(e) => validateLinkedInUrl(e.target.value)}
            placeholder="https://www.linkedin.com/in/yourname"
            className="w-full rounded-xl p-4 text-base"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--text)',
              fontFamily: 'DM Sans, sans-serif',
            }}
          />
          {linkedinError && (
            <p
              className="text-[12px] mt-1.5"
              style={{ color: 'var(--coral)', fontFamily: 'DM Sans, sans-serif' }}
            >
              Please enter a LinkedIn profile URL
            </p>
          )}
        </div>

        {/* Target role input */}
        <div className="mb-8">
          <label
            className="block text-sm mb-2"
            style={{ color: 'var(--text)' }}
            htmlFor="targetRole"
          >
            What kind of role are you hoping to return to? (optional)
          </label>
          <input
            id="targetRole"
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder="e.g., Marketing Manager, Project Coordinator..."
            className="w-full rounded-xl p-4 text-base"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--text)',
              fontFamily: 'DM Sans, sans-serif',
            }}
          />
        </div>

        {/* Analyze button */}
        <div className="flex justify-center">
          <button onClick={handleAnalyze} disabled={!isValid} className="btn-primary">
            Analyse my pivot
          </button>
        </div>
      </div>
    </div>
  );
}
