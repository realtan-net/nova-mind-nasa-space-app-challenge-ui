import { Alert, AlertTitle, Button, Box } from '@mui/material';
import { FaRedo } from 'react-icons/fa';

const ErrorMessage = ({ error, retry, title = 'Error' }) => {
  if (!error) return null;

  const errorMessage = typeof error === 'string' ? error : error.message || 'An unexpected error occurred';

  return (
    <Box sx={{ my: 2 }}>
      <Alert
        severity="error"
        action={
          retry && (
            <Button
              color="inherit"
              size="small"
              onClick={retry}
              startIcon={<FaRedo />}
            >
              Retry
            </Button>
          )
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {errorMessage}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;
