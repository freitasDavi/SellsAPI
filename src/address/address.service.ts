import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDTO } from './dtos/CreateAddress.dto';
import { AddressEntity } from './entities/address.entity';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(AddressEntity)
        private addressRepository: Repository<AddressEntity>,
    ) {}

    async createAddress(
        createAddress: CreateAddressDTO,
        userId: number,
    ): Promise<AddressEntity> {
        return await this.addressRepository.save({
            ...createAddress,
            userId,
        });
    }
}
