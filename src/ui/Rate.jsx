import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default function Rate() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ "& > legend": { mt: 2 } }}>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    </Box>
  );
}
