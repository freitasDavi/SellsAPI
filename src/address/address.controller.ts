import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/user-id.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { AddressService } from './address.service';
import { CreateAddressDTO } from './dtos/CreateAddress.dto';

@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Post()
    @Roles(UserType.User)
    @UsePipes(ValidationPipe)
    public async createAddress(
        @Body() createAddressDTO: CreateAddressDTO,
        @UserId() userId: number,
    ): Promise<CreateAddressDTO> {
        console.log(userId);
        return await this.addressService.createAddress(
            createAddressDTO,
            userId,
        );
    }
}
