import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
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
import {
  fetchFavourites,
  deleteFavourites,
} from "../../api/favourites/useFavourites.js";

export default function Myfavourites() {
  const [prevCarts, setPrevCarts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFavourites();
      setPrevCarts(data?.data);
    };

    fetchData();
  }, [prevCarts]);

  return (
    <div className="my-area" style={{ padding: "20px 20px", width: "89vw" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0px 10px",
          justifyContent: "space-between",
        }}
      >
        <h2>
          MY FAVOURITES <br />
          <p style={{ paddingTop: "10px" }}>
            Space to save which you like - can be saved from My Areas
          </p>
        </h2>
        {/* <h2>My Area ( Space to save details for Rent ) : </h2> */}
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          overflowY: "auto",
          maxHeight: "90vh",
          flexWrap: "wrap",
        }}
      >
        {prevCarts && prevCarts.length > 0 ? (
          prevCarts.map((chart, index) => (
            <div key={index} style={{ padding: "10px" }}>
              <Card sx={{ maxWidth: 345, marginBottom: "20px" }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
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
                  image="https://static.vecteezy.com/system/resources/thumbnails/023/308/053/small_2x/ai-generative-exterior-of-modern-luxury-house-with-garden-and-beautiful-sky-photo.jpg"
                  alt="Office image"
                />
                <CardContent>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
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
                    <strong>Student Area:</strong> NEET / JEE
                    <br />
                    <strong>Housing Complex:</strong> Dream Exotica
                    <br />
                    <strong>Rating:</strong> ⭐️⭐️⭐️⭐️⭐️
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
                      <IconButton aria-label="share">
                        <ShareIcon
                          onClick={() => {
                            alert(`Copy link : gyaanagrha-${chart._id}`);
                          }}
                        />
                      </IconButton>
                    </div>
                    <div>
                      <img
                        src={
                          "https://cdn-icons-png.flaticon.com/512/1345/1345874.png"
                        }
                        onClick={() => {
                          deleteFavourites(chart._id);
                        }}
                        style={{
                          width: "25px",
                          height: "25px",
                          marginLeft: "250px",
                        }}
                        alt="icon"
                      />
                    </div>
                  </div>
                </CardActions>
              </Card>
            </div>
          ))
        ) : (
          // If prevCharts is empty
          <div style={{ padding: "10px" }}>
            <Card sx={{ maxWidth: 345, marginBottom: "20px" }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    AB
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
                image="https://static.vecteezy.com/system/resources/thumbnails/023/308/053/small_2x/ai-generative-exterior-of-modern-luxury-house-with-garden-and-beautiful-sky-photo.jpg"
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
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                  </div>
                  <div>
                    <img
                      src={
                        "https://cdn-icons-png.flaticon.com/512/1345/1345874.png"
                      }
                      style={{
                        width: "25px",
                        height: "25px",
                        marginLeft: "250px",
                      }}
                      alt="icon"
                    />
                  </div>
                </div>
              </CardActions>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
