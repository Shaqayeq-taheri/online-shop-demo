import { Outlet,Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

function PrivateRoutes() {

    const { currentUser } = useSelector((state) => state.user);
  return  currentUser ? <Outlet/> : <Navigate to='/signin' replace/>
}

export default PrivateRoutes
