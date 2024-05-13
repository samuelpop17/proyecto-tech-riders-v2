export class Charla {
  constructor(
    public idCharla: number,
    public descripcion: string,
    public idEstadoCharla: number,
    public fechaCharla: string,
    public fechaSolicitud: string,
    public turno: string,
    public idCurso: number,
    public idProvincia: number,
    public modalidad: string | null,
    public observaciones: string | null,
    public idTechRider: number | null,
    public acreditacionLinkedIn: string | null
  ) {}
}
