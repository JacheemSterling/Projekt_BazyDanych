import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function SimpleRating({ drink }) {
  const [grades, setGrades] = React.useState(drink.grades);
  const [newRating, setNewRating] = React.useState(
    grades.length > 0 ? grades.reduce((acc, x) => acc + x) / grades.length : 0
  );

  React.useEffect(() => {
    setNewRating(
      grades.length > 0 ? grades.reduce((acc, x) => acc + x) / grades.length : 0
    );
  }, [grades]);

  return (
    <div className="rating">
      <Box
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        <Rating
          className="ratingStars"
          name="simple-controlled"
          value={newRating}
          precision={1}
          onChange={(e) => {
            setGrades(
              grades.length > 0
                ? [...grades, Number(e.target.value)]
                : [Number(e.target.value)]
            );
          }}
        />
        <Typography className="ocena">
          {" "}
          <b>Ocena: </b>
          {Math.round(newRating * 10) / 10}
        </Typography>
        <br />
      </Box>
    </div>
  );
}
