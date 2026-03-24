import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface Skill {
  skill: string;
  evidence: string;
  category: string;
}

interface Role {
  title: string;
  reason: string;
}

interface Gap {
  gap: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
}

interface NextStep {
  title: string;
  description: string;
}

interface AIResult {
  professional_reframe: string;
  skills_found: Skill[];
  best_fit_roles: Role[];
  gaps: Gap[];
  next_step: NextStep;
  confidence: 'high' | 'medium' | 'low';
  confidence_note: string;
}

interface Screen5ResultsProps {
  goTo: (screen: string) => void;
  aiResult: AIResult | null;
  resetApp: () => void;
}

export default function Screen5Results({ goTo, aiResult, resetApp }: Screen5ResultsProps) {
  const [copied, setCopied] = useState(false);
  const [expandedSkill, setExpandedSkill] = useState<number | null>(null);
  const [nextStepDone, setNextStepDone] = useState(false);

  if (!aiResult) {
    return null;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(aiResult.professional_reframe);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const toggleSkill = (index: number) => {
    setExpandedSkill(expandedSkill === index ? null : index);
  };

  const handleNextStep = () => {
    setNextStepDone(true);
  };

  const handleStartAgain = () => {
    resetApp();
    goTo('landing');
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high':
        return { backgroundColor: '#FEF3F0', color: 'var(--orange)' };
      case 'medium':
        return { backgroundColor: '#FFFBEB', color: '#92400E' };
      case 'low':
        return { backgroundColor: '#F0FDF4', color: 'var(--success)' };
      default:
        return { backgroundColor: '#FEF3F0', color: 'var(--orange)' };
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 md:px-6 py-12">
      <div className="w-full max-w-[880px] flex flex-col gap-5 pb-12">
        <img
          src="/re-entry_logo.jpg"
          alt="re-entry"
          className="h-[36px] md:h-[44px] w-auto mb-2"
        />
        {/* CARD 1: Professional Reframe */}
        <div
          className="rounded-xl p-6 md:p-8"
          style={{ border: '1px solid var(--border)' }}
        >
          <div
            className="text-[11px] mb-3 font-medium"
            style={{
              letterSpacing: '0.08em',
              color: 'var(--orange)',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            YOUR PIVOT STORY
          </div>
          <p
            className="text-xl italic mb-4"
            style={{
              fontFamily: 'Playfair Display, serif',
              color: 'var(--text)',
              lineHeight: '1.6',
            }}
          >
            {aiResult.professional_reframe}
          </p>
          <p className="text-[13px] mb-4" style={{ color: 'var(--muted)' }}>
            Use this in interviews and on LinkedIn
          </p>
          <button
            onClick={handleCopy}
            className="rounded-full text-[13px] font-medium flex items-center gap-2"
            style={{
              border: '1px solid var(--orange)',
              color: 'var(--orange)',
              padding: '10px 16px',
              fontFamily: 'DM Sans, sans-serif',
              backgroundColor: 'transparent',
            }}
          >
            {copied ? (
              <>
                <Check size={14} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={14} />
                Copy
              </>
            )}
          </button>
        </div>

        {/* CARD 2: Skills Found */}
        <div
          className="rounded-xl p-6 md:p-8"
          style={{ border: '1px solid var(--border)' }}
        >
          <div
            className="text-[11px] mb-4 font-medium"
            style={{
              letterSpacing: '0.08em',
              color: 'var(--orange)',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            WHAT YOU ALREADY BRING
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {aiResult.skills_found.map((skill, index) => (
              <button
                key={index}
                onClick={() => toggleSkill(index)}
                className="rounded-full text-[13px]"
                style={{
                  backgroundColor: '#FEF3F0',
                  border: '1px solid #E8593C33',
                  color: 'var(--orange)',
                  padding: '6px 14px',
                  fontFamily: 'DM Sans, sans-serif',
                }}
              >
                {skill.skill}
              </button>
            ))}
          </div>
          {expandedSkill !== null && (
            <p
              className="text-[14px] italic mt-3 pt-3"
              style={{
                color: 'var(--muted)',
                borderTop: '1px solid var(--border)',
              }}
            >
              {aiResult.skills_found[expandedSkill].evidence}
            </p>
          )}
        </div>

        {/* CARD 3: Best Fit Roles */}
        <div
          className="rounded-xl p-6 md:p-8"
          style={{ border: '1px solid var(--border)' }}
        >
          <div
            className="text-[11px] mb-4 font-medium"
            style={{
              letterSpacing: '0.08em',
              color: 'var(--orange)',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            ROLES WORTH EXPLORING
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiResult.best_fit_roles.map((role, index) => (
              <div
                key={index}
                className="rounded-xl p-4"
                style={{ border: '1px solid var(--border)' }}
              >
                <div
                  className="text-[15px] font-medium mb-1"
                  style={{
                    color: 'var(--text)',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  {role.title}
                </div>
                <p
                  className="text-[13px] mb-3"
                  style={{
                    color: 'var(--muted)',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  {role.reason}
                </p>
                <a
                  href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(
                    role.title
                  )}&location=United%20Kingdom`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px]"
                  style={{
                    color: 'var(--orange)',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  Search on LinkedIn →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* CARD 4: Areas to Strengthen */}
        <div
          className="rounded-xl p-6 md:p-8"
          style={{ border: '1px solid var(--border)' }}
        >
          <div
            className="text-[11px] mb-4 font-medium"
            style={{
              letterSpacing: '0.08em',
              color: 'var(--orange)',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            AREAS TO STRENGTHEN
          </div>
          <div className="flex flex-col">
            {aiResult.gaps.map((gap, index) => (
              <div
                key={index}
                className="py-4"
                style={{
                  borderBottom:
                    index < aiResult.gaps.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[14px] font-medium"
                    style={{
                      color: 'var(--text)',
                      fontFamily: 'DM Sans, sans-serif',
                    }}
                  >
                    {gap.gap}
                  </span>
                  <span
                    className="rounded-full text-[11px] px-2.5 py-1"
                    style={{
                      ...getPriorityStyle(gap.priority),
                      fontFamily: 'DM Sans, sans-serif',
                    }}
                  >
                    {gap.priority}
                  </span>
                </div>
                <p
                  className="text-[13px]"
                  style={{
                    color: 'var(--muted)',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  {gap.action}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CARD 5: Next Step */}
        <div
          className="rounded-r-xl p-6 md:p-8"
          style={{
            border: '1px solid var(--border)',
            borderLeft: '4px solid var(--orange)',
            borderRadius: '0 12px 12px 0',
          }}
        >
          <div
            className="text-[11px] mb-3 font-medium"
            style={{
              letterSpacing: '0.08em',
              color: 'var(--orange)',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            START HERE
          </div>
          <h3
            className="text-[18px] font-medium mb-2"
            style={{
              color: 'var(--text)',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            {aiResult.next_step.title}
          </h3>
          <p
            className="text-[15px] mb-4"
            style={{
              color: 'var(--muted)',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            {aiResult.next_step.description}
          </p>
          <button
            onClick={handleNextStep}
            disabled={nextStepDone}
            className="btn-primary"
            style={{
              backgroundColor: nextStepDone ? 'var(--success)' : undefined,
            }}
          >
            {nextStepDone ? "Done!" : "I'm on it"}
          </button>
        </div>

        {/* FOOTER */}
        <div className="flex flex-col items-center mt-4">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="rounded-full text-[12px] px-3 py-1"
              style={{
                ...getPriorityStyle(aiResult.confidence),
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              AI confidence: {aiResult.confidence}
            </span>
          </div>
          <p
            className="text-[12px] italic text-center"
            style={{ color: 'var(--muted)' }}
          >
            {aiResult.confidence_note}
          </p>

          <div
            className="w-full text-center text-[12px] mt-4 pt-4"
            style={{
              color: 'var(--muted)',
              borderTop: '1px solid var(--border)',
            }}
          >
            Pivotly is an AI tool and may make mistakes. Always verify suggestions before acting
            on them. Not a substitute for professional careers advice.
          </div>

          <button
            onClick={handleStartAgain}
            className="text-[14px] underline mt-4"
            style={{ color: 'var(--muted)' }}
          >
            Start again
          </button>
        </div>
      </div>
    </div>
  );
}
