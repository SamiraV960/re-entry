interface Screen6ErrorProps {
  goTo: (screen: string) => void;
}

export default function Screen6Error({ goTo }: Screen6ErrorProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-8">Error</h1>
      <button
        onClick={() => goTo('landing')}
        className="btn-primary"
      >
        Back to Start
      </button>
    </div>
  );
}
