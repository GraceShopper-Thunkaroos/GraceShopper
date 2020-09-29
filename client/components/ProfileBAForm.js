import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import GoogleButton from "react-google-button";

const buttonHeight = "3.2rem";
const ProfileBAForm = props => {
  return (
    <Form
      onSubmit={props.onSubmit}
      style={{
        margin: "auto",
        textAlign: "center",
        width: "67%"
      }}
    >
      {props.errorMessage && (
        <div className="errorMessage">{props.errorMessage}</div>
      )}
      {props.formType === "signup" && (
        <React.Fragment>
          <Form.Row
            style={{
              margin: 0,
              marginBottom: "1rem",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <Form.Group style={{ width: "48%", margin: 0, minWidth: 0 }}>
              <Form.Control
                required={true}
                name="firstName"
                placeholder="First Name"
                size="lg"
                value={props.firstName}
                onChange={props.onChange}
              />
            </Form.Group>
            <Form.Group style={{ width: "48%", margin: 0, minWidth: 0 }}>
              <Form.Control
                required={true}
                name="lastName"
                placeholder="Last Name"
                size="lg"
                value={props.lastName}
                onChange={props.onChange}
              />
            </Form.Group>
          </Form.Row>
        </React.Fragment>
      )}
      <Form.Row style={{ margin: 0 }}>
        <Form.Group
          style={{ width: "100%", margin: "auto", marginBottom: "1rem" }}
        >
          <Form.Control
            required={true}
            name="email"
            placeholder="Email Address"
            size="lg"
            autoComplete="username"
            value={props.email}
            onChange={props.onChange}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row style={{ margin: 0 }}>
        <Form.Group style={{ width: "100%", margin: "auto" }}>
          <Form.Control
            required={true}
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            size="lg"
            value={props.password}
            onChange={props.onChange}
          />
        </Form.Group>
      </Form.Row>
      <br />
      <Form.Row style={{ margin: 0 }}>
        <Button
          variant="primary"
          type="submit"
          style={{
            width: "100%",
            margin: "auto",
            height: buttonHeight,
            backgroundColor: "#30B7EC",
            border: "#30B7EC",
            fontSize: "1em"
          }}
        >
          Submit
        </Button>
      </Form.Row>
    </Form>
  );
};

export default ProfileBAForm;
