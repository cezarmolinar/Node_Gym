import { CheckIn } from '@prisma/client'
import { CheckInsRepositoryInterface } from '@/repositories/check-ins-repository-interface'
import { GymsRepositoryInterface } from '@/repositories/gyms-repository-interface'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-in-error'
import { MaxDistanceError } from './errors/max-distance-error'

interface CheckInUseCaseRequest {
  user_id: string
  gym_id: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInrepository: CheckInsRepositoryInterface,
    private gymsRepository: GymsRepositoryInterface
  ) {}

  async execute({
    user_id,
    gym_id,
    userLatitude,
    userLongitude
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gym_id)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    // calculate the distance between user and gym
    const distance = getDistanceBetweenCoordinates(
      {latitude: userLatitude, longitude: userLongitude},
      {latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()}
    )
    
    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDay = await this.checkInrepository.findByUserIdOnDate(
      user_id,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError()
    }

    const checkIn = await this.checkInrepository.create({
      user_id, gym_id
    })

    return { checkIn }
  }
}
