import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AiOutlineUser, AiOutlineCalendar,  AiOutlineInfoCircle } from "react-icons/ai";
import { Label } from "@/components/ui/label";

type Ticket = {
  id: number;
  title: string;
  description: string;
  createdBy: string;
  assignedTo: string;
  tags: string[];
  helpful_note: string;
  status: string;
  deadline: string;
  createdat: string;
  updatedat: string;
};

// Example ticket data (replace with real data/fetch)
const ticket: Ticket = {
  id: 1,
  title: "Fix login bug",
  description: "Users cannot login with Google.",
  createdBy: "Alice",
  assignedTo: "Bob",
  tags: ["bug", "login", "urgent"],
  helpful_note: "Check Google OAuth settings.",
  status: "Open",
  deadline: "2025-10-10",
  createdat: "2025-10-01",
  updatedat: "2025-10-02",
};

export const Ticket = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 flex items-center justify-center">
      <Card className="w-full max-w-xl shadow-lg rounded-xl border border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
              <AiOutlineInfoCircle className="text-indigo-500" /> {ticket.title}
            </h2>
            <Badge className="bg-indigo-100 text-indigo-700">{ticket.status}</Badge>
          </div>
          <div className="mt-2 text-gray-500 text-sm flex gap-4">
            <span className="flex items-center gap-1">
              <AiOutlineUser /> Created by: <span className="font-medium text-indigo-700">{ticket.createdBy}</span>
            </span>
            <span className="flex items-center gap-1">
              <AiOutlineUser /> Assigned to: <span className="font-medium text-indigo-700">{ticket.assignedTo}</span>
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label className="text-indigo-700 font-semibold">Description</Label>
            <p className="mt-1 text-gray-700">{ticket.description}</p>
          </div>
          <div className="mb-4">
            <Label className="text-indigo-700 font-semibold">Helpful Note</Label>
            <p className="mt-1 text-gray-700">{ticket.helpful_note}</p>
          </div>
          <div className="mb-4 flex flex-wrap gap-2">
            <Label className="text-indigo-700 font-semibold">Tags</Label>
            {ticket.tags.map((tag) => (
              <Badge key={tag} className="bg-indigo-50 text-indigo-600">{tag}</Badge>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <AiOutlineCalendar className="text-indigo-500" />
              <span className="font-semibold text-indigo-700">Deadline:</span>
              <span>{ticket.deadline}</span>
            </div>
            <div className="flex items-center gap-2">
              <AiOutlineCalendar className="text-indigo-500" />
              <span className="font-semibold text-indigo-700">Created:</span>
              <span>{ticket.createdat}</span>
            </div>
            <div className="flex items-center gap-2">
              <AiOutlineCalendar className="text-indigo-500" />
              <span className="font-semibold text-indigo-700">Updated:</span>
              <span>{ticket.updatedat}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};