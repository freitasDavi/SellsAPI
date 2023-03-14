import { ReturnUserDto } from '../../user/dtos/ReturnUser.dto';

export interface ReturnLoginDTO {
    user: ReturnUserDto;
    accessToken: string;
}
