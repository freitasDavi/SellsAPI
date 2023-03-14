import { ReturnStateDTO } from '../../state/dtos/ReturnState.dto';
import { CityEntity } from '../entities/city.entity';

export class ReturnCityDTO {
    name: string;
    state: ReturnStateDTO;

    /**
     *
     */
    constructor(city: CityEntity) {
        this.name = city.name;
        this.state = city.state ? new ReturnStateDTO(city.state) : undefined;
    }
}
