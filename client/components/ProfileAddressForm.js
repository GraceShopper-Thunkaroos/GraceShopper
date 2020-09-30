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
        width: "90%"
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
            size="sm"
            value={street1}
            onChange={props.onChange}
          />
          <Form.Text className="text-muted" style={{ textAlign: "left" }}>
            Street 1
          </Form.Text>
        </Form.Group>
        <Form.Group style={{ width: "48%", margin: 0, minWidth: 0 }}>
          <Form.Control
            name="street2"
            placeholder="Street 2"
            size="sm"
            value={street2}
            onChange={props.onChange}
          />
          <Form.Text className="text-muted" style={{ textAlign: "left" }}>
            Street 2
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
            name="city"
            placeholder="City"
            size="sm"
            value={city}
            onChange={props.onChange}
          />
          <Form.Text className="text-muted" style={{ textAlign: "left" }}>
            City
          </Form.Text>
        </Form.Group>
        <Form.Group style={{ width: "30%", margin: 0, minWidth: 0 }}>
          <Form.Control
            name="state"
            placeholder="State"
            size="sm"
            value={state}
            onChange={props.onChange}
          />
          <Form.Text className="text-muted" style={{ textAlign: "left" }}>
            State
          </Form.Text>
        </Form.Group>
        <Form.Group style={{ width: "30%", margin: 0, minWidth: 0 }}>
          <Form.Control
            name="zipcode"
            placeholder="Zipcode"
            size="sm"
            value={zipcode}
            onChange={props.onChange}
          />
          <Form.Text className="text-muted" style={{ textAlign: "left" }}>
            Zip Code
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
        <Form.Group style={{ width: "70%", margin: 0, minWidth: 0 }}>
          <Form.Control
            name="Country"
            placeholder="Country"
            size="sm"
            value={country}
            onChange={props.onChange}
          />
          <Form.Text className="text-muted" style={{ textAlign: "left" }}>
            Country
          </Form.Text>
        </Form.Group>
        <Form.Group style={{ width: "25%", margin: 0, minWidth: 0 }}>
          <Form.Control
            name="type"
            placeholder="Type"
            size="sm"
            value={type}
            onChange={props.onChange}
          />
          <Form.Text className="text-muted" style={{ textAlign: "left" }}>
            Type
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

export default ProfileAddressForm;
