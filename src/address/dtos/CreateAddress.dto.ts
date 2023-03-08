import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAddressDTO {
    @IsString()
    @IsOptional()
    complement: string;

    @IsInt()
    numberAddress: number;

    @IsString()
    cep: string;

    @IsNumber()
    cityId: number;
}
