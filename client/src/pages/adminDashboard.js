import React, { useState, useEffect } from "react";
import { Button, Table, Form, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminDashboard.css";
import axios from "axios";

function AdminDashboard() {
  const API_BASE_URL = "https://localhost:7003/api/TrainAPI";

  const [searchInfo, setSearchInfo] = useState({
    origin: "",
    dest: "",
    date: "",
  });

  const [trainInfo, setTrainInfo] = useState({
    trainNo: "",
    availableSeats: [],
    trainStops: [],
  });

  const [selectedTrain, setSelectedTrain] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchTrains();
  }, []);

  const fetchTrains = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching trains:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/GetTrainsByStops`, {
        params: {
          startStop: searchInfo.origin,
          endStop: searchInfo.dest,
        },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching trains:", error);
    }
  };

  const handleSave = async () => {
    try {
      const numberOfSeats = trainInfo.availableSeats.length > 0 ? trainInfo.availableSeats[0] : 50;
      const newTrain = {
        ...trainInfo,
      };
      await axios.post(`${API_BASE_URL}?numberOfSeats=${numberOfSeats}`, newTrain);
      toast.success("Train is Saved", { position: "top-center" });
      window.alert("New train " + trainInfo.trainNo + " is added");
      fetchTrains();
    } catch (error) {
      console.error("Error saving train:", error);
    }
  };
  

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${API_BASE_URL}/${selectedTrain.trainId}`,
        selectedTrain
      );
      toast.success("Train is Updated", { position: "top-center" });
      window.alert("Train id " + selectedTrain.trainId + " is Updated");
      fetchTrains();
    } catch (error) {
      console.error("Error updating train:", error);
    }
  };

  const handleDelete = async (trainId) => {
    try {
      await axios.delete(`${API_BASE_URL}/${trainId}`);
      toast.success("Train is Deleted", { position: "top-center" });
      window.alert("Train id " + trainId + " is deleted successfully");
      fetchTrains();
    } catch (error) {
      console.error("Error deleting train:", error);
    }
  };

  return (
    <div>
      <h5>Admin Dashboard</h5>

      {/* Search Form */}
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="origin">
            <Form.Label>Origin</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter origin"
              value={searchInfo.origin}
              onChange={(e) =>
                setSearchInfo({ ...searchInfo, origin: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group as={Col} controlId="destination">
            <Form.Label>Destination</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter destination"
              value={searchInfo.dest}
              onChange={(e) =>
                setSearchInfo({ ...searchInfo, dest: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group as={Col} controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={searchInfo.date}
              onChange={(e) =>
                setSearchInfo({ ...searchInfo, date: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group as={Col} className="align-self-end">
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </Form.Group>
        </Row>
      </Form>
      <hr></hr>
      <br />

      {/* Train List */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Train No</th>
            <th>Available Seats</th>
            <th>Train Stops</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((train, index) => (
            <tr key={index}>
              <td>{train.trainId}</td>
              <td>{train.trainNo}</td>
              <td>{train.availableSeats.join(", ")}</td>
              <td>{train.trainStops.join(", ")}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => setSelectedTrain(train)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(train.trainId)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <hr></hr>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="trainNo">
            <Form.Label>Train No</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter train number"
              value={trainInfo.trainNo}
              onChange={(e) =>
                setTrainInfo({ ...trainInfo, trainNo: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group as={Col} controlId="availableSeats">
            <Form.Label>Available Seats</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter available seats"
              value={trainInfo.availableSeats.join(", ")}
              onChange={(e) =>
                setTrainInfo({
                  ...trainInfo,
                  availableSeats: e.target.value.split(", "),
                })
              }
            />
          </Form.Group>

          <Form.Group as={Col} controlId="trainStops">
            <Form.Label>Train Stops</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter train stops"
              value={trainInfo.trainStops.join(",")}
              onChange={(e) =>
                setTrainInfo({
                  ...trainInfo,
                  trainStops: e.target.value.split(","),
                })
              }
            />
          </Form.Group>

          <Form.Group as={Col} className="align-self-end">
            {selectedTrain ? (
              <Button variant="primary" onClick={handleUpdate}>
                Update
              </Button>
            ) : (
              <Button variant="primary" onClick={handleSave}>
                Save
              </Button>
            )}
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
}

export default AdminDashboard;
