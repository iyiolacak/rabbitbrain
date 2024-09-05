import { ClerkAPIError } from '@clerk/types';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';

export function getClerkError(err: unknown): ClerkAPIError[] | undefined {
    if(isClerkAPIResponseError(err)) {
        console.error(JSON.stringify(err.errors, null, 2))
        // Combine error messages into a single string
        return err.errors;
    } else {
        console.error("Unknown error: ", err);
        return undefined;
    }
}
