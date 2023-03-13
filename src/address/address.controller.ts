import {
    Body,
    Controller,
    Param,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { AddressService } from './address.service';
import { CreateAddressDTO } from './dtos/CreateAddress.dto';

@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Post('/:userId')
    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    public async createAddress(
        @Body() createAddressDTO: CreateAddressDTO,
        @Param('userId') userId: number,
    ): Promise<CreateAddressDTO> {
        return await this.addressService.createAddress(
            createAddressDTO,
            userId,
        );
    }
}
