import RoleModel from "./role-model";
import Joi from "joi";

class UserModel {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public role: RoleModel;
    public roleId: number;

    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.roleId = user.roleId;
    }

    private static validationSchema = Joi.object({

        userId: Joi.number().optional().positive().integer(),
        firstName: Joi.string().required().min(2).max(50),
        lastName: Joi.string().required().min(4).max(50),
        username: Joi.string().required().min(4).max(50),
        password: Joi.string().optional().min(6).max(150),
        roleId: Joi.number().required().min(1).max(2)
    });

    public validate(): string {
        const result = UserModel.validationSchema.validate(this);
        return result.error?.message;
    }

}

export default UserModel;
