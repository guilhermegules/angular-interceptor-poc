import { User } from './../models/user.interface';

const usersData: User[] = [];

localStorage.setItem('users', JSON.stringify(usersData));

export default usersData;
