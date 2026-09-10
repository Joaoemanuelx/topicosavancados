import { IsString, MaxLength, MinLength } from 'class-validator';

export class ClassificarSolicitacaoDto {
  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  descricao!: string;
}