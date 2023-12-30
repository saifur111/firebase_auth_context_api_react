import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const PrivateOutlet = () => {
    const {user, loading} = useUserContext();
    if(loading){
       return <div>Loading....</div>
    }
    return user ? <Outlet/> : <Navigate to='/login'></Navigate>
  
}
export default PrivateOutlet