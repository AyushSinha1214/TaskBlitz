import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    // API call logic to validate user
    console.log("Sign In:", { email, password });
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        Sign In
      </Typography>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSignIn}
        sx={{ mt: 2 }}
      >
        Sign In
      </Button>
    </Container>
  );
};

export default SignIn;

