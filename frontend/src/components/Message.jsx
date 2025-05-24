import { Alert } from "react-bootstrap"


function Message({variant, children }) {   //variant is the color and children is the message
  return (
    <Alert variant={variant}>
      {children}
    </Alert>
  )

  
}
Message.defaultProps={variant:'info'}
//info is blue if we do not have any props it shows blue, varian='success' is green

export default Message
