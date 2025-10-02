import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { NavBar } from "@/components/navbar";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const Signup = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    skills: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add signup logic here (API call)
    console.log(form);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <NavBar />
      <div className="flex flex-1 items-center justify-center pt-20">
        <Card className="w-full max-w-md shadow-lg rounded-xl border border-gray-200">
          <CardHeader className="text-center">
            <h2 className="text-2xl font-bold text-indigo-700 mb-2">Sign Up</h2>
            <p className="text-gray-500">Create your account</p>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="email" className="text-indigo-700">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-indigo-700">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    className="mt-1 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-400 hover:text-indigo-600 focus:outline-none"
                    tabIndex={-1}
                  >
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </button>
                </div>
              </div>
              <div>
                <Label htmlFor="skills" className="text-indigo-700">Skills <span className="text-xs text-gray-400">(optional, comma separated)</span></Label>
                <Input
                  id="skills"
                  name="skills"
                  type="text"
                  placeholder="React, Node.js, Python"
                  value={form.skills}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-semibold py-2 rounded-lg shadow"
              >
                Sign Up
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}