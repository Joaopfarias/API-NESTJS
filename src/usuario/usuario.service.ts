import { Injectable, Inject, Body } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { ObjectID, Repository } from 'typeorm';
import { UsuarioCadastrarDto } from './dto/usuario.cadastrar.dto';
import { UsuarioAtualizarDto } from './dto/usuario.atualizar.dto';
import { UsuarioRemoverDto } from './dto/usuario.remover.dto';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async listar(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }
  async listarUm(id:any): Promise<Usuario> {
    return this.usuarioRepository.findOne(id);
  }
  async cadastrar(data : UsuarioCadastrarDto): Promise<ResultadoDto>{
    let usuario = new Usuario()
    usuario.id = data.id
    usuario.login = data.login
    usuario.senha = data.senha
    return this.usuarioRepository.save(usuario)
    .then((result) =>{
        return <ResultadoDto>{
            status:true,
            mensagem: "Usuario cadastrado com sucesso"
        }
    })
    .catch((result) =>{
        return <ResultadoDto>{
            status:false,
            mensagem: "Erro ao cadastrar"
        }
    })
  }
  async atualizar(id:number, data : UsuarioAtualizarDto): Promise<ResultadoDto>{
    let usuario = new Usuario()
    usuario.id = data.id
    usuario.login = data.login
    usuario.senha = data.senha
    return this.usuarioRepository.update(usuario.id, usuario)
    .then((result) =>{
        return <ResultadoDto>{
            status:true,
            mensagem: "Usuario atualizado com sucesso"
        }
    })
    .catch((result) =>{
        return <ResultadoDto>{
            status:false,
            mensagem: "Erro ao atualizar"
        }
    })
  }
  async remover(id:number): Promise<ResultadoDto>{
    return this.usuarioRepository.delete(id)
    .then((result) =>{
        return <ResultadoDto>{
            status:true,
            mensagem: "Usuario deletado com sucesso"
        }
    })
    .catch((result) =>{
        return <ResultadoDto>{
            status:false,
            mensagem: "Erro ao deletar"
        }
    })
  }
  
  async findOne(login: string): Promise<Usuario | undefined> {
    return this.usuarioRepository.findOne({login : login});
  }
}