import React from 'react'
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { getAuth, updateProfile } from "firebase/auth";
// import { collection, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore"
// import { db } from "../firebase"
import ListingItem from "../components/ListingItem";
// import Table from 'react-bootstrap/Table';
import Table from "../components/Table";
import tableData1 from "../tableData1.json";
import { RiChatNewFill } from "react-icons/ri";
import { AuthContext } from '../hooks/AuthContext';



export default function Profile() {
    const navigate = useNavigate()

    // get login token from local storage
    const storedToken = localStorage.getItem('token');
    const token = storedToken ? JSON.parse(storedToken)[0] : null;
    console.log(JSON.stringify(token))

    const [formData, setFormData] = useState({
            name: token.fname + token.lname,
            email: token.email,
        })
    const {name, email} = formData

    const { logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout();
        navigate('/');
      };

    const columns = [
        { label: "Full Name", accessor: "full_name", sortable: true },
        { label: "Email", accessor: "email", sortable: false },
        { label: "Gender", accessor: "gender", sortable: true, sortbyOrder: "desc" },
        { label: "Age", accessor: "age", sortable: true },
        { label: "Start date", accessor: "start_date", sortable: true },
    ];

    // // FIREBASE AUTHENTICATION START HERE
    // const auth = getAuth()
    // const [formData, setFormData] = useState({
    //     // name: "test",
    //     // email: "test@gmail.com"
    //     name: auth.currentUser.displayName,
    //     email: auth.currentUser.email,
    // })

    // // Log out function
    // function logOut(){
    //     auth.signOut()
    //     navigate('/')
    // }

    // const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     async function fetchRoleList() {
    //         // query firebase collection
    //         const roleListRef = collection(db, "open_roles")
            
    //         // const q  = query(
    //         //     roleListRef
    //         // )
    //         // console.log(q)

    //         // query to find only user submitted open roles
    //         console.log(auth.currentUser.uid)
    //         const qUser  = query(
    //             roleListRef, 
    //             where("userID", "==", auth.currentUser.uid),
    //             orderBy("timestamp")
    //         )

    //         const querySnap = await getDocs(qUser)
    //         let listings = []
    //         querySnap.forEach((doc) => {
    //             return listings.push({
    //                 id: doc.id,
    //                 data: doc.data(),
    //             })
    //         })
    //         setListings(listings)
    //         setLoading(false)
    //     }
    //     fetchRoleList()

    //     console.log(JSON.stringify(tableData1) + " is defaultTableData")
    // }, [auth.currentUser.uid])
    // console.log(listings)
    // // FIREBASE AUTHENTICATION ENDS HERE

    // // connection to ConnectionManger.js
    // const { register, handleSubmit } = useForm();
    // const [error, setError] = useState('');
    // const [loading, setLoading] = useState(false);
    // const { currentUser } = useAuth();
    // const history = useHistory();
    // const BASE_URL = "mysql://root:@localhost:3306/spm"

    // const onSubmit = async (data) => {
    // try {
    //     setLoading(true);
    //     setError('');
    //     const response = await axios.post(`${BASE_URL}/listings`, {
    //     ...data,
    //     userId: currentUser.uid,
    //     });
    //     console.log(response.data);
    //     history.push('/');
    // } catch (error) {
    //     console.error(error);
    //     setError('Failed to create listing');
    // }
    // setLoading(false);
    // };

    return (
        <div>
            <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
                <h1 className='text-3xl text-center mt-6 font-bold'>
                    Profile
                </h1>
                <div className="w-full md:w-[50%] mt-6 px-3">
                    <form action="">
                        {/* name input */}
                        <label className="w-full">
                            Username
                            <input type="text" 
                                id="name" 
                                value={name}
                                disabled 
                                className="mb-2 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
                            />
                        </label>
                        

                        {/* email input */}
                        <label className="w-full">
                            Email
                            <input type="email" 
                                id="email"
                                value={email}
                                disabled 
                                className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
                            />
                        </label>

                        <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
                            <p className="flex items-center ">
                                Do you want to change your username?
                                <span                               
                                    className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
                                >
                                Edit
                                </span>
                            </p>
                            <p
                                onClick={handleLogout}
                                className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer"
                            >
                                Sign out
                            </p>
                        </div>
                        
                    </form>

                    <button type="submit" className='w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-800 transition duration-150 ease-in-out hover:shadow-lg'>
                        <Link 
                            to="/create-role"
                            className="flex justify-center items-center"
                        >
                            <RiChatNewFill className="mr-2 text-3xl bg-blue-500 rounded-full p-1 border-2"/>
                            Create role
                        </Link>
                        
                    </button>
                </div>
            </section>

            <div className="max-w-6xl px-3 mt-6 mx-auto">
                {/* {!loading && listings.length > 0 && (
                <>
                    <h2 className="text-2xl text-center font-semibold mb-6">
                        My Listings
                    </h2>
                    <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                        {listings.map((listing) => (
                            <ListingItem
                            key={listing.id}
                            id={listing.id}
                            listing={listing.data}
                            // onDelete={() => onDelete(listing.id)}
                            // onEdit={() => onEdit(listing.id)}
                            />
                        ))}
                    </ul>

                </>
                )} */}
                <Table
                        caption="Developers currently enrolled in this course. The table below is ordered (descending) by the Gender column."
                        data={tableData1}
                        columns={columns}
                />
            </div>

        </div>
    )
}
