import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AiOutlineUser, AiOutlineInfoCircle, AiOutlineEye, AiOutlineCalendar, AiOutlinePlus } from "react-icons/ai";

type Ticket = {
  id: number;
  title: string;
  description: string;
  createdBy: string;
  assignedTo: string;
  createdat: string;
};

// Example tickets data (replace with real data/fetch)
const initialTickets: Ticket[] = [
  {
    id: 1,
    title: "Fix login bug",
    description: "Users cannot login with Google.",
    createdBy: "Alice",
    assignedTo: "Bob",
    createdat: "2025-10-01",
  },
  {
    id: 2,
    title: "Update dashboard UI",
    description: "Redesign dashboard for better UX.",
    createdBy: "Charlie",
    assignedTo: "Dana",
    createdat: "2025-10-02",
  },
  {
    id: 3,
    title: "Improve API performance",
    description: "Optimize endpoints for faster response.",
    createdBy: "Eve",
    assignedTo: "Frank",
    createdat: "2025-10-03",
  },
];

export const Tickets = () => {
  const [tickets] = useState<Ticket[]>(initialTickets);
  const navigate = useNavigate();

  const handleView = (id: number) => {
    navigate(`/ticket/${id}`);
  };

  const handleAddTicket = () => {
    navigate("/admin"); // Or your add ticket page route
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 flex items-center justify-center">
      <Card className="w-full max-w-2xl shadow-lg rounded-xl border border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
              <AiOutlineInfoCircle className="text-indigo-500" /> All Tickets
            </h2>
            <Button
              className="flex items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={handleAddTicket}
            >
              <AiOutlinePlus /> Add Ticket
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 flex flex-col gap-2 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-indigo-700">{ticket.title}</span>
                  <Badge className="bg-indigo-100 text-indigo-700">#{ticket.id}</Badge>
                </div>
                <p className="text-gray-700">{ticket.description}</p>
                <div className="flex gap-6 text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <AiOutlineUser /> Created by: <span className="font-medium text-indigo-700">{ticket.createdBy}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <AiOutlineUser /> Assigned to: <span className="font-medium text-indigo-700">{ticket.assignedTo}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <AiOutlineCalendar /> <span className="font-medium text-indigo-700">{ticket.createdat}</span>
                  </span>
                </div>
                <div className="flex justify-end mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1"
                    onClick={() => handleView(ticket.id)}
                  >
                    <AiOutlineEye /> View
                  </Button>
                </div>
              </div>
            ))}
            {tickets.length === 0 && (
              <div className="text-center text-gray-400 py-8">No tickets found.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};