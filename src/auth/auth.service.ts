import { Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
    constructor(private usuarioService: UsuarioService) {}

    async validarUsuario(login: string, senha: string): Promise<any> {
        const usuario = await this.usuarioService.findOne(login);
        if (usuario && usuario.senha === senha) {
          const { senha, ...result } = usuario;
          return result;
        }
        return null;
      }

}
