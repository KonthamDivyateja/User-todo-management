import { supabase } from "../config/supabase.js";
import { v4 as uuidv4 } from "uuid";

export const addTodo = async (req, res) => {
  const { title, description, userId } = req.body;

  if (!title || !userId)
    return res.status(400).json({ message: "Missing fields" });

  const { error } = await supabase.from("todos").insert({
    id: uuidv4(),
    title,
    description,
    user_id: userId
  });

  if (error)
    return res.status(400).json({ message: "Invalid user ID" });

  res.status(201).json({ message: "Todo created" });
};

export const getUserTodos = async (req, res) => {
  const { userId } = req.params;

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", userId);

  if (error)
    return res.status(404).json({ message: "User not found" });

  res.json(data);
};

export const updateTodo = async (req, res) => {
  const { todoId } = req.params;

  const { error } = await supabase
    .from("todos")
    .update(req.body)
    .eq("id", todoId);

  if (error)
    return res.status(404).json({ message: "Todo not found" });

  res.json({ message: "Todo updated" });
};

export const deleteTodo = async (req, res) => {
  const { todoId } = req.params;

  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("id", todoId);

  if (error)
    return res.status(404).json({ message: "Todo not found" });

  res.json({ message: "Todo deleted" });
};
