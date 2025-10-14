import { createContext, useContext, Dispatch, SetStateAction, useMemo, useState } from 'react';

export type VersionManagerContextType = {
    version: string;
    mappedVersion: string;
    setVersion: Dispatch<SetStateAction<string>>;
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
    const [version, setVersion] = useState(DEFAULT_VERSION);

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
