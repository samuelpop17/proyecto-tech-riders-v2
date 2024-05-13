export class EmpresaCentro {
  constructor(
    public idEmpresaCentro: number,
    public nombre: string,
    public direccion: string,
    public telefono: string,
    public personaContacto: string,
    public cif: string,
    public idProvincia: number,
    public idTipoEmpresa: number,
    public estadoEmpresa: number,
    public razonSocial?: string
  ) {}
}
