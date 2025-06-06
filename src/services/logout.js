import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '@/stores/authSlice';

export function useLogoutUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout());
    localStorage.removeItem('persist:root');
    navigate('/login');
  };

  return logoutUser;
}
