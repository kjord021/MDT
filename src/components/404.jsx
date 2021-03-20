import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      <h1 style={{ paddingTop: "70px" }}>404</h1>
      <h2>OOPS! You found a page that doesn't exist.</h2>
      <Link
        to={{
          pathname: "/",
        }}
        style={{ textDecoration: "inherit", color: "darkblue" }}
      >
        <h4 style={{ paddingTop: "20px" }}>Go back to Home</h4>
      </Link>
    </div>
  );
}

export default ErrorPage;
