import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AiOutlineUser, AiOutlineCheckCircle, AiOutlineBug, AiOutlinePlus, AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const SidebarButton = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <Button
    variant={active ? "default" : "ghost"}
    className={`w-full justify-start ${active ? "bg-indigo-100 text-indigo-700" : ""}`}
    onClick={onClick}
  >
    {label}
  </Button>
);

// Sidebar component
const Sidebar = ({ activeSection, setActiveSection }: { activeSection: string; setActiveSection: (s: string) => void }) => (
  <aside className="w-64 bg-white border-r border-gray-200 flex flex-col py-6 px-4 min-h-screen">
    <div className="flex items-center gap-2 mb-8">
      <span className="text-xl font-bold text-indigo-700">Shadcnblocks</span>
      <span className="text-xs text-gray-400">Admin KR</span>
    </div>
    <nav className="flex-1">
      <ul className="space-y-2">
        <li><SidebarButton label="Dashboard 1" active={activeSection === "Dashboard 1"} onClick={() => setActiveSection("Dashboard 1")} /></li>
        <li><SidebarButton label="Dashboard 2" active={activeSection === "Dashboard 2"} onClick={() => setActiveSection("Dashboard 2")} /></li>
        <li><SidebarButton label="Dashboard 3" active={activeSection === "Dashboard 3"} onClick={() => setActiveSection("Dashboard 3")} /></li>
        <li><SidebarButton label="Tasks" active={activeSection === "Tasks"} onClick={() => setActiveSection("Tasks")} /></li>
        <li><SidebarButton label="Users" active={activeSection === "Users"} onClick={() => setActiveSection("Users")} /></li>
      </ul>
    </nav>
    <div className="mt-8">
      <div className="text-xs text-gray-400 mb-2">Settings</div>
      <ul className="space-y-2">
        <li><SidebarButton label="General" active={activeSection === "General"} onClick={() => setActiveSection("General")} /></li>
        <li><SidebarButton label="Profile" active={activeSection === "Profile"} onClick={() => setActiveSection("Profile")} /></li>
        <li><SidebarButton label="Billing" active={activeSection === "Billing"} onClick={() => setActiveSection("Billing")} /></li>
        <li><SidebarButton label="Plans" active={activeSection === "Plans"} onClick={() => setActiveSection("Plans")} /></li>
      </ul>
    </div>
  </aside>
);

// Stats Card Component
const StatsCard = ({ stat }: { stat: any }) => (
  <Card className="shadow rounded-xl border border-gray-200">
    <CardHeader className="flex items-center gap-3">
      {stat.icon}
      <CardTitle className="text-lg text-indigo-700">{stat.label}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center gap-2">
        <span className="text-3xl font-bold text-indigo-900">{stat.value}</span>
        <span className={`text-sm font-semibold ${stat.up ? "text-green-600" : "text-red-600"} flex items-center gap-1`}>
          {stat.up ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />} {stat.change}
        </span>
      </div>
    </CardContent>
  </Card>
);

// Payments Table Component
const PaymentsTable = ({ payments }: { payments: any[] }) => (
  <table className="w-full text-left border-collapse">
    <thead>
      <tr className="bg-indigo-100">
        <th className="p-2 font-semibold">Status</th>
        <th className="p-2 font-semibold">Email</th>
        <th className="p-2 font-semibold">Amount</th>
      </tr>
    </thead>
    <tbody>
      {payments.map((p, i) => (
        <tr key={i} className="border-b">
          <td className="p-2">{p.status}</td>
          <td className="p-2">{p.email}</td>
          <td className="p-2">{p.amount}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

// Team Members List Component
const TeamMembersList = ({ teamMembers }: { teamMembers: any[] }) => (
  <ul className="space-y-3">
    {teamMembers.map((member, i) => (
      <li key={i} className="flex items-center gap-3">
        <AiOutlineUser className="text-indigo-500" />
        <div>
          <div className="font-medium">{member.name}</div>
          <div className="text-xs text-gray-500">{member.email}</div>
        </div>
        <Badge className="ml-auto">{member.role}</Badge>
      </li>
    ))}
  </ul>
);

// Recent Tickets Table Component
const RecentTicketsTable = ({ recentTickets }: { recentTickets: any[] }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-indigo-100">
          <th className="p-2 font-semibold">ID</th>
          <th className="p-2 font-semibold">Title</th>
          <th className="p-2 font-semibold">Status</th>
          <th className="p-2 font-semibold">Assigned To</th>
          <th className="p-2 font-semibold">Created By</th>
        </tr>
      </thead>
      <tbody>
        {recentTickets.map((ticket) => (
          <tr key={ticket.id} className="border-b">
            <td className="p-2">{ticket.id}</td>
            <td className="p-2">{ticket.title}</td>
            <td className="p-2">
              <Badge className={ticket.status === "Closed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                {ticket.status}
              </Badge>
            </td>
            <td className="p-2 flex items-center gap-1">
              <AiOutlineUser /> {ticket.assignedTo}
            </td>
            <td className="p-2">{ticket.createdBy}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const stats = [
  { label: "Total Users", value: 128, icon: <AiOutlineUser className="text-indigo-600 text-2xl" />, change: "+5%", up: true },
  { label: "Tickets Closed", value: 87, icon: <AiOutlineCheckCircle className="text-green-500 text-2xl" />, change: "+2%", up: true },
  { label: "Open Bugs", value: 12, icon: <AiOutlineBug className="text-red-500 text-2xl" />, change: "-1%", up: false },
];

const recentTickets = [
  { id: 101, title: "Login Issue", status: "Open", assignedTo: "Bob", createdBy: "Alice" },
  { id: 102, title: "UI Update", status: "Closed", assignedTo: "Dana", createdBy: "Charlie" },
  { id: 103, title: "API Error", status: "Open", assignedTo: "Frank", createdBy: "Eve" },
];

const payments = [
  { status: "Success", email: "ken99@yahoo.com", amount: "$316.00" },
  { status: "Success", email: "abe45@gmail.com", amount: "$242.00" },
  { status: "Processing", email: "monserrat44@gmail.com", amount: "$837.00" },
  { status: "Failed", email: "carmela@hotmail.com", amount: "$721.00" },
];

const teamMembers = [
  { name: "Dale Komen", email: "dale@example.com", role: "Member" },
  { name: "Sofia Davis", email: "sofia@example.com", role: "Owner" },
  { name: "Jackson Lee", email: "jackson@example.com", role: "Member" },
];

// ChartJS data
const lineData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Sales",
      data: [1200, 1900, 1700, 2100, 2300, 2500],
      borderColor: "#6366f1",
      backgroundColor: "rgba(99,102,241,0.1)",
      tension: 0.4,
      fill: true,
    },
    {
      label: "Refunds",
      data: [300, 400, 350, 500, 450, 400],
      borderColor: "#f87171",
      backgroundColor: "rgba(248,113,113,0.1)",
      tension: 0.4,
      fill: true,
    },
  ],
};

const barData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Subscriptions",
      data: [400, 600, 800, 700, 900, 1100],
      backgroundColor: "#34d399",
    },
    {
      label: "Cancellations",
      data: [50, 80, 60, 90, 70, 100],
      backgroundColor: "#f87171",
    },
  ],
};

export const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("Dashboard 1");

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 px-8 py-10">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-indigo-700">Admin Dashboard</h1>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm">Overview</Button>
              <Button variant="outline" size="sm">Analytics</Button>
              <Button variant="outline" size="sm">Reports</Button>
              <Button variant="outline" size="sm">Notifications</Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1"><FiDownload /> Download</Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1"><FaRegCalendarAlt /> Pick a date</Button>
            <Button className="flex items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700">
              <AiOutlinePlus /> Add Ticket
            </Button>
          </div>
        </header>
        {/* Main Content Switcher */}
        {activeSection.startsWith("Dashboard") && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              {stats.map((stat) => (
                <StatsCard key={stat.label} stat={stat} />
              ))}
              {/* Total Revenue Card */}
              <Card className="shadow rounded-xl border border-gray-200 col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg text-indigo-700">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-indigo-900">$15,231.89</span>
                    <span className="text-xs text-green-600 font-semibold">+20.1% from last month</span>
                  </div>
                  {/* ChartJS Line chart */}
                  <div className="mt-4 h-32 w-full">
                    <Line data={lineData} options={{
                      plugins: { legend: { display: false } },
                      scales: { x: { grid: { display: false } }, y: { grid: { display: false } } },
                      responsive: true,
                      maintainAspectRatio: false,
                    }} height={80} />
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <Card className="shadow rounded-xl border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg text-indigo-700">Sale Activity - Monthly</CardTitle>
                  <CardDescription>Showing total sales for the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* ChartJS Line chart */}
                  <div className="h-40 w-full">
                    <Line data={lineData} options={{
                      plugins: { legend: { position: "bottom" } },
                      scales: { x: { grid: { display: false } }, y: { grid: { display: false } } },
                      responsive: true,
                      maintainAspectRatio: false,
                    }} height={120} />
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow rounded-xl border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg text-indigo-700">Subscriptions</CardTitle>
                  <CardDescription>+2350 <span className="text-green-600">+180.1% from last month</span></CardDescription>
                </CardHeader>
                <CardContent>
                  {/* ChartJS Bar chart */}
                  <div className="h-40 w-full">
                    <Bar data={barData} options={{
                      plugins: { legend: { position: "bottom" } },
                      scales: { x: { grid: { display: false } }, y: { grid: { display: false } } },
                      responsive: true,
                      maintainAspectRatio: false,
                    }} height={120} />
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Payments & Team Members */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <Card className="shadow rounded-xl border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg text-indigo-700 flex items-center gap-2"><MdOutlinePayments /> Payments</CardTitle>
                  <CardDescription>Manage your payments.</CardDescription>
                </CardHeader>
                <CardContent>
                  <PaymentsTable payments={payments} />
                </CardContent>
              </Card>
              <Card className="shadow rounded-xl border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg text-indigo-700">Team Members</CardTitle>
                  <CardDescription>Invite your team members to collaborate.</CardDescription>
                </CardHeader>
                <CardContent>
                  <TeamMembersList teamMembers={teamMembers} />
                </CardContent>
              </Card>
            </div>
            {/* Recent Tickets */}
            <Card className="shadow rounded-xl border border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl text-indigo-700">Recent Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentTicketsTable recentTickets={recentTickets} />
              </CardContent>
            </Card>
          </>
        )}
        {activeSection === "Tasks" && (
          <Card className="shadow rounded-xl border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-indigo-700">Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-600">Tasks section content goes here.</div>
            </CardContent>
          </Card>
        )}
        {activeSection === "Users" && (
          <Card className="shadow rounded-xl border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-indigo-700">Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-600">Users section content goes here.</div>
            </CardContent>
          </Card>
        )}
        {activeSection === "General" && (
          <Card className="shadow rounded-xl border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-indigo-700">General Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-600">General settings content goes here.</div>
            </CardContent>
          </Card>
        )}
        {activeSection === "Profile" && (
          <Card className="shadow rounded-xl border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-indigo-700">Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-600">Profile section content goes here.</div>
            </CardContent>
          </Card>
        )}
        {activeSection === "Billing" && (
          <Card className="shadow rounded-xl border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-indigo-700">Billing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-600">Billing section content goes here.</div>
            </CardContent>
          </Card>
        )}
        {activeSection === "Plans" && (
          <Card className="shadow rounded-xl border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-indigo-700">Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-600">Plans section content goes here.</div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}