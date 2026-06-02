import React, { createContext, useContext, useState, useEffect } from 'react';
import { Registration, INITIAL_REGISTRATIONS } from '../const';

interface RegistrationContextType {
  registrations: Registration[];
  addRegistration: (reg: Omit<Registration, 'id' | 'createdAt'>) => void;
  deleteRegistration: (id: string) => void;
  clearAll: () => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('west_journey_registrations');
    if (stored) {
      try {
        setRegistrations(JSON.parse(stored));
      } catch (e) {
        setRegistrations(INITIAL_REGISTRATIONS);
      }
    } else {
      setRegistrations(INITIAL_REGISTRATIONS);
      localStorage.setItem('west_journey_registrations', JSON.stringify(INITIAL_REGISTRATIONS));
    }
  }, []);

  const addRegistration = (reg: Omit<Registration, 'id' | 'createdAt'>) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const prefix = reg.schoolType === 'ling-liang' ? 'LL' : 'KL';
    const count = registrations.filter(r => r.schoolType === reg.schoolType).length + 1;
    const id = `${prefix}-${String(count).padStart(3, '0')}`;

    const newReg: Registration = {
      ...reg,
      id,
      createdAt: formattedDate
    };

    const updated = [newReg, ...registrations];
    setRegistrations(updated);
    localStorage.setItem('west_journey_registrations', JSON.stringify(updated));
  };

  const deleteRegistration = (id: string) => {
    const updated = registrations.filter(r => r.id !== id);
    setRegistrations(updated);
    localStorage.setItem('west_journey_registrations', JSON.stringify(updated));
  };

  const clearAll = () => {
    setRegistrations([]);
    localStorage.setItem('west_journey_registrations', JSON.stringify([]));
  };

  return (
    <RegistrationContext.Provider value={{ registrations, addRegistration, deleteRegistration, clearAll }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistrations = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistrations must be used within a RegistrationProvider');
  }
  return context;
};
