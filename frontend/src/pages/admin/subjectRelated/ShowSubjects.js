import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSubjectList } from "../../../redux/sclassRelated/sclassHandle";
import { deleteUser } from "../../../redux/userRelated/userHandle";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { Paper, Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TableTemplate from "../../../components/TableTemplate";
import {
  BlueButton,
  GreenButton,
  ButtonContainer,
} from "../../../components/buttonStyles";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import nodata from "../../../assets/nodata.png";

const ShowSubjects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subjectsList, loading, error, response } = useSelector(
    (state) => state.sclass
  );
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getSubjectList(currentUser._id, "AllSubjects"));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = (deleteID, address) => {
    console.log(deleteID);
    console.log(address);
    setMessage("Sorry the delete function has been disabled for now.");
    setShowPopup(true);

    // dispatch(deleteUser(deleteID, address))
    //     .then(() => {
    //         dispatch(getSubjectList(currentUser._id, "AllSubjects"));
    //     })
  };

  const subjectColumns = [
    { id: "subName", label: "Sub Name", minWidth: 170 },
    { id: "sessions", label: "Sessions", minWidth: 170 },
    { id: "sclassName", label: "Class", minWidth: 170 },
  ];

  const subjectRows = subjectsList.map((subject) => {
    return {
      subName: subject.subName,
      sessions: subject.sessions,
      sclassName: subject.sclassName.sclassName,
      sclassID: subject.sclassName._id,
      id: subject._id,
    };
  });

  const SubjectsButtonHaver = ({ row }) => {
    return (
      <>
        <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
          <DeleteIcon color="error" />
        </IconButton>
        <BlueButton
          variant="contained"
          onClick={() =>
            navigate(`/Admin/subjects/subject/${row.sclassID}/${row.id}`)
          }
        >
          View
        </BlueButton>
      </>
    );
  };

  const actions = [
    {
      icon: <PostAddIcon color="primary" />,
      name: "Add New Subject",
      action: () => navigate("/Admin/subjects/chooseclass"),
    },
    {
      icon: <DeleteIcon color="error" />,
      name: "Delete All Subjects",
      action: () => deleteHandler(currentUser._id, "Subjects"),
    },
  ];

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {response ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "16px",
              }}
            >
              <ButtonContainer>
                <GreenButton
                  variant="contained"
                  onClick={() => navigate("/Admin/subjects/chooseclass")}
                >
                  Add Subjects
                </GreenButton>
              </ButtonContainer>
            </Box>
          ) : (
            <>
              {Array.isArray(subjectsList) && subjectsList.length > 0 ? (
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                  <TableTemplate
                    buttonHaver={SubjectsButtonHaver}
                    columns={subjectColumns}
                    rows={subjectRows}
                  />
                  <SpeedDialTemplate actions={actions} />
                </Paper>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "300px",
                    marginBottom: "16px",
                  }}
                >
                  <img
                    src={nodata}
                    alt="No Data"
                    style={{ maxWidth: "100%", maxHeight: "225px" }}
                  />
                  <Typography variant="h5" sx={{ marginTop: "16px" }}>
                    No subjects found
                  </Typography>
                  <ButtonContainer sx={{ marginTop: "16px" }}>
                    <GreenButton
                      variant="contained"
                      onClick={() => navigate("/Admin/addclass")}
                    >
                      Add Subjects
                    </GreenButton>
                  </ButtonContainer>
                </Box>
              )}
            </>
          )}
        </>
      )}
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default ShowSubjects;
