import axios from "axios";
import VacationModel from "../Models/VacationModel";
import FollowVacationModel from "../Models/FollowVacationModel";
import { vacationsStore, VacationsAction, VacationsActionType } from "../Redux/VacationsState";

const pageZise = 10;

class VacationsService {

    // Get all vacations:
    public async getAllVacations(): Promise<VacationModel[]> {

        // Take vacations resides in redux global state:
        let vacations = vacationsStore.getState().vacations;


        // If we have no vacations in global state - fetch them from server:
        if (vacations.length === 0) {

            // Fetch all vacations from backend:
            const response = await axios.get<VacationModel[]>("http://localhost:3001/api/vacations");

            // Extract vacations from axios response:
            vacations = response.data;

            // Save fetched vacations in global state:
            const action: VacationsAction = { type: VacationsActionType.FetchVacations, payload: vacations };
            vacationsStore.dispatch(action); // Redux will call productsReducer to perform this action.

        }

        // Return vacations:
        return vacations;
    }

    public async getIsFollowedBy(vacationId: number, userId: number) {

        const response = await axios.get<boolean>(`http://localhost:3001/api/vacations/${vacationId}/is-followed-by/${userId}`);
        const followed = response.data;

        return followed;
    }

    //GET Followers count
    public async getVacationSum(vacationId: number) {
        
        // Request vacation sum to backend: 
        const response = await axios.get<number>(`http://localhost:3001/api/vacations/followers-count/${vacationId}`);
        const vacationSum = response.data;

        return vacationSum;
    }

    // Add new follower to vacation: 
    public async followVacation(userId: number, vacationId: number): Promise<void> {

        // Send vacation to backend: 
        const response = await axios.put<FollowVacationModel>(`http://localhost:3001/api/vacations/follow`, { userId, vacationId });
    }

    // DELETE follower from vacation: 
    public async unfollowVacation(userId: number, vacationId: number): Promise<void> {

        // Send vacation to backend: 
        const response = await axios.delete<FollowVacationModel>(`http://localhost:3001/api/vacations/unfollow/${userId}/${vacationId}`);
    }

    // Get one vacation by id:
    public async getOneVacation(id: number): Promise<VacationModel> {

        // Desired vacation: 
        let vacation;

        // Take vacations resides in redux global state:
        let vacations = vacationsStore.getState().vacations;

        // If we have no vacations in global state - fetch given product from server:
        if (vacations.length === 0) {

            // Fetch one vacation from backend:
            const response = await axios.get<VacationModel>(`http://localhost:3001/api/vacations/edit/${id}`);

            // Take fetched product:
            vacation = response.data;
        }
        else {

            // Take vacation from redux:
            vacation = vacations.find(v => v.vacationId === id);
        }

        // Return vacation:
        return vacation;
    }

    // Add new vacation: 
    public async addVacation(vacation: VacationModel): Promise<void> {
        // Convert VacationModel into FormData because we need to send text + image:
        const formData = new FormData();
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("departDate", vacation.departDate);
        formData.append("returnDate", vacation.returnDate);
        formData.append("price", vacation.price.toString());
        formData.append("image", vacation.image[0]);

        // Send vacation to backend: 
        const response = await axios.post<VacationModel>("http://localhost:3001/api/vacations/add", formData);
        const addedVacation: VacationModel = response.data;

        // Send added vacation to redux global state: 
        const action: VacationsAction = { type: VacationsActionType.AddVacation, payload: addedVacation };
        vacationsStore.dispatch(action);
    }

    // Update vacation: 
    public async updateVacation(vacation: VacationModel): Promise<void> {
        // Convert ProductModel into FormData because we need to send text + image:
        const formData = new FormData();
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("departDate", vacation.departDate);
        formData.append("returnDate", vacation.returnDate);
        formData.append("image", vacation.image[0]);
        formData.append("price", vacation.price.toString());

        // Send vacation to backend: 
        const response = await axios.put<VacationModel>(`http://localhost:3001/api/vacations/edit/${vacation.vacationId}`, formData);
        const UpdatedVacation = response.data;

        // Send updated vacation to redux global state:
        const action: VacationsAction = { type: VacationsActionType.UpdateVacation, payload: UpdatedVacation };
        vacationsStore.dispatch(action); // Redux will call productsReducer to perform this action.
    }

    // Delete vacation: 
    public async deleteVacation(id: number): Promise<void> {

        // Delete this vacation in backend: 
        await axios.delete(`http://localhost:3001/api/vacations/${id}`);

        // Delete this vacation also in redux global state: 
        const action: VacationsAction = { type: VacationsActionType.DeleteVacation, payload: id };
        vacationsStore.dispatch(action);
    }

}

const vacationsService = new VacationsService();

export default vacationsService;
