import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Dashboard } from "./pages/Dashboard"
import { RecoilRoot } from "recoil"
import { Profile } from "./pages/Profile"
import { Exports } from "./pages/Exports"
import { Analytics } from "./pages/Analytics"

function App() {


  return (
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/exports" element={<Exports/>}/>
            <Route path="/analytics" element={<Analytics/>}/>
          </Routes>
        </BrowserRouter>    
      </RecoilRoot>
  )
}
export default App
