import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { SubjectsService } from './subjects.service';

type JwtRequestUser = {
  userId: string;
  email: string;
};

type JwtRequest = Request & { user: JwtRequestUser };

@UseGuards(JwtAuthGuard)
@Controller('subjects')
export class SubjectsController {
  constructor(private subjectsService: SubjectsService) {}

  @Post()
  create(@Req() req: JwtRequest, @Body() dto: CreateSubjectDto) {
    return this.subjectsService.create(req.user.userId, dto);
  }

  @Get()
  findAll(@Req() req: JwtRequest) {
    return this.subjectsService.findAll(req.user.userId);
  }

  @Put(':id')
  update(
    @Req() req: JwtRequest,
    @Param('id') id: string,
    @Body() dto: CreateSubjectDto,
  ) {
    return this.subjectsService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: JwtRequest, @Param('id') id: string) {
    return this.subjectsService.remove(req.user.userId, id);
  }
}
