import Modal from "react-bootstrap/Modal";
import Button from "@restart/ui/esm/Button";
import { X } from "react-bootstrap-icons";
const Dialog = ({
  show = false,
  onDismiss = () => {},
  title = "",
  description = "",
  yesNoButton = false,
  onPressYes = () => {},
  onPressNo = () => {},
  children,
}) => {
  return (
    <>
      <Modal show={show} onHide={onDismiss}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
          <X
            size="1.5em"
            onClick={onDismiss}
            color="#4d92e3"
            style={{ cursor: "pointer" }}
          />
        </Modal.Header>
        <Modal.Body>{description}</Modal.Body>
        {children}
        <Modal.Footer>
          {!!yesNoButton && (
            <div>
              <Button className="mr-2 btn btn-primary " onClick={onPressNo}>
                Cancelar
              </Button>
              <Button className="btn btn-primary " onClick={onPressYes}>
                Aceptar
              </Button>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Dialog;
