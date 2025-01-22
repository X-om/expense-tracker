export const LandingGuard = ({children}) => {
    const token = localStorage.getItem("token");
    if(!token){
        return children
    }

    window.location.href = "/dashboard"
}