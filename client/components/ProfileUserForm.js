import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const buttonHeight = "3.2rem";

const ProfileUserForm = props => {
  const { cardNumber, securityCode } = props.billing;
  const expirationDate = formatDate(props.billing.expirationDate);
  console.log("billing dates", expirationDate, props.billing.expirationDate);
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
            value={cardNumber}
            onChange={props.onChange}
          />
          <Form.Text className="text-muted" style={{ textAlign: "left" }}>
            First Name
          </Form.Text>
        </Form.Group>
        <Form.Group style={{ width: "48%", margin: 0, minWidth: 0 }}>
          <Form.Control
            required={true}
            name="lastName"
            placeholder="Last Name"
            size="lg"
            value={cardNumber}
            onChange={props.onChange}
          />
          <Form.Text className="text-muted" style={{ textAlign: "left" }}>
            Last Name
          </Form.Text>
        </Form.Group>
      </Form.Row>

      <Form.Row
        style={{
          margin: 0,
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <Form.Group style={{ width: "100%", margin: 0, minWidth: 0 }}>
          <Form.Control
            required={true}
            name="phoneNumber"
            placeholder="Phone Number"
            size="lg"
            value={securityCode}
            onChange={props.onChange}
          />
          <Form.Text className="text-muted" style={{ textAlign: "left" }}>
            CVC
          </Form.Text>
        </Form.Group>
      </Form.Row>
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

export default ProfileUserForm;
