import joi from "joi";

export class UserValidator {
    private static name = joi.string().min(3).max(20).trim();
    private static surname = joi.string().regex(/^[A-Z][a-z]{1,9}$/);
    private static age = joi.number().min(1).max(120);

    public static create = joi.object({
        name: this.name.required(),
        surname: this.surname.required(),
        age: this.age.required(),
    });

    public static update = joi.object({
        name: this.name.required(),
        surname: this.surname.required(),
        age: this.age.required(),
    });
}
