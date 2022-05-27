import { registerDecorator, ValidationOptions } from 'class-validator'

import isLength from 'validator/lib/isLength'

/* -------------------- Unlike the native Length calls the trim method and then checks the length ------------------- */

export function lengthValidation(value: any, min: number, max?: number): boolean {
	return typeof value === 'string' && isLength(value.trim(), { min, max })
}

export function Length(min: number, max?: number, validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'CustomLength',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [min, max],
			options: validationOptions,
			validator: {
				validate: (value: any) => lengthValidation(value, min, max)
			}
		})
	}
}
