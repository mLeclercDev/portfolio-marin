import React, { createContext, useContext, useState } from 'react';
import ContactPanel from '../ContactPanel';

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);
  const toggleContact = () => setIsContactOpen(prev => !prev);

  return (
    <ContactContext.Provider value={{ isContactOpen, openContact, closeContact, toggleContact }}>
      {children}
      <ContactPanel isOpen={isContactOpen} onClose={closeContact} />
    </ContactContext.Provider>
  );
};

export const useContact = () => {
  return useContext(ContactContext);
};
