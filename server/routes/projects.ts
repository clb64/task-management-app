import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

const createProjectSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

const updateProjectSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
});

router.use(authenticateToken);

router.get('/', async (req: AuthRequest, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        ownerId: req.user!.id,
      },
      include: {
        _count: {
          select: { tasks: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req: AuthRequest, res) => {
  try {
    const data = createProjectSchema.parse(req.body);

    const project = await prisma.project.create({
      data: {
        ...data,
        ownerId: req.user!.id,
      },
      include: {
        _count: {
          select: { tasks: true },
        },
      },
    });

    res.status(201).json(project);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const data = updateProjectSchema.parse(req.body);

    const existingProject = await prisma.project.findFirst({
      where: {
        id,
        ownerId: req.user!.id,
      },
    });

    if (!existingProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const project = await prisma.project.update({
      where: { id },
      data,
      include: {
        _count: {
          select: { tasks: true },
        },
      },
    });

    res.json(project);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const existingProject = await prisma.project.findFirst({
      where: {
        id,
        ownerId: req.user!.id,
      },
    });

    if (!existingProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    await prisma.project.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;