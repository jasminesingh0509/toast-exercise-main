import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Content({ submissions }) {
  const likedSubmissions = submissions.filter(
    (submission) => submission.data.liked
  );

  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant="h4">Liked Form Submissions</Typography>
      {likedSubmissions.length > 0 ? (
        likedSubmissions.map((submission, index) => (
          <Typography
            key={submission.id}
            variant="body1"
            sx={{
              marginTop: 1,
              backgroundColor: index % 2 === 0 ? "grey.200" : "grey.50",
              padding: 1,
              borderRadius: 1
            }}
          >
            Name: {submission.data.firstName} {submission.data.lastName}, Email:{" "}
            {submission.data.email}
          </Typography>
        ))
      ) : (
        <Typography variant="body1" sx={{ fontStyle: "italic", marginTop: 1 }}>
          No liked submissions yet.
        </Typography>
      )}
    </Box>
  );
}
