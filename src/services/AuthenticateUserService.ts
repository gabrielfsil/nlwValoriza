import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UserRepositories";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const userRepository = getCustomRepository(UsersRepositories);

    // Verificar se o email existe
    const user = await userRepository.findOne({
      email,
    });

    if (!user) {
      throw new Error("Email/Password incorrect.");
    }

    // Verificar senha

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect.");
    }

    // Gerar Token

    const token = sign(
      {
        email: user.email,
      },
      "86bd4ca14b265ed3d5c955fdb006ef06",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}

export { AuthenticateUserService };
