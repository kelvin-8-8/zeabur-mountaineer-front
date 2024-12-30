import React, {useState, useEffect} from 'react'
import { getAllUser, upgradeUser } from '../services/UserService';

export default function AdminPage() {

    const ROLE_LABELS = {
		"ROLE_GUEST": "User",
		"ROLE_MEMBER": "Member",
		"ROLE_ADMIN": "Admin"
	};

    const [users, setUsers] = useState([])
    const [filterUsers, setFilterUsers] = useState(users);
    const [roleFilters, setRoleFilters] = useState(['ROLE_GUEST', 'ROLE_MEMBER', 'ROLE_ADMIN']);


    const loadUser = async() => {
        try {
            const result = await getAllUser();
            setUsers(result.data);
            setFilterUsers(result.data);
            console.log(filterUsers);
            

        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

    useEffect(() => {
    
        console.log("roleFilter的長度" + roleFilters.length);
        setFilterUsers(users.filter((user) => roleFilters.includes(user.role)));

    }, [roleFilters, users]); 

    const handleRoleFilter = (role) => {
        setRoleFilters((prev) => {

            if (role === 'ALL') {
                return prev.length === 3 ? [] : ['ROLE_GUEST', 'ROLE_MEMBER', 'ROLE_ADMIN'];
            }
            if (prev.includes(role)) {
                // 移除已存在的篩選條件
                return prev.filter((s) => s !== role);
            }
            // 新增篩選條件
            return [...prev, role];
        });
    };

    const handleUpgrade = async(userId) => {
        try {
            const result = await upgradeUser(userId);
            
            loadUser();
            return result.data;
        } catch (error) {
            console.error("Error upgrading user:", error);
        }
    }

  return (
    <div className='flex flex-col items-center justify-center'>
            <div className='flex flex-row flex-wrap justify-center items-center content-center max-w-screen-xl'>
                <div className="card p-4 bg-base-100 rounded-md flex flex-wrap flex-row justify-center gap-6">
                    <input type="button" value="All" className={`btn btn-xs md:btn-md ${roleFilters.length === 3 ? 'text-warning' : ''}`} onClick={() => handleRoleFilter('ALL')}/>
                    <input type="button" value="User" className={`btn btn-xs md:btn-md ${roleFilters.includes('ROLE_GUEST') ? 'text-warning' : ''}`} onClick={() => handleRoleFilter('ROLE_GUEST')}/>
                    <input type="button" value="Member" className={`btn btn-xs md:btn-md ${roleFilters.includes('ROLE_MEMBER') ? 'text-warning' : ''}`} onClick={() => handleRoleFilter('ROLE_MEMBER')}/>
                    <input type="button" value="Admin" className={`btn btn-xs md:btn-md ${roleFilters.includes('ROLE_ADMIN') ? 'text-warning' : ''}`} onClick={() => handleRoleFilter('ROLE_ADMIN')}/>
                </div>

                <div className="divider"></div>


                <div className='text-center min-h-800px w-full'>
                    <div className="relative overflow-x-auto">
                        <table className="table table-xs sm:table w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Real name</th>
                                    <th>username</th>
                                    <th>email</th>
                                    <th>role</th>
                                    <th></th>
                                </tr>
                            </thead>
                            {/* body */}
                            <tbody>
                                {/* row 1 */}
                                {
                                    filterUsers.map( (item) => (
                                        <tr className='hover' key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.trueName}</td>
                                            <td>{item.username}</td>
                                            <td>{item.email}</td>
                                            <td>{item.role}</td>
                                            <td>
                                                <input
                                                    type="button"
                                                    value="Upgrade"
                                                    className="btn btn-xs btn-outline btn-success sm:btn-sm"
                                                    onClick={() => handleUpgrade(item.id)}
                                                />
                                                {/* <input
                                                    type="button"
                                                    value="DISMISS"
                                                    className="btn btn-outline btn-error btn-sm mx-2"
                                                    onClick={() => handleDismiss(item.id)}
                                                /> */}
                                            </td>
                                        </tr>
                                    ))
                                }
                            
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
