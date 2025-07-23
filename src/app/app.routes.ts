import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { VerificacionComponent } from './verificacion/verificacion.component';
import { ChangedPasswordComponent } from './changed-password/changed-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { GestionusuariosComponent } from './gestionusuarios/gestionusuarios.component';
import { HomeComponent } from './home/home.component';
import { EntercodeComponent } from './entercode/entercode.component';
import { ModifyDataComponent } from './modify-data/modify-data.component';
import { HomerhComponent } from './homerh/homerh.component';
import { EmpleadosrhComponent } from './empleadosrh/empleadosrh.component';
import { VisitasrhComponent } from './visitasrh/visitasrh.component';
import { KpirhComponent } from './kpirh/kpirh.component';
import { NuevoempleadorhComponent } from './nuevoempleadorh/nuevoempleadorh.component';
import { AsistenciasrhComponent } from './asistenciasrh/asistenciasrh.component';
import { HomecasetaComponent } from './homecaseta/homecaseta.component';
import { RegistrocasetaComponent } from './registrocaseta/registrocaseta.component';
import { EmpleadoscasetaComponent } from './empleadoscaseta/empleadoscaseta.component';
import { AccesoscasetaComponent } from './accesoscaseta/accesoscaseta.component';
import { KpicasetaComponent } from './kpicaseta/kpicaseta.component';

export const routes: Routes = [
{path: 'home', component: HomeComponent }, //listo
{path: 'login', component: LoginComponent}, //listo
{path: 'register', component: RegisterComponent }, //listo
{path:'verificacion', component: VerificacionComponent }, //verifica email para recuperar cuenta
{path:'codigo', component: EntercodeComponent }, //ingresa codigo
{path: 'nuevacontrasena', component: NewPasswordComponent}, //nueva contraseña
{path: 'modificar', component: ModifyDataComponent}, // editar datos de usuario
{path: 'cambiarcontrasena', component: ChangedPasswordComponent }, //listo - cambiar contraseña usuario
{path: 'homerh', component: HomerhComponent},
{path: 'homecaseta', component: HomecasetaComponent},
{path: 'empleadoscaseta', component: EmpleadoscasetaComponent},
{path: 'nuevorh', component: NuevoempleadorhComponent},
{path: 'visitasrh', component: VisitasrhComponent},
{path: 'empleadosrh', component: EmpleadosrhComponent},

// en proceso
{path: 'kpirh', component: KpirhComponent},
{path: 'asisrh', component: AsistenciasrhComponent},
{path: 'visitantes', component: RegistrocasetaComponent},
{path: 'kpicaseta', component: KpicasetaComponent},
{path: 'accesos', component: AccesoscasetaComponent},



//borradores
{path: 'rhgestion', component: GestionusuariosComponent }, //para borradores
{path: 'borradores', component: RecoverPasswordComponent }, //borrador de iconos

];
