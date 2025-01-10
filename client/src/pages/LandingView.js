import React, { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Checkbox,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Container } from "@mui/material";
import axios from "axios";

export default function LandingView(props) {
  const [formData, setFormData] = useState({
    startStop: "",
    endStop: "",
  });
  const [traines, setTraines] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [nic, setNic] = useState("");
  const [date, setDate] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [selectedBookingDate, setSelectedBookingDate] = useState("");
  const [showAvailableSeats, setShowAvailableSeats] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7003/api/TrainAPI/GetTrainsByStops`,
        {
          params: {
            startStop: formData.startStop,
            endStop: formData.endStop,
          },
        }
      );
      setTraines(response.data);
      console.log("Trains:", response.data);
    } catch (error) {
      console.error("Error fetching traines:", error);
      alert(
        "An error occurred while fetching the data or your input is not complete. Please try again later."
      );
    }
  };

  const handleBooking = async (train) => {
    setSelectedTrain(train);
    setOpenModal(true);
  };
  const handleBookingConfirmation = async () => {
    try {
      // Make an API call to fetch booking details for the selected train and date
      const response = await axios.get(
        `https://localhost:7002/api/BookingAPI/GetBookingsByDateAndTrain`,
        {
          params: {
            travelDate: selectedBookingDate,
            trainNo: selectedTrain.trainNo,
          },
        }
      );
      setBookingDetails(response.data); // Set the fetched booking details
      console.log("Booking Details:", response.data);

      // Populate the selected seats with available seats for the selected train
      setSelectedSeats(selectedTrain.availableSeats);
      setShowAvailableSeats(true)
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };
  const handleSeatSelection = (event, seat) => {
    if (event.target.checked) {
      setSelectedSeats((prevSeats) => [...prevSeats, seat]);
    } else {
      setSelectedSeats((prevSeats) => prevSeats.filter((s) => s !== seat));
    }
  };

  const handleNicChange = (event) => {
    setNic(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
    setSelectedBookingDate(event.target.value);
  };

  const handleCloseModal = () => {
    setSelectedSeats([]);
    setNic("");
    setDate("");
    setOpenModal(false);
  };
  const handleRemoveSeat = async (seats) => {
    try {
      // Check if seats is an array
      if (!Array.isArray(seats)) {
        console.error("Seats must be an array.");
        return;
      }
  
      // Send DELETE request for each seat
      for (const seat of seats) {
        console.log("Removing seat:", seat);
        await axios.delete(`https://localhost:7003/api/TrainAPI/RemoveSeat/${selectedTrain.trainId}?seats=${seat}`);
        console.log(`Seat ${seat} removed successfully.`);
      }
    } catch (error) {
      console.error("Error removing seat:", error);
      // Handle error
    }
  };
  
  

  const handleConfirmBooking = () => {
    console.log("Selected Seats:", selectedSeats);
    console.log("NIC:", nic);
    console.log("Date:", date);
    console.log("Selected Train Info:", selectedTrain);

    const bookingData = {
      nic: nic,
      rootCode: selectedTrain.rootCode,
      trainNo: selectedTrain.trainNo,
      sourceStation: formData.startStop,
      destinationStation: formData.endStop,
      travelDate: date,
      bookedSeats: selectedSeats,
    };

    axios
      .post("https://localhost:7002/api/BookingAPI", bookingData)
      .then((response) => {
        console.log("Booking successful:", response.data);
        const bookingInfo =
          "Booking ID: " +
          response.data.bookingId +
          "\nBooking Date: " +
          response.data.bookingDate +
          "\nBooking Time: " +
          response.data.bookingTime;
        window.alert("Booking successful!\n");
        alert("Booking Successful!");
        handleRemoveSeat(bookingData.bookedSeats);
        // window.location.reload();
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error booking:", error);
      });
    handleCloseModal();
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/309944/pexels-photo-309944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Container maxWidth="sm">
          <form>
            <Paper
              elevation={6}
              style={{
                padding: "20px",
                borderRadius: "10px",
                width: "100%",
                backdropFilter: "blur(5px)",
                backgroundColor: "rgba(255, 255, 255, 0.3)",
              }}
            >
              <h5 style={{ marginBottom: "20px" }}>Search Trains</h5>
              <div className="inner-search-form">
                <div style={{ marginBottom: "20px" }}>
                  <TextField
                    label="From"
                    variant="outlined"
                    name="startStop"
                    onChange={handleInputChange}
                  />
                  &nbsp;
                  <TextField
                    label="To"
                    variant="outlined"
                    name="endStop"
                    onChange={handleInputChange}
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  size="large"
                  variant="contained"
                  color="primary"
                >
                  Search
                </Button>
              </div>
            </Paper>
          </form>
        </Container>
        <Container maxWidth="xl">
          <TableContainer
            component={Paper}
            style={{
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(15px)",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
            }}
          >
              {traines.length > 0 ? (
    <Table>
      <TableHead style={{ backgroundColor: "#f0f0f0" }}>
        <TableRow>
          <TableCell style={{ fontWeight: "bold" }}>Train No</TableCell>
          <TableCell style={{ fontWeight: "bold" }}>Available Seats</TableCell>
          <TableCell style={{ fontWeight: "bold" }}>Booking</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {traines.map((train) => (
          <TableRow key={train.trainId}>
            <TableCell>{train.trainNo}</TableCell>
            <TableCell>{train.availableSeats.length}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleBooking(train)}
                style={{ borderRadius: "20px" }}
              >
                Book Now
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <p>No data available</p>
  )}
          </TableContainer>
        </Container>
      </Stack>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        PaperProps={{
          style: { maxWidth: "800px", margin: "auto", padding: "20px" },
        }}
      >
        <DialogTitle style={{ textAlign: "center" }}>
          Booking<p>Select up to 5 seats</p>
        </DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "45%" }}>
              {selectedTrain && (
                <div>
                  <div><span>Train Details:</span>{selectedTrain.trainNo}</div><br></br>
                  <TextField
                    label="NIC"
                    variant="outlined"
                    value={nic}
                    onChange={handleNicChange}
                    fullWidth
                    style={{ marginBottom: "10px" }}
                  />
                  <TextField
                    label="Select Date"
                    variant="outlined"
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </div>
              )}
            </div>
            {showAvailableSeats && (
            <div style={{ width: "45%" }}>
              {selectedTrain && (
                <div>
                  <p>Select seats:</p>
                  <div>
                    {selectedTrain.availableSeats.map((seat, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            onChange={(event) =>
                              handleSeatSelection(event, seat)
                            }
                            checked={selectedSeats.includes(seat)}
                            disabled={
                              selectedSeats.length === 5 &&
                              !selectedSeats.includes(seat)
                            }
                          />
                        }
                        label={seat}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          </div>
          <Fragment>
            <p>Booking Details:</p>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Booking ID</TableCell>
                    <TableCell>Train No</TableCell>
                    <TableCell>Booked Seats</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookingDetails?.map((booking) => (
                    <TableRow key={booking.bookingId}>
                      <TableCell>{booking.bookingId}</TableCell>
                      <TableCell>{booking.trainNo}</TableCell>
                      <TableCell>{booking.bookedSeats.join(", ")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Fragment>
        </DialogContent>
        <DialogActions style={{ justifyContent: "space-between" }}>
          <Button onClick={handleBookingConfirmation} color="primary">
            Check Availability
          </Button>
          <div>
            <Button onClick={handleCloseModal} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmBooking}
              color="primary"
              disabled={selectedSeats.length === 0}
            >
              Confirm Booking
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
