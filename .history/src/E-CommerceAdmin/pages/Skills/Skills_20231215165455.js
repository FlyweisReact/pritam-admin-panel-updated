/** @format */

import React, { useEffect } from "react";
import HOC from "../../layout/HOC";

const Skills = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);
  return (
    <div>Skills</div>
  );
};

export default HOC(Skills);
