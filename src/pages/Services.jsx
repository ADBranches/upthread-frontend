import { useEffect, useState } from "react"
import { serviceService } from "../services/serviceService"
import { useAuthStore } from "../store/useAuthStore"
import ServiceForm from "../services/ServiceForm"
import ServiceCard from "../services/ServiceCard"

export default function Services() {
  const [services, setServices] = useState([])
  const [editing, setEditing] = useState(null)
  const [creating, setCreating] = useState(false)
  const { user } = useAuthStore()

  const loadServices = async () => setServices(await serviceService.list())

  useEffect(() => { loadServices() }, [])

  const handleCreate = async (data) => {
    await serviceService.create(data)
    await loadServices()
    setCreating(false)
  }

  const handleUpdate = async (data) => {
    await serviceService.update(editing.id, data)
    await loadServices()
    setEditing(null)
  }

  const handleDelete = async (id) => {
    if (confirm("Delete this service?")) {
      await serviceService.remove(id)
      await loadServices()
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Service Catalog</h1>
        {user?.role === "admin" && (
          <button
            onClick={() => setCreating(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Service
          </button>
        )}
      </div>

      {creating && (
        <ServiceForm
          onSubmit={handleCreate}
          onCancel={() => setCreating(false)}
        />
      )}

      {editing && (
        <ServiceForm
          initialData={editing}
          onSubmit={handleUpdate}
          onCancel={() => setEditing(null)}
        />
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s) => (
          <ServiceCard
            key={s.id}
            service={s}
            onEdit={setEditing}
            onDelete={handleDelete}
            isAdmin={user?.role === "admin"}
          />
        ))}
      </div>
    </div>
  )
}
