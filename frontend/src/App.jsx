import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Dashboard } from "./pages/Dashboard"
import { RecoilRoot } from "recoil"
import { Profile } from "./pages/Profile"
import { Exports } from "./pages/Exports"
import { Analytics } from "./pages/Analytics"
import RouteGuard from "./components/RouteGuard"
import { Landing } from "./pages/Landing"
import { LandingGuard } from "./components/LandingGuard"
import MobileGuard from "./components/MobileGuard"

function App() {


  return (
    <RecoilRoot>
      <BrowserRouter>
        <MobileGuard>
          <Routes>
            <Route path="/" element={<LandingGuard><Landing/></LandingGuard>}/>
            <Route path="/signup" element={<LandingGuard><Signup/></LandingGuard>} />
            <Route path="/signin" element={<LandingGuard><Signin/></LandingGuard>} />
            <Route path="/dashboard" element={<RouteGuard><Dashboard /></RouteGuard>} />
            <Route path="/profile" element={<RouteGuard><Profile /></RouteGuard>} />
            <Route path="/exports" element={<RouteGuard><Exports /></RouteGuard>} />
            <Route path="/analytics" element={<RouteGuard><Analytics /></RouteGuard>} />
          </Routes>
        </MobileGuard>
      </BrowserRouter>
    </RecoilRoot>
  )
}
export default App
