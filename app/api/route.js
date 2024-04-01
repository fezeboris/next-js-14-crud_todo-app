import { NextResponse } from "next/server";
import { connectDB } from "../lib/config/db";
import TodoModel from "../lib/models/todo.model";

const loadDB = async () => {
  await connectDB();
};
loadDB();
export async function GET(request) {
  const todos = await TodoModel.find({});
  return NextResponse.json({ todos: todos });
}

export async function POST(request, response) {
  const { title, description } = await request.json();
  await TodoModel.create({ title, description });
  return NextResponse.json({ message: "Todo created" });
}
