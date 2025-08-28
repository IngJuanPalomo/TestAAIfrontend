export interface UserDto {
  id: number;
  name: string | null;
  lastName: string | null;
}

export interface CreateUserDto {
  name: string | null;
  lastName: string | null;
}

export interface UpdateUserDto {
  name: string | null;
  lastName: string | null;
}
