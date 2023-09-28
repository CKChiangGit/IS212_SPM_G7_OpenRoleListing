import React from 'react'
import { useState } from "react";

export default function CreateRole() {

    const [formData, setFormData] = useState({
        type: "rent",
        name: "",
        description: "",
        // bedrooms: 1,
        // bathrooms: 1,
        // parking: false,
        // furnished: false,
        // address: "",
        // description: "",
        // offer: false,
        // regularPrice: 0,
        // discountedPrice: 0,
        // latitude: 0,
        // longitude: 0,
        // images: {},
      });
      const {
        type,
        name,
        description,
        bedrooms,
        bathrooms,
        parking,
        address,
        furnished,
        offer,
        regularPrice,
        discountedPrice,
        latitude,
        longitude,
        images,
      } = formData;

    function onChange(e) {
        // let boolean = null;
        // if (e.target.value === "true") {
        //   boolean = true;
        // }
        // if (e.target.value === "false") {
        //   boolean = false;
        // }
        // // Files
        // if (e.target.files) {
        //   setFormData((prevState) => ({
        //     ...prevState,
        //     images: e.target.files,
        //   }));
        // }
        // // Text/Boolean/Number
        // if (!e.target.files) {
        //   setFormData((prevState) => ({
        //     ...prevState,
        //     [e.target.id]: boolean ?? e.target.value,
        //   }));
        // }
      }

    return (
        <main className="max-w-md px-2 mx-auto">
            <h1 className="text-3xl text-center mt-6 font-bold">Create a Listing</h1>
            <form>
                {/* <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
                <div className="flex">
                    <button
                        type="button"
                        id="type"
                        value="sale"
                        onClick={onChange}
                        className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                        type === "rent"
                            ? "bg-white text-black"
                            : "bg-slate-600 text-white"
                        }`}
                    >
                        sell
                    </button>
                    <button
                        type="button"
                        id="type"
                        value="rent"
                        onClick={onChange}
                        className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                        type === "sale"
                            ? "bg-white text-black"
                            : "bg-slate-600 text-white"
                        }`}
                    >
                        rent
                    </button>
                </div> */}

                <p className="text-lg mt-6 font-semibold">Role Name</p>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={onChange}
                    placeholder="Name"
                    maxLength="32"
                    minLength="4"
                    required
                    className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
                />
                <p className="text-lg mt-6 font-semibold">Role Description</p>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={onChange}
                    placeholder="Description"
                    maxLength="32"
                    minLength="4"
                    required
                    className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
                />

                <div className="flex w-full justify-between">
                    <div className="">
                        <p className="text-lg mt-6 font-semibold">From</p>
                        <input
                            type="date"
                            id="listing_open"
                            value="listing_open"
                            onClick={onChange}
                            className="mr-3 px-7 py-3 text-gray-700 bg-white border border-gray-300 font-medium text-sm uppercase rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full"
                        />
                    </div>
                    <div className="">
                        <p className="text-lg mt-6 font-semibold">Till</p>
                        <input
                            type="date"
                            id="listing_close"
                            value="listing_close"
                            onClick={onChange}
                            className="mr-3 px-7 py-3  text-gray-700 bg-white border border-gray-300 font-medium text-sm uppercase rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full"
                        />
                    </div>
                </div>

                {/* <div className="flex space-x-6 mb-6">
                    <div>
                        <p className="text-lg font-semibold">Beds</p>
                        <input
                            type="number"
                            id="bedrooms"
                            value={bedrooms}
                            onChange={onChange}
                            min="1"
                            max="50"
                            required
                            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                        />
                    </div>
                    <div>
                        <p className="text-lg font-semibold">Baths</p>
                        <input
                            type="number"
                            id="bathrooms"
                            value={bathrooms}
                            onChange={onChange}
                            min="1"
                            max="50"
                            required
                            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                        />
                    </div>
                </div> */}
                <button
                    type="submit"
                    className="my-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                    Create Role
                </button>
            </form>
        </main>
    )
}
