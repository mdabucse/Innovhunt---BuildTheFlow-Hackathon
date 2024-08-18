import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Sparkles } from 'lucide-react';
import { Button } from '../Button'; // Ensure Button component is correctly imported
import axios from 'axios';

const AnalyseAiModal = ({ isOpen, onClose, toolName }) => {
    const [result, setResult] = useState([]);

    useEffect(() => {
        if (isOpen && toolName) {
            fetchRecommendation();
        }
    }, [isOpen, toolName]);

    const fetchRecommendation = async () => {
        try {
            let res = await axios.post("http://127.0.0.1:5000/recommend", { "name": toolName });
            console.log("Data : ", res.data);

            if (res.data) {
                setResult(res.data); // Assuming res.data is an array of strings
            }
        } catch (error) {
            console.error("Error fetching recommendation:", error);
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Analyse AI Modal"
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1000,
                },
                content: {
                    width: '300px',
                    height: '200px',
                    margin: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    border: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'white',
                },
            }}
        >
            <h2>{toolName}</h2>
            <ol>
                {result.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ol>
            <Button size="sm" variant="premium" onClick={onClose}>
                Close <Sparkles className="h-4 w-4 fill-black text-black ml-2" />
            </Button>
        </Modal>
    );
};

export default AnalyseAiModal;
