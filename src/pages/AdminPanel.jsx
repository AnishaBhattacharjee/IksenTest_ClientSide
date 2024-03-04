import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Fetchuser } from '../redux/slice/AdminSlice'

const AdminPanel = () => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const mobile = localStorage.getItem("mobile");
    const { user_data } = useSelector((state) => state?.adminData)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(Fetchuser())
    }, [dispatch]);

    console.log(user_data);
    return (
        <>
            <div style={{ display: 'flex', minHeight: '100vh' }}>
                <aside style={{ width: '300px', background: '#2c3e50', padding: '20px', color: 'white' }}>
                    <h2>{name}</h2>
                    <ul style={{ listStyle: 'none', padding: '0' }}>
                        <li style={{ margin: '10px 0' }}>{email}</li>
                        <li style={{ margin: '10px 0' }}>{mobile}</li>
                    </ul>
                </aside>
                <main style={{ flex: '1', padding: '20px' }}>
                    <h1>Welcome to the Admin Panel</h1><br />
                    <hr />
                    <h3>User Details</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>ID</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Email</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Contact Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user_data?.map((item, index) => {
                                    return (
                                        <>
                                            <tr key={index}>
                                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
                                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.name}</td>
                                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.email}</td>
                                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.mobile}</td>
                                            </tr>
                                        </>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </main>
            </div>

        </>
    )
}

export default AdminPanel