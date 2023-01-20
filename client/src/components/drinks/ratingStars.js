import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function SimpleRating({ drink }) {
  const [avg, setAvg] = React.useState(0);
  const [loaded, finishLoading] = React.useState(false);

  React.useEffect(() => {
    fetch(`http://localhost:5000/drinks/${drink._id}/avg`)
      .then((res) => res.json())
      .then((data) => {
        setAvg(data[0].avg);
        finishLoading(true);
      });
  });

  return (
    <div className="rating">
      <Box
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        {loaded ? (
          <div>
            <Rating
              className="ratingStars"
              name="simple-controlled"
              value={avg}
              precision={1}
              onChange={(e) => {
                fetch(`http://localhost:5000/drinks/addgrade/${drink._id}`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    grade: parseInt(e.target.value),
                  }),
                });
              }}
            />
            <Typography className="ocena">
              {" "}
              <b>&nbsp;&nbsp; Ocena: </b>
              {Math.round(avg * 10) / 10}
            </Typography>
          </div>
        ) : null}
        <br />
      </Box>
    </div>
  );
}
