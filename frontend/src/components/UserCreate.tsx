import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { UsersInterface } from "../models/IUser";
import {MuiPickersUtilsProvider,KeyboardDatePicker,} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";


function Alert(props: AlertProps) {
 return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme: Theme) =>
 createStyles({
   root: {flexGrow: 1},
   container: {marginTop: theme.spacing(2)},
   paper: {padding: theme.spacing(2),color: theme.palette.text.secondary},
 })
);


function UserCreate() {
 const classes = useStyles();
 const [selectedDate, setSelectedDate] = React.useState<Date | null>(
   new Date()
 );
 const [user, setUser] = React.useState<Partial<UsersInterface>>({});
 const [success, setSuccess] = React.useState(false);
 const [error, setError] = React.useState(false);


 const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
   if (reason === "clickaway") {
     return;
   }
   setSuccess(false);
   setError(false);
 };


 const handleDateChange = (date: Date | null) => {
   setSelectedDate(date);
 };


 const handleInputChange = (
   event: React.ChangeEvent<{ id?: string; value: any }>
 ) => {
   const id = event.target.id as keyof typeof UserCreate;
   const { value } = event.target;
   setUser({ ...user, [id]: value });
 };


 function submit() {
   let data = {
     FirstName: user.FirstName ?? "",
     LastName: user.LastName ?? "",
     Email: user.Email ?? "",
     Age: typeof user.Age === "string" ? parseInt(user.Age) : 0,
     BirthDay : selectedDate
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
       if (res.data) {
         setSuccess(true);
       } else {
         setError(true);
       }
     });
 }


 return (
   <Container className={classes.container} maxWidth="md">
     <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
       <Alert onClose={handleClose} severity="success">
         บันทึกข้อมูลสำเร็จ
       </Alert>
     </Snackbar>
     <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
       <Alert onClose={handleClose} severity="error">
         บันทึกข้อมูลไม่สำเร็จ
       </Alert>
     </Snackbar>
     <Paper className={classes.paper}>
       <Box display="flex">
         <Box flexGrow={1}>
           <Typography
             component="h2"
             variant="h6"
             color="primary"
             gutterBottom
           >
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
               type="string"
               size="medium"
               value={user.FirstName || ""}
               onChange={handleInputChange}
             />
           </FormControl>
         </Grid>
         <Grid item xs={6}>
           <FormControl fullWidth variant="outlined">
             <p>Last Name</p>
             <TextField
               id="LastName"
               variant="outlined"
               type="string"
               size="medium"
               value={user.LastName || ""}
               onChange={handleInputChange}
             />
           </FormControl>
         </Grid>
         <Grid item xs={12}>
           <FormControl fullWidth variant="outlined">
             <p>Email</p>
             <TextField
               id="Email"
               variant="outlined"
               type="string"
               size="medium"
               value={user.Email || ""}
               onChange={handleInputChange}
             />
           </FormControl>
         </Grid>
         <Grid item xs={6}>
           <FormControl fullWidth variant="outlined">
             <p>Age</p>
             <TextField
               id="Age"
               variant="outlined"
               type="number"
               size="medium"
               InputProps={{ inputProps: { min: 1 } }}
               InputLabelProps={{
                 shrink: true,
               }}
               value={user.Age || ""}
               onChange={handleInputChange}
             />
           </FormControl>
         </Grid>
         <Grid item xs={6}>
           <FormControl fullWidth variant="outlined">
             <p>BirthDay</p>
             <MuiPickersUtilsProvider utils={DateFnsUtils}>
               <KeyboardDatePicker
                 margin="normal"
                 id="BirthDay"
                 format="yyyy-MM-dd"
                 value={selectedDate}
                 onChange={handleDateChange}
                 KeyboardButtonProps={{
                   "aria-label": "change date",
                 }}
               />
             </MuiPickersUtilsProvider>
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

