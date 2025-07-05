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
import { useEffect } from "react";

export default function NeighourhoodEngine() {
  const validStates = [
    // 29 States
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Jammu and Kashmir",

    // 8 Union Territories
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
    "Ladakh",
    "Lakshadweep",
  ];

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  // Keep the inputs for the files as JSON:
  const [stateName, setStatename] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [exam, setExam] = useState("");
  const [staticData, setStaticData] = useState(true);
  const [search, setSearch] = useState(true);

  // Valid if the stateName is in the validStates array or NOT by ashminbhaumik.....
  // SOME : Works like is any of the stateName is in the validStates array
  const isValidState = validStates.some(
    (s) => s.toLowerCase() === stateName.toLowerCase() // No Case Sensitive Problem to appear...
  );

  const navigate = useNavigate(); // for navigation....

  // Function to search with form data : When we click on Data Button.....
  const onSearch = async () => {
    console.log(stateName, pincode, district);
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
      if (data.length === 0) {
        alert("No Data Found");
      }
      console.log(data);
      // setResults(data);
    } catch (err) {
      console.error("Error fetching data", err);
    } finally {
      // setLoading(false);
      setSearch(true);
    }
  };

  // Crated for the search button : Enter and Search should Work Properly.....
  const searchProps = () => {
    if (pincode !== "") {
      if (pincode.length !== 6) {
        alert("Please enter a valid PINCODE");
        setSearch(true);
        return;
      }
    }
    if (search) {
      setSearch(false);
      if (stateName !== "" || pincode !== "" || district !== "") {
        if (!isValidState) {
          alert(
            "Please enter a valid State name. Check for Spelling Errors..."
          );
          setSearch(true);
        } else {
          onSearch();
          pushPrompt(stateName);
        }
      } else {
        alert("Please enter at least one field");
      }
    }
  };

  // Function to search with form data : The Loading Bar....
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "89vw",
      }}
    >
      <div className="neighourhood-engine">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0px 10px",
            justifyContent: "space-between",
            height: "6vh",
            overflow: "hidden",
          }}
        >
          <h2>
            NEIGHOURHOOD FIT ENGINE <br />
            <p style={{ paddingTop: "9px" }}>
              Search for your Specific Areas (By Statename, Pincode, District OR
              By Anyone of them OTHER than Exam Preferences)
            </p>
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: "0px",
            padding: "0px 20px",
          }}
        >
          <div
            className="input-section"
            style={{
              display: "flex",
              gap: "20px",
              width: "100%",
              paddingTop: "5px",
              justifyContent: "center",
            }}
          >
            <TextField
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  setStatename(value);
                }
              }}
              value={stateName}
              className="input-field"
              id="outlined-basic"
              label="State Name"
              placeholder="Enter State"
              variant="outlined"
              style={{ width: "100%" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchProps();
                }
              }}
            />
            <TextField
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value) && value.length <= 6) {
                  // only allows digits (0–9) && length <= 6 by the TextBox....
                  setPincode(value);
                }
              }}
              value={pincode}
              className="input-field"
              id="outlined-basic"
              label="Pincode"
              placeholder="Enter PINCODE"
              variant="outlined"
              style={{ width: "100%" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchProps();
                }
              }}
            />

            <TextField
              onChange={(e) => setDistrict(e.target.value)}
              value={district}
              className="input-field"
              id="outlined-textarea"
              label="District Name"
              placeholder="Enter District"
              style={{ width: "100%" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchProps();
                }
              }}
            />
            <TextField
              onChange={(e) => setExam(e.target.value)}
              value={exam}
              className="input-field"
              id="outlined-textarea"
              label="Exam Preparation"
              placeholder="Enter Examination Name"
              style={{ width: "100%" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchProps();
                }
              }}
            />
            <div
              className="button-search"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                onClick={() => {
                  searchProps();
                }}
                style={{
                  color: "blue",
                  width: "100px",
                  height: "45px",
                  border: "2px solid black",
                  borderRadius: "15px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#e0f0ff",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchProps();
                  }
                }}
              >
                SEARCH
              </div>
            </div>
          </div>
        </div>
        {staticData ? (
          <>
            <>
              <div style={{ padding: "0px 10px" }}>
                <h2>Top Rent areas for the Preparations of Exams : </h2>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  paddingTop: "10px",
                }}
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
                          {/* <MoreVertIcon /> */}
                        </IconButton>
                      }
                      title={"Rajasthan Circle"}
                      subheader="September 14, 2016"
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
                        <strong>Average WSM Score :</strong> NA
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
                          {/* <img
                            src={
                              "https://static.thenounproject.com/png/47398-200.png"
                            }
                            style={{
                              width: "40px",
                              height: "40px",
                              marginLeft: "190px",
                            }}
                          /> */}
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
                          {/* <MoreVertIcon /> */}
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
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
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
                        <strong>Average WSM Score :</strong> NA
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
                        <div
                          style={{ display: "flex", paddingLeft: "70px" }}
                        ></div>
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
                          {/* <MoreVertIcon /> */}
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
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
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
                        <strong>Average WSM Score :</strong> NA
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
                          {/* <img
                            src={
                              "https://static.thenounproject.com/png/47398-200.png"
                            }
                            style={{
                              width: "40px",
                              height: "40px",
                              marginLeft: "190px",
                            }}
                          /> */}
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
                          {/* <MoreVertIcon /> */}
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
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
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
                        <strong>Average WSM Score :</strong> NA
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
                          {/* <img
                            src={
                              "https://static.thenounproject.com/png/47398-200.png"
                            }
                            style={{
                              width: "40px",
                              height: "40px",
                              marginLeft: "190px",
                            }}
                          /> */}
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
                          {/* <MoreVertIcon /> */}
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
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
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
                        <strong>Average WSM Score :</strong> NA
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
                          {/* <img
                            src={
                              "https://static.thenounproject.com/png/47398-200.png"
                            }
                            style={{
                              width: "40px",
                              height: "40px",
                              marginLeft: "190px",
                            }}
                          /> */}
                        </div>
                      </div>
                    </CardActions>
                  </Card>
                </div>
              </div>
            </>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              flex: 1,
              overflowY: "auto",
              maxHeight: "78vh",
              width: "92vw",
              padding: "10px 50px",
              marginTop: "20px",
            }}
          >
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
                    Loading ........ <br />
                    Please wait while the data is being processed for the Area
                    you are Searching
                  </h3>
                </div>
              ) : (
                // used Slicing : Since to show less number of results for smooth view....
                <>
                  {results?.slice(0, 100).map((item, index) => (
                    <Card
                      sx={{ maxWidth: 345, marginBottom: "20px" }}
                      key={index}
                    >
                      <CardHeader
                        avatar={
                          <Avatar
                            sx={{ bgcolor: red[500] }}
                            aria-label="recipe"
                          >
                            {"AB"}
                          </Avatar>
                        }
                        action={
                          <IconButton aria-label="settings">
                            {/* <MoreVertIcon /> */}
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
                          <strong>Average WSM Score:</strong> 89%
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
          </div>
        )}
      </div>
    </div>
  );
}
