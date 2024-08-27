import { Clients, db } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Clients).values([
    { id: 1, name: "John", age: 30, isActive: true },
    { id: 2, name: "Jane", age: 25, isActive: false },
    { id: 3, name: "Bob", age: 32, isActive: true },
    { id: 4, name: "Alice", age: 27, isActive: true },
    { id: 5, name: "Sam", age: 45, isActive: false },
  ]);
}
