// import flightsapi from "../api/flightsapi";
// import { SAVE_BOOKING, SEARCH_FLIGHTS } from "./actionTypes";
// import { SEARCH_BUSES, SAVE_BUS, UPDATE_BUS, DELETE_BUS } from "./actionTypes";
// import { toast } from "react-toastify";

// export const searchFlights = (info) => async (dispatch) => {
//   try {
//     const response = await flightsapi.get(
//       `/find-Bus/${info.origin}/${info.dest}/${info.date}`
//     );

//     if (response && response.status === 200) {
//       console.log("Search Bus Response Data:", response.data); // Log the response data
//       dispatch({ type: SEARCH_FLIGHTS, payload: response.data });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const saveBooking = (info) => async (dispatch) => {
//   try {
//     const response = await flightsapi.post("/save-booking", { ...info });

//     switch (response?.status) {
//       case 400:
//         toast.error("Booking failed!", { position: "top-center" });

//         break;
//       case 200:
//         dispatch({ type: SAVE_BOOKING, payload: response.data });
//         console.log("Save Booking Response Data:", response.data);
//         toast.success(response.data.message, { position: "top-center" });
//         break;
//       default:
//         toast.error("Unexpected response!", { position: "top-center" });
//         break;
//     }
//   } catch (error) {
//     console.log(error);
//     toast.error("Booking failed!", { position: "top-center" });
//   }
// };

// //BusCrud
// // export const searchBuses = (info) => async (dispatch) => {
// //   try {
// //     const response = await flightsapi.get(
// //       `/find-Bus/${info.origin}/${info.dest}/${info.date}`
// //     );

// //     if (response && response.status === 200) {
// //       dispatch({ type: SEARCH_BUSES, payload: response.data });
// //     }
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };

// export const saveBus = (info) => async (dispatch) => {
//   try {
//     const response = await flightsapi.post("/bus", { ...info });

//     if (response?.status === 200) {
//       dispatch({ type: SAVE_BUS, payload: response.data });
//       toast.success("Bus saved successfully", { position: "top-center" });
//     }
//   } catch (error) {
//     console.log(error);
//     toast.error("Failed to save bus", { position: "top-center" });
//   }
// };

// export const updateBus = (info) => async (dispatch) => {
//   try {
//     const response = await flightsapi.put(`/bus/${info.flid}`, { ...info });

//     if (response?.status === 200) {
//       dispatch({ type: UPDATE_BUS, payload: response.data });
//       toast.success("Bus updated successfully", { position: "top-center" });
//     }
//   } catch (error) {
//     console.log(error);
//     toast.error("Failed to update bus", { position: "top-center" });
//   }
// };

// export const deleteBus = (flid) => async (dispatch) => {
//   try {
//     const response = await flightsapi.delete(`/bus/${flid}`);

//     if (response?.status === 200) {
//       dispatch({ type: DELETE_BUS, payload: flid });
//       toast.success("Bus deleted successfully", { position: "top-center" });
//     }
//   } catch (error) {
//     console.log(error);
//     toast.error("Failed to delete bus", { position: "top-center" });
//   }
// };