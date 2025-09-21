import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [needsUpdate, setNeedsUpdate] = useState(false);
    const [currentName, setCurrentName] = useState('');
    const [userId, setUserId] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userImage, setUserImage] = useState('');

        
    useEffect(() => {

        const token = localStorage.getItem('token');
        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        const checkAuth = async () => {
            try {
                const response = await fetch('https://www.yahalawa.net/api/diet/check-auth', {
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                      },
                },);

                const data = await response.json();
                setUserId(data.user?.id || '');
                setCurrentName(data.user?.name || '');
                setUserPhone(data.user?.phone_number || '');
                setUserImage(data.user?.image || '');
                setIsAuthenticated(data.isAuthenticated);

            } catch (error) {
                console.error('Error checking auth:', error);
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);

    

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            needsUpdate, 
            setNeedsUpdate,
            currentName,
            setCurrentName,
            userId,
            userPhone,
            setUserImage,
            userImage,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};