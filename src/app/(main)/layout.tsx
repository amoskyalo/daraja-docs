import { AuthContextProvider } from '@/context/auth-context';
import DashboardLayout from './_components/_layout';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthContextProvider>
            <DashboardLayout>{children}</DashboardLayout>
        </AuthContextProvider>
    );
};

export default Layout;
