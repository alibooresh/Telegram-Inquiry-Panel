// src/context/ErrorContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ErrorContextProps {
    showError: (message: string) => void;
}

const ErrorContext = createContext<ErrorContextProps | undefined>(undefined);

export const useError = () => {
    const context = useContext(ErrorContext);
    if (!context) throw new Error("useError must be used within ErrorProvider");
    return context;
};

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [error, setError] = useState<string | null>(null);

    const showError = (message: string) => {
        setError(message);
    };

    const handleClose = () => setError(null);

    return (
        <ErrorContext.Provider value={{ showError }}>
            {children}
            {error && (
                <div
                    style={{
                        position: "fixed",
                        bottom: 20,
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 9999,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#d32f2f",
                            color: "#fff",
                            padding: "12px 24px",
                            borderRadius: 8,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                            cursor: "pointer",
                        }}
                        onClick={handleClose}
                    >
                        {error}
                    </div>
                </div>
            )}
        </ErrorContext.Provider>
    );
};
