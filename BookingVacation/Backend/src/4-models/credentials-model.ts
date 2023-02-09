import Joi from "joi";

class CredentialsModel {
    public username: string;
    public password: string;

    public constructor(user: CredentialsModel) {
        this.username = user.username;
        this.password = user.password;
    }

    private static validationSchema = Joi.object({

        username: Joi.string().required().min(4).max(50),
        password: Joi.string().optional().min(6).max(150)

    });

    public validate(): string {
        const result = CredentialsModel.validationSchema.validate(this);
        return result.error?.message;
    }

}

export default CredentialsModel;