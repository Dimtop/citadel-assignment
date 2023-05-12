import { Router } from 'express'

import { controllerWrapper } from '../../app/controller-wrapper.util'
import {
  createTeamHandler,
  createTeamPlayerHandler,
  deleteTeamHandler,
  deleteTeamPlayerHandler,
  getTeamHandler,
  getTeamPlayersHandler,
  getTeamsHandler,
  updateTeamPlayerHandler
} from './teams.controller'
import { authMiddleware } from '../auth/auth.middleware'

const teamsRouter = Router()
teamsRouter.get('/', controllerWrapper(authMiddleware), controllerWrapper(getTeamsHandler))
teamsRouter.get('/:id', controllerWrapper(authMiddleware), controllerWrapper(getTeamHandler))
teamsRouter.get(
  '/:id/players',
  controllerWrapper(authMiddleware),
  controllerWrapper(getTeamPlayersHandler)
)
teamsRouter.post(
  '/:id/players',
  controllerWrapper(authMiddleware),
  controllerWrapper(createTeamPlayerHandler)
)
teamsRouter.post('/', controllerWrapper(authMiddleware), controllerWrapper(createTeamHandler))
teamsRouter.delete('/:id', controllerWrapper(authMiddleware), controllerWrapper(deleteTeamHandler))
teamsRouter.delete(
  '/:teamId/players/:playerId',
  controllerWrapper(authMiddleware),
  controllerWrapper(deleteTeamPlayerHandler)
)
teamsRouter.put(
  '/:teamId/players/:playerId',
  controllerWrapper(authMiddleware),
  controllerWrapper(updateTeamPlayerHandler)
)

export default teamsRouter
