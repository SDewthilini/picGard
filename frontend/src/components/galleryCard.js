import React, { useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import CryptoJS from "crypto-js";
import api from "../api/api";

const Gcard = ({id, title, data }) => {
  const [showDecryptModal, setShowDecryptModal] = useState(false);
  const [decryptPassword, setDecryptPassword] = useState("");
  const [decryptedImage, setDecryptedImage] = useState(null);
  const [decryptionError, setDecryptionError] = useState(null);
  const [encryptedImageFile, setEncryptedImageFile] = useState(null);

  
  const handleDelete= async () => {
    api.delete(`/deleteimg/${id}`)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const handleClick = () => {
    setShowDecryptModal(true);
  };

  const handleCloseDecryptModal = () => {
    setShowDecryptModal(false);
    setDecryptedImage(null);
    setDecryptionError(null);
    setDecryptPassword("");
    setEncryptedImageFile(null);
  };

  const handleDecrypt = () => {
    // if (!encryptedImageFile || !decryptPassword) {
    //   alert('Please select an encrypted image file and enter a password.');
    //   return;
    // }

    const reader = new FileReader();
    
      const encryptedImageData = data;
      console.log("en i d" + encryptedImageData);
      const decrypted = CryptoJS.AES.decrypt(encryptedImageData, decryptPassword);
      const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);

      if (decryptedData) {
        setDecryptedImage(decryptedData);
        setDecryptionError(null);
      } else {
        alert('Invalid password or corrupted image data.');
      }
    
    //reader.readAsText(encryptedImageFile);
  };

  return (
    <>
      <Card className="card">
        <Card.Img
          variant="top"
          src="https://pixabay.com/illustrations/cyber-security-technology-network-3374252/"
        />
        <Card.Body className="card-body">
          <Card.Title className="card-title">{title}</Card.Title>
        </Card.Body>
        <Button onClick={handleClick}>Decrypt</Button>
      </Card>

      <Modal show={showDecryptModal} onHide={handleCloseDecryptModal}>
        <Modal.Header closeButton>
          <Modal.Title>Decrypt Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="encryptedImageFile">
              
            </Form.Group>
            <Form.Group controlId="decryptPassword">
              <Form.Label>Enter Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={decryptPassword}
                onChange={(e) => setDecryptPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleDecrypt} className="mt-2">
              Decrypt
            </Button>
          </Form>
          {decryptionError && (
            <p className="text-danger mt-2">{decryptionError}</p>
          )}
          {decryptedImage && (
            <div className="mt-3">
              <img
                src={decryptedImage}
                alt="Decrypted"
                style={{ width: "100%" }}
              />
              <Button
                variant="success"
                href={decryptedImage}
                download="decrypted_image.jpg"
                className="mt-2"
              >
                Download
              </Button>

              
            </div>
          )}
        </Modal.Body>
        <button onClick={handleDelete}>delete</button>
      </Modal>
    </>
  );
};

export default Gcard;
