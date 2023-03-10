import { ReturnUserDto } from 'src/user/dtos/ReturnUser.dto';

export interface ReturnLoginDTO {
    user: ReturnUserDto;
    accessToken: string;
}
