import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserId } from 'src/decorators/user-id.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
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
