import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import GoogleButton from "react-google-button";

const buttonHeight = "3.2rem";

function formatDate(date) {
  var d = new Date(date);
  var month = "" + (d.getMonth() + 1);
  var day = "" + (d.getDate() + 1);
  var year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

const ProfileBillingForm = props => {
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
        <Form.Group style={{ width: "40%", margin: 0, minWidth: 0 }}>
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
        <Form.Group style={{ width: "40%", margin: 0, minWidth: 0 }}>
          <Form.Control
            name="expirationDate"
            placeholder="Expiration Date"
            size="lg"
            value={expirationDate}
            onChange={props.onChange}
            type="date"
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
