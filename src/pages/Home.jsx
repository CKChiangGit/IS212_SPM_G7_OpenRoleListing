import { React } from 'react'

export default function Home() {     
    const storedToken = localStorage.getItem('token');
    const token = storedToken ? JSON.parse(storedToken)[0] : null;
    // console.log(JSON.stringify(token))

    return (
        <div>
            {token ? (
                <div>
                    {Object.entries(token).map(([key, value]) => (
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
