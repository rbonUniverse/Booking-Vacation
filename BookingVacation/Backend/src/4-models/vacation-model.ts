import { UploadedFile } from "express-fileupload";
import Joi from "joi";

class VacationModel{

    public vacationId: number;
    public description: string;
    public destination: string;
    public imageName: string;
    public image: UploadedFile;
    public departDate: string;
    public returnDate: string;
    public price: number;

public constructor (vacation: VacationModel){
    this.vacationId = vacation.vacationId;
    this.description = vacation.description;
    this.destination = vacation.destination;
    this.imageName = vacation.image.name;
    this.image = vacation.image;
    this.departDate = vacation.departDate;
    this.returnDate = vacation.returnDate;
    this.price = vacation.price;
}

private static validationSchema = Joi.object({

    vacationId: Joi.number().optional().positive().integer(),
    description: Joi.string().required().min(20).max(500),
    destination: Joi.string().required().min(4).max(50),
    imageName: Joi.string().required().min(5).max(250),
    image: Joi.object().optional(),
    departDate: Joi.string().optional().min(10).max(10),
    returnDate: Joi.string().optional().min(10).max(10),
    price: Joi.number().required().min(100).max(20000)
});

public validate(): string {
    const result = VacationModel.validationSchema.validate(this);
    return result.error?.message;
}

}

export default VacationModel;