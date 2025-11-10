export default function ServiceCard({ service, onEdit, onDelete, isAdmin }) {
  return (
    <div className="border p-4 rounded-lg bg-white shadow">
      <h2 className="text-lg font-semibold">{service.name}</h2>
      <p className="text-gray-500 text-sm mb-2">{service.category}</p>
      <p className="text-gray-700 mb-2">{service.description}</p>
      <span className="font-bold text-green-700">${service.price}</span>

      {isAdmin && (
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => onEdit(service)}
            className="px-3 py-1 bg-yellow-500 text-white rounded"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(service.id)}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}
