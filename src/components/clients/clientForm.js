import React, { useState } from 'react';
import axios from 'axios';

const EmailForm = () => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('email', email);
        formData.append('subject', subject);
        formData.append('message', message);
        formData.append('file', file);

        try {
            await axios.post('/api/send-email', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Error sending email');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='text-white'>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" required />
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" required />
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button type="submit" className='text-white'>Send Email</button>
        </form>
    );
};

export default EmailForm;