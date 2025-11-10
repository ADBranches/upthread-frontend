import { useState } from "react"

export default function ServiceForm({ initialData = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
    price: initialData.price || "",
    category: initialData.category || "",
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Service name"
        className="border p-2 w-full mb-2 rounded"
        required
      />
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        className="border p-2 w-full mb-2 rounded"
      />
      <input
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        className="border p-2 w-full mb-2 rounded"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="border p-2 w-full mb-2 rounded"
      />
      <div className="flex gap-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Save
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  )
}
