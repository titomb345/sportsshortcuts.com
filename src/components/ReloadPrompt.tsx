import { useRegisterSW } from 'virtual:pwa-register/react';
import { Snackbar, Button, Alert } from '@mui/material';

const UPDATE_CHECK_INTERVAL = 60 * 60 * 1000; // Check for updates every hour

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

  return (
    <Snackbar
      open={needRefresh}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        severity="info"
        variant="filled"
        onClose={() => setNeedRefresh(false)}
        action={
          <Button
            color="inherit"
            size="small"
            onClick={() => updateServiceWorker(true)}
          >
            Reload
          </Button>
        }
      >
        A new version is available!
      </Alert>
    </Snackbar>
  );
}
