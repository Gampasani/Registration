import { Container, Typography, TextField, Button } from "@mui/material";

export default function Settings() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>Settings</Typography>
      <TextField label="Company Name" fullWidth margin="normal" />
      <TextField label="Address" fullWidth margin="normal" />
      <TextField label="City" fullWidth margin="normal" />
      <TextField label="Country" fullWidth margin="normal" />
      <Button variant="contained" color="primary" fullWidth>Save</Button>
    </Container>
  );
}
