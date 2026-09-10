import { Body, Controller, Post } from '@nestjs/common';
import { ClassificarChamadoDto } from './dto/classificar-chamado.dto'; 
import { ChamadoService } from './chamado.service';


@Controller('chamado')
export class ChamadoController {
  constructor(private readonly chamadoService: ChamadoService) {}


  @Post('classificar')
  async classificar(@Body() dto: ClassificarChamadoDto) {
    const resultado = await this.chamadoService.ClassificarChamado(dto.texto);
    
    return {
        texto: dto.texto,
        categoria: resultado.resposta,
        modelo: resultado.modelo,
        uso: {
            tokensEntrada: resultado.tokensEntrada,
            tokensSaida: resultado.tokensSaida,
        },
    };
  }
}