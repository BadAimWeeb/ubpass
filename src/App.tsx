import React from "react";
import {
    Toolbar, AppBar, Container, Paper, Typography, FilledInput,
    IconButton, InputAdornment, InputLabel, FormControl,
    FormControlLabel, Checkbox, Select, MenuItem, Alert, Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";

import BAW_LOGO from "./assets/logo.png";

import LegacyV1Generator from "./LegacyV1Generator";

class LegacyOptions extends React.Component<{
    onChange: (options: {
        hashAlgo: string,
        outputType: string,
        x2Pass: boolean
    }) => void
}> {
    state = {
        hashAlgo: "MD5",
        outputType: "HEX",
        x2Pass: false
    }

    componentDidUpdate() {
        this.props.onChange(this.state);
    }

    componentDidMount() {
        this.props.onChange(this.state);
    }

    render() {
        return (
            <React.Fragment>
                <div style={{ paddingBottom: 8 }}>
                    <FormControl fullWidth>
                        <InputLabel id="legacyopt-hashalgo">Hash Algorithm</InputLabel>
                        <Select
                            labelId="legacyopt-hashalgo"
                            value={this.state.hashAlgo}
                            label="Hash Algorithm"
                            onChange={(e) => this.setState({ hashAlgo: e.target.value })}
                        >
                            <MenuItem value="MD5">1 - MD5 (16 bytes)</MenuItem>
                            <MenuItem value="RIPEMD160">2 - RIPEMD160 (20 bytes)</MenuItem>
                            <MenuItem value="SHA1">3 - SHA-1 (20 bytes)</MenuItem>
                            <MenuItem value="SHA224">4 - SHA-224 (28 bytes)</MenuItem>
                            <MenuItem value="SHA256">5 - SHA-256 (32 bytes)</MenuItem>
                            <MenuItem value="SHA384">6 - SHA-384 (48 bytes)</MenuItem>
                            <MenuItem value="SHA512">7 - SHA-512 (64 bytes)</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div style={{ paddingBottom: 8 }}>
                    <FormControl fullWidth>
                        <InputLabel id="legacyopt-output">Output types</InputLabel>
                        <Select
                            labelId="legacyopt-output"
                            value={this.state.outputType}
                            label="Output types"
                            onChange={(e) => this.setState({ outputType: e.target.value })}
                        >
                            <MenuItem value="HEX">Hexadecimal (0-9 + a-f)</MenuItem>
                            <MenuItem value="BASE64">Base64 (0-9, A-Z, a-z, =)</MenuItem>
                            <MenuItem value="BINARY">Binary (0,1)</MenuItem>
                            <MenuItem value="ECOJI">Ecoji (🤔😊😂...)</MenuItem>
                            <MenuItem value="BASE65536">Base65536 (printable Unicode characters)</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.x2Pass}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                this.setState({
                                    ...this.state,
                                    x2Pass: event.target.checked
                                });
                            }}
                            name="legacyopt-x2pass"
                        />
                    }
                    label="Get x2 password length"
                    style={{ paddingBottom: 8 }}
                />
            </React.Fragment>
        )
    }
}

class ModernV2Options extends React.Component<{
    onChange: (options: {
        hashAlgo: string,
        outputMode: string
    }) => void
}> {
    state = {
        hashAlgo: "SHA3",
        outputMode: "PASSWORD"
    }

    render() {
        return (
            <React.Fragment>
                <div style={{ paddingBottom: 12 }}>
                    <Alert variant="filled" severity="warning">V2 output is still a work-in-progress. Use it at your own risk. Features included now may not be available later.</Alert>
                </div>
                <div style={{ paddingBottom: 8 }}>
                    <FormControl fullWidth style={{ marginTop: 4, marginBottom: 4 }}>
                        <InputLabel id="v2opt-hashalgo">Hash algorithm</InputLabel>
                        <Select
                            labelId="v2opt-hashalgo"
                            value={this.state.hashAlgo}
                            label="Hash algorithm"
                            onChange={(e) => this.setState({ hashAlgo: e.target.value })}
                        >
                            <MenuItem value="CRC32">CRC32</MenuItem>
                            <MenuItem value="MD4">MD4</MenuItem>
                            <MenuItem value="MD5">MD5</MenuItem>
                            <MenuItem value="SHA1">SHA1</MenuItem>
                            <MenuItem value="SHA2">SHA2</MenuItem>
                            <MenuItem value="SHA3">SHA3</MenuItem>
                            <MenuItem value="KECCAK">Keccak</MenuItem>
                            <MenuItem value="WHIRLPOOL">Whirlpool</MenuItem>
                            <MenuItem value="SM3">SM3</MenuItem>
                            <MenuItem value="RIPEMD">RIPEMD</MenuItem>
                            <MenuItem value="BLAKE2">BLAKE2</MenuItem>
                            <MenuItem value="BLAKE3">BLAKE3</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div style={{ paddingBottom: 8 }}>
                    <FormControl fullWidth style={{ marginTop: 4, marginBottom: 4 }}>
                        <InputLabel id="v2opt-hashlen">Hash length</InputLabel>
                        <Select
                            labelId="v2opt-hashalgo"
                            value={this.state.hashAlgo}
                            label="Hash algorithm"
                            onChange={(e) => this.setState({ hashAlgo: e.target.value })}
                        >

                        </Select>
                    </FormControl>
                </div>
                <div style={{ paddingBottom: 8 }}>
                    <FormControl fullWidth style={{ marginTop: 4, marginBottom: 4 }}>
                        <InputLabel id="v2opt-outputmode">Output mode</InputLabel>
                        <Select
                            labelId="v2opt-outputmode"
                            value={this.state.outputMode}
                            label="Output mode"
                            onChange={(e) => this.setState({ outputMode: e.target.value })}
                        >
                            <MenuItem value="RAW">Raw</MenuItem>
                            <MenuItem value="PASSWORD">Password</MenuItem>
                            <MenuItem value="PASSPHRASE">Passphrase</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </React.Fragment>
        )
    }
}

class PasswordInput extends React.Component<{
    onSelfRemove: (key: string) => void,
    onChange: (key: string, value: string) => void,
    k: string
}> {
    state = {
        password: "",
        showPassword: false,
        key: this.props.k
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            password: event.target.value
        });
        this.props.onChange(this.props.k, event.target.value);
    }

    handleClickShowPassword = () => {
        this.setState({
            ...this.state,
            showPassword: !this.state.showPassword
        });
    }

    handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    render() {
        return (
            <div style={{ display: "flex", marginTop: 4, marginBottom: 4 }}>
                <FormControl sx={{ m: 1, width: '100%' }} variant="filled">
                    <InputLabel htmlFor={`password-input-${this.props.k}`}>Password</InputLabel>
                    <FilledInput
                        id={`password-input-${this.props.k}`}
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.password}
                        onChange={this.handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                    onMouseDown={this.handleMouseDownPassword}
                                    edge="end"
                                >
                                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <IconButton aria-label="delete" onClick={() => this.props.onSelfRemove(this.props.k)}>
                    <DeleteIcon />
                </IconButton>
            </div>
        );
    }
}

export default class App extends React.Component {
    legacyOptions = <LegacyOptions onChange={c => this.setState({
        ...this.state,
        options: c
    })} />;
    modernV2Options = <ModernV2Options onChange={c => this.setState({
        ...this.state,
        options: c
    })} />;

    async invokeGeneratePwd() {
        if (this.state.useLegacy) {
            //@ts-ignore
            let pwd = await LegacyV1Generator(this.state.options, Object.values(this.state.passValue));
            console.log(pwd);
            this.setState({
                ...this.state,
                outputPassword: pwd
            })
        } else {
            this.setState({
                ...this.state,
                outputPassword: "Not implemented"
            });
        }
    }

    handleClickShowOutputPassword = () => {
        this.setState({
            ...this.state,
            showOutputPassword: !this.state.showOutputPassword
        });
    }

    handleMouseDownOutputPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    selfRemoveInputPassword = (key: string) => {
        let newInputPasswords = { ...this.state.passwords };
        delete newInputPasswords[key];
        this.setState({
            ...this.state,
            passwords: newInputPasswords
        });
    }

    changeInputPassword = (key: string, value: string) => {
        let newInputPasswords = { ...this.state.passValue };
        newInputPasswords[key] = value;
        this.setState({
            ...this.state,
            passValue: newInputPasswords
        });
    }

    state: {
        options: any,
        passwords: {
            [x: string]: JSX.Element
        },
        passValue: {
            [x: string]: string
        },
        useLegacy: boolean,
        outputPassword: string,
        showOutputPassword: boolean
    } = {
            options: {},
            passwords: {
                default1: <PasswordInput k="default1" key="default1" onSelfRemove={k => this.selfRemoveInputPassword(k)} onChange={(k, v) => this.changeInputPassword(k, v)} />,
                default2: <PasswordInput k="default2" key="default2" onSelfRemove={k => this.selfRemoveInputPassword(k)} onChange={(k, v) => this.changeInputPassword(k, v)} />
            },
            passValue: {
                default1: "",
                default2: ""
            },
            useLegacy: true,
            outputPassword: "",
            showOutputPassword: false
        }

    render() {
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
                                <Typography style={{ fontSize: 22 }}>Unbreakable Password Generator <sup>v2<sup style={{ fontSize: 12 }}>BETA</sup></sup></Typography>
                                <Typography>This tool can be used to generate (multiple) hard-to-break passwords derived from your easily-remembered passwords/passphrases.</Typography>
                                <Typography>You should not use common passwords as input, otherwise your passwords might be compromised by someone else.</Typography>
                                <br />
                                <Paper elevation={2}>
                                    <div style={{ padding: 12 }}>
                                        <div style={{ display: "flex" }}>
                                            <Typography style={{ width: "100%" }}>Input passwords:</Typography>
                                            <IconButton aria-label="add" onClick={() => {
                                                let k = `input${Object.keys(this.state.passwords).length + 1}-${Math.random()}`;
                                                this.setState({
                                                    ...this.state,
                                                    passwords: {
                                                        ...this.state.passwords,
                                                        [k]: <PasswordInput k={k} key={k} onSelfRemove={k => this.selfRemoveInputPassword(k)} onChange={(k, v) => this.changeInputPassword(k, v)} />
                                                    }
                                                });
                                            }}>
                                                <AddIcon />
                                            </IconButton>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            {Object.values(this.state.passwords)}
                                        </div>
                                    </div>
                                </Paper>
                                <br />
                                <Paper elevation={2}>
                                    <div style={{ padding: 12 }}>
                                        <Typography>Generator settings:</Typography>
                                        <div style={{ display: "flex", paddingLeft: 12, paddingRight: 12, flexDirection: "column" }}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={this.state.useLegacy}
                                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                            this.setState({
                                                                ...this.state,
                                                                useLegacy: event.target.checked
                                                            });
                                                        }}
                                                        name="useLegacy"
                                                    />
                                                }
                                                label="Legacy (v1) mode"
                                                style={{ paddingTop: 4, paddingBottom: 8 }}
                                            />
                                            {this.state.useLegacy ? this.legacyOptions : this.modernV2Options}
                                        </div>
                                    </div>
                                </Paper>
                                <br />
                                <Paper elevation={2}>
                                    <div style={{ padding: 12 }}>
                                        <div style={{ display: "flex" }}>
                                            <Typography style={{ width: "100%" }}>Output:</Typography>
                                            <Button variant="contained" color="primary" onClick={() => this.invokeGeneratePwd()}>
                                                Generate
                                            </Button>
                                        </div>
                                        <FormControl sx={{ m: 1, width: '100%' }} variant="filled">
                                            <InputLabel htmlFor="password-output">Password</InputLabel>
                                            <FilledInput
                                                id="password-output"
                                                type={this.state.showOutputPassword ? 'text' : 'password'}
                                                value={this.state.outputPassword}
                                                readOnly
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={this.handleClickShowOutputPassword}
                                                            onMouseDown={this.handleMouseDownOutputPassword}
                                                            edge="end"
                                                        >
                                                            {this.state.showOutputPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </div>
                                </Paper>
                            </div>
                        </Paper>
                    </Container>
                </main>
            </React.Fragment>
        )
    }
}
