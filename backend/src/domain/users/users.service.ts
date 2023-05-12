import { DBInstance } from '../../db/db-instance'
import { User } from './users.entity'
import { UserPostReqBodyDTO } from './users.types'

const usersRepository = DBInstance.getRepository(User)

export const getAllUsers = async () => await usersRepository.find()
export const createUser = async (user: UserPostReqBodyDTO) => await usersRepository.save(user)
export const getUsers = async (query: { [key: string]: any }): Promise<User[]> =>
  await usersRepository.find({ where: { ...query } })
export const getUser = async (id: string): Promise<User | null> =>
  await usersRepository.findOne({ where: { id } })
export const updateUser = async (user: Partial<User>) => await usersRepository.save(user)
