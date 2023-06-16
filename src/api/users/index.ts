import { UserCreateModel, UserModel } from "@/models";
import { handleError, instance } from "..";

export async function createUser(
  user: UserCreateModel
): Promise<UserModel | undefined> {
  if(user.admin === undefined) {
    user.admin = false;
  }
  return instance
    .post("user/", user)
    .then(({ data }) => data)
    .catch(handleError);
}

export async function getUser(id: string): Promise<UserModel | undefined> {
  return instance
    .get(`user/${id}`)
    .then(({ data }) => data)
    .catch(handleError);
}

export async function getAllUsers(): Promise<UserModel[] | undefined> {
  return instance
    .get("user/")
    .then(({ data }) => data)
    .catch(handleError);
}

export async function updateUser(
  id: string,
  user: UserCreateModel
): Promise<UserModel | undefined> {
  return instance
    .put(`user/${id}`, user)
    .then(({ data }) => data)
    .catch(handleError);
}

export async function deleteUser(id: string): Promise<void> {
  instance.delete(`user/${id}`).catch(handleError);
}

export async function login(
  email: string,
  password: string
): Promise<{ message: string; token: string; user: UserModel } | undefined> {
  return instance
    .post("/user/login", { email, password })
    .then(({ data }) => {
      return data;
    })
    .catch(handleError);
}

export async function logout(): Promise<void> {
  instance
    .post("/user/logout")
    .catch(handleError)
    .then(() => {
      localStorage.removeItem("token");
    });
}
