import React, { useState, initialstate } from "react";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import messageimg from "./img/letter.svg"
import contact from "./contact.module.css"
import userService from "../../../services/userService";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
export default function ContactUs() {
  const [nameSend, setNameSend] = useState("");
  const [emailSend, setEmailSend] = useState("");
  const [telSend, setTelSend] = useState("");
  const [messageSend, setMessageSend] = useState("");
  const [successful, setSuccessful] = useState(initialstate);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const sendForm = async () => {

    const contact = {
      name: nameSend,
      email: emailSend,
      telephone: telSend,
      message: messageSend,
    }
    if (nameSend == "") {
      setOpen(true);
      setMessage("Name should not be blank");
      setSuccessful(false)
    }
    else if (emailSend == "") {
      setOpen(true);
      setMessage("Email should not be blank");
      setSuccessful(false)
    }
    else if (telSend == "") {
      setOpen(true);
      setMessage("Telephone should not be blank");
      setSuccessful(false)
    }
    else if (messageSend == "") {
      setOpen(true);
      setMessage("Message should not be blank");
      setSuccessful(false)
    }
    else {
      if (!validateEmail(emailSend)) {
        setOpen(true);
        setMessage("Email format not valid");
        setSuccessful(false)
      }
      else {
        await userService.contactUs(contact).then(
          (response) => {
            setOpen(true);
            setMessage("Sent")
            setSuccessful(true)
          },
          (error) => {
            alert('A name was submitted: ' + nameSend);
            setOpen(true);
            setMessage("Error While sending the message");
            setSuccessful(false)
          }
        );
      }


    }

  };
  return (
    <section id="contact-us" className={`${contact.contact_us} container`}>
      <div className="section-title mb-3">
              <h2>Contactez-nous </h2>
            </div>
    <div>

      <div className={contact.contact1}>
        <div className={contact.container1contact1}>
          <div className={contact.contact11pic} data1tilt>
            <img src={messageimg} alt="IMG" />
          </div>

          <div className={contact.divv}>

            <div className={contact.wrap1input1} data1validate="Name is required">
              <input className={contact.input1} type="text" name="name" value={nameSend} placeholder="Name"
                onChange={(e) => setNameSend(e.target.value)}
              />
              <span className={contact.shadow1input1}></span>
            </div>

            <div className={contact.wrap1input1} data1validate="Valid email is required: ex@abc.xyz">
              <input className={contact.input1} type="text" name="email" value={emailSend} placeholder="Email"
                onChange={(e) => setEmailSend(e.target.value)}
              />
              <span className={contact.shadow1input1}></span>
            </div>

            <div className={contact.wrap1input1} data1validate="numero de telephone is required">
              <input className={contact.input1} type="text" name="tel" value={telSend} placeholder="numero de telephone"
                onChange={(e) => setTelSend(e.target.value)}
              />
              <span className={contact.shadow1input1}></span>
            </div>

            <div className={contact.wrap1input1} data1validate="Message is required">
              <textarea className={contact.input1} name="message" value={messageSend} placeholder="Message"
                onChange={(e) => setMessageSend(e.target.value)}
              ></textarea>
              <span className={contact.shadow1input1}></span>
            </div>

            <div className={contact.container1contact11form1btn}>
              <button
                className={contact.contact11form1btn}
                onClick={() => {
                  sendForm();
                }}
              >
                <span>
                  Send
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={successful ? "success" : "error"}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
    </section>


  );
}
