import React from 'react';
import { Container, Paper, Box, Typography } from '@mui/material';
import PaymentForm from '../components/payment/PaymentForm';

/**
 * @name PaymentPage
 * @description Page component for the tuition payment screen.
 * @param {object} props - Component props.
 * @param {object} props.user - The logged-in user object.
 */
const PaymentPage = ({ user }) => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <PaymentForm user={user} />
      </Paper>
    </Container>
  );
};

export default PaymentPage;
