'use client';
import { useState } from 'react';
import BaseButton from '../BaseButton/BaseButton';

const ContactForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [charCount, setCharCount] = useState(0);

  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [bodyError, setBodyError] = useState('');

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const validateFullName = () => {
    if (fullName.length < 3) {
      setFullNameError('Full name must be at least 3 characters');
      return false;
    }
    setFullNameError('');
    return true;
  };

  const validateEmail = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Invalid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validateBody = () => {
    if (body.length < 3) {
      setBodyError('Body must be at least 3 characters');
      return false;
    }
    if (body.length > 200) {
      setBodyError('Body cannot be no more than 200 characters');
      return false;
    }
    setBodyError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateFullName() && validateEmail() && validateBody()) {
      setFullName('');
      setEmail('');
      setSubject('');
      setBody('');
      setCharCount(0);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 10000);
    } else {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 5000);
    }
  };

  const handleBodyChange = (e) => {
    const value = e.target.value;
    if (value.length <= 200) {
      setBody(value);
      setCharCount(value.length);
    }
  };

  return (
    <div className="mx-2 flex justify-center">
      <div className="my-10 max-w-128 p-20 shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="md:w-0-auto mx-2 flex w-72 flex-col"
        >
          <h1>Contact</h1>
          <div>
            <input
              type="text"
              value={fullName}
              placeholder="Enter full name (min 3 characters)"
              className="my-2 w-full rounded p-2 shadow-md"
              onChange={(e) => setFullName(e.target.value)}
            />
            <div>
              {fullNameError && (
                <span className="text-red">{fullNameError}</span>
              )}
            </div>
          </div>
          <div>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              className="my-2 w-full rounded p-2 shadow-md"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>
              {emailError && <span className="text-red">{emailError}</span>}
            </div>
          </div>
          <div>
            <input
              type="text"
              value={subject}
              placeholder="Enter the subject"
              className="my-2 w-full rounded p-2 shadow-md"
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div>
            <textarea
              placeholder="Enter your message (max 200 characters)"
              value={body}
              className="mt-2 h-48 w-full rounded p-2 shadow-md"
              onChange={handleBodyChange}
              maxLength={200}
            />
            <div className="mb-4 text-right text-sm text-blue">
              {charCount}/200
            </div>
            <div>
              {bodyError && (
                <span className="text-center text-red">{bodyError}</span>
              )}
            </div>
          </div>
          <div className="text-end">
            <BaseButton type="submit">Send</BaseButton>
          </div>
          {showSuccessMessage && (
            <div className="mt-4 text-center text-green-500">
              Message sent successfully!
            </div>
          )}
          {showErrorMessage && (
            <div className="mt-4 text-center text-red">
              Please correct the errors above.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
