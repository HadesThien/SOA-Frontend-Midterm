import React from 'react';
import { Snackbar, Alert } from '@mui/material';

/**
 * @name CustomAlert
 * @description Reusable snackbar component for displaying messages.
 * @param {object} props - Component props.
 * @param {boolean} props.open - State to control the visibility of the alert.
 * @param {string} props.message - The message to display.
 * @param {string} props.severity - The severity of the alert ('error', 'warning', 'info', 'success').
 * @param {function} props.onClose - Callback function to close the alert.
 */
const CustomAlert = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
