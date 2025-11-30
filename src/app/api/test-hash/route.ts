import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const GET = async () => {
  const password = "Hardeez@10";
  const storedHash = "$2b$10$DTTgk9nC368dfvILzZcXTu13izRnAI/s.OAulE9MP4s2OcSjOyWbS";

  const isMatch = await bcrypt.compare(password, storedHash);
  
  const newHash = await bcrypt.hash(password, 10);
  const isMatchNew = await bcrypt.compare(password, newHash);

  return NextResponse.json({
    password,
    storedHash,
    isMatch,
    newHash,
    isMatchNew
  });
};
