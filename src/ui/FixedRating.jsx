import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default function FixedRating() {
  return (
    <Box sx={{ m: 4 }}>
      <Rating name="read-only" value={3} readOnly />
    </Box>
  );
}
