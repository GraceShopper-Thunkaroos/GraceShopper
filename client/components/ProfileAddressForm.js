import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import GoogleButton from "react-google-button";

const buttonHeight = "3.2rem";
const ProfileAddressForm = props => {
  const {
    street1,
    street2,
    city,
    state,
    zipcode,
    country,
    type
  } = props.address;
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
            name="street1"
            placeholder="Street 1"
            size="lg"
            value={street1}
            onChange={props.onChange}
          />
        </Form.Group>
        <Form.Group style={{ width: "48%", margin: 0, minWidth: 0 }}>
          <Form.Control
            name="street2"
            placeholder="Street 2"
            size="lg"
            value={street2}
            onChange={props.onChange}
          />
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
            name="city"
            placeholder="City"
            size="lg"
            value={city}
            onChange={props.onChange}
          />
        </Form.Group>
        <Form.Group style={{ width: "30%", margin: 0, minWidth: 0 }}>
          <Form.Control
            name="state"
            placeholder="State"
            size="lg"
            value={state}
            onChange={props.onChange}
          />
        </Form.Group>
        <Form.Group style={{ width: "30%", margin: 0, minWidth: 0 }}>
          <Form.Control
            name="zipcode"
            placeholder="Zipcode"
            size="lg"
            value={zipcode}
            onChange={props.onChange}
          />
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
        <Form.Group style={{ width: "70%", margin: 0, minWidth: 0 }}>
          <Form.Control
            name="Country"
            placeholder="Country"
            size="lg"
            value={country}
            onChange={props.onChange}
          />
        </Form.Group>
        <Form.Group style={{ width: "25%", margin: 0, minWidth: 0 }}>
          <Form.Control
            name="type"
            placeholder="Type"
            size="lg"
            value={type}
            onChange={props.onChange}
          />
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

export default ProfileAddressForm;
