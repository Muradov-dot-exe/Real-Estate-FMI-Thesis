import { Button } from "@mui/material";
import React from "react";
// import { withRouter } from "react-router";

const ButtonLink = (props: any) => {
  const handleClick = (e: any) => props.history.push(props.route);

  return (
    <Button onClick={handleClick} role="link">
      {props.children}
    </Button>
  );
};

// export default withRouter(ButtonLink);
