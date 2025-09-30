import { PartialType } from '@nestjs/mapped-types';
import { CreateInngestDto } from './create-inngest.dto';

export class UpdateInngestDto extends PartialType(CreateInngestDto) {}
