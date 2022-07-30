import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import axios from '@/lib/axios'

const bookPage = () => {
    const [books, setBooks] = useState([])
    const fetchBooks = async () => {
        const { data } = await axios.get('http://localhost:8000/api/books')

        // console.log(data.data)

        // return data.data
        setBooks(data.data)
    }

    useEffect(() => {
        fetchBooks() //memberi tahu si react bahwa function ini hanya di jalan kan satu kali saat render page
    }, [])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }>
            <Head>
                <title>Laravel - Books</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {books.map(book => (
                                <p key={book.id}>
                                    {book.id} | {book.name}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default bookPage
