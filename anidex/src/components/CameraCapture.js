import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const CameraCapture = () => {
    const webcamRef = useRef(null);
    const [image, setImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    // Capture image and automatically upload it
    const captureAndUpload = async () => {
        const capturedImage = webcamRef.current.getScreenshot();
        setImage(capturedImage);

        if (capturedImage) {
            setIsUploading(true); // Show uploading status
            try {
                // Convert Base64 image to Blob for uploading
                const blob = await fetch(capturedImage).then((res) => res.blob());
                const formData = new FormData();
                formData.append('image', blob, 'snake_image.jpg');

                const response = await axios.post('http://localhost:5000/api/snake/identify-image', formData);
                alert(`Snake identified: ${response.data.snake}`);
            } catch (error) {
                console.error('Error uploading image:', error);
                alert('Failed to upload image. Please try again.');
            } finally {
                setIsUploading(false); // Hide uploading status
            }
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2>Capture Snake Image</h2>
            
            {/* Webcam Feed */}
            {!image && (
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    style={{ width: '100%', maxWidth: '500px', margin: '0 auto', border: '1px solid #ccc' }}
                    videoConstraints={{
                        facingMode: 'environment', // Use back camera if available
                    }}
                />
            )}

            {/* Display Captured Image */}
            {image && (
                <img
                    src={image}
                    alt="Captured Snake"
                    style={{ width: '100%', maxWidth: '500px', margin: '10px auto', border: '1px solid #ccc' }}
                />
            )}

            {/* Buttons */}
            <div style={{ marginTop: '15px' }}>
                {!image ? (
                    <button
                        onClick={captureAndUpload}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                        disabled={isUploading}
                    >
                        {isUploading ? 'Uploading...' : 'Capture and Upload'}
                    </button>
                ) : (
                    <button
                        onClick={() => setImage(null)}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#f44336',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                        disabled={isUploading}
                    >
                        Retake Image
                    </button>
                )}
            </div>
        </div>
    );
};

export default CameraCapture;
