import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/users.service';
import { UsersStore } from '../store/users.store';

@Component({
  selector: 'app-users-list-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="users-list">
      <h1>Users</h1>

      <button (click)="refresh()">Refrescar</button>

      <!-- Mostrar cargando -->
      @if (loading()) {
        <div>Cargando...</div>
      }
      <!-- Cuando ya no está cargando -->
      @else {
        @if (hasUsers()) {
          <ul>
            @for (u of users(); track u.id) {
              <li>
                <strong>{{ u.name }} {{ u.lastName }}</strong> (id: {{ u.id }})
                <button (click)="select(u.id)">Ver</button>
                <button (click)="remove(u.id)">Eliminar</button>
              </li>
            }
          </ul>
        }
        @else {
          <p>No hay usuarios disponibles.</p>
        }
      }

      <!-- Mostrar usuario seleccionado -->
      @if (selected()) {
        <pre>Seleccionado: {{ selected() | json }}</pre>
      }
    </section>
  `,
  styleUrls: []
})
export class UsersListPage implements OnInit {
  private readonly api = inject(UsersService);
  readonly store = inject(UsersStore);

  // Signals derivados usando `computed` para simplificar la plantilla
  readonly loading = computed(() => this.store.loading());
  readonly users = computed(() => this.store.users());
  readonly selected = computed(() => this.store.selected());
  readonly hasUsers = computed(() => this.store.users().length > 0);

  async ngOnInit() {
    await this.refresh();
  }

  async refresh() {
    this.store.setLoading(true);
    const users = await this.api.getAll();
    this.store.setUsers(users ?? []);
    this.store.setLoading(false);
  }

  async select(id: number) {
    const user = await this.api.getById(id);
    this.store.setSelected(user ?? null);
  }

  async remove(id: number) {
    await this.api.delete(id);
    await this.refresh();
  }
}
