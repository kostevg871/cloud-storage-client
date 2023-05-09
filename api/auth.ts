import axios from "@/core/axios";
import {
  LoginFormDTO,
  LoginResponceDTO,
  RegisterFormDTO,
  RegisterResponseDTO,
} from "./dto/auth.dto";

export const login = async (
  values: LoginFormDTO
): Promise<LoginResponceDTO> => {
  return (await axios.post("/auth/login", values)).data;
};

export const register = async (
  values: RegisterFormDTO
): Promise<RegisterResponseDTO> => {
  return (await axios.post("/auth/register", values)).data;
};
