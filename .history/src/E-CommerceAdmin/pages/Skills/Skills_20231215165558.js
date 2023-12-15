/** @format */

import React, { useEffect } from "react";
import HOC from "../../layout/HOC";
import {
    Table,
    Modal,
    Form,
    Button,
    Alert,
    FloatingLabel,
    Spinner,
  } from "react-bootstrap";
  import axios from "axios";
  import { Store } from "react-notifications-component";

const Skills = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);
  return (
    <section className="sectionCont">

    </section>
  );
};

export default HOC(Skills);
