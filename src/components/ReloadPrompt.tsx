import { useRegisterSW } from 'virtual:pwa-register/react';
import { XIcon } from './icons';

const UPDATE_CHECK_INTERVAL = 60 * 60 * 1000;

export function ReloadPrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_swUrl, registration) {
      if (registration) {
        setInterval(() => {
          registration.update();
        }, UPDATE_CHECK_INTERVAL);
      }
    },
  });

  if (!needRefresh) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md">
      <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-info text-white shadow-lg">
        <span className="text-sm flex-1">A new version is available!</span>
        <button
          onClick={() => updateServiceWorker(true)}
          className="text-sm font-semibold px-3 py-1 rounded bg-white/20 hover:bg-white/30 transition-colors cursor-pointer text-white border-none"
        >
          Reload
        </button>
        <button
          onClick={() => setNeedRefresh(false)}
          className="p-1 rounded hover:bg-white/20 transition-colors cursor-pointer bg-transparent border-none text-white"
          aria-label="Dismiss"
        >
          <XIcon size={16} />
        </button>
      </div>
    </div>
  );
}
