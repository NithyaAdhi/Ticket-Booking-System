// import React, { useState } from "react";
// import { Backdrop, Button, Grid, Paper, Stack } from "@mui/material";
// import {
//   AirlineSeatIndividualSuite,
//   AirlineSeatLegroomExtra,
// } from "@mui/icons-material";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import Alert from "@mui/material/Alert";
// import AlertTitle from "@mui/material/AlertTitle";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
// import TextField from "@mui/material/TextField";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { saveBooking } from "../component/action/Bus-actions";

// export default function BookingInfo() {
//   const dispatch = useDispatch();
//   const { flid } = useParams();

//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { savedBooking } = useSelector((state) => state.search);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     dob: new Date(),
//     nic: ""
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;

//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSeatClick = (seat) => {
//     if (selectedSeats.includes(seat)) {
//       setSelectedSeats(selectedSeats.filter((s) => s !== seat));
//     } else {
//       setSelectedSeats([...selectedSeats, seat]);
//     }
//   };

//   const handleBookingContinue = async () => {
//     setLoading(true);
//     console.log(selectedSeats, formData, flid);

//     let formValues = {
//       ...formData,
//       seats: selectedSeats.join(","),
//       flid: flid
//     };

//     try {
//       await dispatch(saveBooking(formValues));
//       setLoading(false);
//       toast.success("Booking successful!", { position: "top-center" });

//     } catch (error) {
//       setLoading(false);
//       toast.error("Booking failed!", { position: "top-center" });

//     }
//   };

//   const renderSeat = (seatNumber) => {
//     const isSelected = selectedSeats.includes(seatNumber);

//     return (
//       <Button
//         variant={isSelected ? "contained" : "outlined"}
//         startIcon={
//           isSelected ? (
//             <AirlineSeatIndividualSuite />
//           ) : (
//             <AirlineSeatLegroomExtra />
//           )
//         }
//         onClick={() => handleSeatClick(seatNumber)}
//       >
//         {seatNumber}
//       </Button>
//     );
//   };

//   const renderAirlineSeatsView = () => {
//     return (
//       <div>
//         <Grid container spacing={2}>
//           {Array.from({ length: 6 }, (_, row) => (
//             <Grid container item justifyContent="center" key={row}>
//               {Array.from({ length: 5 }, (_, col) => (
//                 <Grid item key={col}>
//                   <Paper elevation={3} sx={{ p: 2 }}>
//                     {renderSeat(`${String.fromCharCode(65 + row)}${col + 1}`)}
//                   </Paper>
//                 </Grid>
//               ))}
//             </Grid>
//           ))}
//         </Grid>
//       </div>
//     );
//   };

//   const renderPersonalInfo = () => {
//     return (
//       <Paper elevation={6}>
//         <h3>Enter Personal Information</h3>
//         <div className="inner-search-form">
//           <Stack direction="column">
//             <div>
//               <TextField
//                 label="First name"
//                 variant="outlined"
//                 name="firstName"
//                 onChange={handleInputChange}
//               />
//               &nbsp;
//               <TextField
//                 label="Last name"
//                 variant="outlined"
//                 name="lastName"
//                 onChange={handleInputChange}
//               />
//             </div>
//             <br />
//             <div>
//               <TextField
//                 label="Travel Date"
//                 variant="outlined"
//                 type="date"
//                 value={formData.dob}
//                 name="dob"
//                 onChange={handleInputChange}
//               />
//             </div>
//             <br />
//             <div>
//               <TextField
//                 label="NIC"
//                 variant="outlined"
//                 name="nic"
//                 onChange={handleInputChange}
//               />
//             </div>
//           </Stack>
//         </div>
//       </Paper>
//     );
//   };

//   return (
//     <React.Fragment>
//       <ToastContainer />
      
//       <h3>Enter your info to continue Booking</h3>

//       {renderAirlineSeatsView()}

//       {renderPersonalInfo()}

//       <br />
//       <Button onClick={() => handleBookingContinue()} variant="contained">
//         Book this Bus
//       </Button>

//       <Backdrop open={loading} />
//     </React.Fragment>
//   );
// }
