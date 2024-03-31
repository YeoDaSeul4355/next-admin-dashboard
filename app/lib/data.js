import { Product, User } from "./models";
import { connectToDB } from "./utils";

export const fetchUsers = async (q) => {
  const regex = new RegExp(q, "i");
  try {
    connectToDB();
    const user = await User.find({ username: { $regex: regex } });
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};
