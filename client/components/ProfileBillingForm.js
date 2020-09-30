import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import GoogleButton from "react-google-button";

const buttonHeight = "3.2rem";
const ProfileBillingForm = props => {
  const { cardNumber, securityCode, expirationDate } = props.billing;
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
        <Form.Group style={{ width: "100%", margin: 0, minWidth: 0 }}>
          <Form.Control
            required={true}
            name="cardNumber"
            placeholder="Card Number"
            size="lg"
            value={cardNumber}
            onChange={props.onChange}
          />
          <Form.Text className="text-muted" style={{ textAlign: "left" }}>
            Card Number
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
        <Form.Group style={{ width: "30%", margin: 0, minWidth: 0 }}>
          <Form.Control
            required={true}
            name="securityCode"
            placeholder="CVC"
            size="lg"
            value={securityCode}
            onChange={props.onChange}
          />
          <Form.Text className="text-muted" style={{ textAlign: "left" }}>
            CVC
          </Form.Text>
        </Form.Group>
        <Form.Group style={{ width: "30%", margin: 0, minWidth: 0 }}>
          <Form.Control
            name="expirationDate"
            placeholder="Expiration Date"
            size="lg"
            value={expirationDate}
            onChange={props.onChange}
          />
          <Form.Text className="text-muted" style={{ textAlign: "left" }}>
            Expiration Date
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

export default ProfileBillingForm;
