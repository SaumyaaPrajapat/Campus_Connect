import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Box, Checkbox } from "@mui/material";
import { getAllComplains } from "../../../redux/complainRelated/complainHandle";
import TableTemplate from "../../../components/TableTemplate";
import nocomplains from "../../../assets/nocomplains.jpg";

const SeeComplains = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const dispatch = useDispatch();
  const { complainsList, error, response } = useSelector(
    (state) => state.complain
  );
 useEffect(() => {
    console.log("Fetching complains...");
    dispatch(getAllComplains(currentUser._id, "Complain"));
  }, [currentUser._id, dispatch]);

  useEffect(() => {
    console.log("Complains list:", complainsList);
    console.log("Error:", error);
    console.log("Response:", response);
  }, [complainsList, error, response]);

  if (error) {
    console.log("Error fetching complains:", error);
  }
  const complainColumns = [
    { id: "user", label: "User", minWidth: 170 },
    { id: "complaint", label: "Complaint", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 170 },
  ];

  const complainRows =
    complainsList &&
    complainsList.length > 0 &&
    complainsList.map((complain) => {
      const date = new Date(complain.date);
      const dateString =
        date.toString() !== "Invalid Date"
          ? date.toISOString().substring(0, 10)
          : "Invalid Date";
      return {
        user: complain.user.name,
        complaint: complain.complaint,
        date: dateString,
        id: complain._id,
      };
    });

  const ComplainButtonHaver = ({ row }) => {
    return (
      <>
        <Checkbox {...label} />
      </>
    );
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {response ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          {/* Content for response */}
        </div>
      ) : (
        <>
          {Array.isArray(complainsList) && complainsList.length > 0 ? (
            <TableTemplate
              buttonHaver={ComplainButtonHaver}
              columns={complainColumns}
              rows={complainRows}
            />
          ) : (
            <Box sx={{ textAlign: "center", mt: "10px" }}>
              <img
                src={nocomplains}
                alt="No Complains"
                style={{ height: "200px", maxWidth: "100%" }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  mt: "10px",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                <p>No Complains Right Now</p>
              </Box>
            </Box>
          )}
        </>
      )}
    </Paper>
  );
};

export default SeeComplains;
