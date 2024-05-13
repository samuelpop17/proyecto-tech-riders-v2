export class CharlasPendientes {
  constructor(
    public id: number,
    public idCharla: number,
    public descripcionCharla: string,
    public fechaCharla: string,
    public turno: string,
    public fechaSolicitudCharla: string,
    public observacionesCharla: string,
    public idEstadoCharla: number,
    public estadoCharla: string,
    public idProvincia: number,
    public provincia: string,
    public modalidad: string | null,
    public idEmpresa: number,
    public empresa: string,
    public direccionEmpresa: string
  ) {}
}
