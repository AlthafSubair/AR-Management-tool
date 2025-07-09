import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage"
import HomePage from "./pages/HomePage";
import EditPage from "./pages/EditPage";
import { NotFound } from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {


  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><LoginPage /></ProtectedRoute>}/>
         <Route path="/home" element={ <ProtectedRoute><HomePage /></ProtectedRoute>}/>
         <Route path="/edit" element={ <ProtectedRoute><EditPage /></ProtectedRoute>} />
         <Route path="*" element={<NotFound />} />
      </Routes>
     </Router>
    </>
  )
}

export default App
