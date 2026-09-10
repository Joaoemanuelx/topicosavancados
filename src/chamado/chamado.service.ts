import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  MODELO_PROVIDER,
} from '../ia/providers/modelo.provider';
import type {
  GerarRespostaOutput,
  ModeloProvider,
} from '../ia/providers/modelo.provider';
import { ChamadoCategoria } from './chamado-categoria';



@Injectable()
export class ChamadoService {
  constructor(
    @Inject(MODELO_PROVIDER)
    private readonly modelo: ModeloProvider,
  ) {}

  async ClassificarChamado(texto: string): Promise<GerarRespostaOutput> {
    const mensagemNormalizada = texto.trim();

    if (!mensagemNormalizada) {
      throw new BadRequestException('A mensagem não pode conter apenas espaços');
    }

    const resultado = await this.modelo.gerar({
      mensagem: `
Você é um classificador de chamados.

Categorias permitidas:
${Object.values(ChamadoCategoria).join(', ')}

Escolha a categoria que melhor representa o chamado.

Regras:
- Responda SOMENTE com uma categoria.
- Não escreva explicações.
- Não escreva frases.
- Não traduza as categorias.
- Use exatamente o nome da categoria.

Chamado:
${mensagemNormalizada}

Categoria:
`,
});

    const categoria = resultado.resposta.toUpperCase().trim().replace(/[.!?]/g, '');

    

    if(!Object.values(ChamadoCategoria).includes(categoria as ChamadoCategoria)) {
      throw new BadRequestException(`Categoria inválida: ${categoria}`);
    }

    return {
        ... resultado, resposta: categoria,
    }
}
}