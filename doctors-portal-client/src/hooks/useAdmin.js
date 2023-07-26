import { useEffect, useState } from "react"

const useAdmin = email => {

    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);

    useEffect(() => {

        if (email) {
            fetch(`https://doctors-portal-server-sujonhasan.vercel.app/users/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                    setIsAdmin(data.isAdmin);
                    console.log('use admin ', isAdmin);
                    console.log('use admin data ', data);
                    setIsAdminLoading(false)
                })
        }

    }, [email])

    return [isAdmin, isAdminLoading];
}

export default useAdmin;