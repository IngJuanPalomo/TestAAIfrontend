import { Injectable, computed, signal } from '@angular/core';
import type { UserDto } from '../../../shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersStore {
  private readonly _users = signal<UserDto[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _selected = signal<UserDto | null>(null);

  readonly users = computed(() => this._users());
  readonly loading = computed(() => this._loading());
  readonly selected = computed(() => this._selected());

  setUsers(list: UserDto[]) { this._users.set(list); }
  setLoading(v: boolean) { this._loading.set(v); }
  setSelected(u: UserDto | null) { this._selected.set(u); }
}
