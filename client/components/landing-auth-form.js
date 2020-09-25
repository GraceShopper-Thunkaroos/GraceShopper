import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import GoogleButton from "react-google-button";
import history from "../history";
import axios from "axios";
/**
 * COMPONENT
 */
const FormStyling = {
  width: "100%",
  margin: "auto",
  display: "flex",
  flexFlow: "column",
  border: 0,
  focus: {
    backgroundColor: "lightblue"
  }
};

const LandingAuthForm = props => {
  console.log(props, "wow");
  return (
    <Form
      onSubmit={props.onSubmit}
      style={{
        margin: "auto",
        textAlign: "center",
        width: "67%"
      }}
    >
      <Form.Row style={{ margin: 0 }}>
        <Form.Group
          style={{ width: "100%", margin: "auto", marginBottom: "1rem" }}
        >
          <Form.Control
            required={true}
            name="email"
            placeholder="Email Address"
            size="lg"
            value={props.email}
            onChange={props.onChange}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row style={{ margin: 0 }}>
        <Form.Group style={{ width: "100%", margin: "auto" }}>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
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
          style={{ width: "100%", margin: "auto", height: "3.3rem" }}
        >
          Log In
        </Button>
      </Form.Row>
      <div className="dividerWrapper" style={{ width: "100%", margin: "auto" }}>
        <hr className="dividerLine" />
        <div className="dividerOr">
          <div className="dividerOrText">or</div>
        </div>
      </div>
      <Form.Row style={{ margin: 0 }}>
        <GoogleButton
          style={{
            width: "100%",
            margin: "auto",
            height: "3.3rem",
            borderRadius: "4px",
            paddingLeft: "2px",
            paddingTop: "1px",
            paddingBottom: "1px"
          }}
          onClick={() => {
            history.push("/auth/google");
          }}
        />
        <a href="/auth/google">COME ON with Google</a>
      </Form.Row>
    </Form>
  );
};

export default LandingAuthForm;
