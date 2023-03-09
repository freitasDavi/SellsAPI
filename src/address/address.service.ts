import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityService } from 'src/city/city.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateAddressDTO } from './dtos/CreateAddress.dto';
import { AddressEntity } from './entities/address.entity';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(AddressEntity)
        private addressRepository: Repository<AddressEntity>,
        private readonly userService: UserService,
        private readonly cityService: CityService,
    ) {}

    async createAddress(
        createAddress: CreateAddressDTO,
        userId: number,
    ): Promise<AddressEntity> {
        await this.userService.findUserById(userId);
        await this.cityService.findCityById(createAddress.cityId);

        return await this.addressRepository.save({
            ...createAddress,
            userId,
        });
    }
}
