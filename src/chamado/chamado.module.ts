import { Module } from '@nestjs/common';
import { IaModule } from '../ia/ia.module';
import { AvaliadorClassificacaoService } from './avaliacao/avaliador-classificacao.service';
import { ChamadosController } from './chamado.controller';
import { ChamadosService } from './chamado.service';

@Module({
  imports: [IaModule],
  controllers: [ChamadosController],
  providers: [ChamadosService, AvaliadorClassificacaoService],
  exports: [AvaliadorClassificacaoService],
})
export class ChamadosModule {}