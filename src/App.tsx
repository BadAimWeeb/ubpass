import React from "react";
import { Toolbar, AppBar, Container, Paper, Typography, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import BAW_LOGO from "./assets/logo.png";

export default function App() {
    let inputPasswords = [
        <PasswordInput key={Math.random()} onSelfRemove={() => {}} />,
        <PasswordInput key={Math.random()} onSelfRemove={() => {}} />
    ];

    return (
        <React.Fragment>
            {/* header */}
            <AppBar position="fixed">
                <Toolbar>
                    <img src={BAW_LOGO} alt="logo" style={{
                        height: "48px",
                        width: "48px"
                    }} />
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: 6,
                        justifyContent: "center"
                    }}>
                        <Typography style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            fontStyle: "italic",
                            lineHeight: 0.9
                        }}>BadAimWeeb</Typography>
                        <Typography style={{
                            fontSize: 12,
                            fontWeight: "bold",
                            paddingLeft: 1
                        }}>UTILITIES</Typography>
                    </div>
                </Toolbar>
            </AppBar>
            <Toolbar />

            {/* body */}
            <main style={{ marginTop: 16 }}>
                <Container>
                    <Paper elevation={2}>
                        <div style={{ padding: 12 }}>
                            <Typography style={{ fontSize: 22 }}>Unbreakable Password Generator <sup>v2</sup></Typography>
                            <Typography>This tool can be used to generate (multiple) hard-to-break passwords derived from your easily-remembered passwords/passphrases.</Typography>
                            <Typography>Please note that you should not use common passwords as input, otherwise your passwords might be compromised by someone else.</Typography>

                            <Paper elevation={4}>
                                <div style={{ padding: 12 }}>
                                    <Typography>Input passwords:</Typography>
                                    {inputPasswords}
                                </div>
                            </Paper>
                        </div>
                    </Paper>
                </Container>
            </main>
        </React.Fragment>
    )
}

class PasswordInput extends React.Component<{
    onSelfRemove: () => void
}> {
    render() {
        return (
            <div style={{ display: "flex" }}>
                <TextField label="Password" variant="filled" />
                <IconButton aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </div>
        );
    }
}
