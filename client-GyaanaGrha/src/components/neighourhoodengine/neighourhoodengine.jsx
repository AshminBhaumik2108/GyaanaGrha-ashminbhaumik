// neighourhoodengine.jsx
import React, { useContext, useState } from "react";
import "./neighourhoodengine.css";
import { TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button } from "@mui/material";
import { fetchNeighborhoodData } from "../../api/neighourEngine/neighourhoodEngine.js";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { pushPrompt } from "../../api/prompt/fetchPrompt.js";
import { useNavigate } from "react-router-dom";
import { pushCarts } from "../../api/cart/useCart.js";

export default function NeighourhoodEngine() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  // Keep the inputs for the files as JSON:
  const [stateName, setStatename] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [exam, setExam] = useState("");
  const [staticData, setStaticData] = useState(true);

  const navigate = useNavigate(); // for navigation....

  // Function to search with form data
  const onSearch = async () => {
    const payload = {
      statename: stateName,
      pincode: pincode,
      district: district,
    };
    try {
      // setStaticdata:
      setStaticData(false);
      setLoading(true); // for the loader...
      console.log(payload);
      console.log("Fetching Data...");
      const data = await fetchNeighborhoodData(payload);
      setResults(data);
      setLoading(false); // for the loader...
      console.log(data);
      // setResults(data);
    } catch (err) {
      console.error("Error fetching data", err);
    } finally {
      // setLoading(false);
    }
  };

  ({ theme }) => ({
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
    variants: [
      {
        props: ({ expand }) => !expand,
        style: {
          transform: "rotate(0deg)",
        },
      },
      {
        props: ({ expand }) => !!expand,
        style: {
          transform: "rotate(180deg)",
        },
      },
    ],
  });

  return (
    <div className="neighourhood-engine">
      {/* <div className="nav">
        <p className="nav-title">Neighborhood Fit Engine</p>
        <img alt="" />
      </div> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0px 10px",
          justifyContent: "space-between",
        }}
      >
        <h2>
          Search for your Specific Areas (By Statename, Pincode, District OR By
          Anyone of them : If value returns Empty Check for Spelling Mistakes) :{" "}
        </h2>
        <div
          className="cart-container"
          style={{
            cursor: "pointer",
            border: "2px solid black",
            padding: "15px 30px",
            fontWeight: "bold",
            borderRadius: "20px",
          }}
          onClick={() => navigate("/my-area")}
        >
          My Areas
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          className="input-section"
          style={{
            display: "flex",
            gap: "20px",
            width: "60%",
            paddingTop: "5px",
          }}
        >
          <TextField
            onChange={(e) => setStatename(e.target.value)}
            value={stateName}
            className="input-field"
            id="outlined-basic"
            label="State Name"
            placeholder="Enter State"
            variant="outlined"
            style={{ width: "100%" }}
          />
          <TextField
            onChange={(e) => setPincode(e.target.value)}
            value={pincode}
            className="input-field"
            id="outlined-basic"
            label="Pincode"
            placeholder="Enter PINCODE"
            variant="outlined"
            style={{ width: "100%" }}
          />
          <TextField
            onChange={(e) => setDistrict(e.target.value)}
            value={district}
            className="input-field"
            id="outlined-textarea"
            label="District Name"
            placeholder="Enter District"
            multiline
            style={{ width: "100%" }}
          />
          <TextField
            onChange={(e) => setExam(e.target.value)}
            value={exam}
            className="input-field"
            id="outlined-textarea"
            label="Exam Preparation"
            placeholder="Enter Examination Name"
            multiline
            style={{ width: "100%" }}
          />
        </div>
        <div className="button-search">
          <Button
            onClick={() => {
              if (stateName !== "" || pincode !== "" || district !== "") {
                onSearch();
                pushPrompt(stateName);
              } else {
                alert("Please enter at least one field");
              }
            }}
            variant="outlined"
            style={{
              color: "white",
              width: "100px",
              borderColor: "black",
              padding: "10px",
              paddingBottom: "15px",
              borderRadius: "20px",
              fontWeight: "bold",
              background: "#4b90ff",
            }}
          >
            SEARCH
          </Button>{" "}
        </div>
      </div>
      {staticData ? (
        <>
          <div style={{ padding: "0px 10px" }}>
            <h2>Top Rent areas for the Preparations of Exams : </h2>
          </div>
          <div
            style={{ display: "flex", flexWrap: "wrap", paddingTop: "10px" }}
          >
            <div style={{ padding: "10px" }}>
              <Card sx={{ maxWidth: 345, marginBottom: "20px" }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {"AB"}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={"Mumbai Circle"}
                  subheader="September 14, 2016"
                />
                <CardMedia
                  component="img"
                  height="194"
                  image="https://i.ytimg.com/vi/_L6jEtMK8No/maxresdefault.jpg"
                  alt="Office image"
                />
                <CardContent>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <strong>Region Name:</strong>
                    <br />
                    <strong>Division Name:</strong>
                    <br />
                    <strong>Office Name:</strong>
                    <br />
                    <strong>Pincode:</strong>
                    <br />
                    <strong>Office Type:</strong>
                    <br />
                    <strong>District:</strong>
                    <br />
                    <strong>State Name:</strong>
                    <br />
                    <strong>Student Area:</strong> NEET / JEE
                    <br />
                    <strong>Housing Complex:</strong> Dream Exotica
                    <br />
                    <strong>Rating:</strong> ⭐️⭐️⭐️⭐️⭐️
                    <br />
                    <strong>WSM Score (Higher is Better) :</strong> NA
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingLeft: "10px",
                    }}
                  >
                    <div>
                      <IconButton aria-label="add to favorites">
                        {/* <FavoriteIcon /> */}
                      </IconButton>
                      <IconButton aria-label="share">
                        {/* <ShareIcon /> */}
                      </IconButton>
                    </div>
                    <div style={{ display: "flex", paddingLeft: "70px" }}>
                      <img
                        src={
                          "https://static.thenounproject.com/png/47398-200.png"
                        }
                        style={{
                          width: "40px",
                          height: "40px",
                          marginLeft: "190px",
                        }}
                      />
                    </div>
                  </div>
                </CardActions>
              </Card>
            </div>
            <div style={{ padding: "10px" }}>
              <Card sx={{ maxWidth: 345, marginBottom: "20px" }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {"AB"}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={"Mumbai Circle"}
                  subheader="September 14, 2016"
                />
                <CardMedia
                  component="img"
                  height="194"
                  image="https://i.ytimg.com/vi/_L6jEtMK8No/maxresdefault.jpg"
                  alt="Office image"
                />
                <CardContent>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <strong>Region Name:</strong>
                    <br />
                    <strong>Division Name:</strong>
                    <br />
                    <strong>Office Name:</strong>
                    <br />
                    <strong>Pincode:</strong>
                    <br />
                    <strong>Office Type:</strong>
                    <br />
                    <strong>District:</strong>
                    <br />
                    <strong>State Name:</strong>
                    <br />
                    <strong>Student Area:</strong> NEET / JEE
                    <br />
                    <strong>Housing Complex:</strong> Dream Exotica
                    <br />
                    <strong>Rating:</strong> ⭐️⭐️⭐️⭐️⭐️
                    <br />
                    <strong>WSM Score (Higher is Better) :</strong> NA
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingLeft: "10px",
                    }}
                  >
                    <div>
                      <IconButton aria-label="add to favorites">
                        {/* <FavoriteIcon /> */}
                      </IconButton>
                      <IconButton aria-label="share">
                        {/* <ShareIcon /> */}
                      </IconButton>
                    </div>
                    <div style={{ display: "flex", paddingLeft: "70px" }}>
                      <img
                        src={
                          "https://static.thenounproject.com/png/47398-200.png"
                        }
                        style={{
                          width: "40px",
                          height: "40px",
                          marginLeft: "190px",
                        }}
                      />
                    </div>
                  </div>
                </CardActions>
              </Card>
            </div>
            <div style={{ padding: "10px" }}>
              <Card sx={{ maxWidth: 345, marginBottom: "20px" }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {"AB"}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={"Chennai Circle"}
                  subheader="September 14, 2016"
                />
                <CardMedia
                  component="img"
                  height="194"
                  image="https://i.ytimg.com/vi/_L6jEtMK8No/maxresdefault.jpg"
                  alt="Office image"
                />
                <CardContent>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <strong>Region Name:</strong>
                    <br />
                    <strong>Division Name:</strong>
                    <br />
                    <strong>Office Name:</strong>
                    <br />
                    <strong>Pincode:</strong>
                    <br />
                    <strong>Office Type:</strong>
                    <br />
                    <strong>District:</strong>
                    <br />
                    <strong>State Name:</strong>
                    <br />
                    <strong>Student Area:</strong> NEET / JEE
                    <br />
                    <strong>Housing Complex:</strong> Dream Exotica
                    <br />
                    <strong>Rating:</strong> ⭐️⭐️⭐️⭐️⭐️
                    <br />
                    <strong>WSM Score (Higher is Better) :</strong> NA
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingLeft: "10px",
                    }}
                  >
                    <div>
                      <IconButton aria-label="add to favorites">
                        {/* <FavoriteIcon /> */}
                      </IconButton>
                      <IconButton aria-label="share">
                        {/* <ShareIcon /> */}
                      </IconButton>
                    </div>
                    <div style={{ display: "flex", paddingLeft: "70px" }}>
                      <img
                        src={
                          "https://static.thenounproject.com/png/47398-200.png"
                        }
                        style={{
                          width: "40px",
                          height: "40px",
                          marginLeft: "190px",
                        }}
                      />
                    </div>
                  </div>
                </CardActions>
              </Card>
            </div>
            <div style={{ padding: "10px" }}>
              <Card sx={{ maxWidth: 345, marginBottom: "20px" }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {"AB"}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={"West Bengal Circle"}
                  subheader="September 14, 2016"
                />
                <CardMedia
                  component="img"
                  height="194"
                  image="https://i.ytimg.com/vi/_L6jEtMK8No/maxresdefault.jpg"
                  alt="Office image"
                />
                <CardContent>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <strong>Region Name:</strong>
                    <br />
                    <strong>Division Name:</strong>
                    <br />
                    <strong>Office Name:</strong>
                    <br />
                    <strong>Pincode:</strong>
                    <br />
                    <strong>Office Type:</strong>
                    <br />
                    <strong>District:</strong>
                    <br />
                    <strong>State Name:</strong>
                    <br />
                    <strong>Student Area:</strong> NEET / JEE
                    <br />
                    <strong>Housing Complex:</strong> Dream Exotica
                    <br />
                    <strong>Rating:</strong> ⭐️⭐️⭐️⭐️⭐️
                    <br />
                    <strong>WSM Score (Higher is Better) :</strong> NA
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingLeft: "10px",
                    }}
                  >
                    <div>
                      <IconButton aria-label="add to favorites">
                        {/* <FavoriteIcon /> */}
                      </IconButton>
                      <IconButton aria-label="share">
                        {/* <ShareIcon /> */}
                      </IconButton>
                    </div>
                    <div style={{ display: "flex", paddingLeft: "70px" }}>
                      <img
                        src={
                          "https://static.thenounproject.com/png/47398-200.png"
                        }
                        style={{
                          width: "40px",
                          height: "40px",
                          marginLeft: "190px",
                        }}
                      />
                    </div>
                  </div>
                </CardActions>
              </Card>
            </div>
            <div style={{ padding: "10px" }}>
              <Card sx={{ maxWidth: 345, marginBottom: "20px" }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {"AB"}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={"Punjab Circle"}
                  subheader="September 14, 2016"
                />
                <CardMedia
                  component="img"
                  height="194"
                  image="https://i.ytimg.com/vi/_L6jEtMK8No/maxresdefault.jpg"
                  alt="Office image"
                />
                <CardContent>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <strong>Region Name:</strong>
                    <br />
                    <strong>Division Name:</strong>
                    <br />
                    <strong>Office Name:</strong>
                    <br />
                    <strong>Pincode:</strong>
                    <br />
                    <strong>Office Type:</strong>
                    <br />
                    <strong>District:</strong>
                    <br />
                    <strong>State Name:</strong>
                    <br />
                    <strong>Student Area:</strong> NEET / JEE
                    <br />
                    <strong>Housing Complex:</strong> Dream Exotica
                    <br />
                    <strong>Rating:</strong> ⭐️⭐️⭐️⭐️⭐️
                    <br />
                    <strong>WSM Score (Higher is Better) :</strong> NA
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingLeft: "10px",
                    }}
                  >
                    <div>
                      <IconButton aria-label="add to favorites">
                        {/* <FavoriteIcon /> */}
                      </IconButton>
                      <IconButton aria-label="share">
                        {/* <ShareIcon /> */}
                      </IconButton>
                    </div>
                    <div style={{ display: "flex", paddingLeft: "70px" }}>
                      <img
                        src={
                          "https://static.thenounproject.com/png/47398-200.png"
                        }
                        style={{
                          width: "40px",
                          height: "40px",
                          marginLeft: "190px",
                        }}
                      />
                    </div>
                  </div>
                </CardActions>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <div className="card">
          {loading ? (
            <div
              style={{
                paddingTop: "100px",
                paddingLeft: "550px",
                paddingRight: "700px",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  paddingBottom: "30px",
                }}
              >
                <CircularProgress />
              </Box>
              <h3>
                Loading........ Please wait while the data is being processed
                for the Area you are serching for ...
              </h3>
            </div>
          ) : (
            // used Slicing : Since to show less number of results for smooth view....
            <>
              {results?.slice(0, 10).map((item, index) => (
                <Card sx={{ maxWidth: 345, marginBottom: "20px" }} key={index}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {"AB"}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={`${item.officename || "Unknown Office"}`}
                    subheader={item.pincode}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image="https://i.ytimg.com/vi/_L6jEtMK8No/maxresdefault.jpg"
                    alt="Office image"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      <strong>Region Name:</strong> {item.regionname}
                      <br />
                      <strong>Division Name:</strong> {item.divisionname}
                      <br />
                      <strong>Office Name:</strong> {item.officename}
                      <br />
                      <strong>Pincode:</strong> {item.pincode}
                      <br />
                      <strong>Office Type:</strong> {item.officetype}
                      <br />
                      <strong>District:</strong> {item.district}
                      <br />
                      <strong>State Name:</strong> {item.statename}
                      <br />
                      <strong>Student Area:</strong> NEET / JEE
                      <br />
                      <strong>Housing Complex:</strong> Dream Exotica
                      <br />
                      <strong>Rating:</strong> ⭐️⭐️⭐️⭐️⭐️
                      <br />
                    <strong>WSM Score (Higher is Better) :</strong> 89%
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingLeft: "10px",
                      }}
                    >
                      <div>
                        <IconButton aria-label="add to favorites">
                          {/* <FavoriteIcon
                            onClick={() => {
                              alert(
                                "Add House to areas first (Put Favourite from My Areas -> Top Right)"
                              );
                            }}
                          /> */}
                        </IconButton>
                        <IconButton aria-label="share">
                          {/* <ShareIcon /> */}
                        </IconButton>
                      </div>
                      <div style={{ display: "flex", paddingLeft: "70px" }}>
                        <img
                          src={
                            "https://static.thenounproject.com/png/47398-200.png"
                          }
                          onClick={() => {
                            const payload = {
                              circlename: item.circlename,
                              regionname: item.regionname,
                              divisionname: item.divisionname,
                              officename: item.officename,
                              pincode: item.pincode,
                              officetype: item.officetype,
                              delivery: item.delivery,
                              district: item.district,
                              statename: item.statename,
                              latitude: item.latitude,
                              longitude: item.longitude,
                            };
                            alert("House has been added to areas"); // for the view of getting whether the cart image is working or not...
                            pushCarts(payload);
                          }}
                          style={{
                            width: "40px",
                            height: "40px",
                            marginLeft: "190px",
                          }}
                        />
                      </div>
                    </div>
                  </CardActions>
                </Card>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
