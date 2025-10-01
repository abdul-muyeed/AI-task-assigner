import { All, Controller, Req, Res } from '@nestjs/common';
import { InngestService } from './inngest.service';
import { serve } from 'inngest/express';

@Controller('inngest')
export class InngestController {
  constructor(private readonly inngestService: InngestService) {}

  @All()
  async handleInngest(@Req() req: any, @Res() res: any) {
    const handler = serve({
      client: this.inngestService.client,
      functions: this.inngestService.functions,
    });

    return handler(req, res);
  }
}
