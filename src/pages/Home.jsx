import { React, useContext } from 'react'
import { AuthContext }  from '../components/AuthContext';

export default function Home() {     
    const { token } = useContext(AuthContext);
    console.log(token)

    return (
        <div>
            {token ? (
                <div>
                    {Object.entries(token[0]).map(([key, value]) => (
                        <p key={key}>
                            {key}: {value}
                        </p>
                    ))}
                    <div className="">Home</div>
                </div>
            ) : (
                <div>
                <p>You are not authenticated.</p>
                </div>
            )}

        </div>
    )
}
