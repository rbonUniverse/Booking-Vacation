class Config {
    public port = 3001;
    public mysqlHost = "localhost";
    public mysqlUser = "root";
    public mysqlPassword = "";
    public mysqlDatabase = "vacationBooking";
}

const config = new Config();

export default config;
