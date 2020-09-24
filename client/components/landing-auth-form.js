import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
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
  return (
    <Form onSubmit={props.handleSubmit} style={{ margin: "auto" }}>
      <Form.Row style={{ margin: 0 }}>
        <Form.Group style={{ width: "60%", margin: 0 }}>
          <Form.Control
            required={true}
            name="email"
            placeholder="Email Address"
            size="lg"
          />
        </Form.Group>
      </Form.Row>

      <Form.Row style={{ margin: 0 }}>
        <Form.Group style={{ width: "60%", margin: 0 }}>
          <Form.Control
            type="url"
            name="password"
            placeholder="Password"
            size="lg"
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Button
          variant="primary"
          type="submit"
          style={{ width: "100%", margin: "1rem" }}
        >
          Log In
        </Button>
      </Form.Row>
    </Form>
  );
};

export default LandingAuthForm;
