import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";

type Ticket = {
  id: number;
  title: string;
  description: string;
  createdBy: string;
  assignedTo: string;
};

const initialTickets: Ticket[] = [
  {
    id: 1,
    title: "Fix login bug",
    description: "Users cannot login with Google.",
    createdBy: "Alice",
    assignedTo: "Bob",
  },
  {
    id: 2,
    title: "Update dashboard UI",
    description: "Redesign dashboard for better UX.",
    createdBy: "Charlie",
    assignedTo: "Dana",
  },
];

export const Admin = () => {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    createdBy: "",
    assignedTo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setForm({ title: "", description: "", createdBy: "", assignedTo: "" });
    setEditId(null);
    setShowForm(true);
  };

  const handleEdit = (ticket: Ticket) => {
    setForm({
      title: ticket.title,
      description: ticket.description,
      createdBy: ticket.createdBy,
      assignedTo: ticket.assignedTo,
    });
    setEditId(ticket.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setTickets(tickets.filter((t) => t.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      setTickets(
        tickets.map((t) =>
          t.id === editId ? { ...t, ...form, id: editId } : t
        )
      );
    } else {
      setTickets([
        ...tickets,
        { ...form, id: Date.now() } as Ticket,
      ]);
    }
    setShowForm(false);
    setForm({ title: "", description: "", createdBy: "", assignedTo: "" });
    setEditId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-lg rounded-xl border border-gray-200">
          <CardHeader className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-indigo-700">Admin Ticket Panel</h2>
            <Button
              className="flex items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={handleAdd}
            >
              <AiOutlinePlus /> Add Ticket
            </Button>
          </CardHeader>
          <CardContent>
            {showForm && (
              <form className="space-y-4 mb-6" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="title" className="text-indigo-700">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-indigo-700">Description</Label>
                  <Input
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="createdBy" className="text-indigo-700">Created By</Label>
                  <Input
                    id="createdBy"
                    name="createdBy"
                    value={form.createdBy}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="assignedTo" className="text-indigo-700">Assigned To</Label>
                  <Input
                    id="assignedTo"
                    name="assignedTo"
                    value={form.assignedTo}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700">
                    {editId ? "Update" : "Add"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-indigo-100">
                    <th className="p-2 font-semibold">Title</th>
                    <th className="p-2 font-semibold">Description</th>
                    <th className="p-2 font-semibold">Created By</th>
                    <th className="p-2 font-semibold">Assigned To</th>
                    <th className="p-2 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket.id} className="border-b">
                      <td className="p-2">{ticket.title}</td>
                      <td className="p-2">{ticket.description}</td>
                      <td className="p-2">{ticket.createdBy}</td>
                      <td className="p-2">{ticket.assignedTo}</td>
                      <td className="p-2 flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-1"
                          onClick={() => handleEdit(ticket)}
                        >
                          <AiOutlineEdit /> Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="flex items-center gap-1"
                          onClick={() => handleDelete(ticket.id)}
                        >
                          <AiOutlineDelete /> Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {tickets.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-gray-400">
                        No tickets found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}