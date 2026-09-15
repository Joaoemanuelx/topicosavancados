import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IaModule } from './ia/ia.module';
import { ChamadoService } from './chamado/chamado.service';
import { ChamadoController } from './chamado/chamado.controller';
import { ChamadoModule } from './chamado/chamado.module';
import { SolicitacoesService } from './solicitacoes/solicitacoes.service';
import { SolicitacoesController } from './solicitacoes/solicitacoes.controller';
import { SolicitacoesModule } from './solicitacoes/solicitacoes.module';
import { ConversasModule } from './conversa/conversas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    IaModule,
    ChamadoModule,
    SolicitacoesModule,
    ConversasModule,
  ],
  providers: [ChamadoService, SolicitacoesService],
  controllers: [ChamadoController, SolicitacoesController],
})
export class AppModule {}