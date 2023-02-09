class FollowVacationModel {
    public vacationId: number;
    public userId: number;

    public constructor (follow: FollowVacationModel){
        this.vacationId = follow.vacationId;
        this.userId = follow.userId;
    }
}

export default FollowVacationModel;