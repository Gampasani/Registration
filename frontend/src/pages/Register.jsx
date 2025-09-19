import { Button, TextField, Container, Typography } from "@mui/material";

export default function Register() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      <TextField label="Full Name" fullWidth margin="normal" />
      <TextField label="Email" fullWidth margin="normal" />
      <TextField label="Password" type="password" fullWidth margin="normal" />
      <TextField label="Mobile No" fullWidth margin="normal" />
      <Button variant="contained" color="primary" fullWidth>Register</Button>
    </Container>
  );
}
