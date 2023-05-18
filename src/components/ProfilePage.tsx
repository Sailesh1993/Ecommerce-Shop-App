import { FC} from 'react';
import { useSelector } from 'react-redux';
import { User } from '../types/User';
import { AppState } from '../types/AppState';


const ProfilePage: FC = () => {
    const user = useSelector<AppState, User | null>(state => state.user);
  
    if (!user) {
      return <div>Please log in to view your profile</div>;
    }
  
    return (
      <div>
        <h1>Profile Page</h1>
        <p>Welcome, {user.name}!</p>
        <p>Email: {user.email}</p>
      </div>
    );
  };
  export default ProfilePage