import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import type { CreateUserDto, UpdateUserDto, UserDto } from '../../../shared/models/user.model';
import { HttpErrorService } from '../../../core/services/http-error.service';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly http = inject(HttpClient);
  //private readonly baseUrl = '/api/Users'; // <-- IMPORTANTE
  private readonly baseUrl = environment.production
  ? `${environment.apiUrl}/api/Users`
  : `/api/Users`;
  private readonly error = inject(HttpErrorService);

  async getAll(): Promise<UserDto[] | undefined> {
    try {
      return await firstValueFrom(this.http.get<UserDto[]>(this.baseUrl));
    } catch (e) {
      this.error.handle(e);
      return undefined;
    }
  }

  async getById(id: number): Promise<UserDto | undefined> {
    try {
      return await firstValueFrom(this.http.get<UserDto>(`${this.baseUrl}/${id}`));
    } catch (e) {
      this.error.handle(e);
      return undefined;
    }
  }

  async create(dto: CreateUserDto): Promise<UserDto | undefined>{
    try {
      return await firstValueFrom(this.http.post<UserDto>(this.baseUrl, dto));
    } catch (e) { 
        this.error.handle(e);
        return undefined;
    }
  }

  async update(id: number, dto: UpdateUserDto): Promise<void> {
    try {
      await firstValueFrom(this.http.put<void>(`${this.baseUrl}/${id}`, dto));
    } catch (e) { this.error.handle(e); }
  }

  async delete(id: number): Promise<void> {
    try {
      await firstValueFrom(this.http.delete<void>(`${this.baseUrl}/${id}`));
    } catch (e) { this.error.handle(e); }
  }
}
