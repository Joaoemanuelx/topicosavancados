import { Body, Controller, Post } from '@nestjs/common';
import { ClassificarSolicitacaoDto } from './dto/classificar-solicitacao.dto';
import { SolicitacoesService } from './solicitacoes.service';

@Controller('solicitacoes')
export class SolicitacoesController {
  constructor(private readonly solicitacoesService: SolicitacoesService) {}

  @Post('triagem')
  async triagem(@Body() dto: ClassificarSolicitacaoDto) {
    const resultado = await this.solicitacoesService.triagem(dto.descricao);

    return {
      resposta: dto.descricao,
      categoria: resultado.resposta,
      modelo: resultado.modelo,
      uso: {
        tokensEntrada: resultado.tokensEntrada,
        tokensSaida: resultado.tokensSaida,
      },
    };
  }
}