import DashboardLayout from './_components/_layout';
import { AuthContextProvider } from '@/shared/context';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthContextProvider>
            <DashboardLayout>{children}</DashboardLayout>
        </AuthContextProvider>
    );
};

export default Layout;
