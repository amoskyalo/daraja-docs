import { createContext, useContext, Dispatch, SetStateAction, useMemo, useState, useCallback } from 'react';

export type VersionManagerContextType = {
    version: string;
    mappedVersion: string;
    setVersion: (version: string) => void;
};

const VersionManagerContext = createContext<VersionManagerContextType>({
    version: 'v2',
    mappedVersion: '2.0',
    setVersion: () => {},
});

const DEFAULT_VERSION = 'v2';

export const MAPPED_VERSIONS = {
    v2: '2.0',
    v3: '3.0',
};

export const VersionManagerContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [version, setVersionState] = useState(DEFAULT_VERSION);

    const setVersion = useCallback((newVersion: string) => {
        setVersionState(newVersion);
    }, []);

    const values = useMemo(
        () => ({ version, mappedVersion: MAPPED_VERSIONS[version as keyof typeof MAPPED_VERSIONS], setVersion }),
        [version, setVersion],
    );
    return <VersionManagerContext.Provider value={values}>{children}</VersionManagerContext.Provider>;
};

export const useVersionManager = () => {
    const context = useContext<VersionManagerContextType>(VersionManagerContext);
    if (!context) {
        throw new Error('useVersionManager must be used within a VersionManagerContextProvider');
    }
    return context;
};
