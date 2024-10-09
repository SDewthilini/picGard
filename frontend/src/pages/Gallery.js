import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Modal, Form, Spinner } from 'react-bootstrap';
import ColorSchemesExample from '../components/nav';
import './Gallery.css';
import Gcard from '../components/Gcard';
import CryptoJS from 'crypto-js';
import api from '../api/api';
import SearchBar from '../components/SearchBar';
import Loading  from '../components/Loading';

const Gallery = () => {
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showOptionsModal, setShowOptionsModal] = useState(false);
    const [password, setPassword] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [showPopUpCard, setShowPopUpCard] = useState(false);
    const [encryptedImage, setEncryptedImage] = useState(null);
    const [originalImage, setOriginalImage] = useState(null);
    const [gallery, setGallery] = useState([]);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [saveName, setSaveName] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [downloadLink, setDownloadLink] = useState('');
    const [encryptedImageFile, setEncryptedImageFile] = useState(null);
    const [decryptPassword, setDecryptPassword] = useState('');
    const [decryptedImage, setDecryptedImage] = useState(null);
    const [selectedImageId, setSelectedImageId] = useState(null);
    const [showRenameModal, setShowRenameModal] = useState(false);
    const [newName, setNewName] = useState('');
    const [filteredGallery, setFilteredGallery] = useState([]);
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [imageIdToDelete, setImageIdToDelete] = useState(null);

    // Loading states
    const [isLoadingImages, setIsLoadingImages] = useState(true);
    const [isDeletingImage, setIsDeletingImage] = useState(false);
    const [isRenamingImage, setIsRenamingImage] = useState(false);
    const [isAddingImage, setIsAddingImage] = useState(false);

    useEffect(() => {
        api.get('/images').then((response) => {
            setGallery(response.data);
            setFilteredGallery(response.data);
            console.log(response.data);
            setIsLoadingImages(false);
        }).catch((error) => {
            console.error('There was an error!', error);
            setIsLoadingImages(false);
        });
    }, []);

    const handleSearch = (query) => {
        const lowercasedQuery = query.toLowerCase();
        const filtered = gallery.filter(image =>
            image.name.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredGallery(filtered);
    };

    const confirmDeleteImage = (imageId) => {
        setImageIdToDelete(imageId);
        setShowConfirmDeleteModal(true);
    };

    const handleDeleteImage = () => {
        setIsDeletingImage(true);
        api.delete(`/deleteimg/${imageIdToDelete}`)
            .then(() => {
                const updatedGallery = gallery.filter(image => image._id !== imageIdToDelete);
                setGallery(updatedGallery);
                setFilteredGallery(updatedGallery);
                setShowConfirmDeleteModal(false);
                setIsDeletingImage(false);
            })
            .catch((error) => {
                console.error('There was an error deleting the image!', error);
                setIsDeletingImage(false);
            });
    };

    const handleRenameImage = (imageId) => {
        setSelectedImageId(imageId);
        setShowRenameModal(true);
    };

    const handleRenameSubmit = () => {
        setIsRenamingImage(true);
        api.put('/rename', { name: newName, imageId: selectedImageId })
            .then((response) => {
                console.log(response.data);
                const updatedGallery = gallery.map(image =>
                    image._id === selectedImageId ? { ...image, name: newName } : image
                );
                setGallery(updatedGallery);
                setFilteredGallery(updatedGallery);
                setShowRenameModal(false);
                setNewName('');
                setIsRenamingImage(false);
            })
            .catch((error) => {
                console.error('There was an error renaming the image!', error);
                setIsRenamingImage(false);
            });
    };

    const handleDrop = (e, setImageSetter) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setImageSetter(file);
    };

    const handleEncryptImage = () => {
        if (!imageFile || !password) {
            alert('Please select an image and enter a password.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const imageData = e.target.result;
            const encrypted = CryptoJS.AES.encrypt(imageData, password).toString();
            const encryptedBlob = new Blob([encrypted], { type: 'text/plain' });
            const encryptedUrl = URL.createObjectURL(encryptedBlob);
            setDownloadLink(encryptedUrl);
            setEncryptedImage(encrypted);
        };
        reader.readAsDataURL(imageFile);
    };

    const handleSaveClick = () => {
        if (!saveName) {
            alert('Please provide a name for the image.');
            return;
        }

        setIsAddingImage(true);
        api.post('/save', {
            name: saveName,
            data: encryptedImage,
        }).then((response) => {
            console.log(response.data);
            const newImage = { name: saveName, data: encryptedImage };
            const updatedGallery = [...gallery, newImage];
            setGallery(updatedGallery);
            setFilteredGallery(updatedGallery);
            setIsAddingImage(false);
        }).catch((error) => {
            console.error('There was an error!', error);
            setIsAddingImage(false);
        });

        setShowSaveModal(false);
    };

    const handleDecryptImage = () => {
        if (!encryptedImageFile || !decryptPassword) {
            alert('Please select an encrypted image file and enter a password.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const encryptedImageData = e.target.result;
            const decrypted = CryptoJS.AES.decrypt(encryptedImageData, decryptPassword);
            const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);

            if (decryptedData) {
                setDecryptedImage(decryptedData);
            } else {
                alert('Invalid password or corrupted image data.');
            }
        };
        reader.readAsText(encryptedImageFile);
    };

    const handleEnterPassword = () => {
        setShowPasswordModal(false);
    };

    const handleDelete = () => {
        confirmDeleteImage(selectedImage._id);
        setShowOptionsModal(false);
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = selectedImage.data;
        link.download = selectedImage.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setShowOptionsModal(false);
    };

    const handleRename = () => {
        handleRenameImage(selectedImage._id);
        setShowOptionsModal(false);
    };

    return (
        <div>
            <ColorSchemesExample />
            <Button className="add-image-button" onClick={() => setShowPopUpCard(true)}>+</Button>
            <SearchBar onSearch={handleSearch} />
            {isLoadingImages ? (
                // <div className="loading-container">
                //     <Spinner animation="border" role="status">
                //         <span className="sr-only">Loading...</span>
                //     </Spinner>
                // </div>
                <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  height: '70vh' 
                }}
              >
                <Loading />
              </div>

            ) : (
                <Container className="gallery-container">
                    <Row>
                        {filteredGallery.map((image, index) => (
                            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-3">
                                <Gcard
                                    title={image.name}
                                    data={image.data}
                                    onDelete={() => confirmDeleteImage(image._id)}
                                    onRename={() => handleRenameImage(image._id)}
                                />
                            </Col>
                        ))}
                    </Row>
                </Container>
            )}

            <Modal show={showRenameModal} onHide={() => setShowRenameModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Rename Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="text"
                        placeholder="Enter new name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowRenameModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleRenameSubmit} disabled={isRenamingImage}>
                        {isRenamingImage ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Rename'}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showPopUpCard} onHide={() => setShowPopUpCard(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Encrypt and Save Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Choose Image</Form.Label>
                            <div
                                className="dropzone"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => handleDrop(e, setImageFile)}
                            >
                                <p>Drag and drop an image file here, or click to select a file.</p>
                                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
                            </div>
                        </Form.Group>
                        {imageFile && (
                            <div className="preview-container">
                                <img src={URL.createObjectURL(imageFile)} alt="Preview" className="img-preview" />
                            </div>
                        )}
                        <Form.Group>
                            <Form.Label>Enter Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleEncryptImage}>Encrypt</Button>
                        {encryptedImage && (
                            <>
                                {downloadLink && (
                                    <a href={downloadLink} download="encrypted_image.txt" className="btn btn-success ml-2">
                                        Download Encrypted Image
                                    </a>
                                )}
                                
                               
                                <Button variant="primary" onClick={() => setShowSaveModal(true)}>Save to Gallery</Button>
                            </>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowPopUpCard(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showSaveModal} onHide={() => setShowSaveModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Save Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Image Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter image name"
                                value={saveName}
                                onChange={(e) => setSaveName(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleSaveClick} disabled={isAddingImage}>
                            {isAddingImage ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Save'}
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowSaveModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showConfirmDeleteModal} onHide={() => setShowConfirmDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isDeletingImage ? (
                         <div 
                         style={{ 
                           display: 'flex', 
                           justifyContent: 'center', 
                           alignItems: 'center', 
                           height: '70vh' 
                         }}
                       >
                         <Loading />
                       </div>
                    ) : (
                        <p>Are you sure you want to delete this image?</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmDeleteModal(false)} disabled={isDeletingImage}>No</Button>
                    <Button variant="danger" onClick={handleDeleteImage} disabled={isDeletingImage}>
                        {isDeletingImage ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Yes'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Gallery;
