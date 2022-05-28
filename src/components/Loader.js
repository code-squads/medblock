import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { Container } from "react-bootstrap";

const Loader = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">

      <div>
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>
      <div className="mt-1">Hold on while we fetch records...</div>

    </Container>
  );
};

export default Loader;
