import { useState } from 'react';
import axios from 'axios';

export default function BookForm({ book, onClose }: { book: any, onClose: () => void }) {
  const [formData, setFormData] = useState({ ...book });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (formData.id) {
      await axios.put(`http://localhost:3000/api/books/${formData.id}`, formData);
    } else {
      await axios.post('http://localhost:3000/api/books', formData);
    }
    onClose();
  };

  return (
    <div>
      <h3>{formData.id ? 'Edit Buku' : 'Tambah Buku'}</h3>
      <input name="name" placeholder="Nama Buku" value={formData.name || ''} onChange={handleChange} />
      <input name="category" placeholder="Kategori" value={formData.category || ''} onChange={handleChange} />
      <input name="publisher" placeholder="Penerbit" value={formData.publisher || ''} onChange={handleChange} />
      <input name="isbn" placeholder="ISBN" value={formData.isbn || ''} onChange={handleChange} />
      <input name="issn" placeholder="ISSN" value={formData.issn || ''} onChange={handleChange} />
      <input name="author" placeholder="Pembuat" value={formData.author || ''} onChange={handleChange} />
      <input name="year" placeholder="Tahun" type="number" value={formData.year || ''} onChange={handleChange} />
      <input name="price" placeholder="Harga" type="number" value={formData.price || ''} onChange={handleChange} />
      <textarea name="description" placeholder="Keterangan" value={formData.description || ''} onChange={handleChange} />
      <button onClick={handleSubmit}>Simpan</button>
      <button onClick={onClose}>Batal</button>
    </div>
  );
}
