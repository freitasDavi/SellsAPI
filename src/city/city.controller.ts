import { Controller, Get, Param } from '@nestjs/common';
import { CityService } from './city.service';
import { CityEntity } from './entities/city.entity';

@Controller('city')
export class CityController {
    constructor(private readonly cityService: CityService) {}

    @Get('/:stateId')
    async GetAllCitiesByStateId(
        @Param('stateId') stateId: number,
    ): Promise<CityEntity[]> {
        return await this.cityService.getAllCitiesByStateId(stateId);
    }
}
