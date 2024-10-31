import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../Services/client.service';
import { UserService } from '../../Services/user.service';
import { ValidationService } from '../../Services/validation.service';
import { Client } from '../../Interface/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css'] 
})
export class ModifyUserComponent implements OnInit {
  
  modifyForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private clientService: ClientService,
    private userService: UserService,
    private validationService: ValidationService,
    private router: Router
  ) {
    this.modifyForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      codigoArea: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      direccion: ['', Validators.required],
      altura: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      piso: [''],
      codigoPostal: ['', [Validators.required]],
      ciudad: ['', Validators.required],
      provincia: ['', Validators.required],
      pais: ['', Validators.required]
    })

  }

  async ngOnInit(): Promise<void> {
    const username = localStorage.getItem('username');
    if (username) {
        try {
            const user = await this.userService.getUserByUsername(username);

            if (user && 'id_cliente' in user) {
                const clientData = await this.clientService.getClientById(user.id_cliente);
                    if (clientData) {
                      this.modifyForm.patchValue(clientData);
                      } else {
                          console.error('No se encontró cliente con el id proporcionado');
                   }
            } else {
                console.error('El usuario no tiene un id_cliente asociado');
            }
        } catch (error) {
            console.error('Error al obtener los datos del usuario o cliente:', error);
        }
    }
  }



  async modifyUser(): Promise<void> {
    const username = localStorage.getItem('username'); 
    if (username) {
        try {
            // Obtener el usuario por el username
            const user = await this.userService.getUserByUsername(username);

            if (user && user.id_cliente) {
                // Obtener el cliente usando el id_cliente
                const clientData = await this.clientService.getClientById(user.id_cliente);

                
                const updatedClientData: Partial<Client> = {
                    ...clientData, //mantiene lo que existe
                    ...this.modifyForm.value //modifica lo nuevo
                };

                // Actualizar el cliente
                await this.clientService.updateClient(user.id_cliente, updatedClientData);
                alert('Cliente actualizado con éxito');
                this.modifyForm.reset();
                this.router.navigate(['/home']);
            }
        } catch (error) {
            console.error('Error al modificar los datos del usuario:', error);
        }
    }
}

}


