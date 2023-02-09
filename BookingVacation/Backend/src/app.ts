import controller from "./6-controllers/vacations-controller";
import controllerAuth from "./6-controllers/auth-controller";
import routeNotFound from "./3-middleware/route-not-found";
import catchAll from "./3-middleware/catch-all";
import fileUpload from "express-fileupload";
import config from "./2-utils/config";
import express from "express";
import cors from "cors";

const server = express();

server.use(cors());
server.use(express.json());
server.use(fileUpload());
server.use("/", controller);
server.use("/", controllerAuth);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(config.port, () => console.log("Listening on http://localhost:" + config.port));
