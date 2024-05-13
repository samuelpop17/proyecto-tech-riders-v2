export class DetallesCharlas {
  constructor(
    public id: number,
    public idCharla: number,
    public descripcionCharla: string,
    public fechaCharla: string,
    public turno: string,
    public fechaSolicitud: string,
    public observacionesCharla: string,
    public idEstadoCharla: number,
    public estadoCharla: string,
    public idProvincia: number,
    public provincia: string,
    public modalidad: string | null,
    public idTechRider: number | null,
    public techRider: string,
    public email: string,
    public telefono: string | null,
    public idEmpresa: number,
    public empresa: string | null,
    public direccionEmpresa: string | null
  ) {}
}
