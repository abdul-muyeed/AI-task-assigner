import { All, Controller, Req, Res } from '@nestjs/common';
import { InngestService } from './inngest.service';

@Controller('inngest')
export class InngestController {
  constructor(private readonly inngestService: InngestService) {}

  @All()
  async handleInngest(@Req() req: any, @Res() res: any) {
    // Simple approach: return function registry for Inngest Dev Server
    if (req.method === 'GET') {
      res.status(200).json({
        message: 'Inngest endpoint is ready',
        functions: this.inngestService.functions.length,
      });
      return;
    }

    // For now, just acknowledge other requests
    res.status(200).json({ message: 'Inngest webhook received' });
  }
}
