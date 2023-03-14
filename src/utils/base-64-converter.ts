import { LoginPayloadDTO } from '../auth/dtos/LoginPayload.dto';

export const authorizationToLoginPayload = (
    authorization: string,
): LoginPayloadDTO | undefined => {
    const authorizationSplitted = authorization.split('.');

    if (authorizationSplitted.length < 3 || !authorizationSplitted[1]) {
        return undefined;
    }

    return JSON.parse(
        Buffer.from(authorizationSplitted[1], 'base64').toString('ascii'),
    );
};
