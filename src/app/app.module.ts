import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEs, 'es');

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { appRoutingProvider, routing } from './app.routing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AcreditarcharlaComponent } from './components/acreditarcharla/acreditarcharla.component';
import { AltaempresaComponent } from './components/altaempresa/altaempresa.component';
import { AltausuarioComponent } from './components/altausuario/altausuario.component';
import { AniadirtecnologiaComponent } from './components/aniadirtecnologia/aniadirtecnologia.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { CalendarioTechRidersCharlasComponent } from './components/calendario-tech-riders-charlas/calendario-tech-riders-charlas.component';
import { CharlasTechRidersComponent } from './components/charlas-tech-riders/charlas-tech-riders.component';
import { CharlasprofesorComponent } from './components/charlasprofesor/charlasprofesor.component';
import { ContactarAdminComponent } from './components/contactar-admin/contactar-admin.component';
import { CrearEmpresaCentroComponent } from './components/crear-empresa-centro/crear-empresa-centro.component';
import { CursosCentroComponent } from './components/cursos-centro/cursos-centro.component';
import { DetallesTechRiderComponent } from './components/detalles-tech-rider/detalles-tech-rider.component';
import { DetallescharlaComponent } from './components/detallescharla/detallescharla.component';
import { EditarcharlaComponent } from './components/editarcharla/editarcharla.component';
import { EditarcursosComponent } from './components/editarcursos/editarcursos.component';
import { EditartecnologiastechriderComponent } from './components/editartecnologiastechrider/editartecnologiastechrider.component';
import { EditarusuarioComponent } from './components/editarusuario/editarusuario.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ListadocentrosComponent } from './components/listadocentros/listadocentros.component';
import { ListadosComponent } from './components/listados/listados.component';
import { ListadosempresaComponent } from './components/listadosempresa/listadosempresa.component';
import { ListadotrComponent } from './components/listadotr/listadotr.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MenuComponent } from './components/menu/menu.component';
import { MischarrlasTechridersComponent } from './components/mischarrlas-techriders/mischarrlas-techriders.component';
import { MistechridersResponsableComponent } from './components/mistechriders-responsable/mistechriders-responsable.component';
import { ModificarcontrasenyaComponent } from './components/modificarcontrasenya/modificarcontrasenya.component';
import { PanelPeticionesAdminComponent } from './components/panel-peticiones-admin/panel-peticiones-admin.component';
import { PerfilusuarioComponent } from './components/perfilusuario/perfilusuario.component';
import { ProponerTecnologiaComponent } from './components/proponer-tecnologia/proponer-tecnologia.component';
import { RegisterusuarioComponent } from './components/registerusuario/registerusuario.component';
import { SolicitarcharlaComponent } from './components/solicitarcharla/solicitarcharla.component';
import { ValoracioncharlaComponent } from './components/valoracioncharla/valoracioncharla.component';

import { ServiceAuth } from './services/service.auth';
import { ServiceCharlas } from './services/service.charlas';
import { ServiceCursos } from './services/service.cursos';
import { ServiceCursosProfesores } from './services/service.cursosprofesores';
import { ServiceEmpresasCentros } from './services/service.empresascentros';
import { ServiceEstadosCharlas } from './services/service.estadoscharlas';
import { ServicePeticionesAltaUsers } from './services/service.peticionesaltausers';
import { ServicePeticionesCentroEmpresa } from './services/service.peticionescentroempresa';
import { ServicePeticionesTecnologias } from './services/service.peticionestecnologias';
import { ServiceProvincias } from './services/service.provincias';
import { ServiceQueryTools } from './services/service.querytools';
import { ServiceRoles } from './services/service.roles';
import { ServiceSolicitudAcreditacionesCharlas } from './services/service.solicitudacreditacionescharlas';
import { ServiceTecnologias } from './services/service.tecnologias';
import { ServiceTecnologiasCharlas } from './services/service.tecnologiascharlas';
import { ServiceTecnologiasTechRiders } from './services/service.tecnologiastechriders';
import { ServiceTipoTecnologias } from './services/service.tipotecnologias';
import { ServiceUsuarios } from './services/service.usuarios';
import { ServiceValoracionesCharlas } from './services/service.valoracionescharlas';
import { ServiceEmail } from './services/service.email';

@NgModule({
  declarations: [
    AppComponent,
    AcreditarcharlaComponent,
    AltaempresaComponent,
    AltausuarioComponent,
    AniadirtecnologiaComponent,
    CalendarioComponent,
    CalendarioTechRidersCharlasComponent,
    CharlasTechRidersComponent,
    CharlasprofesorComponent,
    ContactarAdminComponent,
    CrearEmpresaCentroComponent,
    CrearEmpresaCentroComponent,
    CursosCentroComponent,
    DetallesTechRiderComponent,
    DetallescharlaComponent,
    EditarcharlaComponent,
    EditarcursosComponent,
    EditartecnologiastechriderComponent,
    EditarusuarioComponent,
    FooterComponent,
    HomeComponent,
    ListadocentrosComponent,
    ListadosComponent,
    ListadosempresaComponent,
    ListadotrComponent,
    LoginComponent,
    LogoutComponent,
    MenuComponent,
    MischarrlasTechridersComponent,
    MistechridersResponsableComponent,
    ModificarcontrasenyaComponent,
    PanelPeticionesAdminComponent,
    PerfilusuarioComponent,
    ProponerTecnologiaComponent,
    RegisterusuarioComponent,
    SolicitarcharlaComponent,
    ValoracioncharlaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    CommonModule,
    BrowserAnimationsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],

  providers: [
    ServiceAuth,
    ServiceCharlas,
    ServiceCursos,
    ServiceCursosProfesores,
    ServiceEmail,
    ServiceEmpresasCentros,
    ServiceEstadosCharlas,
    ServicePeticionesAltaUsers,
    ServicePeticionesCentroEmpresa,
    ServicePeticionesTecnologias,
    ServiceProvincias,
    ServiceQueryTools,
    ServiceRoles,
    ServiceSolicitudAcreditacionesCharlas,
    ServiceTecnologias,
    ServiceTecnologiasCharlas,
    ServiceTecnologiasTechRiders,
    ServiceTipoTecnologias,
    ServiceUsuarios,
    ServiceValoracionesCharlas,
    appRoutingProvider,
    { provide: LOCALE_ID, useValue: 'es' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
