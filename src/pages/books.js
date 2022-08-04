import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import axios from '@/lib/axios'
import BookForm from '@/components/book/form'

const bookPage = () => {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, seteEror] = useState(null)

    const fetchBooks = async () => {
        // const { data } = await axios.get('http://localhost:8000/api/books')

        // // console.log(data.data)

        // // return data.data
        // setBooks(data.data)

        //cara efisien
        try {
            setLoading(true)
            const { data } = await axios.get('http://localhost:8000/api/books')

            setBooks(data.data)
        } catch (error) {
            seteEror(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBooks() //memberi tahu si react bahwa function ini hanya di jalan kan satu kali saat render page
    }, [])

    // Mmebuat function untuk memparsing data ke uinya
    const handleAddBook = ({ book }) => {
        setBooks(prev => [...prev, book])
    }

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
                            <BookForm handleAddBook={handleAddBook} />
                            {loading
                                ? 'Loading....'
                                : books.map(book => (
                                      <div className=" mt-6">
                                          <p key={book.id}>
                                              {book.id} | {book.name}
                                          </p>
                                      </div>
                                  ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default bookPage
