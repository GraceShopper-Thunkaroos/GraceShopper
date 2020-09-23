import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
/**
 * COMPONENT
 */
const FormStyling = {
  width: '100%',
  margin: 'auto',
  display: 'flex',
  flexFlow: 'column',
  border: 0,
  focus: {
    backgroundColor: 'lightblue'
  }
}

const LandingAuthForm = props => {
  return (
    <Form onSubmit={props.handleSubmit} style={FormStyling}>
      <Form.Row>
        <Form.Group>
          <Form.Control
            required={true}
            name="email"
            placeholder="Email Address"
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group style={{width: '100%'}}>
          <Form.Control
            type="url"
            name="password"
            placeholder="Password"
            width="100%"
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Button
          variant="primary"
          type="submit"
          style={{width: '100%', margin: '1rem'}}
        >
          Log In
        </Button>
      </Form.Row>
    </Form>
  )
}

export default LandingAuthForm
