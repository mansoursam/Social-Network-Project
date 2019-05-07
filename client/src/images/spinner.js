import React from "react";
import spinner from "./Spinner-1s-200px.gif";
export default () => {
  return (
    <div className="text-center container">
      <img
        src={spinner}
        alt="Loading"
        style={{
          width: "50px"
        }}
      />
    </div>
  );
};
