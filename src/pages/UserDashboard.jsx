import React from 'react'

const UserDashboard = () => {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const mobile = localStorage.getItem("mobile");
  return (
    <>
      
<div className=" pt-5 mt-5">
<div className="card text-center pt-5 mt-5" style={{ border: '2px solid #3498db', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', maxWidth: '400px', margin: 'auto', paddingTop:"100px" }}>
    <div className="card-header" style={{ background: '#3498db', color: 'white', fontWeight: 'bold', borderBottom: '2px solid #2980b9' }}>
        User Details
    </div>
    <div className="card-body" style={{ background: '#ecf0f1', padding: '20px' }}>
        <h5 className="card-title" style={{ color: '#3498db' }}>Hello, {name}</h5>
        <p className="card-text">Email: <b>{email}</b></p>
        <p className="card-text">Contact Number: <b>{mobile}</b></p>
    </div>
    
</div>

</div>
      



    </>
  )
}

export default UserDashboard