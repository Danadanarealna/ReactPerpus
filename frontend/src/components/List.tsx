import { useEffect, useState } from 'react';
import axios from 'axios';
import BookForm from './Form';

export default function BookList() {
  const [books, setBooks] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [editingBook, setEditingBook] = useState<any | null>(null);

  const fetchBooks = async () => {
    const res = await axios.get(`http://localhost:3000/api/books?search=${search}`);
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, [search]);

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:3000/api/books/${id}`);
    fetchBooks();
  };

  return (
    <div>
      <input placeholder="Cari buku..." value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={() => setEditingBook({})}>Tambah Buku</button>
      {editingBook && (
        <BookForm
          book={editingBook}
          onClose={() => {
            setEditingBook(null);
            fetchBooks();
          }}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Nama</th><th>Kategori</th><th>Penerbit</th><th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.name}</td>
              <td>{book.category}</td>
              <td>{book.publisher}</td>
              <td>
                <button onClick={() => setEditingBook(book)}>Edit</button>
                <button onClick={() => handleDelete(book.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
