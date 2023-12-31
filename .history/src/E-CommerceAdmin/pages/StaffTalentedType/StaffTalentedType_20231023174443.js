/** @format */

import React, { useEffect, useState } from "react";
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

const StaffTalentedType = () => {
  const [modalShow, setModalShow] = useState(false);
  const [descModal, setDescModal] = useState(false);
  const [desc, setDesc] = useState([]);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [fullViewData, setfullViewData] = useState({});
  const [hideFulldata, setShowFullData] = useState(false);
  const [viewDescription, setViewDescription] = useState("");
  const [descShowModalForConsultancy, setdescShowModalForConsultancy] =
    useState(false);
  const token = localStorage.getItem("AdminToken");

  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const Baseurl = "https://pritam-backend.vercel.app/";

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${Baseurl}api/v1/admin/getstaffTalentedType`
      );
      setData(data.data);
      setTotal(data.data.length);
    } catch (e) {
      console.log(e);
    }
  };
  function getVideoIdFromUrl(url) {
    const regExp = /v=([a-zA-Z0-9_-]+)/;
    const match = url.match(regExp);

    if (match && match[1]) {
      return match[1];
    }

    return null;
  }

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Baseurl}api/v1/admin/DeletestaffTalentedType/${id}`,
        Auth
      );
      const msg = data.message;
      Store.addNotification({
        title: "",
        message: msg,
        type: "success",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true,
        },
      });
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [submitLoading, setSubmitLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [title, setTitle] = useState(editData?.title);
    const [mainImage, setMainImage] = useState("");
    const [desc, setDesc] = useState(editData?.desc);
    const [youtubeLink, setyoutubelink] = useState(editData?.youtubeLink);
    const [contactUsformTitle, setcontactUsformTitle] = useState(
      editData.contactUsformTitle
    );
    const [contactUsformDesc, setcontactUsformDesc] = useState(
      editData?.contactUsformDesc
    );
    const [contactUsformAvailibility, setcontactUsformAvailibility] = useState(
      editData?.contactUsformAvailibility
    );
    const [contactUsformPrivacy, setcontactUsformPrivacy] = useState(
      editData?.contactUsformPrivacy
    );
    const [eTitle, seteTitle] = useState(editData?.eTitle);
    const [eDesc, seteDesc] = useState(editData?.eDesc);
    const [eformWhatApp, seteformWhatApp] = useState(editData?.eformWhatApp);
    const [eformCall, seteformCall] = useState(editData?.eformCall);
    const [eformPrivacy, seteformPrivacy] = useState(editData?.eformPrivacy);
    const [eformImage, setFormImage] = useState("");
    const [descriptionTitleFirst, setDescriptionTitleFirst] = useState(editData?.description?.[0]?.title);
    const [descriptionTitleSecond, setDescriptionTitleSecond] = useState(editData?.description?.[1]?.title);
    const [descriptionTitlethird, setDescriptionTitlethird] = useState(editData?.description?.[2]?.title);
    const [descriptionDescFirst, setDescriptionDescFirst] = useState(editData?.description?.[0]?.desc);
    const [descriptionDescSecond, setDescriptionDescSecond] = useState(editData?.description?.[1]?.desc);
    const [descriptionDescthird, setDescriptionDescthird] = useState(editData?.description?.[2]?.desc);



    const payload = {
      title,
      
      desc,
      image: mainImage,
      contactUsformTitle,
      contactUsformDesc,
      contactUsformAvailibility,
      contactUsformPrivacy,
      youtubeLink,
      eTitle,
      eDesc,
      eformWhatApp,
      eformCall,
      eformPrivacy,
      eformImage,
      "descriptionTitle[0]": descriptionTitleFirst,
      "descriptionDesc[0]": descriptionDescFirst,
      "descriptionTitle[1]": descriptionTitleFirst,
      "descriptionDesc[1]": descriptionDescSecond,
      "descriptionTitle[2]": descriptionTitlethird,
      "descriptionDesc[2]": descriptionDescthird,
    };

    const ClodinaryPost = (value, type) => {
      setImageLoading(true);
      const data = new FormData();
      data.append("file", value);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "dbcnha741");
      fetch("https://api.cloudinary.com/v1_1/dbcnha741/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          if (type === "mainImage") {
            setMainImage(data.url);
            console.log("main", data.url);
            setUploaded(true);
            setImageLoading(false);
          } else if (type === "eformImage") {
            setFormImage(data.url);
            console.log("imageUrl", data.url);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const postHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      try {
        const formdataforPost = new FormData();
        for (let key in payload) {
          formdataforPost.append(key, payload[key]);
        }

        const data = await axios.post(
          `${Baseurl}api/v1/admin/addStaffTalentedType`,
          formdataforPost,
          Auth
        );
        const msg = data.data.message;
        Store.addNotification({
          title: "",
          message: msg,
          type: "success",
          insert: "bottom",
          container: "bottom-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true,
          },
        });
        fetchData();
        props.onHide();
        setSubmitLoading(false);
      } catch (e) {
        const msg = e.response.data.message;
        console.log("checkErrorMsg", msg);
        Store.addNotification({
          title: "",
          message: msg,
          type: "danger",
          insert: "bottom",
          container: "bottom-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true,
          },
        });
        setSubmitLoading(false);
      }
    };

    const edithandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      try {
        const fromData = new FormData();
        if (title) {
          fromData.append("title", title);
        }
        if (desc) {
          fromData.append("desc", desc);
        }
        if (contactUsformTitle) {
          fromData.append("contactUsformTitle", contactUsformTitle);
        }
        if (contactUsformDesc) {
          fromData.append("contactUsformDesc", contactUsformDesc);
        }
        if (contactUsformAvailibility) {
          fromData.append(
            "contactUsformAvailibility",
            contactUsformAvailibility
          );
        }
        if (contactUsformPrivacy) {
          fromData.append("contactUsformPrivacy", contactUsformPrivacy);
        }
        if (youtubeLink) {
          fromData.append("youtubeLink", youtubeLink);
        }
        if (eTitle) {
          fromData.append("eTitle", eTitle);
        }
        if (eDesc) {
          fromData.append("eDesc", eDesc);
        }
        if (eformWhatApp) {
          fromData.append("eformWhatApp", eformWhatApp);
        }
        if (eformCall) {
          fromData.append("eformCall", eformCall);
        }
        if (descriptionTitleFirst) {
          fromData.append("descriptionTitle[0]", descriptionTitleFirst);
        }
        if (descriptionDescFirst) {
          fromData.append("descriptionDesc[0]", descriptionDescFirst);
        }
        if (descriptionTitleFirst) {
          fromData.append("descriptionTitle[1]", descriptionTitleSecond);
        }
        if (descriptionDescSecond) {
          fromData.append("descriptionDesc[1]", descriptionDescSecond);
        }
        if (descriptionTitlethird) {
          fromData.append("descriptionTitle[2]", descriptionTitlethird);
        }
        if (descriptionDescthird) {
          fromData.append("descriptionDesc[2]", descriptionDescthird);
        }
        if (mainImage) {
          fromData.append("image", mainImage);
        }


        const data = await axios.post(
          `${Baseurl}api/v1/admin/addStaffTalentedType`,
          fromData,
          Auth
        );
        const msg = data.data.message;
        Store.addNotification({
          title: "",
          message: "data has been updated",
          type: "success",
          insert: "bottom",
          container: "bottom-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true,
          },
        });
        fetchData();
        props.onHide();
        setSubmitLoading(false);
      } catch (e) {
        const msg = e.response.data.message;
        Store.addNotification({
          title: "",
          message: msg,
          type: "danger",
          insert: "bottom",
          container: "bottom-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true,
          },
        });
        setSubmitLoading(false);
      }
    };

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {edit ? "Edit" : "Create New"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? edithandler : postHandler}>
            {imageLoading === true ? (
              <Spinner animation="border" role="status" />
            ) : (
              ""
            )}
            {uploaded === true ? (
              <Alert variant="success">Image Uploaded Successfully</Alert>
            ) : (
              ""
            )}
            <div className="multiple_Image">
              <img src={editData?.image} alt="" />
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => ClodinaryPost(e.target.files[0], "mainImage")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <FloatingLabel>
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>YouTube Link</Form.Label>
              <Form.Control
                type="text"
                value={youtubeLink}
                onChange={(e) => setyoutubelink(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Us From Tittle</Form.Label>
              <Form.Control
                type="text"
                value={contactUsformTitle}
                onChange={(e) => setcontactUsformTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Us From Description </Form.Label>
              <Form.Control
                type="text"
                value={contactUsformDesc}
                onChange={(e) => setcontactUsformDesc(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Us From Availability</Form.Label>
              <Form.Control
                type="text"
                value={contactUsformAvailibility}
                onChange={(e) => setcontactUsformAvailibility(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Us From Policy</Form.Label>
              <Form.Control
                type="text"
                value={contactUsformPrivacy}
                onChange={(e) => setcontactUsformPrivacy(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>E-tittle</Form.Label>
              <Form.Control
                type="text"
                value={eTitle}
                onChange={(e) => seteTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>E-desc</Form.Label>
              <Form.Control
                type="text"
                value={eDesc}
                onChange={(e) => seteDesc(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>WhatsApp Number</Form.Label>
              <Form.Control
                type="text"
                value={eformWhatApp}
                onChange={(e) => seteformWhatApp(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Call Number</Form.Label>
              <Form.Control
                type="text"
                value={eformCall}
                onChange={(e) => seteformCall(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Form Privacy</Form.Label>
              <Form.Control
                type="text"
                value={eformPrivacy}
                onChange={(e) => seteformPrivacy(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>e-form Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => ClodinaryPost(e.target.files[0], "eformImage")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description Title First</Form.Label>
              <FloatingLabel>
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  value={descriptionTitleFirst}
                  onChange={(e) => setDescriptionTitleFirst(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description Title Second</Form.Label>
              <FloatingLabel>
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  value={descriptionTitleSecond}
                  onChange={(e) => setDescriptionTitleSecond(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description Title Third</Form.Label>
              <FloatingLabel>
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  value={descriptionTitlethird}
                  onChange={(e) => setDescriptionTitlethird(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description Description First</Form.Label>
              <FloatingLabel>
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  value={descriptionDescFirst}
                  onChange={(e) => setDescriptionDescFirst(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description Description Second</Form.Label>
              <FloatingLabel>
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  value={descriptionDescSecond}
                  onChange={(e) => setDescriptionDescSecond(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description Description Third</Form.Label>
              <FloatingLabel>
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  value={descriptionDescthird}
                  onChange={(e) => setDescriptionDescthird(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Button
              style={{
                backgroundColor: "#0c0c0c",
                borderRadius: "0",
                border: "1px solid #0c0c0c",
              }}
              type="submit"
            >
              {submitLoading ? (
                <Spinner animation="border" role="status" />
              ) : (
                "Submit"
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  function MyDescriptionModal(props) {
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            View Description
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="InfoBox">
            <p className="title mb-1">Description </p>
            <p className="desc"> {desc} </p>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  function MyDescriptionModalForConsultancy(props) {
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            View Description
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="InfoBox">
            <p className="title mb-1">Description </p>
            <p className="desc"> {viewDescription} </p>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
  function ShowFullDataModal(props) {
    console.log("props", fullViewData);
    return (
      <>
        <MyDescriptionModalForConsultancy
          show={descShowModalForConsultancy}
          onHide={() => setdescShowModalForConsultancy(false)}
        />
        <Modal
          {...props}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              View Full Data
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="InfoBox">
              <>
                {fullViewData && (
                  <div className="mt-4">
                    <div className="multiple_Image">
                      {fullViewData?.eformImage && (
                        <img
                          src={fullViewData?.eformImage}
                          style={{
                            width: "100px",
                            maxWidth: "100px",
                            height: "100px",
                            maxHeight: "100px",
                          }}
                          alt=""
                        />
                      )}
                    </div>

                    <h2>contact Us form Privacy</h2>
                    <p>{fullViewData?.contactUsformPrivacy}</p>
                    <h2>E Title</h2>
                    <p>{fullViewData?.eTitle}</p>
                    <h2>E Description</h2>
                    <p>{fullViewData?.eDesc}</p>
                    <h2>E formPrivacy</h2>
                    <p>{fullViewData?.eformPrivacy}</p>

                    <h1 style={{ margin: "20px auto", width: "50%" }}>
                      description Section
                    </h1>
                    {fullViewData?.description?.map((item) => (
                      <>
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                      </>
                    ))}
                    <div style={{ width: "100%", margin: "40px auto" }}>
                      <iframe
                        width="80%"
                        height="400"
                        src={fullViewData?.updateyoutubelink}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                      ></iframe>
                    </div>
                    <div></div>
                  </div>
                )}
              </>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <MyDescriptionModal show={descModal} onHide={() => setDescModal(false)} />
      <ShowFullDataModal
        show={hideFulldata}
        onHide={() => setShowFullData(false)}
      />
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "20px" }}
          >
            Staff Talented Type ( Total : {total} )
          </span>
          <button
            onClick={() => {
              setEditData({});
              setEdit(false);
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
          >
            Create New
          </button>
        </div>

        {data?.length === 0 || !data ? (
          <Alert>Not Create Yet !</Alert>
        ) : (
          <>
            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>Sno.</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Contact Form Title</th>
                    <th>WhatAppDetail</th>
                    <th>Created At</th>
                    <th>Show Full Content</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((i, index) => (
                    <tr key={index}>
                      <td>#{index + 1} </td>
                      <td>
                        <img src={i.image} alt="" style={{ width: "100px" }} />
                      </td>
                      <td>{i.title} </td>
                      <td>
                        <button
                          className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
                          onClick={() => {
                            setDesc(i.desc);
                            setDescModal(true);
                          }}
                        >
                          View
                        </button>
                      </td>
                      <td>{i.contactUsformTitle}</td>
                      <td>{i.eformWhatApp}</td>
                      <td>{i.createdAt?.substr(0, 10)} </td>

                      <td>
                        <span className="flexCont">
                          <button
                            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
                            onClick={(e) => {
                              setfullViewData(i);
                              setShowFullData(true);
                              const youtubeVideoLink = i.youtubeLink;
                              console.log("youtubeLink", youtubeVideoLink);
                              const videoId =
                                getVideoIdFromUrl(youtubeVideoLink);
                              if (videoId) {
                                console.log("Video ID:", videoId);
                                const videourl = `https://www.youtube.com/embed/${videoId}?si=InTXwsXs3JbTwAMf&amp;start=3`;
                                setfullViewData((prev) => {
                                  return {
                                    ...prev,
                                    updateyoutubelink: videourl,
                                  };
                                });
                              } else {
                                console.log("Invalid YouTube URL");
                              }
                            }}
                          >
                            Show All
                          </button>
                        </span>
                      </td>
                      <td>
                        <span className="flexCont">
                          <i
                            className="fa-solid fa-trash"
                            onClick={() => deleteHandler(i._id)}
                          />
                          <i
                            className="fa-solid fa-pen-to-square"
                            onClick={() => {
                              setEditData(i);
                              setEdit(true);
                              setId(i._id);
                              setModalShow(true);
                            }}
                          ></i>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default HOC(StaffTalentedType);
