// import React from 'react'
// import { Link } from "react-router-dom"
// import Moment from 'react-moment';
// import { list } from 'postcss';
// import { FaCheck } from "react-icons/fa"


// export default function ListingItem({listing, id}) {
//   return (
//     <li className="relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]">
//         <Link to={`/category/${listing.type}/${id}`}>
//             {/* <img src="{listing.imgUrls[0]}" alt="" /> */}

//             {/* shows how many hours ago was the open_role created */}
//             <Moment 
//               className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg"
//               fromNow 
//             >
//                 {listing.timestamp?.toDate()}
//             </Moment>
            
//             <br />
//             <div className="w-full p-[10px]">
//                 <p className='font-semibold mb-[2px] text-lg'>{listing.Role_Name}</p>
//                 <div className='flex items-center space-x-1 '>
//                     <p><FaCheck className="h-4 w-4 text-green-600"/></p>
//                     <p> {listing.Skill_Name}</p>
//               </div>
//             </div>
//         </Link>
      
//     </li>
//   )
// }
