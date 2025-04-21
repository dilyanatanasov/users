interface ErrorResponse {
    valid: boolean;
    errors: string[]
}

export class UserValidator {
    static validateCreate(data: any): ErrorResponse {
        const errors: string[] = [];

        if (!data.username || typeof data.username !== 'string' || data.username.length < 3) {
            errors.push('Username must be a string with at least 3 characters');
        }

        if (!data.password || typeof data.password !== 'string' || data.password.length < 6) {
            errors.push('Password must be a string with at least 6 characters');
        }

        // Accept both boolean and string representations ("0", "1")
        if (data.isActive === undefined ||
            (typeof data.isActive !== 'boolean' &&
                data.isActive !== "0" &&
                data.isActive !== "1")) {
            errors.push('isActive must be a boolean or "0"/"1" string value');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    static validateUpdate(data: any): ErrorResponse {
        const errors: string[] = [];

        if (Object.keys(data).length === 0) {
            errors.push('At least one field must be provided for update');
            return {valid: false, errors};
        }

        if (data.username !== undefined && (typeof data.username !== 'string' || data.username.length < 3)) {
            errors.push('Username must be a string with at least 3 characters');
        }

        if (data.password !== undefined && (typeof data.password !== 'string' || data.password.length < 6)) {
            errors.push('Password must be a string with at least 6 characters');
        }

        // Accept both boolean and string representations ("0", "1")
        if (data.isActive !== undefined &&
            typeof data.isActive !== 'boolean' &&
            data.isActive !== "0" &&
            data.isActive !== "1") {
            errors.push('isActive must be a boolean or "0"/"1" string value');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    static validateId(id: string): ErrorResponse {
        const errors: string[] = [];

        const numId = Number(id);
        if (isNaN(numId) || numId <= 0 || !Number.isInteger(numId)) {
            errors.push('ID must be a positive integer');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }
}