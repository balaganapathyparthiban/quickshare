import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"

const Download = () => {
    const { file } = useParams()
    const [loading, setLoading] = useState(true)
    const [fileInfo, setFileInfo] = useState<{
        expired: string,
        isPasswordProtected: boolean,
        message: string,
        title: string,
        path: string
    }>()

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/file/info?id=${file}`)
            .then(response => {
                setFileInfo({ ...response.data, path: response.data.path.split("/")[2] })
            }).finally(() => {
                setLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <div>
                <p className="text-white">Loading...</p>
            </div>
        )
    }

    return (
        <div className="w-full h-full flex flex-col bg-gray-800 text-white">
            <div className="px-6 py-4">
                <Header />
            </div>
            <div className="w-full h-[calc(100%-5rem)] overflow-hidden px-6 py-6 flex flex-row items-center justify-center">
                <div className="w-3/5 h-3/4 bg-white text-gray-800 shadow-lg rounded-lg p-6">
                    <p>{fileInfo?.path}</p>
                    <p>{fileInfo?.title}</p>
                    <p>{fileInfo?.message}</p>
                    <p>{fileInfo?.expired}</p>
                    <p>{fileInfo?.isPasswordProtected}</p>
                </div>
            </div>
            <div className="px-6 py-2">
                <Footer />
            </div>
        </div>
    )
}

export default Download