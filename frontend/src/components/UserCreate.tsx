import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import {
  TextField,
  Button,
  FormControl,
  Container,
  Paper,
  Box,
  Typography,
  Divider
} from "@mui/material";
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';
import { UsersInterface } from "../models/IUser";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const useStyles = makeStyles((theme: Theme) => ({
  root: { flexGrow: 1 },
  container: { marginTop: theme.spacing(2) },
  paper: { padding: theme.spacing(2), color: theme.palette.text.secondary },
}));

function UserCreate() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
  const [user, setUser] = React.useState<Partial<UsersInterface>>({});
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent<any> | Event, reason?: string) => {
    if (reason === "clickaway") {
    return;
  }
  setSuccess(false);
  setError(false);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id as keyof UsersInterface;
    const { value } = event.target;
    setUser({ ...user, [id]: value });
  };

  const submit = () => {
    let data = {
      FirstName: user.FirstName ?? "",
      LastName: user.LastName ?? "",
      Email: user.Email ?? "",
      Age: typeof user.Age === "string" ? parseInt(user.Age) : user.Age ?? 0,
      BirthDay: selectedDate,
    };

    const apiUrl = "http://localhost:8080/users";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) setSuccess(true);
        else setError(true);
      })
      .catch(() => setError(true));
  };

  return (
    <Container className={classes.container} maxWidth="md">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" variant="filled">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Paper className={classes.paper}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Create User
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} className={classes.root}>
          <Grid item xs={6}>
            <p>First Name</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="FirstName"
                variant="outlined"
                type="text"
                size="medium"
                value={user.FirstName || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <p>Last Name</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="LastName"
                variant="outlined"
                type="text"
                size="medium"
                value={user.LastName || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <p>Email</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Email"
                variant="outlined"
                type="email"
                size="medium"
                value={user.Email || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <p>Age</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Age"
                variant="outlined"
                type="number"
                size="medium"
                inputProps={{ min: 1 }}
                value={user.Age || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <p>BirthDay</p>
            <FormControl fullWidth variant="outlined">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button component={RouterLink} to="/" variant="contained">
              Back
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default UserCreate;
