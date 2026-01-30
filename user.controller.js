import { supabase } from "../config/supabase.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    if (password.length < 6)
      return res.status(400).json({ message: "Password too short" });

    const hashed = await bcrypt.hash(password, 10);

    const { error } = await supabase.from("users").insert({
      id: uuidv4(),
      name,
      email,
      password: hashed
    });

    if (error)
      return res.status(400).json({ message: "Email already exists" });

    res.status(201).json({ message: "User registered successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  const { error } = await supabase.from("users").delete().eq("id", userId);

  if (error)
    return res.status(404).json({ message: "Invalid user ID" });

  res.json({ message: "User and related todos deleted" });
};
