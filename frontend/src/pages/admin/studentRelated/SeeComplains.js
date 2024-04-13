import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Box, Checkbox } from "@mui/material";
import { getAllComplains } from "../../../redux/complainRelated/complainHandle";
import TableTemplate from "../../../components/TableTemplate";
import nocomplains from "../../../assets/nocomplains.jpg";

const SeeComplains = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const dispatch = useDispatch();
  const { complainsList, loading, error, response } = useSelector(
    (state) => state.complain
  );
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllComplains(currentUser._id, "Complain"));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
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
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {response ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                No Complains Right Now
              </Box>
            </div>
          ) : (
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              {Array.isArray(complainsList) && complainsList.length > 0 && (
                <TableTemplate
                  buttonHaver={ComplainButtonHaver}
                  columns={complainColumns}
                  rows={complainRows}
                />
              )}
              {!loading &&
                !response &&
                complainsList &&
                complainsList.length === 0 && (
                  <Box sx={{ textAlign: "center", mt: "40px" }}>
                    <img
                      src={nocomplains}
                      alt="No Complains"
                      style={{ maxWidth: "100%", maxHeight: "225px" }}
                    />
                    <Box variant="h5" component="div" mt={0.5}>
                      No Complains found
                    </Box>
                  </Box>
                )}
            </Paper>
          )}
        </>
      )}
    </>
  );
};

export default SeeComplains;
