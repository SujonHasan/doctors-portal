import { useEffect, useState } from "react"

const useToken = email => {

    const [token, setToken] = useState('');

    useEffect(() => {

        if (email) {
            fetch(`https://doctors-portal-server-sujonhasan.vercel.app/jwt?email=${email}`)
                .then(req => req.json())
                .then(data => {

                    if (data.accesstoken) {
                        localStorage.setItem('accessToken', data.accesstoken);
                        setToken(data.accesstoken);
                    }
                })
        }
    }, [email])

    return [token];
}

export default useToken;