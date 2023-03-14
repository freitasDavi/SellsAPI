import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CacheService } from '../cache/cache.service';
import { Repository } from 'typeorm';
import { CityEntity } from './entities/city.entity';

@Injectable()
export class CityService {
    constructor(
        @InjectRepository(CityEntity)
        private cityRepository: Repository<CityEntity>,
        private readonly cacheService: CacheService,
    ) {}

    async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
        return this.cacheService.getCache<CityEntity[]>(
            `state_${stateId}`,
            () =>
                this.cityRepository.find({
                    where: {
                        stateId,
                    },
                }),
        );
    }

    async findCityById(cityId: number): Promise<CityEntity> {
        const city = await this.cityRepository.findOne({
            where: {
                id: cityId,
            },
        });

        if (!city) {
            throw new NotFoundException(`City with Id ${cityId} not found`);
        }

        return city;
    }
}
