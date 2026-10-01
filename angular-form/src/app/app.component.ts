import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Component, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'

interface GreetingRequest {
  name: string
  message: string
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly http = inject(HttpClient)
  readonly form: GreetingRequest = { name: '', message: '' }
  saving = false
  status = ''

  submit(): void {
    this.saving = true
    this.status = ''

    this.http.post('/api/greetings', this.form).subscribe({
      next: () => {
        this.status = 'Сообщение сохранено.'
        this.form.name = ''
        this.form.message = ''
        this.saving = false
      },
      error: (error: { message?: string }) => {
        this.status = `Не удалось сохранить сообщение. ${error.message ?? 'Проверьте Spring Boot.'}`
        this.saving = false
      },
    })
  }
}
