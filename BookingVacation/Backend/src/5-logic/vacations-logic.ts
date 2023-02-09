import { IdNotFoundError, ValidationError } from "../4-models/client-errors";
import FollowVacationModel from "../4-models/follow-vacation-model";
import VacationModel from "../4-models/vacation-model";
import safeDelete from "../2-utils/safe-delete";
import { v4 as uuid } from "uuid";
import dal from "../2-utils/dal";

//GET all vacations
async function getAllVacations(): Promise<VacationModel[]> {
    const sql = `SELECT * FROM vacations`;
    const vacation = await dal.execute(sql);
    return vacation;

}

// GET one vacation
async function getOneVacation(vacationId: number): Promise<VacationModel> {
    const sql = `SELECT FROM vacations
                description AS Description,
                destination AS Destination,
                imageName AS imageName,
                departDate AS Depart Date,
                returnDate AS Return Date,
                price AS Price
                FROM vacations
                WHERE vacationId = ?`;
    const vacations = await dal.execute(sql, [vacationId]); // returns empty array if not found
    const vacation = vacations[0];
    if (!vacation) throw new IdNotFoundError(vacationId);
    return vacation;
}

//GET the amount of users follow single vacation
async function getVacationSum(vacationId: number): Promise<number> {
    const sql = `SELECT COUNT (userId) AS count, vacationId FROM followers WHERE vacationId = ?`;
    const followers = await dal.execute(sql, vacationId);
    return followers;
}

//GET vacations by userId
async function getUserVacations(userId: number): Promise<FollowVacationModel[]> {
    const sql = `SELECT vacationId FROM followers WHERE userId = ?`;
    const userVacations = await dal.execute(sql, userId);
    return userVacations;
}

// follow vacation
async function followVacation(follow: FollowVacationModel): Promise<void> {
    const sqlGet = `SELECT * FROM followers WHERE userId = ? AND vacationId = ? `;
    const resultGet = await dal.execute(sqlGet, [follow.userId, follow.vacationId]);
    if (resultGet && resultGet.length > 0) {
        return
    }
    const sql = `INSERT INTO followers VALUES(?, ?)`;
    const result = await dal.execute(sql, [follow.userId, follow.vacationId]);
}

// unfollow vacation
async function unfollowVacation(userId: number, vacationId: number): Promise<void> {
    const sql = `DELETE FROM followers WHERE userId = ? AND vacationId = ?`;
    const result = await dal.execute(sql, [userId, vacationId]);
    if (result.affectedRows === 0) {
        throw new IdNotFoundError(vacationId);
    }
}

async function isFollowedBy(vacationId: number, userId: number): Promise<boolean> {
    const sql = `SELECT * FROM followers WHERE userId = ? AND vacationId = ?`;
    const result = await dal.execute(sql, [userId, vacationId]);
    return result && result.length > 0;
}

//ADD vacation
async function addVacation(vacation: VacationModel): Promise<VacationModel> {
    const sql = `INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)`;
    if (vacation.image) {
        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));
        vacation.imageName = uuid() + extension;
        await vacation.image.mv(`./src/1-assets/images/${vacation.imageName}`);
        delete vacation.image;
    }

    const result = await dal.execute(sql, [vacation.description, vacation.destination,
    vacation.imageName, vacation.departDate, vacation.returnDate, vacation.price]);
    vacation.vacationId = result.insertId;

    return vacation;
}

//EDIT vacation
async function editVacation(vacation: VacationModel): Promise<VacationModel> {
    const sql = `UPDATE vacations
                SET
                description = ?,
                destination = ?,
                imageName = ?,
                departDate = ?,
                returnDate = ?,
                price = ?
                WHERE vacationId = ?`

    const error = vacation.validate();
    if (error) throw new ValidationError(error);

    if (vacation.image) {
        await safeDelete(`./src/1-assets/images/${vacation.imageName}`);
        const extension = vacation.imageName.substring(vacation.imageName.lastIndexOf("."));
        vacation.imageName = uuid() + extension;
        await vacation.image.mv(`./src/1-assets/images/${vacation.imageName}`);
        delete vacation.image;
    }

    const result = await dal.execute(sql, [vacation.description, vacation.destination,
    vacation.imageName, vacation.departDate, vacation.returnDate, vacation.price, vacation.vacationId]);
    vacation.vacationId = result.insertId;
    return vacation;
};

//DELETE vacation
async function deleteVacation(vacationId: number): Promise<void> {
    const sql = `DELETE FROM vacations WHERE vacationId = ?`;
    const result = await dal.execute(sql, [vacationId]);
}

export default {
    getAllVacations,
    getVacationSum,
    addVacation,
    getUserVacations,
    followVacation,
    unfollowVacation,
    editVacation,
    deleteVacation,
    getOneVacation,
    isFollowedBy
};

