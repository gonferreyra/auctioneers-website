import { Request, Response, NextFunction } from 'express';
import SessionModel from '../models/session.model';
import { Op } from 'sequelize';
import z from 'zod';
import CustomError from '../utils/customError';

export const getSessionHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await SessionModel.findAll({
      where: {
        userId: req.userId,
        expiresAt: {
          [Op.gt]: Date.now(),
        },
      },
      attributes: ['id', 'userAgent', 'createdAt'],
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(
      session.map((session) => ({
        ...session.dataValues,
        ...(session.id === req.sessionId && {
          isCurrent: true,
        }),
      }))
    );
  } catch (error) {
    next(error);
  }
};

export const deleteSessionHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionId = z.string().parse(req.params.id);
    const deleted = await SessionModel.destroy({
      where: {
        id: sessionId,
        userId: req.userId,
      },
    });

    if (!deleted) {
      throw new CustomError(404, 'Session not found');
    }

    res.status(200).json({
      message: 'Session deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
