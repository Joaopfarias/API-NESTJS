import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ResultadoDto } from 'src/dto/resultado.dto';
import { UsuarioCadastrarDto } from './dto/usuario.cadastrar.dto';
import { UsuarioAtualizarDto } from './dto/usuario.atualizar.dto';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

    @Get('listar')
    async listar(): Promise<Usuario[]>{
        return this.usuarioService.listar()
    }
    @Get('listar/:id')
    async listarUm(@Param('id', ParseIntPipe) id: number): Promise<Usuario>{
        return this.usuarioService.listarUm(id)
    }
    @Post('cadastrar')
    async cadastrar(@Body() data: UsuarioCadastrarDto): Promise<ResultadoDto>{
        return this.usuarioService.cadastrar(data)
    }
    @Put('atualizar/:id')
    async update(@Param('id', ParseIntPipe) id: number,@Body() data: UsuarioAtualizarDto) {
        return this.usuarioService.atualizar(id, data)
    }
    @Delete('remover/:id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.usuarioService.remover(id)
    }
    @UseGuards(AuthGuard('local'))
    @Post('logar')
    async login(@Request() req) {
        return req.user;
    }
}