import * as React from "react";

const spinner = require("./ajax-loader (1).gif");

const Spin = () => {
  return (
    <div
      id="spinnerDiv"
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <img src={spinner} />
    </div>
  );
};

export default Spin;
