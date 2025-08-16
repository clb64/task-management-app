import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  dueDate: z.string().optional(),
  projectId: z.string(),
  assigneeId: z.string().optional(),
});

const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  dueDate: z.string().optional(),
  assigneeId: z.string().optional(),
});

router.use(authenticateToken);

router.get('/', async (req: AuthRequest, res) => {
  try {
    const { projectId } = req.query;

    const where = projectId
      ? {
          projectId: projectId as string,
          project: {
            ownerId: req.user!.id,
          },
        }
      : {
          project: {
            ownerId: req.user!.id,
          },
        };

    const tasks = await prisma.task.findMany({
      where,
      include: {
        project: {
          select: { name: true },
        },
        assignee: {
          select: { name: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req: AuthRequest, res) => {
  try {
    const data = createTaskSchema.parse(req.body);

    const project = await prisma.project.findFirst({
      where: {
        id: data.projectId,
        ownerId: req.user!.id,
      },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const task = await prisma.task.create({
      data: {
        ...data,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
      },
      include: {
        project: {
          select: { name: true },
        },
        assignee: {
          select: { name: true, email: true },
        },
      },
    });

    res.status(201).json(task);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const data = updateTaskSchema.parse(req.body);

    const existingTask = await prisma.task.findFirst({
      where: {
        id,
        project: {
          ownerId: req.user!.id,
        },
      },
    });

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const task = await prisma.task.update({
      where: { id },
      data: {
        ...data,
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      },
      include: {
        project: {
          select: { name: true },
        },
        assignee: {
          select: { name: true, email: true },
        },
      },
    });

    res.json(task);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const existingTask = await prisma.task.findFirst({
      where: {
        id,
        project: {
          ownerId: req.user!.id,
        },
      },
    });

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await prisma.task.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;