import { useState } from 'react';
import Screen1Landing from './screens/Screen1Landing';
import Screen2PivotReason from './screens/Screen2PivotReason';
import Screen3BrainDump from './screens/Screen3BrainDump';
import Screen4Loading from './screens/Screen4Loading';
import Screen5Results from './screens/Screen5Results';
import Screen6Error from './screens/Screen6Error';

type Screen = 'landing' | 'pivotReason' | 'brainDump' | 'loading' | 'results' | 'error';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [pivotReason, setPivotReason] = useState<string | null>(null);
  const [brainDump, setBrainDump] = useState<string>('');
  const [linkedinUrl, setLinkedinUrl] = useState<string>('');
  const [targetRole, setTargetRole] = useState<string>('');
  const [aiResult, setAiResult] = useState<object | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const goTo = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const resetApp = () => {
    setPivotReason(null);
    setBrainDump('');
    setLinkedinUrl('');
    setTargetRole('');
    setAiResult(null);
    setErrorMessage(null);
  };

  const analyzeWithAI = async () => {
    goTo('loading');

    const systemPrompt = `You are Pivotly — an AI career re-entry assistant that helps women translate life experience into professional leverage.

Always respond with valid JSON only. No prose, no markdown, nothing outside the JSON.

{
  "professional_reframe": "string (2-3 sentences, confident, no apologising for the gap)",
  "skills_found": [
    {
      "skill": "string",
      "evidence": "string (from what they told you only)",
      "category": "leadership | communication | organisation | technical | interpersonal | resilience"
    }
  ],
  "best_fit_roles": [
    {
      "title": "string",
      "reason": "string (one sentence, UK market)"
    }
  ],
  "gaps": [
    {
      "gap": "string",
      "action": "string (free or low-cost UK step)",
      "priority": "high | medium | low"
    }
  ],
  "next_step": {
    "title": "string (max 8 words)",
    "description": "string (max 2 sentences)"
  },
  "confidence": "high | medium | low",
  "confidence_note": "string (one sentence)"
}

Hard rules:
- Only surface skills the user has evidenced.
- Max 5 skills_found, 3 best_fit_roles, 3 gaps.
- Never fabricate URLs or qualifications.
- Never suggest the user apologise for their break.
- UK job market only.
- If too vague: {"error":"needs_more_info","prompt":"friendly follow-up question"}`;

    const userMessage = `Pivot reason: ${pivotReason || 'not specified'}

${brainDump}

Target role: ${targetRole || 'not specified'}`;

    try {
      const response = await fetch('/api/analyse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
          
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: 'user', content: userMessage }],
        }),
      });

      const data = await response.json();
      const raw = data.content[0].text;
      const clean = raw.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);

      if (parsed.error === 'needs_more_info') {
        setErrorMessage(parsed.prompt);
        goTo('brainDump');
      } else {
        setAiResult(parsed);
        goTo('results');
      }
    } catch (e) {
      setErrorMessage('Something went wrong. Please try again.');
      goTo('brainDump');
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <Screen1Landing goTo={goTo} />;
      case 'pivotReason':
        return (
          <Screen2PivotReason
            goTo={goTo}
            pivotReason={pivotReason}
            setPivotReason={setPivotReason}
          />
        );
      case 'brainDump':
        return (
          <Screen3BrainDump
            goTo={goTo}
            brainDump={brainDump}
            setBrainDump={setBrainDump}
            linkedinUrl={linkedinUrl}
            setLinkedinUrl={setLinkedinUrl}
            targetRole={targetRole}
            setTargetRole={setTargetRole}
            analyzeWithAI={analyzeWithAI}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        );
      case 'loading':
        return <Screen4Loading goTo={goTo} />;
      case 'results':
        return <Screen5Results goTo={goTo} aiResult={aiResult} resetApp={resetApp} />;
      case 'error':
        return <Screen6Error goTo={goTo} />;
      default:
        return <Screen1Landing goTo={goTo} />;
    }
  };

  return <div>{renderScreen()}</div>;
}

export default App;
