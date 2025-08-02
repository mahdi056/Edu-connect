'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      const res = await axios.patch(`http://localhost:5000/users/${id}`, { role });

      if (res.data.modifiedCount > 0) {
        MySwal.fire({
          icon: 'success',
          title: `User is now ${role}`,
          timer: 1500,
          showConfirmButton: false,
        });
        fetchUsers(); // refresh users
      }
    } catch (err) {
      console.error('Error updating role:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-200">
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name || 'N/A'}</td>
                <td>{user.email}</td>
                <td>{user.role || 'user'}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleRoleChange(user._id, 'admin')}
                    className="btn btn-sm btn-success"
                    disabled={user.role === 'admin'}
                  >
                    Make Admin
                  </button>
                  <button
                    onClick={() => handleRoleChange(user._id, 'user')}
                    className="btn btn-sm btn-warning"
                    disabled={user.role === 'user' || !user.role}
                  >
                    Make User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
