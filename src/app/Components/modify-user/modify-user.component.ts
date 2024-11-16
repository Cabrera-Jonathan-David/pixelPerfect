import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../Services/client.service';
import { UserService } from '../../Services/user.service';
import { Client } from '../../Interface/client';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../Services/authentication.service';

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
    private authService: AuthenticationService,
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

  async ngOnInit() {
    try {
      const userId = this.authService.getUserIdFromToken(); 
      if (!userId) {
        console.error('El token no contiene un id de usuario');
        return;
      }
  
      const user = await this.userService.getUserById(userId);
      if (!user) {
        console.error('Usuario no encontrado');
        return;
      }
      
      const client = await this.clientService.getClientById(user.id_cliente);
  
      if (!client) {
        console.error('Cliente no encontrado');
        return;
      }
  
    
      this.modifyForm.patchValue({
        nombre: client.nombre,
        apellido: client.apellido,
        codigoArea: client.codigoArea,
        telefono: client.telefono,
        direccion: client.direccion,
        altura: client.altura,
        piso: client.piso || '', 
        codigoPostal: client.codigoPostal,
        ciudad: client.ciudad,
        provincia: client.provincia,
        pais: client.pais
      });
    } catch (error) {
      console.error('Error al inicializar el componente:', error);
    }
  }
  

  async modifyUser(): Promise<void> {
    const userId = await this.authService.getUserIdFromToken();
    if (userId) {
        try {
            const user = await this.userService.getUserById(userId);
              if (user && user.id_cliente) {
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


