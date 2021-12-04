import React from 'react'
import '../Css/postEditor.css'
import { Form } from 'react-bootstrap'

function EnterPost() {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Example</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
      </Form>
    </div>
  )
}

export default EnterPost
