import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubjectsService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, data: { name: string; color?: string }) {
    return this.prisma.subject.create({
      data: {
        name: data.name,
        color: data.color,
        userId,
      },
    });
  }

  findAll(userId: string) {
    return this.prisma.subject.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(
    userId: string,
    id: string,
    data: { name?: string; color?: string },
  ) {
    const subject = await this.prisma.subject.findFirst({
      where: { id, userId },
    });

    if (!subject) throw new NotFoundException('Matéria não encontrada');

    return this.prisma.subject.update({
      where: { id },
      data,
    });
  }

  async remove(userId: string, id: string) {
    const subject = await this.prisma.subject.findFirst({
      where: { id, userId },
    });

    if (!subject) throw new NotFoundException('Matéria não encontrada');

    return this.prisma.subject.delete({
      where: { id },
    });
  }
}
