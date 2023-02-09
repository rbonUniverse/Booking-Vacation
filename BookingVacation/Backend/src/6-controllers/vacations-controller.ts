import FollowVacationModel from "../4-models/follow-vacation-model";
import express, { NextFunction, Request, Response } from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import vacationsLogic from "../5-logic/vacations-logic";
import verifyAdmin from "../3-middleware/verify-admin";
import VacationModel from "../4-models/vacation-model";
import path from "path";

const router = express.Router();

// GET http://localhost:3001/api/vacations
router.get("/api/vacations", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await vacationsLogic.getAllVacations();
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// // GET http://localhost:3001/api/vacations/edit/:vacationId
router.get("/api/vacations/edit/:vacationId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        const vacations = await vacationsLogic.getOneVacation(vacationId);
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// GET images
router.get("/api/vacations/images/:imageName", (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, "..", "1-assets", "images", imageName);
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
})

// POST http://localhost:3001/api/vacations/add
router.post("/api/vacations/add", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const addedVacation = await vacationsLogic.addVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch (err: any) {
        next(err);
    }
});


// UPDATE http://localhost:3001/api/vacations/edit/:vacationId
router.put("/api/vacations/edit/:vacationId", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const vacationId = +request.params.vacationId;
        vacation.vacationId = vacationId;
        const editedVacation = await vacationsLogic.editVacation(vacation);
        response.status(201).json(editedVacation);
    }
    catch (err: any) {
        next(err);
    }
});


// DELETE http://localhost:3001/api/vacations/:vacationId
router.delete("/api/vacations/:vacationId", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        await vacationsLogic.deleteVacation(vacationId);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/vacations/followers-count/:vacationId
router.get("/api/vacations/followers-count/:vacationId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        const result = await vacationsLogic.getVacationSum(vacationId);
        const followers = result[0].count;
        response.json(followers);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/vacations/:userId
router.get("/api/vacations/:userId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId;
        const userVacations = await vacationsLogic.getUserVacations(userId);
        response.json(userVacations);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3001/api/vacations/follow
router.put("/api/vacations/follow", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const newVacation = new FollowVacationModel(request.body);
        const vacations = await vacationsLogic.followVacation(newVacation);
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/vacation/:vacationId/is-followed-by/:userId
router.get("/api/vacations/:vacationId/is-followed-by/:userId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { vacationId, userId } = request.params;
        const followed = await vacationsLogic.isFollowedBy(+vacationId, +userId);
        response.json(followed);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE http://localhost:3001/api/vacations/unfollow
router.delete("/api/vacations/unfollow/:userId/:vacationId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { vacationId, userId } = request.params;
        await vacationsLogic.unfollowVacation(+userId, +vacationId);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;
