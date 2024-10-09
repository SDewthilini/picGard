import React, { useState } from 'react';
import { Card, Dropdown, Button, Form, Modal } from 'react-bootstrap';
import CryptoJS from 'crypto-js';
import './Gcard.css'; // Assuming you have a CSS file for this component

const Gcard = ({ title, data, onDelete, onRename }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDecryptModal, setShowDecryptModal] = useState(false);
  const [decryptPassword, setDecryptPassword] = useState('');
  const [decryptedImage, setDecryptedImage] = useState(null);
  const [decryptionError, setDecryptionError] = useState(null);

  const handleDecrypt = () => {
    try {
      const decrypted = CryptoJS.AES.decrypt(data, decryptPassword);
      const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);

      if (decryptedData) {
        setDecryptedImage(decryptedData);
        setDecryptionError(null);
      } else {
        setDecryptionError('Invalid password or corrupted image data.');
      }
    } catch (error) {
      setDecryptionError('An error occurred during decryption.');
    }
  };

  const handleCloseDecryptModal = () => {
    setShowDecryptModal(false);
    setDecryptedImage(null);
    setDecryptionError(null);
    setDecryptPassword('');
  };

  return (
    <div className="gallery-card-container">
      <Card className="gallery-card">
        <Card.Img
          variant="top"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNXTjDIG6LiRswP1ai0tNTHZOoQdtfK8N7lw&s"
          style={{ width: '100%', margin: '0 auto', paddingTop: '20px' }} // Centering the image icon
        />
        <Card.Body className="card-body">
          <Card.Title className="card-title">{title}</Card.Title>
          <Dropdown
            show={showDropdown}
            onToggle={(isOpen) => setShowDropdown(isOpen)}
            className="card-options"
          >
            <Dropdown.Toggle as="span" className="card-options-toggle">
              <span></span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setShowDecryptModal(true)}>
                Decrypt
              </Dropdown.Item>
              <Dropdown.Item onClick={onRename}>Rename</Dropdown.Item>
              <Dropdown.Item onClick={onDelete}>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Body>
      </Card>

      <Modal show={showDecryptModal} onHide={handleCloseDecryptModal}>
        <Modal.Header closeButton>
          <Modal.Title>Decrypt Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
                style={{ width: '100%' }}
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
      </Modal>
    </div>
  );
};

export default Gcard;
