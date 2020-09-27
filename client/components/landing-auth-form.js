import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import GoogleButton from "react-google-button";

const LandingAuthForm = props => {
  return (
    <Form
      onSubmit={props.onSubmit}
      style={{
        margin: "auto",
        textAlign: "center",
        width: "67%"
      }}
    >
      {props.tab === "signup" && (
        <React.Fragment>
          <Form.Row>
            <Form.Group style={{ margin: "auto", marginBottom: "1rem" }}>
              <Form.Control
                required={true}
                name="firstName"
                placeholder="First Name"
                size="lg"
                value={props.firstName}
                onChange={props.onChange}
              />
            </Form.Group>
            <Form.Group style={{ margin: "auto", marginBottom: "1rem" }}>
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
      {props.errorMessage && <div>{props.errorMessage}</div>}
      <Form.Row style={{ margin: 0 }}>
        <Button
          variant="primary"
          type="submit"
          style={{
            width: "100%",
            margin: "auto",
            height: "3.3rem",
            backgroundColor: "#30B7EC",
            border: "#30B7EC"
          }}
        >
          {props.tab === "signup" ? "Sign Up" : "Log In"}
        </Button>
      </Form.Row>
      <div className="dividerWrapper" style={{ width: "100%", margin: "auto" }}>
        <hr className="dividerLine" />
        <div className="dividerOr">
          <div className="dividerOrText">or</div>
        </div>
      </div>
      <Form.Row style={{ margin: 0 }}>
        <a
          style={{
            width: "100%",
            margin: "auto",
            height: "3.3rem",
            borderRadius: "4px",
            paddingLeft: "2px",
            paddingTop: "1px",
            paddingBottom: "1px"
          }}
          href="/auth/google"
        >
          <GoogleButton
            type="light"
            style={{
              width: "100%",
              margin: "auto",
              height: "3.3rem",
              borderRadius: "4px",
              paddingLeft: "2px",
              paddingTop: "1px",
              paddingBottom: "1px"
            }}
          />
        </a>
      </Form.Row>
    </Form>
  );
};

export default LandingAuthForm;
