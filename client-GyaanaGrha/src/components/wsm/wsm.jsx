import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { fetchFavourites } from "../../api/favourites/useFavourites.js";
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

export default function wsm() {
  // useState Cases : for the State of the WSM
  const [coaching, setCoaching] = useState("");
  const [libraries, setLibraries] = useState("");
  const [rent, setRent] = useState("");
  const [area, setArea] = useState("");
  const [exam, setExam] = useState("");
  const [check, setCheck] = useState(false);
  const [val, setVal] = useState(98);
  // useState Cases : Store the Favourites (from where the data is fetched)
  const [prevCarts, setPrevCarts] = useState([]);
  // useEffect Cases : When the Data Changes it should be updated....
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFavourites();
      setPrevCarts(data?.data);
    };

    fetchData();
  }, [prevCarts]);

  const onSubmit = () => {
    if (
      coaching !== "" &&
      libraries !== "" &&
      rent !== "" &&
      area !== "" &&
      exam !== ""
    ) {
      setCheck(true);
      //   To Check for the Working Condition of the Values in the Console.....
      //   console.log(
      //     `Coaching: ${coaching}, Libraries: ${libraries}, Rent: ${rent}, Area: ${area}, Exam: ${exam}`
      //   );
    } else {
      alert(
        "Please enter all the fields for preference... (If not have any preference enter '0')"
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "89vw",
        padding: "20px 20px",
        height: "100vh",
        overflow: "scroll",
      }}
    >
      {/* Heading of the Weight Score Model : WSM */}
      <h2 className="text">
        Rate your Preference from 0 to 9 : Based on the Preference the WSM will
        provide you the best results (80% and Above is Best):{" "}
      </h2>
      <div
        className="search-area"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
          {/* Checks are been set for Data inconsistancies by ashminbhaumik */}
          {/* Some for Numbers and some for Strings */}
          <TextField
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d?$/.test(value)) {
                setCoaching(value);
              }
            }}
            value={coaching}
            className="input-field"
            id="outlined-basic"
            label="Coaching"
            placeholder="Enter Preference"
            variant="outlined"
            style={{ width: "100%" }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSubmit();
              }
            }}
          />
          <TextField
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d?$/.test(value)) {
                setLibraries(value);
              }
            }}
            value={libraries}
            className="input-field"
            id="outlined-basic"
            label="Libraries"
            placeholder="Enter Preference"
            variant="outlined"
            style={{ width: "100%" }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSubmit();
              }
            }}
          />
          <TextField
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d?$/.test(value)) {
                setRent(value);
              }
            }}
            value={rent}
            className="input-field"
            id="outlined-textarea"
            label="Rent"
            placeholder="Enter Preference"
            multiline
            style={{ width: "100%" }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSubmit();
              }
            }}
          />
          <TextField
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d?$/.test(value)) {
                setArea(value);
              }
            }}
            value={area}
            className="input-field"
            id="outlined-textarea"
            label="Area"
            placeholder="Enter Preference"
            multiline
            style={{ width: "100%" }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSubmit();
              }
            }}
          />
          {/* Checks : For Strings... */}
          <TextField
            onChange={(e) => {
              const input = e.target.value;
              const onlyText = input.replace(/[0-9]/g, "");
              setExam(onlyText);
            }}
            value={exam}
            className="input-field"
            id="outlined-textarea"
            label="Exam Name"
            placeholder="Enter Exam name in TEXT"
            style={{ width: "100%" }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSubmit();
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
                onSubmit();
              }}
              // Styling for the Calculate Button made by ashminbhaumik using <div/> tag....
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
            >
              Calculate
            </div>
          </div>
        </div>
      </div>
      <h2 className="description">
        Cards with Values of WEIGHT SCORING MODEL Score OR WSM Score :{" "}
      </h2>
      {/* Styling for Cards made for the Scrolling of Cards without overflow */}
      <div
        style={{
          display: "flex",
          flex: 1,
          overflowY: "auto",
          maxHeight: "89vh",
          paddingLeft: "0px",
          paddingRight: "10px",
          marginTop: "10px",
          justifyContent: "center",
        }}
      >
        {/* Check : For the Data, to know the Button of Calculate has been Clicked... */}
        {check ? (
          <div
            className="card-area"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            {check
              ? prevCarts.map((chart, index) => (
                  <div key={index} style={{ padding: "10px" }}>
                    <Card sx={{ maxWidth: 345, marginBottom: "20px" }}>
                      <CardHeader
                        avatar={
                          <Avatar
                            sx={{ bgcolor: red[500] }}
                            aria-label="recipe"
                          >
                            {chart.statename?.[0] || "A"}
                          </Avatar>
                        }
                        action={<IconButton aria-label="settings"></IconButton>}
                        title={`${chart.officename || "Unknown Office"}`}
                        subheader={chart.pincode}
                      />
                      <CardMedia
                        component="img"
                        height="194"
                        image="https://static.vecteezy.com/system/resources/thumbnails/023/309/773/small_2x/ai-generative-exterior-of-modern-luxury-house-with-garden-and-beautiful-sky-photo.jpg"
                        alt="Office image"
                      />
                      <CardContent>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          <strong>Region Name:</strong> {chart.regionname}
                          <br />
                          <strong>Division Name:</strong> {chart.divisionname}
                          <br />
                          <strong>Office Name:</strong> {chart.officename}
                          <br />
                          <strong>Pincode:</strong> {chart.pincode}
                          <br />
                          <strong>Office Type:</strong> {chart.officetype}
                          <br />
                          <strong>District:</strong> {chart.district}
                          <br />
                          <strong>State Name:</strong> {chart.statename}
                          <br />
                          <strong>Housing Complex:</strong> Dream Exotica
                          <br />
                          <strong>WSM Score : </strong> {val - (index * index) + 1}%
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
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              <img
                                src={
                                  "https://www.shutterstock.com/image-vector/book-now-icon-internet-button-600nw-265421198.jpg"
                                }
                                alt=""
                                style={{ width: "50px", height: "50px" }}
                                onClick={() => {
                                  alert(
                                    "🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳\n\nYou have Completed Booking for your Stay"
                                  );
                                }}
                              ></img>
                            </div>
                            <div style={{ paddingLeft: "230px" }}>
                              <IconButton aria-label="share">
                                <ShareIcon
                                  onClick={() => {
                                    alert(
                                      "Copy link : gyaanagrha-ashminbhaumik"
                                    );
                                  }}
                                />
                              </IconButton>
                            </div>
                          </div>
                        </div>
                      </CardActions>
                    </Card>
                  </div>
                ))
              : null}
          </div>
        ) : (
          <div>
            <h1
              className="description"
              style={{
                display: "flex",
                padding: "20px 20px",
                justifyContent: "center",
                alignItems: "center",
                color: "red",
              }}
            >
              <br />
              <br />
              <br />
              <br />
              <br />
              Please Enter the Preferences and Click on Calculate ..........
              <br />
              You will get all the Results of the Card saved in Your Favourites
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
