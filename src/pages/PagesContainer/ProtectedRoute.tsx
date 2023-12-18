import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ token, children }: { token: string|null, children: React.ReactNode }) => {
    if (!token) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};
export default ProtectedRoute;