import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import { getAuth, updateProfile } from "firebase/auth";
import { collection, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore"
import { db } from "../firebase"
import ListingItem from "../components/ListingItem";


export default function Profile() {
    const auth = getAuth()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        // name: "test",
        // email: "test@gmail.com"
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    })
    const {name, email} = formData

    // Log out function
    function logOut(){
        auth.signOut()
        navigate('/')
    }

    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchRoleList() {
            // query firebase collection
            const roleListRef = collection(db, "open_roles")
            
            // const q  = query(
            //     roleListRef
            // )
            // console.log(q)

            // query to find only user submitted open roles
            console.log(auth.currentUser.uid)
            const qUser  = query(
                roleListRef, 
                where("userID", "==", auth.currentUser.uid),
                orderBy("timestamp")
            )

            const querySnap = await getDocs(qUser)
            let listings = []
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setListings(listings)
            setLoading(false)
        }
        fetchRoleList()
      }, [auth.currentUser.uid])
      console.log(listings)

    return (
        <div>
            <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
                <h1 className='text-3xl text-center mt-6 font-bold'>
                    Profile
                </h1>
                <div className="w-full md:w-[50%] mt-6 px-3">
                    <form action="">
                        {/* name input */}
                        <label>
                            Username
                            <input type="text" 
                                id="name" 
                                value={name}
                                disabled 
                                className="mb-2 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
                            />
                        </label>
                        

                        {/* email input */}
                        <label>
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
                                onClick={logOut}
                                className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer"
                            >
                                Sign out
                            </p>
                        </div>
                        
                    </form>
                </div>
            </section>

            <div className="max-w-6xl px-3 mt-6 mx-auto">
                {!loading && listings.length > 0 && (
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
                )}
            </div>

        </div>
    )
}
