import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ChamadoController } from './chamado.controller';
import { ChamadoService } from './chamado.service';
import {
  MODELO_PROVIDER,
} from '../ia/providers/modelo.provider';
import { OllamaProvider } from '../ia/providers/ollama.provider';

@Module({
  imports: [HttpModule],
  controllers: [ChamadoController],
  providers: [
    ChamadoService,
    {
      provide: MODELO_PROVIDER,
      useClass: OllamaProvider,
    },
  ],
})
export class ChamadoModule {}