import express, { Express, Request, Response } from 'express'
import dotenv, { config } from 'dotenv'
import { DBInstance } from './src/db/db-instance'
import { responseFormatMiddleware } from './src/app/response-format.middleware'
import { controllerWrapper } from './src/app/controller-wrapper.util'
import { errorMiddleware } from './src/app/error.middlewrate'
import authRouter from './src/domain/auth/auth.router'
import cors from 'cors'
import teamsRouter from './src/domain/teams/teams.router'

DBInstance.initialize()
  .then(async () => {
    const app: Express = express()
    const port = process.env.PORT
    dotenv.config()
    app.use(cors())
    app.use(express.json())
    app.use(responseFormatMiddleware)

    app.use('/auth', authRouter)
    app.use('/teams', teamsRouter)
    app.get('*', function (req, res) {
      res.status(404).send('Handler not found')
    })
    app.use(errorMiddleware)
    app.listen(process.env.PORT || 5013, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
    })
  })
  .catch((error: any) => {
    console.log(error)
  })
