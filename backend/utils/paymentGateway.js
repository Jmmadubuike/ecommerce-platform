const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

// Function to initiate payment
exports.initiatePayment = async (amount, email) => {
  const payload = {
    tx_ref: `txn_${Date.now()}`,
    amount,
    currency: 'NGN',
    payment_type: 'card', // Specify the payment type
    email,
    callback_url: `${process.env.CALLBACK_URL}/api/orders/callback`, // Your callback URL
  };

  try {
    const response = await flw.Charge.card(payload);
    return response;
  } catch (error) {
    throw new Error('Payment initiation failed');
  }
};
