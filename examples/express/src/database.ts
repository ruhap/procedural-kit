interface User {
  id: number;
  name: string;
  email: string;
}

class Database {
  private db: Map<number, User>;

  constructor() {
    this.db = new Map<number, User>();
  }

  public async findMany({ where }: { where?: Partial<User> }) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (where) {
      const filteredUsers = Array.from(this.db.values()).filter((user) => {
        return Object.entries(where).every(
          ([key, value]) => user[key as keyof User] === value
        );
      });
      return filteredUsers;
    } else {
      return Array.from(this.db.values());
    }
  }

  public async findUnique({ where }: { where: { id: number } }) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = this.db.get(where.id);

    if (!user) throw new Error("No user");
    return user;
  }

  public async create({ data }: { data: Omit<User, "id"> }) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const id = Date.now();

    const newUser: User = { ...data, id };
    this.db.set(id, newUser);

    return newUser;
  }

  public async update({
    data,
    where,
  }: {
    data: Partial<User>;
    where: { id: number };
  }) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = this.db.get(where.id);
    if (!user) throw new Error("No user");

    const updatedUser = { ...user, ...data };
    this.db.set(user.id, updatedUser);
    return updatedUser;
  }

  public async delete({ where }: { where: { id: number } }) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = this.db.delete(where.id);
    return { success: true };
  }
}

export const fakePrisma = new Database();
export type FakePrismaClient = typeof fakePrisma;
