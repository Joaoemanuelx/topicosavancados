import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {

  MODELO_PROVIDER,
} from '../ia/providers/modelo.provider';
import type {
  GerarRespostaOutput,
  ModeloProvider,
} from '../ia/providers/modelo.provider';
import { SolicitacaoCategoria } from './solicitacoes-categorias';

@Injectable()
export class SolicitacoesService {
  constructor(
    @Inject(MODELO_PROVIDER)
    private readonly modelo: ModeloProvider,
  ) {}

  async triagem(descricao: string): Promise<GerarRespostaOutput> {
    const mensagemNormalizada = descricao.trim();

    if (!mensagemNormalizada) {
      throw new BadRequestException('A mensagem não pode conter apenas espaços');
    }

    const resultado = await this.modelo.gerar({mensagem: `Você é responsável pela triagem de solicitações acadêmicas.

Classifique a solicitação em exatamente uma das categorias abaixo:

SUPORTE_TECNICO
COBRANCA
VIDA_ACADEMICA
ATENDIMENTO
NAO_IDENTIFICADO

Retorne somente o nome da categoria, sem explicações, pontuação ou texto adicional.

Solicitação: ${mensagemNormalizada}`})

        const categoria = resultado.resposta.toUpperCase().trim().replace(/[.!?]/g, '');

        if(!Object.values(SolicitacaoCategoria).includes(categoria as SolicitacaoCategoria)) {
            throw new BadRequestException(`Categoria inválida: ${categoria}`);
        }

        return {
            ...resultado, resposta: categoria,
        }
  }

  
}