import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Content({ submissions }) {
  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant="h4">Liked Form Submissions</Typography>
      {submissions.length > 0 ? (
        submissions.map((submission) => (
          <Typography key={submission.id} variant="body1" sx={{ marginTop: 1 }}>
            Name: {submission.data.firstName} {submission.data.lastName}, Email:{" "}
            {submission.data.email}
          </Typography>
        ))
      ) : (
        <Typography variant="body1" sx={{ fontStyle: "italic", marginTop: 1 }}>
          No submissions yet.
        </Typography>
      )}
    </Box>
  );
}
