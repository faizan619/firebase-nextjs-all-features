import { AuthContextProvider } from "@/context/AuthContext"

export const metadata = {
    title:'authentication page',
}

export default function AuthLayout({children}){
    return(
        <html lang="en">
            <body>
                <AuthContextProvider>
                    {children}
                </AuthContextProvider>
            </body>
        </html>
    )
}