export class DetallesEstadoCharlaTech {
  constructor(
    public idCharla: number,
    public descripcionCharla: string,
    public fechaCharla: string,
    public idEstadoCharla: number,
    public estadoCharla: string,
    public idProvincia: number,
    public provincia: string,
    public idCurso: number,
    public nombreCurso: string,
    public observacionesCharla: string,
    public fechaSolicitudCharla: string,
    public modalidad: string,
    public idTechRider: number,
    public techRider: string,
    public email: string,
    public telefono: string,
    public idRole: number,
    public tipoRole: string,
    public valoracion: number,
    public comentarioValoracion: string
  ) {}
}
